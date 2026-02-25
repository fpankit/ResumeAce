"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth, useFirestore } from "@/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const FlameIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2C12 2 17 6.5 17 11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11C7 6.5 12 2 12 2Z" fill="url(#flame-grad-top-login)" />
    <path d="M12 22C12 22 18 16.5 18 12C18 10.5 17 9 15.5 8.5C14 8 13 8.5 12 9.5C11 8.5 10 8 8.5 8.5C7 9 6 10.5 6 12C6 16.5 12 22 12 22Z" fill="url(#flame-grad-bottom-login)" opacity="0.9" />
    <defs>
      <linearGradient id="flame-grad-top-login" x1="12" y1="2" x2="12" y2="16" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF5C00" />
        <stop offset="1" stopColor="#FFB800" />
      </linearGradient>
      <linearGradient id="flame-grad-bottom-login" x1="12" y1="8" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFB800" />
        <stop offset="0.5" stopColor="#FF5C00" />
        <stop offset="1" stopColor="#FF005C" />
      </linearGradient>
    </defs>
  </svg>
);

const Logo = () => (
  <div className="flex flex-col items-center gap-1 group">
    <div className="relative w-14 h-14 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-lg shadow-primary/5 border border-slate-100">
      <FlameIcon className="w-12 h-12 p-1 opacity-90 transition-transform group-hover:scale-110" />
    </div>
    <div className="flex items-center gap-1 mt-2">
      <span className="text-[#EF593E] font-black text-2xl tracking-tighter uppercase">Network</span>
      <span className="text-[#44546A] font-black text-2xl tracking-tighter uppercase">Bulls</span>
    </div>
    <div className="flex items-center gap-1 w-full max-w-[140px]">
      <div className="h-[1px] flex-1 bg-slate-200" />
      <span className="text-[8px] text-[#EF593E] font-bold tracking-[0.2em] uppercase whitespace-nowrap">Where Careers Fly</span>
      <div className="h-[1px] flex-1 bg-slate-200" />
    </div>
  </div>
);

export default function LoginPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "signup" ? "signup" : "login";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  
  const auth = useAuth();
  const db = useFirestore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await updateProfile(user, { displayName: name });
      
      await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        name,
        email,
        role: "student",
        createdAt: new Date().toISOString(),
      });

      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <Link href="/" className="inline-block hover:scale-105 transition-transform">
            <Logo />
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-slate-200/50 p-1">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card className="border-slate-200 shadow-xl bg-white">
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="border-slate-200 shadow-xl bg-white">
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Join Network Bulls and optimize your career today.</CardDescription>
              </CardHeader>
              <form onSubmit={handleSignup}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold" disabled={loading}>
                    {loading ? "Creating account..." : "Sign Up"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
