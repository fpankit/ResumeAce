"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-context";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { studentResumeATSAnalysis, type StudentResumeATSAnalysisOutput } from "@/ai/flows/student-resume-ats-analysis";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Lightbulb, FileText, Loader2, LogOut, Label } from "lucide-react";

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
  const { user, role, loading: authLoading } = useAuth();
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<StudentResumeATSAnalysisOutput | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  if (authLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;
  if (!user || role !== 'student') {
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
    setResult(null);

    try {
      const analysisResult = await studentResumeATSAnalysis({ resumeText, jobDescription });
      setResult(analysisResult);

      await addDoc(collection(db, "resumes"), {
        userId: user.uid,
        userName: user.displayName,
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
        description: "Your resume has been analyzed and saved.",
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
    <div className="min-h-screen bg-background">
      <header className="px-6 h-16 flex items-center justify-between border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Logo />
          </Link>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Student</Badge>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden md:inline-block font-medium">Welcome, {user.displayName}</span>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-primary">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8">
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">Resume Input</h2>
              <p className="text-muted-foreground text-sm">Paste your current resume and the job description you're targeting.</p>
            </div>

            <Card className="border-gray-100 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase">Your Resume Text</label>
                  <Textarea 
                    placeholder="Copy and paste your resume text here..." 
                    className="min-h-[250px] bg-slate-50/50 border-gray-100 resize-none focus:ring-primary"
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase">Job Description</label>
                  <Textarea 
                    placeholder="Paste the target job description here..." 
                    className="min-h-[150px] bg-slate-50/50 border-gray-100 resize-none focus:ring-primary"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20" 
                  onClick={handleAnalyze}
                  disabled={analyzing}
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing with AI...
                    </>
                  ) : (
                    "Analyze My Resume"
                  )}
                </Button>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">Analysis Result</h2>
              {!result && !analyzing && (
                <p className="text-muted-foreground text-sm">Results will appear here once you run the analysis.</p>
              )}
            </div>

            {analyzing && (
              <Card className="border-gray-100 shadow-sm animate-pulse h-full min-h-[500px] flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground font-medium">Generating professional insights...</p>
              </Card>
            )}

            {result && !analyzing && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="border-gray-100 shadow-lg overflow-hidden">
                  <CardHeader className="bg-primary/5 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-bold uppercase text-slate-900">ATS Score</CardTitle>
                        <CardDescription>Estimated matching probability</CardDescription>
                      </div>
                      <div className="text-4xl font-black text-primary">{result.atsScore}%</div>
                    </div>
                    <Progress value={result.atsScore} className="h-3 mt-4 bg-slate-100" />
                  </CardHeader>
                  <CardContent className="p-0">
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="w-full flex justify-start border-b border-gray-100 bg-transparent rounded-none h-auto p-0">
                        <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary py-3 px-6 font-bold uppercase text-xs">Overview</TabsTrigger>
                        <TabsTrigger value="keywords" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary py-3 px-6 font-bold uppercase text-xs">Keywords</TabsTrigger>
                        <TabsTrigger value="improved" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary py-3 px-6 font-bold uppercase text-xs">Improved Resume</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="overview" className="p-6 space-y-6">
                        <div className="space-y-4">
                          <h4 className="flex items-center gap-2 font-bold text-accent uppercase text-sm tracking-tighter">
                            <Lightbulb className="h-4 w-4" /> Improvement Suggestions
                          </h4>
                          <ul className="grid gap-2">
                            {result.improvementSuggestions.map((suggestion, i) => (
                              <li key={i} className="flex gap-2 text-sm text-slate-600 p-3 rounded-lg bg-slate-50 border border-gray-100">
                                <span className="text-primary shrink-0">•</span>
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TabsContent>

                      <TabsContent value="keywords" className="p-6 space-y-6">
                        <div className="grid gap-6">
                          <div className="space-y-3">
                            <h4 className="flex items-center gap-2 font-bold text-green-600 uppercase text-sm tracking-tighter">
                              <CheckCircle2 className="h-4 w-4" /> Matched Keywords
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {result.matchedKeywords.map((kw, i) => (
                                <Badge key={i} variant="outline" className="bg-green-50 text-green-600 border-green-200">{kw}</Badge>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-3">
                            <h4 className="flex items-center gap-2 font-bold text-red-600 uppercase text-sm tracking-tighter">
                              <XCircle className="h-4 w-4" /> Missing Keywords
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {result.missingKeywords.map((kw, i) => (
                                <Badge key={i} variant="outline" className="bg-red-50 text-red-600 border-red-200">{kw}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="improved" className="p-0">
                        <div className="p-6 bg-slate-50/50">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="flex items-center gap-2 font-bold text-slate-900 uppercase text-sm">
                              <FileText className="h-4 w-4" /> Professional Version
                            </h4>
                            <Button variant="outline" size="sm" className="font-bold text-xs" onClick={() => {
                              navigator.clipboard.writeText(result.improvedResume);
                              toast({ title: "Copied!", description: "Improved resume text copied to clipboard." });
                            }}>Copy Text</Button>
                          </div>
                          <div className="bg-white p-6 rounded-lg border border-gray-200 whitespace-pre-wrap text-sm text-slate-600 resume-preview max-h-[400px] overflow-y-auto shadow-inner">
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
      </main>
    </div>
  );
}
