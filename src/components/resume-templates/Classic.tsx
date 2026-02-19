'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Classic({ data, theme, sections, style }: TemplateProps) {
  const s = { fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight };
  const spacing = { marginBottom: `${style.sectionSpacing}px` };
  
  return (
    <div className="space-y-6" style={s}>
      <header className="text-center border-b-2 pb-6" style={{ borderColor: theme.primary, marginBottom: `${style.sectionSpacing}px` }}>
        <h1 className="text-4xl font-bold uppercase tracking-tight" style={{ color: theme.primary }}>{data.personal.fullName}</h1>
        <p className="text-sm font-semibold opacity-60 uppercase tracking-widest mt-1">{data.personal.jobTitle}</p>
        {data.personal.headline && <p className="text-xs italic text-slate-400 mt-2">{data.personal.headline}</p>}
        <div className="flex justify-center flex-wrap gap-4 text-[10px] font-bold mt-4 opacity-50">
          <span>{data.personal.email}</span>
          <span>•</span>
          <span>{data.personal.phone}</span>
          <span>•</span>
          <span>{data.personal.location?.city}, {data.personal.location?.country}</span>
          {data.personal.linkedin && (
            <>
              <span>•</span>
              <span>{data.personal.linkedin}</span>
            </>
          )}
        </div>
      </header>
      
      {sections.summary && data.summary.content && (
        <section style={spacing}>
          <h2 className="text-xs font-black uppercase tracking-widest border-b mb-3 pb-1" style={{ color: theme.primary, borderColor: `${theme.primary}33` }}>Professional Profile</h2>
          {data.summary.asBullets ? (
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              {data.summary.content.split('\n').map((line, i) => line && <li key={i}>{line}</li>)}
            </ul>
          ) : (
            <p className="text-slate-600 whitespace-pre-wrap">{data.summary.content}</p>
          )}
        </section>
      )}

      {sections.experience && data.experience.length > 0 && (
        <section style={spacing}>
          <h2 className="text-xs font-black uppercase tracking-widest border-b mb-4 pb-1" style={{ color: theme.primary, borderColor: `${theme.primary}33` }}>Work Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-6 last:mb-0">
              <div className="flex justify-between font-bold">
                <span className="text-slate-900">{exp.title}</span>
                <span className="text-slate-400 text-[10px]">{exp.startMonth} {exp.startYear} — {exp.current ? 'Present' : `${exp.endMonth} ${exp.endYear}`}</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-bold uppercase mb-2">
                <span style={{ color: theme.accent }}>{exp.company}</span>
                <span className="text-slate-400 opacity-60">{exp.employmentType} | {exp.location}</span>
              </div>
              
              {exp.responsibilities && (
                <div className="text-slate-600 whitespace-pre-wrap text-sm leading-relaxed mb-2">
                  {exp.responsibilities.split('\n').map((line, i) => line && <p key={i} className="flex gap-2"><span className="opacity-40">•</span> {line}</p>)}
                </div>
              )}
              
              {exp.achievements && (
                <div className="mt-2 pl-4 border-l-2 border-slate-100 italic">
                   <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Key Impact</p>
                   <div className="text-slate-500 text-xs">
                    {exp.achievements.split('\n').map((line, i) => line && <p key={i}>{line}</p>)}
                   </div>
                </div>
              )}

              {exp.technologies && (
                <p className="text-[10px] text-slate-400 mt-2"><strong>Technologies:</strong> {exp.technologies}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {sections.skills && data.skills.length > 0 && (
        <section style={spacing}>
          <h2 className="text-xs font-black uppercase tracking-widest border-b mb-3 pb-1" style={{ color: theme.primary, borderColor: `${theme.primary}33` }}>Skills & Expertise</h2>
          <div className="space-y-3">
            {data.skills.map(group => (
              <div key={group.id} className="flex gap-4">
                <span className="text-[10px] font-black uppercase text-slate-400 w-32 shrink-0">{group.category}</span>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {group.items.map(skill => (
                    <span key={skill.id} className="text-xs text-slate-600">{skill.name} <span className="text-[9px] opacity-40 font-bold">({skill.level}%)</span></span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {sections.education && data.education.length > 0 && (
        <section style={spacing}>
          <h2 className="text-xs font-black uppercase tracking-widest border-b mb-3 pb-1" style={{ color: theme.primary, borderColor: `${theme.primary}33` }}>Education</h2>
          {data.education.map(edu => (
            <div key={edu.id} className="mb-4 last:mb-0">
              <div className="flex justify-between font-bold">
                <span className="text-slate-900">{edu.degree} in {edu.field}</span>
                <span className="text-slate-400 text-[10px]">{edu.startYear} — {edu.endYear}</span>
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase">{edu.school}, {edu.location}</p>
              {edu.gpa && <p className="text-[10px] text-slate-400 mt-1">GPA: {edu.gpa} {edu.honors && `• ${edu.honors}`}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
