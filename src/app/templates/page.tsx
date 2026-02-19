
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Download, 
  Type as TypeIcon, 
  Layout, 
  User, 
  Plus, 
  Trash2, 
  Check, 
  Sparkles,
  Loader2,
  ChevronDown,
  Eye,
  EyeOff,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  BookOpen,
  Languages,
  Palette,
  Settings,
  MoreVertical,
  Github,
  Linkedin,
  Globe,
  PlusCircle,
  FileText
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
  { id: 'corporate-blue', name: 'Corporate Blue', primary: '#1E3A8A', accent: '#2563EB' },
  { id: 'elegant-black', name: 'Elegant Black', primary: '#111111', accent: '#333333' },
  { id: 'modern-teal', name: 'Modern Teal', primary: '#0F766E', accent: '#14B8A6' },
  { id: 'minimal-gray', name: 'Minimal Gray', primary: '#374151', accent: '#9CA3AF' },
  { id: 'executive-burgundy', name: 'Executive Burgundy', primary: '#7F1D1D', accent: '#B91C1C' },
];

const FONTS = [
  { id: 'inter', name: 'Inter', family: '"Inter", sans-serif' },
  { id: 'poppins', name: 'Poppins', family: '"Poppins", sans-serif' },
  { id: 'lora', name: 'Lora', family: '"Lora", serif' },
  { id: 'playfair', name: 'Playfair Display', family: '"Playfair Display", serif' },
  { id: 'montserrat', name: 'Montserrat', family: '"Montserrat", sans-serif' },
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
  const [activeTab, setActiveTab] = useState('content');
  const [selectedTemplateId, setSelectedTemplateId] = useState('classic');
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [fontSize, setFontSize] = useState(13);
  const [sectionSpacing, setSectionSpacing] = useState(24);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  const [data, setData] = useState<ResumeData>({
    personal: {
      fullName: 'Johnathan Doe',
      jobTitle: 'Senior Software Engineer',
      headline: 'Architecting scalable cloud solutions with 8+ years of expertise',
      email: 'john.doe@example.com',
      phone: '+1 (555) 000-1111',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/johndoe',
      github: 'github.com/johndoe',
      portfolio: 'johndoe.dev'
    },
    summary: {
      content: 'Strategic and results-driven Senior Software Engineer with 8+ years of experience in designing and implementing scalable cloud architectures. Expert in full-stack development, distributed systems, and leading cross-functional teams to deliver high-impact technical solutions.',
      asBullets: false
    },
    experience: [
      {
        id: '1',
        title: 'Senior Software Engineer',
        company: 'TechGlobal Solutions',
        location: 'New York, NY',
        employmentType: 'Full-time',
        startDate: '2020-01-01',
        endDate: '',
        current: true,
        description: 'Led the migration of a legacy monolithic architecture to a microservices-based system.\nArchitected and implemented a real-time data processing pipeline using Kafka and Spark.',
        metrics: 'Improved system scalability by 40% and reduced deployment time by 60%.',
        technologies: 'Node.js, AWS, Kubernetes, Kafka, React'
      }
    ],
    skills: [
      {
        id: '1',
        category: 'Technical Skills',
        items: [
          { id: '1a', name: 'React', level: 'Expert', years: '6' },
          { id: '1b', name: 'Next.js', level: 'Expert', years: '4' }
        ]
      }
    ],
    education: [
      { 
        id: '1', 
        degree: 'B.S. Computer Science', 
        field: 'Software Engineering',
        school: 'MIT', 
        location: 'Cambridge, MA',
        startDate: '2012', 
        endDate: '2016',
        gpa: '3.9/4.0',
        honors: 'Cum Laude'
      }
    ],
    projects: [
      {
        id: '1',
        title: 'CloudFlow Orchestrator',
        description: 'An open-source automation engine for multi-cloud deployments.',
        technologies: 'Go, Docker, Terraform',
        github: 'github.com/johndoe/cloudflow',
        role: 'Lead Maintainer',
        contributions: 'Implemented the core scheduling logic and AWS provider.'
      }
    ],
    certifications: [
      { id: '1', name: 'AWS Solutions Architect', org: 'Amazon Web Services', date: '2022' }
    ],
    achievements: [
      { id: '1', title: 'Top Performer 2023', description: 'Awarded for exceptional delivery of the Q3 infrastructure project.', year: '2023' }
    ],
    publications: [],
    languages: [
      { id: '1', name: 'English', level: 'Native' },
      { id: '2', name: 'Spanish', level: 'Conversational' }
    ],
    interests: ['Blockchain', 'Open Source', 'Mountaineering'],
    customSections: []
  });

  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>({
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

  const handlePersonalUpdate = (field: keyof ResumeData['personal'], value: string) => {
    setData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const handleAiGenerate = async (type: 'summary' | 'experience', index?: number) => {
    setIsGenerating(true);
    try {
      const keywords = type === 'summary' ? data.skills.flatMap(s => s.items.map(i => i.name)).join(', ') : data.experience[index!].description;
      const res = await generateResumeContent({
        type,
        jobTitle: data.personal.jobTitle,
        keywords: keywords || 'Professional growth, technical leadership'
      });
      
      if (type === 'summary') {
        setData(prev => ({ ...prev, summary: { ...prev.summary, content: res.generatedText } }));
      } else {
        const newExp = [...data.experience];
        newExp[index!] = { ...newExp[index!], description: res.generatedText };
        setData(prev => ({ ...prev, experience: newExp }));
      }
      
      toast({
        title: "AI Optimization Successful",
        description: "Content refined for ATS compatibility.",
      });
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "AI Service Error",
        description: "Could not generate content. Please try again later.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const addArrayItem = (key: keyof Omit<ResumeData, 'personal' | 'summary' | 'interests'>) => {
    const newItem: any = { id: Math.random().toString(36).substr(2, 9) };
    if (key === 'experience') {
      Object.assign(newItem, { title: '', company: '', location: '', employmentType: 'Full-time', startDate: '', endDate: '', current: false, description: '' });
    } else if (key === 'education') {
      Object.assign(newItem, { degree: '', field: '', school: '', location: '', startDate: '', endDate: '' });
    } else if (key === 'skills') {
      Object.assign(newItem, { category: 'New Category', items: [] });
    }
    setData(prev => ({ ...prev, [key]: [...(prev[key] as any[]), newItem] }));
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden no-print">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center justify-between px-8 z-50">
        <Link href="/"><Logo /></Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-slate-500 font-bold hover:text-[#EF593E]">Resume Editor</Button>
          <div className="h-6 w-[1px] bg-slate-200 mx-2" />
          <Button onClick={() => window.print()} className="bg-[#EF593E] hover:bg-[#D44D35] text-white font-bold gap-2 rounded-lg px-6 shadow-lg shadow-orange-100 transition-all active:scale-95">
            <Download className="h-4 w-4" /> Download PDF
          </Button>
        </div>
      </header>

      <div className="flex flex-1 pt-16 h-full overflow-hidden">
        {/* Editor Sidebar */}
        <aside className="w-[550px] bg-white border-r flex flex-col h-full shrink-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
            <TabsList className="grid grid-cols-2 h-14 bg-white border-b rounded-none p-0 shrink-0">
              <TabsTrigger value="templates" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:text-[#EF593E] font-black text-[10px] uppercase tracking-widest">
                <Layout className="h-4 w-4 mr-2" /> Design & Style
              </TabsTrigger>
              <TabsTrigger value="content" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:text-[#EF593E] font-black text-[10px] uppercase tracking-widest">
                <FileText className="h-4 w-4 mr-2" /> Content Editor
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1 w-full bg-slate-50/30">
              <div className="p-8 pb-32">
                
                {/* DESIGN TAB */}
                <TabsContent value="templates" className="m-0 space-y-12">
                  <section className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Templates</h3>
                      <span className="text-[10px] font-bold text-slate-300">20 Styles</span>
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
                            <p className="text-xs font-black uppercase text-slate-800">{template.name}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase">{template.category}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-8 pt-10 border-t">
                    <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Typography & Theme</h3>
                    <div className="space-y-8">
                      <div className="grid grid-cols-5 gap-3">
                        {THEMES.map(theme => (
                          <button key={theme.id} onClick={() => setSelectedTheme(theme)} className={cn("w-full aspect-square rounded-xl border-4 transition-all shadow-sm", selectedTheme.id === theme.id ? "border-[#EF593E]" : "border-transparent")} style={{ backgroundColor: theme.primary }} />
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <Label className="text-[10px] font-black uppercase text-slate-400">Font Size ({fontSize}px)</Label>
                          <Slider value={[fontSize]} min={10} max={18} step={1} onValueChange={([v]) => setFontSize(v)} />
                        </div>
                        <div className="space-y-4">
                          <Label className="text-[10px] font-black uppercase text-slate-400">Line Height ({lineHeight})</Label>
                          <Slider value={[lineHeight]} min={1} max={2.5} step={0.1} onValueChange={([v]) => setLineHeight(v)} />
                        </div>
                      </div>
                    </div>
                  </section>
                </TabsContent>

                {/* CONTENT TAB */}
                <TabsContent value="content" className="m-0 space-y-4">
                  <Accordion type="multiple" defaultValue={['personal']} className="space-y-4">
                    
                    {/* PERSONAL DETAILS */}
                    <AccordionItem value="personal" className="bg-white border rounded-2xl overflow-hidden px-4 shadow-sm">
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center"><User className="h-4 w-4 text-[#EF593E]" /></div>
                          <span className="text-xs font-black uppercase tracking-widest">Personal Details</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-6 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-slate-400 uppercase">Full Name</Label>
                            <Input value={data.personal.fullName} onChange={(e) => handlePersonalUpdate('fullName', e.target.value)} className="rounded-xl h-11" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-slate-400 uppercase">Headline / Tagline</Label>
                            <Input value={data.personal.jobTitle} onChange={(e) => handlePersonalUpdate('jobTitle', e.target.value)} className="rounded-xl h-11" />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-slate-400 uppercase">LinkedIn</Label>
                            <Input value={data.personal.linkedin} onChange={(e) => handlePersonalUpdate('linkedin', e.target.value)} className="rounded-xl h-11" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-slate-400 uppercase">GitHub</Label>
                            <Input value={data.personal.github} onChange={(e) => handlePersonalUpdate('github', e.target.value)} className="rounded-xl h-11" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-slate-400 uppercase">Portfolio</Label>
                            <Input value={data.personal.portfolio} onChange={(e) => handlePersonalUpdate('portfolio', e.target.value)} className="rounded-xl h-11" />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* PROFESSIONAL SUMMARY */}
                    <AccordionItem value="summary" className="bg-white border rounded-2xl overflow-hidden px-4 shadow-sm">
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center"><Sparkles className="h-4 w-4 text-[#EF593E]" /></div>
                          <span className="text-xs font-black uppercase tracking-widest">Professional Summary</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-6 space-y-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <Switch checked={data.summary.asBullets} onCheckedChange={(v) => setData(prev => ({ ...prev, summary: { ...prev.summary, asBullets: v } }))} />
                            <Label className="text-[10px] font-bold text-slate-400 uppercase">Use Bullets</Label>
                          </div>
                          <Button size="sm" variant="ghost" onClick={() => handleAiGenerate('summary')} className="text-[10px] font-black uppercase text-[#EF593E] h-8 gap-2">
                            {isGenerating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-4 w-4" />} AI Improve
                          </Button>
                        </div>
                        <div className="relative">
                          <Textarea 
                            value={data.summary.content} 
                            onChange={(e) => setData(prev => ({ ...prev, summary: { ...prev.summary, content: e.target.value } }))} 
                            className="min-h-[160px] rounded-2xl text-sm leading-relaxed" 
                          />
                          <div className="absolute bottom-3 right-4 text-[10px] font-bold text-slate-300">
                            {data.summary.content.length} characters
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* WORK EXPERIENCE */}
                    <AccordionItem value="experience" className="bg-white border rounded-2xl overflow-hidden px-4 shadow-sm">
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center"><Briefcase className="h-4 w-4 text-[#EF593E]" /></div>
                          <span className="text-xs font-black uppercase tracking-widest">Work Experience</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-6 space-y-6">
                        {data.experience.map((exp, i) => (
                          <div key={exp.id} className="p-6 rounded-3xl bg-slate-50 border space-y-6 group relative">
                            <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== exp.id) }))}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <div className="grid grid-cols-2 gap-4">
                              <Input placeholder="Job Title" value={exp.title} onChange={(e) => {
                                const newExp = [...data.experience];
                                newExp[i].title = e.target.value;
                                setData(prev => ({ ...prev, experience: newExp }));
                              }} className="h-10 text-xs rounded-xl" />
                              <Input placeholder="Company" value={exp.company} onChange={(e) => {
                                const newExp = [...data.experience];
                                newExp[i].company = e.target.value;
                                setData(prev => ({ ...prev, experience: newExp }));
                              }} className="h-10 text-xs rounded-xl" />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <Input placeholder="Location" value={exp.location} onChange={(e) => {
                                const newExp = [...data.experience];
                                newExp[i].location = e.target.value;
                                setData(prev => ({ ...prev, experience: newExp }));
                              }} className="h-10 text-xs rounded-xl" />
                              <Select value={exp.employmentType} onValueChange={(v) => {
                                const newExp = [...data.experience];
                                newExp[i].employmentType = v;
                                setData(prev => ({ ...prev, experience: newExp }));
                              }}>
                                <SelectTrigger className="h-10 text-xs rounded-xl"><SelectValue placeholder="Type" /></SelectTrigger>
                                <SelectContent>
                                  {['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                </SelectContent>
                              </Select>
                              <div className="flex items-center gap-2">
                                <Switch checked={exp.current} onCheckedChange={(v) => {
                                  const newExp = [...data.experience];
                                  newExp[i].current = v;
                                  setData(prev => ({ ...prev, experience: newExp }));
                                }} />
                                <Label className="text-[10px] font-bold uppercase">Current</Label>
                              </div>
                            </div>
                            <Textarea placeholder="Describe achievements..." value={exp.description} onChange={(e) => {
                              const newExp = [...data.experience];
                              newExp[i].description = e.target.value;
                              setData(prev => ({ ...prev, experience: newExp }));
                            }} className="min-h-[120px] text-xs rounded-xl" />
                            <div className="flex justify-end">
                               <Button size="sm" variant="ghost" onClick={() => handleAiGenerate('experience', i)} className="text-[10px] font-black uppercase text-[#EF593E] h-8 gap-2">
                                <Sparkles className="h-4 w-4" /> AI Refine
                              </Button>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full h-12 rounded-2xl border-dashed border-2 font-bold uppercase text-[10px] gap-2 text-slate-400 hover:text-[#EF593E] hover:border-[#EF593E] hover:bg-orange-50 transition-all" onClick={() => addArrayItem('experience')}>
                          <PlusCircle className="h-4 w-4" /> Add Experience Entry
                        </Button>
                      </AccordionContent>
                    </AccordionItem>

                    {/* SKILLS */}
                    <AccordionItem value="skills" className="bg-white border rounded-2xl overflow-hidden px-4 shadow-sm">
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center"><Code className="h-4 w-4 text-[#EF593E]" /></div>
                          <span className="text-xs font-black uppercase tracking-widest">Skills & Expertise</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-6 space-y-6">
                         {data.skills.map((skillGroup, i) => (
                           <div key={skillGroup.id} className="p-6 rounded-3xl bg-slate-50 border space-y-4">
                              <Input value={skillGroup.category} onChange={(e) => {
                                const newSkills = [...data.skills];
                                newSkills[i].category = e.target.value;
                                setData(prev => ({ ...prev, skills: newSkills }));
                              }} className="h-10 text-[10px] font-black uppercase tracking-widest border-none bg-transparent focus-visible:ring-0" />
                              <div className="flex flex-wrap gap-2">
                                {skillGroup.items.map((skill, j) => (
                                  <div key={skill.id} className="group flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border shadow-sm">
                                    <span className="text-xs font-bold text-slate-700">{skill.name}</span>
                                    <Button variant="ghost" size="icon" className="h-4 w-4 text-red-300 opacity-0 group-hover:opacity-100" onClick={() => {
                                      const newSkills = [...data.skills];
                                      newSkills[i].items = newSkills[i].items.filter(it => it.id !== skill.id);
                                      setData(prev => ({ ...prev, skills: newSkills }));
                                    }}><Trash2 className="h-3 w-3" /></Button>
                                  </div>
                                ))}
                                <Button variant="ghost" size="sm" className="h-8 rounded-xl text-[10px] font-black uppercase text-[#EF593E] hover:bg-orange-100" onClick={() => {
                                  const name = prompt('Skill Name:');
                                  if (name) {
                                    const newSkills = [...data.skills];
                                    newSkills[i].items.push({ id: Math.random().toString(), name, level: 'Advanced' });
                                    setData(prev => ({ ...prev, skills: newSkills }));
                                  }
                                }}>+ Add</Button>
                              </div>
                           </div>
                         ))}
                         <Button variant="outline" className="w-full h-12 rounded-2xl border-dashed border-2 font-bold uppercase text-[10px] gap-2 text-slate-400" onClick={() => addArrayItem('skills')}>
                          <PlusCircle className="h-4 w-4" /> Add Skill Category
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
          <div className="origin-top transition-transform duration-500 hover:scale-[1.01]">
            <ResumeCanvas 
              templateId={selectedTemplateId}
              theme={selectedTheme}
              font={selectedFont}
              data={data}
              sections={sectionVisibility}
              style={{ fontSize, lineHeight, sectionSpacing }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
