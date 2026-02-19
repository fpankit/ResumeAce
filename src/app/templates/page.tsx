"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Download, 
  User, 
  Check, 
  Sparkles,
  Loader2,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Globe,
  PlusCircle,
  FileText,
  Trash2,
  ChevronDown,
  Layout,
  Type as TypeIcon,
  Settings,
  Plus,
  Linkedin,
  Github,
  Twitter,
  ExternalLink,
  Palette,
  Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { generateResumeContent } from '@/ai/flows/generate-resume-content';
import { useToast } from '@/hooks/use-toast';
import { ResumeCanvas } from '@/components/resume/resume-canvas';
import { ResumeData } from '@/types/resume';

const THEMES = [
  { id: 'corporate-blue', name: 'Corporate Blue', primary: '#1E3A8A', accent: '#2563EB', text: '#1E293B', secondary: '#64748B' },
  { id: 'midnight', name: 'Midnight Professional', primary: '#0F172A', accent: '#334155', text: '#0F172A', secondary: '#475569' },
  { id: 'emerald', name: 'Emerald Executive', primary: '#064E3B', accent: '#059669', text: '#064E3B', secondary: '#374151' },
  { id: 'burgundy', name: 'Royal Burgundy', primary: '#450A0A', accent: '#991B1B', text: '#450A0A', secondary: '#4B5563' },
  { id: 'slate', name: 'Modern Slate', primary: '#334155', accent: '#64748B', text: '#1E293B', secondary: '#64748B' },
  { id: 'forest', name: 'Deep Forest', primary: '#14532D', accent: '#16A34A', text: '#14532D', secondary: '#4B5563' },
  { id: 'gold', name: 'Warm Gold', primary: '#78350F', accent: '#D97706', text: '#451A03', secondary: '#78350F' },
  { id: 'ocean', name: 'Deep Ocean', primary: '#164E63', accent: '#0891B2', text: '#164E63', secondary: '#475569' },
  { id: 'charcoal', name: 'Pure Charcoal', primary: '#171717', accent: '#404040', text: '#171717', secondary: '#525252' },
  { id: 'coral', name: 'Bulls Coral', primary: '#EF593E', accent: '#D44D35', text: '#1E293B', secondary: '#64748B' },
];

const FONTS = [
  { id: 'inter', name: 'Inter (Standard)', family: '"Inter", sans-serif' },
  { id: 'roboto', name: 'Roboto', family: '"Roboto", sans-serif' },
  { id: 'open-sans', name: 'Open Sans', family: '"Open Sans", sans-serif' },
  { id: 'montserrat', name: 'Montserrat (Bold)', family: '"Montserrat", sans-serif' },
  { id: 'poppins', name: 'Poppins', family: '"Poppins", sans-serif' },
  { id: 'merriweather', name: 'Merriweather (Serif)', family: '"Merriweather", serif' },
  { id: 'eb-garamond', name: 'EB Garamond (Classic)', family: '"EB Garamond", serif' },
  { id: 'lora', name: 'Lora', family: '"Lora", serif' },
  { id: 'playfair', name: 'Playfair Display', family: '"Playfair Display", serif' },
  { id: 'source-code', name: 'Source Code Pro', family: '"Source Code Pro", monospace' },
];

