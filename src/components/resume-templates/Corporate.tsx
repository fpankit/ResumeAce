'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Corporate({ data, theme, style, sections }: TemplateProps) {
  const s = { fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight };
  const spacing = { marginBottom: `${style.sectionSpacing}px` };

  return (
    <div className="space-y-10" style={s}>
      <header className="flex justify-between items-start border-b-2 pb-6" style={{ borderColor: theme.primary, ...spacing }}>
        <div className="bg-slate-900 text-white p-6 -ml-16 pr-12">
          <h1 className="text-3xl font-black uppercase tracking-tighter leading-none">{data.personal.fullName}</h1>
          <p className="text-sm font-bold opacity-60 uppercase mt-1">{data.personal.jobTitle}</p>
        </div>
        <div className="text-right text-[10px] font-bold text-slate-400 pt-6">
          <p>{data.personal.email}</p>
          <p>{data.personal.phone}</p>
          <p>{data.personal.location.city}, {data.personal.location.country}</p>
        </div>
      </header>

      {sections.summary && data.summary.content && (
        <section style={spacing}>
          <h2 className="bg-slate-50 p-2 text-xs font-black uppercase tracking-widest mb-4" style={{ color: theme.primary }}>Executive Summary</h2>
          <p className="text-slate-600 text-sm leading-relaxed px-2">{data.summary.content}</p>
        </section>
      )}

      {sections.skills && data.skills.length > 0 && (
        <section style={spacing}>
          <h2 className="bg-slate-50 p-2 text-xs font-black uppercase tracking-widest mb-4" style={{ color: theme.primary }}>Core Qualifications</h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-2 px-2">
            {data.skills.flatMap(group => group.items).map(skill => (
              <div key={skill.id} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
                {skill.name}
              </div>
            ))}
          </div>
        </section>
      )}

      {sections.experience && data.experience.length > 0 && (
        <section style={spacing}>
          <h2 className="bg-slate-50 p-2 text-xs font-black uppercase tracking-widest mb-6" style={{ color: theme.primary }}>Experience</h2>
          <div className="px-2">
            {data.experience.map(exp => (
              <div key={exp.id} className="mb-8 last:mb-0">
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-slate-900">{exp.title}</span>
                  <span className="text-slate-400 text-[10px] uppercase">{exp.startMonth} {exp.startYear} – {exp.current ? 'Present' : `${exp.endMonth} ${exp.endYear}`}</span>
                </div>
                <p className="text-[10px] font-black uppercase mb-4" style={{ color: theme.accent }}>{exp.company}</p>
                <div className="text-slate-600 text-sm whitespace-pre-wrap leading-relaxed">
                  {(exp.responsibilities || '').split('\n').map((line, i) => line && <p key={i}>• {line}</p>)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
