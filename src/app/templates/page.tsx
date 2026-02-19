
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
  Maximize2,
  Languages,
  Heart,
  Layers,
  MapPin,
  Calendar,
  Link as LinkIcon,
  FileBadge,
  Trophy,
  BookOpen
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
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { generateResumeContent } from '@/ai/flows/generate-resume-content';
import { useToast } from '@/hooks/use-toast';
import { ResumeCanvas } from '@/components/resume/resume-canvas';
import { ResumeData } from '@/types/resume';

const THEMES = [
  { id: 'coral', name: 'Network Bulls Coral', primary: '#EF593E', accent: '#D44D35', text: '#1E293B', secondary: '#64748B' },
  { id: 'corporate-blue', name: 'Corporate Blue', primary: '#1E3A8A', accent: '#2563EB', text: '#1E293B', secondary: '#64748B' },
  { id: 'midnight', name: 'Midnight Professional', primary: '#0F172A', accent: '#334155', text: '#0F172A', secondary: '#475569' },
  { id: 'emerald', name: 'Emerald Executive', primary: '#064E3B', accent: '#059669', text: '#064E3B', secondary: '#374151' },
  { id: 'burgundy', name: 'Royal Burgundy', primary: '#450A0A', accent: '#991B1B', text: '#450A0A', secondary: '#4B5563' },
];

const FONTS = [
  { id: 'inter', name: 'Inter (Modern)', family: '"Inter", sans-serif' },
  { id: 'montserrat', name: 'Montserrat (Bold)', family: '"Montserrat", sans-serif' },
  { id: 'poppins', name: 'Poppins (Friendly)', family: '"Poppins", sans-serif' },
  { id: 'merriweather', name: 'Merriweather (Serif)', family: '"Merriweather", serif' },
];

const TEMPLATES = [
  { id: 'classic', name: 'Classic Single Column', category: 'Standard' },
  { id: 'modern', name: 'Modern Professional', category: 'Modern' },
  { id: 'ats-minimal', name: 'ATS Prime Minimal', category: 'ATS' },
  { id: 'executive', name: 'Executive Clean', category: 'Executive' },
  { id: 'tech', name: 'Tech Developer Style', category: 'Tech' },
];

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-10 h-10 rounded-xl bg-[#EF593E] flex items-center justify-center text-white overflow-hidden shadow-lg shadow-[#EF593E]/20">
      <Briefcase className="w-6 h-6" />
    </div>
    <div className="flex flex-col -space-y-1">
      <div className="flex items-center gap-1">
        <span className="text-[#EF593E] font-black text-xl tracking-tighter uppercase">Network</span>
        <span className="text-[#334155] font-black text-xl tracking-tighter uppercase">Bulls</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="h-[1px] flex-1 bg-slate-200" />
        <span className="text-[7px] text-[#EF593E] font-black tracking-[0.2em] uppercase whitespace-nowrap">Professional Builder</span>
      </div>
    </div>
  </div>
);

