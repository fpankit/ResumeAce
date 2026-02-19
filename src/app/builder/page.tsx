"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, 
  Save, 
  Palette, 
  Type as TypeIcon, 
  Layout, 
  Settings, 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  FolderGit2, 
  Award, 
  Languages, 
  Heart,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Plus,
  Trash2,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ResumeCanvas } from '@/components/resume/resume-canvas';

const THEMES = [
  { id: 'corporate-blue', name: 'Corporate Blue', primary: '#1E3A8A', accent: '#2563EB' },
  { id: 'elegant-black', name: 'Elegant Black', primary: '#111111', accent: '#333333' },
  { id: 'modern-teal', name: 'Modern Teal', primary: '#0F766E', accent: '#14B8A6' },
  { id: 'minimal-gray', name: 'Minimal Gray', primary: '#374151', accent: '#9CA3AF' },
  { id: 'executive-burgundy', name: 'Executive Burgundy', primary: '#7F1D1D', accent: '#B91C1C' },
];

const FONTS = [
  { id: 'inter', name: 'Inter', family: 'var(--font-inter), sans-serif' },
  { id: 'poppins', name: 'Poppins', family: '"Poppins", sans-serif' },
  { id: 'lora', name: 'Lora', family: '"Lora", serif' },
  { id: 'playfair', name: 'Playfair Display', family: '"Playfair Display", serif' },
  { id: 'montserrat', name: 'Montserrat', family: '"Montserrat", sans-serif' },
];

