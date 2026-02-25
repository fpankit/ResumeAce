"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Download, 
  Sparkles, 
  Loader2, 
  FileText, 
  ArrowLeft,
  Briefcase,
  User,
  Layout,
  Type as TypeIcon,
  Palette,
  Check,
  Building2,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { generateCoverLetter } from '@/ai/flows/generate-cover-letter';
import { cn } from '@/lib/utils';

const TEMPLATES = [
  { id: 'modern', name: 'Modern Impact', color: '#EF593E' },
  { id: 'classic', name: 'Classic Formal', color: '#1E3A8A' },
  { id: 'minimal', name: 'Minimalist Tech', color: '#0F172A' },
];

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-10 h-10 rounded-xl bg-[#EF593E] flex items-center justify-center text-white overflow-hidden shadow-lg shadow-[#EF593E]/20">
      <Send className="w-6 h-6" />
    </div>
    <div className="flex flex-col -space-y-1">
      <div className="flex items-center gap-1">
        <span className="text-[#EF593E] font-black text-xl tracking-tighter uppercase">Network</span>
        <span className="text-[#334155] font-black text-xl tracking-tighter uppercase">Bulls</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="h-[1px] flex-1 bg-slate-200" />
        <span className="text-[7px] text-[#EF593E] font-black tracking-[0.2em] uppercase whitespace-nowrap">Cover Letter Pro</span>
      </div>
    </div>
  </div>
);

