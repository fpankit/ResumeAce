
'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Tech({ data, theme, style, sections }: TemplateProps) {
  const s = { fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight };
  
  return (
    <div className="space-y-8 font-mono" style={s}>
      <header className="bg-slate-900 text-white p-8 -m-[60px] mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <div className="text-8xl font-black">{"{ }"}</div>
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter relative z-10">
          <span className="text-[#EF593E]">&gt;</span> {data.personal.fullName}
        </h1>
        <p className="text-lg opacity-60 font-bold uppercase tracking-widest mt-1">{data.personal.jobTitle}</p>
        <div className="flex flex-wrap gap-4 text-[10px] mt-4 opacity-40 uppercase">
          <span>{data.personal.email}</span>
          <span>{data.personal.phone}</span>
          <span>{data.personal.location.city}, {data.personal.location.country}</span>
          {data.personal.github && <span>{data.personal.github}</span>}
        </div>
      </header>

      {sections.summary && data.summary.content && (
        <section>
          <h2 className="text-sm font-black uppercase mb-4 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#EF593E]"></span> Profile.log()
          </h2>
          <div className="text-slate-600 bg-slate-50 p-4 border-l-2 border-slate-200 text-sm leading-relaxed">
            {data.summary.content}
          </div>
        </section>
      )}

      {sections.experience && data.experience.length > 0 && (
        <section>
          <h2 className="text-sm font-black uppercase mb-4 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#EF593E]"></span> experience.init()
          </h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="border-l border-slate-100 pl-4 ml-0.5">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{exp.title}</span>
                  <span className="text-[10px] text-slate-400">{exp.startMonth} {exp.startYear} - {exp.current ? 'NOW' : `${exp.endMonth} ${exp.endYear}`}</span>
                </div>
                <p className="text-[11px] font-bold uppercase mb-2" style={{ color: theme.accent }}>{exp.company}</p>
                <div className="text-xs text-slate-500 whitespace-pre-wrap leading-relaxed mb-2">
                  {(exp.responsibilities || '').split('\n').map((line, i) => line && <p key={i}>• {line}</p>)}
                </div>
                {exp.technologies && (
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Stack: {exp.technologies}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {sections.skills && data.skills.length > 0 && (
        <section>
          <h2 className="text-sm font-black uppercase mb-4 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#EF593E]"></span> stack.dump()
          </h2>
          <div className="space-y-4">
            {data.skills.map(group => (
              <div key={group.id} className="grid grid-cols-4 gap-2">
                <div className="col-span-1 text-[9px] font-black uppercase text-slate-400 py-1">{group.category}</div>
                <div className="col-span-3 flex flex-wrap gap-2">
                  {group.items.map(skill => (
                    <div key={skill.id} className="px-2 py-1 bg-slate-100 text-[9px] font-bold text-600 border border-slate-200 uppercase">
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
