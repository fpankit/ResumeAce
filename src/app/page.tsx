"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  CheckCircle2, 
  FileText,
  MousePointer2,
  Linkedin,
  Layout,
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";

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
  <div className="relative w-full max-w-[500px] mx-auto">
    <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <circle cx="400" cy="300" r="250" fill="#EF593E" fillOpacity="0.03" />
      <rect x="250" y="100" width="300" height="400" rx="30" fill="white" stroke="#F1F5F9" strokeWidth="4" transform="rotate(-5 400 300)" />
    </svg>
    <div className="absolute bottom-10 right-0 bg-white p-3 rounded-xl shadow-2xl flex items-center gap-3 border border-orange-100 translate-x-4">
      <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
        <CheckCircle2 className="h-4 w-4 text-white" />
      </div>
      <span className="text-sm font-bold text-slate-800 whitespace-nowrap text-orange-500">ATS Compatible</span>
    </div>
  </div>
);

export default function Home() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.doc,.docx" />
      
      <header className="px-6 h-20 flex items-center bg-white border-b border-gray-100 sticky top-0 z-50">
        <Link className="flex items-center gap-2" href="/"><Logo /></Link>
        <nav className="ml-12 hidden lg:flex gap-8 items-center text-sm font-medium text-slate-600">
          <Link href="/templates" className="hover:text-[#EF593E] transition-colors">Resume Templates</Link>
          <Link href="/cover-letter" className="hover:text-[#EF593E] transition-colors">Cover Letter</Link>
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
            className="bg-[#EF593E] hover:bg-[#D44D35] text-white font-semibold px-6 h-11 rounded-md shadow-lg"
            onClick={handleCreateResumeClick}
          >
            Create my resume
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative py-12 lg:py-16">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 max-w-xl">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
                    Professional <span className="text-[#EF593E]">ATS</span><br />
                    Resume Builder
                  </h1>
                  <p className="text-base lg:text-lg text-slate-500 leading-relaxed">
                    Build professional, high-fidelity resumes designed to pass through Applicant Tracking Systems with ease.
                  </p>
                </div>
                <div className="upload-zone p-8 lg:p-10 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 bg-[#EF593E]/5 border-2 border-dashed border-[#EF593E]/20">
                  <p className="text-slate-500 font-medium text-sm">
                    Ready to build your next career move?
                  </p>
                  <Button 
                    className="bg-[#EF593E] hover:bg-[#D44D35] text-white font-semibold px-8 h-12 gap-2 text-base shadow-xl"
                    onClick={handleCreateResumeClick}
                  >
                    Start Building <FileText className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="relative hidden lg:block overflow-visible">
                <HeroIllustration />
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-slate-50/30">
          <div className="container mx-auto px-6 max-w-5xl space-y-8">
            <div className="text-center mb-16">
               <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">How it works</h2>
            </div>
            
            <div className="bg-white border border-slate-100 rounded-[32px] p-8 lg:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-sm transition-all hover:border-[#EF593E] mb-8">
              <div className="flex-1 space-y-6">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#EF593E]">Step 1</span>
                <h3 className="text-3xl font-black text-slate-900 leading-tight">Choose a professional template</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  Select from our library of ATS-optimized designs crafted by career experts.
                </p>
              </div>
              <div className="w-full lg:w-[400px] h-[200px] bg-slate-50 rounded-2xl flex items-center justify-center">
                <Layout className="h-12 w-12 text-slate-300" />
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-[32px] p-8 lg:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-sm transition-all hover:border-[#EF593E]">
              <div className="flex-1 space-y-6">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#EF593E]">Step 2</span>
                <h3 className="text-3xl font-black text-slate-900 leading-tight">Enter your professional details</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  Fill in your experience, skills, and education using our intuitive sidebar editor.
                </p>
              </div>
              <div className="w-full lg:w-[400px] h-[200px] bg-slate-50 rounded-2xl flex items-center justify-center">
                <MousePointer2 className="h-12 w-12 text-slate-300" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-100 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-1">
            <Logo size="sm" />
            <p className="text-[10px] text-slate-400 mt-2 font-medium tracking-tight uppercase">© 2024 Network Bulls. Where Careers Fly.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}