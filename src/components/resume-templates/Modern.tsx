'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Modern({ data, theme, style, sections }: TemplateProps) {
  const s = { fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight };
  
  return (
    <div className="space-y-10" style={s}>
      <header className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-5xl font-black tracking-tighter leading-none" style={{ color: theme.primary }}>{data.personal.fullName}</h1>
          <p className="text-xl font-bold opacity-40 uppercase tracking-tighter">{data.personal.jobTitle}</p>
        </div>
        <div className="text-right text-[10px] font-bold space-y-1 text-slate-400 uppercase">
          <p>{data.personal.email}</p>
          <p>{data.personal.phone}</p>
          <p>{data.personal.location}</p>
          {data.personal.linkedin && <p>{data.personal.linkedin}</p>}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-1 space-y-8">
          {sections.skills && data.skills.length > 0 && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: theme.accent }}>Expertise</h2>
              <div className="space-y-4">
                {data.skills.map(group => (
                  <div key={group.id} className="space-y-2">
                    <p className="text-[9px] font-black uppercase text-slate-400">{group.category}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map(item => (
                        <span key={item.id} className="px-2 py-1 bg-slate-50 border rounded-[4px] text-[8px] font-bold uppercase text-slate-600">
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {sections.education && data.education.length > 0 && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: theme.accent }}>Education</h2>
              {data.education.map(edu => (
                <div key={edu.id} className="mb-3">
                  <p className="font-bold text-slate-800 leading-tight">{edu.degree}</p>
                  <p className="text-[10px] text-slate-500">{edu.school}</p>
                  <p className="text-[9px] font-bold opacity-40 uppercase mt-1">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="col-span-2 space-y-8">
          {sections.summary && data.summary.content && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 border-l-4 pl-3" style={{ color: theme.primary, borderColor: theme.primary }}>Profile</h2>
              <p className="text-slate-600 italic leading-relaxed text-sm">
                {data.summary.content}
              </p>
            </section>
          )}

          {sections.experience && data.experience.length > 0 && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 border-l-4 pl-3" style={{ color: theme.primary, borderColor: theme.primary }}>Experience</h2>
              {data.experience.map(exp => (
                <div key={exp.id} className="mb-8 last:mb-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-black text-slate-900 text-lg leading-none">{exp.title}</h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] font-bold uppercase mt-1 mb-3">
                    <span style={{ color: theme.accent }}>{exp.company}</span>
                    <span className="opacity-40">{exp.location}</span>
                  </div>
                  <p className="text-slate-600 text-sm whitespace-pre-wrap leading-relaxed mb-2">• {exp.description.replace(/\n/g, '\n• ')}</p>
                  {exp.technologies && (
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Stack: {exp.technologies}</p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
