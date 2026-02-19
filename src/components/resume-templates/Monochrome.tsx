'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Monochrome({ data, theme, style, sections }: TemplateProps) {
  const s = { fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight };
  const spacing = { marginBottom: `${style.sectionSpacing}px` };

  return (
    <div className="space-y-6" style={s}>
      <header className="border-b-2 border-black pb-4 flex justify-between items-end" style={spacing}>
        <h1 className="text-3xl font-black uppercase tracking-tighter text-black">{data.personal.fullName}</h1>
        <div className="text-[10px] font-bold text-black uppercase tracking-widest">
          {data.personal.location.city} | {data.personal.email}
        </div>
      </header>

      {sections.summary && data.summary.content && (
        <section style={spacing}>
          <h2 className="font-bold text-black border-b border-black uppercase text-[10px] mb-2">Statement</h2>
          <p className="text-black text-[11px] leading-snug">{data.summary.content}</p>
        </section>
      )}

      {sections.experience && data.experience.length > 0 && (
        <section style={spacing}>
          <h2 className="font-bold text-black border-b border-black uppercase text-[10px] mb-4">Professional Record</h2>
          {data.experience.map(exp => (
            <div key={exp.id} className="mb-6 last:mb-0">
              <div className="flex justify-between font-bold text-black">
                <span>{exp.title}</span>
                <span className="text-[9px] uppercase">{exp.startMonth} {exp.startYear} - {exp.current ? 'Now' : `${exp.endMonth} ${exp.endYear}`}</span>
              </div>
              <p className="text-[10px] italic mb-2 uppercase">{exp.company}</p>
              <div className="text-black text-[10px] leading-normal whitespace-pre-wrap">
                {(exp.responsibilities || '').split('\n').map((line, i) => line && <p key={i}>• {line}</p>)}
              </div>
            </div>
          ))}
        </section>
      )}

      {sections.skills && data.skills.length > 0 && (
        <section style={spacing}>
          <h2 className="font-bold text-black border-b border-black uppercase text-[10px] mb-2">Technical Core</h2>
          <p className="text-black text-[10px] font-bold">
            {data.skills.flatMap(group => group.items).map(i => i.name).join(' / ')}
          </p>
        </section>
      )}
    </div>
  );
}
