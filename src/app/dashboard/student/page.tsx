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
import { useRouter } from "next/navigation";
import { FileText, Loader2, LogOut, History, Zap } from "lucide-react";
import Link from "next/link";

const Logo = () => (
  <div className="flex flex-col -space-y-1 group">
    <div className="flex items-center gap-1">
      <span className="text-[#EF593E] font-black text-lg tracking-tighter uppercase">Network</span>
      <span className="text-[#334155] font-black text-lg tracking-tighter uppercase">Bulls</span>
    </div>
    <div className="flex items-center gap-1">
      <div className="h-[1px] flex-1 bg-slate-200" />
      <span className="text-[7px] text-[#EF593E] font-bold tracking-[0.2em] uppercase whitespace-nowrap">Where Careers Fly</span>
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
                      disabled
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
