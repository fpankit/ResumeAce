
'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Classic({ data, theme, style }: TemplateProps) {
  const s = { fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight };
  
  return (
    <div className="space-y-8" style={s}>
      <header className="text-center border-b-2 pb-6" style={{ borderColor: theme.primary }}>
        <h1 className="text-4xl font-bold uppercase tracking-tight" style={{ color: theme.primary }}>{data.personal.fullName}</h1>
        <p className="text-sm font-semibold opacity-60 uppercase tracking-widest mt-1">{data.personal.jobTitle}</p>
        <div className="flex justify-center gap-4 text-[10px] font-bold mt-4 opacity-50">
          <span>{data.personal.email}</span>
          <span>•</span>
          <span>{data.personal.phone}</span>
          <span>•</span>
          <span>{data.personal.location}</span>
        </div>
      </header>
      
      <section>
        <h2 className="text-xs font-black uppercase tracking-widest border-b mb-3 pb-1" style={{ color: theme.primary, borderColor: `${theme.primary}33` }}>Profile</h2>
        <p className="text-slate-600">{data.summary}</p>
      </section>

      <section>
        <h2 className="text-xs font-black uppercase tracking-widest border-b mb-4 pb-1" style={{ color: theme.primary, borderColor: `${theme.primary}33` }}>Experience</h2>
        {data.experience.map((exp) => (
          <div key={exp.id} className="mb-6 last:mb-0">
            <div className="flex justify-between font-bold">
              <span className="text-slate-900">{exp.title}</span>
              <span className="text-slate-400 text-[10px]">{exp.period}</span>
            </div>
            <div className="text-[11px] font-bold uppercase mb-2" style={{ color: theme.accent }}>{exp.company}</div>
            <p className="text-slate-600 whitespace-pre-wrap">{exp.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
