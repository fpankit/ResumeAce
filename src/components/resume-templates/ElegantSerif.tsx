'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function ElegantSerif({ data, theme, style }: TemplateProps) {
  return (
    <div className="space-y-12 font-serif" style={{ fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight }}>
      <header className="text-center border-b-2 border-double pb-10" style={{ borderColor: theme.primary }}>
        <h1 className="text-5xl font-black" style={{ color: theme.primary }}>{data.personal.fullName}</h1>
        <div className="flex justify-center gap-6 text-[10px] font-sans font-bold opacity-40 uppercase tracking-widest mt-4">
          <span>{data.personal.location}</span>
          <span>{data.personal.email}</span>
        </div>
      </header>
      <section className="max-w-2xl mx-auto text-center">
        <p className="text-slate-600 italic text-lg leading-relaxed">{data.summary}</p>
      </section>
      <section className="space-y-10">
        <h2 className="text-center text-xs font-sans font-black uppercase tracking-[0.4em] opacity-30">Experience</h2>
        {data.experience.map(exp => (
          <div key={exp.id} className="text-center space-y-2">
            <h3 className="text-xl font-bold text-slate-900">{exp.title}</h3>
            <p className="font-sans text-[10px] font-black uppercase" style={{ color: theme.accent }}>{exp.company} | {exp.period}</p>
            <p className="text-slate-600 font-sans max-w-2xl mx-auto text-sm leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}