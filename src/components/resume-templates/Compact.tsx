'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Compact({ data, theme, style }: TemplateProps) {
  return (
    <div className="space-y-4" style={{ fontSize: `${style.fontSize - 1}px`, lineHeight: style.lineHeight - 0.2 }}>
      <header className="flex justify-between items-center border-b pb-2">
        <h1 className="text-2xl font-black uppercase" style={{ color: theme.primary }}>{data.personal.fullName}</h1>
        <div className="text-[9px] font-bold text-slate-400 space-x-2">
          <span>{data.personal.email}</span>
          <span>|</span>
          <span>{data.personal.phone}</span>
        </div>
      </header>
      <section>
        <p className="text-slate-600 text-[11px]">{data.summary}</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-[10px] font-black uppercase border-b" style={{ color: theme.primary }}>History</h2>
        {data.experience.map(exp => (
          <div key={exp.id}>
            <div className="flex justify-between font-bold">
              <span>{exp.title} @ {exp.company}</span>
              <span className="opacity-40">{exp.period}</span>
            </div>
            <p className="text-slate-500 whitespace-pre-wrap mt-1">{exp.description}</p>
          </div>
        ))}
      </section>
      <section>
        <h2 className="text-[10px] font-black uppercase border-b mb-2" style={{ color: theme.primary }}>Skills</h2>
        <p className="text-slate-600 font-bold">{data.skills.join(' • ')}</p>
      </section>
    </div>
  );
}