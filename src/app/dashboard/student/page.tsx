"use client";

import { useState } from "react";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { collection, query, orderBy } from "firebase/firestore";
import { useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "navigation";
import { FileText, Loader2, LogOut, History, Zap } from "lucide-react";
import Link from "next/link";

const FlameIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2C12 2 17 6.5 17 11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11C7 6.5 12 2 12 2Z" fill="url(#flame-grad-top-dash)" />
    <path d="M12 22C12 22 18 16.5 18 12C18 10.5 17 9 15.5 8.5C14 8 13 8.5 12 9.5C11 8.5 10 8 8.5 8.5C7 9 6 10.5 6 12C6 16.5 12 22 12 22Z" fill="url(#flame-grad-bottom-dash)" opacity="0.9" />
    <defs>
      <linearGradient id="flame-grad-top-dash" x1="12" y1="2" x2="12" y2="16" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF5C00" />
        <stop offset="1" stopColor="#FFB800" />
      </linearGradient>
      <linearGradient id="flame-grad-bottom-dash" x1="12" y1="8" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFB800" />
        <stop offset="0.5" stopColor="#FF5C00" />
        <stop offset="1" stopColor="#FF005C" />
      </linearGradient>
    </defs>
  </svg>
);

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center overflow-hidden border border-slate-100 shadow-sm">
      <FlameIcon className="w-6 h-6" />
    </div>
    <div className="flex flex-col -space-y-1">
      <div className="flex items-center gap-1">
        <span className="text-[#EF593E] font-black text-lg tracking-tighter uppercase">Network</span>
        <span className="text-[#44546A] font-black text-lg tracking-tighter uppercase">Bulls</span>
      </div>
    </div>
  </div>
);

export default function StudentDashboard() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const historyQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(
      collection(db, "users", user.uid, "resumeAnalyses"),
      orderBy("createdAt", "desc")
    );
  }, [db, user]);

  const { data: history, isLoading: isHistoryLoading } = useCollection(historyQuery);

  if (isUserLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;
  if (!user) {
    router.push("/login");
    return null;
  }

  const handleAnalyze = () => {
    toast({
      title: "Feature Unavailable",
      description: "AI Analysis is currently disabled.",
    });
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="px-6 h-16 flex items-center justify-between border-b border-gray-100 bg-white sticky top-0 z-50 no-print">
        <div className="flex items-center gap-4">
          <Link href="/"><Logo /></Link>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Student Portal</Badge>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-primary">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 max-w-7xl">
        <Tabs defaultValue="analyze" className="space-y-8">
          <TabsList className="bg-white border border-gray-200 p-1 shadow-sm">
            <TabsTrigger value="analyze" className="gap-2 font-bold uppercase text-xs px-6">
              <Zap className="h-4 w-4" /> New Analysis
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2 font-bold uppercase text-xs px-6">
              <History className="h-4 w-4" /> Past Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyze" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <section className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">Resume Analyzer</h2>
                  <p className="text-muted-foreground text-sm">Optimize your resume against specific job requirements.</p>
                </div>

                <Card className="border-gray-200 shadow-sm bg-white overflow-hidden rounded-2xl">
                  <CardContent className="p-8 space-y-6">
                    <Textarea 
                      placeholder="Paste your resume content here..." 
                      className="min-h-[300px] bg-white border-slate-200"
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                    />
                    <Textarea 
                      placeholder="Paste the job listing requirements here..." 
                      className="min-h-[180px] bg-white border-slate-200"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                    <Button 
                      className="w-full h-14 text-base font-bold bg-[#EF593E] hover:bg-[#D44D35] text-white rounded-xl shadow-lg" 
                      onClick={handleAnalyze}
                    >
                      Analyze Compatibility (Disabled)
                    </Button>
                  </CardContent>
                </Card>
              </section>

              <section className="space-y-6">
                <div className="bg-slate-100/50 border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                     <FileText className="h-8 w-8" />
                  </div>
                  <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Analysis Engine Unavailable</p>
                </div>
              </section>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            {isHistoryLoading ? (
              <div className="flex py-20 justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>
            ) : (
              <Card className="border-dashed border-2 py-20 bg-transparent flex flex-col items-center justify-center text-center space-y-4 rounded-3xl">
                <History className="h-12 w-12 text-slate-300" />
                <p className="text-sm text-slate-400">History feature is temporarily suspended.</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
