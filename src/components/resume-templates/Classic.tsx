
'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function Classic({ data, theme, sections, style }: TemplateProps) {
  const s = { 
    fontSize: `${style.fontSize}px`, 
    lineHeight: style.lineHeight,
    fontFamily: style.fontFamily
  };
  const spacing = { marginBottom: `${style.sectionSpacing}px` };
  
  return (
    <div className="space-y-6" style={s}>
      {/* Header */}
      <header className="text-center border-b-2 pb-6" style={{ borderColor: theme.primary, marginBottom: `${style.sectionSpacing}px` }}>
        <h1 className="text-5xl font-black uppercase tracking-tighter" style={{ color: theme.primary }}>{data.personal.fullName}</h1>
        <p className="text-lg font-bold opacity-60 uppercase tracking-widest mt-1">{data.personal.jobTitle}</p>
        {data.personal.headline && <p className="text-xs italic text-slate-400 mt-2">{data.personal.headline}</p>}
        <div className="flex justify-center flex-wrap gap-4 text-[10px] font-bold mt-4 opacity-50 uppercase tracking-widest">
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
      
      {/* Professional Summary */}
      {sections.summary && data.summary.content && (
        <section style={spacing}>
          <h2 className="text-xs font-black uppercase tracking-widest border-b-2 mb-3 pb-1" style={{ color: theme.primary, borderColor: theme.primary }}>Professional Profile</h2>
          <p className="text-slate-600 whitespace-pre-wrap text-sm leading-relaxed">{data.summary.content}</p>
        </section>
      )}

      {/* Work Experience */}
      {sections.experience && data.experience.length > 0 && (
        <section style={spacing}>
          <h2 className="text-xs font-black uppercase tracking-widest border-b-2 mb-4 pb-1" style={{ color: theme.primary, borderColor: theme.primary }}>Work Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-6 last:mb-0">
              <div className="flex justify-between font-black text-slate-900 uppercase tracking-tight">
                <span className="text-lg">{exp.title}</span>
                <span className="text-slate-400 text-[10px] pt-2">{exp.startMonth} {exp.startYear} — {exp.current ? 'Present' : `${exp.endMonth} ${exp.endYear}`}</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-black uppercase mb-3">
                <span style={{ color: theme.accent }}>{exp.company}</span>
                <span className="text-slate-400 opacity-60">{exp.employmentType} | {exp.location}</span>
              </div>
              
              {exp.responsibilities && (
                <div className="text-slate-600 whitespace-pre-wrap text-sm leading-relaxed mb-3">
                  {exp.responsibilities.split('\n').map((line, i) => line && (
                    <p key={i} className="flex gap-2 mb-1">
                      <span className="text-slate-300">•</span>
                      {line}
                    </p>
                  ))}
                </div>
              )}
              
              {exp.achievements && (
                <div className="mt-2 pl-4 border-l-4 border-slate-100 italic">
                   <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Key Impact</p>
                   <div className="text-slate-500 text-xs">
                    {exp.achievements.split('\n').map((line, i) => line && <p key={i}>{line}</p>)}
                   </div>
                </div>
              )}

              {exp.technologies && (
                <p className="text-[10px] text-slate-400 mt-3 font-bold uppercase tracking-widest">Technologies: {exp.technologies}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {sections.projects && data.projects.length > 0 && (
        <section style={spacing}>
          <h2 className="text-xs font-black uppercase tracking-widest border-b-2 mb-4 pb-1" style={{ color: theme.primary, borderColor: theme.primary }}>Notable Projects</h2>
          {data.projects.map((proj) => (
            <div key={proj.id} className="mb-6 last:mb-0">
              <div className="flex justify-between font-black text-slate-900 uppercase">
                <span className="text-base">{proj.title}</span>
                <span className="text-slate-400 text-[10px]">{proj.duration}</span>
              </div>
              <p className="text-[11px] font-bold uppercase" style={{ color: theme.accent }}>{proj.role} {proj.teamSize && `• Team of ${proj.teamSize}`}</p>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">{proj.description}</p>
              {proj.impact && <p className="text-slate-500 text-xs mt-2 italic font-medium">Impact: {proj.impact}</p>}
              {proj.technologies && (
                <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase">Stack: {proj.technologies}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {sections.skills && data.skills.length > 0 && (
        <section style={spacing}>
          <h2 className="text-xs font-black uppercase tracking-widest border-b-2 mb-3 pb-1" style={{ color: theme.primary, borderColor: theme.primary }}>Skills & Expertise</h2>
          <div className="space-y-4">
            {data.skills.map(group => (
              <div key={group.id} className="grid grid-cols-4 gap-4">
                <span className="text-[10px] font-black uppercase text-slate-400 shrink-0">{group.category}</span>
                <div className="col-span-3 flex flex-wrap gap-x-4 gap-y-1">
                  {group.items.map(skill => (
                    <span key={skill.id} className="text-sm font-bold text-slate-700">
                      {skill.name} <span className="text-[10px] opacity-30">({skill.level}%)</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {sections.education && data.education.length > 0 && (
        <section style={spacing}>
          <h2 className="text-xs font-black uppercase tracking-widest border-b-2 mb-3 pb-1" style={{ color: theme.primary, borderColor: theme.primary }}>Education</h2>
          {data.education.map(edu => (
            <div key={edu.id} className="mb-4 last:mb-0">
              <div className="flex justify-between font-black text-slate-900 uppercase">
                <span>{edu.degree} in {edu.field}</span>
                <span className="text-slate-400 text-[10px]">{edu.startYear} — {edu.endYear}</span>
              </div>
              <p className="text-xs font-black text-slate-500 uppercase mt-1 tracking-widest">{edu.school}, {edu.location}</p>
              {edu.gpa && <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">GPA: {edu.gpa} {edu.honors && `• ${edu.honors}`}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Certifications & Achievements */}
      <div className="grid grid-cols-2 gap-8">
        {sections.certifications && data.certifications.length > 0 && (
          <section style={spacing}>
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 mb-3 pb-1" style={{ color: theme.primary, borderColor: theme.primary }}>Certifications</h2>
            {data.certifications.map(cert => (
              <div key={cert.id} className="mb-2">
                <p className="text-sm font-bold text-slate-800">{cert.name}</p>
                <p className="text-[10px] font-black uppercase text-slate-400">{cert.org} • {cert.issueDate}</p>
              </div>
            ))}
          </section>
        )}

        {sections.achievements && data.achievements.length > 0 && (
          <section style={spacing}>
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 mb-3 pb-1" style={{ color: theme.primary, borderColor: theme.primary }}>Achievements</h2>
            {data.achievements.map(ach => (
              <div key={ach.id} className="mb-2">
                <p className="text-sm font-bold text-slate-800">{ach.title}</p>
                <p className="text-[10px] font-black uppercase text-slate-400">{ach.category} • {ach.year}</p>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* Languages & Interests */}
      <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-100">
        {sections.languages && data.languages.length > 0 && (
          <section>
            <h2 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">Languages</h2>
            <div className="space-y-1">
              {data.languages.map(lang => (
                <div key={lang.id} className="flex justify-between text-xs font-bold text-slate-700 uppercase tracking-tighter">
                  <span>{lang.name}</span>
                  <span className="opacity-40">{lang.speaking}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {sections.interests && data.interests.length > 0 && (
          <section>
            <h2 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">Interests & Hobbies</h2>
            <div className="flex flex-wrap gap-2">
              {data.interests.map((interest, i) => (
                <span key={i} className="text-xs font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                  {interest}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Custom Sections */}
      {sections.customSections && data.customSections.map(cs => (
        <section key={cs.id} style={spacing}>
          <h2 className="text-xs font-black uppercase tracking-widest border-b-2 mb-3 pb-1" style={{ color: theme.primary, borderColor: theme.primary }}>{cs.title}</h2>
          <div className="text-slate-600 whitespace-pre-wrap text-sm leading-relaxed">{cs.content}</div>
        </section>
      ))}
    </div>
  );
}