const TEMPLATES = [
  { id: 'classic', name: 'Classic Single Column' },
  { id: 'modern', name: 'Modern Professional' },
  { id: 'executive', name: 'Executive Clean' },
  { id: 'ats-minimal', name: 'ATS Prime Minimal' },
  { id: 'two-column', name: 'Two Column Sidebar' },
  { id: 'compact', name: 'Compact Dense' },
  { id: 'academic', name: 'Academic CV' },
  { id: 'tech', name: 'Tech Developer Style' },
  { id: 'management', name: 'Management Resume' },
  { id: 'creative', name: 'Creative Minimal' },
  { id: 'bold-header', name: 'Bold Header Layout' },
  { id: 'elegant-serif', name: 'Elegant Serif' },
  { id: 'structured-timeline', name: 'Structured Timeline' },
  { id: 'corporate-formal', name: 'Corporate Formal' },
  { id: 'soft-gray', name: 'Soft Gray Layout' },
  { id: 'blue-accent', name: 'Blue Accent Left Border' },
  { id: 'monochrome', name: 'Monochrome Minimal' },
  { id: 'fresher', name: 'Compact Fresher' },
  { id: 'senior', name: 'Senior Professional' },
  { id: 'hybrid', name: 'Hybrid Modern Clean' },
];

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  
  const [sections, setSections] = useState({
    summary: true,
    skills: true,
    experience: true,
    education: true,
    projects: true,
    certifications: true,
    achievements: true,
    languages: true,
    interests: true,
  });

  const [data, setData] = useState({
    personal: {
      fullName: 'Johnathan Doe',
      jobTitle: 'Senior Software Architect',
      email: 'john.doe@example.com',
      phone: '+1 (555) 000-1111',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/johndoe',
      website: 'johndoe.dev'
    },
    summary: 'Strategic and results-driven Senior Software Architect with 10+ years of experience in designing and implementing scalable cloud architectures. Expert in full-stack development, distributed systems, and leading cross-functional teams to deliver high-impact technical solutions.',
    skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'AWS', 'Kubernetes', 'GraphQL', 'System Design'],
    experience: [
      {
        id: '1',
        title: 'Senior Software Architect',
        company: 'TechGlobal Solutions',
        location: 'New York, NY',
        period: 'Jan 2020 - Present',
        description: 'Led the migration of a legacy monolithic architecture to a microservices-based system, resulting in a 40% improvement in scalability and deployment speed.\nArchitected and implemented a real-time data processing pipeline using Kafka and Spark.'
      },
      {
        id: '2',
        title: 'Full Stack Developer',
        company: 'InnoStream Inc.',
        location: 'Boston, MA',
        period: 'Jun 2016 - Dec 2019',
        description: 'Developed and maintained core features of the flagship SaaS product, serving over 500k monthly active users.\nCollaborated with UI/UX designers to implement responsive and accessible interfaces.'
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Master of Science in Computer Science',
        school: 'Stanford University',
        location: 'Stanford, CA',
        period: '2014 - 2016'
      }
    ],
    projects: [
      {
        id: '1',
        name: 'OpenSource CRM',
        description: 'A privacy-first customer relationship management tool built with Next.js and PostgreSQL.',
        link: 'github.com/johndoe/crm'
      }
    ],
    certifications: [
      'AWS Certified Solutions Architect – Professional',
      'Certified Kubernetes Administrator (CKA)'
    ],
    achievements: [
      'Winner of Global Hackathon 2021',
      'Featured speaker at JSConf 2022'
    ],
    languages: ['English (Native)', 'Spanish (Professional)', 'German (Elementary)'],
    interests: ['Blockchain Technology', 'Digital Art', 'Mountain Biking']
  });

  const handleDownload = () => {
    window.print();
  };

  const updateField = (section: string, field: string, value: any) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [field]: value
      }
    }));
  };

  const updateSummary = (value: string) => {
    setData(prev => ({ ...prev, summary: value }));
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center justify-between px-6 z-50 no-print">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">R</div>
          <h1 className="text-xl font-bold text-slate-900">BuilderPro</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Save className="h-4 w-4" /> Save
          </Button>
          <Button onClick={handleDownload} className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-lg shadow-indigo-200">
            <Download className="h-4 w-4" /> Download PDF
          </Button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 pt-16 h-full">
        {/* Left Panel: Controls */}
        <aside className="w-96 bg-white border-r flex flex-col no-print">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-3 h-14 bg-white border-b rounded-none p-0">
              <TabsTrigger value="templates" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent">
                <Layout className="h-4 w-4 mr-2" /> Layout
              </TabsTrigger>
              <TabsTrigger value="content" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent">
                <Settings className="h-4 w-4 mr-2" /> Data
              </TabsTrigger>
              <TabsTrigger value="style" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent">
                <Palette className="h-4 w-4 mr-2" /> Style
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1 p-6">
              {/* Templates Tab */}
              <TabsContent value="templates" className="mt-0 space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  {TEMPLATES.map(template => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={cn(
                        "p-4 rounded-xl border-2 text-left transition-all hover:border-indigo-200",
                        selectedTemplate === template.id ? "border-indigo-600 bg-indigo-50" : "border-slate-100 bg-slate-50"
                      )}
                    >
                      <div className="aspect-[3/4] bg-white border mb-2 rounded shadow-sm"></div>
                      <p className="text-xs font-bold text-slate-800 line-clamp-1">{template.name}</p>
                    </button>
                  ))}
                </div>
              </TabsContent>

              {/* Content Tab */}
              <TabsContent value="content" className="mt-0 space-y-8">
                {/* Personal Info */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-indigo-600">
                    <User className="h-4 w-4" />
                    <h3 className="text-sm font-bold uppercase tracking-wider">Personal Details</h3>
                  </div>
                  <div className="grid gap-3">
                    <div className="space-y-1">
                      <Label className="text-[10px] uppercase text-slate-400 font-bold">Full Name</Label>
                      <Input value={data.personal.fullName} onChange={(e) => updateField('personal', 'fullName', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] uppercase text-slate-400 font-bold">Job Title</Label>
                      <Input value={data.personal.jobTitle} onChange={(e) => updateField('personal', 'jobTitle', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-[10px] uppercase text-slate-400 font-bold">Email</Label>
                        <Input value={data.personal.email} onChange={(e) => updateField('personal', 'email', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] uppercase text-slate-400 font-bold">Phone</Label>
                        <Input value={data.personal.phone} onChange={(e) => updateField('personal', 'phone', e.target.value)} />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Summary */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-indigo-600">
                      <Settings className="h-4 w-4" />
                      <h3 className="text-sm font-bold uppercase tracking-wider">Profile Summary</h3>
                    </div>
                    <Switch checked={sections.summary} onCheckedChange={(v) => setSections(prev => ({...prev, summary: v}))} />
                  </div>
                  {sections.summary && (
                    <Textarea 
                      value={data.summary} 
                      onChange={(e) => updateSummary(e.target.value)}
                      className="min-h-[120px]"
                    />
                  )}
                </section>

                {/* Section Toggles */}
                <section className="space-y-4 pt-4 border-t">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Toggle Sections</h3>
                  <div className="grid gap-4">
                    {Object.entries(sections).map(([key, enabled]) => (
                      key !== 'summary' && (
                        <div key={key} className="flex items-center justify-between">
                          <Label className="capitalize font-bold text-slate-700">{key}</Label>
                          <Switch 
                            checked={enabled} 
                            onCheckedChange={(v) => setSections(prev => ({...prev, [key]: v}))} 
                          />
                        </div>
                      )
                    ))}
                  </div>
                </section>
              </TabsContent>

              {/* Style Tab */}
              <TabsContent value="style" className="mt-0 space-y-8">
                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-indigo-600">
                    <Palette className="h-4 w-4" />
                    <h3 className="text-sm font-bold uppercase tracking-wider">Theme Presets</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {THEMES.map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme)}
                        className={cn(
                          "w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all",
                          selectedTheme.id === theme.id ? "border-indigo-600 bg-indigo-50" : "border-slate-100 hover:border-indigo-100"
                        )}
                      >
                        <div className="flex gap-1">
                          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: theme.accent }}></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700">{theme.name}</span>
                        {selectedTheme.id === theme.id && <Check className="h-4 w-4 ml-auto text-indigo-600" />}
                      </button>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-indigo-600">
                    <TypeIcon className="h-4 w-4" />
                    <h3 className="text-sm font-bold uppercase tracking-wider">Typography</h3>
                  </div>
                  <div className="grid gap-2">
                    {FONTS.map(font => (
                      <button
                        key={font.id}
                        onClick={() => setSelectedFont(font)}
                        className={cn(
                          "w-full flex items-center p-3 rounded-xl border-2 transition-all",
                          selectedFont.id === font.id ? "border-indigo-600 bg-indigo-50" : "border-slate-100 hover:border-indigo-100"
                        )}
                      >
                        <span className="text-sm" style={{ fontFamily: font.family }}>{font.name}</span>
                        {selectedFont.id === font.id && <Check className="h-4 w-4 ml-auto text-indigo-600" />}
                      </button>
                    ))}
                  </div>
                </section>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </aside>

        {/* Center: Live Preview */}
        <main className="flex-1 bg-slate-100 overflow-auto p-12 scroll-smooth">
          <div className="max-w-[850px] mx-auto">
            <ResumeCanvas 
              templateId={selectedTemplate}
              theme={selectedTheme}
              font={selectedFont}
              data={data}
              sections={sections}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
