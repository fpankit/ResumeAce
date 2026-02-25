"use client";

import React from 'react';
import { Bot } from 'lucide-react';

export const Chatbot = () => {
  return (
    <div className="fixed bottom-6 right-6 z-[100] group cursor-pointer no-print">
      <div className="relative flex items-center justify-center w-14 h-14 bg-[#EF593E] text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 ring-4 ring-orange-100/50">
        <Bot className="h-7 w-7" />
        <div className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
        </div>
        {/* Waving hand element */}
        <span className="absolute -left-2 top-0 text-xl animate-waving-hand">👋</span>
      </div>
      <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none">
        <div className="bg-white px-4 py-2 rounded-2xl shadow-2xl border border-orange-50 whitespace-nowrap">
          <p className="text-[10px] font-black uppercase text-slate-800 tracking-wider">
            Need help, <span className="text-[#EF593E]">Ankit</span>?
          </p>
        </div>
      </div>
    </div>
  );
};