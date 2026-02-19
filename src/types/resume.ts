
export interface ResumeData {
  personal: {
    fullName: string;
    jobTitle: string;
    headline?: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
    dob?: string;
    nationality?: string;
  };
  summary: {
    content: string;
    asBullets: boolean;
  };
  skills: {
    id: string;
    category: string;
    items: {
      id: string;
      name: string;
      level: string; // Beginner, Intermediate, Advanced, Expert
      years?: string;
    }[];
  }[];
  experience: {
    id: string;
    title: string;
    company: string;
    location: string;
    employmentType: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    metrics?: string;
    technologies?: string;
  }[];
  education: {
    id: string;
    degree: string;
    field: string;
    school: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    honors?: string;
    coursework?: string;
  }[];
  projects: {
    id: string;
    title: string;
    description: string;
    technologies: string;
    github?: string;
    live?: string;
    duration?: string;
    role?: string;
    contributions: string;
  }[];
  certifications: {
    id: string;
    name: string;
    org: string;
    date: string;
    id_number?: string;
    url?: string;
  }[];
  achievements: {
    id: string;
    title: string;
    description: string;
    year: string;
  }[];
  publications: {
    id: string;
    title: string;
    platform: string;
    year: string;
    link?: string;
  }[];
  languages: {
    id: string;
    name: string;
    level: string; // Basic, Conversational, Fluent, Native
  }[];
  interests: string[];
  customSections: {
    id: string;
    title: string;
    content: string;
  }[];
}

export interface TemplateProps {
  data: ResumeData;
  theme: {
    primary: string;
    accent: string;
  };
  sections: Record<string, boolean>;
  style: {
    fontSize: number;
    lineHeight: number;
    sectionSpacing: number;
  };
}
