'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Fresher({ data, theme, style, sections }: TemplateProps) {
  const s = { fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight };
  const spacing = { marginBottom: `${style.sectionSpacing}px` };

  return (
    <div className="space-y-8" style={s}>
      <header className="bg-slate-50 p-10 -m-[60px] mb-10 text-center">
        <h1 className="text-3xl font-black uppercase tracking-tighter" style={{ color: theme.primary }}>{data.personal.fullName}</h1>
        <div className="flex justify-center gap-4 text-[10px] font-bold text-slate-400 mt-4 uppercase">
          <span>{data.personal.email}</span>
          <span>{data.personal.phone}</span>
          <span>{data.personal.location.city}</span>
        </div>
      </header>

      {sections.summary && data.summary.content && (
        <section style={spacing}>
          <h2 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" /> Objective <div className="h-px flex-1 bg-slate-200" />
          </h2>
          <p className="text-slate-600 text-center leading-relaxed">{data.summary.content}</p>
        </section>
      )}

      {sections.education && data.education.length > 0 && (
        <section style={spacing}>
          <h2 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" /> Education <div className="h-px flex-1 bg-slate-200" />
          </h2>
          {data.education.map(edu => (
            <div key={edu.id} className="text-center mb-4 last:mb-0">
              <p className="font-bold text-slate-900">{edu.degree} in {edu.field}</p>
              <p className="text-xs text-slate-500">{edu.school} | {edu.startYear} - {edu.endYear}</p>
            </div>
          ))}
        </section>
      )}

      {sections.skills && data.skills.length > 0 && (
        <section style={spacing}>
          <h2 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" /> Skills <div className="h-px flex-1 bg-slate-200" />
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {data.skills.flatMap(group => group.items).map(skill => (
              <span key={skill.id} className="px-4 py-2 bg-white border border-slate-100 rounded-full text-[10px] font-bold uppercase shadow-sm">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
