import React, { useState } from 'react';
import {
  ExternalLink,
  Layers,
  Sparkles,
  Terminal,
  CheckCircle2,
  QrCode,
  FileText,
  Calculator,
  Percent,
  Receipt,
  Image,
  Type,
  GraduationCap,
  Braces,
  Cpu,
  Monitor,
} from 'lucide-react';
import { Github } from './Icons';

const quickTools = [
  { name: 'Word Counter', icon: FileText, desc: 'Real-time text analysis: words, characters, sentences, paragraphs, reading time.' },
  { name: 'QR Code Generator', icon: QrCode, desc: 'Instant QR code creation for URLs, contacts, WiFi, text with custom downloads.' },
  { name: 'Age Calculator', icon: Calculator, desc: 'Exact chronological age calculation down to years, months, days, and next birthday.' },
  { name: 'Percentage Calculator', icon: Percent, desc: 'Multi-mode percentage computation: what is X% of Y, percentage increase/decrease.' },
  { name: 'GST Calculator', icon: Receipt, desc: 'Instant Goods & Services Tax breakdown with inclusive and exclusive tax modes.' },
  { name: 'Image Compressor & Resizer', icon: Image, desc: 'Client-side image file compression, quality adjustment, and pixel dimension scaling.' },
  { name: 'Case Converter', icon: Type, desc: 'Uppercase, lowercase, title case, camelCase, snake_case, and kebab-case transformation.' },
  { name: 'CGPA Calculator', icon: GraduationCap, desc: 'Semester credit and grade-point average computation for university grading systems.' },
  { name: 'JSON Formatter', icon: Braces, desc: 'Live JSON tree syntax validation, indentation beautifier, and error highlighter.' },
];

