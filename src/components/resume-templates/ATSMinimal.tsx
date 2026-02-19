
'use client';
import React from 'react';
import { TemplateProps } from '@/types/resume';

export default function ATSMinimal({ data, theme, style }: TemplateProps) {
  return (
    <div className="font-mono text-black space-y-6" style={{ fontSize: '11px', lineHeight: 1.2 }}>
      <header className="text-center border-b border-black pb-4">
        <h1 className="text-2xl font-bold uppercase">{data.personal.fullName}</h1>
        <p>{data.personal.location} | {data.personal.phone} | {data.personal.email}</p>
      </header>

      <section>
        <h2 className="font-bold border-b border-black uppercase mb-1">Professional Summary</h2>
        <p>{data.summary}</p>
      </section>

      <section>
        <h2 className="font-bold border-b border-black uppercase mb-2">Experience</h2>
        {data.experience.map(exp => (
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
        <h2 className="font-bold border-b border-black uppercase mb-1">Skills</h2>
        <p className="font-bold">{data.skills.join(' | ')}</p>
      </section>
    </div>
  );
}
