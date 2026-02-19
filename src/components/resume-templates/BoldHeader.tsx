'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function BoldHeader({ data, theme, style }: TemplateProps) {
  return (
    <div className="space-y-8" style={{ fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight }}>
      <header className="bg-slate-900 text-white p-12 -m-[60px] mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter">{data.personal.fullName}</h1>
          <p className="text-xl font-bold opacity-60 mt-2" style={{ color: theme.accent }}>{data.personal.jobTitle}</p>
        </div>
        <div className="text-right text-xs font-bold opacity-60 space-y-1">
          <p>{data.personal.email}</p>
          <p>{data.personal.location}</p>
        </div>
      </header>
      <section>
        <h2 className="text-xs font-black uppercase tracking-widest border-b-2 mb-4 pb-1" style={{ borderColor: theme.accent }}>Executive Summary</h2>
        <p className="text-slate-600 leading-relaxed font-medium">{data.summary}</p>
      </section>
      <section>
        <h2 className="text-xs font-black uppercase tracking-widest border-b-2 mb-6 pb-1" style={{ borderColor: theme.accent }}>Career History</h2>
        {data.experience.map(exp => (
          <div key={exp.id} className="mb-8">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-lg font-black text-slate-900">{exp.title}</h3>
              <span className="text-[10px] font-bold text-slate-400">{exp.period}</span>
            </div>
            <p className="text-xs font-black uppercase mb-4" style={{ color: theme.accent }}>{exp.company}</p>
            <p className="text-slate-600 whitespace-pre-wrap border-l-4 pl-6" style={{ borderColor: `${theme.accent}33` }}>{exp.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}