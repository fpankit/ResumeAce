'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Creative({ data, theme, style, sections }: TemplateProps) {
  const s = { fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight };
  const spacing = { marginBottom: `${style.sectionSpacing}px` };

  return (
    <div className="h-full" style={s}>
      <header className="mb-12" style={spacing}>
        <h1 className="text-6xl font-black tracking-tighter" style={{ color: theme.primary }}>
          {data.personal.fullName.split(' ')[0]}
          <span className="opacity-20">{data.personal.fullName.split(' ').slice(1).join(' ')}</span>
        </h1>
        <div className="h-2 w-24 mt-4" style={{ backgroundColor: theme.accent }} />
      </header>

      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-4 space-y-12">
          {sections.summary && data.summary.content && (
            <section style={spacing}>
              <h2 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-40">Profile</h2>
              <p className="text-sm font-medium text-slate-500 leading-relaxed">
                {data.summary.content}
              </p>
            </section>
          )}

          {sections.skills && data.skills.length > 0 && (
            <section style={spacing}>
              <h2 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-40">Skills</h2>
              <div className="space-y-4">
                {data.skills.map(group => (
                  <div key={group.id} className="space-y-2">
                    <p className="text-[9px] font-black uppercase text-slate-400">{group.category}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map(skill => (
                        <div key={skill.id} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accent }} />
                          <span className="text-[10px] font-bold text-slate-600">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-8 space-y-12">
          {sections.experience && data.experience.length > 0 && (
            <section style={spacing}>
              <h2 className="text-[10px] font-black uppercase tracking-widest mb-6 opacity-40">History</h2>
              {data.experience.map(exp => (
                <div key={exp.id} className="mb-10 group">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors">{exp.title}</h3>
                    <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded">
                      {exp.startDate} - {exp.current ? 'Now' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs font-black uppercase opacity-40 mb-4">{exp.company}</p>
                  <div className="text-slate-500 whitespace-pre-wrap leading-relaxed">
                    • {exp.description.replace(/\n/g, '\n• ')}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
