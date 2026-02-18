"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-context";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, FileText, TrendingUp, Clock, LogOut, Loader2, BarChart3 } from "lucide-react";

interface Stats {
  totalUsers: number;
  totalAnalyses: number;
  avgScore: number;
}

interface Activity {
  id: string;
  userName: string;
  atsScore: number;
  createdAt: any;
}

export default function AdminDashboard() {
  const { user, role, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({ totalUsers: 0, totalAnalyses: 0, avgScore: 0 });
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && (!user || role !== 'admin')) {
      router.push("/login");
    }
  }, [user, role, authLoading, router]);

  useEffect(() => {
    async function fetchData() {
      if (role !== 'admin') return;

      try {
        const usersSnap = await getDocs(collection(db, "users"));
        const analysesSnap = await getDocs(collection(db, "resumes"));
        
        const totalAnalyses = analysesSnap.size;
        let totalScore = 0;
        analysesSnap.forEach(doc => {
          totalScore += doc.data().atsScore || 0;
        });

        setStats({
          totalUsers: usersSnap.size,
          totalAnalyses,
          avgScore: totalAnalyses > 0 ? Math.round(totalScore / totalAnalyses) : 0
        });

        // Get recent activity
        const q = query(collection(db, "resumes"), orderBy("createdAt", "desc"), limit(10));
        const qSnap = await getDocs(q);
        const activities: Activity[] = [];
        qSnap.forEach(doc => {
          const data = doc.data();
          activities.push({
            id: doc.id,
            userName: data.userName || "Unknown",
            atsScore: data.atsScore,
            createdAt: data.createdAt?.toDate() || new Date(),
          });
        });
        setRecentActivity(activities);

      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading && role === 'admin') {
      fetchData();
    }
  }, [authLoading, role]);

  if (authLoading || loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 h-16 flex items-center justify-between border-b border-white/10 bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-bold text-accent-foreground">R</div>
            <span className="font-bold">ResumeAce Admin</span>
          </div>
          <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/20">Admin</Badge>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 max-w-7xl space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">System Insights</h1>
          <p className="text-muted-foreground">Monitor system-wide resume analysis metrics and user growth.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-white/10 bg-card/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">+20% from last month</p>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-card/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resume Analyses</CardTitle>
              <FileText className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAnalyses}</div>
              <p className="text-xs text-muted-foreground">+180 new today</p>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-card/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. ATS Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgScore}%</div>
              <p className="text-xs text-muted-foreground">Global user average</p>
            </CardContent>
          </Card>
        </div>

        {/* Activity Table */}
        <Card className="border-white/10 bg-card/30">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Student</TableHead>
                  <TableHead className="text-muted-foreground">ATS Score</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((activity) => (
                  <TableRow key={activity.id} className="border-white/5 hover:bg-white/5 transition-colors">
                    <TableCell className="font-medium">{activity.userName}</TableCell>
                    <TableCell>
                      <span className={`font-bold ${activity.atsScore > 70 ? 'text-green-400' : 'text-primary'}`}>
                        {activity.atsScore}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Analyzed</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {activity.createdAt.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                {recentActivity.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">No recent activity found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}