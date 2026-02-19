'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Executive({ data, theme, style }: TemplateProps) {
  return (
    <div className="space-y-8" style={{ fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight }}>
      <header className="border-b-4 pb-6" style={{ borderColor: theme.primary }}>
        <h1 className="text-4xl font-black uppercase tracking-tighter" style={{ color: theme.primary }}>{data.personal.fullName}</h1>
        <p className="text-lg font-bold opacity-60 uppercase tracking-widest">{data.personal.jobTitle}</p>
        <div className="flex gap-4 text-[10px] mt-4 font-bold opacity-40 uppercase tracking-widest">
          <span>{data.personal.location}</span>
          <span>•</span>
          <span>{data.personal.email}</span>
        </div>
      </header>
      <section>
        <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ color: theme.primary }}>Executive Profile</h2>
        <p className="text-slate-600 leading-relaxed">{data.summary}</p>
      </section>
      <section>
        <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ color: theme.primary }}>Leadership Experience</h2>
        {data.experience.map(exp => (
          <div key={exp.id} className="mb-6">
            <div className="flex justify-between items-baseline font-bold">
              <span className="text-slate-900">{exp.title}</span>
              <span className="text-[10px] opacity-40">{exp.period}</span>
            </div>
            <p className="text-[11px] font-black uppercase mb-2" style={{ color: theme.accent }}>{exp.company}</p>
            <p className="text-slate-600 whitespace-pre-wrap">{exp.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}