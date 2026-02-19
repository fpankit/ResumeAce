'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function SoftGray({ data, theme, style, sections }: TemplateProps) {
  const s = { fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight };
  const spacing = { marginBottom: `${style.sectionSpacing}px` };

  return (
    <div className="space-y-10" style={s}>
      <header className="text-center bg-slate-50 p-12 -m-[60px] mb-12 rounded-b-[60px]" style={spacing}>
        <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900">{data.personal.fullName}</h1>
        <p className="text-lg font-bold opacity-30 uppercase mt-2">{data.personal.jobTitle}</p>
        <div className="flex justify-center gap-4 text-[10px] font-bold text-slate-400 mt-6 uppercase">
          <span>{data.personal.email}</span>
          <span>{data.personal.location.city}, {data.personal.location.country}</span>
        </div>
      </header>

      {sections.summary && data.summary.content && (
        <section className="px-8" style={spacing}>
          <p className="text-center text-slate-500 italic leading-relaxed">{data.summary.content}</p>
        </section>
      )}

      {sections.experience && data.experience.length > 0 && (
        <section className="px-8 space-y-10" style={spacing}>
          <h2 className="text-center text-[10px] font-black uppercase tracking-widest opacity-20">Career Record</h2>
          {data.experience.map(exp => (
            <div key={exp.id} className="relative pb-10 last:pb-0">
              <div className="flex justify-between items-baseline mb-4">
                <h3 className="text-lg font-black text-slate-800">{exp.title}</h3>
                <span className="text-[10px] font-bold text-slate-300 uppercase">
                  {exp.startMonth} {exp.startYear} - {exp.current ? 'Now' : `${exp.endMonth} ${exp.endYear}`}
                </span>
              </div>
              <div className="text-slate-500 whitespace-pre-wrap leading-relaxed">
                {(exp.responsibilities || '').split('\n').map((line, i) => line && <p key={i}>• {line}</p>)}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
