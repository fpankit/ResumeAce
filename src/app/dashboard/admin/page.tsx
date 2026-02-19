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
import { Users, FileText, TrendingUp, Clock, LogOut, Loader2 } from "lucide-react";
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

  if (authLoading || loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="px-6 h-16 flex items-center justify-between border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Logo />
          </Link>
          <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">Admin</Badge>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-primary">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 max-w-7xl space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">System Insights</h1>
          <p className="text-muted-foreground font-medium">Monitor system-wide resume analysis metrics and user growth.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-gray-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold uppercase text-slate-500 tracking-wider">Total Users</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-900">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">+20% from last month</p>
            </CardContent>
          </Card>
          <Card className="border-gray-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold uppercase text-slate-500 tracking-wider">Resume Analyses</CardTitle>
              <FileText className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-900">{stats.totalAnalyses}</div>
              <p className="text-xs text-muted-foreground">+180 new today</p>
            </CardContent>
          </Card>
          <Card className="border-gray-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold uppercase text-slate-500 tracking-wider">Avg. ATS Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-900">{stats.avgScore}%</div>
              <p className="text-xs text-muted-foreground">Global user average</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gray-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 mb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-bold uppercase text-slate-900">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-100 hover:bg-transparent">
                  <TableHead className="text-slate-500 font-bold uppercase text-xs">Student</TableHead>
                  <TableHead className="text-slate-500 font-bold uppercase text-xs">ATS Score</TableHead>
                  <TableHead className="text-slate-500 font-bold uppercase text-xs">Status</TableHead>
                  <TableHead className="text-slate-500 font-bold uppercase text-xs">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((activity) => (
                  <TableRow key={activity.id} className="border-gray-50 hover:bg-slate-50/50 transition-colors">
                    <TableCell className="font-bold text-slate-700">{activity.userName}</TableCell>
                    <TableCell>
                      <span className={`font-black ${activity.atsScore > 70 ? 'text-green-500' : 'text-primary'}`}>
                        {activity.atsScore}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/10 font-bold text-[10px] uppercase">Analyzed</Badge>
                    </TableCell>
                    <TableCell className="text-slate-400 text-xs font-medium">
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
