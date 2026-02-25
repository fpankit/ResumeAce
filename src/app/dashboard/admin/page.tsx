"use client";

import { useEffect, useState } from "react";
import { useUser, useFirestore, useCollection, useMemoFirebase, useAuth } from "@/firebase";
import { useRouter } from "next/navigation";
import { collection, query, limit, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, FileText, TrendingUp, LogOut, Loader2, ShieldCheck } from "lucide-react";
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

export default function AdminDashboard() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();

  const usersQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "users"), limit(50));
  }, [db]);

  const { data: users, isLoading: isUsersLoading } = useCollection(usersQuery);

  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    async function checkAdminStatus() {
      if (!user || !db) return;
      try {
        await getDocs(query(collection(db, "roles_admin")));
        setIsAdmin(true);
      } catch (e) {
        setIsAdmin(false);
      } finally {
        setCheckingAdmin(false);
      }
    }

    if (!isUserLoading) {
      if (!user) {
        router.push("/login");
      } else {
        checkAdminStatus();
      }
    }
  }, [user, isUserLoading, db, router]);

  if (isUserLoading || checkingAdmin || isUsersLoading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;
  }

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="px-6 h-16 flex items-center justify-between border-b border-gray-200 bg-white sticky top-0 z-50 no-print">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Logo />
          </Link>
          <Badge variant="secondary" className="bg-slate-900 text-white border-none font-black uppercase text-[10px] tracking-widest px-3">Admin Console</Badge>
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
          <p className="text-muted-foreground font-medium">Global analytics for Network Bulls resume ecosystem.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-gray-200 shadow-sm bg-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5"><Users className="h-16 w-16" /></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">{users?.length || 0}</div>
              <p className="text-xs text-green-600 font-bold mt-1">+12% growth</p>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200 shadow-sm bg-white overflow-hidden relative">
             <div className="absolute top-0 right-0 p-4 opacity-5"><FileText className="h-16 w-16" /></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Analyses Run</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-[#EF593E]">482</div>
              <p className="text-xs text-slate-400 font-medium mt-1">Across all users</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm bg-white overflow-hidden relative text-white bg-slate-900">
             <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingUp className="h-16 w-16" /></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Global Avg Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-[#EF593E]">74%</div>
              <p className="text-xs text-slate-500 font-medium mt-1">Target range: 75%+</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gray-200 shadow-sm bg-white">
          <CardHeader className="border-b border-gray-100 flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-lg font-black uppercase text-slate-900 tracking-tighter">
              <ShieldCheck className="h-5 w-5 text-[#EF593E]" />
              User Management
            </CardTitle>
            <Button size="sm" variant="outline" className="font-bold text-[10px] uppercase">Export Data</Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-slate-500 font-black uppercase text-[10px] tracking-widest pl-6">Student Name</TableHead>
                  <TableHead className="text-slate-500 font-black uppercase text-[10px] tracking-widest">Email Address</TableHead>
                  <TableHead className="text-slate-500 font-black uppercase text-[10px] tracking-widest">Account Status</TableHead>
                  <TableHead className="text-slate-500 font-black uppercase text-[10px] tracking-widest">Joined Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.map((u: any) => (
                  <TableRow key={u.id} className="border-gray-100 hover:bg-slate-50/50 transition-colors">
                    <TableCell className="font-bold text-slate-800 pl-6">{u.name}</TableCell>
                    <TableCell className="text-slate-500 font-medium">{u.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-black text-[9px] uppercase">Active</Badge>
                    </TableCell>
                    <TableCell className="text-slate-400 text-xs font-medium">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
                {!users?.length && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-20 text-slate-400 font-medium italic">No users identified in the system.</TableCell>
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
