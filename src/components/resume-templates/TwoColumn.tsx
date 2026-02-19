
'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function TwoColumn({ data, theme, style }: TemplateProps) {
  return (
    <div className="flex h-full gap-10" style={{ fontSize: `${style.fontSize}px`, lineHeight: style.lineHeight }}>
      <aside className="w-1/3 border-r pr-8" style={{ borderColor: `${theme.primary}22` }}>
        <div className="mb-10">
          <h1 className="text-3xl font-black leading-none uppercase tracking-tighter" style={{ color: theme.primary }}>{data.personal.fullName.split(' ')[0]}<br/>{data.personal.fullName.split(' ').slice(1).join(' ')}</h1>
          <p className="text-xs font-bold opacity-40 uppercase tracking-widest mt-2">{data.personal.jobTitle}</p>
        </div>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: theme.primary }}>Contact</h2>
            <div className="space-y-3 text-[10px] font-bold text-slate-500">
              <div className="flex items-center gap-2"><Mail className="h-3 w-3" /> {data.personal.email}</div>
              <div className="flex items-center gap-2"><Phone className="h-3 w-3" /> {data.personal.phone}</div>
              <div className="flex items-center gap-2"><MapPin className="h-3 w-3" /> {data.personal.location}</div>
            </div>
          </section>
          
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: theme.primary }}>Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s} className="px-2 py-1 bg-slate-50 border rounded text-[9px] font-bold uppercase tracking-tighter">{s}</span>
              ))}
            </div>
          </section>
        </div>
      </aside>
      
      <main className="flex-1 space-y-10">
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-widest mb-4 border-b pb-1" style={{ color: theme.primary }}>Profile</h2>
          <p className="text-slate-600 leading-relaxed italic">{data.summary}</p>
        </section>
        
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-widest mb-4 border-b pb-1" style={{ color: theme.primary }}>Work History</h2>
          {data.experience.map(exp => (
            <div key={exp.id} className="mb-6 last:mb-0">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-black text-slate-900">{exp.title}</h3>
                <span className="text-[9px] font-bold text-slate-300 uppercase">{exp.period}</span>
              </div>
              <p className="text-[10px] font-bold uppercase mb-2" style={{ color: theme.accent }}>{exp.company}</p>
              <p className="text-xs text-slate-500 whitespace-pre-wrap">{exp.description}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
