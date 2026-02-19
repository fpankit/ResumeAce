
"use client";

import { useState, useEffect } from "react";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { studentResumeATSAnalysis, type StudentResumeATSAnalysisOutput } from "@/ai/flows/student-resume-ats-analysis";
import { collection, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Lightbulb, FileText, Loader2, LogOut, History, Zap, Check, CheckCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const BullIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C9.79 2 8 3.79 8 6C8 7.31 8.63 8.47 9.61 9.22C6.44 10.05 4 12.75 4 16V18H20V16C20 12.75 17.56 10.05 14.39 9.22C15.37 8.47 16 7.31 16 6C16 3.79 14.21 2 12 2ZM12 4C13.1 4 14 4.9 14 6C14 7.1 13.1 8 12 8C10.9 8 10 7.1 10 6C10 4.9 10.9 4 12 4ZM6.18 16C6.67 13.72 8.7 12 11.13 12H12.87C15.3 12 17.33 13.72 17.82 16H6.18Z" />
  </svg>
);

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-[#EF593E] flex items-center justify-center text-white overflow-hidden">
      <BullIcon className="w-7 h-7" />
    </div>
    <div className="flex flex-col -space-y-1">
      <div className="flex items-center gap-1">
        <span className="text-[#EF593E] font-black text-lg tracking-tighter uppercase">Network</span>
        <span className="text-[#44546A] font-black text-lg tracking-tighter uppercase">Bulls</span>
      </div>
    </div>
  </div>
);

