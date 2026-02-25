
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Download, 
  Loader2,
  FileText,
  Palette,
  Sparkles,
  Briefcase,
  Trash2,
  PlusCircle,
  Code,
  Languages,
  Heart,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { ResumeCanvas } from '@/components/resume/resume-canvas';
import { ResumeData } from '@/types/resume';
import { Logo } from '@/components/brand/logo';

const THEMES = [
  { id: 'coral', name: 'Network Bulls Coral', primary: '#EF593E', accent: '#D44D35', text: '#1E293B', secondary: '#64748B' },
  { id: 'corporate-blue', name: 'Corporate Blue', primary: '#1E3A8A', accent: '#2563EB', text: '#1E293B', secondary: '#64748B' },
  { id: 'midnight', name: 'Midnight Professional', primary: '#0F172A', accent: '#334155', text: '#0F172A', secondary: '#475569' },
  { id: 'emerald', name: 'Emerald Executive', primary: '#064E3B', accent: '#059669', text: '#064E3B', secondary: '#374151' },
  { id: 'burgundy', name: 'Royal Burgundy', primary: '#450A0A', accent: '#991B1B', text: '#450A0A', secondary: '#4B5563' },
];

const FONT_CATEGORIES = [
  {
    name: 'Sans-Serif (Modern)',
    fonts: [
      { id: 'inter', name: 'Inter', family: '"Inter", sans-serif' },
      { id: 'montserrat', name: 'Montserrat', family: '"Montserrat", sans-serif' },
      { id: 'poppins', name: 'Poppins', family: '"Poppins", sans-serif' },
    ]
  },
  {
    name: 'Serif (Traditional)',
    fonts: [
      { id: 'merriweather', name: 'Merriweather', family: '"Merriweather", serif' },
      { id: 'eb-garamond', name: 'EB Garamond', family: '"EB Garamond", serif' },
    ]
  }
];

const ALL_FONTS = FONT_CATEGORIES.flatMap(c => c.fonts);

const TEMPLATES = [
  { id: 'classic', name: 'Classic Single Column', category: 'Standard' },
  { id: 'modern', name: 'Modern Professional', category: 'Modern' },
  { id: 'ats-minimal', name: 'ATS Prime Minimal', category: 'ATS' },
  { id: 'executive', name: 'Executive Clean', category: 'Executive' },
  { id: 'tech', name: 'Tech Developer Style', category: 'Tech' },
];

