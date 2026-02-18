"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, Upload, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-resumes");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation */}
      <header className="px-6 h-20 flex items-center bg-white border-b border-gray-100 sticky top-0 z-50">
        <Link className="flex items-center gap-2" href="/">
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center font-bold text-white text-xl">r</div>
            <span className="text-xl font-bold tracking-tight text-slate-900">resume.ace</span>
          </div>
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
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 h-11 rounded-md">
              Create my resume
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 hero-gradient">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 max-w-xl">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                  Free AI <span className="text-accent">ATS</span><br />
                  Resume Checker
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed">
                  Is your resume good enough? Run 16 essential checks on your resume. It's fast, and free. High scores lead to more interviews.
                </p>
              </div>

              {/* Upload Zone */}
              <div className="upload-zone p-12 rounded-2xl flex flex-col items-center justify-center text-center space-y-6 bg-blue-50/30 border-2 border-dashed border-blue-200">
                <p className="text-slate-500 font-medium">
                  Drop your resume here or choose a file<br />
                  <span className="text-xs text-slate-400 font-normal">PDF & DOCX only (max 2MB)</span>
                </p>
                <Link href="/login">
                  <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 h-12 gap-2 text-base">
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
                  className="rounded-xl shadow-2xl rotate-3 translate-x-12 hover:rotate-0 transition-transform duration-500"
                  data-ai-hint="resume templates"
                />
                {/* Floating elements to mimic sparkles */}
                <div className="absolute -top-4 -right-4 text-accent animate-bounce">
                  <Sparkles className="h-8 w-8" />
                </div>
                <div className="absolute top-1/2 -left-8 text-primary/40">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div className="absolute bottom-12 right-0 bg-white p-3 rounded-lg shadow-xl flex items-center gap-2 border border-blue-100">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">ATS Optimized</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Teaser */}
        <section className="bg-slate-50 py-20">
          <div className="container mx-auto px-6 text-center space-y-12">
            <h2 className="text-3xl font-bold text-slate-900">A resume checker for every job</h2>
            
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

      <footer className="py-12 border-t border-slate-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-400">© 2024 ResumeAce AI. Part of the CareerAce network.</p>
          <div className="flex gap-8 text-sm font-medium text-slate-500">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
            <Link href="#" className="hover:text-primary">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}