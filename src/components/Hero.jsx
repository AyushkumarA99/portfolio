import React, { useState, useEffect } from 'react';
import {
  Mail,
  ArrowRight,
  Download,
  Terminal as TerminalIcon,
  Play,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Layers,
  Code2,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import { Github, Linkedin } from './Icons';
import HeroCore3D from './HeroCore3D';

export default function Hero() {
  const [termOutput, setTermOutput] = useState([
    { type: 'cmd', text: 'init_developer_telemetry --identity "Ayush Kumar"' },
    { type: 'res', text: 'STATUS: Systems nominal. Avionics & WebGL online.' },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleCommand = (cmd) => {
    if (isTyping) return;
    setIsTyping(true);

    let response = '';
    if (cmd === 'status') {
      response = 'SYSTEM HEALTH: 100% | Latency: 12ms | Memory: Nominal | Core: Active';
    } else if (cmd === 'run-diagnostics') {
      response = 'RUNNING DIAGNOSTICS: 12/12 subsystems passed (Frontend, Logic, Git, Three.js).';
    } else if (cmd === 'featured') {
      response = 'FEATURED ARTIFACT: QuickToolHub [Live suite of 9+ web utilities].';
    } else if (cmd === 'clear') {
      setTermOutput([]);
      setIsTyping(false);
      return;
    }

    setTermOutput((prev) => [
      ...prev.slice(-4),
      { type: 'cmd', text: `exec ./${cmd}` },
      { type: 'res', text: response },
    ]);

    setTimeout(() => {
      setIsTyping(false);
    }, 400);
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center"
      aria-label="Hero Section"
    >
      {/* Module Top HUD Telemetry Bar */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-primary/20">
        <div className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <span className="font-label-telemetry text-xs text-primary uppercase font-bold tracking-widest">
            [ SYS_MODULE: 01_ORBITAL_ID ]
          </span>
        </div>
        <div className="flex items-center gap-2 font-label-telemetry text-[10px] text-amber-bright bg-amber-warn/10 border border-amber-warn/30 px-2 py-0.5 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-warn animate-pulse" />
          <span>TELEMETRY_STREAM // 14ms LATENCY</span>
        </div>
      </div>

      {/* Main Grid: Left Column Text/Terminal & Right Column 3D Core */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Heading, Bio, CTAs, Socials */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Status Ribbon & Callsign */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-obsidian-card border border-primary/40 font-label-telemetry text-[11px] text-primary flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              CALLSIGN: AYUSH_KUMAR
            </span>
            <span className="px-2.5 py-1 rounded bg-obsidian-card border border-outline-variant font-label-telemetry text-[11px] text-on-surface-variant">
              LOC: Jabalpur, MP, India
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-warn/10 border border-amber-warn/30 font-label-telemetry text-[10px] text-amber-bright font-bold">
              UTC+5:30 [IST]
            </span>
          </div>

          {/* Primary Cinematic Heading */}
          <div className="flex flex-col gap-2">
            <h1 className="font-grotesk font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-fixed to-primary">
              Hi, I'm Ayush Kumar.
            </h1>
            <h2 className="font-grotesk font-semibold text-lg sm:text-xl md:text-2xl text-secondary">
              Full Stack Developer &amp; Computer Science Engineering Student
            </h2>
          </div>

          {/* Mission Description Statement */}
          <p className="font-sans text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
            I build modern digital experiences, explore full-stack technologies, and turn practical ideas into useful web applications.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="clip-chamfer inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary via-primary-fixed-dim to-primary text-obsidian font-label-code text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_0_24px_rgba(0,240,255,0.35)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] hover:scale-[1.02] active:scale-95 transition-all"
            >
              <span>Explore My Projects</span>
              <ArrowRight className="w-4 h-4 text-obsidian" />
            </a>

            <a
              href="/assets/Ayush_Kumar_Resume.pdf"
              download="Ayush_Kumar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="clip-chamfer inline-flex items-center gap-2 px-5 py-3.5 bg-obsidian-card border border-primary/40 text-primary hover:border-primary hover:bg-obsidian-panel font-label-code text-xs sm:text-sm font-bold uppercase tracking-wider active:scale-95 transition-all"
            >
              <Download className="w-4 h-4 text-primary" />
              <span>Download Resume</span>
            </a>
          </div>

          {/* Verified Social Uplinks */}
          <div className="flex items-center gap-4 pt-2">
            <span className="font-label-telemetry text-xs text-on-surface-variant uppercase tracking-wider">
              UPLINKS:
            </span>
            <div className="flex items-center gap-2.5">
              <a
                href="https://github.com/AyushkumarA99"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded bg-obsidian-card border border-outline-variant hover:border-primary hover:text-primary flex items-center justify-center text-on-surface transition-all active:scale-95 shadow-sm"
                aria-label="GitHub Profile (AyushkumarA99)"
                title="GitHub: https://github.com/AyushkumarA99"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/ayush-kumar-b7358630a/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded bg-obsidian-card border border-outline-variant hover:border-secondary hover:text-secondary flex items-center justify-center text-on-surface transition-all active:scale-95 shadow-sm"
                aria-label="LinkedIn Profile (Ayush Kumar)"
                title="LinkedIn: Ayush Kumar"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href="mailto:ayushkushwaha70935@gmail.com"
                className="w-10 h-10 rounded bg-obsidian-card border border-outline-variant hover:border-primary hover:text-primary flex items-center justify-center text-on-surface transition-all active:scale-95 shadow-sm"
                aria-label="Send Email to Ayush Kumar"
                title="Email: ayushkushwaha70935@gmail.com"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Three.js Core Visualizer */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="w-full rounded-xl bg-obsidian-card/70 border border-primary/30 p-2 hud-bracket shadow-2xl backdrop-blur-md">
            <HeroCore3D />
          </div>
        </div>
      </div>

      {/* Interactive Terminal Panel (Avionics Deck) */}
      <div className="mt-10 w-full rounded-lg bg-obsidian-lowest border border-outline-variant/80 overflow-hidden shadow-2xl hud-bracket">
        {/* Terminal Header */}
        <div className="px-4 py-2.5 bg-obsidian-panel border-b border-outline-variant flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            <span className="font-label-telemetry text-xs text-primary font-bold ml-2">
              TERMINAL://AYUSH_DEV_AVIONICS
            </span>
          </div>
          <div className="flex items-center gap-2 font-label-telemetry text-[10px] text-on-surface-variant">
            <span>HEX: 0x7E3A9</span>
            <span className="text-primary font-bold">100% READY</span>
          </div>
        </div>

        {/* Structured Spec Readout */}
        <div className="p-4 sm:p-5 flex flex-col gap-3 font-mono text-xs text-on-surface-variant">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[12px] border-b border-outline-variant/40 pb-3">
            <div className="flex items-center justify-between p-2 rounded bg-obsidian-card/60 border border-outline-variant/40">
              <span className="text-on-surface-variant">// CALLSIGN:</span>
              <span className="text-primary font-semibold">Ayush Kumar</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-obsidian-card/60 border border-outline-variant/40">
              <span className="text-on-surface-variant">// ROLE:</span>
              <span className="text-on-surface font-medium">Full Stack Developer</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-obsidian-card/60 border border-outline-variant/40">
              <span className="text-on-surface-variant">// FOCUS:</span>
              <span className="text-secondary font-medium">Web Development &amp; Systems</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-obsidian-card/60 border border-outline-variant/40">
              <span className="text-on-surface-variant">// FEATURED PROJECT:</span>
              <span className="text-amber-bright font-bold">QuickToolHub</span>
            </div>
          </div>

          {/* Status Note Indicator */}
          <div className="flex items-center justify-between text-[11px] px-1 py-1 text-on-surface-variant/90">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-semibold">STATUS: Portfolio Online</span>
              <span className="text-[10px] text-on-surface-variant/70 italic hidden sm:inline">
                (Visual interface telemetry readout)
              </span>
            </div>
            <span className="font-label-telemetry text-[10px] text-amber-bright bg-amber-warn/10 px-2 py-0.5 rounded border border-amber-warn/30">
              DEV_ENGINEER
            </span>
          </div>

          {/* Real-time Dynamic Command Output Stream */}
          <div className="p-2.5 rounded bg-obsidian-card border border-outline-variant/50 flex flex-col gap-1.5 min-h-[60px]">
            {termOutput.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className={item.type === 'cmd' ? 'text-amber-bright font-bold' : 'text-primary'}>
                  {item.type === 'cmd' ? '>>>' : '=>'}
                </span>
                <span className={item.type === 'cmd' ? 'text-on-surface' : 'text-primary-fixed'}>
                  {item.text}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-1.5 text-primary">
              <span className="text-amber-bright font-bold">&gt;</span>
              <span className="text-xs text-on-surface-variant">
                {isTyping ? 'executing command vector...' : 'awaiting telemetry commands...'}
              </span>
              <span className="w-1.5 h-3.5 bg-primary animate-pulse" />
            </div>
          </div>

          {/* Interactive Quick Execution Triggers */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-outline-variant/40">
            <span className="font-label-telemetry text-[10px] text-on-surface-variant font-bold uppercase">
              INTERACTIVE CMDS:
            </span>
            <button
              onClick={() => handleCommand('status')}
              className="px-2.5 py-1 rounded bg-obsidian-panel border border-primary/40 text-primary hover:border-primary font-mono text-[11px] active:scale-95 transition-all flex items-center gap-1"
            >
              <Cpu className="w-3 h-3" /> status
            </button>
            <button
              onClick={() => handleCommand('run-diagnostics')}
              className="px-2.5 py-1 rounded bg-obsidian-panel border border-secondary/40 text-secondary hover:border-secondary font-mono text-[11px] active:scale-95 transition-all flex items-center gap-1"
            >
              <CheckCircle2 className="w-3 h-3" /> run-diagnostics
            </button>
            <button
              onClick={() => handleCommand('featured')}
              className="px-2.5 py-1 rounded bg-obsidian-panel border border-amber-warn/40 text-amber-bright hover:border-amber-warn font-mono text-[11px] active:scale-95 transition-all flex items-center gap-1"
            >
              <Code2 className="w-3 h-3" /> featured-project
            </button>
            <button
              onClick={() => handleCommand('clear')}
              className="px-2.5 py-1 rounded bg-obsidian-panel border border-outline-variant text-on-surface-variant hover:text-on-surface font-mono text-[11px] active:scale-95 transition-all flex items-center gap-1 ml-auto"
            >
              <RotateCcw className="w-3 h-3" /> clear
            </button>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <div className="flex justify-center mt-10">
        <a
          href="#about"
          className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
          aria-label="Scroll down to About section"
        >
          <span className="font-label-telemetry text-[10px] uppercase tracking-widest">
            SCROLL TO EXPLORE
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-primary" />
        </a>
      </div>
    </section>
  );
}