const TEMPLATES = [
  { id: 'classic', name: 'Classic Single Column', category: 'Standard' },
  { id: 'modern', name: 'Modern Professional', category: 'Modern' },
  { id: 'ats-minimal', name: 'ATS Prime Minimal', category: 'ATS' },
  { id: 'two-column', name: 'Two Column Sidebar', category: 'Modern' },
  { id: 'tech', name: 'Tech Developer Style', category: 'Tech' },
  { id: 'executive', name: 'Executive Clean', category: 'Executive' },
  { id: 'academic', name: 'Academic CV', category: 'Academic' },
  { id: 'management', name: 'Management Resume', category: 'Executive' },
  { id: 'creative', name: 'Creative Minimal', category: 'Creative' },
  { id: 'bold-header', name: 'Bold Header Layout', category: 'Modern' },
  { id: 'elegant-serif', name: 'Elegant Serif', category: 'Elegant' },
  { id: 'structured-timeline', name: 'Structured Timeline', category: 'Modern' },
  { id: 'corporate-formal', name: 'Corporate Formal', category: 'Executive' },
  { id: 'soft-gray', name: 'Soft Gray Layout', category: 'Modern' },
  { id: 'blue-accent', name: 'Blue Accent Left Border', category: 'Modern' },
  { id: 'monochrome', name: 'Monochrome Minimal', category: 'ATS' },
  { id: 'compact', name: 'Compact Dense', category: 'Standard' },
  { id: 'fresher', name: 'Compact Fresher', category: 'Compact' },
  { id: 'senior', name: 'Senior Professional', category: 'Executive' },
  { id: 'hybrid', name: 'Hybrid Modern Clean', category: 'Modern' },
];

const BullIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C9.79 2 8 3.79 8 6C8 7.31 8.63 8.47 9.61 9.22C6.44 10.05 4 12.75 4 16V18H20V16C20 12.75 17.56 10.05 14.39 9.22C15.37 8.47 16 7.31 16 6C16 3.79 14.21 2 12 2ZM12 4C13.1 4 14 4.9 14 6C14 7.1 13.1 8 12 8C10.9 8 10 7.1 10 6C10 4.9 10.9 4 12 4ZM6.18 16C6.67 13.72 8.7 12 11.13 12H12.87C15.3 12 17.33 13.72 17.82 16H6.18Z" />
  </svg>
);

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-[#EF593E] flex items-center justify-center text-white overflow-hidden shadow-lg shadow-primary/20">
      <BullIcon className="w-full h-full p-1 opacity-90" />
    </div>
    <div className="flex flex-col -space-y-1">
      <div className="flex items-center gap-1">
        <span className="text-[#EF593E] font-black text-lg tracking-tighter uppercase">Network</span>
        <span className="text-[#44546A] font-black text-lg tracking-tighter uppercase">Bulls</span>
      </div>
    </div>
  </div>
);

