"use client";

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { ResumeData } from '@/types/resume';

// Templates
import Classic from '@/components/resume-templates/Classic';
import Modern from '@/components/resume-templates/Modern';
import ATSMinimal from '@/components/resume-templates/ATSMinimal';
import TwoColumn from '@/components/resume-templates/TwoColumn';
import Tech from '@/components/resume-templates/Tech';
import Executive from '@/components/resume-templates/Executive';
import Compact from '@/components/resume-templates/Compact';
import Academic from '@/components/resume-templates/Academic';
import Management from '@/components/resume-templates/Management';
import Creative from '@/components/resume-templates/Creative';
import BoldHeader from '@/components/resume-templates/BoldHeader';
import ElegantSerif from '@/components/resume-templates/ElegantSerif';
import Timeline from '@/components/resume-templates/Timeline';
import Corporate from '@/components/resume-templates/Corporate';
import SoftGray from '@/components/resume-templates/SoftGray';
import BlueAccent from '@/components/resume-templates/BlueAccent';
import Monochrome from '@/components/resume-templates/Monochrome';
import Fresher from '@/components/resume-templates/Fresher';
import Senior from '@/components/resume-templates/Senior';
import Hybrid from '@/components/resume-templates/Hybrid';

interface ResumeCanvasProps {
  templateId: string;
  theme: any;
  font: any;
  data: ResumeData;
  sections: Record<string, boolean>;
  style?: {
    lineHeight: number;
    fontSize: number;
    sectionSpacing: number;
  };
}

const TEMPLATE_COMPONENTS: Record<string, React.FC<any>> = {
  'classic': Classic,
  'modern': Modern,
  'ats-minimal': ATSMinimal,
  'two-column': TwoColumn,
  'tech': Tech,
  'executive': Executive,
  'academic': Academic,
  'management': Management,
  'creative': Creative,
  'bold-header': BoldHeader,
  'elegant-serif': ElegantSerif,
  'structured-timeline': Timeline,
  'corporate-formal': Corporate,
  'soft-gray': SoftGray,
  'blue-accent': BlueAccent,
  'monochrome': Monochrome,
  'compact': Compact,
  'fresher': Fresher,
  'senior': Senior,
  'hybrid': Hybrid,
};

export const ResumeCanvas = ({ templateId, theme, font, data, sections, style }: ResumeCanvasProps) => {
  const config = style || { lineHeight: 1.5, fontSize: 13, sectionSpacing: 24 };

  const SelectedTemplate = useMemo(() => {
    return TEMPLATE_COMPONENTS[templateId] || Classic;
  }, [templateId]);

  return (
    <div 
      className="resume-a4 print:m-0 print:shadow-none" 
      style={{ 
        fontFamily: font?.family || '"Inter", sans-serif',
        fontSize: `${config.fontSize}px`,
        lineHeight: config.lineHeight,
        color: theme.text,
      }}
    >
      <SelectedTemplate 
        data={data} 
        theme={theme} 
        sections={sections}
        style={{ fontSize: config.fontSize, lineHeight: config.lineHeight, sectionSpacing: config.sectionSpacing }} 
      />
      
      <style jsx global>{`
        .resume-a4 {
          padding: 60px !important;
          background: white;
          width: 210mm;
          min-height: 297mm;
          margin: auto;
          box-shadow: 0 0 40px rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
        }
        @media print {
          .resume-a4 {
            padding: 40px !important;
            box-shadow: none !important;
            margin: 0 !important;
            width: 100%;
            height: auto;
          }
        }
      `}</style>
    </div>
  );
};
