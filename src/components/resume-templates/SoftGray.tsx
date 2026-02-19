'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function SoftGray({ data, theme, style }: TemplateProps) {
  return (
    <div className="space-y-10" style={{ fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight }}>
      <header className="text-center bg-slate-50 p-12 -m-[60px] mb-12 rounded-b-[60px]">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900">{data.personal.fullName}</h1>
        <p className="text-lg font-bold opacity-30 uppercase mt-2">{data.personal.jobTitle}</p>
        <div className="flex justify-center gap-4 text-[10px] font-bold text-slate-400 mt-6 uppercase">
          <span>{data.personal.email}</span>
          <span>{data.personal.location}</span>
        </div>
      </header>
      <section className="px-8">
        <p className="text-center text-slate-500 italic leading-relaxed">{data.summary}</p>
      </section>
      <section className="px-8 space-y-10">
        <h2 className="text-center text-[10px] font-black uppercase tracking-widest opacity-20">Career Record</h2>
        {data.experience.map(exp => (
          <div key={exp.id} className="relative pb-10 last:pb-0">
            <div className="flex justify-between items-baseline mb-4">
              <h3 className="text-lg font-black text-slate-800">{exp.title}</h3>
              <span className="text-[10px] font-bold text-slate-300">{exp.period}</span>
            </div>
            <p className="text-slate-500 whitespace-pre-wrap">{exp.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}