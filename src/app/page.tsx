"use client";

import { useAuth } from "@/components/auth-context";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push(role === 'admin' ? '/dashboard/admin' : '/dashboard/student');
    }
  }, [user, role, loading, router]);

  if (loading) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-white/10 sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-primary-foreground">R</div>
          <span className="text-xl font-bold tracking-tight">ResumeAce</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/login">
            Login
          </Link>
          <Link className="text-sm font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity" href="/login?tab=signup">
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-headline">
                  Master the <span className="text-primary">ATS</span>. Land Your Dream Job.
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Get real-time feedback on your resume using industry-leading AI analysis. Optimize for specific job descriptions and outshine other candidates.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/login">
                  <Button size="lg" className="px-8 bg-primary hover:bg-primary/90">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 p-6 rounded-xl border border-white/10 bg-background">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">AI ATS Scoring</h3>
                <p className="text-center text-muted-foreground">
                  Get a comprehensive score based on real-world applicant tracking system algorithms.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 rounded-xl border border-white/10 bg-background">
                <div className="p-3 rounded-full bg-accent/10 text-accent">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Keyword Optimization</h3>
                <p className="text-center text-muted-foreground">
                  Identify exactly which keywords are missing from your resume that recruiters are looking for.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 rounded-xl border border-white/10 bg-background">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Actionable Feedback</h3>
                <p className="text-center text-muted-foreground">
                  Receive detailed suggestions on how to rewrite specific sections of your resume.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-white/10">
        <p className="text-xs text-muted-foreground">© 2024 ResumeAce AI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}