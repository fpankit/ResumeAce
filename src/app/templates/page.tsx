
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Check, 
  Lock, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Trash2,
  Settings,
  Layout as LayoutIcon,
  Type,
  Palette,
  Briefcase,
  User,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";

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

// --- Template Components ---

const ClassicTemplate = ({ data }: { data: any }) => (
  <div className="flex flex-col gap-10 font-serif text-slate-900">
    <div className="text-center space-y-2 border-b-2 border-slate-900 pb-6">
      <h1 className="text-4xl font-bold uppercase tracking-widest">{data.firstName} {data.lastName}</h1>
      <p className="text-xl italic text-slate-600">{data.jobTitle}</p>
      <div className="flex justify-center gap-6 text-xs uppercase tracking-tighter font-medium">
        <span>{data.location}</span>
        <span>{data.email}</span>
        <span>{data.phone}</span>
      </div>
    </div>
    <div className="space-y-6">
      <h2 className="text-sm font-black uppercase tracking-[0.3em] border-b border-slate-200 pb-1">Professional Profile</h2>
      <p className="text-sm leading-relaxed text-slate-700">{data.summary}</p>
    </div>
    <div className="space-y-8">
      <h2 className="text-sm font-black uppercase tracking-[0.3em] border-b border-slate-200 pb-1">Experience</h2>
      {data.experience.map((exp: any, i: number) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between font-bold">
            <h3>{exp.title} | {exp.company}</h3>
            <span className="text-xs">{exp.period}</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">{exp.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const ProfessionalTemplate = ({ data }: { data: any }) => (
  <div className="flex flex-col gap-8 font-sans text-slate-800">
    <div className="bg-slate-900 text-white p-10 -m-16 mb-8">
      <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">{data.firstName} <span className="text-[#EF593E]">{data.lastName}</span></h1>
      <p className="text-xl font-bold text-slate-400 uppercase tracking-widest">{data.jobTitle}</p>
      <div className="flex flex-wrap gap-x-8 gap-y-2 mt-6 text-sm text-slate-300">
        <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#EF593E]" /> {data.email}</div>
        <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#EF593E]" /> {data.phone}</div>
        <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#EF593E]" /> {data.location}</div>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-12">
      <div className="col-span-1 space-y-8">
        <section className="space-y-4">
          <h2 className="text-xs font-black uppercase tracking-widest text-[#EF593E]">About Me</h2>
          <p className="text-sm leading-relaxed text-slate-600">{data.summary}</p>
        </section>
      </div>
      <div className="col-span-2 space-y-10">
        <section className="space-y-6">
          <h2 className="text-xs font-black uppercase tracking-widest text-[#EF593E] border-b border-slate-100 pb-2">Experience</h2>
          {data.experience.map((exp: any, i: number) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-baseline">
                <h3 className="font-black text-slate-900">{exp.title}</h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{exp.period}</span>
              </div>
              <p className="text-xs font-bold text-[#EF593E] uppercase">{exp.company}</p>
              <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">{exp.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  </div>
);

const AtsTemplate = ({ data }: { data: any }) => (
  <div className="flex flex-col gap-6 font-mono text-xs text-black leading-tight">
    <div className="text-center space-y-1">
      <h1 className="text-xl font-bold uppercase">{data.firstName} {data.lastName}</h1>
      <p>{data.location} | {data.phone} | {data.email}</p>
    </div>
    <div className="space-y-2">
      <h2 className="font-bold border-b border-black uppercase">Professional Summary</h2>
      <p>{data.summary}</p>
    </div>
    <div className="space-y-4">
      <h2 className="font-bold border-b border-black uppercase">Experience</h2>
      {data.experience.map((exp: any, i: number) => (
        <div key={i} className="space-y-1">
          <div className="flex justify-between font-bold">
            <span>{exp.company}</span>
            <span>{exp.period}</span>
          </div>
          <p className="italic">{exp.title}</p>
          <p className="whitespace-pre-wrap pl-4">• {exp.description.replace(/\n/g, '\n• ')}</p>
        </div>
      ))}
    </div>
  </div>
);

const TwoColumnTemplate = ({ data }: { data: any }) => (
  <div className="flex min-h-[1000px] font-sans -m-16">
    <div className="w-1/3 bg-slate-100 p-12 flex flex-col gap-10">
      <div className="space-y-2">
        <div className="w-20 h-20 rounded-2xl bg-[#EF593E] flex items-center justify-center text-white mb-6">
           <BullIcon className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 leading-none">{data.firstName}<br/>{data.lastName}</h1>
        <p className="text-sm font-bold text-[#EF593E] uppercase tracking-widest">{data.jobTitle}</p>
      </div>
      <div className="space-y-6">
        <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Contact</h2>
        <div className="space-y-3 text-xs text-slate-600">
          <p>{data.email}</p>
          <p>{data.phone}</p>
          <p>{data.location}</p>
        </div>
      </div>
    </div>
    <div className="flex-1 p-12 space-y-12 bg-white">
      <section className="space-y-4">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b-2 border-[#EF593E] inline-block pb-1">Profile</h2>
        <p className="text-sm leading-relaxed text-slate-600">{data.summary}</p>
      </section>
      <section className="space-y-8">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b-2 border-[#EF593E] inline-block pb-1">Work History</h2>
        {data.experience.map((exp: any, i: number) => (
          <div key={i} className="space-y-2 relative pl-6 border-l-2 border-slate-100">
            <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-[#EF593E]" />
            <div className="flex justify-between items-baseline">
              <h3 className="font-black text-slate-900">{exp.title}</h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase">{exp.period}</span>
            </div>
            <p className="text-xs font-bold text-slate-500">{exp.company}</p>
            <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">{exp.description}</p>
          </div>
        ))}
      </section>
    </div>
  </div>
);

// --- Main Page Component ---

const categories = ["All", "Two column", "ATS", "Professional"];

const templates = [
  { id: "classic", name: "Classic", category: "All", description: "Standard single column" },
  { id: "professional", name: "Professional", category: "Professional", description: "Modern dark header" },
  { id: "ats", name: "ATS Prime", category: "ATS", description: "Minimalist bot-friendly" },
  { id: "twocolumn", name: "Two Column", category: "Two column", description: "Creative sidebar layout" },
];

export default function ResumeBuilder() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [resumeData, setResumeData] = useState({
    firstName: "ANKIT",
    lastName: "ZEPMEDS",
    jobTitle: "Software Engineer",
    email: "ankitop9887@gmail.com",
    phone: "+91 852-555-0123",
    location: "Jaipur, India",
    summary: "Led development of backend microservices using Java (Spring Boot) and Node.js; optimized APIs and reduced average response time by 35%. Built responsive front-end features with React and TypeScript, increasing user engagement by 22%.",
    experience: [
      {
        company: "Zepmeds Technologies",
        title: "Software Engineer",
        period: "Jan 2022 - Present",
        description: "Implemented CI/CD pipelines with GitHub Actions and Docker, cutting deployment time from hours to ~20 minutes. Migrated critical services to AWS (EC2, RDS, S3), improving reliability by 99%."
      },
      {
        company: "Network Bulls AI",
        title: "Junior Developer",
        period: "June 2020 - Dec 2021",
        description: "Assisted in the development of AI-driven resume parsing tools. Optimized SQL queries resulting in a 15% speed increase for database operations."
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

  const renderSelectedTemplate = () => {
    switch (selectedTemplate) {
      case "professional": return <ProfessionalTemplate data={resumeData} />;
      case "ats": return <AtsTemplate data={resumeData} />;
      case "twocolumn": return <TwoColumnTemplate data={resumeData} />;
      default: return <ClassicTemplate data={resumeData} />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      <header className="h-14 bg-white border-b flex items-center justify-between px-6 z-50 shrink-0">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="font-bold text-xs uppercase h-8 px-4 text-[#EF593E]">Editor</Button>
          <Button variant="ghost" size="sm" className="font-bold text-xs uppercase h-8 px-4 text-slate-400">Settings</Button>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-[#EF593E]">
            <Settings className="h-4 w-4" />
          </Button>
          <Button className="bg-[#EF593E] hover:bg-[#D44D35] text-white font-bold text-xs uppercase h-8 px-6 rounded-lg shadow-lg shadow-[#EF593E]/20">Download PDF</Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-[500px] border-r bg-white flex flex-col overflow-hidden">
          <Tabs defaultValue="text" className="flex flex-col h-full">
            <div className="px-6 border-b">
              <TabsList className="bg-transparent h-14 w-full flex justify-start gap-8 p-0">
                <TabsTrigger value="text" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:text-[#EF593E] data-[state=active]:bg-transparent font-black uppercase text-[10px] tracking-widest px-0">
                  <Type className="h-4 w-4 mr-2" /> Content
                </TabsTrigger>
                <TabsTrigger value="templates" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:text-[#EF593E] data-[state=active]:bg-transparent font-black uppercase text-[10px] tracking-widest px-0">
                  <Palette className="h-4 w-4 mr-2" /> Design
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-8">
                <TabsContent value="templates" className="mt-0 space-y-8">
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                          "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border",
                          activeCategory === cat
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-500 border-slate-200 hover:border-[#EF593E]/40"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {templates.filter(t => activeCategory === "All" || t.category === activeCategory).map(template => (
                      <div key={template.id} className="space-y-3">
                        <div 
                          onClick={() => setSelectedTemplate(template.id)}
                          className={cn(
                            "relative aspect-[3/4] bg-slate-50 rounded-xl overflow-hidden border-2 transition-all cursor-pointer group hover:shadow-xl",
                            selectedTemplate === template.id ? "border-[#EF593E] ring-4 ring-[#EF593E]/10" : "border-slate-100 hover:border-slate-200"
                          )}
                        >
                          <div className="absolute inset-4 space-y-2 opacity-40">
                            {template.id === 'twocolumn' ? (
                               <div className="flex h-full gap-2">
                                 <div className="w-1/3 bg-slate-300 rounded" />
                                 <div className="flex-1 space-y-2">
                                   <div className="h-3 w-3/4 bg-slate-300 rounded" />
                                   <div className="h-10 w-full bg-slate-200 rounded" />
                                 </div>
                               </div>
                            ) : template.id === 'professional' ? (
                               <div className="h-full space-y-2">
                                 <div className="h-1/4 bg-slate-800 rounded-t" />
                                 <div className="h-4 w-full bg-slate-200 rounded" />
                                 <div className="h-10 w-full bg-slate-100 rounded" />
                               </div>
                            ) : (
                               <div className="h-full space-y-2 text-center">
                                 <div className="h-4 w-1/2 bg-slate-300 rounded mx-auto" />
                                 <div className="h-10 w-full bg-slate-100 rounded" />
                               </div>
                            )}
                          </div>
                          {selectedTemplate === template.id && (
                            <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
                              <div className="w-10 h-10 rounded-full bg-[#EF593E] flex items-center justify-center text-white shadow-xl animate-in zoom-in-50">
                                <Check className="h-5 w-5" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-black uppercase text-slate-800">{template.name}</p>
                          <p className="text-[10px] font-medium text-slate-400">{template.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="text" className="mt-0 space-y-10">
                  <section className="space-y-6">
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-[#EF593E]" />
                      <h3 className="text-xs font-black uppercase text-slate-900 tracking-widest">Personal Details</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">First Name</label>
                        <Input value={resumeData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} className="h-10 text-xs border-slate-100 focus:ring-[#EF593E]" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Last Name</label>
                        <Input value={resumeData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} className="h-10 text-xs border-slate-100 focus:ring-[#EF593E]" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Job Title</label>
                      <Input value={resumeData.jobTitle} onChange={(e) => handleInputChange('jobTitle', e.target.value)} className="h-10 text-xs border-slate-100 focus:ring-[#EF593E]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Email</label>
                        <Input value={resumeData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="h-10 text-xs border-slate-100 focus:ring-[#EF593E]" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Phone</label>
                        <Input value={resumeData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="h-10 text-xs border-slate-100 focus:ring-[#EF593E]" />
                      </div>
                    </div>
                  </section>

                  <section className="space-y-6">
                    <div className="flex items-center gap-3">
                      <LayoutIcon className="h-4 w-4 text-[#EF593E]" />
                      <h3 className="text-xs font-black uppercase text-slate-900 tracking-widest">Professional Summary</h3>
                    </div>
                    <Textarea 
                      value={resumeData.summary} 
                      onChange={(e) => handleInputChange('summary', e.target.value)} 
                      className="min-h-[140px] text-xs border-slate-100 focus:ring-[#EF593E] leading-relaxed"
                    />
                  </section>

                  <section className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Briefcase className="h-4 w-4 text-[#EF593E]" />
                        <h3 className="text-xs font-black uppercase text-slate-900 tracking-widest">Experience</h3>
                      </div>
                      <Button onClick={addExperience} variant="ghost" size="sm" className="text-[#EF593E] font-black text-[10px] uppercase h-8 hover:bg-[#EF593E]/5">
                        <Plus className="h-3 w-3 mr-1" /> Add Entry
                      </Button>
                    </div>
                    <div className="space-y-6">
                      {resumeData.experience.map((exp, i) => (
                        <div key={i} className="p-6 border border-slate-100 rounded-2xl space-y-4 bg-slate-50/30 relative group hover:border-[#EF593E]/20 transition-all">
                          <Button 
                            onClick={() => removeExperience(i)}
                            variant="ghost" 
                            size="icon" 
                            className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white border border-slate-100 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-red-500" />
                          </Button>
                          <div className="grid grid-cols-2 gap-4">
                            <Input 
                              placeholder="Job Title" 
                              value={exp.title} 
                              onChange={(e) => handleExperienceChange(i, 'title', e.target.value)}
                              className="h-9 text-xs" 
                            />
                            <Input 
                              placeholder="Employer" 
                              value={exp.company} 
                              onChange={(e) => handleExperienceChange(i, 'company', e.target.value)}
                              className="h-9 text-xs" 
                            />
                          </div>
                          <Input 
                            placeholder="Period (e.g. 2022 - Present)" 
                            value={exp.period} 
                            onChange={(e) => handleExperienceChange(i, 'period', e.target.value)}
                            className="h-9 text-xs" 
                          />
                          <Textarea 
                            placeholder="Describe your achievements..." 
                            value={exp.description} 
                            onChange={(e) => handleExperienceChange(i, 'description', e.target.value)}
                            className="min-h-[100px] text-xs resize-none leading-relaxed" 
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </aside>

        <main className="flex-1 bg-slate-200/50 flex flex-col relative overflow-hidden">
          <ScrollArea className="flex-1 p-16">
            <div className="max-w-[800px] mx-auto bg-white shadow-2xl min-h-[1100px] p-16 flex flex-col transition-all duration-500 hover:scale-[1.01]">
              {renderSelectedTemplate()}
            </div>
          </ScrollArea>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-slate-900/95 backdrop-blur-md px-6 py-3 rounded-full text-white shadow-2xl z-50 border border-white/10 ring-4 ring-black/5">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10"><ChevronLeft className="h-5 w-5" /></Button>
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#EF593E]">A4 Preview</span>
              <span className="text-[9px] font-bold opacity-50">Page 1 of 1</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10"><ChevronRight className="h-5 w-5" /></Button>
          </div>
        </main>
      </div>
    </div>
  );
}
