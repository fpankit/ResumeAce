'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Compact({ data, theme, style, sections }: TemplateProps) {
  const s = { fontSize: `${Math.max(10, style.fontSize - 1)}px`, lineHeight: style.lineHeight - 0.2 };
  const spacing = { marginBottom: `${style.sectionSpacing / 2}px` };

  return (
    <div className="space-y-4" style={s}>
      <header className="flex justify-between items-center border-b pb-2" style={spacing}>
        <h1 className="text-2xl font-black uppercase" style={{ color: theme.primary }}>{data.personal.fullName}</h1>
        <div className="text-[9px] font-bold text-slate-400 flex gap-2">
          <span>{data.personal.email}</span>
          <span>|</span>
          <span>{data.personal.phone}</span>
          <span>|</span>
          <span>{data.personal.location}</span>
        </div>
      </header>

      {sections.summary && data.summary.content && (
        <section style={spacing}>
          <p className="text-slate-600 text-[10px]">{data.summary.content}</p>
        </section>
      )}

      {sections.experience && data.experience.length > 0 && (
        <section className="space-y-3" style={spacing}>
          <h2 className="text-[10px] font-black uppercase border-b" style={{ color: theme.primary }}>Experience</h2>
          {data.experience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between font-bold">
                <span>{exp.title} @ {exp.company}</span>
                <span className="opacity-40 text-[8px]">{exp.startDate} - {exp.current ? 'Now' : exp.endDate}</span>
              </div>
              <div className="text-slate-500 text-[9px] whitespace-pre-wrap mt-1">
                • {exp.description.replace(/\n/g, '\n• ')}
              </div>
            </div>
          ))}
        </section>
      )}

      {sections.skills && data.skills.length > 0 && (
        <section style={spacing}>
          <h2 className="text-[10px] font-black uppercase border-b mb-1" style={{ color: theme.primary }}>Skills</h2>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {data.skills.map(group => (
              <p key={group.id} className="text-[9px] text-slate-600">
                <span className="font-bold">{group.category}:</span> {group.items.map(i => i.name).join(', ')}
              </p>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
