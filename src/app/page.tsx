
"use client";

import { useState, useEffect } from "react";
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
  Check,
  Wand2,
  List as ListIcon,
  Loader2,
  Search
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

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

const ResumeIllustration = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="120" y="100" width="480" height="600" rx="40" transform="rotate(-12 120 100)" fill="white" stroke="#F1F5F9" strokeWidth="8"/>
    <rect x="180" y="180" width="120" height="120" rx="16" transform="rotate(-12 180 180)" fill="#F8FAFC"/>
    <rect x="330" y="180" width="160" height="15" rx="7.5" transform="rotate(-12 330 180)" fill="#F1F5F9"/>
    <rect x="250" y="150" width="480" height="600" rx="40" fill="white" stroke="#E2E8F0" strokeWidth="8"/>
    <rect x="310" y="210" width="120" height="120" rx="16" fill="#F8FAFC"/>
    <circle cx="370" cy="270" r="40" fill="#EF593E" opacity="0.9"/>
    <path d="M340 270C340 240 400 240 400 270" stroke="#1E293B" strokeWidth="10" fill="none" strokeLinecap="round"/>
    <rect x="330" y="260" width="14" height="24" rx="7" fill="#1E293B"/>
    <rect x="396" y="260" width="14" height="24" rx="7" fill="#1E293B"/>
    <path d="M345 300C330 330 360 340 370 320" stroke="#1E293B" strokeWidth="2" fill="none"/>
    <path d="M360 275C365 282 375 282 380 275" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <rect x="460" y="240" width="180" height="20" rx="10" fill="#EF593E"/>
    <rect x="460" y="275" width="240" height="20" rx="10" fill="#EF593E"/>
    <circle cx="340" cy="420" r="35" fill="#F1F5F9"/>
    <rect x="400" y="405" width="240" height="12" rx="6" fill="#F1F5F9"/>
    <rect x="400" y="430" width="180" height="12" rx="6" fill="#F1F5F9"/>
    <circle cx="340" cy="520" r="35" fill="#F1F5F9"/>
    <rect x="400" y="505" width="240" height="12" rx="6" fill="#F1F5F9"/>
    <rect x="400" y="530" width="180" height="12" rx="6" fill="#F1F5F9"/>
    <circle cx="340" cy="620" r="35" fill="#F1F5F9"/>
    <rect x="400" y="605" width="240" height="12" rx="6" fill="#F1F5F9"/>
    <rect x="400" y="630" width="180" height="12" rx="6" fill="#F1F5F9"/>
  </svg>
);

