'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export default function Modern({ data, theme, style, sections }: TemplateProps) {
  const s = { fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight };
  
  return (
    <div className="space-y-10" style={s}>
      <header className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tighter leading-none" style={{ color: theme.primary }}>
            {data.personal.fullName}
          </h1>
          <p className="text-xl font-bold opacity-50 uppercase tracking-tighter text-slate-500">{data.personal.jobTitle}</p>
          {data.personal.headline && <p className="text-xs font-medium text-slate-400 italic max-w-md">{data.personal.headline}</p>}
        </div>
        <div className="text-right space-y-2">
          <div className="flex flex-col gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <div className="flex items-center justify-end gap-2">{data.personal.email} <Mail className="h-3 w-3" /></div>
            <div className="flex items-center justify-end gap-2">{data.personal.phone} <Phone className="h-3 w-3" /></div>
            <div className="flex items-center justify-end gap-2">{data.personal.location?.city}, {data.personal.location?.country} <MapPin className="h-3 w-3" /></div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            {data.personal.linkedin && <Linkedin className="h-3.5 w-3.5 text-blue-600" />}
            {data.personal.github && <Github className="h-3.5 w-3.5 text-slate-900" />}
            {data.personal.portfolio && <Globe className="h-3.5 w-3.5 text-[#EF593E]" />}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-4 space-y-10">
          {sections.skills && data.skills.length > 0 && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 border-b-2 pb-1" style={{ color: theme.primary, borderColor: `${theme.primary}22` }}>Core Expertise</h2>
              <div className="space-y-6">
                {data.skills.map(group => (
                  <div key={group.id} className="space-y-3">
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{group.category}</p>
                    <div className="space-y-2">
                      {group.items.map(skill => (
                        <div key={skill.id} className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold text-slate-700">
                            <span>{skill.name}</span>
                            <span className="opacity-40">{skill.years}y</span>
                          </div>
                          <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-slate-300 rounded-full transition-all duration-1000" style={{ width: `${skill.level}%`, backgroundColor: theme.primary }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {sections.education && data.education.length > 0 && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 border-b-2 pb-1" style={{ color: theme.primary, borderColor: `${theme.primary}22` }}>Academic Record</h2>
              {data.education.map(edu => (
                <div key={edu.id} className="mb-6 last:mb-0">
                  <p className="font-bold text-slate-800 text-[11px] uppercase tracking-tight leading-tight">{edu.degree}</p>
                  <p className="text-[10px] font-bold text-slate-500 mt-1">{edu.school}</p>
                  <div className="flex justify-between text-[9px] font-bold opacity-40 uppercase mt-2">
                    <span>{edu.startYear} - {edu.endYear}</span>
                    <span style={{ color: theme.accent }}>GPA: {edu.gpa}</span>
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="col-span-8 space-y-10">
          {sections.summary && data.summary.content && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 border-l-4 pl-4" style={{ color: theme.primary, borderColor: theme.primary }}>Executive Summary</h2>
              <div className="text-slate-600 text-[13px] leading-relaxed italic border-l-4 border-slate-50 pl-4">
                {data.summary.content}
              </div>
            </section>
          )}

          {sections.experience && data.experience.length > 0 && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 border-l-4 pl-4" style={{ color: theme.primary, borderColor: theme.primary }}>Professional Experience</h2>
              {data.experience.map(exp => (
                <div key={exp.id} className="mb-10 last:mb-0 relative pl-4 border-l border-slate-100">
                  <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full border-2 bg-white" style={{ borderColor: theme.accent }} />
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 leading-none">{exp.title}</h3>
                      <p className="text-xs font-black uppercase tracking-widest mt-2" style={{ color: theme.accent }}>{exp.company} • {exp.employmentType}</p>
                    </div>
                    <span className="text-[10px] font-black text-slate-300 uppercase shrink-0">
                      {exp.startMonth} {exp.startYear} — {exp.current ? 'PRESENT' : `${exp.endMonth} ${exp.endYear}`}
                    </span>
                  </div>
                  
                  <div className="mt-4 space-y-4">
                    <div className="text-[13px] text-slate-600 leading-relaxed whitespace-pre-wrap">
                      {(exp.responsibilities || '').split('\n').map((line, i) => (
                        <p key={i} className="flex gap-2 mb-1">
                          <span className="text-slate-300">•</span>
                          {line}
                        </p>
                      ))}
                    </div>
                    
                    {exp.kpiMetrics && (
                      <div className="bg-orange-50/30 p-3 rounded-lg border border-orange-100">
                        <p className="text-[10px] font-black uppercase text-orange-600 tracking-widest mb-1">Core Impact Metric</p>
                        <p className="text-xs font-bold text-slate-700">{exp.kpiMetrics}</p>
                      </div>
                    )}
                    
                    {exp.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.split(',').map((tech, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-100 text-[9px] font-bold text-slate-500 rounded uppercase tracking-tighter">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
