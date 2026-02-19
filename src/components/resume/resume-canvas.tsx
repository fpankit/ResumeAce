"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar, Briefcase, GraduationCap, Award, Languages, Heart } from 'lucide-react';

interface ResumeCanvasProps {
  templateId: string;
  theme: any;
  font: any;
  data: any;
  sections: any;
  style?: {
    lineHeight: number;
    fontSize: number;
    sectionSpacing: number;
  };
}

export const ResumeCanvas = ({ templateId, theme, font, data, sections, style }: ResumeCanvasProps) => {
  const { personal, summary, skills, experience, education, projects, certifications, achievements, languages, interests } = data;
  const config = style || { lineHeight: 1.5, fontSize: 14, sectionSpacing: 24 };

  const SectionHeader = ({ title, icon: Icon }: { title: string, icon?: any }) => (
    <div 
      className="resume-heading mb-4 flex items-center gap-2 border-b pb-2" 
      style={{ color: theme.primary, borderColor: `${theme.primary}22` }}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span className="text-sm font-black uppercase tracking-widest">{title}</span>
    </div>
  );

  const ExperienceItem = ({ exp }: { exp: any }) => (
    <div className="space-y-2 mb-6 last:mb-0">
      <div className="flex justify-between items-baseline">
        <h3 className="text-base font-black text-slate-900">{exp.title}</h3>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{exp.period}</span>
      </div>
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.accent }}>{exp.company} • {exp.location}</p>
      <p className="resume-body text-slate-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
    </div>
  );

  const renderLayout = () => {
    switch (templateId) {
      case 'two-column':
        return (
          <div className="flex h-full gap-12">
            <div className="w-1/3 space-y-10 pr-8 border-r" style={{ borderColor: `${theme.primary}11` }}>
              <div className="space-y-4">
                <h1 className="text-3xl font-black leading-none uppercase tracking-tighter" style={{ color: theme.primary }}>{personal.fullName}</h1>
                <p className="text-sm font-bold opacity-60 uppercase tracking-widest">{personal.jobTitle}</p>
              </div>
              <div className="space-y-4">
                <SectionHeader title="Contact" />
                <div className="space-y-3 text-[10px] font-medium text-slate-500">
                  <div className="flex items-center gap-2"><Mail className="h-3 w-3" /> {personal.email}</div>
                  <div className="flex items-center gap-2"><Phone className="h-3 w-3" /> {personal.phone}</div>
                  <div className="flex items-center gap-2"><MapPin className="h-3 w-3" /> {personal.location}</div>
                </div>
              </div>
              {sections.skills && (
                <div className="space-y-4">
                  <SectionHeader title="Expertise" />
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s: string) => (
                      <span key={s} className="px-2 py-1 bg-slate-50 border rounded text-[9px] font-bold uppercase tracking-tighter text-slate-600">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex-1 space-y-10">
              {sections.summary && (
                <section>
                  <SectionHeader title="Profile" icon={User} />
                  <p className="resume-body italic leading-relaxed text-slate-600">{summary}</p>
                </section>
              )}
              {sections.experience && (
                <section>
                  <SectionHeader title="Experience" icon={Briefcase} />
                  {experience.map((exp: any) => <ExperienceItem key={exp.id} exp={exp} />)}
                </section>
              )}
            </div>
          </div>
        );

      case 'academic':
        return (
          <div className="space-y-12">
            <div className="text-center space-y-4 border-b pb-10" style={{ borderColor: theme.primary }}>
              <h1 className="text-4xl font-black uppercase tracking-[0.2em]" style={{ color: theme.primary }}>{personal.fullName}</h1>
              <div className="flex justify-center gap-8 text-[10px] font-black uppercase tracking-widest opacity-40">
                <span>{personal.location}</span>
                <span>{personal.email}</span>
                <span>{personal.phone}</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-12">
              <div className="col-span-1">
                <h2 className="text-xs font-black uppercase tracking-widest" style={{ color: theme.accent }}>Professional Summary</h2>
              </div>
              <div className="col-span-3">
                <p className="resume-body leading-relaxed">{summary}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-12">
              <div className="col-span-1">
                <h2 className="text-xs font-black uppercase tracking-widest" style={{ color: theme.accent }}>Experience</h2>
              </div>
              <div className="col-span-3 space-y-10">
                {experience.map((exp: any) => (
                  <div key={exp.id} className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-base font-bold text-slate-900">{exp.title}</h3>
                      <span className="text-[10px] font-bold opacity-40">{exp.period}</span>
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest opacity-60">{exp.company} • {exp.location}</p>
                    <p className="resume-body mt-4 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'ats-minimal':
        return (
          <div className="space-y-6 font-mono text-[11px] leading-tight text-black">
            <div className="text-center space-y-1 mb-8">
              <h1 className="text-xl font-bold uppercase">{personal.fullName}</h1>
              <p>{personal.location} | {personal.phone} | {personal.email}</p>
              <p>{personal.linkedin} | {personal.website}</p>
            </div>
            <section>
              <h2 className="font-bold border-b border-black uppercase mb-2">Summary</h2>
              <p>{summary}</p>
            </section>
            <section>
              <h2 className="font-bold border-b border-black uppercase mb-2">Experience</h2>
              {experience.map((exp: any) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between font-bold uppercase">
                    <span>{exp.company}</span>
                    <span>{exp.period}</span>
                  </div>
                  <p className="italic">{exp.title}</p>
                  <p className="whitespace-pre-wrap mt-1 leading-normal">• {exp.description.replace(/\n/g, '\n• ')}</p>
                </div>
              ))}
            </section>
            <section>
              <h2 className="font-bold border-b border-black uppercase mb-2">Skills</h2>
              <p className="font-bold">{skills.join(' | ')}</p>
            </section>
          </div>
        );

      default: // Classic & fallback for all 20 templates
        return (
          <div className="space-y-10">
            <header className="text-center space-y-2 mb-12">
              <h1 className="text-4xl font-black uppercase tracking-tighter" style={{ color: theme.primary }}>{personal.fullName}</h1>
              <p className="text-lg font-bold opacity-40 uppercase tracking-[0.2em]">{personal.jobTitle}</p>
              <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> {personal.email}</span>
                <span className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> {personal.phone}</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {personal.location}</span>
              </div>
            </header>
            <div className="space-y-12">
              {sections.summary && (
                <section>
                  <SectionHeader title="Profile Summary" icon={User} />
                  <p className="resume-body text-slate-600 leading-relaxed">{summary}</p>
                </section>
              )}
              {sections.experience && (
                <section>
                  <SectionHeader title="Professional Experience" icon={Briefcase} />
                  {experience.map((exp: any) => <ExperienceItem key={exp.id} exp={exp} />)}
                </section>
              )}
              {sections.skills && (
                <section>
                  <SectionHeader title="Key Skills" icon={Award} />
                  <div className="flex flex-wrap gap-x-8 gap-y-3">
                    {skills.map((s: string) => (
                      <div key={s} className="text-xs font-bold text-slate-700 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accent }} />
                        {s}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      className="resume-a4 print:m-0 print:shadow-none" 
      style={{ 
        fontFamily: font.family,
        borderTop: `10px solid ${theme.primary}`,
        fontSize: `${config.fontSize}px`,
        lineHeight: config.lineHeight,
      }}
    >
      <div style={{ padding: '0px' }}>
        {renderLayout()}
      </div>
      
      <style jsx global>{`
        .resume-a4 {
          padding: 60px !important;
          color: #334155;
        }
        .resume-body {
          font-size: 1em;
        }
        @media print {
          .resume-a4 {
            border-top: none !important;
            padding: 40px !important;
          }
        }
      `}</style>
    </div>
  );
};
