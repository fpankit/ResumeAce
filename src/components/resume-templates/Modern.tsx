
'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Modern({ data, theme, style }: TemplateProps) {
  return (
    <div className="space-y-10" style={{ fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight }}>
      <header className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-5xl font-black tracking-tighter leading-none" style={{ color: theme.primary }}>{data.personal.fullName}</h1>
          <p className="text-xl font-bold opacity-40 uppercase tracking-tighter">{data.personal.jobTitle}</p>
        </div>
        <div className="text-right text-[10px] font-bold space-y-1 text-slate-400">
          <p>{data.personal.email}</p>
          <p>{data.personal.phone}</p>
          <p>{data.personal.location}</p>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-1 space-y-8">
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: theme.accent }}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s} className="px-2 py-1 bg-slate-50 border rounded text-[9px] font-bold uppercase">{s}</span>
              ))}
            </div>
          </section>
        </div>
        <div className="col-span-2 space-y-8">
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 border-l-4 pl-3" style={{ color: theme.primary, borderColor: theme.primary }}>Summary</h2>
            <p className="text-slate-600 italic">{data.summary}</p>
          </section>
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 border-l-4 pl-3" style={{ color: theme.primary, borderColor: theme.primary }}>Experience</h2>
            {data.experience.map(exp => (
              <div key={exp.id} className="mb-6">
                <h3 className="font-black text-slate-900">{exp.title}</h3>
                <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
                  <span style={{ color: theme.accent }}>{exp.company}</span>
                  <span className="text-slate-400">{exp.period}</span>
                </div>
                <p className="text-slate-600 text-sm whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
