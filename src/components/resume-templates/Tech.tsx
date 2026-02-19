
'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Tech({ data, theme, style }: TemplateProps) {
  return (
    <div className="space-y-8 font-mono" style={{ fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight }}>
      <header className="bg-slate-900 text-white p-8 -m-[60px] mb-8">
        <h1 className="text-4xl font-black uppercase tracking-tighter">
          <span className="text-[#EF593E]">&gt;</span> {data.personal.fullName}
        </h1>
        <p className="text-lg opacity-60 font-bold uppercase tracking-widest">{data.personal.jobTitle}</p>
        <div className="flex gap-4 text-[10px] mt-4 opacity-40">
          <span>{data.personal.email}</span>
          <span>{data.personal.phone}</span>
          <span>{data.personal.location}</span>
        </div>
      </header>

      <section>
        <h2 className="text-sm font-black uppercase mb-4 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-[#EF593E]"></span> Profile
        </h2>
        <p className="text-slate-600 bg-slate-50 p-4 border-l-2 border-slate-200">{data.summary}</p>
      </section>

      <section>
        <h2 className="text-sm font-black uppercase mb-4 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-[#EF593E]"></span> Experience
        </h2>
        <div className="space-y-6">
          {data.experience.map(exp => (
            <div key={exp.id} className="border-l border-slate-100 pl-4 ml-0.5">
              <div className="flex justify-between font-bold text-slate-900">
                <span>{exp.title}</span>
                <span className="text-[10px] text-slate-400">{exp.period}</span>
              </div>
              <p className="text-[11px] font-bold uppercase mb-2" style={{ color: theme.accent }}>{exp.company}</p>
              <p className="text-xs text-slate-500 whitespace-pre-wrap leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-black uppercase mb-4 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-[#EF593E]"></span> Skills
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {data.skills.map(s => (
            <div key={s} className="px-2 py-1 bg-slate-100 text-[10px] font-bold text-slate-600 border border-slate-200 text-center uppercase">{s}</div>
          ))}
        </div>
      </section>
    </div>
  );
}
