'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function BlueAccent({ data, theme, style, sections }: TemplateProps) {
  const s = { fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight };
  const spacing = { marginBottom: `${style.sectionSpacing}px` };

  return (
    <div className="h-full border-l-[20px]" style={{ ...s, borderColor: theme.primary }}>
      <div className="pl-12 space-y-10">
        <header style={spacing}>
          <h1 className="text-5xl font-black uppercase tracking-tighter" style={{ color: theme.primary }}>
            {data.personal.fullName}
          </h1>
          <p className="text-xl font-bold opacity-30 mt-2">{data.personal.jobTitle}</p>
        </header>

        <section style={spacing}>
          <h2 className="text-xs font-black uppercase tracking-widest mb-4 opacity-40">Contact</h2>
          <div className="flex flex-wrap gap-8 text-sm font-bold text-slate-500">
            <p>{data.personal.email}</p>
            <p>{data.personal.phone}</p>
            <p>{data.personal.location.city}, {data.personal.location.country}</p>
          </div>
        </section>

        {sections.summary && data.summary.content && (
          <section style={spacing}>
            <h2 className="text-xs font-black uppercase tracking-widest mb-6" style={{ color: theme.accent }}>
              Professional Summary
            </h2>
            <p className="text-slate-600 leading-relaxed italic">
              {data.summary.content}
            </p>
          </section>
        )}

        {sections.experience && data.experience.length > 0 && (
          <section style={spacing}>
            <h2 className="text-xs font-black uppercase tracking-widest mb-10" style={{ color: theme.accent }}>
              Experience
            </h2>
            {data.experience.map(exp => (
              <div key={exp.id} className="mb-12 last:mb-0">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{exp.title}</h3>
                  <span className="text-[10px] font-bold text-slate-300 uppercase">
                    {exp.startMonth} {exp.startYear} – {exp.current ? 'Present' : `${exp.endMonth} ${exp.endYear}`}
                  </span>
                </div>
                <p className="text-xs font-black uppercase mb-4" style={{ color: theme.primary }}>{exp.company}</p>
                <div className="text-slate-600 whitespace-pre-wrap leading-relaxed">
                  {(exp.responsibilities || '').split('\n').map((line, i) => line && <p key={i}>• {line}</p>)}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
