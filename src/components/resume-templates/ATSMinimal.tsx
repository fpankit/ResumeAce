
'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function ATSMinimal({ data, sections, style }: TemplateProps) {
  const s = { fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight };

  return (
    <div className="font-serif text-black space-y-4" style={s}>
      <header className="text-center border-b border-black pb-2">
        <h1 className="text-2xl font-bold uppercase">{data.personal.fullName}</h1>
        <p className="text-[10px] uppercase font-bold tracking-tight">
          {data.personal.location.city}, {data.personal.location.state} | {data.personal.phone} | {data.personal.email}
          {data.personal.linkedin && ` | ${data.personal.linkedin}`}
        </p>
      </header>

      {sections.summary && data.summary.content && (
        <section>
          <h2 className="font-bold border-b border-black uppercase text-[10px] mb-1">Professional Summary</h2>
          <p className="text-[11px] text-justify">{data.summary.content}</p>
        </section>
      )}

      {sections.experience && data.experience.length > 0 && (
        <section>
          <h2 className="font-bold border-b border-black uppercase text-[10px] mb-2">Experience</h2>
          {data.experience.map(exp => (
            <div key={exp.id} className="mb-3 last:mb-0">
              <div className="flex justify-between font-bold uppercase text-[11px]">
                <span>{exp.company}</span>
                <span>{exp.startMonth} {exp.startYear} – {exp.current ? 'Present' : `${exp.endMonth} ${exp.endYear}`}</span>
              </div>
              <div className="flex justify-between items-baseline italic text-[10px]">
                <span>{exp.title}</span>
                <span>{exp.location}</span>
              </div>
              <div className="text-[10px] whitespace-pre-wrap mt-1 leading-snug">
                {(exp.responsibilities || '').split('\n').map((line, i) => line && <p key={i}>• {line}</p>)}
                {(exp.achievements || '').split('\n').map((line, i) => line && <p key={i}>• Achievement: {line}</p>)}
              </div>
            </div>
          ))}
        </section>
      )}

      {sections.skills && data.skills.length > 0 && (
        <section>
          <h2 className="font-bold border-b border-black uppercase text-[10px] mb-1">Skills</h2>
          <div className="space-y-1">
            {data.skills.map(group => (
              <p key={group.id} className="text-[10px]">
                <span className="font-bold uppercase">{group.category}:</span> {group.items.map(i => i.name).join(', ')}
              </p>
            ))}
          </div>
        </section>
      )}

      {sections.education && data.education.length > 0 && (
        <section>
          <h2 className="font-bold border-b border-black uppercase text-[10px] mb-1">Education</h2>
          {data.education.map(edu => (
            <div key={edu.id} className="flex justify-between items-baseline text-[10px] mb-1">
              <div>
                <span className="font-bold">{edu.school}</span>, {edu.location} — <span className="italic">{edu.degree} in {edu.field}</span>
              </div>
              <span className="font-bold">{edu.endYear}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