export default function Home() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);

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
      setIsScanning(true);
    } else {
      router.push("/login?tab=signup");
    }
  };

  if (isScanning) {
    return (
      <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="relative mx-auto w-48 h-64 bg-slate-50 border-2 border-slate-200 rounded-xl overflow-hidden shadow-2xl">
            {/* Animated Laser Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-primary/80 shadow-[0_0_15px_rgba(239,89,62,0.8)] z-10 animate-[scan_2s_linear_infinite]" />
            
            {/* Simulated Content */}
            <div className="p-4 space-y-3 opacity-20">
              <div className="w-20 h-2 bg-slate-300 rounded" />
              <div className="w-full h-2 bg-slate-200 rounded" />
              <div className="w-full h-2 bg-slate-200 rounded" />
              <div className="w-2/3 h-2 bg-slate-200 rounded" />
              <div className="pt-4 space-y-2">
                <div className="w-full h-2 bg-slate-200 rounded" />
                <div className="w-full h-2 bg-slate-200 rounded" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 text-[#EF593E]">
              <Loader2 className="h-6 w-6 animate-spin" />
              <h2 className="text-2xl font-black uppercase tracking-tight">ATS Analysis in Progress</h2>
            </div>
            <p className="text-slate-500 font-medium h-6">{scanSteps[scanStep]}</p>
            
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-500 ease-out" 
                style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="pt-8 opacity-40">
            <Logo />
          </div>
        </div>

        <style jsx global>{`
          @keyframes scan {
            0% { top: 0; }
            50% { top: 100%; }
            100% { top: 0; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-6 h-20 flex items-center bg-white border-b border-gray-100 sticky top-0 z-50">
        <Link className="flex items-center gap-2" href="/">
          <Logo />
        </Link>
        <nav className="ml-12 hidden lg:flex gap-8 items-center text-sm font-medium text-slate-600">
          <button className="flex items-center gap-1 hover:text-[#EF593E] transition-colors">
            Resume Templates <ChevronDown className="h-4 w-4 opacity-50" />
          </button>
          <button className="flex items-center gap-1 hover:text-[#EF593E] transition-colors">
            Resume Examples <ChevronDown className="h-4 w-4 opacity-50" />
          </button>
          <button className="flex items-center gap-1 hover:text-[#EF593E] transition-colors">
            Cover Letter <ChevronDown className="h-4 w-4 opacity-50" />
          </button>
          <Link href="#" className="hover:text-[#EF593E] transition-colors">FAQ</Link>
          <button className="flex items-center gap-1 hover:text-[#EF593E] transition-colors">
            Resources <ChevronDown className="h-4 w-4 opacity-50" />
          </button>
        </nav>
        <div className="ml-auto flex items-center gap-6">
          {!isUserLoading && (
            user ? (
              <Link href="/dashboard/student" className="text-sm font-bold text-[#EF593E] uppercase tracking-tight">
                Dashboard
              </Link>
            ) : (
              <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-[#EF593E] transition-colors">
                Sign in
              </Link>
            )
          )}
          <Link href={user ? "/dashboard/student" : "/login?tab=signup"}>
            <Button className="bg-[#EF593E] hover:bg-[#D44D35] text-white font-semibold px-6 h-11 rounded-md shadow-lg shadow-[#EF593E]/20">
              Create my resume
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative hero-gradient overflow-visible">
          <div className="container mx-auto px-6 py-12 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 max-w-xl">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
                    Free AI <span className="text-[#EF593E]">ATS</span><br />
                    Resume Checker
                  </h1>
                  <p className="text-base lg:text-lg text-slate-500 leading-relaxed">
                    Is your resume good enough? Run 16 essential checks on your resume. It's fast, and free. High scores lead to more interviews.
                  </p>
                </div>
                <div className="upload-zone p-8 lg:p-10 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 bg-[#EF593E]/5 border-2 border-dashed border-[#EF593E]/20">
                  <p className="text-slate-500 font-medium text-sm">
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
                <div className="relative z-10 animate-in fade-in zoom-in duration-1000 max-w-[500px] mx-auto">
                  <ResumeIllustration className="w-full h-auto drop-shadow-2xl" />
                  <div className="absolute -top-6 -right-4 text-[#EF593E] animate-bounce">
                    <Sparkles className="h-10 w-10" />
                  </div>
                  <div className="absolute bottom-10 right-0 bg-white p-3 rounded-xl shadow-2xl flex items-center gap-3 border border-orange-100 translate-x-4">
                    <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-bold text-slate-800 whitespace-nowrap">ATS Optimized</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section className="py-16 bg-white overflow-visible">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-black text-center text-slate-900 mb-16 uppercase tracking-tight">How to use the resume checker</h2>
            <div className="relative space-y-16">
              {/* Step 1 */}
              <div className="sticky top-28 z-10">
                <div className="bg-white rounded-3xl p-8 lg:p-12 border-2 border-[#EF593E]/20 shadow-xl shadow-[#EF593E]/5 min-h-[350px] flex flex-col lg:flex-row gap-10 items-center">
                  <div className="flex-1 space-y-4">
                    <div className="text-[#EF593E] font-bold text-base uppercase tracking-wider">Step 1</div>
                    <h3 className="text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
                      Import your existing resume into the resume builder
                    </h3>
                    <p className="text-sm lg:text-base text-slate-500">
                      Upload your resume or import from LinkedIn. (Or start from scratch.)
                      <br /><br />
                      You&apos;ll get structured sections and tools to help you organize fast.
                    </p>
                  </div>
                  <div className="flex-1 w-full max-w-sm space-y-4">
                    <div className="bg-white border border-slate-200 rounded-lg p-2">
                      <Input disabled placeholder="www.linkedin.com/in/yourprofileurl" className="bg-slate-50/50 border-none shadow-none text-[10px]" />
                    </div>
                    <Button variant="outline" className="w-full h-10 gap-2 border-[#EF593E]/20 bg-[#EF593E]/5 text-slate-600 font-bold text-xs">
                      <Linkedin className="h-4 w-4 text-[#0077B5]" /> Import LinkedIn Profile Data
                    </Button>
                    <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-2 bg-slate-50/30 group">
                      <Upload className="h-5 w-5 text-slate-400" />
                      <p className="text-[10px] text-slate-400">Drag & Drop your resume here or click to select a file (.doc or .pdf).</p>
                      <MousePointer2 className="absolute -bottom-3 -right-3 h-8 w-8 text-[#EF593E] fill-[#EF593E] rotate-[20deg]" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="sticky top-36 z-20">
                <div className="bg-white rounded-3xl p-8 lg:p-12 border-2 border-accent/20 shadow-xl shadow-accent/5 min-h-[350px] flex flex-col lg:flex-row gap-10 items-center">
                  <div className="flex-1 space-y-4">
                    <div className="text-accent font-bold text-base uppercase tracking-wider">Step 2</div>
                    <h3 className="text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
                      Click the &quot;Analyzer&quot; tab to check your resume score
                    </h3>
                    <p className="text-sm lg:text-base text-slate-500">
                      Open the Analyzer tab to see your resume score, personalized findings, and recommendations—automatically generated by the Network Bulls AI.
                    </p>
                  </div>
                  <div className="flex-1 w-full max-w-sm flex items-center justify-center gap-6 lg:gap-8">
                    <FileText className="h-8 w-8 text-slate-300" />
                    <Lightbulb className="h-8 w-8 text-slate-300" />
                    <div className="relative">
                       <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-white shadow-2xl">
                          <PieChart className="h-8 w-8" />
                       </div>
                       <MousePointer2 className="absolute -bottom-4 -right-1 h-8 w-8 text-[#EF593E] fill-[#EF593E] rotate-[20deg]" />
                    </div>
                    <ArrowLeftRight className="h-8 w-8 text-slate-300" />
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="sticky top-44 z-30">
                <div className="bg-white rounded-3xl p-8 lg:p-12 border-2 border-[#EF593E]/20 shadow-xl shadow-[#EF593E]/5 min-h-[350px] flex flex-col lg:flex-row gap-10 items-center">
                  <div className="flex-1 space-y-4">
                    <div className="text-[#EF593E] font-bold text-base uppercase tracking-wider">Step 3</div>
                    <h3 className="text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
                      Review your resume score and see what needs fixing
                    </h3>
                    <p className="text-sm lg:text-base text-slate-500">
                      Check the list of issues flagged by the ATS checker. Click any issue for a quick explanation, and use “Show Me” to jump to the exact section.
                    </p>
                  </div>
                  <div className="flex-1 w-full max-w-sm relative flex items-center justify-center">
                    <div className="bg-white border-2 border-[#EF593E] rounded-xl p-6 shadow-lg max-w-[280px] w-full space-y-3 relative">
                      <div className="flex items-center gap-2 text-[8px] font-bold text-[#EF593E] uppercase tracking-wider">
                         <div className="w-1.5 h-1.5 rounded-full bg-[#EF593E]" /> RESUME STRUCTURE
                      </div>
                      <div className="space-y-1">
                        <div className="text-[11px] font-semibold text-slate-400 leading-tight">Number of Achievements in</div>
                        <div className="text-[11px] font-semibold text-slate-400 leading-tight">Work Experience #2</div>
                      </div>
                      <div className="flex justify-end pt-1">
                         <Button className="bg-[#EF593E] hover:bg-[#D44D35] text-white font-bold px-4 rounded-full h-8 text-[11px]">
                           Show Me
                         </Button>
                      </div>
                      <div className="absolute -left-12 top-1/2 -translate-y-1/2">
                         <div className="w-24 h-24 rounded-full bg-white shadow-2xl flex flex-col items-center justify-center border-4 border-accent relative z-10">
                            <span className="text-2xl font-black text-slate-900">75</span>
                            <span className="text-[8px] font-bold text-slate-500 text-center leading-tight">Overall Score</span>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-6 text-center space-y-10">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">A resume checker for every job</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Calculating score...", icon: "📊", desc: "Real-time ATS compatibility analysis" },
                { title: "Keyword Optimization", icon: "🔍", desc: "Identify missing industry keywords" },
                { title: "Pro Improvements", icon: "✨", desc: "Actionable advice for every section" }
              ].map((feature, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group text-left">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform inline-block">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-slate-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 border-t border-slate-100 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <Logo />
            <p className="text-[10px] text-slate-400 mt-2">© 2024 Network Bulls AI. Part of the CareerAce network.</p>
          </div>
          <div className="flex gap-6 text-[11px] font-bold text-slate-500">
            <Link href="#" className="hover:text-[#EF593E] uppercase tracking-tighter">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#EF593E] uppercase tracking-tighter">Terms of Service</Link>
            <Link href="#" className="hover:text-[#EF593E] uppercase tracking-tighter">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

