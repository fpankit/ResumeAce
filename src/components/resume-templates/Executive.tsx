'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Executive({ data, theme, style, sections }: TemplateProps) {
  const s = { fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight };
  const spacing = { marginBottom: `${style.sectionSpacing}px` };

  return (
    <div className="space-y-8" style={s}>
      <header className="border-b-4 pb-6" style={{ borderColor: theme.primary, ...spacing }}>
        <h1 className="text-4xl font-black uppercase tracking-tighter" style={{ color: theme.primary }}>{data.personal.fullName}</h1>
        <p className="text-lg font-bold opacity-60 uppercase tracking-widest">{data.personal.jobTitle}</p>
        <div className="flex gap-4 text-[10px] mt-4 font-bold opacity-40 uppercase tracking-widest">
          <span>{data.personal.location.city}, {data.personal.location.country}</span>
          <span>•</span>
          <span>{data.personal.email}</span>
        </div>
      </header>

      {sections.summary && data.summary.content && (
        <section style={spacing}>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ color: theme.primary }}>Executive Profile</h2>
          <p className="text-slate-600 leading-relaxed">{data.summary.content}</p>
        </section>
      )}

      {sections.experience && data.experience.length > 0 && (
        <section style={spacing}>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ color: theme.primary }}>Leadership Experience</h2>
          {data.experience.map(exp => (
            <div key={exp.id} className="mb-6 last:mb-0">
              <div className="flex justify-between items-baseline font-bold">
                <span className="text-slate-900">{exp.title}</span>
                <span className="text-[10px] opacity-40 uppercase">
                   {exp.startMonth} {exp.startYear} – {exp.current ? 'Present' : `${exp.endMonth} ${exp.endYear}`}
                </span>
              </div>
              <p className="text-[11px] font-black uppercase mb-2" style={{ color: theme.accent }}>{exp.company}</p>
              <div className="text-slate-600 whitespace-pre-wrap leading-relaxed">
                {(exp.responsibilities || '').split('\n').map((line, i) => line && <p key={i}>• {line}</p>)}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
