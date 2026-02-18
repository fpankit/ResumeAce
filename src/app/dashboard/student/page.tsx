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
import { CheckCircle2, XCircle, Lightbulb, FileText, Loader2, LogOut, LayoutDashboard } from "lucide-react";

export default function StudentDashboard() {
  const { user, role, loading: authLoading } = useAuth();
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<StudentResumeATSAnalysisOutput | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  if (authLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;
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

      // Save to Firestore
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
      <header className="px-6 h-16 flex items-center justify-between border-b border-white/10 bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-primary-foreground">R</div>
            <span className="font-bold hidden sm:inline-block">ResumeAce</span>
          </div>
          <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20">Student</Badge>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden md:inline-block">Welcome, {user.displayName}</span>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Resume Input</h2>
              <p className="text-muted-foreground text-sm">Paste your current resume and the job description you're targeting.</p>
            </div>

            <Card className="border-white/10 bg-card/30">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label>Your Resume Text</Label>
                  <Textarea 
                    placeholder="Copy and paste your resume text here..." 
                    className="min-h-[250px] bg-background/50 border-white/5 resize-none focus:ring-primary"
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Job Description</Label>
                  <Textarea 
                    placeholder="Paste the target job description here..." 
                    className="min-h-[150px] bg-background/50 border-white/5 resize-none focus:ring-primary"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90" 
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

          {/* Results Section */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Analysis Result</h2>
              {!result && !analyzing && (
                <p className="text-muted-foreground text-sm">Results will appear here once you run the analysis.</p>
              )}
            </div>

            {analyzing && (
              <Card className="border-white/10 bg-card/30 animate-pulse h-full min-h-[500px] flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Generating professional insights...</p>
              </Card>
            )}

            {result && !analyzing && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="border-white/10 bg-card/30 overflow-hidden">
                  <CardHeader className="bg-primary/10 border-b border-white/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">ATS Score</CardTitle>
                        <CardDescription>Estimated matching probability</CardDescription>
                      </div>
                      <div className="text-4xl font-bold text-primary">{result.atsScore}%</div>
                    </div>
                    <Progress value={result.atsScore} className="h-3 mt-4 bg-muted" />
                  </CardHeader>
                  <CardContent className="p-0">
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="w-full flex justify-start border-b border-white/5 bg-transparent rounded-none h-auto p-0">
                        <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary py-3 px-6">Overview</TabsTrigger>
                        <TabsTrigger value="keywords" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary py-3 px-6">Keywords</TabsTrigger>
                        <TabsTrigger value="improved" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary py-3 px-6">Improved Resume</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="overview" className="p-6 space-y-6">
                        <div className="space-y-4">
                          <h4 className="flex items-center gap-2 font-semibold text-accent">
                            <Lightbulb className="h-4 w-4" /> Improvement Suggestions
                          </h4>
                          <ul className="grid gap-2">
                            {result.improvementSuggestions.map((suggestion, i) => (
                              <li key={i} className="flex gap-2 text-sm text-muted-foreground p-3 rounded-lg bg-white/5">
                                <span className="text-accent shrink-0">•</span>
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TabsContent>

                      <TabsContent value="keywords" className="p-6 space-y-6">
                        <div className="grid gap-6">
                          <div className="space-y-3">
                            <h4 className="flex items-center gap-2 font-semibold text-green-400">
                              <CheckCircle2 className="h-4 w-4" /> Matched Keywords
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {result.matchedKeywords.map((kw, i) => (
                                <Badge key={i} variant="outline" className="bg-green-400/10 text-green-400 border-green-400/20">{kw}</Badge>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-3">
                            <h4 className="flex items-center gap-2 font-semibold text-red-400">
                              <XCircle className="h-4 w-4" /> Missing Keywords
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {result.missingKeywords.map((kw, i) => (
                                <Badge key={i} variant="outline" className="bg-red-400/10 text-red-400 border-red-400/20">{kw}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="improved" className="p-0">
                        <div className="p-6 bg-muted/30">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="flex items-center gap-2 font-semibold">
                              <FileText className="h-4 w-4" /> Professional Version
                            </h4>
                            <Button variant="outline" size="sm" onClick={() => {
                              navigator.clipboard.writeText(result.improvedResume);
                              toast({ title: "Copied!", description: "Improved resume text copied to clipboard." });
                            }}>Copy Text</Button>
                          </div>
                          <div className="bg-background p-6 rounded-lg border border-white/5 whitespace-pre-wrap text-sm text-muted-foreground resume-preview max-h-[400px] overflow-y-auto">
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

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>{children}</label>;
}