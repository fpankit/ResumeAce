'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Creative({ data, theme, style }: TemplateProps) {
  return (
    <div className="h-full" style={{ fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight }}>
      <header className="mb-12">
        <h1 className="text-6xl font-black tracking-tighter" style={{ color: theme.primary }}>{data.personal.fullName.split(' ')[0]}<span className="opacity-20">{data.personal.fullName.split(' ')[1]}</span></h1>
        <div className="h-2 w-24 mt-4" style={{ backgroundColor: theme.accent }} />
      </header>
      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-4 space-y-12">
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-40">Hello</h2>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">{data.summary}</p>
          </section>
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-40">Skills</h2>
            <div className="space-y-2">
              {data.skills.map(s => (
                <div key={s} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accent }} />
                  <span className="text-xs font-bold text-slate-600">{s}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="col-span-8 space-y-12">
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-widest mb-6 opacity-40">Portfolio History</h2>
            {data.experience.map(exp => (
              <div key={exp.id} className="mb-10 group">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors">{exp.title}</h3>
                  <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded">{exp.period}</span>
                </div>
                <p className="text-xs font-black uppercase opacity-40 mb-4">{exp.company}</p>
                <p className="text-slate-500 whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}