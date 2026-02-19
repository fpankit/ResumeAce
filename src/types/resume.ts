
export interface ResumeData {
  personal: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
  };
  summary: string;
  experience: {
    id: string;
    title: string;
    company: string;
    period: string;
    description: string;
    location?: string;
  }[];
  education: {
    id: string;
    degree: string;
    school: string;
    period: string;
    location?: string;
  }[];
  skills: string[];
}

export interface TemplateProps {
  data: ResumeData;
  theme: {
    primary: string;
    accent: string;
  };
  style: {
    fontSize: number;
    lineHeight: number;
  };
}
