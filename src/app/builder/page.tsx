
"use client";

import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Save, 
  Palette, 
  Type as TypeIcon, 
  Layout, 
  Settings, 
  User, 
  Plus, 
  Trash2, 
  Check, 
  Sparkles,
  Loader2,
  ChevronDown,
  Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { ResumeCanvas } from '@/components/resume/resume-canvas';
import { generateResumeContent } from '@/ai/flows/generate-resume-content';
import { useToast } from '@/hooks/use-toast';

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
  { id: 'classic', name: 'Classic Single Column', category: 'Standard' },
  { id: 'modern', name: 'Modern Professional', category: 'Standard' },
  { id: 'executive', name: 'Executive Clean', category: 'Executive' },
  { id: 'ats-minimal', name: 'ATS Prime Minimal', category: 'ATS' },
  { id: 'two-column', name: 'Two Column Sidebar', category: 'Standard' },
  { id: 'compact', name: 'Compact Dense', category: 'Compact' },
  { id: 'academic', name: 'Academic CV', category: 'Academic' },
  { id: 'tech', name: 'Tech Developer Style', category: 'Tech' },
  { id: 'management', name: 'Management Resume', category: 'Executive' },
  { id: 'creative', name: 'Creative Minimal', category: 'Creative' },
  { id: 'bold-header', name: 'Bold Header Layout', category: 'Modern' },
  { id: 'elegant-serif', name: 'Elegant Serif', category: 'Elegant' },
  { id: 'structured-timeline', name: 'Structured Timeline', category: 'Modern' },
  { id: 'corporate-formal', name: 'Corporate Formal', category: 'Executive' },
  { id: 'soft-gray', name: 'Soft Gray Layout', category: 'Modern' },
  { id: 'blue-accent', name: 'Blue Accent Left Border', category: 'Elegant' },
  { id: 'monochrome', name: 'Monochrome Minimal', category: 'ATS' },
  { id: 'fresher', name: 'Compact Fresher', category: 'Compact' },
  { id: 'senior', name: 'Senior Professional', category: 'Executive' },
  { id: 'hybrid', name: 'Hybrid Modern Clean', category: 'Modern' },
];

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [fontSize, setFontSize] = useState(14);
  const [sectionSpacing, setSectionSpacing] = useState(24);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();
  
  const [sections, setSections] = useState({
    personal: true,
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
      location: { city: 'New York', country: 'USA' },
      linkedin: 'linkedin.com/in/johndoe',
      website: 'johndoe.dev'
    },
    summary: { content: 'Strategic and results-driven Senior Software Architect with 10+ years of experience in designing and implementing scalable cloud architectures. Expert in full-stack development, distributed systems, and leading cross-functional teams to deliver high-impact technical solutions.' },
    skills: [
      { id: '1', category: 'Programming Languages', items: [{ id: '1a', name: 'TypeScript', level: 90 }] }
    ],
    experience: [
      {
        id: '1',
        title: 'Senior Software Architect',
        company: 'TechGlobal Solutions',
        location: 'New York, NY',
        startMonth: 'Jan',
        startYear: '2020',
        current: true,
        responsibilities: 'Led the migration of a legacy monolithic architecture to a microservices-based system, resulting in a 40% improvement in scalability and deployment speed.',
        achievements: 'Architected and implemented a real-time data processing pipeline using Kafka and Spark.'
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Master of Science in Computer Science',
        school: 'Stanford University',
        location: 'Stanford, CA',
        startYear: '2014',
        endYear: '2016'
      }
    ],
    projects: [],
    certifications: [],
    achievements: [],
    languages: [],
    interests: []
  });

  const handlePersonalUpdate = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const handleAiGenerate = async (type: 'summary' | 'experience', index?: number) => {
    setIsGenerating(true);
    try {
      const keywords = type === 'summary' ? data.personal.jobTitle : data.experience[index!].responsibilities;
      const res = await generateResumeContent({
        type,
        jobTitle: data.personal.jobTitle,
        keywords: keywords || 'Professional growth, technical leadership'
      });
      
      if (type === 'summary') {
        setData(prev => ({ ...prev, summary: { content: res.generatedText } }));
      } else {
        const newExp = [...data.experience];
        newExp[index!] = { ...newExp[index!], responsibilities: res.generatedText };
        setData(prev => ({ ...prev, experience: newExp }));
      }
      
      toast({
        title: "AI Generation Successful",
        description: "Content has been updated with professional refinements.",
      });
    } catch (e: any) {
      toast({ variant: "destructive", title: "AI Magic Failed", description: e.message });
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

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${data.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
      
      toast({ title: "Download Complete", description: "Your resume has been saved as a high-fidelity PDF." });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Download Failed", description: error.message });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center justify-between px-8 z-50 no-print">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#EF593E] rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-100">B</div>
          <h1 className="text-lg font-black text-slate-900 tracking-tight">Network Bulls <span className="text-[#EF593E]">Pro</span></h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-slate-500 font-bold hover:text-[#EF593E]">Editor</Button>
          <Button variant="ghost" className="text-slate-500 font-bold">Settings</Button>
          <div className="h-6 w-[1px] bg-slate-200 mx-2" />
          <Button 
            onClick={handleExportPDF} 
            disabled={isExporting}
            className="bg-[#EF593E] hover:bg-[#D44D35] text-white font-bold gap-2 shadow-lg shadow-orange-100 rounded-lg px-6"
          >
            {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />} 
            {isExporting ? 'Generating...' : 'Download PDF'}
          </Button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 pt-16 h-full print:overflow-visible print:h-auto">
        {/* Left Panel */}
        <aside className="w-[500px] bg-white border-r flex flex-col relative z-20 no-print">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-2 h-14 bg-white border-b rounded-none p-0 sticky top-0 z-10">
              <TabsTrigger value="templates" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:text-[#EF593E] data-[state=active]:bg-transparent font-black text-[10px] uppercase tracking-widest">
                <Layout className="h-4 w-4 mr-2" /> Templates & Colors
              </TabsTrigger>
              <TabsTrigger value="content" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:text-[#EF593E] data-[state=active]:bg-transparent font-black text-[10px] uppercase tracking-widest">
                <TypeIcon className="h-4 w-4 mr-2" /> Text Content
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1">
              <div className="p-8">
                {/* Templates Tab */}
                <TabsContent value="templates" className="mt-0 space-y-10">
                  <section className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Select Template</h3>
                      <span className="text-[10px] font-bold text-slate-300">20 Styles Available</span>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      {TEMPLATES.map(template => (
                        <div key={template.id} className="group cursor-pointer space-y-3" onClick={() => setSelectedTemplate(template.id)}>
                          <div className={cn(
                            "relative aspect-[3/4] bg-slate-50 rounded-2xl border-2 transition-all duration-300 overflow-hidden flex items-center justify-center",
                            selectedTemplate === template.id 
                              ? "border-[#EF593E] ring-4 ring-orange-50 shadow-xl" 
                              : "border-slate-100 hover:border-slate-300 shadow-sm"
                          )}>
                            {selectedTemplate === template.id && (
                              <div className="absolute inset-0 bg-white/40 flex items-center justify-center animate-in zoom-in-50 duration-300">
                                <div className="w-10 h-10 rounded-full bg-[#EF593E] flex items-center justify-center text-white shadow-xl">
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
                </TabsContent>

                {/* Content Tab */}
                <TabsContent value="content" className="mt-0 space-y-12">
                  <section className="space-y-6">
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-[#EF593E]" />
                      <h3 className="text-xs font-black uppercase text-slate-900 tracking-widest">Personal Details</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-400">Full Name</Label>
                        <Input value={data.personal.fullName} onChange={(e) => handlePersonalUpdate('fullName', e.target.value)} className="rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-400">Job Title</Label>
                        <Input value={data.personal.jobTitle} onChange={(e) => handlePersonalUpdate('jobTitle', e.target.value)} className="rounded-xl" />
                      </div>
                    </div>
                  </section>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </aside>

        {/* Center Pane */}
        <main className="flex-1 bg-slate-100 overflow-auto p-16 flex flex-col items-center print:bg-white print:p-0 print:overflow-visible">
          <div className="relative group mb-12 print:m-0 print:shadow-none print:transform-none">
            <ResumeCanvas 
              templateId={selectedTemplate}
              theme={selectedTheme}
              font={selectedFont}
              data={data as any}
              sections={sections}
              style={{
                lineHeight,
                fontSize,
                sectionSpacing
              }}
            />
            {/* Overlay controls for drag/drop feel */}
            <div className="absolute -right-20 top-0 space-y-4 opacity-0 group-hover:opacity-100 transition-opacity no-print">
              <Button size="icon" variant="secondary" className="rounded-full shadow-lg"><Maximize2 className="h-4 w-4" /></Button>
              <Button size="icon" variant="secondary" className="rounded-full shadow-lg"><Settings className="h-4 w-4" /></Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
