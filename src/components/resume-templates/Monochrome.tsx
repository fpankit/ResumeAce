'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Monochrome({ data, theme, style }: TemplateProps) {
  return (
    <div className="space-y-6" style={{ fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight }}>
      <header className="border-b-2 border-black pb-4 flex justify-between items-end">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-black">{data.personal.fullName}</h1>
        <div className="text-[10px] font-bold text-black uppercase tracking-widest">
          {data.personal.location} | {data.personal.email}
        </div>
      </header>
      <section>
        <h2 className="font-bold text-black border-b border-black uppercase text-[10px] mb-2">Statement</h2>
        <p className="text-black text-[11px] leading-snug">{data.summary}</p>
      </section>
      <section>
        <h2 className="font-bold text-black border-b border-black uppercase text-[10px] mb-4">Professional Record</h2>
        {data.experience.map(exp => (
          <div key={exp.id} className="mb-6 last:mb-0">
            <div className="flex justify-between font-bold text-black">
              <span>{exp.title}</span>
              <span className="text-[9px]">{exp.period}</span>
            </div>
            <p className="text-[10px] italic mb-2">{exp.company}</p>
            <p className="text-black text-[10px] leading-normal">{exp.description}</p>
          </div>
        ))}
      </section>
      <section>
        <h2 className="font-bold text-black border-b border-black uppercase text-[10px] mb-2">Technical Core</h2>
        <p className="text-black text-[10px] font-bold">{data.skills.join(' / ')}</p>
      </section>
    </div>
  );
}