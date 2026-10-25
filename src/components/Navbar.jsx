import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Terminal, ChevronRight, Sparkles } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home', code: '01_ORBITAL' },
  { label: 'About', href: '#about', code: '02_DOSSIER' },
  { label: 'Skills', href: '#skills', code: '03_STACK' },
  { label: 'Projects', href: '#projects', code: '04_CAPSULES' },
  { label: 'Education', href: '#education', code: '05_CHRONO' },
  { label: 'Certifications', href: '#certifications', code: '06_CREDENTIALS' },
  { label: 'Contact', href: '#contact', code: '07_UPLINK' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll for header border glow and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // IntersectionObserver for scroll spy
    const sections = navItems.map((item) => document.querySelector(item.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible && visible.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const topOffset = 70;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      history.pushState(null, '', href);
      setActiveSection(href.replace('#', ''));
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-obsidian/90 backdrop-blur-xl border-b border-primary/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'bg-obsidian/70 backdrop-blur-md border-b border-outline-variant/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo & Telemetry Tag */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Ayush Kumar Portfolio Home"
          >
            <div className="w-8 h-8 rounded bg-obsidian-panel border border-primary/40 flex items-center justify-center text-primary group-hover:border-primary group-hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all">
              <Terminal className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-grotesk font-bold text-sm tracking-wider text-primary group-hover:text-primary-fixed transition-colors">
                AYUSH KUMAR
              </span>
              <span className="font-label-telemetry text-[9px] text-on-surface-variant flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                AK-CMD // SYS_ACTIVE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-label-telemetry text-xs" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-1.5 rounded text-[11px] uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'text-primary bg-primary/10 border border-primary/40 font-semibold shadow-[0_0_12px_rgba(0,240,255,0.15)]'
                      : 'text-on-surface-variant hover:text-primary hover:bg-obsidian-card/80 border border-transparent'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Action Button: Download Resume */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="/assets/Ayush_Kumar_Resume.pdf"
              download="Ayush_Kumar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="clip-tag flex items-center gap-2 px-3.5 py-1.5 bg-obsidian-panel border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-label-code text-xs font-semibold tracking-wider transition-all active:scale-95 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
              aria-label="Download Ayush Kumar Resume PDF"
            >
              <Download className="w-3.5 h-3.5 text-primary" />
              <span>RESUME</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="/assets/Ayush_Kumar_Resume.pdf"
              download="Ayush_Kumar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden p-1.5 rounded border border-primary/40 text-primary bg-primary/10"
              aria-label="Download Resume PDF"
              title="Download Resume"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded bg-obsidian-card border border-outline-variant text-primary hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={isOpen ? 'Close Mobile Navigation Menu' : 'Open Mobile Navigation Menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-obsidian/80 backdrop-blur-xl lg:hidden flex flex-col justify-between pt-20 pb-8 px-6 transition-all duration-300"
          onClick={() => setIsOpen(false)}
        >
          <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
            <div className="pb-3 border-b border-primary/20 flex items-center justify-between">
              <span className="font-label-telemetry text-xs text-primary font-bold tracking-widest uppercase">
                [ NAVIGATION_DIRECTIVES ]
              </span>
              <span className="font-label-telemetry text-[10px] text-amber-bright">CLR: CSE_ENG</span>
            </div>

            <nav className="flex flex-col gap-2 mt-2" aria-label="Mobile Navigation Drawer">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                      isActive
                        ? 'bg-primary/15 border-primary text-primary font-bold shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                        : 'bg-obsidian-card/80 border-outline-variant/60 text-on-surface-variant hover:text-primary hover:border-primary/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-label-telemetry text-[10px] text-primary/70">{item.code}</span>
                      <span className="font-grotesk text-sm tracking-wide">{item.label}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-on-surface-variant/40'}`} />
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Mobile Drawer Resume & Telemetry Action */}
          <div className="flex flex-col gap-3 pt-4 border-t border-outline-variant/40" onClick={(e) => e.stopPropagation()}>
            <a
              href="/assets/Ayush_Kumar_Resume.pdf"
              download="Ayush_Kumar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="clip-chamfer flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-primary-container via-primary-fixed-dim to-primary text-obsidian font-label-code text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.3)] active:scale-95 transition-all"
            >
              <Download className="w-4 h-4 text-obsidian" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>

            <div className="flex items-center justify-center gap-2 text-center font-label-telemetry text-[10px] text-on-surface-variant">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>AYUSH KUMAR // GYANG GANGA ITS JABALPUR</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
