'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Fresher({ data, theme, style }: TemplateProps) {
  return (
    <div className="space-y-8" style={{ fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight }}>
      <header className="bg-slate-50 p-10 -m-[60px] mb-10 text-center">
        <h1 className="text-3xl font-black uppercase tracking-tighter" style={{ color: theme.primary }}>{data.personal.fullName}</h1>
        <div className="flex justify-center gap-4 text-[10px] font-bold text-slate-400 mt-4 uppercase">
          <span>{data.personal.email}</span>
          <span>{data.personal.phone}</span>
        </div>
      </header>
      <section>
        <h2 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" /> Objective <div className="h-px flex-1 bg-slate-200" />
        </h2>
        <p className="text-slate-600 text-center leading-relaxed">{data.summary}</p>
      </section>
      <section>
        <h2 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" /> Education <div className="h-px flex-1 bg-slate-200" />
        </h2>
        {data.education.map(edu => (
          <div key={edu.id} className="text-center">
            <p className="font-bold text-slate-900">{edu.degree}</p>
            <p className="text-xs text-slate-500">{edu.school} | {edu.period}</p>
          </div>
        ))}
      </section>
      <section>
        <h2 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" /> Skills <div className="h-px flex-1 bg-slate-200" />
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {data.skills.map(s => (
            <span key={s} className="px-4 py-2 bg-white border border-slate-100 rounded-full text-[10px] font-bold uppercase shadow-sm">{s}</span>
          ))}
        </div>
      </section>
    </div>
  );
}