export default function ResumeBuilderPage() {
  const [activeTab, setActiveTab] = useState('design');
  const [selectedTemplateId, setSelectedTemplateId] = useState('classic');
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [lineHeight, setLineHeight] = useState(1.4);
  const [fontSize, setFontSize] = useState(11);
  const [sectionSpacing, setSectionSpacing] = useState(20);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  const [data, setData] = useState<ResumeData>({
    personal: {
      fullName: 'Johnathan P. Doe',
      jobTitle: 'Principal Cloud Architect',
      headline: 'Architecting high-availability systems for Fortune 500 companies',
      email: 'j.doe@tech-pioneer.com',
      phone: '+1 (555) 789-0123',
      location: {
        city: 'Seattle',
        state: 'WA',
        country: 'USA',
        zip: '98101'
      },
      linkedin: 'linkedin.com/in/johndoe-arch',
      github: 'github.com/johndoe-cloud',
      portfolio: 'johndoe.cloud',
      nationality: 'United States',
    },
    summary: {
      content: 'Principal Cloud Architect with over 12 years of experience in digital transformation. Expert at migrating legacy workloads to hybrid-cloud infrastructures with zero downtime. Proven track record of reducing operational costs by 35% while increasing system reliability to 99.99%.',
      asBullets: false,
      jobTarget: 'VP of Engineering / Principal Architect',
      coreStrengths: ['Hybrid Cloud', 'SRE', 'Digital Transformation', 'Team Leadership']
    },
    skills: [
      {
        id: '1',
        category: 'Programming Languages',
        items: [
          { id: '1a', name: 'Python', level: 95, years: '10', priority: 'Primary' },
          { id: '1b', name: 'Go', level: 85, years: '5', priority: 'Primary' }
        ]
      },
      {
        id: '2',
        category: 'Cloud & DevOps',
        items: [
          { id: '2a', name: 'AWS', level: 98, years: '8', priority: 'Primary' },
          { id: '2b', name: 'Kubernetes', level: 92, years: '6', priority: 'Primary' }
        ]
      }
    ],
    experience: [
      {
        id: '1',
        title: 'Principal Cloud Architect',
        company: 'CloudScale Enterprises',
        location: 'Seattle, WA',
        employmentType: 'Full-time',
        startMonth: 'January',
        startYear: '2020',
        current: true,
        responsibilities: 'Oversee cloud strategy for the entire organization.\nLead a team of 15 senior engineers.',
        achievements: 'Migrated 400+ applications to AWS with zero downtime.\nDesigned a serverless data processing engine handling 5TB/day.',
        technologies: 'AWS, Terraform, Go, Python',
        kpiMetrics: 'Reduced AWS monthly spend by $1.2M through optimization.',
        teamSize: '15'
      }
    ],
    education: [
      { 
        id: '1', 
        degreeType: 'Master of Science',
        degree: 'M.S. in Computer Science', 
        field: 'Distributed Systems',
        school: 'University of Washington', 
        location: 'Seattle, WA',
        startYear: '2012', 
        endYear: '2014',
        gpa: '3.95/4.0',
        honors: 'President\'s Medalist'
      }
    ],
    projects: [
      {
        id: '1',
        title: 'AutoOptimizer Bot',
        role: 'Lead Architect',
        description: 'AI-driven tool for automated cloud cost reduction.',
        technologies: 'Python, OpenAI API, AWS SDK',
        impact: 'Saved initial beta users over 20% on cloud bills within 24 hours.'
      }
    ],
    certifications: [
      { id: '1', name: 'AWS Certified Solutions Architect – Professional', org: 'Amazon', issueDate: '2022' }
    ],
    achievements: [
      { id: '1', title: 'Speaker at AWS re:Invent', description: 'Presented on serverless scaling strategies.', year: '2023', category: 'Professional' }
    ],
    publications: [],
    languages: [
      { id: '1', name: 'English', reading: 'Native', writing: 'Native', speaking: 'Native' }
    ],
    interests: ['Blockchain Architecture', 'Aviation', 'Deep Sea Fishing'],
    customSections: []
  });

  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>({
    personal: true,
    summary: true,
    experience: true,
    skills: true,
    education: true,
    projects: true,
    certifications: true,
    achievements: true,
    languages: true,
    interests: true,
    publications: false
  });

  const handlePersonalUpdate = (field: string, value: any) => {
    setData(prev => {
      if (field.includes('.')) {
        const [obj, key] = field.split('.');
        return {
          ...prev,
          [obj]: { ...(prev as any)[obj], [key]: value }
        };
      }
      return {
        ...prev,
        personal: { ...prev.personal, [field]: value }
      };
    });
  };

  const addArrayItem = (key: keyof Omit<ResumeData, 'personal' | 'summary' | 'interests'>) => {
    const newItem: any = { id: Math.random().toString(36).substr(2, 9) };
    if (key === 'experience') {
      Object.assign(newItem, { title: '', company: '', location: '', employmentType: 'Full-time', startMonth: 'Jan', startYear: '2024', current: false, responsibilities: '', achievements: '', technologies: '' });
    } else if (key === 'skills') {
      Object.assign(newItem, { category: 'Other', items: [] });
    } else if (key === 'projects') {
      Object.assign(newItem, { title: '', role: '', description: '', technologies: '', solutionApproach: '' });
    }
    setData(prev => ({ ...prev, [key]: [...(prev[key] as any[]), newItem] }));
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden no-print font-sans">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center justify-between px-8 z-50">
        <Link href="/"><Logo /></Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-slate-500 font-bold hover:text-[#EF593E]">Resume Editor Pro</Button>
          <div className="h-6 w-[1px] bg-slate-200 mx-2" />
          <Button onClick={() => window.print()} className="bg-[#EF593E] hover:bg-[#D44D35] text-white font-bold gap-2 rounded-lg px-6 shadow-lg shadow-orange-100 transition-all active:scale-95">
            <Download className="h-4 w-4" /> Download Professional PDF
          </Button>
        </div>
      </header>

      <div className="flex flex-1 pt-16 h-full overflow-hidden">
        {/* Editor Sidebar */}
        <aside className="w-[580px] bg-white border-r flex flex-col h-full shrink-0 shadow-2xl relative z-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
            <TabsList className="grid grid-cols-2 h-14 bg-white border-b rounded-none p-0 shrink-0">
              <TabsTrigger value="design" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:text-[#EF593E] font-black text-[10px] uppercase tracking-widest gap-2">
                <Palette className="h-4 w-4" /> Design & Theme
              </TabsTrigger>
              <TabsTrigger value="content" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:text-[#EF593E] font-black text-[10px] uppercase tracking-widest gap-2">
                <FileText className="h-4 w-4" /> Text Content
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1 w-full bg-slate-50/20">
              <div className="p-8 pb-32">
                
                {/* DESIGN TAB */}
                <TabsContent value="design" className="m-0 space-y-12">
                  <section className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Templates</h3>
                      <span className="text-[10px] font-bold text-slate-300">20 Pro Layouts</span>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      {TEMPLATES.map(template => (
                        <div key={template.id} className="group cursor-pointer space-y-3" onClick={() => setSelectedTemplateId(template.id)}>
                          <div className={cn(
                            "relative aspect-[3/4] bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden shadow-sm flex items-center justify-center",
                            selectedTemplateId === template.id ? "border-[#EF593E] ring-4 ring-orange-50" : "border-slate-100 hover:border-slate-300"
                          )}>
                             <div className="absolute inset-4 space-y-2 opacity-10">
                              <div className="h-4 w-1/2 bg-slate-400 rounded" />
                              <div className="h-10 w-full bg-slate-300 rounded" />
                              <div className="h-2 w-full bg-slate-200 rounded" />
                            </div>
                            {selectedTemplateId === template.id && (
                              <div className="absolute inset-0 bg-orange-500/10 flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-[#EF593E] flex items-center justify-center text-white shadow-xl animate-in zoom-in-50">
                                  <Check className="h-5 w-5" />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="text-center">
                            <p className="text-xs font-black uppercase text-slate-800 tracking-tight">{template.name}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{template.category}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-8 pt-10 border-t">
                    <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Color Palettes</h3>
                    <div className="grid grid-cols-5 gap-4">
                      {THEMES.map(theme => (
                        <div key={theme.id} className="space-y-2 flex flex-col items-center">
                          <button 
                            onClick={() => setSelectedTheme(theme)} 
                            className={cn(
                              "w-10 h-10 rounded-full border-4 transition-all shadow-md active:scale-90",
                              selectedTheme.id === theme.id ? "border-slate-900 scale-110" : "border-white"
                            )} 
                            style={{ backgroundColor: theme.primary }} 
                          />
                          <span className="text-[7px] font-black uppercase text-slate-400 text-center leading-tight">{theme.name.split(' ')[0]}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-8 pt-10 border-t">
                    <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Typography</h3>
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Select Font Family</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {FONTS.map(font => (
                            <Button 
                              key={font.id} 
                              variant="outline" 
                              onClick={() => setSelectedFont(font)}
                              className={cn(
                                "h-11 justify-start px-4 text-xs font-bold rounded-xl border-slate-100",
                                selectedFont.id === font.id && "border-[#EF593E] bg-orange-50 text-[#EF593E]"
                              )}
                              style={{ fontFamily: font.family }}
                            >
                              {font.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-8 pt-4">
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Font Size</Label>
                            <span className="text-[10px] font-bold text-[#EF593E]">{fontSize}px</span>
                          </div>
                          <Slider value={[fontSize]} min={9} max={16} step={1} onValueChange={([v]) => setFontSize(v)} />
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Line Height</Label>
                            <span className="text-[10px] font-bold text-[#EF593E]">{lineHeight}</span>
                          </div>
                          <Slider value={[lineHeight]} min={1} max={2.2} step={0.1} onValueChange={([v]) => setLineHeight(v)} />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Section Spacing</Label>
                          <span className="text-[10px] font-bold text-[#EF593E]">{sectionSpacing}px</span>
                        </div>
                        <Slider value={[sectionSpacing]} min={10} max={48} step={2} onValueChange={([v]) => setSectionSpacing(v)} />
                      </div>
                    </div>
                  </section>
                </TabsContent>

                {/* CONTENT TAB */}
                <TabsContent value="content" className="m-0 space-y-4">
                  <Accordion type="multiple" defaultValue={['personal']} className="space-y-4">
                    
                    {/* PERSONAL DETAILS */}
                    <AccordionItem value="personal" className="bg-white border rounded-2xl overflow-hidden px-4 shadow-sm transition-all hover:border-orange-100">
                      <AccordionTrigger className="hover:no-underline py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center"><User className="h-4 w-4 text-[#EF593E]" /></div>
                          <span className="text-xs font-black uppercase tracking-widest text-slate-800">1. Personal Identity</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-8 space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black text-slate-400 uppercase">First & Last Name</Label>
                            <Input value={data.personal.fullName} onChange={(e) => handlePersonalUpdate('fullName', e.target.value)} className="rounded-xl h-11 bg-slate-50/50 border-slate-100" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black text-slate-400 uppercase">Professional Headline</Label>
                            <Input value={data.personal.jobTitle} onChange={(e) => handlePersonalUpdate('jobTitle', e.target.value)} className="rounded-xl h-11 bg-slate-50/50 border-slate-100" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black text-slate-400 uppercase">Email Address</Label>
                            <Input value={data.personal.email} onChange={(e) => handlePersonalUpdate('email', e.target.value)} className="rounded-xl h-11" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black text-slate-400 uppercase">Phone Number</Label>
                            <Input value={data.personal.phone} onChange={(e) => handlePersonalUpdate('phone', e.target.value)} className="rounded-xl h-11" />
                          </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-100">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Footprint</h4>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 mb-1">
                                <Linkedin className="h-3 w-3 text-blue-600" />
                                <Label className="text-[10px] font-bold uppercase text-slate-500">LinkedIn</Label>
                              </div>
                              <Input value={data.personal.linkedin} onChange={(e) => handlePersonalUpdate('linkedin', e.target.value)} className="rounded-xl" placeholder="linkedin.com/in/..." />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 mb-1">
                                <Github className="h-3 w-3 text-slate-900" />
                                <Label className="text-[10px] font-bold uppercase text-slate-500">GitHub</Label>
                              </div>
                              <Input value={data.personal.github} onChange={(e) => handlePersonalUpdate('github', e.target.value)} className="rounded-xl" placeholder="github.com/..." />
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* PROFESSIONAL SUMMARY */}
                    <AccordionItem value="summary" className="bg-white border rounded-2xl overflow-hidden px-4 shadow-sm transition-all hover:border-orange-100">
                      <AccordionTrigger className="hover:no-underline py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center"><Sparkles className="h-4 w-4 text-[#EF593E]" /></div>
                          <span className="text-xs font-black uppercase tracking-widest text-slate-800">2. Professional Profile</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-8 space-y-6">
                        <div className="flex justify-between items-center bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                          <div className="flex items-center gap-4">
                            <Switch checked={data.summary.asBullets} onCheckedChange={(v) => setData(prev => ({ ...prev, summary: { ...prev.summary, asBullets: v } }))} />
                            <Label className="text-[10px] font-black uppercase text-slate-500">Bullet Mode</Label>
                          </div>
                          <Button size="sm" className="bg-[#EF593E] hover:bg-[#D44D35] text-white text-[10px] font-black uppercase h-8 px-4 gap-2 rounded-lg shadow-sm">
                            <Sparkles className="h-3.5 w-3.5" /> AI Magic
                          </Button>
                        </div>
                        <div className="relative">
                          <Textarea 
                            value={data.summary.content} 
                            onChange={(e) => setData(prev => ({ ...prev, summary: { ...prev.summary, content: e.target.value } }))} 
                            className="min-h-[160px] rounded-2xl text-sm leading-relaxed border-slate-100 focus:ring-[#EF593E]" 
                            placeholder="Elevate your profile with a powerful summary of your career impact..."
                          />
                          <div className="absolute bottom-3 right-4 text-[9px] font-black text-slate-300 tracking-widest">
                            {data.summary.content.length} / 1200 CHARS
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* WORK EXPERIENCE */}
                    <AccordionItem value="experience" className="bg-white border rounded-2xl overflow-hidden px-4 shadow-sm transition-all hover:border-orange-100">
                      <AccordionTrigger className="hover:no-underline py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center"><Briefcase className="h-4 w-4 text-[#EF593E]" /></div>
                          <span className="text-xs font-black uppercase tracking-widest text-slate-800">3. Career History</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-8 space-y-8">
                        {data.experience.map((exp, i) => (
                          <div key={exp.id} className="p-8 rounded-3xl bg-slate-50/50 border border-slate-100 space-y-8 group relative transition-all hover:border-orange-200">
                            <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== exp.id) }))}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            
                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase">Role / Position</Label>
                                <Input value={exp.title} onChange={(e) => {
                                  const newExp = [...data.experience];
                                  newExp[i].title = e.target.value;
                                  setData(prev => ({ ...prev, experience: newExp }));
                                }} className="h-11 rounded-xl" />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase">Company</Label>
                                <Input value={exp.company} onChange={(e) => {
                                  const newExp = [...data.experience];
                                  newExp[i].company = e.target.value;
                                  setData(prev => ({ ...prev, experience: newExp }));
                                }} className="h-11 rounded-xl" />
                              </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-100">
                              <div className="flex items-center justify-between">
                                <Label className="text-[10px] font-black text-slate-400 uppercase">Achievements & Responsibilities</Label>
                                <Button variant="ghost" className="h-7 text-[10px] font-black uppercase text-[#EF593E] gap-2">
                                  <Sparkles className="h-3 w-3" /> AI Refine
                                </Button>
                              </div>
                              <Textarea placeholder="Highlight your impact with specific results..." value={exp.responsibilities} onChange={(e) => {
                                const newExp = [...data.experience];
                                newExp[i].responsibilities = e.target.value;
                                setData(prev => ({ ...prev, experience: newExp }));
                              }} className="min-h-[120px] rounded-xl text-sm" />
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full h-14 rounded-2xl border-dashed border-2 font-black uppercase text-[10px] gap-2 text-slate-400 hover:text-[#EF593E] hover:border-[#EF593E] transition-all" onClick={() => addArrayItem('experience')}>
                          <PlusCircle className="h-5 w-5" /> Add New Career Milestone
                        </Button>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </aside>

        {/* Preview Panel */}
        <main className="flex-1 bg-[#F1F5F9] overflow-auto p-12 lg:p-20 flex flex-col items-center">
          <div className="origin-top transition-transform duration-500 hover:scale-[1.01] shadow-2xl">
            <ResumeCanvas 
              templateId={selectedTemplateId}
              theme={selectedTheme}
              font={selectedFont}
              data={data}
              sections={sectionVisibility}
              style={{ fontSize, lineHeight, sectionSpacing }}
            />
          </div>
          
          <div className="fixed bottom-10 right-10 flex gap-4 no-print">
            <Button size="icon" className="w-14 h-14 rounded-full bg-slate-900 shadow-xl"><Maximize2 className="h-6 w-6" /></Button>
            <Button size="icon" className="w-14 h-14 rounded-full bg-[#EF593E] shadow-xl"><Download className="h-6 w-6" /></Button>
          </div>
        </main>
      </div>
    </div>
  );
}
