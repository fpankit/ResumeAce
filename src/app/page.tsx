"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  PieChart,
  FileText,
  Lightbulb,
  ArrowLeftRight,
  Loader2,
  Check,
  Zap,
  MousePointer2,
  Brush,
  Linkedin,
  Send
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

const BullIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C9.79 2 8 3.79 8 6C8 7.31 8.63 8.47 9.61 9.22C6.44 10.05 4 12.75 4 16V18H20V16C20 12.75 17.56 10.05 14.39 9.22C15.37 8.47 16 7.31 16 6C16 3.79 14.21 2 12 2ZM12 4C13.1 4 14 4.9 14 6C14 7.1 13.1 8 12 8C10.9 8 10 7.1 10 6C10 4.9 10.9 4 12 4ZM6.18 16C6.67 13.72 8.7 12 11.13 12H12.87C15.3 12 17.33 13.72 17.82 16H6.18Z" />
  </svg>
);

const Logo = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: { icon: "w-6 h-6", text: "text-lg", subtext: "text-[6px]" },
    md: { icon: "w-10 h-10", text: "text-xl", subtext: "text-[7px]" },
    lg: { icon: "w-12 h-12", text: "text-2xl", subtext: "text-[8px]" }
  };
  const s = sizes[size];

  return (
    <div className="flex items-center gap-2 group">
      <div className={`relative ${s.icon} rounded-lg bg-[#EF593E] flex items-center justify-center text-white overflow-hidden shadow-lg shadow-primary/20`}>
        <BullIcon className="w-full h-full p-1 opacity-90" />
      </div>
      <div className="flex flex-col -space-y-1">
        <div className="flex items-center gap-1">
          <span className={`text-[#EF593E] font-black ${s.text} tracking-tighter uppercase`}>Network</span>
          <span className={`text-[#44546A] font-black ${s.text} tracking-tighter uppercase`}>Bulls</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-[1px] flex-1 bg-slate-200" />
          <span className={`${s.subtext} text-[#EF593E] font-bold tracking-[0.2em] uppercase whitespace-nowrap`}>Where Careers Fly</span>
        </div>
      </div>
    </div>
  );
};

const HeroIllustration = () => (
  <div className="relative w-full max-w-[500px] mx-auto filter drop-shadow-[0_0_20px_rgba(239,89,62,0.15)]">
    <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <circle cx="400" cy="300" r="250" fill="#EF593E" fillOpacity="0.03" />
      <rect x="250" y="100" width="300" height="400" rx="30" fill="white" stroke="#F1F5F9" strokeWidth="4" transform="rotate(-5 400 300)" />
      
      <g transform="translate(340, 180)">
        <circle cx="60" cy="60" r="60" fill="#F8FAFC" />
        <circle cx="60" cy="45" r="30" fill="#EF593E" fillOpacity="0.9" />
        <path d="M30 90C30 73 90 73 90 90" stroke="#1E293B" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M35 45C35 25 85 25 85 45" stroke="#1E293B" strokeWidth="4" fill="none" />
        <rect x="25" y="40" width="12" height="20" rx="4" fill="#1E293B" />
        <rect x="83" y="40" width="12" height="20" rx="4" fill="#1E293B" />
      </g>

      <g className="filter drop-shadow-xl">
        <rect x="460" y="240" width="160" height="20" rx="10" fill="#EF593E" />
        <rect x="460" y="275" width="220" height="20" rx="10" fill="#EF593E" />
        <rect x="460" y="310" width="140" height="20" rx="10" fill="#EF593E" />
      </g>
    </svg>
    <div className="absolute -top-6 -right-4 text-[#EF593E] animate-bounce">
      <Sparkles className="h-10 w-10" />
    </div>
    <div className="absolute bottom-10 right-0 bg-white p-3 rounded-xl shadow-2xl flex items-center gap-3 border border-orange-100 translate-x-4">
      <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
        <CheckCircle2 className="h-4 w-4 text-white" />
      </div>
      <span className="text-sm font-bold text-slate-800 whitespace-nowrap text-orange-500">ATS Optimized</span>
    </div>
  </div>
);

