'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Hybrid({ data, theme, style }: TemplateProps) {
  return (
    <div className="space-y-12" style={{ fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight }}>
      <header className="flex gap-10">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl font-black text-white shadow-xl" style={{ backgroundColor: theme.primary }}>
          {data.personal.fullName[0]}
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tight" style={{ color: theme.primary }}>{data.personal.fullName}</h1>
          <div className="flex gap-4 text-xs font-bold text-slate-400 uppercase mt-2">
            <span>{data.personal.jobTitle}</span>
            <span>•</span>
            <span>{data.personal.location}</span>
          </div>
        </div>
      </header>
      <section>
        <h2 className="text-xs font-black uppercase tracking-widest mb-4 opacity-40">Core Expertise</h2>
        <div className="flex flex-wrap gap-3">
          {data.skills.map(s => (
            <span key={s} className="px-4 py-2 bg-slate-50 border rounded-lg text-xs font-bold text-slate-600">{s}</span>
          ))}
        </div>
      </section>
      <div className="grid grid-cols-12 gap-12 border-t pt-10">
        <div className="col-span-8 space-y-10">
          <section>
            <h2 className="text-xs font-black uppercase tracking-widest mb-6" style={{ color: theme.accent }}>Professional Path</h2>
            {data.experience.map(exp => (
              <div key={exp.id} className="mb-10 last:mb-0">
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-lg text-slate-900">{exp.title}</span>
                  <span className="text-[10px] text-slate-400">{exp.period}</span>
                </div>
                <p className="text-xs font-black uppercase mb-4" style={{ color: theme.accent }}>{exp.company}</p>
                <p className="text-slate-600 text-sm whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </section>
        </div>
        <div className="col-span-4">
          <section>
            <h2 className="text-xs font-black uppercase tracking-widest mb-6 opacity-40">Profile</h2>
            <p className="text-slate-500 text-sm italic leading-relaxed">{data.summary}</p>
          </section>
        </div>
      </div>
    </div>
  );
}