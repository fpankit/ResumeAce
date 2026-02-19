'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Timeline({ data, theme, style }: TemplateProps) {
  return (
    <div className="space-y-12" style={{ fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight }}>
      <header className="flex justify-between items-center">
        <div className="w-1/2">
          <h1 className="text-4xl font-black tracking-tight leading-none" style={{ color: theme.primary }}>{data.personal.fullName}</h1>
          <p className="text-sm font-bold opacity-40 mt-2 uppercase tracking-widest">{data.personal.jobTitle}</p>
        </div>
        <div className="w-1/2 text-right text-[10px] font-bold text-slate-400">
          <p>{data.personal.email}</p>
          <p>{data.personal.location}</p>
        </div>
      </header>
      <section className="relative pl-10">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200" />
        <h2 className="absolute -left-[18px] top-0 w-9 h-9 rounded-full bg-white border-2 flex items-center justify-center text-[10px] font-black uppercase" style={{ color: theme.primary, borderColor: theme.primary }}>Now</h2>
        <div className="pt-2">
          <h3 className="text-xs font-black uppercase mb-4 opacity-40">Professional Journey</h3>
          {data.experience.map((exp, i) => (
            <div key={exp.id} className="relative mb-12 last:mb-0">
              <div className="absolute -left-[46px] top-1 w-3 h-3 rounded-full border-2 bg-white" style={{ borderColor: theme.accent }} />
              <div className="flex justify-between font-bold mb-2">
                <span className="text-slate-900">{exp.title}</span>
                <span className="text-slate-400 text-[10px]">{exp.period}</span>
              </div>
              <p className="text-[10px] font-black uppercase mb-4" style={{ color: theme.accent }}>{exp.company}</p>
              <p className="text-slate-600">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}