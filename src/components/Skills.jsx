import React, { useState } from 'react';
import {
  Code2,
  Cpu,
  Layers,
  GitBranch,
  Smartphone,
  Terminal,
  Activity,
  Binary,
  CheckCircle,
} from 'lucide-react';
import { Github } from './Icons';

const coreSkills = [
  {
    id: 'cpp',
    name: 'C++',
    category: 'Systems & Core',
    icon: Binary,
    tag: 'NATIVE',
    desc: 'Object-oriented programming, core algorithmic logic, memory management fundamentals.',
    color: 'text-primary border-primary/40 bg-primary/10',
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    category: 'Problem Solving',
    icon: Cpu,
    tag: 'ALGORITHMS',
    desc: 'Problem solving, array manipulation, search/sort techniques, time & space complexity optimization.',
    color: 'text-primary-fixed border-primary/40 bg-primary/10',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Programming & AI Foundations',
    icon: Terminal,
    tag: 'SCRIPTING',
    desc: 'Scripting, modern programming constructs, foundational machine learning & data processing.',
    color: 'text-amber-bright border-amber-warn/40 bg-amber-warn/10',
  },
  {
    id: 'frontend',
    name: 'Frontend Development',
    category: 'Client Systems',
    icon: Layers,
    tag: 'CLIENT_UI',
    desc: 'Modern responsive web architecture, interactive UI/UX, DOM state manipulation, clean layout styling.',
    color: 'text-primary border-primary/40 bg-primary/10',
  },
  {
    id: 'kotlin',
    name: 'Kotlin — Android Basics',
    category: 'Mobile Systems',
    icon: Smartphone,
    tag: 'MOBILE',
    desc: 'Android application structure, basic activities, layouts, and Kotlin syntax fundamentals.',
    color: 'text-secondary border-secondary/40 bg-secondary/10',
  },
  {
    id: 'git',
    name: 'Git',
    category: 'Version Control',
    icon: GitBranch,
    tag: 'VCS',
    desc: 'Version tracking, commit trees, branching, repository management, clean version history.',
    color: 'text-primary border-primary/40 bg-primary/10',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Collaboration',
    icon: Github,
    tag: 'COLLAB',
    desc: 'Cloud repository hosting, open-source workflow, issue tracking, continuous project distribution.',
    color: 'text-amber-bright border-amber-warn/40 bg-amber-warn/10',
  },
];