export default function CoverLetterPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [data, setData] = useState({
    fullName: 'Johnathan Doe',
    email: 'j.doe@example.com',
    phone: '+1 (555) 000-1111',
    address: 'Seattle, WA',
    jobTitle: 'Senior Software Engineer',
    companyName: 'TechGlobal Innovations',
    recipientName: 'Hiring Manager',
    skills: '10 years of React experience, led teams of 15, improved system uptime by 40%',
    content: `Dear Hiring Manager,

I am writing to express my strong interest in the Senior Software Engineer position at TechGlobal Innovations. With over a decade of experience in building scalable web applications and leading cross-functional teams, I am confident that I can contribute significantly to your engineering department.

At my previous role, I spearheaded the migration of our core platform to a modern microservices architecture, which resulted in a 40% improvement in system uptime and a 25% reduction in deployment cycles. My expertise in React, Node.js, and cloud infrastructure aligns perfectly with the requirements of this role.

I am particularly drawn to TechGlobal Innovations because of your commitment to pushing the boundaries of AI-driven developer tools. I look forward to the possibility of discussing how my background and skills can help drive your mission forward.

Thank you for your time and consideration.

Best regards,

Johnathan Doe`
  });

  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await generateCoverLetter({
        fullName: data.fullName,
        jobTitle: data.jobTitle,
        companyName: data.companyName,
        skills: data.skills,
        tone: 'professional'
      });
      setData(prev => ({ ...prev, content: res.content }));
      toast({ title: "Letter Generated", description: "AI has crafted a tailored cover letter for you." });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Generation Failed", description: e.message });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = async () => {
    const html2canvas = (await import('html2canvas')).default;
    const jsPDF = (await import('jspdf')).jsPDF;
    const element = document.getElementById('letter-canvas');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save(`Cover_Letter_${data.companyName.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      toast({ variant: "destructive", title: "Export Failed" });
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center justify-between px-8 z-50">
        <Link href="/"><Logo /></Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild className="text-slate-500 font-black uppercase text-[10px] tracking-widest hover:text-[#EF593E]">
            <Link href="/templates"><ArrowLeft className="h-3 w-3 mr-2" /> Back to Resumes</Link>
          </Button>
          <div className="h-6 w-[1px] bg-slate-200 mx-2" />
          <Button 
            onClick={handleExport}
            className="bg-[#EF593E] hover:bg-[#D44D35] text-white font-black uppercase text-[10px] tracking-widest gap-2 rounded-lg px-6 h-10 shadow-lg"
          >
            <Download className="h-4 w-4" /> Export PDF
          </Button>
        </div>
      </header>

      <div className="flex flex-1 pt-16 h-full overflow-hidden">
        {/* Editor */}
        <aside className="w-[450px] bg-white border-r flex flex-col h-full shrink-0 shadow-2xl relative z-10">
          <Tabs defaultValue="content" className="flex flex-col h-full">
            <TabsList className="grid grid-cols-2 h-14 bg-white border-b rounded-none p-0">
              <TabsTrigger value="content" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:text-[#EF593E] font-black text-[11px] uppercase tracking-widest gap-2 py-4">
                <FileText className="h-4 w-4" /> Letter Info
              </TabsTrigger>
              <TabsTrigger value="design" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:text-[#EF593E] font-black text-[11px] uppercase tracking-widest gap-2 py-4">
                <Layout className="h-4 w-4" /> Style
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1 bg-[#F8FAFC]">
              <div className="p-8 space-y-8 pb-20">
                <TabsContent value="content" className="m-0 space-y-8">
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <User className="h-4 w-4 text-[#EF593E]" />
                      <h3 className="text-[10px] font-black uppercase text-slate-900 tracking-widest">Personal & Contact</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black text-slate-400 uppercase">Full Name</Label>
                        <Input value={data.fullName} onChange={e => setData({...data, fullName: e.target.value})} className="rounded-xl h-10 bg-white" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black text-slate-400 uppercase">Email</Label>
                        <Input value={data.email} onChange={e => setData({...data, email: e.target.value})} className="rounded-xl h-10 bg-white" />
                      </div>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Building2 className="h-4 w-4 text-[#EF593E]" />
                      <h3 className="text-[10px] font-black uppercase text-slate-900 tracking-widest">Application Details</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black text-slate-400 uppercase">Target Job Title</Label>
                        <Input value={data.jobTitle} onChange={e => setData({...data, jobTitle: e.target.value})} className="rounded-xl h-10 bg-white" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black text-slate-400 uppercase">Company Name</Label>
                        <Input value={data.companyName} onChange={e => setData({...data, companyName: e.target.value})} className="rounded-xl h-10 bg-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[9px] font-black text-slate-400 uppercase">Key Strengths to Highlight</Label>
                      <Textarea value={data.skills} onChange={e => setData({...data, skills: e.target.value})} className="rounded-xl bg-white text-xs h-20" placeholder="List your top 3 achievements..." />
                    </div>
                    <Button 
                      onClick={handleGenerate} 
                      disabled={isGenerating}
                      className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase text-[10px] tracking-widest gap-2 rounded-xl"
                    >
                      {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-[#EF593E]" />}
                      Magic AI Generate
                    </Button>
                  </section>

                  <section className="space-y-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <Label className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Letter Body</Label>
                      <span className="text-[9px] font-bold text-slate-400">{data.content.length} characters</span>
                    </div>
                    <Textarea 
                      value={data.content} 
                      onChange={e => setData({...data, content: e.target.value})} 
                      className="min-h-[400px] rounded-2xl text-sm leading-relaxed bg-white shadow-inner"
                    />
                  </section>
                </TabsContent>

                <TabsContent value="design" className="m-0 space-y-8">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Select Template</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {TEMPLATES.map(template => (
                      <div 
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={cn(
                          "p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between",
                          selectedTemplate === template.id ? "border-[#EF593E] bg-white shadow-xl ring-4 ring-orange-50" : "bg-slate-50 border-transparent hover:border-slate-200"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: template.color }}>
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-black text-xs uppercase tracking-tight text-slate-900">{template.name}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Professional Standard</p>
                          </div>
                        </div>
                        {selectedTemplate === template.id && <Check className="h-5 w-5 text-[#EF593E]" />}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </aside>

        {/* Preview */}
        <main className="flex-1 bg-[#F1F5F9] overflow-auto p-12 lg:p-20 flex flex-col items-center">
          <div 
            id="letter-canvas"
            className="w-[210mm] min-h-[297mm] bg-white shadow-2xl p-[25mm] relative overflow-hidden"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            {/* Template Rendering */}
            <div className="space-y-10">
              <div className={cn(
                "flex justify-between items-start pb-10 border-b",
                selectedTemplate === 'modern' ? "border-[#EF593E]" : "border-slate-200"
              )}>
                <div>
                  <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900">{data.fullName}</h1>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{data.jobTitle}</p>
                </div>
                <div className="text-right text-[10px] font-bold text-slate-400 uppercase space-y-1">
                  <p>{data.email}</p>
                  <p>{data.phone}</p>
                  <p>{data.address}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-900">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <div className="pt-6 space-y-1">
                  <p className="text-sm font-bold text-slate-900">{data.recipientName}</p>
                  <p className="text-sm text-slate-500">{data.companyName}</p>
                </div>
              </div>

              <div className="text-[13.5px] leading-[1.7] text-slate-700 whitespace-pre-wrap">
                {data.content}
              </div>

              <div className="pt-10">
                <p className="text-sm text-slate-500">Sincerely,</p>
                <p className="text-lg font-black text-slate-900 pt-2">{data.fullName}</p>
              </div>
            </div>

            {/* Template Specific Decors */}
            {selectedTemplate === 'modern' && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EF593E] -mr-16 -mt-16 rotate-45 opacity-10" />
            )}
            {selectedTemplate === 'minimal' && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-900" />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
