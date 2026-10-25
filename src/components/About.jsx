import React from 'react';
import { UserCheck, Code, Compass, Lightbulb, BookOpen, MapPin, Sparkles, GraduationCap } from 'lucide-react';

export default function About() {
  const pillars = [
    {
      icon: GraduationCap,
      title: 'CSE Undergrad',
      desc: 'B.Tech student at Gyan Ganga Institute of Technology & Science, Jabalpur (2024–2028).',
      tag: 'ACADEMIC',
      color: 'text-primary border-primary/30 bg-primary/10',
    },
    {
      icon: Code,
      title: 'Full-Stack Development',
      desc: 'Passionate about building responsive, modern user interfaces and connected web logic.',
      tag: 'SYSTEMS',
      color: 'text-secondary border-secondary/30 bg-secondary/10',
    },
    {
      icon: Compass,
      title: 'Programming & Logic',
      desc: 'Deep interest in algorithms, Data Structures, and problem-solving through clean code.',
      tag: 'ALGORITHMS',
      color: 'text-amber-bright border-amber-warn/30 bg-amber-warn/10',
    },
    {
      icon: Lightbulb,
      title: 'Practical Project Building',
      desc: 'Creating tangible, functional software tools like QuickToolHub to simplify daily computing tasks.',
      tag: 'PRODUCTS',
      color: 'text-primary border-primary/30 bg-primary/10',
    },
    {
      icon: BookOpen,
      title: 'Continuous Learning',
      desc: 'Eagerly learning cutting-edge AI foundations, mobile systems, and full-stack paradigms.',
      tag: 'EXPLORATION',
      color: 'text-secondary border-secondary/30 bg-secondary/10',
    },
  ];

  return (
    <section
      id="about"
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
      aria-label="About Me Section"
    >
      {/* Module Header Bar */}
      <div className="flex items-center justify-between mb-8 pb-2 border-b border-primary/20">
        <div className="flex items-center gap-2">
          <span className="font-label-telemetry text-xs text-primary uppercase font-bold tracking-widest">
            [ SYS_MODULE: 02_PILOT_DOSSIER ]
          </span>
        </div>
        <span className="font-label-telemetry text-[10px] text-amber-bright bg-amber-warn/10 border border-amber-warn/30 px-2 py-0.5 rounded">
          ARCHIVE_ID: AK-99 // VERIFIED
        </span>
      </div>

      {/* Main Dossier Glass Card */}
      <div className="relative rounded-xl bg-obsidian-card/80 border border-outline-variant/80 p-6 sm:p-8 backdrop-blur-md hud-bracket shadow-2xl flex flex-col gap-6">
        {/* Pilot Header Profile Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-outline-variant/50">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-obsidian-panel border border-primary/50 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(0,240,255,0.25)]">
              <UserCheck className="w-7 h-7 text-primary" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="font-grotesk text-2xl sm:text-3xl font-bold text-white">Ayush Kumar</h2>
                <span className="px-2 py-0.5 rounded border border-primary/40 bg-primary/15 text-primary font-label-telemetry text-[10px] font-bold">
                  CADET_ID: CSE_01
                </span>
              </div>
              <p className="font-sans text-sm text-secondary font-medium">
                Full Stack Developer | Computer Science Engineering Student
              </p>
            </div>
          </div>

          {/* Geospatial and Operational Telemetry Badges */}
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded bg-obsidian-panel border border-outline-variant flex items-center gap-1.5 font-label-telemetry text-xs text-on-surface-variant">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>Jabalpur, MP, India</span>
            </div>
            <div className="px-3 py-1 rounded bg-amber-warn/10 border border-amber-warn/30 font-label-telemetry text-xs text-amber-bright flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-warn animate-pulse" />
              <span>READY TO COLLABORATE</span>
            </div>
          </div>
        </div>

        {/* Core Biography - Exact User Statement */}
        <div className="p-5 rounded-lg bg-obsidian-panel/80 border-l-4 border-primary border-t border-r border-b border-outline-variant/40 shadow-inner">
          <p className="font-sans text-base sm:text-lg text-on-surface leading-relaxed">
            "I'm Ayush Kumar, a Computer Science Engineering student at{' '}
            <span className="text-primary font-semibold">
              Gyan Ganga Institute of Technology and Science, Jabalpur
            </span>
            . I'm interested in full-stack development, programming, problem-solving, and building useful digital experiences. I enjoy learning new technologies and applying my knowledge through practical projects."
          </p>
        </div>

        {/* Architectural Pillars / Core Focus Areas */}
        <div className="flex flex-col gap-3">
          <h3 className="font-grotesk font-semibold text-sm sm:text-base text-primary uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Core Focus Disciplines</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-obsidian-panel/60 border border-outline-variant/60 hover:border-primary/40 hover:bg-obsidian-card transition-all duration-300 flex flex-col justify-between gap-3 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-9 h-9 rounded bg-obsidian-card border border-outline-variant flex items-center justify-center text-primary group-hover:border-primary transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`px-2 py-0.5 rounded font-label-telemetry text-[9px] font-bold border ${item.color}`}>
                      {item.tag}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-grotesk font-bold text-sm text-white group-hover:text-primary transition-colors mb-1">
                      {item.title}
                    </h4>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
