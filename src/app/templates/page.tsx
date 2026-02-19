
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Info, 
  Check, 
  Lock, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Trash2,
  Settings,
  Layout as LayoutIcon,
  Type,
  Palette
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";

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

const categories = ["All", "With photo", "Two column", "ATS", "DOCX", "Customized", "Free"];

const templates = [
  { id: "classic", name: "Classic", image: PlaceHolderImages.find(img => img.id === "template-classic")?.imageUrl || null, formats: ["PDF", "DOCX"] },
  { id: "traditional", name: "Traditional", image: PlaceHolderImages.find(img => img.id === "template-traditional")?.imageUrl || null, formats: ["PDF", "DOCX"] },
  { id: "professional", name: "Professional", image: PlaceHolderImages.find(img => img.id === "template-professional")?.imageUrl || null, formats: ["PDF", "DOCX"] },
  { id: "prime-ats", name: "Prime ATS", image: PlaceHolderImages.find(img => img.id === "template-ats")?.imageUrl || null, formats: ["PDF", "DOCX"] },
  { id: "pure-ats", name: "Pure ATS", image: PlaceHolderImages.find(img => img.id === "template-ats")?.imageUrl || null, formats: ["PDF"] },
  { id: "specialist", name: "Specialist", image: PlaceHolderImages.find(img => img.id === "template-professional")?.imageUrl || null, formats: ["PDF"] },
  { id: "clean", name: "Clean", image: PlaceHolderImages.find(img => img.id === "template-classic")?.imageUrl || null, formats: ["PDF"] },
  { id: "simple-ats", name: "Simple ATS", image: PlaceHolderImages.find(img => img.id === "template-ats")?.imageUrl || null, formats: ["PDF"] },
];

