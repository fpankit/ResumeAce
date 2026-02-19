
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const BullIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C9.79 2 8 3.79 8 6C8 7.31 8.63 8.47 9.61 9.22C6.44 10.05 4 12.75 4 16V18H20V16C20 12.75 17.56 10.05 14.39 9.22C15.37 8.47 16 7.31 16 6C16 3.79 14.21 2 12 2ZM12 4C13.1 4 14 4.9 14 6C14 7.1 13.1 8 12 8C10.9 8 10 7.1 10 6C10 4.9 10.9 4 12 4ZM6.18 16C6.67 13.72 8.7 12 11.13 12H12.87C15.3 12 17.33 13.72 17.82 16H6.18Z" />
  </svg>
);

const Logo = () => (
  <div className="flex items-center gap-2 group">
    <div className="w-8 h-8 rounded-lg bg-[#EF593E] flex items-center justify-center text-white overflow-hidden shadow-lg shadow-primary/20">
      <BullIcon className="w-full h-full p-1 opacity-90" />
    </div>
    <div className="flex flex-col -space-y-1">
      <div className="flex items-center gap-1">
        <span className="text-[#EF593E] font-black text-lg tracking-tighter uppercase">Network</span>
        <span className="text-[#44546A] font-black text-lg tracking-tighter uppercase">Bulls</span>
      </div>
    </div>
  </div>
);

const categories = [
  "All templates",
  "Simple",
  "Word",
  "Picture",
  "ATS",
  "Two-column",
  "Google Docs",
  "See more"
];

const templates = [
  {
    id: "classic",
    name: "Classic",
    image: PlaceHolderImages.find(img => img.id === "template-classic")?.imageUrl || "",
    formats: ["PDF", "DOCX"],
    colors: []
  },
  {
    id: "traditional",
    name: "Traditional",
    image: PlaceHolderImages.find(img => img.id === "template-traditional")?.imageUrl || "",
    formats: ["PDF", "DOCX"],
    colors: []
  },
  {
    id: "professional",
    name: "Professional",
    image: PlaceHolderImages.find(img => img.id === "template-professional")?.imageUrl || "",
    formats: ["PDF", "DOCX"],
    colors: ["#164e63", "#1e293b", "#312e81", "#4c1d95"]
  },
  {
    id: "prime-ats",
    name: "Prime ATS",
    image: PlaceHolderImages.find(img => img.id === "template-ats")?.imageUrl || "",
    formats: ["PDF", "DOCX"],
    colors: ["#2563eb", "#db2777", "#ea580c", "#16a34a", "#1e293b"]
  }
];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("All templates");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="px-6 h-16 flex items-center justify-between border-b border-gray-100 bg-white sticky top-0 z-50">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex-1 flex justify-center">
          <h1 className="text-xl font-bold text-[#3b82f6]">Please choose a template</h1>
        </div>
        <Link href="/dashboard/student">
          <Button variant="outline" className="text-[#3b82f6] border-[#3b82f6]/20 hover:bg-[#3b82f6]/5 font-semibold px-6">
            Skip
          </Button>
        </Link>
      </header>

      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-semibold transition-all border",
                activeCategory === cat
                  ? "bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((template) => (
            <div key={template.id} className="group space-y-4">
              <div className="relative aspect-[3/4] bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 group-hover:shadow-2xl group-hover:border-[#EF593E]/20 transition-all duration-300">
                <Image
                  src={template.image}
                  alt={template.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  data-ai-hint={template.id}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link href="/dashboard/student">
                    <Button className="bg-[#EF593E] hover:bg-[#D44D35] text-white font-bold rounded-full px-8 py-6 h-auto">
                      Use This Template
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                    <Info className="h-3 w-3 text-slate-400" />
                  </div>
                  <span className="font-bold text-slate-900">{template.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  {template.formats.map(f => (
                    <span key={f} className="text-[9px] font-black bg-[#EF593E] text-white px-1.5 py-0.5 rounded leading-none">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {template.colors.length > 0 && (
                <div className="flex gap-2 px-1">
                  {template.colors.map((c, i) => (
                    <div 
                      key={i} 
                      className="w-4 h-4 rounded-full border border-slate-100 shadow-sm cursor-pointer hover:scale-110 transition-transform" 
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
