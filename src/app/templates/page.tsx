"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Download, 
  Loader2,
  FileText,
  Palette,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { ResumeCanvas } from '@/components/resume/resume-canvas';
import { ResumeData } from '@/types/resume';
import { Logo } from '@/app/page';

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
  const { toast } = useToast();
  
  const [data, setData] = useState<ResumeData>({
    personal: {
      fullName: 'Ankit',
      jobTitle: 'Principal Cloud Architect',
      email: 'ankit@example.com',
      phone: '+1 (555) 789-0123',
      location: { city: 'New Delhi', country: 'India' },
      linkedin: 'linkedin.com/in/ankit',
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