export default function ResumeBuilderPage() {
  const [activeTab, setActiveTab] = useState('content');
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
      middleName: 'Patrick',
      jobTitle: 'Principal Cloud Architect',
      headline: 'Architecting high-availability systems for global enterprises',
      email: 'j.doe@tech-pioneer.com',
      phone: '+1 (555) 789-0123',
      location: {
        street: '123 Cloud Avenue',
        city: 'Seattle',
        state: 'WA',
        country: 'USA',
        zip: '98101'
      },
      linkedin: 'linkedin.com/in/johndoe-arch',
      github: 'github.com/johndoe-cloud',
      portfolio: 'johndoe.cloud',
      twitter: 'twitter.com/johndoe_cloud',
      nationality: 'United States',
      maritalStatus: 'Married',
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
          { id: '2b', name: 'Kubernetes', level: 90, years: '6', priority: 'Primary' },
          { id: '2c', name: 'Terraform', level: 92, years: '5', priority: 'Primary' }
        ]
      }
    ],
    experience: [
      {
        id: '1',
        title: 'Principal Cloud Architect',
        company: 'CloudScale Enterprises',
        website: 'cloudscale.io',
        location: 'Seattle, WA',
        employmentType: 'Full-time',
        industry: 'Cloud Computing',
        teamSize: '15',
        reportingTo: 'CTO',
        startMonth: 'January',
        startYear: '2020',
        current: true,
        responsibilities: 'Oversee cloud strategy for the entire organization.\nLead a team of 15 senior engineers.',
        achievements: 'Migrated 400+ applications to AWS with zero downtime.\nDesigned a serverless data processing engine handling 5TB/day.',
        technologies: 'AWS, Terraform, Go, Python',
        kpiMetrics: 'Reduced AWS monthly spend by $1.2M through optimization.',
        wasPromoted: true
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
        problemStatement: 'Manual cloud cost management was inefficient and error-prone.',
        solutionApproach: 'Developed a Python-based bot that uses reinforcement learning to identify underutilized resources.',
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
    languages: [
      { id: '1', name: 'English', reading: 'Native', writing: 'Native', speaking: 'Native' },
      { id: '2', name: 'Hindi', reading: 'Native', writing: 'Native', speaking: 'Native' }
    ],
    interests: ['Blockchain Architecture', 'Aviation', 'Deep Sea Fishing'],
    customSections: [],
    publications: []
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

  const updateField = (path: string, value: any) => {
    setData(prev => {
      const keys = path.split('.');
      if (keys.length === 1) return { ...prev, [keys[0]]: value };
      
      const newData = { ...prev };
      let current: any = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const addArrayItem = (key: keyof Omit<ResumeData, 'personal' | 'summary' | 'interests'>) => {
    const newItem: any = { id: Math.random().toString(36).substr(2, 9) };
    if (key === 'experience') {
      Object.assign(newItem, { 
        title: '', company: '', location: '', employmentType: 'Full-time', 
        startMonth: 'Jan', startYear: '2024', current: false, 
        responsibilities: '', achievements: '', technologies: '',
        industry: '', teamSize: '', reportingTo: ''
      });
    } else if (key === 'skills') {
      Object.assign(newItem, { category: 'Other', items: [] });
    } else if (key === 'projects') {
      Object.assign(newItem, { 
        title: '', role: '', description: '', technologies: '', 
        problemStatement: '', solutionApproach: '', impact: '' 
      });
    } else if (key === 'education') {
      Object.assign(newItem, { 
        degreeType: '', degree: '', field: '', school: '', location: '', 
        startYear: '', endYear: '', gpa: '', honors: '' 
      });
    } else if (key === 'certifications') {
      Object.assign(newItem, { name: '', org: '', issueDate: '', expiryDate: '', credentialId: '', url: '' });
    } else if (key === 'languages') {
      Object.assign(newItem, { name: '', reading: 'Native', writing: 'Native', speaking: 'Native' });
    } else if (key === 'achievements') {
      Object.assign(newItem, { title: '', description: '', year: '', category: 'Professional' });
    } else if (key === 'publications') {
      Object.assign(newItem, { title: '', platform: '', year: '', link: '' });
    }
    setData(prev => ({ ...prev, [key]: [...(prev[key] as any[]), newItem] }));
  };

  const removeArrayItem = (key: keyof Omit<ResumeData, 'personal' | 'summary' | 'interests'>, id: string) => {
    setData(prev => ({ ...prev, [key]: (prev[key] as any[]).filter((i: any) => i.id !== id) }));
  };

  const handleAiRefine = async (type: 'summary' | 'experience', index?: number) => {
    setIsGenerating(true);
    try {
      const keywords = type === 'summary' 
        ? data.skills.map(s => s.items.map(i => i.name).join(', ')).join(', ') 
        : data.experience[index!].responsibilities;
      
      const res = await generateResumeContent({
        type,
        jobTitle: data.personal.jobTitle,
        keywords: keywords || 'Professional growth, technical leadership'
      });
      
      if (type === 'summary') {
        updateField('summary.content', res.generatedText);
      } else {
        const newExp = [...data.experience];
        newExp[index!] = { ...newExp[index!], responsibilities: res.generatedText };
        updateField('experience', newExp);
      }
      
      toast({ title: "AI Magic Success", description: "Content refined professionally." });
    } catch (e: any) {
      toast({ variant: "destructive", title: "AI Magic Failed", description: e.message });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden no-print font-sans">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center justify-between px-8 z-50">
        <Link href="/"><Logo /></Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-slate-500 font-black uppercase text-[10px] tracking-widest hover:text-[#EF593E]">Resume Editor Pro</Button>
          <div className="h-6 w-[1px] bg-slate-200 mx-2" />
          <Button onClick={() => window.print()} className="bg-[#EF593E] hover:bg-[#D44D35] text-white font-black uppercase text-[10px] tracking-widest gap-2 rounded-lg px-6 h-10 shadow-lg shadow-orange-100 transition-all active:scale-95">
            <Download className="h-4 w-4" /> Export Professional PDF
          </Button>
        </div>
      </header>

      <div className="flex flex-1 pt-16 h-full overflow-hidden">
        {/* Editor Sidebar */}
        <aside className="w-[500px] bg-white border-r flex flex-col h-full shrink-0 shadow-2xl relative z-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
            <TabsList className="grid grid-cols-2 h-14 bg-white border-b rounded-none p-0 shrink-0">
              <TabsTrigger 
                value="design" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:text-[#EF593E] font-black text-[11px] uppercase tracking-[0.15em] gap-2 py-4"
              >
                <Palette className="h-4 w-4" /> Design & Theme
              </TabsTrigger>
              <TabsTrigger 
                value="content" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:text-[#EF593E] font-black text-[11px] uppercase tracking-[0.15em] gap-2 py-4"
              >
                <FileText className="h-4 w-4" /> Text Content
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1 w-full bg-[#F8FAFC]">
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
                <TabsContent value="content" className="m-0 space-y-6">
                  <Accordion type="multiple" defaultValue={['personal', 'experience', 'skills', 'languages']} className="space-y-6">
                    
                    {/* PERSONAL DETAILS */}
                    <AccordionItem value="personal" className="bg-white border rounded-2xl overflow-hidden px-4 shadow-sm transition-all hover:border-orange-100">
                      <AccordionTrigger className="hover:no-underline py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center"><User className="h-4 w-4 text-[#EF593E]" /></div>
                          <span className="text-xs font-black uppercase tracking-widest text-slate-800">1. Personal Identity</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-8 space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black text-slate-400 uppercase">First Name</Label>
                            <Input value={data.personal.fullName.split(' ')[0]} onChange={(e) => updateField('personal.fullName', `${e.target.value} ${data.personal.fullName.split(' ').slice(1).join(' ')}`)} className="rounded-xl h-11" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black text-slate-400 uppercase">Middle Name</Label>
                            <Input value={data.personal.middleName} onChange={(e) => updateField('personal.middleName', e.target.value)} className="rounded-xl h-11" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black text-slate-400 uppercase">Professional Headline</Label>
                            <Input value={data.personal.jobTitle} onChange={(e) => updateField('personal.jobTitle', e.target.value)} className="rounded-xl h-11 bg-slate-50/50" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black text-slate-400 uppercase">Nationality</Label>
                            <Input value={data.personal.nationality} onChange={(e) => updateField('personal.nationality', e.target.value)} className="rounded-xl h-11" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black text-slate-400 uppercase">Email Address</Label>
                            <Input value={data.personal.email} onChange={(e) => updateField('personal.email', e.target.value)} className="rounded-xl h-11" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black text-slate-400 uppercase">Phone Number</Label>
                            <Input value={data.personal.phone} onChange={(e) => updateField('personal.phone', e.target.value)} className="rounded-xl h-11" />
                          </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Address</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 col-span-2">
                              <Label className="text-[10px] font-black text-slate-400 uppercase">Street Address</Label>
                              <Input value={data.personal.location.street} onChange={(e) => updateField('personal.location.street', e.target.value)} className="rounded-xl h-11" />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[10px] font-black text-slate-400 uppercase">City</Label>
                              <Input value={data.personal.location.city} onChange={(e) => updateField('personal.location.city', e.target.value)} className="rounded-xl h-11" />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[10px] font-black text-slate-400 uppercase">State / Region</Label>
                              <Input value={data.personal.location.state} onChange={(e) => updateField('personal.location.state', e.target.value)} className="rounded-xl h-11" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Presence</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-[10px] font-black text-slate-400 uppercase">LinkedIn Profile</Label>
                              <Input value={data.personal.linkedin} onChange={(e) => updateField('personal.linkedin', e.target.value)} className="rounded-xl h-11" placeholder="linkedin.com/..." />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[10px] font-black text-slate-400 uppercase">GitHub Profile</Label>
                              <Input value={data.personal.github} onChange={(e) => updateField('personal.github', e.target.value)} className="rounded-xl h-11" placeholder="github.com/..." />
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
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black text-slate-400 uppercase">Job Target / Career Goal</Label>
                          <Input value={data.summary.jobTarget} onChange={(e) => updateField('summary.jobTarget', e.target.value)} className="rounded-xl h-11 bg-slate-50/50" placeholder="e.g. Senior Software Engineer" />
                        </div>
                        <div className="flex justify-between items-center bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                          <div className="flex items-center gap-4">
                            <Switch checked={data.summary.asBullets} onCheckedChange={(v) => updateField('summary.asBullets', v)} />
                            <Label className="text-[10px] font-black uppercase text-slate-500">Bullet Point Mode</Label>
                          </div>
                          <Button size="sm" onClick={() => handleAiRefine('summary')} disabled={isGenerating} className="bg-[#EF593E] hover:bg-[#D44D35] text-white text-[10px] font-black uppercase h-8 px-4 gap-2 rounded-lg shadow-sm">
                            {isGenerating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />} AI Magic
                          </Button>
                        </div>
                        <div className="relative">
                          <Textarea 
                            value={data.summary.content} 
                            onChange={(e) => updateField('summary.content', e.target.value)} 
                            className="min-h-[160px] rounded-2xl text-sm leading-relaxed border-slate-100 focus:ring-[#EF593E]" 
                            placeholder="Write a compelling summary of your professional journey..."
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
                          <div key={exp.id} className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-100 space-y-8 group relative transition-all hover:border-orange-200">
                            <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeArrayItem('experience', exp.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            
                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase">Role / Position</Label>
                                <Input value={exp.title} onChange={(e) => {
                                  const newExp = [...data.experience];
                                  newExp[i].title = e.target.value;
                                  updateField('experience', newExp);
                                }} className="h-11 rounded-xl bg-white" />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase">Company Name</Label>
                                <Input value={exp.company} onChange={(e) => {
                                  const newExp = [...data.experience];
                                  newExp[i].company = e.target.value;
                                  updateField('experience', newExp);
                                }} className="h-11 rounded-xl bg-white" />
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase">Employment Type</Label>
                                <Select value={exp.employmentType} onValueChange={(v) => {
                                  const newExp = [...data.experience];
                                  newExp[i].employmentType = v as any;
                                  updateField('experience', newExp);
                                }}>
                                  <SelectTrigger className="h-11 rounded-xl bg-white"><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Full-time">Full-time</SelectItem>
                                    <SelectItem value="Part-time">Part-time</SelectItem>
                                    <SelectItem value="Contract">Contract</SelectItem>
                                    <SelectItem value="Internship">Internship</SelectItem>
                                    <SelectItem value="Freelance">Freelance</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase">Industry</Label>
                                <Input value={exp.industry} onChange={(e) => {
                                  const newExp = [...data.experience];
                                  newExp[i].industry = e.target.value;
                                  updateField('experience', newExp);
                                }} className="h-11 rounded-xl bg-white" />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase">Reporting To</Label>
                                <Input value={exp.reportingTo} onChange={(e) => {
                                  const newExp = [...data.experience];
                                  newExp[i].reportingTo = e.target.value;
                                  updateField('experience', newExp);
                                }} className="h-11 rounded-xl bg-white" />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase">Start Date</Label>
                                <div className="grid grid-cols-2 gap-2">
                                  <Input placeholder="Month" value={exp.startMonth} onChange={(e) => {
                                    const newExp = [...data.experience];
                                    newExp[i].startMonth = e.target.value;
                                    updateField('experience', newExp);
                                  }} className="h-11 rounded-xl bg-white" />
                                  <Input placeholder="Year" value={exp.startYear} onChange={(e) => {
                                    const newExp = [...data.experience];
                                    newExp[i].startYear = e.target.value;
                                    updateField('experience', newExp);
                                  }} className="h-11 rounded-xl bg-white" />
                                </div>
                              </div>
                              {!exp.current && (
                                <div className="space-y-2">
                                  <Label className="text-[10px] font-black text-slate-400 uppercase">End Date</Label>
                                  <div className="grid grid-cols-2 gap-2">
                                    <Input placeholder="Month" value={exp.endMonth} onChange={(e) => {
                                      const newExp = [...data.experience];
                                      newExp[i].endMonth = e.target.value;
                                      updateField('experience', newExp);
                                    }} className="h-11 rounded-xl bg-white" />
                                    <Input placeholder="Year" value={exp.endYear} onChange={(e) => {
                                      const newExp = [...data.experience];
                                      newExp[i].endYear = e.target.value;
                                      updateField('experience', newExp);
                                    }} className="h-11 rounded-xl bg-white" />
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-4">
                              <Switch checked={exp.current} onCheckedChange={(v) => {
                                const newExp = [...data.experience];
                                newExp[i].current = v;
                                updateField('experience', newExp);
                              }} />
                              <Label className="text-[10px] font-black uppercase text-slate-500">I currently work here</Label>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-200">
                              <div className="flex items-center justify-between">
                                <Label className="text-[10px] font-black text-slate-400 uppercase">Core Responsibilities</Label>
                                <Button variant="ghost" size="sm" onClick={() => handleAiRefine('experience', i)} className="h-7 text-[10px] font-black uppercase text-[#EF593E] gap-2">
                                  <Sparkles className="h-3 w-3" /> AI Refine
                                </Button>
                              </div>
                              <Textarea value={exp.responsibilities} onChange={(e) => {
                                const newExp = [...data.experience];
                                newExp[i].responsibilities = e.target.value;
                                updateField('experience', newExp);
                              }} className="min-h-[120px] rounded-xl text-sm bg-white" placeholder="List your primary duties..." />
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-200">
                              <Label className="text-[10px] font-black text-slate-400 uppercase">Key Achievements & Impact</Label>
                              <Textarea value={exp.achievements} onChange={(e) => {
                                const newExp = [...data.experience];
                                newExp[i].achievements = e.target.value;
                                updateField('experience', newExp);
                              }} className="min-h-[100px] rounded-xl text-sm bg-white" placeholder="Quantify your success (e.g. Increased revenue by 20%)..." />
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full h-14 rounded-2xl border-dashed border-2 font-black uppercase text-[10px] gap-2 text-slate-400 hover:text-[#EF593E] hover:border-[#EF593E] transition-all" onClick={() => addArrayItem('experience')}>
                          <PlusCircle className="h-5 w-5" /> Add Professional Milestone
                        </Button>
                      </AccordionContent>
                    </AccordionItem>

                    {/* SKILLS */}
                    <AccordionItem value="skills" className="bg-white border rounded-2xl overflow-hidden px-4 shadow-sm transition-all hover:border-orange-100">
                      <AccordionTrigger className="hover:no-underline py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center"><Code className="h-4 w-4 text-[#EF593E]" /></div>
                          <span className="text-xs font-black uppercase tracking-widest text-slate-800">4. Core Expertise</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-8 space-y-8">
                        {data.skills.map((group, i) => (
                          <div key={group.id} className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-100 space-y-6">
                            <div className="flex justify-between items-center">
                              <div className="space-y-2 w-1/2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase">Skill Category</Label>
                                <Select value={group.category} onValueChange={(v) => {
                                  const newSkills = [...data.skills];
                                  newSkills[i].category = v as any;
                                  updateField('skills', newSkills);
                                }}>
                                  <SelectTrigger className="h-10 rounded-xl bg-white"><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Programming Languages">Programming Languages</SelectItem>
                                    <SelectItem value="Frameworks & Libraries">Frameworks & Libraries</SelectItem>
                                    <SelectItem value="Databases">Databases</SelectItem>
                                    <SelectItem value="Cloud & DevOps">Cloud & DevOps</SelectItem>
                                    <SelectItem value="Tools">Tools</SelectItem>
                                    <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                                    <SelectItem value="Domain Skills">Domain Skills</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button variant="ghost" size="icon" className="text-red-400" onClick={() => removeArrayItem('skills', group.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="space-y-4">
                              {group.items.map((skill, si) => (
                                <div key={skill.id} className="grid grid-cols-12 gap-4 items-end bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                  <div className="col-span-4 space-y-2">
                                    <Label className="text-[9px] font-black text-slate-400 uppercase">Skill Name</Label>
                                    <Input value={skill.name} onChange={(e) => {
                                      const newSkills = [...data.skills];
                                      newSkills[i].items[si].name = e.target.value;
                                      updateField('skills', newSkills);
                                    }} className="h-9 rounded-lg text-xs" />
                                  </div>
                                  <div className="col-span-4 space-y-2">
                                    <div className="flex justify-between">
                                      <Label className="text-[9px] font-black text-slate-400 uppercase">Proficiency</Label>
                                      <span className="text-[9px] font-bold text-[#EF593E]">{skill.level}%</span>
                                    </div>
                                    <Slider value={[skill.level]} onValueChange={([v]) => {
                                      const newSkills = [...data.skills];
                                      newSkills[i].items[si].level = v;
                                      updateField('skills', newSkills);
                                    }} />
                                  </div>
                                  <div className="col-span-1">
                                    <Button variant="ghost" size="icon" className="text-slate-300 hover:text-red-400 h-9" onClick={() => {
                                      const newSkills = [...data.skills];
                                      newSkills[i].items.splice(si, 1);
                                      updateField('skills', newSkills);
                                    }}><Trash2 className="h-3 w-3" /></Button>
                                  </div>
                                </div>
                              ))}
                              <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase text-[#EF593E] gap-2 h-10 w-full rounded-xl border border-dashed border-orange-100 hover:bg-orange-50" onClick={() => {
                                const newSkills = [...data.skills];
                                newSkills[i].items.push({ id: Math.random().toString(36).substr(2, 9), name: '', level: 50, priority: 'Primary' });
                                updateField('skills', newSkills);
                              }}>
                                <Plus className="h-3 w-3" /> Add Skill
                              </Button>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full h-14 rounded-2xl border-dashed border-2 font-black uppercase text-[10px] gap-2 text-slate-400 hover:text-[#EF593E] hover:border-[#EF593E]" onClick={() => addArrayItem('skills')}>
                          <PlusCircle className="h-5 w-5" /> Add Skill Category
                        </Button>
                      </AccordionContent>
                    </AccordionItem>

                    {/* LANGUAGES */}
                    <AccordionItem value="languages" className="bg-white border rounded-2xl overflow-hidden px-4 shadow-sm transition-all hover:border-orange-100">
                      <AccordionTrigger className="hover:no-underline py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center"><Languages className="h-4 w-4 text-[#EF593E]" /></div>
                          <span className="text-xs font-black uppercase tracking-widest text-slate-800">6. Languages</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-8 space-y-6">
                        {data.languages.map((lang, i) => (
                          <div key={lang.id} className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-100 relative group">
                            <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 h-8 w-8 bg-white shadow-sm border border-slate-100" onClick={() => removeArrayItem('languages', lang.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                            <div className="grid grid-cols-4 gap-4">
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase">Language</Label>
                                <Input value={lang.name} onChange={(e) => {
                                  const newLang = [...data.languages];
                                  newLang[i].name = e.target.value;
                                  updateField('languages', newLang);
                                }} className="h-10 rounded-xl bg-white" />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase">Reading</Label>
                                <Select value={lang.reading} onValueChange={(v) => {
                                  const newLang = [...data.languages];
                                  newLang[i].reading = v as any;
                                  updateField('languages', newLang);
                                }}>
                                  <SelectTrigger className="h-10 rounded-xl bg-white"><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Basic">Basic</SelectItem>
                                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                                    <SelectItem value="Advanced">Advanced</SelectItem>
                                    <SelectItem value="Native">Native</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase">Writing</Label>
                                <Select value={lang.writing} onValueChange={(v) => {
                                  const newLang = [...data.languages];
                                  newLang[i].writing = v as any;
                                  updateField('languages', newLang);
                                }}>
                                  <SelectTrigger className="h-10 rounded-xl bg-white"><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Basic">Basic</SelectItem>
                                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                                    <SelectItem value="Advanced">Advanced</SelectItem>
                                    <SelectItem value="Native">Native</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black text-slate-400 uppercase">Speaking</Label>
                                <Select value={lang.speaking} onValueChange={(v) => {
                                  const newLang = [...data.languages];
                                  newLang[i].speaking = v as any;
                                  updateField('languages', newLang);
                                }}>
                                  <SelectTrigger className="h-10 rounded-xl bg-white"><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Basic">Basic</SelectItem>
                                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                                    <SelectItem value="Advanced">Advanced</SelectItem>
                                    <SelectItem value="Native">Native</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button variant="ghost" size="sm" className="w-full h-14 text-[10px] font-black uppercase text-[#EF593E] border border-dashed border-2 border-orange-100 hover:bg-orange-50 gap-2 rounded-2xl" onClick={() => addArrayItem('languages')}>
                          <Plus className="h-4 w-4" /> Add Language
                        </Button>
                      </AccordionContent>
                    </AccordionItem>

                    {/* INTERESTS */}
                    <AccordionItem value="interests" className="bg-white border rounded-2xl overflow-hidden px-4 shadow-sm transition-all hover:border-orange-100">
                      <AccordionTrigger className="hover:no-underline py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center"><Heart className="h-4 w-4 text-[#EF593E]" /></div>
                          <span className="text-xs font-black uppercase tracking-widest text-slate-800">7. Hobbies & Interests</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-8 space-y-4">
                        <Label className="text-[10px] font-black text-slate-400 uppercase">Interests (Comma Separated)</Label>
                        <Textarea 
                          value={data.interests.join(', ')} 
                          onChange={(e) => updateField('interests', e.target.value.split(',').map(i => i.trim()))} 
                          className="min-h-[100px] rounded-2xl text-sm border-2 border-slate-900" 
                          placeholder="e.g. Hiking, Photography, Chess..." 
                        />
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
            <Button size="icon" className="w-14 h-14 rounded-full bg-slate-900 text-white shadow-xl hover:bg-slate-800 transition-all"><Maximize2 className="h-6 w-6" /></Button>
            <Button size="icon" onClick={() => window.print()} className="w-14 h-14 rounded-full bg-[#EF593E] text-white shadow-xl hover:bg-[#D44D35] transition-all"><Download className="h-6 w-6" /></Button>
          </div>
        </main>
      </div>
    </div>
  );
}