export default function ResumeBuilder() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState("traditional");
  const [resumeData, setResumeData] = useState({
    firstName: "ANKIT",
    lastName: "ZEPMEDS",
    jobTitle: "Software Engineer",
    email: "ankitop9887@gmail.com",
    phone: "852",
    location: "dfjhdfj, dfjfj, India",
    summary: "Led development of backend microservices using Java (Spring Boot) and Node.js; optimized APIs and reduced average response time by 35%. Built responsive front-end features with React and TypeScript, increasing user engagement by 22%.",
    experience: [
      {
        company: "Zepmeds Technologies",
        title: "Software Engineer",
        period: "Jan 2022 - Present",
        description: "Implemented CI/CD pipelines with GitHub Actions and Docker, cutting deployment time from hours to ~20 minutes. Migrated critical services to AWS (EC2, RDS, S3), improving reliability."
      }
    ]
  });

  const handleInputChange = (field: string, value: string) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    setResumeData(prev => {
      const newExperience = [...prev.experience];
      newExperience[index] = { ...newExperience[index], [field]: value };
      return { ...prev, experience: newExperience };
    });
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        { company: "", title: "", period: "", description: "" }
      ]
    }));
  };

  const removeExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* Top Navigation */}
      <header className="h-14 bg-white border-b flex items-center justify-between px-6 z-50 shrink-0">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="font-bold text-xs uppercase h-8 px-4 rounded-lg bg-slate-50">Edit</Button>
          <Button variant="outline" size="sm" className="font-bold text-xs uppercase h-8 px-4 rounded-lg">Customize</Button>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
            <Settings className="h-4 w-4" />
          </Button>
          <Button className="bg-[#EF593E] hover:bg-[#D44D35] text-white font-bold text-xs uppercase h-8 px-6 rounded-lg">Download</Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Control Panel */}
        <aside className="w-[600px] border-r bg-white flex flex-col overflow-hidden">
          <Tabs defaultValue="templates" className="flex flex-col h-full">
            <div className="px-6 border-b">
              <TabsList className="bg-transparent h-14 w-full flex justify-start gap-8 p-0">
                <TabsTrigger value="templates" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:text-[#EF593E] data-[state=active]:bg-transparent font-bold uppercase text-[10px] tracking-widest px-0">
                  <Palette className="h-4 w-4 mr-2" /> Template & Colors
                </TabsTrigger>
                <TabsTrigger value="text" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:text-[#EF593E] data-[state=active]:bg-transparent font-bold uppercase text-[10px] tracking-widest px-0">
                  <Type className="h-4 w-4 mr-2" /> Text
                </TabsTrigger>
                <TabsTrigger value="layout" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:text-[#EF593E] data-[state=active]:bg-transparent font-bold uppercase text-[10px] tracking-widest px-0">
                  <LayoutIcon className="h-4 w-4 mr-2" /> Layout
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-6">
                <TabsContent value="templates" className="mt-0 space-y-8">
                  {/* Color Selector */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Main color</span>
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-white cursor-pointer ring-2 ring-offset-2 ring-slate-900">
                        <Check className="h-3 w-3" />
                      </div>
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 cursor-not-allowed">
                          <Lock className="h-2 w-2" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Filters */}
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                          "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border",
                          activeCategory === cat
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Template Grid */}
                  <div className="grid grid-cols-4 gap-4">
                    {templates.map(template => (
                      <div key={template.id} className="space-y-2">
                        <div className="text-center">
                          <span className="text-[10px] font-bold text-slate-400">{template.name}</span>
                        </div>
                        <div 
                          onClick={() => setSelectedTemplate(template.id)}
                          className={cn(
                            "relative aspect-[3/4] bg-slate-50 rounded-lg overflow-hidden border-2 transition-all cursor-pointer group",
                            selectedTemplate === template.id ? "border-[#EF593E] ring-4 ring-[#EF593E]/10" : "border-slate-100 hover:border-slate-300"
                          )}
                        >
                          {template.image && (
                            <Image src={template.image} alt={template.name} fill className="object-cover" />
                          )}
                          {selectedTemplate === template.id && (
                            <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
                              <div className="w-8 h-8 rounded-full bg-[#EF593E] flex items-center justify-center text-white shadow-lg">
                                <Check className="h-4 w-4" />
                              </div>
                            </div>
                          )}
                          <div className="absolute bottom-1 right-1 flex gap-0.5">
                            {template.formats.map(f => (
                              <span key={f} className="text-[6px] font-black bg-[#EF593E] text-white px-0.5 rounded leading-none">{f}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="text" className="mt-0 space-y-8">
                  <section className="space-y-4">
                    <h3 className="text-sm font-black uppercase text-slate-900 tracking-tight">Personal Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">First Name</label>
                        <Input value={resumeData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} className="h-9 text-xs" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Last Name</label>
                        <Input value={resumeData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} className="h-9 text-xs" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Job Title</label>
                      <Input value={resumeData.jobTitle} onChange={(e) => handleInputChange('jobTitle', e.target.value)} className="h-9 text-xs" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Email</label>
                        <Input value={resumeData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="h-9 text-xs" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Phone</label>
                        <Input value={resumeData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="h-9 text-xs" />
                      </div>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-sm font-black uppercase text-slate-900 tracking-tight">Professional Summary</h3>
                    <Textarea 
                      value={resumeData.summary} 
                      onChange={(e) => handleInputChange('summary', e.target.value)} 
                      className="min-h-[120px] text-xs resize-none"
                    />
                  </section>

                  <section className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-black uppercase text-slate-900 tracking-tight">Employment History</h3>
                      <Button onClick={addExperience} variant="ghost" size="sm" className="text-[#EF593E] font-bold text-[10px] uppercase h-8 px-2">
                        <Plus className="h-3 w-3 mr-1" /> Add Job
                      </Button>
                    </div>
                    {resumeData.experience.map((exp, i) => (
                      <div key={i} className="p-4 border rounded-xl space-y-4 bg-slate-50/50 relative group">
                        <Button 
                          onClick={() => removeExperience(i)}
                          variant="ghost" 
                          size="icon" 
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </Button>
                        <div className="grid grid-cols-2 gap-4">
                          <Input 
                            placeholder="Job Title" 
                            value={exp.title} 
                            onChange={(e) => handleExperienceChange(i, 'title', e.target.value)}
                            className="h-8 text-xs" 
                          />
                          <Input 
                            placeholder="Employer" 
                            value={exp.company} 
                            onChange={(e) => handleExperienceChange(i, 'company', e.target.value)}
                            className="h-8 text-xs" 
                          />
                        </div>
                        <Input 
                          placeholder="Date Range" 
                          value={exp.period} 
                          onChange={(e) => handleExperienceChange(i, 'period', e.target.value)}
                          className="h-8 text-xs" 
                        />
                        <Textarea 
                          placeholder="Description" 
                          value={exp.description} 
                          onChange={(e) => handleExperienceChange(i, 'description', e.target.value)}
                          className="min-h-[80px] text-xs resize-none" 
                        />
                      </div>
                    ))}
                  </section>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </aside>

        {/* Right Preview Pane */}
        <main className="flex-1 bg-slate-200/50 flex flex-col relative overflow-hidden">
          <ScrollArea className="flex-1 p-12">
            <div className="max-w-[800px] mx-auto bg-white shadow-2xl min-h-[1100px] p-16 flex flex-col gap-12 text-slate-900">
              {/* Preview Header */}
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight uppercase">{resumeData.firstName} {resumeData.lastName}</h1>
                <p className="text-lg font-medium text-slate-500">{resumeData.jobTitle}</p>
                <div className="flex justify-center gap-4 text-xs font-medium text-slate-400">
                  <span>{resumeData.location}</span>
                  <span>{resumeData.email}</span>
                  <span>{resumeData.phone}</span>
                </div>
              </div>

              <div className="h-px bg-slate-200 w-full" />

              {/* Preview Employment */}
              <div className="space-y-8">
                <div className="text-center">
                  <span className="text-sm font-black uppercase tracking-[0.2em] border-b-2 border-slate-900 pb-1">Employment History</span>
                </div>
                
                <div className="space-y-8">
                  {resumeData.experience.map((exp, i) => (
                    <div key={i} className="space-y-4">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-slate-900">{exp.company}</h4>
                        <span className="text-xs font-medium text-slate-400">{exp.period}</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-600">{exp.title}</p>
                      <div className="flex gap-4">
                        <div className="shrink-0 mt-1">
                          <div className="w-2 h-2 rotate-45 border-2 border-slate-900" />
                        </div>
                        <p className="text-sm leading-relaxed text-slate-500 whitespace-pre-wrap">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview Summary */}
              {resumeData.summary && (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-sm font-black uppercase tracking-[0.2em] border-b-2 border-slate-900 pb-1">Profile</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-500 text-center max-w-2xl mx-auto">{resumeData.summary}</p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Page Controls Overlay */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full text-white shadow-2xl z-50 border border-white/10">
            <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:bg-white/10"><ChevronLeft className="h-4 w-4" /></Button>
            <span className="text-[10px] font-bold">1 / 1</span>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:bg-white/10"><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </main>
      </div>
    </div>
  );
}