const projectTechStack = [
  { name: 'HTML5', usedIn: 'QuickToolHub & Portfolio', desc: 'Semantic web architecture & accessible markup structure' },
  { name: 'CSS3 / Tailwind', usedIn: 'QuickToolHub & Portfolio', desc: 'Modern responsive styling, CSS variables & cyber glassmorphism' },
  { name: 'JavaScript (ES6+)', usedIn: 'QuickToolHub & Portfolio', desc: 'Dynamic client logic, client-side algorithms, Canvas API & async events' },
];

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState(coreSkills[0]);

  return (
    <section
      id="skills"
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
      aria-label="Technical Skills Section"
    >
      {/* Module Header Bar */}
      <div className="flex items-center justify-between mb-8 pb-2 border-b border-primary/20">
        <div className="flex items-center gap-2">
          <span className="font-label-telemetry text-xs text-primary uppercase font-bold tracking-widest">
            [ SYS_MODULE: 03_PROPULSION_STACK ]
          </span>
        </div>
        <span className="font-label-telemetry text-[10px] text-amber-bright bg-amber-warn/10 border border-amber-warn/30 px-2 py-0.5 rounded flex items-center gap-1">
          <Activity className="w-3 h-3 text-amber-bright" />
          RADAR_SWEEP: ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Radar Map Visualizer & Telemetry Node */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative rounded-xl bg-obsidian-lowest border border-primary/30 p-4 hud-bracket shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-outline-variant/40 pb-2">
              <span className="font-label-telemetry text-xs text-primary font-bold">
                TACTICAL RADAR CONSTELLATION
              </span>
              <span className="font-label-telemetry text-[9px] text-on-surface-variant">
                VERIFIED NODES: 7
              </span>
            </div>

            {/* Radar Scope */}
            <div className="relative w-full h-56 rounded-lg bg-obsidian-panel/80 border border-outline-variant flex items-center justify-center overflow-hidden">
              {/* Concentric rings */}
              <div className="absolute w-48 h-48 rounded-full border border-primary/20" />
              <div className="absolute w-32 h-32 rounded-full border border-primary/30" />
              <div className="absolute w-16 h-16 rounded-full border border-primary/40" />
              <div className="absolute w-full h-[1px] bg-primary/20" />
              <div className="absolute h-full w-[1px] bg-primary/20" />

              {/* Rotating Sweeper Blade */}
              <div
                className="absolute w-24 h-24 origin-bottom-right top-0 left-0 bg-gradient-to-br from-primary/35 via-primary/10 to-transparent animate-radar-sweep pointer-events-none"
              />

              {/* Radar Blips representing skills */}
              {coreSkills.map((sk, index) => {
                const angles = [0.4, 1.2, 2.1, 2.9, 3.8, 4.7, 5.5];
                const radii = [70, 55, 80, 45, 65, 75, 50];
                const angle = angles[index % angles.length];
                const r = radii[index % radii.length];
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;
                const isSelected = selectedSkill.id === sk.id;

                return (
                  <button
                    key={sk.id}
                    onClick={() => setSelectedSkill(sk)}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    className={`absolute w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-primary ring-4 ring-primary/40 scale-125 z-20 shadow-[0_0_12px_#00f0ff]'
                        : 'bg-primary/70 hover:bg-white hover:scale-110 z-10'
                    }`}
                    title={`${sk.name} (${sk.tag})`}
                    aria-label={`Inspect ${sk.name}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-obsidian" />
                  </button>
                );
              })}

              <div className="absolute bottom-2 left-2 font-label-telemetry text-[9px] text-primary bg-obsidian/90 px-1.5 py-0.5 rounded border border-primary/30">
                RANGE: ALL VECTORS ACTIVE
              </div>
            </div>

            {/* Selected Node Detailed Telemetry Display */}
            <div className="p-3.5 rounded-lg bg-obsidian-card border border-outline-variant flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="font-label-telemetry text-[10px] text-primary uppercase font-bold">
                  // INSPECTED VECTOR:
                </span>
                <span className={`px-2 py-0.5 rounded font-label-telemetry text-[9px] font-bold border ${selectedSkill.color}`}>
                  {selectedSkill.tag}
                </span>
              </div>
              <h4 className="font-grotesk font-bold text-base text-white">
                {selectedSkill.name}
              </h4>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                {selectedSkill.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Full Verified Skill Grid */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h3 className="font-grotesk font-bold text-xl sm:text-2xl text-white">
              Technical Skill Constellation
            </h3>
            <p className="font-sans text-xs sm:text-sm text-on-surface-variant">
              Verified computer science foundations, programming languages, and web engineering disciplines.
            </p>
          </div>

          {/* Core Skill Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {coreSkills.map((skill) => {
              const Icon = skill.icon;
              const isSelected = selectedSkill.id === skill.id;

              return (
                <div
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'bg-obsidian-card border-primary shadow-[0_0_20px_rgba(0,240,255,0.18)] scale-[1.01]'
                      : 'bg-obsidian-card/70 border-outline-variant hover:border-primary/50 hover:bg-obsidian-card'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-9 h-9 rounded bg-obsidian-panel border border-outline-variant/80 flex items-center justify-center text-primary">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className={`px-2 py-0.5 rounded font-label-telemetry text-[9px] font-bold border ${skill.color}`}>
                      {skill.tag}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-grotesk font-bold text-sm sm:text-base text-white mb-0.5">
                      {skill.name}
                    </h4>
                    <span className="font-label-telemetry text-[10px] text-on-surface-variant block mb-1">
                      {skill.category}
                    </span>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* QuickToolHub Technology Foundation Banner */}
          <div className="p-4 rounded-lg bg-obsidian-panel border border-outline-variant flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-outline-variant/40 pb-2">
              <span className="font-label-telemetry text-xs text-amber-bright font-bold uppercase flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-amber-bright" />
                <span>Technologies Applied in QuickToolHub</span>
              </span>
              <span className="font-label-telemetry text-[10px] text-on-surface-variant">
                LIVE PRODUCTION
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {projectTechStack.map((tech, idx) => (
                <div key={idx} className="p-2.5 rounded bg-obsidian-card/80 border border-outline-variant/60 flex flex-col gap-0.5">
                  <span className="font-label-code text-xs font-bold text-primary">{tech.name}</span>
                  <span className="font-sans text-[11px] text-on-surface-variant">{tech.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