export default function ResumeBuilderPage() {
  const [activeTab, setActiveTab] = useState('content');
  const [selectedTemplateId, setSelectedTemplateId] = useState('classic');
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [selectedFont, setSelectedFont] = useState(ALL_FONTS[0]);
  const [lineHeight, setLineHeight] = useState(1.4);
  const [fontSize, setFontSize] = useState(11);
  const [sectionSpacing, setSectionSpacing] = useState(20);
  const [isExporting, setIsExporting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  const [data, setData] = useState<ResumeData>({
    personal: {
      fullName: 'Ankit',
      jobTitle: 'Principal Cloud Architect',
      headline: 'Architecting high-availability systems for global enterprises',
      email: 'ankit@tech-pioneer.com',
      phone: '+1 (555) 789-0123',
      location: {
        street: '123 Cloud Avenue',
        city: 'Seattle',
        state: 'WA',
        country: 'USA',
        zip: '98101'
      },
      linkedin: 'linkedin.com/in/ankit-arch',
      github: 'github.com/ankit-cloud',
      portfolio: 'ankit.cloud',
      twitter: 'twitter.com/ankit_cloud',
      nationality: 'United States',
      maritalStatus: 'Married',
    },
    summary: { content: 'Principal Cloud Architect with over 12 years of experience in digital transformation. Expert at migrating legacy workloads to hybrid-cloud infrastructures with zero downtime. Proven track record of reducing operational costs by 35% while increasing system reliability to 99.99%.', asBullets: false, coreStrengths: [] },
    skills: [{ id: '1', category: 'Programming Languages', items: [{ id: '1a', name: 'Python', level: 95, priority: 'Primary' }] }],
    experience: [{
      id: '1', title: 'Principal Cloud Architect', company: 'CloudScale Enterprises', location: 'New Delhi, India',
      employmentType: 'Full-time', startMonth: 'January', startYear: '2020', current: true,
      responsibilities: 'Oversee cloud strategy for the entire organization.', achievements: '', technologies: ''
    }],
    education: [{ id: '1', degreeType: 'Master of Science', degree: 'M.S. in Computer Science', field: 'Distributed Systems', school: 'Indian Institute of Technology', location: 'Delhi, India', startYear: '2012', endYear: '2014' }],
    projects: [], certifications: [], achievements: [], languages: [], interests: [], customSections: [], publications: []
  });

  const [sectionVisibility] = useState<Record<string, boolean>>({
    personal: true, summary: true, experience: true, skills: true, education: true,
    projects: true, certifications: true, achievements: true, languages: true, interests: true, publications: false
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
    // Offline simulation delay
    await new Promise(r => setTimeout(r, 1000));
    
    try {
      let refinedText = "";
      if (type === 'summary') {
        refinedText = `Dynamic ${data.personal.jobTitle || 'Professional'} with over ${data.experience.length > 0 ? '10' : '5'}+ years of experience in high-impact environments. Expert in driving operational efficiency, leading cross-functional teams, and implementing scalable solutions. Proven track record of strategic planning and technical excellence.`;
      } else {
        refinedText = `Spearheaded key technical initiatives resulting in a significant improvement in system performance. Collaborated with cross-functional teams to deliver robust solutions while ensuring alignment with organizational goals. Mentored junior staff and implemented best practices for development and deployment.`;
      }
      
      if (type === 'summary') {
        updateField('summary.content', refinedText);
      } else {
        const newExp = [...data.experience];
        newExp[index!] = { ...newExp[index!], responsibilities: refinedText };
        updateField('experience', newExp);
      }
      
      toast({ title: "Preset Applied", description: "Professional text preset loaded successfully." });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Error", description: "Could not apply preset." });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportPDF = async () => {
    const element = document.getElementById('resume-canvas-area');
    if (!element) return;
    setIsExporting(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).jsPDF;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, (canvas.height * 210) / canvas.width);
      pdf.save(`${data.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
      toast({ title: "Export Complete", description: "Your PDF has been saved." });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Export Failed", description: error.message });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center justify-between px-8 z-50 no-print">
        <Link href="/"><Logo size="sm" /></Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-slate-500 font-black uppercase text-[10px] tracking-widest">Resume Editor</Button>
          <div className="h-6 w-[1px] bg-slate-200 mx-2" />
          <Button 
            onClick={handleExportPDF} 
            disabled={isExporting}
            className="bg-[#EF593E] hover:bg-[#D44D35] text-white font-black uppercase text-[10px] tracking-widest gap-2 rounded-lg px-6 h-10 shadow-lg"
          >
            {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />} 
            Export PDF
          </Button>
        </div>
      </header>

      <div className="flex flex-1 pt-16 h-full overflow-hidden print:overflow-visible print:h-auto">
        <aside className="w-[500px] bg-white border-r flex flex-col h-full shrink-0 shadow-2xl relative z-10 no-print">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
            <TabsList className="grid grid-cols-2 h-14 bg-white border-b rounded-none p-0 shrink-0">
              <TabsTrigger value="design" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:text-[#EF593E] font-black text-[11px] uppercase tracking-widest gap-2 py-4">
                <Palette className="h-4 w-4" /> Design
              </TabsTrigger>
              <TabsTrigger value="content" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:text-[#EF593E] font-black text-[11px] uppercase tracking-widest gap-2 py-4">
                <FileText className="h-4 w-4" /> Content
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1 w-full bg-[#F8FAFC]">
              <div className="p-8 pb-32">
                <TabsContent value="design" className="m-0 space-y-12">
                  <section className="space-y-6">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Templates</Label>
                    <div className="grid grid-cols-2 gap-6">
                      {TEMPLATES.map(t => (
                        <div key={t.id} onClick={() => setSelectedTemplateId(t.id)} className={cn("aspect-[3/4] bg-white rounded-2xl border-2 cursor-pointer flex items-center justify-center", selectedTemplateId === t.id ? "border-[#EF593E]" : "border-slate-100")}>
                          <span className="text-[10px] font-bold uppercase text-slate-400">{t.name}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section className="space-y-4 pt-6 border-t">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Font Size</Label>
                    <Slider value={[fontSize]} min={9} max={16} onValueChange={([v]) => setFontSize(v)} />
                  </section>
                </TabsContent>

                <TabsContent value="content" className="m-0 space-y-6">
                  <Accordion type="multiple" defaultValue={['personal']} className="space-y-6">
                    <AccordionItem value="personal" className="bg-white border rounded-2xl px-4">
                      <AccordionTrigger className="text-xs font-black uppercase tracking-widest">Personal Details</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <Input placeholder="Full Name" value={data.personal.fullName} onChange={(e) => updateField('personal.fullName', e.target.value)} />
                        <Input placeholder="Job Title" value={data.personal.jobTitle} onChange={(e) => updateField('personal.jobTitle', e.target.value)} />
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
                            {isGenerating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />} Magic Preset
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
                                  <Sparkles className="h-3 w-3" /> Preset Magic
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

        <main className="flex-1 bg-[#F1F5F9] overflow-auto p-12 lg:p-20 flex flex-col items-center">
          <ResumeCanvas 
            templateId={selectedTemplateId} theme={selectedTheme} font={selectedFont} data={data} sections={sectionVisibility}
            style={{ fontSize, lineHeight, sectionSpacing }}
          />
        </main>
      </div>
    </div>
  );
}