const AnalysisStep = ({ label, isCompleted, isActive }: { label: string, isCompleted: boolean, isActive: boolean }) => (
  <div className={cn(
    "flex items-center gap-4 py-4 transition-all duration-500",
    isActive ? "opacity-100 scale-100" : isCompleted ? "opacity-100" : "opacity-40"
  )}>
    <div className={cn(
      "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
      isCompleted ? "bg-[#7c3aed]" : isActive ? "bg-[#7c3aed]/20 border-2 border-[#7c3aed]" : "bg-slate-200"
    )}>
      {isCompleted ? (
        <Check className="h-5 w-5 text-white" />
      ) : isActive ? (
        <div className="w-2 h-2 rounded-full bg-[#7c3aed] animate-pulse" />
      ) : null}
    </div>
    <span className={cn(
      "text-lg font-semibold tracking-tight",
      isCompleted || isActive ? "text-[#334155]" : "text-slate-400"
    )}>
      {label}
    </span>
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
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [result, setResult] = useState<StudentResumeATSAnalysisOutput | null>(null);

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

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) {
      toast({
        variant: "destructive",
        title: "Missing input",
        description: "Please provide both resume text and a job description.",
      });
      return;
    }

    setAnalyzing(true);
    setAnalysisStep(0);
    
    // Start AI analysis in background
    const analysisPromise = studentResumeATSAnalysis({ resumeText, jobDescription });

    // Sequentially show steps for visual effect
    const steps = [0, 1, 2, 3];
    for (const step of steps) {
      setAnalysisStep(step);
      await new Promise(r => setTimeout(r, 1500));
    }

    try {
      const analysisResult = await analysisPromise;
      setResult(analysisResult);

      // Save to Firebase under the user's specific subcollection
      await addDoc(collection(db, "users", user.uid, "resumeAnalyses"), {
        userId: user.uid,
        originalResumeText: resumeText,
        jobDescription: jobDescription,
        atsScore: analysisResult.atsScore,
        matchedKeywords: analysisResult.matchedKeywords,
        missingKeywords: analysisResult.missingKeywords,
        improvementSuggestions: analysisResult.improvementSuggestions,
        improvedResume: analysisResult.improvedResume,
        createdAt: serverTimestamp(),
      });

      toast({
        title: "Analysis complete",
        description: "Your results have been saved to your history.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: error.message,
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const analysisLabels = [
    "Parsing your resume",
    "Analyzing your experience",
    "Extracting your skills",
    "Generating recommendations"
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="px-6 h-16 flex items-center justify-between border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Logo />
          </Link>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Student Portal</Badge>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden md:inline-block font-medium">Welcome, {user.displayName || 'Student'}</span>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-primary">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 max-w-7xl">
        {analyzing ? (
          <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[600px]">
            {/* Sidebar UI matching the reference image */}
            <div className="w-full lg:w-80 bg-white rounded-[32px] p-8 shadow-sm flex flex-col items-center">
              <h3 className="text-xl font-bold text-[#334155] mb-8">Your Score</h3>
              
              {/* Gauge Placeholder */}
              <div className="relative w-40 h-20 mb-12">
                <svg viewBox="0 0 100 50" className="w-full h-full">
                  <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#f1f5f9" strokeWidth="8" strokeLinecap="round" />
                  <circle cx="50" cy="50" r="2" fill="#334155" />
                  <line x1="50" y1="50" x2="50" y2="10" stroke="#334155" strokeWidth="1" strokeLinecap="round" transform="rotate(-45 50 50)" />
                </svg>
                <div className="flex flex-col items-center mt-2 space-y-1">
                  <div className="w-12 h-2 bg-slate-100 rounded-full" />
                  <div className="w-16 h-2 bg-slate-100 rounded-full" />
                </div>
              </div>

              {/* Status Indicators */}
              <div className="w-full space-y-6 mb-12">
                {[
                  { label: "CONTENT", active: true },
                  { label: "SECTION", active: false },
                  { label: "ATS ESSENTIALS", active: false },
                  { label: "TAILORING", active: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 tracking-widest">{item.label}</span>
                    <div className={cn(
                      "w-8 h-4 rounded-full transition-colors",
                      item.active ? "bg-slate-200" : "bg-slate-100"
                    )} />
                  </div>
                ))}
              </div>

              <div className="mt-auto w-full">
                <div className="h-[1px] bg-slate-100 w-full mb-6" />
                <Button disabled className="w-full bg-slate-100 text-slate-400 font-bold py-6 rounded-xl border-none">
                  Unlock Full Report
                </Button>
              </div>
            </div>

            {/* Main Analysis Progress UI */}
            <div className="flex-1 bg-[#eef2ff] rounded-[32px] p-12 lg:p-24 shadow-inner flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full space-y-2">
                {analysisLabels.map((label, i) => (
                  <AnalysisStep 
                    key={label} 
                    label={label} 
                    isCompleted={analysisStep > i} 
                    isActive={analysisStep === i} 
                  />
                ))}
                <div className="pt-8 opacity-20">
                  <div className="h-[2px] bg-slate-400 w-full" />
                </div>
              </div>
            </div>
          </div>
        ) : (
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
              <div className="grid lg:grid-cols-2 gap-8">
                <section className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">AI Resume Analyzer</h2>
                    <p className="text-muted-foreground text-sm">Optimize your resume against specific job requirements in seconds.</p>
                  </div>

                  <Card className="border-gray-200 shadow-sm bg-white">
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 uppercase">Current Resume</label>
                        <Textarea 
                          placeholder="Paste your resume content here..." 
                          className="min-h-[250px] bg-slate-50 border-gray-100 resize-none focus:ring-primary text-sm"
                          value={resumeText}
                          onChange={(e) => setResumeText(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 uppercase">Target Job Description</label>
                        <Textarea 
                          placeholder="Paste the job listing requirements here..." 
                          className="min-h-[150px] bg-slate-50 border-gray-100 resize-none focus:ring-primary text-sm"
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                        />
                      </div>
                      <Button 
                        className="w-full h-12 text-lg font-bold bg-[#EF593E] hover:bg-[#D44D35] text-white shadow-lg shadow-primary/20" 
                        onClick={handleAnalyze}
                        disabled={analyzing}
                      >
                        Analyze ATS Compatibility
                      </Button>
                    </CardContent>
                  </Card>
                </section>

                <section className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">Analysis Engine</h2>
                    {!result && (
                      <p className="text-muted-foreground text-sm">Waiting for input. Paste your data to begin the scan.</p>
                    )}
                  </div>

                  {result && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <Card className="border-gray-200 shadow-xl overflow-hidden bg-white">
                        <CardHeader className="bg-slate-900 text-white border-b border-slate-800">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-[#EF593E]">ATS Score</CardTitle>
                              <CardDescription className="text-slate-400 font-medium">Match Level identified by AI</CardDescription>
                            </div>
                            <div className="text-5xl font-black text-white">{result.atsScore}%</div>
                          </div>
                          <Progress value={result.atsScore} className="h-2 mt-6 bg-slate-800" />
                        </CardHeader>
                        <CardContent className="p-0">
                          <Tabs defaultValue="findings" className="w-full">
                            <TabsList className="w-full flex justify-start border-b border-gray-100 bg-slate-50 rounded-none h-auto p-0">
                              <TabsTrigger value="findings" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:bg-white py-4 px-8 font-bold uppercase text-[10px] tracking-widest">Findings</TabsTrigger>
                              <TabsTrigger value="keywords" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:bg-white py-4 px-8 font-bold uppercase text-[10px] tracking-widest">Keywords</TabsTrigger>
                              <TabsTrigger value="improved" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:bg-white py-4 px-8 font-bold uppercase text-[10px] tracking-widest">AI Refinement</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="findings" className="p-8 space-y-6">
                              <div className="space-y-4">
                                <h4 className="flex items-center gap-2 font-black text-slate-900 uppercase text-xs tracking-wider">
                                  <Lightbulb className="h-4 w-4 text-[#EF593E]" /> Critical Suggestions
                                </h4>
                                <div className="grid gap-3">
                                  {result.improvementSuggestions.map((suggestion, i) => (
                                    <div key={i} className="flex gap-4 text-sm text-slate-600 p-4 rounded-xl bg-slate-50 border border-slate-100 group hover:border-[#EF593E]/30 transition-colors">
                                      <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0">{i+1}</div>
                                      <p className="font-medium">{suggestion}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="keywords" className="p-8 space-y-8">
                              <div className="space-y-4">
                                <h4 className="flex items-center gap-2 font-black text-green-600 uppercase text-xs tracking-wider">
                                  <CheckCircle2 className="h-4 w-4" /> Industry Terms Found
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {result.matchedKeywords.map((kw, i) => (
                                    <Badge key={i} variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1 font-bold">{kw}</Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-4">
                                <h4 className="flex items-center gap-2 font-black text-red-600 uppercase text-xs tracking-wider">
                                  <XCircle className="h-4 w-4" /> Missing Key Terms
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {result.missingKeywords.map((kw, i) => (
                                    <Badge key={i} variant="outline" className="bg-red-50 text-red-700 border-red-200 px-3 py-1 font-bold">{kw}</Badge>
                                  ))}
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="improved" className="p-0">
                              <div className="p-8 bg-slate-50/50">
                                <div className="flex justify-between items-center mb-6">
                                  <h4 className="flex items-center gap-2 font-black text-slate-900 uppercase text-xs tracking-widest">
                                    <FileText className="h-4 w-4 text-[#EF593E]" /> Optimized AI Draft
                                  </h4>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="font-bold text-[10px] uppercase tracking-tighter"
                                    onClick={() => {
                                      navigator.clipboard.writeText(result.improvedResume);
                                      toast({ title: "Copied!", description: "Improved text copied to clipboard." });
                                    }}
                                  >
                                    Copy to Clipboard
                                  </Button>
                                </div>
                                <div className="bg-white p-8 rounded-2xl border border-slate-200 whitespace-pre-wrap text-sm text-slate-600 leading-relaxed max-h-[500px] overflow-y-auto shadow-inner">
                                  {result.improvedResume}
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </section>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">Analysis History</h2>
                <p className="text-muted-foreground text-sm">Review your previous ATS scores and AI-generated refinements.</p>
              </div>

              {isHistoryLoading ? (
                <div className="flex py-20 justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>
              ) : history && history.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {history.map((analysis: any) => (
                    <Card key={analysis.id} className="border-gray-200 hover:border-[#EF593E] transition-all hover:shadow-lg bg-white group cursor-pointer" onClick={() => {
                      setResult({
                        atsScore: analysis.atsScore,
                        matchedKeywords: analysis.matchedKeywords,
                        missingKeywords: analysis.missingKeywords,
                        improvementSuggestions: analysis.improvementSuggestions,
                        improvedResume: analysis.improvedResume
                      });
                      document.querySelector('[data-value="analyze"]')?.dispatchEvent(new MouseEvent('click', {bubbles: true}));
                    }}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge className="bg-[#EF593E] text-white font-black">{analysis.atsScore}%</Badge>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">{analysis.createdAt?.toDate().toLocaleDateString()}</span>
                        </div>
                        <CardTitle className="text-sm font-black uppercase text-slate-700 mt-4 line-clamp-1">Analysis Record</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-slate-500 line-clamp-2 italic">"{analysis.jobDescription.substring(0, 100)}..."</p>
                        <div className="mt-4 flex items-center text-[10px] font-black text-[#EF593E] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                          View Details →
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-dashed border-2 py-20 bg-transparent flex flex-col items-center justify-center text-center space-y-4">
                  <History className="h-12 w-12 text-slate-300" />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-600">No history found</p>
                    <p className="text-sm text-slate-400">Run your first analysis to see it stored here.</p>
                  </div>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}
