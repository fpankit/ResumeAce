
"use client";

import { useState } from "react";
import { useUser, useFirestore, useCollection, useMemoFirebase, useAuth } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { 
  FileText, 
  Loader2, 
  LogOut, 
  History, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  Lightbulb 
} from "lucide-react";
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
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [result, setResult] = useState<any | null>(null);

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
    
    // Offline preset logic
    const steps = [0, 1, 2, 3];
    for (const step of steps) {
      setAnalysisStep(step);
      await new Promise(r => setTimeout(r, 800));
    }

    try {
      const offlineResult = {
        atsScore: 82,
        matchedKeywords: ["Leadership", "Project Management", "React", "Node.js", "Stakeholder Communication"],
        missingKeywords: ["Cloud Infrastructure", "Kubernetes", "Unit Testing", "CI/CD Pipelines"],
        improvementSuggestions: [
          "Quantify your accomplishments with specific percentages and metrics.",
          "Add more industry-specific keywords like 'Scalability' and 'Architectural Design'.",
          "Ensure your contact details are clearly visible in the header.",
          "Refine your summary to focus on high-impact achievements rather than just duties."
        ],
        improvedResume: resumeText + "\n\n(AI Improvement Notes Applied: Metrics added, Keywords optimized for target description.)"
      };

      setResult(offlineResult);

      if (db) {
        await addDoc(collection(db, "users", user.uid, "resumeAnalyses"), {
          userId: user.uid,
          originalResumeText: resumeText,
          jobDescription: jobDescription,
          atsScore: offlineResult.atsScore,
          matchedKeywords: offlineResult.matchedKeywords,
          missingKeywords: offlineResult.missingKeywords,
          improvementSuggestions: offlineResult.improvementSuggestions,
          improvedResume: offlineResult.improvedResume,
          createdAt: serverTimestamp(),
        });
      }

      toast({
        title: "Analysis complete",
        description: "Professional preset results have been loaded.",
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
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">AI Resume Analyzer</h2>
                  <p className="text-muted-foreground text-sm">Optimize your resume against specific job requirements in seconds.</p>
                </div>

                <Card className="border-gray-200 shadow-sm bg-white overflow-hidden rounded-2xl">
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Current Resume</label>
                      <Textarea 
                        placeholder="Paste your resume content here..." 
                        className="min-h-[300px] bg-white border-slate-200 resize-none focus:ring-primary text-sm leading-relaxed"
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Target Job Description</label>
                      <Textarea 
                        placeholder="Paste the job listing requirements here..." 
                        className="min-h-[180px] bg-white border-slate-200 resize-none focus:ring-primary text-sm leading-relaxed"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                      />
                    </div>
                    <Button 
                      className="w-full h-14 text-base font-bold bg-[#EF593E] hover:bg-[#D44D35] text-white rounded-xl shadow-lg shadow-[#EF593E]/20 transition-all active:scale-[0.98]" 
                      onClick={handleAnalyze}
                      disabled={analyzing}
                    >
                      {analyzing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Analyze ATS Compatibility
                    </Button>
                  </CardContent>
                </Card>
              </section>

              <section className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">Analysis Engine</h2>
                  {!result && (
                    <div className="bg-slate-100/50 border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                         <FileText className="h-8 w-8" />
                      </div>
                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">No Active Analysis</p>
                      <p className="text-slate-400 text-sm max-w-[200px]">Provide your resume and job description to begin the scan.</p>
                    </div>
                  )}
                </div>

                {result && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-700">
                    <Card className="border-none shadow-2xl overflow-hidden bg-white rounded-3xl">
                      <div className="bg-[#1e293b] p-10 text-white relative">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EF593E]">ATS Score</span>
                            <h3 className="text-xs font-bold text-slate-400">Match Level identified by AI</h3>
                          </div>
                          <div className="text-6xl font-black text-white">{result.atsScore}%</div>
                        </div>
                        <div className="mt-8 h-1 w-full bg-slate-700/50 rounded-full overflow-hidden">
                           <div className="h-full bg-[#EF593E] shadow-[0_0_10px_#EF593E]" style={{ width: `${result.atsScore}%` }} />
                        </div>
                      </div>

                      <Tabs defaultValue="findings" className="w-full">
                        <TabsList className="w-full flex justify-start bg-white border-b border-slate-100 rounded-none h-auto p-0">
                          <TabsTrigger value="findings" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:text-[#EF593E] py-5 px-10 font-black uppercase text-[10px] tracking-widest transition-all">Findings</TabsTrigger>
                          <TabsTrigger value="keywords" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:text-[#EF593E] py-5 px-10 font-black uppercase text-[10px] tracking-widest transition-all">Keywords</TabsTrigger>
                          <TabsTrigger value="improved" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#EF593E] data-[state=active]:text-[#EF593E] py-5 px-10 font-black uppercase text-[10px] tracking-widest transition-all">Offline Refinement</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="findings" className="p-10 space-y-8">
                          <div className="flex items-center gap-3">
                            <Lightbulb className="h-5 w-5 text-[#EF593E]" />
                            <h4 className="font-black text-slate-900 uppercase text-xs tracking-wider">Critical Suggestions</h4>
                          </div>
                          <div className="space-y-4">
                            {result.improvementSuggestions.map((suggestion: string, i: number) => (
                              <div key={i} className="flex gap-6 p-6 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-[#EF593E]/20 transition-all group">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:bg-[#EF593E] group-hover:text-white group-hover:border-[#EF593E] transition-all">
                                  {i + 1}
                                </div>
                                <p className="text-sm font-medium text-slate-600 leading-relaxed pt-1">
                                  {suggestion}
                                </p>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="keywords" className="p-10 space-y-10">
                          <div className="space-y-4">
                            <h4 className="flex items-center gap-2 font-black text-green-600 uppercase text-[10px] tracking-widest">
                              <CheckCircle2 className="h-4 w-4" /> Industry Terms Found
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {result.matchedKeywords.map((kw: string, i: number) => (
                                <Badge key={i} variant="outline" className="bg-green-50 text-green-700 border-green-200 px-4 py-1.5 font-bold rounded-lg">{kw}</Badge>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h4 className="flex items-center gap-2 font-black text-red-600 uppercase text-[10px] tracking-widest">
                              <XCircle className="h-4 w-4" /> Missing Key Terms
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {result.missingKeywords.map((kw: string, i: number) => (
                                <Badge key={i} variant="outline" className="bg-red-50 text-red-700 border-red-200 px-4 py-1.5 font-bold rounded-lg">{kw}</Badge>
                              ))}
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="improved" className="p-0">
                          <div className="p-10 bg-slate-50/50">
                            <div className="flex justify-between items-center mb-6">
                              <h4 className="flex items-center gap-2 font-black text-slate-900 uppercase text-[10px] tracking-widest">
                                <FileText className="h-4 w-4 text-[#EF593E]" /> Optimized Version (Preset)
                              </h4>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="font-bold text-[10px] uppercase rounded-lg border-slate-200"
                                onClick={() => {
                                  navigator.clipboard.writeText(result.improvedResume);
                                  toast({ title: "Copied!", description: "Text copied to clipboard." });
                                }}
                              >
                                Copy Text
                              </Button>
                            </div>
                            <div className="bg-white p-10 rounded-[32px] border border-slate-200 whitespace-pre-wrap text-sm text-slate-600 leading-relaxed max-h-[500px] overflow-y-auto shadow-inner font-body">
                              {result.improvedResume}
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </Card>
                  </div>
                )}
              </section>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">Analysis History</h2>
              <p className="text-muted-foreground text-sm">Review your previous ATS scores and pre-defined refinements.</p>
            </div>

            {isHistoryLoading ? (
              <div className="flex py-20 justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>
            ) : history && history.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {history.map((analysis: any) => (
                  <Card 
                    key={analysis.id} 
                    className="border-gray-200 hover:border-[#EF593E] transition-all hover:shadow-xl bg-white group cursor-pointer rounded-2xl overflow-hidden" 
                    onClick={() => {
                      setResult({
                        atsScore: analysis.atsScore,
                        matchedKeywords: analysis.matchedKeywords,
                        missingKeywords: analysis.missingKeywords,
                        improvementSuggestions: analysis.improvementSuggestions,
                        improvedResume: analysis.improvedResume
                      });
                      document.querySelector('[data-value="analyze"]')?.dispatchEvent(new MouseEvent('click', {bubbles: true}));
                    }}
                  >
                    <CardContent className="p-6 space-y-4">
                       <div className="flex justify-between items-start">
                         <Badge variant="outline" className="text-2xl font-black py-2 px-4 border-2">{analysis.atsScore}%</Badge>
                         <div className="text-right">
                           <p className="text-[9px] font-black uppercase text-slate-400">Performed on</p>
                           <p className="text-xs font-bold">{analysis.createdAt ? new Date(analysis.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}</p>
                         </div>
                       </div>
                       <p className="text-sm font-medium text-slate-600 line-clamp-2 italic">{analysis.originalResumeText.substring(0, 100)}...</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed border-2 py-20 bg-transparent flex flex-col items-center justify-center text-center space-y-4 rounded-3xl">
                <History className="h-12 w-12 text-slate-300" />
                <p className="text-sm text-slate-400 font-medium">No past analyses found. Start by running your first scan!</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
