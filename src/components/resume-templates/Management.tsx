'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Management({ data, theme, style }: TemplateProps) {
  return (
    <div className="space-y-8" style={{ fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight }}>
      <header className="flex items-end justify-between border-b-8 pb-4" style={{ borderColor: theme.primary }}>
        <div>
          <h1 className="text-4xl font-black uppercase leading-none" style={{ color: theme.primary }}>{data.personal.fullName}</h1>
          <p className="text-lg font-bold opacity-40 mt-1 uppercase">{data.personal.jobTitle}</p>
        </div>
        <div className="text-right text-[10px] font-bold text-slate-400 space-y-1">
          <p>{data.personal.email}</p>
          <p>{data.personal.phone}</p>
        </div>
      </header>
      <div className="grid grid-cols-5 gap-10">
        <div className="col-span-3 space-y-8">
          <section>
            <h2 className="text-xs font-black uppercase mb-4" style={{ color: theme.primary }}>Professional Experience</h2>
            {data.experience.map(exp => (
              <div key={exp.id} className="mb-6">
                <h3 className="font-bold text-slate-900">{exp.title}</h3>
                <p className="text-[11px] font-black uppercase opacity-60 mb-2">{exp.company} | {exp.period}</p>
                <p className="text-slate-600">{exp.description}</p>
              </div>
            ))}
          </section>
        </div>
        <div className="col-span-2 space-y-8">
          <section>
            <h2 className="text-xs font-black uppercase mb-4" style={{ color: theme.primary }}>Executive Summary</h2>
            <p className="text-slate-600 text-sm italic border-l-2 pl-4">{data.summary}</p>
          </section>
          <section>
            <h2 className="text-xs font-black uppercase mb-4" style={{ color: theme.primary }}>Competencies</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s} className="px-2 py-1 bg-slate-900 text-white text-[9px] font-black uppercase">{s}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}