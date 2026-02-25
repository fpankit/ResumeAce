"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Download, 
  FileText, 
  ArrowLeft,
  User,
  Layout,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Logo = () => (
  <div className="flex flex-col -space-y-1 group">
    <div className="flex items-center gap-1">
      <span className="text-[#EF593E] font-black text-xl tracking-tighter uppercase">Network</span>
      <span className="text-[#334155] font-black text-xl tracking-tighter uppercase">Bulls</span>
    </div>
    <div className="flex items-center gap-1">
      <div className="h-[1px] flex-1 bg-slate-200" />
      <span className="text-[7px] text-[#EF593E] font-bold tracking-[0.2em] uppercase whitespace-nowrap">Where Careers Fly</span>
    </div>
  </div>
);

export default function CoverLetterPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [data, setData] = useState({
    fullName: 'Ankit',
    email: 'ankit@example.com',
    phone: '+1 (555) 000-1111',
    address: 'New Delhi, India',
    jobTitle: 'Senior Software Engineer',
    companyName: 'TechGlobal Innovations',
    recipientName: 'Hiring Manager',
    skills: '',
    content: `Dear Hiring Manager,\n\nI am writing to express my interest in the role at your company...`
  });

  const { toast } = useToast();

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

  const TEMPLATES = [
    { id: 'modern', name: 'Modern Impact', color: '#EF593E' },
    { id: 'classic', name: 'Classic Formal', color: '#1E3A8A' },
    { id: 'minimal', name: 'Minimalist Tech', color: '#0F172A' },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center justify-between px-8 z-50 no-print">
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
        <aside className="w-[450px] bg-white border-r flex flex-col h-full shrink-0 shadow-2xl relative z-10 no-print">
          <Tabs defaultValue="content" className="flex flex-col h-full">
            <TabsList className="grid grid-cols-2 h-14 bg-white border-b rounded-none p-0">
              <TabsTrigger value="content" className="rounded-none font-black text-[11px] uppercase tracking-widest gap-2 py-4">
                <FileText className="h-4 w-4" /> Content
              </TabsTrigger>
              <TabsTrigger value="design" className="rounded-none font-black text-[11px] uppercase tracking-widest gap-2 py-4">
                <Layout className="h-4 w-4" /> Style
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1 bg-[#F8FAFC]">
              <div className="p-8 space-y-8 pb-20">
                <TabsContent value="content" className="m-0 space-y-8">
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <User className="h-4 w-4 text-[#EF593E]" />
                      <h3 className="text-[10px] font-black uppercase text-slate-900 tracking-widest">Personal Info</h3>
                    </div>
                    <Input value={data.fullName} onChange={e => setData({...data, fullName: e.target.value})} placeholder="Full Name" />
                    <Input value={data.email} onChange={e => setData({...data, email: e.target.value})} placeholder="Email" />
                  </section>

                  <section className="space-y-4 pt-4 border-t">
                    <Label className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Letter Body</Label>
                    <Textarea 
                      value={data.content} 
                      onChange={e => setData({...data, content: e.target.value})} 
                      className="min-h-[400px] rounded-2xl text-sm bg-white"
                    />
                  </section>
                </TabsContent>

                <TabsContent value="design" className="m-0 space-y-8">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Templates</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {TEMPLATES.map(t => (
                      <div key={t.id} onClick={() => setSelectedTemplate(t.id)} className={cn("p-6 rounded-2xl border-2 cursor-pointer flex items-center justify-between", selectedTemplate === t.id ? "border-[#EF593E] bg-white shadow-xl" : "bg-slate-50 border-transparent")}>
                        <span className="font-black text-xs uppercase text-slate-900">{t.name}</span>
                        {selectedTemplate === t.id && <Check className="h-5 w-5 text-[#EF593E]" />}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </aside>

        <main className="flex-1 bg-[#F1F5F9] overflow-auto p-12 lg:p-20 flex flex-col items-center">
          <div id="letter-canvas" className="w-[210mm] min-h-[297mm] bg-white shadow-2xl p-[25mm] relative overflow-hidden" style={{ fontFamily: '"Inter", sans-serif' }}>
            <div className="space-y-10">
              <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900">{data.fullName}</h1>
              <div className="text-[13.5px] leading-[1.7] text-slate-700 whitespace-pre-wrap">{data.content}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
