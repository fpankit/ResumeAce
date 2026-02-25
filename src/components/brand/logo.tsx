
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTagline?: boolean;
}

export const Logo = ({ size = 'md', className, showTagline = true }: LogoProps) => {
  const sizes = {
    sm: { text: 'text-lg', subtext: 'text-[6px]', line: 'h-[1px]', icon: 'h-4 w-4' },
    md: { text: 'text-xl', subtext: 'text-[7px]', line: 'h-[1px]', icon: 'h-5 w-5' },
    lg: { text: 'text-2xl', subtext: 'text-[8px]', line: 'h-[1px]', icon: 'h-6 w-6' }
  };
  const s = sizes[size];

  return (
    <div className={cn("flex items-center gap-2 group", className)}>
      <div className={cn(s.icon, "text-[#EF593E]")}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M12 2C12 2 12 7 9 10C7.5 11.5 6 13.5 6 16C6 19.31 8.69 22 12 22C15.31 22 18 19.31 18 16C18 12 15 10 15 10C15 10 14 9 14 7C14 5 12 2 12 2Z" fill="currentColor" />
        </svg>
      </div>
      <div className="flex flex-col -space-y-1">
        <div className="flex items-center gap-1">
          <span className={cn("text-[#EF593E] font-black tracking-tighter uppercase", s.text)}>Network</span>
          <span className={cn("text-[#334155] font-black tracking-tighter uppercase", s.text)}>Bulls</span>
        </div>
        {showTagline && (
          <div className="flex items-center gap-1">
            <div className={cn(s.line, "flex-1 bg-slate-200")} />
            <span className={cn("text-[#EF593E] font-bold tracking-[0.2em] uppercase whitespace-nowrap", s.subtext)}>Where Careers Fly</span>
          </div>
        )}
      </div>
    </div>
  );
};
