import React from 'react';
import { GraduationCap, Calendar, MapPin, BookOpen, Clock } from 'lucide-react';

const educationData = [
  {
    degree: 'B.Tech — Computer Science Engineering',
    institution: 'Gyan Ganga Institute of Technology and Science (GGITS)',
    location: 'Jabalpur, Madhya Pradesh, India',
    period: 'August 2024 – May 2028',
    status: 'Currently Pursuing',
    active: true,
    code: 'WAYPOINT_01 // B.TECH_CSE',
    details: 'Foundations of Computer Science, Software Architecture, Data Structures, Algorithms, and System Engineering.',
  },
  {
    degree: 'Class 12th',
    institution: 'Dr. C.P. Thakur College',
    location: 'Higher Secondary Education',
    period: 'April 2022 – May 2024',
    status: 'Completed',
    active: false,
    code: 'WAYPOINT_02 // HIGHER_SECONDARY',
    details: 'Senior secondary education with focus on Science, Mathematics, and Analytical Physics foundations.',
  },
];

export default function Education() {
  return (
    <section
      id="education"
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
      aria-label="Education Section"
    >
      {/* Module Header Bar */}
      <div className="flex items-center justify-between mb-8 pb-2 border-b border-primary/20">
        <div className="flex items-center gap-2">
          <span className="font-label-telemetry text-xs text-secondary uppercase font-bold tracking-widest">
            [ SYS_MODULE: 05_CHRONOMETER_LOG ]
          </span>
        </div>
        <span className="font-label-telemetry text-[10px] text-on-surface-variant font-mono">
          ACADEMIC PATHWAY
        </span>
      </div>

      <div className="flex flex-col gap-1 mb-8">
        <h2 className="font-grotesk font-bold text-3xl sm:text-4xl text-white">
          Education &amp; Academic Timeline
        </h2>
        <p className="font-sans text-sm text-on-surface-variant">
          Academic foundations in computer science, software engineering, and analytical problem solving.
        </p>
      </div>

      {/* Chronometer Flight Timeline */}
      <div className="relative pl-6 sm:pl-8 flex flex-col gap-8 max-w-4xl">
        {/* Continuous Luminous Timeline Wire */}
        <div className="absolute left-2.5 sm:left-3.5 top-3 bottom-4 w-[2px] bg-gradient-to-b from-primary via-secondary to-transparent" />

        {educationData.map((item, index) => (
          <div key={index} className="relative flex flex-col gap-2">
            {/* Timeline Node Pulsing Marker */}
            <span
              className={`absolute -left-[23px] sm:-left-[27px] top-4 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                item.active
                  ? 'border-primary bg-obsidian shadow-[0_0_12px_#00f0ff]'
                  : 'border-outline-variant bg-obsidian-card'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  item.active ? 'bg-primary animate-pulse' : 'bg-outline-variant'
                }`}
              />
            </span>

            {/* Timeline Card */}
            <div className="p-5 sm:p-6 rounded-xl bg-obsidian-card/85 border border-outline-variant/80 hover:border-primary/40 backdrop-blur-md hud-bracket shadow-xl flex flex-col gap-3 transition-all duration-300">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-outline-variant/40 pb-3">
                <span className="font-label-telemetry text-xs text-primary font-bold">
                  {item.code}
                </span>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded font-label-telemetry text-[10px] font-bold border flex items-center gap-1 text-on-surface-variant border-outline-variant bg-obsidian-panel">
                    <Calendar className="w-3 h-3 text-primary" />
                    <span>{item.period}</span>
                  </span>

                  <span
                    className={`px-2 py-0.5 rounded font-label-telemetry text-[10px] font-bold border ${
                      item.active
                        ? 'border-primary/50 bg-primary/15 text-primary'
                        : 'border-outline-variant bg-obsidian-panel text-on-surface-variant'
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-grotesk font-bold text-lg sm:text-xl text-white mb-1">
                  {item.degree}
                </h3>
                <h4 className="font-sans text-sm text-secondary font-medium flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-secondary" />
                  <span>{item.institution}</span>
                </h4>
                {item.location && (
                  <span className="font-sans text-xs text-on-surface-variant flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-primary/70" />
                    <span>{item.location}</span>
                  </span>
                )}
              </div>

              <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed pt-1 border-t border-outline-variant/30">
                {item.details}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
