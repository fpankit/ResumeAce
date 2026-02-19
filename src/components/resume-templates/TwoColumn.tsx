'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export default function TwoColumn({ data, theme, style, sections }: TemplateProps) {
  const s = { fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight };

  return (
    <div className="flex h-full gap-10" style={s}>
      {/* Sidebar */}
      <aside className="w-[32%] border-r pr-8" style={{ borderColor: `${theme.primary}22` }}>
        <div className="mb-10">
          <h1 className="text-3xl font-black leading-none uppercase tracking-tighter" style={{ color: theme.primary }}>
            {data.personal.fullName.split(' ')[0]}<br/>
            {data.personal.fullName.split(' ').slice(1).join(' ')}
          </h1>
          <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-3 leading-tight">{data.personal.jobTitle}</p>
        </div>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: theme.primary }}>Contact</h2>
            <div className="space-y-3 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
              <div className="flex items-center gap-2"><Mail className="h-3 w-3 shrink-0" /> <span className="truncate">{data.personal.email}</span></div>
              <div className="flex items-center gap-2"><Phone className="h-3 w-3 shrink-0" /> {data.personal.phone}</div>
              <div className="flex items-center gap-2"><MapPin className="h-3 w-3 shrink-0" /> {data.personal.location?.city}</div>
              {data.personal.linkedin && <div className="flex items-center gap-2"><Linkedin className="h-3 w-3 shrink-0" /> <span className="truncate">{data.personal.linkedin}</span></div>}
              {data.personal.github && <div className="flex items-center gap-2"><Github className="h-3 w-3 shrink-0" /> <span className="truncate">{data.personal.github}</span></div>}
            </div>
          </section>
          
          {sections.skills && data.skills.length > 0 && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: theme.primary }}>Expertise</h2>
              <div className="space-y-5">
                {data.skills.map(group => (
                  <div key={group.id} className="space-y-2">
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">{group.category}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map(skill => (
                        <span key={skill.id} className="px-2 py-1 bg-slate-50 border rounded-[4px] text-[8px] font-bold uppercase tracking-tighter">
                          {skill.name}
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
              <h2 className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: theme.primary }}>Education</h2>
              {data.education.map(edu => (
                <div key={edu.id} className="mb-4 last:mb-0">
                  <p className="text-[10px] font-black text-slate-800 leading-tight uppercase">{edu.degree}</p>
                  <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">{edu.school}</p>
                  <p className="text-[8px] font-bold text-slate-300 uppercase mt-1">{edu.endYear}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 space-y-10">
        {sections.summary && data.summary.content && (
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-widest mb-4 border-b pb-1" style={{ color: theme.primary, borderColor: `${theme.primary}22` }}>Profile</h2>
            <p className="text-slate-600 leading-relaxed italic text-sm">{data.summary.content}</p>
          </section>
        )}
        
        {sections.experience && data.experience.length > 0 && (
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-widest mb-6 border-b pb-1" style={{ color: theme.primary, borderColor: `${theme.primary}22` }}>Work History</h2>
            {data.experience.map(exp => (
              <div key={exp.id} className="mb-8 last:mb-0 relative pl-4 border-l border-slate-100">
                <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full border-2 bg-white" style={{ borderColor: theme.accent }} />
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-black text-slate-900 leading-none">{exp.title}</h3>
                  <span className="text-[9px] font-bold text-slate-300 uppercase shrink-0 ml-4">
                    {exp.startMonth} {exp.startYear} — {exp.current ? 'NOW' : `${exp.endMonth} ${exp.endYear}`}
                  </span>
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase mb-3">
                  <span style={{ color: theme.accent }}>{exp.company}</span>
                  <span className="opacity-40">{exp.location}</span>
                </div>
                <div className="text-xs text-slate-500 whitespace-pre-wrap leading-relaxed space-y-1">
                  {(exp.responsibilities || '').split('\n').map((line, i) => line && <p key={i}>• {line}</p>)}
                  {(exp.achievements || '').split('\n').map((line, i) => line && <p key={i} className="font-semibold italic">→ {line}</p>)}
                </div>
                {exp.technologies && (
                  <p className="text-[9px] font-bold text-slate-400 uppercase mt-2 tracking-tight">Technologies: {exp.technologies}</p>
                )}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