export default function Projects() {
  const [activeTool, setActiveTool] = useState(quickTools[0]);

  return (
    <section
      id="projects"
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
      aria-label="Projects Showcase Section"
    >
      {/* Module Header Bar */}
      <div className="flex items-center justify-between mb-8 pb-2 border-b border-primary/20">
        <div className="flex items-center gap-2">
          <span className="font-label-telemetry text-xs text-primary uppercase font-bold tracking-widest">
            [ SYS_MODULE: 04_CLASSIFIED_CAPSULES ]
          </span>
        </div>
        <span className="font-label-telemetry text-[10px] text-on-surface-variant font-mono">
          PROD_REPOSITORIES // VERIFIED
        </span>
      </div>

      <div className="flex flex-col gap-1 mb-8">
        <h2 className="font-grotesk font-bold text-3xl sm:text-4xl text-white">
          Featured Engineering Projects
        </h2>
        <p className="font-sans text-sm text-on-surface-variant max-w-2xl">
          Practical, high-utility software applications engineered with clean logic, responsive user interfaces, and robust implementation.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {/* PROJECT 1: QUICKTOOLHUB (Flagship Project) */}
        <div className="relative rounded-xl bg-obsidian-card/85 border border-primary/40 p-6 sm:p-8 hud-bracket shadow-2xl backdrop-blur-md flex flex-col gap-6">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/50 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded bg-primary/15 border border-primary/50 text-primary font-label-telemetry text-xs font-bold">
                SEC_01 // QUICKTOOLHUB
              </span>
              <span className="px-2.5 py-0.5 rounded bg-amber-warn/15 border border-amber-warn/50 text-amber-bright font-label-telemetry text-[10px] font-semibold">
                9 ONLINE TOOLS
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="font-label-telemetry text-[11px] text-primary font-semibold">
                LIVE PRODUCTION // NETLIFY
              </span>
            </div>
          </div>

          {/* Main Grid: Info + Interactive Tool Suite Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 6 cols: Project narrative & Actions */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="font-grotesk font-bold text-2xl sm:text-3xl text-white">
                  QuickToolHub
                </h3>
                <p className="font-sans text-base text-on-surface leading-relaxed">
                  QuickToolHub is a collection of free online tools designed to simplify everyday tasks.
                </p>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  Engineered with a focus on speed, client-side execution, zero latency, and zero tracking. Features utility calculators, dynamic image processors, real-time code and text formatters, and QR matrix generators.
                </p>
              </div>

              {/* Technologies Applied */}
              <div className="flex flex-col gap-1.5 pt-2">
                <span className="font-label-telemetry text-xs text-on-surface-variant uppercase font-bold">
                  TECHNOLOGY STACK:
                </span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded bg-obsidian-panel border border-outline-variant text-primary font-label-code text-xs font-semibold">
                    HTML5
                  </span>
                  <span className="px-3 py-1 rounded bg-obsidian-panel border border-outline-variant text-primary font-label-code text-xs font-semibold">
                    CSS3
                  </span>
                  <span className="px-3 py-1 rounded bg-obsidian-panel border border-outline-variant text-amber-bright font-label-code text-xs font-semibold">
                    JavaScript (ES6+)
                  </span>
                  <span className="px-3 py-1 rounded bg-obsidian-panel border border-outline-variant text-on-surface-variant font-label-code text-xs">
                    Client-Side Processing
                  </span>
                </div>
              </div>

              {/* Working Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-outline-variant/40">
                <a
                  href="https://quicktoolhubayush.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clip-chamfer inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-primary to-primary-fixed-dim text-obsidian font-label-code text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] active:scale-95 transition-all"
                >
                  <ExternalLink className="w-4 h-4 text-obsidian" />
                  <span>Live Demo</span>
                </a>

                <a
                  href="https://github.com/AyushkumarA99/quicktoolhub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clip-chamfer inline-flex items-center gap-2 px-5 py-3 bg-obsidian-panel border border-primary/40 text-primary hover:border-primary hover:bg-obsidian-card font-label-code text-xs sm:text-sm font-bold uppercase tracking-wider active:scale-95 transition-all"
                >
                  <Github className="w-4 h-4 text-primary" />
                  <span>View Source Code</span>
                </a>
              </div>
            </div>

            {/* Right 6 cols: Interactive 9-Tool Suite Browser */}
            <div className="lg:col-span-6 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-label-telemetry text-xs text-primary font-bold uppercase">
                  EXPLORE THE 9 INCLUDED TOOLS:
                </span>
                <span className="font-label-telemetry text-[10px] text-on-surface-variant">
                  SELECT TO INSPECT
                </span>
              </div>

              {/* 3x3 Grid of Tools */}
              <div className="grid grid-cols-3 gap-2">
                {quickTools.map((tool, idx) => {
                  const Icon = tool.icon;
                  const isSelected = activeTool.name === tool.name;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveTool(tool)}
                      className={`p-2.5 rounded-lg border text-left flex flex-col items-center justify-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-primary/15 border-primary text-primary shadow-[0_0_15px_rgba(0,240,255,0.25)] scale-[1.02]'
                          : 'bg-obsidian-panel/70 border-outline-variant hover:border-primary/40 hover:bg-obsidian-card text-on-surface-variant'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`} />
                      <span className="font-sans text-[11px] font-semibold text-center leading-tight">
                        {tool.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Tool Details Card */}
              <div className="p-4 rounded-lg bg-obsidian-lowest border border-primary/30 flex items-start gap-3 mt-1">
                <div className="w-10 h-10 rounded bg-obsidian-panel border border-primary/40 flex items-center justify-center text-primary shrink-0">
                  <activeTool.icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-grotesk font-bold text-sm text-white">{activeTool.name}</h4>
                    <span className="font-label-telemetry text-[9px] text-primary px-1.5 py-0.2 rounded border border-primary/30 bg-primary/10">
                      ACTIVE UTILITY
                    </span>
                  </div>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                    {activeTool.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PROJECT 2: PERSONAL PORTFOLIO WEBSITE */}
        <div className="relative rounded-xl bg-obsidian-card/85 border border-secondary/40 p-6 sm:p-8 hud-bracket hud-bracket-violet shadow-2xl backdrop-blur-md flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/50 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded bg-secondary/15 border border-secondary/50 text-secondary font-label-telemetry text-xs font-bold">
                SEC_02 // SYSTEM_CORE
              </span>
              <span className="px-2.5 py-0.5 rounded bg-primary/15 border border-primary/40 text-primary font-label-telemetry text-[10px] font-semibold">
                ACTIVE INSTANCE
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-label-telemetry text-[11px] text-secondary font-semibold">
                DIGITAL UNIVERSE // PORTFOLIO
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="font-grotesk font-bold text-2xl sm:text-3xl text-white">
                  Personal Portfolio Website
                </h3>
                <p className="font-sans text-base text-on-surface leading-relaxed">
                  A personal portfolio presenting my skills, projects, education, certifications, and resume.
                </p>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  Crafted with a cinematic sci-fi digital universe theme inspired by advanced aerospace avionics. Featuring real-time Three.js 3D WebGL core rendering, dynamic canvas particle constellations, Netlify serverless contact telemetry, accessible semantic markup, and verified academic timeline.
                </p>
              </div>

              {/* Technologies Applied */}
              <div className="flex flex-col gap-1.5 pt-2">
                <span className="font-label-telemetry text-xs text-on-surface-variant uppercase font-bold">
                  IMPLEMENTED TECHNOLOGIES:
                </span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded bg-obsidian-panel border border-outline-variant text-primary font-label-code text-xs font-semibold">
                    React 19
                  </span>
                  <span className="px-3 py-1 rounded bg-obsidian-panel border border-outline-variant text-secondary font-label-code text-xs font-semibold">
                    Three.js (WebGL 3D)
                  </span>
                  <span className="px-3 py-1 rounded bg-obsidian-panel border border-outline-variant text-primary font-label-code text-xs font-semibold">
                    Tailwind CSS
                  </span>
                  <span className="px-3 py-1 rounded bg-obsidian-panel border border-outline-variant text-amber-bright font-label-code text-xs font-semibold">
                    Netlify Serverless Functions
                  </span>
                  <span className="px-3 py-1 rounded bg-obsidian-panel border border-outline-variant text-on-surface font-label-code text-xs">
                    Vite
                  </span>
                </div>
              </div>

              {/* Honest Status Note - No fake live demo/repo */}
              <div className="p-3 rounded-lg bg-obsidian-panel border border-outline-variant flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                  <span>CURRENT SYSTEM ENVIRONMENT: ACTIVE INSTANCE</span>
                </div>
                <span className="font-label-telemetry text-[10px] text-amber-bright border border-amber-warn/40 bg-amber-warn/10 px-2 py-0.5 rounded font-bold">
                  v1.0.0 ONLINE
                </span>
              </div>
            </div>

            {/* Architectural Highlights Panel */}
            <div className="lg:col-span-5 flex flex-col gap-2.5">
              <div className="p-4 rounded-lg bg-obsidian-lowest border border-outline-variant flex flex-col gap-3">
                <span className="font-label-telemetry text-xs text-secondary font-bold uppercase">
                  SYSTEM HIGHLIGHTS
                </span>
                <div className="flex flex-col gap-2 font-sans text-xs text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                    <span>Real 3D Three.js rotating energy core &amp; particle swarm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                    <span>Serverless contact backend with rate limiting &amp; validation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                    <span>Fully verified resume integration with local PDF download</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                    <span>Fluid responsiveness across desktop, tablet, and mobile</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
