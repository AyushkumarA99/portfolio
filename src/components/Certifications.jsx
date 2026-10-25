import React from 'react';
import { Award, ShieldCheck, Cpu, Code2, Database, Sparkles, Terminal } from 'lucide-react';

const certs = [
  {
    title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle University',
    year: '2025',
    category: 'Cloud & Artificial Intelligence',
    icon: Sparkles,
    featured: true,
    desc: 'Foundational concepts of artificial intelligence, machine learning principles, and generative AI services on Oracle Cloud Infrastructure.',
    color: 'from-primary/20 via-primary-panel to-obsidian-card border-primary/50 text-primary',
  },
  {
    title: 'C++ Essentials 1',
    issuer: 'Cisco Networking Academy / OpenEDG C++ Institute',
    year: 'Certified',
    category: 'Core Systems Programming',
    icon: Code2,
    featured: false,
    desc: 'Fundamental concepts of computer programming, syntax and semantics of the C++ language, data types, and logic structures.',
    color: 'border-primary/30 text-primary',
  },
  {
    title: 'Python Essentials 1',
    issuer: 'Cisco Networking Academy / OpenEDG Python Institute',
    year: 'Certified',
    category: 'Python Foundations',
    icon: Terminal,
    featured: false,
    desc: 'Core Python syntax, conditional execution, loops, data collections, lists, and basic algorithm design.',
    color: 'border-amber-warn/30 text-amber-bright',
  },
  {
    title: 'Python Essentials 2',
    issuer: 'Cisco Networking Academy / OpenEDG Python Institute',
    year: 'Certified',
    category: 'Advanced Python',
    icon: Terminal,
    featured: false,
    desc: 'Object-oriented programming in Python, modules, packages, exceptions, string processing, and file handling.',
    color: 'border-amber-warn/30 text-amber-bright',
  },
  {
    title: 'Introduction to Cyber Security',
    issuer: 'Security Foundations',
    year: 'Certified',
    category: 'Security Operations',
    icon: ShieldCheck,
    featured: false,
    desc: 'Cybersecurity principles, defense strategies, threats, vulnerabilities, and information security ethics.',
    color: 'border-secondary/30 text-secondary',
  },
  {
    title: 'Introduction to Modern AI',
    issuer: 'AI Foundations',
    year: 'Certified',
    category: 'Machine Intelligence',
    icon: Cpu,
    featured: false,
    desc: 'Modern artificial intelligence paradigms, neural logic basics, and practical applications across computing.',
    color: 'border-secondary/30 text-secondary',
  },
  {
    title: 'Introduction to Data Science',
    issuer: 'Data Foundations',
    year: 'Certified',
    category: 'Data Analytics',
    icon: Database,
    featured: false,
    desc: 'Data analysis workflows, exploratory data analysis, statistical thinking, and data visualization basics.',
    color: 'border-primary/30 text-primary',
  },
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
      aria-label="Certifications Section"
    >
      {/* Module Header Bar */}
      <div className="flex items-center justify-between mb-8 pb-2 border-b border-primary/20">
        <div className="flex items-center gap-2">
          <span className="font-label-telemetry text-xs text-primary uppercase font-bold tracking-widest">
            [ SYS_MODULE: 06_STAMPED_CREDENTIALS ]
          </span>
        </div>
        <span className="font-label-telemetry text-[10px] text-amber-bright bg-amber-warn/10 border border-amber-warn/30 px-2 py-0.5 rounded">
          CREDENTIAL_LEDGER // 7 ENTRIES
        </span>
      </div>

      <div className="flex flex-col gap-1 mb-8">
        <h2 className="font-grotesk font-bold text-3xl sm:text-4xl text-white">
          Verified Certifications &amp; Credentials
        </h2>
        <p className="font-sans text-sm text-on-surface-variant max-w-2xl">
          Formal credentials in Artificial Intelligence, C++, Python, Data Science, and Cybersecurity foundations.
        </p>
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certs.map((cert, index) => {
          const Icon = cert.icon;
          return (
            <div
              key={index}
              className={`p-5 rounded-xl bg-obsidian-card/80 border ${
                cert.featured
                  ? 'border-primary/50 shadow-[0_0_25px_rgba(0,240,255,0.15)] md:col-span-2 lg:col-span-3 bg-gradient-to-r from-obsidian-panel via-obsidian-card to-obsidian-panel'
                  : 'border-outline-variant hover:border-primary/40 hover:bg-obsidian-card'
              } backdrop-blur-md hud-bracket transition-all duration-300 flex flex-col justify-between gap-4`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-obsidian-panel border border-outline-variant flex items-center justify-center text-primary shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-label-telemetry text-[10px] text-on-surface-variant uppercase tracking-wider block">
                      {cert.category}
                    </span>
                    <h3 className="font-grotesk font-bold text-base sm:text-lg text-white leading-snug">
                      {cert.title}
                    </h3>
                  </div>
                </div>

                <span className="font-label-telemetry text-[10px] text-amber-bright px-2 py-0.5 rounded border border-amber-warn/40 bg-amber-warn/10 font-bold shrink-0">
                  {cert.year}
                </span>
              </div>

              <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {cert.desc}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-outline-variant/30 text-xs font-mono">
                <span className="text-on-surface-variant/80">{cert.issuer}</span>
                <span className="text-primary font-semibold flex items-center gap-1 font-label-telemetry text-[10px]">
                  <Award className="w-3.5 h-3.5 text-primary" />
                  <span>AUDITED</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
