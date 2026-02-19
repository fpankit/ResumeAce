'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Senior({ data, theme, style }: TemplateProps) {
  return (
    <div className="space-y-10" style={{ fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight }}>
      <header className="border-b-4 pb-8" style={{ borderColor: theme.primary }}>
        <h1 className="text-5xl font-black uppercase tracking-tighter" style={{ color: theme.primary }}>{data.personal.fullName}</h1>
        <p className="text-xl font-bold opacity-30 mt-2 uppercase">{data.personal.jobTitle}</p>
        <div className="grid grid-cols-2 gap-4 mt-8 text-[11px] font-bold text-slate-400">
          <p>{data.personal.location} | {data.personal.phone}</p>
          <p className="text-right">{data.personal.email} | LinkedIn.com/in/profile</p>
        </div>
      </header>
      <section>
        <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ color: theme.accent }}>Executive Vision</h2>
        <p className="text-slate-600 leading-relaxed font-medium">{data.summary}</p>
      </section>
      <section>
        <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-8" style={{ color: theme.accent }}>Career Milestone Record</h2>
        {data.experience.map(exp => (
          <div key={exp.id} className="mb-12 relative pl-8 last:mb-0">
            <div className="absolute left-0 top-1 w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-2xl font-bold text-slate-900 leading-none">{exp.title}</h3>
              <span className="text-xs font-black opacity-30">{exp.period}</span>
            </div>
            <p className="text-[11px] font-black uppercase mb-6" style={{ color: theme.accent }}>{exp.company}</p>
            <p className="text-slate-600 leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}