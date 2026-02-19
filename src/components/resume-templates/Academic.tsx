'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Academic({ data, theme, style, sections }: TemplateProps) {
  const s = { fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight };
  const spacing = { marginBottom: `${style.sectionSpacing}px` };

  return (
    <div className="space-y-10" style={s}>
      <header className="text-center space-y-4" style={spacing}>
        <h1 className="text-4xl font-serif font-black tracking-widest" style={{ color: theme.primary }}>
          {data.personal.fullName.toUpperCase()}
        </h1>
        <div className="flex justify-center flex-wrap gap-4 text-[10px] font-bold opacity-40 uppercase tracking-widest">
          <span>{data.personal.location}</span>
          <span>{data.personal.email}</span>
          <span>{data.personal.phone}</span>
          {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
        </div>
      </header>

      {sections.summary && data.summary.content && (
        <section className="grid grid-cols-4 gap-8" style={spacing}>
          <div className="col-span-1 text-right font-black uppercase text-[10px] opacity-40" style={{ color: theme.accent }}>
            Research Profile
          </div>
          <div className="col-span-3 text-slate-600 italic">
            {data.summary.content}
          </div>
        </section>
      )}

      {sections.experience && data.experience.length > 0 && (
        <section className="grid grid-cols-4 gap-8" style={spacing}>
          <div className="col-span-1 text-right font-black uppercase text-[10px] opacity-40" style={{ color: theme.accent }}>
            Experience
          </div>
          <div className="col-span-3 space-y-8">
            {data.experience.map(exp => (
              <div key={exp.id} className="space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-lg">{exp.title}</span>
                  <span className="text-slate-400 text-xs">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="font-bold opacity-60 text-xs uppercase">{exp.company} | {exp.location}</p>
                <div className="text-slate-600 whitespace-pre-wrap">• {exp.description.replace(/\n/g, '\n• ')}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {sections.skills && data.skills.length > 0 && (
        <section className="grid grid-cols-4 gap-8" style={spacing}>
          <div className="col-span-1 text-right font-black uppercase text-[10px] opacity-40" style={{ color: theme.accent }}>
            Expertise
          </div>
          <div className="col-span-3 space-y-4">
            {data.skills.map(group => (
              <div key={group.id} className="space-y-1">
                <p className="text-[10px] font-black uppercase text-slate-400">{group.category}</p>
                <p className="text-slate-600">{group.items.map(i => i.name).join(', ')}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
