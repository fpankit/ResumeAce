"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface ResumeCanvasProps {
  templateId: string;
  theme: any;
  font: any;
  data: any;
  sections: any;
}

export const ResumeCanvas = ({ templateId, theme, font, data, sections }: ResumeCanvasProps) => {
  const { personal, summary, skills, experience, education, projects, certifications, achievements, languages, interests } = data;

  // Helper for rendering headers
  const SectionHeader = ({ title }: { title: string }) => (
    <div className="resume-heading" style={{ color: theme.primary, borderColor: `${theme.primary}33` }}>
      {title}
    </div>
  );

  const renderContent = () => {
    switch (templateId) {
      case 'two-column':
        return (
          <div className="flex gap-8 h-full">
            {/* Sidebar */}
            <div className="w-1/3 space-y-8 pr-6 border-r" style={{ borderColor: `${theme.primary}22` }}>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold leading-tight" style={{ color: theme.primary }}>{personal.fullName}</h1>
                <p className="text-lg font-medium opacity-80">{personal.jobTitle}</p>
              </div>

              <div className="space-y-4 text-xs">
                <SectionHeader title="Contact" />
                <div className="space-y-2 opacity-80">
                  <div className="flex items-center gap-2"><Mail className="h-3 w-3" /> {personal.email}</div>
                  <div className="flex items-center gap-2"><Phone className="h-3 w-3" /> {personal.phone}</div>
                  <div className="flex items-center gap-2"><MapPin className="h-3 w-3" /> {personal.location}</div>
                </div>
              </div>

              {sections.skills && (
                <div className="space-y-4">
                  <SectionHeader title="Skills" />
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s: string) => (
                      <span key={s} className="px-2 py-1 bg-slate-100 rounded text-[10px] font-medium">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {sections.languages && (
                <div className="space-y-4">
                  <SectionHeader title="Languages" />
                  <div className="space-y-1 text-xs opacity-80">
                    {languages.map((l: string) => <div key={l}>{l}</div>)}
                  </div>
                </div>
              )}
            </div>

            {/* Main */}
            <div className="flex-1 space-y-8">
              {sections.summary && (
                <div className="space-y-4">
                  <SectionHeader title="Professional Profile" />
                  <p className="resume-body italic">{summary}</p>
                </div>
              )}

              {sections.experience && (
                <div className="space-y-6">
                  <SectionHeader title="Work Experience" />
                  {experience.map((exp: any) => (
                    <div key={exp.id} className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <h3 className="resume-subheading">{exp.title}</h3>
                        <span className="resume-date">{exp.period}</span>
                      </div>
                      <p className="text-xs font-bold" style={{ color: theme.accent }}>{exp.company} • {exp.location}</p>
                      <p className="resume-body whitespace-pre-wrap">{exp.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {sections.education && (
                <div className="space-y-6">
                  <SectionHeader title="Education" />
                  {education.map((edu: any) => (
                    <div key={edu.id} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h3 className="resume-subheading">{edu.degree}</h3>
                        <span className="resume-date">{edu.period}</span>
                      </div>
                      <p className="text-xs">{edu.school} • {edu.location}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'academic':
        return (
          <div className="space-y-8">
             <div className="text-center border-b pb-8" style={{ borderColor: theme.primary }}>
               <h1 className="text-4xl font-bold uppercase tracking-widest" style={{ color: theme.primary }}>{personal.fullName}</h1>
               <div className="flex justify-center gap-6 mt-4 text-xs font-medium uppercase tracking-tighter opacity-70">
                 <span>{personal.location}</span>
                 <span>{personal.email}</span>
                 <span>{personal.phone}</span>
               </div>
             </div>
             
             <div className="grid grid-cols-4 gap-12">
               <div className="col-span-1">
                 <h2 className="text-sm font-black uppercase tracking-widest mb-4" style={{ color: theme.accent }}>Summary</h2>
               </div>
               <div className="col-span-3">
                 <p className="resume-body">{summary}</p>
               </div>
             </div>

             <div className="grid grid-cols-4 gap-12">
               <div className="col-span-1">
                 <h2 className="text-sm font-black uppercase tracking-widest mb-4" style={{ color: theme.accent }}>Experience</h2>
               </div>
               <div className="col-span-3 space-y-6">
                 {experience.map((exp: any) => (
                   <div key={exp.id} className="space-y-1">
                     <h3 className="resume-subheading">{exp.title}</h3>
                     <p className="text-xs font-bold opacity-60 uppercase tracking-widest">{exp.company} | {exp.period}</p>
                     <p className="resume-body mt-2">{exp.description}</p>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        );

      case 'tech':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-start border-l-8 pl-8 py-4" style={{ borderColor: theme.primary }}>
              <div>
                <h1 className="text-5xl font-black uppercase tracking-tighter" style={{ color: theme.primary }}>{personal.fullName}</h1>
                <p className="text-xl font-bold opacity-40 uppercase tracking-widest">{personal.jobTitle}</p>
              </div>
              <div className="text-right text-xs space-y-1 font-mono">
                <div>{personal.email}</div>
                <div>{personal.phone}</div>
                <div className="text-indigo-600 font-bold">{personal.website}</div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-8 space-y-10">
                <section>
                  <SectionHeader title="Core Projects" />
                  <div className="space-y-6">
                    {projects.map((p: any) => (
                      <div key={p.id} className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="resume-subheading">{p.name}</h3>
                          <span className="text-[10px] text-indigo-500 font-bold">{p.link}</span>
                        </div>
                        <p className="resume-body">{p.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <SectionHeader title="Employment" />
                  <div className="space-y-6">
                    {experience.map((exp: any) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-baseline font-bold text-sm">
                          <span>{exp.title} @ {exp.company}</span>
                          <span className="resume-date">{exp.period}</span>
                        </div>
                        <p className="resume-body mt-1">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-4 space-y-10">
                 <section>
                   <SectionHeader title="Stacks" />
                   <div className="flex flex-wrap gap-2">
                    {skills.map((s: string) => (
                      <span key={s} className="px-3 py-1 bg-slate-100 font-mono text-[9px] uppercase font-bold">{s}</span>
                    ))}
                   </div>
                 </section>

                 <section>
                   <SectionHeader title="Learning" />
                   <div className="space-y-2 text-xs">
                     {certifications.map((c: string) => (
                       <div key={c} className="border-l-2 pl-3 py-1">{c}</div>
                     ))}
                   </div>
                 </section>
              </div>
            </div>
          </div>
        );

      default: // Classic Single Column & others (fallback)
        return (
          <div className="space-y-10">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold uppercase tracking-widest" style={{ color: theme.primary }}>{personal.fullName}</h1>
              <p className="text-lg font-medium italic opacity-70">{personal.jobTitle}</p>
              <div className="flex justify-center flex-wrap gap-x-6 gap-y-1 text-xs font-medium">
                <div className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> {personal.email}</div>
                <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> {personal.phone}</div>
                <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {personal.location}</div>
                <div className="flex items-center gap-1.5"><Linkedin className="h-3 w-3" /> {personal.linkedin}</div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              {sections.summary && (
                <section>
                  <SectionHeader title="Professional Summary" />
                  <p className="resume-body">{summary}</p>
                </section>
              )}

              {sections.experience && (
                <section>
                  <SectionHeader title="Professional Experience" />
                  <div className="space-y-6">
                    {experience.map((exp: any) => (
                      <div key={exp.id} className="space-y-2">
                        <div className="flex justify-between items-baseline">
                          <h3 className="resume-subheading">{exp.title}</h3>
                          <span className="resume-date">{exp.period}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold opacity-60 italic">
                          <span>{exp.company}</span>
                          <span>{exp.location}</span>
                        </div>
                        <p className="resume-body whitespace-pre-wrap">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {sections.skills && (
                <section>
                  <SectionHeader title="Technical Skills" />
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {skills.map((s: string) => (
                      <div key={s} className="resume-body font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accent }}></span>
                        {s}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {sections.education && (
                <section>
                  <SectionHeader title="Education" />
                  <div className="space-y-4">
                    {education.map((edu: any) => (
                      <div key={edu.id} className="space-y-1">
                        <div className="flex justify-between items-baseline">
                          <h3 className="resume-subheading">{edu.degree}</h3>
                          <span className="resume-date">{edu.period}</span>
                        </div>
                        <p className="text-sm italic opacity-70">{edu.school} • {edu.location}</p>
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
      className="resume-a4" 
      style={{ 
        fontFamily: font.family,
        borderTop: `8px solid ${theme.primary}` 
      }}
    >
      {renderContent()}
      
      {/* Dynamic Theme Color Injections */}
      <style jsx global>{`
        .resume-heading {
          color: ${theme.primary} !important;
          border-color: ${theme.primary}33 !important;
        }
        .resume-subheading {
          color: ${theme.primary} !important;
        }
      `}</style>
    </div>
  );
};
