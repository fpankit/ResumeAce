
"use client";

import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  Linkedin,
  MousePointer2,
  PieChart,
  FileText,
  Lightbulb,
  ArrowLeftRight,
  Paintbrush
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Input } from "@/components/ui/input";

const BullIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C9.79 2 8 3.79 8 6C8 7.31 8.63 8.47 9.61 9.22C6.44 10.05 4 12.75 4 16V18H20V16C20 12.75 17.56 10.05 14.39 9.22C15.37 8.47 16 7.31 16 6C16 3.79 14.21 2 12 2ZM12 4C13.1 4 14 4.9 14 6C14 7.1 13.1 8 12 8C10.9 8 10 7.1 10 6C10 4.9 10.9 4 12 4ZM6.18 16C6.67 13.72 8.7 12 11.13 12H12.87C15.3 12 17.33 13.72 17.82 16H6.18Z" />
  </svg>
);

const Logo = () => (
  <div className="flex items-center gap-2 group">
    <div className="relative w-10 h-10 rounded-lg bg-[#EF593E] flex items-center justify-center text-white overflow-hidden">
      <BullIcon className="w-8 h-8 opacity-90" />
    </div>
    <div className="flex flex-col -space-y-1">
      <div className="flex items-center gap-1">
        <span className="text-[#EF593E] font-black text-xl tracking-tighter uppercase">Network</span>
        <span className="text-[#44546A] font-black text-xl tracking-tighter uppercase">Bulls</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="h-[1px] flex-1 bg-slate-200" />
        <span className="text-[7px] text-[#EF593E] font-bold tracking-[0.2em] uppercase whitespace-nowrap">Where Careers Fly</span>
      </div>
    </div>
  </div>
);

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-resumes");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation */}
      <header className="px-6 h-20 flex items-center bg-white border-b border-gray-100 sticky top-0 z-50">
        <Link className="flex items-center gap-2" href="/">
          <Logo />
        </Link>
        
        <nav className="ml-12 hidden lg:flex gap-8 items-center text-sm font-medium text-slate-600">
          <button className="flex items-center gap-1 hover:text-primary transition-colors">
            Resume Templates <ChevronDown className="h-4 w-4 opacity-50" />
          </button>
          <button className="flex items-center gap-1 hover:text-primary transition-colors">
            Resume Examples <ChevronDown className="h-4 w-4 opacity-50" />
          </button>
          <button className="flex items-center gap-1 hover:text-primary transition-colors">
            Cover Letter <ChevronDown className="h-4 w-4 opacity-50" />
          </button>
          <Link href="#" className="hover:text-primary transition-colors">FAQ</Link>
          <button className="flex items-center gap-1 hover:text-primary transition-colors">
            Resources <ChevronDown className="h-4 w-4 opacity-50" />
          </button>
        </nav>

        <div className="ml-auto flex items-center gap-6">
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
            Sign in
          </Link>
          <Link href="/login?tab=signup">
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 h-11 rounded-md shadow-lg shadow-primary/20">
              Create my resume
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 lg:py-32 hero-gradient">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 max-w-xl">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
                  Free AI <span className="text-[#EF593E]">ATS</span><br />
                  Resume Checker
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed">
                  Is your resume good enough? Run 16 essential checks on your resume. It's fast, and free. High scores lead to more interviews.
                </p>
              </div>

              {/* Upload Zone */}
              <div className="upload-zone p-12 rounded-2xl flex flex-col items-center justify-center text-center space-y-6 bg-[#EF593E]/5 border-2 border-dashed border-[#EF593E]/20">
                <p className="text-slate-500 font-medium">
                  Drop your resume here or choose a file<br />
                  <span className="text-xs text-slate-400 font-normal">PDF & DOCX only (max 2MB)</span>
                </p>
                <Link href="/login">
                  <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 h-12 gap-2 text-base shadow-xl shadow-primary/20">
                    Upload my resume <Upload className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual Side */}
            <div className="relative hidden lg:block">
              <div className="relative z-10 animate-in fade-in zoom-in duration-1000">
                <Image 
                  src={heroImage?.imageUrl || "https://picsum.photos/seed/res/800/600"} 
                  alt="Resume Stack"
                  width={800}
                  height={600}
                  className="rounded-3xl shadow-2xl rotate-3 translate-x-12 hover:rotate-0 transition-all duration-500 border border-slate-100"
                  data-ai-hint="resume stack"
                />
                <div className="absolute -top-4 -right-4 text-[#EF593E] animate-bounce">
                  <Sparkles className="h-8 w-8" />
                </div>
                <div className="absolute bottom-12 right-0 bg-white p-3 rounded-lg shadow-xl flex items-center gap-2 border border-orange-100">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">ATS Optimized</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to use section */}
        <section className="py-24 bg-white overflow-visible">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-black text-center text-slate-900 mb-20 uppercase tracking-tight">How to use the resume checker</h2>
            
            <div className="relative space-y-24">
              {/* Step 1 Card */}
              <div className="sticky top-28 z-10">
                <div className="bg-white rounded-3xl p-10 lg:p-16 border-2 border-primary/20 shadow-xl shadow-primary/5 min-h-[400px] flex flex-col lg:flex-row gap-12 items-center">
                  <div className="flex-1 space-y-6">
                    <div className="text-primary font-bold text-lg uppercase tracking-wider">Step 1</div>
                    <h3 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                      Import your existing resume into the resume builder
                    </h3>
                    <p className="text-slate-500">
                      Upload your resume or import from LinkedIn. (Or start from scratch.)
                      <br /><br />
                      You&apos;ll get structured sections and tools to help you organize fast.
                    </p>
                  </div>
                  <div className="flex-1 w-full max-w-md space-y-4">
                    <div className="bg-white border border-slate-200 rounded-lg p-3">
                      <Input disabled placeholder="www.linkedin.com/in/yourprofileurl" className="bg-slate-50/50 border-none shadow-none text-xs" />
                    </div>
                    <Button variant="outline" className="w-full gap-2 border-primary/20 bg-primary/5 text-slate-600 font-bold">
                      <Linkedin className="h-4 w-4 text-[#0077B5]" /> Import LinkedIn Profile Data
                    </Button>
                    <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-2 bg-slate-50/30 group">
                      <Upload className="h-6 w-6 text-slate-400" />
                      <p className="text-xs text-slate-400">Drag & Drop your resume here or click to select a file (.doc or .pdf).</p>
                      <MousePointer2 className="absolute -bottom-4 -right-4 h-10 w-10 text-primary fill-primary rotate-[20deg]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 Card */}
              <div className="sticky top-40 z-20">
                <div className="bg-white rounded-3xl p-10 lg:p-16 border-2 border-accent/20 shadow-xl shadow-accent/5 min-h-[400px] flex flex-col lg:flex-row gap-12 items-center">
                  <div className="flex-1 space-y-6">
                    <div className="text-accent font-bold text-lg uppercase tracking-wider">Step 2</div>
                    <h3 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                      Click the &quot;Analyzer&quot; tab to check your resume score
                    </h3>
                    <p className="text-slate-500">
                      Open the Analyzer tab to see your resume score, personalized findings, and recommendations—automatically generated by the Network Bulls AI.
                      <br /><br />
                      No setup. No extra steps. Just instant insight.
                    </p>
                  </div>
                  <div className="flex-1 w-full max-w-md flex items-center justify-center gap-6 lg:gap-10">
                    <FileText className="h-10 w-10 text-slate-300" />
                    <Lightbulb className="h-10 w-10 text-slate-300" />
                    <div className="relative">
                       <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-white shadow-2xl">
                          <PieChart className="h-10 w-10" />
                       </div>
                       <MousePointer2 className="absolute -bottom-6 -right-2 h-10 w-10 text-primary fill-primary rotate-[20deg]" />
                    </div>
                    <ArrowLeftRight className="h-10 w-10 text-slate-300" />
                    <Paintbrush className="h-10 w-10 text-slate-300" />
                  </div>
                </div>
              </div>

              {/* Step 3 Card */}
              <div className="sticky top-52 z-30">
                <div className="bg-white rounded-3xl p-10 lg:p-16 border-2 border-primary/20 shadow-xl shadow-primary/5 min-h-[400px] flex flex-col lg:flex-row gap-12 items-center">
                  <div className="flex-1 space-y-6">
                    <div className="text-primary font-bold text-lg uppercase tracking-wider">Step 3</div>
                    <h3 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                      Review your resume score and see what needs fixing
                    </h3>
                    <p className="text-slate-500">
                      Check the list of issues flagged by the ATS checker. Click any issue for a quick explanation, and use “Show Me” to jump to the exact section on your resume.
                    </p>
                  </div>
                  <div className="flex-1 w-full max-w-md relative flex items-center justify-center">
                    <div className="bg-white border-2 border-primary rounded-xl p-8 shadow-lg max-w-[320px] w-full space-y-4 relative">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-wider">
                         <div className="w-2 h-2 rounded-full bg-primary" /> RESUME STRUCTURE
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-slate-400 leading-tight">Number of Achievements in</div>
                        <div className="text-sm font-semibold text-slate-400 leading-tight">Work Experience #2</div>
                      </div>
                      <div className="flex justify-end pt-2">
                         <Button className="bg-primary hover:bg-primary/90 text-white font-bold px-6 rounded-full h-10 text-sm">
                           Show Me
                         </Button>
                      </div>
                      <div className="absolute -left-16 top-1/2 -translate-y-1/2">
                         <div className="w-32 h-32 rounded-full bg-white shadow-2xl flex flex-col items-center justify-center border-4 border-accent relative z-10">
                            <span className="text-4xl font-black text-slate-900">75</span>
                            <span className="text-[10px] font-bold text-slate-500 text-center leading-tight">Overall Score</span>
                         </div>
                      </div>
                      <MousePointer2 className="absolute -bottom-4 -right-2 h-10 w-10 text-primary fill-primary rotate-[20deg] z-20" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 Card */}
              <div className="sticky top-64 z-40">
                <div className="bg-white rounded-3xl p-10 lg:p-16 border-2 border-primary/20 shadow-xl shadow-primary/5 min-h-[400px] flex flex-col lg:flex-row gap-12 items-center">
                  <div className="flex-1 space-y-6">
                    <div className="text-primary font-bold text-lg uppercase tracking-wider">Step 4</div>
                    <h3 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                      Make updates. Watch your ATS resume score improve.
                    </h3>
                    <p className="text-slate-500">
                      Edit your resume directly in the builder. Your resume score updates in real time—so you can track your progress instantly.
                    </p>
                  </div>
                  <div className="flex-1 w-full max-w-md flex flex-col items-center justify-center relative">
                    <div className="relative">
                      <svg viewBox="0 0 100 60" className="w-64 h-auto overflow-visible">
                        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#F1F5F9" strokeWidth="10" strokeLinecap="round" />
                        <path d="M 10 50 A 40 40 0 0 1 35 15" fill="none" stroke="#F43F5E" strokeWidth="10" strokeLinecap="round" />
                        <path d="M 35 15 A 40 40 0 0 1 65 15" fill="none" stroke="#FACC15" strokeWidth="10" strokeLinecap="round" />
                        <path d="M 65 15 A 40 40 0 0 1 90 50" fill="none" stroke="#0D9488" strokeWidth="10" strokeLinecap="round" />
                        <circle cx="78" cy="22" r="2.5" fill="#0D9488" className="animate-pulse" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
                        <span className="text-6xl font-black text-slate-800 tracking-tight">80%</span>
                        <span className="text-lg font-bold text-slate-700">Good Match Score</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-64"></div>
            </div>
          </div>
        </section>

        {/* Feature Teaser */}
        <section className="bg-slate-50 py-24">
          <div className="container mx-auto px-6 text-center space-y-12">
            <h2 className="text-3xl font-black text-slate-900 uppercase">A resume checker for every job</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Calculating score...", icon: "📊", desc: "Real-time ATS compatibility analysis" },
                { title: "Keyword Optimization", icon: "🔍", desc: "Identify missing industry keywords" },
                { title: "Pro Improvements", icon: "✨", desc: "Actionable advice for every section" }
              ].map((feature, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-100 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <Logo />
            <p className="text-xs text-slate-400 mt-2">© 2024 Network Bulls AI. Part of the CareerAce network.</p>
          </div>
          <div className="flex gap-8 text-sm font-bold text-slate-500">
            <Link href="#" className="hover:text-primary uppercase tracking-tighter">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary uppercase tracking-tighter">Terms of Service</Link>
            <Link href="#" className="hover:text-primary uppercase tracking-tighter">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
