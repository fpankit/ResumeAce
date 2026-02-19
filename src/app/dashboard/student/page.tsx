
"use client";

import { useState } from "react";
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
import { CheckCircle2, XCircle, Lightbulb, FileText, Loader2, LogOut, History, Zap } from "lucide-react";
import Link from "next/link";

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

export default function StudentDashboard() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
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
    try {
      const analysisResult = await studentResumeATSAnalysis({ resumeText, jobDescription });
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
                      {analyzing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Running AI Diagnostics...
                        </>
                      ) : (
                        "Analyze ATS Compatibility"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </section>

              <section className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">Analysis Engine</h2>
                  {!result && !analyzing && (
                    <p className="text-muted-foreground text-sm">Waiting for input. Paste your data to begin the scan.</p>
                  )}
                </div>

                {analyzing && (
                  <Card className="border-gray-200 shadow-sm animate-pulse h-full min-h-[500px] flex flex-col items-center justify-center space-y-4 bg-white">
                    <div className="relative w-24 h-24">
                      <Loader2 className="h-24 w-24 animate-spin text-[#EF593E] opacity-20" />
                      <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-[#EF593E]" />
                    </div>
                    <p className="text-slate-500 font-bold uppercase tracking-tighter">AI is scanning your profile...</p>
                  </Card>
                )}

                {result && !analyzing && (
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
      </main>
    </div>
  );
}
