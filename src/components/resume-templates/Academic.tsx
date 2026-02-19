'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Academic({ data, theme, style }: TemplateProps) {
  return (
    <div className="space-y-10" style={{ fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight }}>
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-serif font-black tracking-widest" style={{ color: theme.primary }}>{data.personal.fullName.toUpperCase()}</h1>
        <div className="flex justify-center gap-6 text-[10px] font-bold opacity-40 uppercase tracking-widest">
          <span>{data.personal.location}</span>
          <span>{data.personal.email}</span>
          <span>{data.personal.phone}</span>
        </div>
      </header>
      <section className="grid grid-cols-4 gap-8">
        <div className="col-span-1 text-right font-black uppercase text-[10px] opacity-40" style={{ color: theme.accent }}>Research Profile</div>
        <div className="col-span-3 text-slate-600 italic">{data.summary}</div>
      </section>
      <section className="grid grid-cols-4 gap-8">
        <div className="col-span-1 text-right font-black uppercase text-[10px] opacity-40" style={{ color: theme.accent }}>Professional Experience</div>
        <div className="col-span-3 space-y-8">
          {data.experience.map(exp => (
            <div key={exp.id} className="space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-lg">{exp.title}</span>
                <span className="text-slate-400">{exp.period}</span>
              </div>
              <p className="font-bold opacity-60">{exp.company}</p>
              <p className="text-slate-600">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}