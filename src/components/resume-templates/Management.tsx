'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Management({ data, theme, style, sections }: TemplateProps) {
  const s = { fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight };
  const spacing = { marginBottom: `${style.sectionSpacing}px` };

  return (
    <div className="space-y-8" style={s}>
      <header className="flex items-end justify-between border-b-8 pb-4" style={{ borderColor: theme.primary, ...spacing }}>
        <div>
          <h1 className="text-4xl font-black uppercase leading-none" style={{ color: theme.primary }}>{data.personal.fullName}</h1>
          <p className="text-lg font-bold opacity-40 mt-1 uppercase">{data.personal.jobTitle}</p>
        </div>
        <div className="text-right text-[10px] font-bold text-slate-400 space-y-1">
          <p>{data.personal.email}</p>
          <p>{data.personal.phone}</p>
          <p>{data.personal.location.city}</p>
        </div>
      </header>
      <div className="grid grid-cols-5 gap-10">
        <div className="col-span-3 space-y-8">
          {sections.experience && data.experience.length > 0 && (
            <section style={spacing}>
              <h2 className="text-xs font-black uppercase mb-4" style={{ color: theme.primary }}>Professional Experience</h2>
              {data.experience.map(exp => (
                <div key={exp.id} className="mb-6 last:mb-0">
                  <h3 className="font-bold text-slate-900">{exp.title}</h3>
                  <p className="text-[11px] font-black uppercase opacity-60 mb-2">
                    {exp.company} | {exp.startMonth} {exp.startYear} - {exp.current ? 'Now' : `${exp.endMonth} ${exp.endYear}`}
                  </p>
                  <div className="text-slate-600 whitespace-pre-wrap leading-relaxed">
                    {(exp.responsibilities || '').split('\n').map((line, i) => line && <p key={i}>• {line}</p>)}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
        <div className="col-span-2 space-y-8">
          {sections.summary && data.summary.content && (
            <section style={spacing}>
              <h2 className="text-xs font-black uppercase mb-4" style={{ color: theme.primary }}>Executive Summary</h2>
              <p className="text-slate-600 text-sm italic border-l-2 pl-4 leading-relaxed">{data.summary.content}</p>
            </section>
          )}
          {sections.skills && data.skills.length > 0 && (
            <section style={spacing}>
              <h2 className="text-xs font-black uppercase mb-4" style={{ color: theme.primary }}>Competencies</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.flatMap(group => group.items).map(skill => (
                  <span key={skill.id} className="px-2 py-1 bg-slate-900 text-white text-[9px] font-black uppercase">{skill.name}</span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