export default function Home() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scanSteps = [
    "Uploading Document...",
    "Parsing Resume Structure...",
    "Extracting Skills & Experience...",
    "Comparing against ATS Algorithms...",
    "Identifying Missing Keywords...",
    "Generating AI Insights..."
  ];

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanStep((prev) => (prev < scanSteps.length - 1 ? prev + 1 : prev));
      }, 800);
      
      const timeout = setTimeout(() => {
        router.push("/dashboard/student");
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isScanning, router, scanSteps.length]);

  const handleUploadClick = () => {
    if (user) {
      fileInputRef.current?.click();
    } else {
      router.push("/login?tab=signup");
    }
  };

  const handleCreateResumeClick = () => {
    router.push("/templates");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsScanning(true);
    }
  };

  if (isScanning) {
    return (
      <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-md space-y-12 animate-in fade-in zoom-in duration-500">
          <div className="relative mx-auto w-48 h-64 bg-slate-50 border-2 border-slate-100 rounded-xl overflow-hidden shadow-2xl">
            <div className="p-4 space-y-3 opacity-10">
              <div className="w-16 h-2 bg-slate-300 rounded" />
              <div className="w-full h-2 bg-slate-200 rounded" />
              <div className="w-full h-2 bg-slate-200 rounded" />
              <div className="w-2/3 h-2 bg-slate-200 rounded" />
            </div>
            <div className="absolute top-0 left-0 w-full h-[3px] bg-[#EF593E] shadow-[0_0_12px_rgba(239,89,62,0.8)] z-10 animate-scan" />
          </div>
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-[#EF593E]" />
                <h2 className="text-2xl font-black text-[#EF593E] uppercase tracking-tighter">ATS Analysis</h2>
              </div>
              <p className="text-slate-500 font-medium text-lg h-6">{scanSteps[scanStep]}</p>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#EF593E] h-full transition-all duration-500 ease-out" 
                style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="pt-12 flex justify-center opacity-80"><Logo /></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx" />
      
      <header className="px-6 h-20 flex items-center bg-white border-b border-gray-100 sticky top-0 z-50">
        <Link className="flex items-center gap-2" href="/"><Logo /></Link>
        <nav className="ml-12 hidden lg:flex gap-8 items-center text-sm font-medium text-slate-600">
          <Link href="/templates" className="hover:text-[#EF593E] transition-colors">Resume Templates</Link>
          <Link href="#" className="hover:text-[#EF593E] transition-colors">Resume Examples</Link>
          <Link href="/cover-letter" className="hover:text-[#EF593E] transition-colors">Cover Letter</Link>
          <Link href="#" className="hover:text-[#EF593E] transition-colors">FAQ</Link>
        </nav>
        <div className="ml-auto flex items-center gap-6">
          {!isUserLoading && (
            user ? (
              <Link href="/dashboard/student" className="text-sm font-bold text-[#EF593E] uppercase tracking-tight">Dashboard</Link>
            ) : (
              <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-[#EF593E] transition-colors">Sign in</Link>
            )
          )}
          <Button 
            className="bg-[#EF593E] hover:bg-[#D44D35] text-white font-semibold px-6 h-11 rounded-md shadow-lg shadow-[#EF593E]/20"
            onClick={handleCreateResumeClick}
          >
            Create my resume
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative hero-gradient py-12 lg:py-16">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 max-w-xl">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
                    Free AI <span className="text-[#EF593E]">ATS</span><br />
                    Resume Checker
                  </h1>
                  <p className="text-base lg:text-lg text-slate-500 leading-relaxed">
                    Is your resume good enough? Run 16 essential checks on your resume. Fast, free, and AI-powered.
                  </p>
                </div>
                <div className="upload-zone p-8 lg:p-10 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 bg-[#EF593E]/5 border-2 border-dashed border-[#EF593E]/20 transition-all hover:bg-[#EF593E]/10 hover:border-[#EF593E]/40 group">
                  <p className="text-slate-500 font-medium text-sm group-hover:text-slate-700 transition-colors">
                    Drop your resume here or choose a file<br />
                    <span className="text-xs text-slate-400 font-normal">PDF & DOCX only (max 2MB)</span>
                  </p>
                  <Button 
                    className="bg-[#EF593E] hover:bg-[#D44D35] text-white font-semibold px-8 h-12 gap-2 text-base shadow-xl shadow-[#EF593E]/20"
                    onClick={handleUploadClick}
                  >
                    Upload my resume <Upload className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="relative hidden lg:block overflow-visible">
                <HeroIllustration />
              </div>
            </div>
          </div>
        </section>

        {/* How it works section with Overlapping Sticky Effect */}
        <section className="py-24 bg-slate-50/30">
          <div className="container mx-auto px-6 max-w-5xl space-y-8">
            <div className="text-center mb-16">
               <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">How to use the resume checker</h2>
            </div>
            
            {/* Step 1 Card */}
            <div className="sticky top-24 z-10 bg-white border border-slate-100 rounded-[32px] p-8 lg:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-sm transition-all hover:border-[#EF593E] group mb-8">
              <div className="flex-1 space-y-6">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#EF593E]">Step 1</span>
                <h3 className="text-3xl font-black text-slate-900 leading-tight">Import your existing resume into the resume builder</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  Upload your resume or import from LinkedIn. (Or start from scratch.)
                </p>
              </div>
              <div className="w-full lg:w-[400px] space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center gap-3">
                  <div className="w-full p-2 bg-white border border-slate-100 rounded-lg text-[10px] text-slate-400">www.linkedin.com/in/yourprofileurl</div>
                  <Button variant="outline" size="sm" className="w-full h-10 gap-2 font-bold text-xs border-orange-100 text-slate-700">
                    <Linkedin className="h-4 w-4 text-[#0A66C2]" /> Import LinkedIn Profile Data
                  </Button>
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-slate-50/50">
                  <Upload className="h-6 w-6 text-slate-300" />
                  <span className="text-[10px] font-medium text-slate-400 text-center leading-tight">Drag & Drop your resume here or click to select a file (.doc or .pdf)</span>
                </div>
              </div>
            </div>

            {/* Step 2 Card */}
            <div className="sticky top-32 z-20 bg-white border border-slate-100 rounded-[32px] p-8 lg:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-md transition-all hover:border-[#EF593E] group mb-8">
              <div className="flex-1 space-y-6">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#EF593E]">Step 2</span>
                <h3 className="text-3xl font-black text-slate-900 leading-tight">Click the "Analyzer" tab to check your resume score</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  Open the Analyzer tab to see your resume score, personalized findings, and recommendations—automatically generated by the Network Bulls AI.
                </p>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">No setup. No extra steps. Just instant insight.</p>
              </div>
              <div className="w-full lg:w-[350px] h-[180px] bg-slate-50 rounded-2xl relative flex items-center justify-center border border-slate-100 overflow-hidden shadow-inner">
                <div className="flex items-center gap-6 text-slate-300">
                  <FileText className="h-6 w-6" />
                  <Lightbulb className="h-6 w-6" />
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-[#334155] flex items-center justify-center text-white shadow-2xl relative z-10">
                      <PieChart className="h-8 w-8" />
                    </div>
                    <div className="absolute top-12 right-0 z-20 translate-x-2 translate-y-2">
                       <MousePointer2 className="h-8 w-8 text-[#EF593E] fill-[#EF593E]" />
                    </div>
                  </div>
                  <ArrowLeftRight className="h-6 w-6" />
                  <Brush className="h-6 w-6" />
                </div>
              </div>
            </div>

            {/* Step 3 Card */}
            <div className="sticky top-40 z-30 bg-white border border-slate-100 rounded-[32px] p-8 lg:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-lg transition-all hover:border-[#EF593E] group mb-8">
              <div className="flex-1 space-y-6">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#EF593E]">Step 3</span>
                <h3 className="text-3xl font-black text-slate-900 leading-tight">Review your resume score and see what needs fixing</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  Check the list of issues flagged by the ATS checker. Click any issue for a quick explanation, and use "Show Me" to jump to the exact section on your resume.
                </p>
              </div>
              <div className="w-full lg:w-[400px] h-[220px] relative flex items-center justify-center">
                {/* Score Circle Overlay */}
                <div className="absolute left-0 z-20 -translate-x-4">
                  <div className="w-24 h-24 rounded-full bg-white border-[6px] border-[#334155] shadow-2xl flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-slate-900">75</span>
                    <span className="text-[7px] font-bold uppercase text-slate-400 tracking-tighter">Overall Score</span>
                  </div>
                </div>
                {/* Issue Card */}
                <div className="w-[300px] bg-white border-2 border-orange-100 rounded-2xl p-6 shadow-xl relative">
                   <div className="flex items-center gap-2 mb-3">
                     <div className="w-2 h-2 rounded-full bg-[#EF593E]" />
                     <span className="text-[10px] font-black uppercase text-[#EF593E] tracking-widest">Resume Structure</span>
                   </div>
                   <p className="text-xs font-bold text-slate-600 mb-6 leading-relaxed">Number of Achievements in<br />Work Experience #2</p>
                   <div className="flex justify-end">
                      <Button size="sm" className="bg-[#EF593E] hover:bg-[#D44D35] text-white font-black uppercase text-[10px] h-8 px-4 rounded-full shadow-lg shadow-[#EF593E]/20">Show Me</Button>
                   </div>
                   <div className="absolute bottom-[-10px] right-[-10px] rotate-12">
                     <MousePointer2 className="h-6 w-6 text-[#EF593E] fill-[#EF593E]" />
                   </div>
                </div>
              </div>
            </div>

            {/* Step 4 Card */}
            <div className="sticky top-48 z-40 bg-white border border-slate-100 rounded-[32px] p-8 lg:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-xl transition-all hover:border-[#EF593E] group">
              <div className="flex-1 space-y-6">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#EF593E]">Step 4</span>
                <h3 className="text-3xl font-black text-slate-900 leading-tight">Make updates. Watch your ATS resume score improve.</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  Edit your resume directly in the builder. Your resume score updates in real time—so you can track your progress instantly.
                </p>
              </div>
              <div className="w-full lg:w-[400px] flex items-center justify-center">
                <div className="relative w-48 h-24 overflow-hidden">
                  <svg viewBox="0 0 100 50" className="w-full h-full">
                    <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#f1f5f9" strokeWidth="12" strokeLinecap="round" />
                    <path d="M10 50 A40 40 0 0 1 75 18" fill="none" stroke="url(#gaugeGradient)" strokeWidth="12" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#EF593E" />
                        <stop offset="50%" stopColor="#FBBF24" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
                    <span className="text-3xl font-black text-slate-900 tracking-tighter">80%</span>
                    <span className="text-[7px] font-bold uppercase text-slate-500 tracking-tighter">Good Match Score</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick ways to improve section */}
        <section className="py-12 bg-slate-50/50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">Quick ways to improve your ATS score</h2>
              <p className="text-slate-500 font-medium">Use our professional tools to boost your visibility and land more interviews.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Card 1: Keywords */}
              <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 hover:border-[#EF593E] transition-all hover:shadow-2xl hover:shadow-[#EF593E]/10 group">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1 space-y-4">
                    <Badge className="bg-[#EF593E]/10 text-[#EF593E] border-none font-black uppercase text-[10px] px-3">Keyword Checklist</Badge>
                    <h3 className="text-2xl font-black text-slate-900 leading-tight">Check those keywords off your list</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">Instantly see which industry-specific terms are missing from your resume and add them with one click.</p>
                    <ul className="space-y-2 pt-2">
                      {['Strategic Planning', 'Project Management', 'Data Analysis'].map((k) => (
                        <li key={k} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                          <Check className="h-4 w-4 text-green-500" /> {k}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full md:w-48 bg-slate-50 p-4 rounded-xl border border-slate-100 filter drop-shadow-md group-hover:drop-shadow-[0_0_15px_rgba(239,89,62,0.2)] transition-all">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-[10px] font-black uppercase text-slate-400">Keywords</span>
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                      </div>
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded bg-green-100 flex items-center justify-center"><Check className="h-2 w-2 text-green-600" /></div>
                          <div className="h-1.5 w-full bg-slate-200 rounded-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Cover Letters */}
              <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 hover:border-[#EF593E] transition-all hover:shadow-2xl hover:shadow-[#EF593E]/10 group">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1 space-y-4">
                    <Badge className="bg-[#EF593E]/10 text-[#EF593E] border-none font-black uppercase text-[10px] px-3">Cover Letters</Badge>
                    <h3 className="text-2xl font-black text-slate-900 leading-tight">Write better cover letters with AI</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">Our AI analyzes your skills and the job description to write a persuasive cover letter in seconds.</p>
                    <Button variant="outline" asChild className="mt-2 border-[#EF593E] text-[#EF593E] font-black text-[10px] uppercase h-9 rounded-lg hover:bg-orange-50">
                      <Link href="/cover-letter">Build Cover Letter</Link>
                    </Button>
                  </div>
                  <div className="relative w-full md:w-48 h-32 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex items-center justify-center">
                     <div className="bg-white p-4 shadow-xl border rounded-lg scale-75 rotate-3">
                        <div className="w-12 h-1 bg-slate-200 mb-2" />
                        <div className="w-full h-1 bg-slate-100 mb-1" />
                        <div className="w-full h-1 bg-slate-100 mb-1" />
                        <div className="w-2/3 h-1 bg-slate-100" />
                     </div>
                     <Send className="absolute bottom-2 right-4 h-6 w-6 text-[#EF593E] opacity-20 -rotate-12" />
                  </div>
                </div>
              </div>
            </div>

            {/* Job Match Highlight */}
            <div className="mt-8 bg-[#EF593E] rounded-[40px] p-8 lg:p-12 text-white flex flex-col lg:flex-row items-center gap-12 hover:shadow-2xl hover:shadow-[#EF593E]/30 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="flex-1 space-y-6 relative z-10">
                <Badge className="bg-white/20 text-white border-none font-black uppercase text-[10px] px-3">AI Matching</Badge>
                <h3 className="text-3xl lg:text-4xl font-black leading-tight uppercase tracking-tighter">Job-match your resume to any description</h3>
                <p className="text-white/80 text-lg font-medium leading-relaxed max-w-xl">
                  Paste any job description and let our AI assistant realign your experience, ensuring you hit every single requirement with precision.
                </p>
                <Button className="bg-white text-[#EF593E] hover:bg-white/90 font-black uppercase px-8 h-12 shadow-xl shadow-black/10">Try Job Matching</Button>
              </div>
              <div className="w-full lg:w-[400px] h-64 bg-white/10 rounded-2xl relative z-10 p-6 backdrop-blur-sm border border-white/20 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 fill-white" />
                    <span className="font-black uppercase tracking-tighter text-sm">AI Assistant</span>
                  </div>
                  <Badge className="bg-green-500 text-white border-none text-[10px] font-black uppercase">Optimizing...</Badge>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-white/60">
                    <span>ATS Score</span>
                    <span className="text-white">82%</span>
                  </div>
                  <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                    <div className="bg-white h-full w-[82%] rounded-full shadow-[0_0_10px_white]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10"><div className="h-1.5 w-full bg-white/20 rounded" /></div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10"><div className="h-1.5 w-full bg-white/20 rounded" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-100 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-1">
            <Logo size="sm" />
            <p className="text-[10px] text-slate-400 mt-2 font-medium tracking-tight uppercase">© 2024 Network Bulls AI. Where Careers Fly.</p>
          </div>
          <div className="flex gap-8 text-[11px] font-black text-slate-500 uppercase tracking-tighter">
            <Link href="#" className="hover:text-[#EF593E] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#EF593E] transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-[#EF593E] transition-colors">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
