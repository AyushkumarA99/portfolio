import React from 'react';
import { Mail, Terminal, ArrowUp } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative border-t border-primary/20 bg-obsidian-lowest/95 backdrop-blur-xl pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-8">
        {/* Top Row: Brand & Quick Navigation */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-outline-variant/40">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-obsidian-panel border border-primary/40 flex items-center justify-center text-primary">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <span className="font-grotesk font-bold text-lg text-white tracking-wider">
                AYUSH KUMAR
              </span>
            </div>
            <p className="font-sans text-xs text-secondary">
              Full Stack Developer | Computer Science Engineering Student
            </p>
            <span className="font-label-telemetry text-[10px] text-on-surface-variant">
              Jabalpur, Madhya Pradesh, India
            </span>
          </div>

          {/* Quick Nav Links */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2 font-label-telemetry text-xs" aria-label="Footer Navigation">
            <a href="#home" className="text-on-surface-variant hover:text-primary transition-colors">
              HOME
            </a>
            <a href="#about" className="text-on-surface-variant hover:text-primary transition-colors">
              ABOUT
            </a>
            <a href="#skills" className="text-on-surface-variant hover:text-primary transition-colors">
              SKILLS
            </a>
            <a href="#projects" className="text-on-surface-variant hover:text-primary transition-colors">
              PROJECTS
            </a>
            <a href="#education" className="text-on-surface-variant hover:text-primary transition-colors">
              EDUCATION
            </a>
            <a href="#certifications" className="text-on-surface-variant hover:text-primary transition-colors">
              CERTIFICATIONS
            </a>
            <a href="#contact" className="text-on-surface-variant hover:text-primary transition-colors">
              CONTACT
            </a>
          </nav>
        </div>

        {/* Bottom Row: Social Links, Copyright, and Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-on-surface-variant">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/AyushkumarA99"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded bg-obsidian-card border border-outline-variant hover:border-primary hover:text-primary transition-all"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/ayush-kumar-b7358630a/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded bg-obsidian-card border border-outline-variant hover:border-secondary hover:text-secondary transition-all"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:ayushkushwaha70935@gmail.com"
              className="p-2 rounded bg-obsidian-card border border-outline-variant hover:border-primary hover:text-primary transition-all"
              aria-label="Email Ayush Kumar"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Dynamic Year & Attribution */}
          <div className="text-center sm:text-right font-label-telemetry text-[11px]">
            <span>© {currentYear} Ayush Kumar. Digital Universe Portfolio.</span>
            <div className="text-[10px] text-on-surface-variant/70 mt-0.5">
              Engineered with React, Three.js, Tailwind CSS &amp; Serverless Functions
            </div>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-obsidian-panel border border-outline-variant hover:border-primary text-on-surface hover:text-primary font-label-telemetry text-xs transition-all active:scale-95"
            aria-label="Scroll back to top of page"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
