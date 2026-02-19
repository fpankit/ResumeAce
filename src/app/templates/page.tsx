"use client";

import React, { useState, useMemo } from 'react';
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
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { generateResumeContent } from '@/ai/flows/generate-resume-content';
import { useToast } from '@/hooks/use-toast';

// Templates
import Classic from '@/components/resume-templates/Classic';
import Modern from '@/components/resume-templates/Modern';
import ATSMinimal from '@/components/resume-templates/ATSMinimal';
import TwoColumn from '@/components/resume-templates/TwoColumn';
import Tech from '@/components/resume-templates/Tech';
import Executive from '@/components/resume-templates/Executive';
import Compact from '@/components/resume-templates/Compact';
import Academic from '@/components/resume-templates/Academic';
import Management from '@/components/resume-templates/Management';
import Creative from '@/components/resume-templates/Creative';
import BoldHeader from '@/components/resume-templates/BoldHeader';
import ElegantSerif from '@/components/resume-templates/ElegantSerif';
import Timeline from '@/components/resume-templates/Timeline';
import Corporate from '@/components/resume-templates/Corporate';
import SoftGray from '@/components/resume-templates/SoftGray';
import BlueAccent from '@/components/resume-templates/BlueAccent';
import Monochrome from '@/components/resume-templates/Monochrome';
import Fresher from '@/components/resume-templates/Fresher';
import Senior from '@/components/resume-templates/Senior';
import Hybrid from '@/components/resume-templates/Hybrid';

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
  { id: 'classic', name: 'Classic Single Column', category: 'Standard', component: Classic },
  { id: 'modern', name: 'Modern Professional', category: 'Modern', component: Modern },
  { id: 'ats-minimal', name: 'ATS Prime Minimal', category: 'ATS', component: ATSMinimal },
  { id: 'two-column', name: 'Two Column Sidebar', category: 'Modern', component: TwoColumn },
  { id: 'tech', name: 'Tech Developer Style', category: 'Tech', component: Tech },
  { id: 'executive', name: 'Executive Clean', category: 'Executive', component: Executive },
  { id: 'academic', name: 'Academic CV', category: 'Academic', component: Academic },
  { id: 'management', name: 'Management Resume', category: 'Executive', component: Management },
  { id: 'creative', name: 'Creative Minimal', category: 'Creative', component: Creative },
  { id: 'bold-header', name: 'Bold Header Layout', category: 'Modern', component: BoldHeader },
  { id: 'elegant-serif', name: 'Elegant Serif', category: 'Elegant', component: ElegantSerif },
  { id: 'structured-timeline', name: 'Structured Timeline', category: 'Modern', component: Timeline },
  { id: 'corporate-formal', name: 'Corporate Formal', category: 'Executive', component: Corporate },
  { id: 'soft-gray', name: 'Soft Gray Layout', category: 'Modern', component: SoftGray },
  { id: 'blue-accent', name: 'Blue Accent Left Border', category: 'Modern', component: BlueAccent },
  { id: 'monochrome', name: 'Monochrome Minimal', category: 'ATS', component: Monochrome },
  { id: 'compact', name: 'Compact Dense', category: 'Standard', component: Compact },
  { id: 'fresher', name: 'Compact Fresher', category: 'Compact', component: Fresher },
  { id: 'senior', name: 'Senior Professional', category: 'Executive', component: Senior },
  { id: 'hybrid', name: 'Hybrid Modern Clean', category: 'Modern', component: Hybrid },
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
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedTemplateId, setSelectedTemplateId] = useState('classic');
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [fontSize, setFontSize] = useState(13);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  const [data, setData] = useState({
    personal: {
      fullName: 'Johnathan Doe',
      jobTitle: 'Senior Software Engineer',
      email: 'john.doe@example.com',
      phone: '+1 (555) 000-1111',
      location: 'New York, NY',
    },
    summary: 'Strategic and results-driven Senior Software Engineer with 8+ years of experience in designing and implementing scalable cloud architectures. Expert in full-stack development, distributed systems, and leading cross-functional teams to deliver high-impact technical solutions.',
    experience: [
      {
        id: '1',
        title: 'Senior Software Engineer',
        company: 'TechGlobal Solutions',
        period: 'Jan 2020 - Present',
        description: 'Led the migration of a legacy monolithic architecture to a microservices-based system.\nArchitected and implemented a real-time data processing pipeline using Kafka and Spark.'
      },
      {
        id: '2',
        title: 'Software Developer',
        company: 'InnoStream Inc.',
        period: 'Jun 2016 - Dec 2019',
        description: 'Developed and maintained core features of the flagship SaaS product, serving over 500k monthly active users.'
      }
    ],
    skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'AWS'],
    education: [
      { id: '1', degree: 'B.S. Computer Science', school: 'MIT', period: '2012-2016' }
    ]
  });

  const SelectedTemplate = useMemo(() => {
    const template = TEMPLATES.find(t => t.id === selectedTemplateId) || TEMPLATES[0];
    return template.component;
  }, [selectedTemplateId]);

  const handlePersonalUpdate = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const handleExperienceUpdate = (index: number, field: string, value: string) => {
    setData(prev => {
      const newExp = [...prev.experience];
      newExp[index] = { ...newExp[index], [field]: value };
      return { ...prev, experience: newExp };
    });
  };

  const addExperience = () => {
    setData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: Math.random().toString(), title: '', company: '', period: '', description: '' }]
    }));
  };

  const removeExperience = (index: number) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleAiGenerate = async (type: 'summary' | 'experience', index?: number) => {
    setIsGenerating(true);
    try {
      const keywords = type === 'summary' ? data.skills.join(', ') : data.experience[index!].description;
      const res = await generateResumeContent({
        type,
        jobTitle: data.personal.jobTitle,
        keywords: keywords || 'Professional growth, technical leadership'
      });
      
      if (type === 'summary') {
        setData(prev => ({ ...prev, summary: res.generatedText }));
      } else {
        handleExperienceUpdate(index!, 'description', res.generatedText);
      }
      
      toast({
        title: "AI Generation Successful",
        description: "Your content has been optimized for ATS compatibility.",
      });
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "AI Generation Failed",
        description: e.message || "Failed to generate content. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden no-print">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center justify-between px-8 z-50">
        <Link href="/"><Logo /></Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-slate-500 font-bold hover:text-[#EF593E]">Editor</Button>
          <div className="h-6 w-[1px] bg-slate-200 mx-2" />
          <Button onClick={() => window.print()} className="bg-[#EF593E] hover:bg-[#D44D35] text-white font-bold gap-2 rounded-lg px-6">
            <Download className="h-4 w-4" /> Download PDF
          </Button>
        </div>
      </header>

      <div className="flex flex-1 pt-16 h-full">
        <aside className="w-[500px] bg-white border-r flex flex-col relative z-20">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-2 h-14 bg-white border-b rounded-none p-0 sticky top-0 z-10">
              <TabsTrigger value="templates" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:text-[#EF593E] font-black text-[10px] uppercase tracking-widest">
                <Layout className="h-4 w-4 mr-2" /> Templates & Styles
              </TabsTrigger>
              <TabsTrigger value="content" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:text-[#EF593E] font-black text-[10px] uppercase tracking-widest">
                <TypeIcon className="h-4 w-4 mr-2" /> Text Content
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1">
              <div className="p-8 pb-32">
                <TabsContent value="templates" className="mt-0 space-y-10">
                  <section className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Select Template</h3>
                      <span className="text-[10px] font-bold text-slate-300">20 Styles Available</span>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      {TEMPLATES.map(template => (
                        <div key={template.id} className="group cursor-pointer space-y-3" onClick={() => setSelectedTemplateId(template.id)}>
                          <div className={cn(
                            "relative aspect-[3/4] bg-slate-50 rounded-2xl border-2 transition-all duration-300 overflow-hidden flex items-center justify-center",
                            selectedTemplateId === template.id 
                              ? "border-[#EF593E] ring-4 ring-orange-50 shadow-xl" 
                              : "border-slate-100 hover:border-slate-300 shadow-sm"
                          )}>
                            <div className="absolute inset-4 space-y-2 opacity-20">
                              <div className="h-4 w-1/2 bg-slate-400 rounded" />
                              <div className="h-10 w-full bg-slate-300 rounded" />
                              <div className="h-2 w-full bg-slate-200 rounded" />
                            </div>
                            {selectedTemplateId === template.id && (
                              <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-[#EF593E] flex items-center justify-center text-white shadow-xl animate-in zoom-in-50 duration-300">
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
                  <section className="space-y-6 pt-10 border-t">
                    <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Typography & Theme</h3>
                    <div className="space-y-8">
                      <div className="grid grid-cols-5 gap-3">
                        {THEMES.map(theme => (
                          <button 
                            key={theme.id} 
                            onClick={() => setSelectedTheme(theme)}
                            className={cn(
                              "w-full aspect-square rounded-full border-4 transition-all",
                              selectedTheme.id === theme.id ? "border-[#EF593E]" : "border-transparent"
                            )}
                            style={{ backgroundColor: theme.primary }}
                          />
                        ))}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-400">Font Size ({fontSize}px)</Label>
                        <Slider value={[fontSize]} min={10} max={18} step={1} onValueChange={([v]) => setFontSize(v)} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-400">Line Height ({lineHeight})</Label>
                        <Slider value={[lineHeight]} min={1} max={2.5} step={0.1} onValueChange={([v]) => setLineHeight(v)} />
                      </div>
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="content" className="mt-0 space-y-12">
                  <section className="space-y-6">
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-[#EF593E]" />
                      <h3 className="text-xs font-black uppercase text-slate-900 tracking-widest">Personal Details</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-400">Full Name</Label>
                        <Input value={data.personal.fullName} onChange={(e) => handlePersonalUpdate('fullName', e.target.value)} className="rounded-xl border-slate-100" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-400">Job Title</Label>
                        <Input value={data.personal.jobTitle} onChange={(e) => handlePersonalUpdate('jobTitle', e.target.value)} className="rounded-xl border-slate-100" />
                      </div>
                    </div>
                  </section>
                  <section className="space-y-6 pt-10 border-t">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black uppercase text-slate-900 tracking-widest">Summary</h3>
                      <Button size="sm" variant="ghost" onClick={() => handleAiGenerate('summary')} disabled={isGenerating} className="text-[10px] font-black uppercase text-[#EF593E] h-8 hover:bg-orange-50">
                        {isGenerating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3 mr-1" />} AI Magic
                      </Button>
                    </div>
                    <Textarea value={data.summary} onChange={(e) => setData(prev => ({ ...prev, summary: e.target.value }))} className="min-h-[120px] rounded-xl text-sm leading-relaxed" />
                  </section>
                  <section className="space-y-8 pt-10 border-t">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black uppercase text-slate-900 tracking-widest">Experience</h3>
                      <Button onClick={addExperience} variant="ghost" className="h-8 text-[10px] font-black uppercase text-[#EF593E] hover:bg-orange-50"><Plus className="h-3 w-3 mr-1" /> Add Entry</Button>
                    </div>
                    {data.experience.map((exp, i) => (
                      <div key={exp.id} className="p-6 rounded-2xl bg-slate-50/50 border space-y-4 group relative hover:border-orange-200 transition-all">
                        <Button onClick={() => removeExperience(i)} variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /></Button>
                        <div className="grid grid-cols-2 gap-3">
                          <Input placeholder="Title" value={exp.title} onChange={(e) => handleExperienceUpdate(i, 'title', e.target.value)} className="h-9 text-xs" />
                          <Input placeholder="Company" value={exp.company} onChange={(e) => handleExperienceUpdate(i, 'company', e.target.value)} className="h-9 text-xs" />
                        </div>
                        <div className="relative">
                          <Textarea placeholder="Achievements..." value={exp.description} onChange={(e) => handleExperienceUpdate(i, 'description', e.target.value)} className="min-h-[100px] text-xs leading-relaxed" />
                          <Button size="sm" variant="ghost" onClick={() => handleAiGenerate('experience', i)} disabled={isGenerating} className="absolute bottom-2 right-2 h-7 px-2 text-[9px] font-black uppercase text-[#EF593E] bg-white/80 backdrop-blur shadow-sm hover:bg-white transition-all">AI Refine</Button>
                        </div>
                      </div>
                    ))}
                  </section>
                </div>
              </div>
            </ScrollArea>
          </Tabs>
        </aside>

        <main className="flex-1 bg-slate-100 overflow-auto p-16 flex flex-col items-center">
          <div 
            className="resume-a4 shadow-2xl bg-white min-h-[1123px] w-[794px] mx-auto transition-all duration-500 overflow-hidden p-[60px]" 
            style={{ fontFamily: selectedFont.family }}
          >
            <SelectedTemplate 
              data={data} 
              theme={selectedTheme} 
              style={{ fontSize, lineHeight }} 
            />
          </div>
        </main>
      </div>
    </div>
  );
}