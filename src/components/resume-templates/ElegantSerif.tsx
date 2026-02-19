'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function ElegantSerif({ data, theme, style, sections }: TemplateProps) {
  const s = { fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight };
  const spacing = { marginBottom: `${style.sectionSpacing}px` };

  return (
    <div className="space-y-12 font-serif" style={s}>
      <header className="text-center border-b-2 border-double pb-10" style={{ borderColor: theme.primary, ...spacing }}>
        <h1 className="text-5xl font-black" style={{ color: theme.primary }}>{data.personal.fullName}</h1>
        <div className="flex justify-center gap-6 text-[10px] font-sans font-bold opacity-40 uppercase tracking-widest mt-4">
          <span>{data.personal.location.city}, {data.personal.location.country}</span>
          <span>{data.personal.email}</span>
        </div>
      </header>

      {sections.summary && data.summary.content && (
        <section className="max-w-2xl mx-auto text-center" style={spacing}>
          <p className="text-slate-600 italic text-lg leading-relaxed">{data.summary.content}</p>
        </section>
      )}

      {sections.experience && data.experience.length > 0 && (
        <section className="space-y-10" style={spacing}>
          <h2 className="text-center text-xs font-sans font-black uppercase tracking-[0.4em] opacity-30">Experience</h2>
          {data.experience.map(exp => (
            <div key={exp.id} className="text-center space-y-2">
              <h3 className="text-xl font-bold text-slate-900">{exp.title}</h3>
              <p className="font-sans text-[10px] font-black uppercase" style={{ color: theme.accent }}>
                {exp.company} | {exp.startMonth} {exp.startYear} – {exp.current ? 'Present' : `${exp.endMonth} ${exp.endYear}`}
              </p>
              <div className="text-slate-600 font-sans max-w-2xl mx-auto text-sm leading-relaxed whitespace-pre-wrap">
                {(exp.responsibilities || '').split('\n').map((line, i) => line && <p key={i}>{line}</p>)}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
