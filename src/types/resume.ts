export interface ResumeData {
  personal: {
    fullName: string;
    middleName?: string;
    jobTitle: string;
    headline?: string;
    email: string;
    phone: string;
    location: {
      street?: string;
      city: string;
      state?: string;
      country: string;
      zip?: string;
    };
    linkedin?: string;
    github?: string;
    portfolio?: string;
    twitter?: string;
    stackoverflow?: string;
    dob?: string;
    nationality?: string;
    maritalStatus?: string;
    customContactLabel?: string;
    customContactValue?: string;
  };
  summary: {
    content: string;
    asBullets: boolean;
    jobTarget?: string;
    coreStrengths: string[];
  };
  skills: {
    id: string;
    category: 'Programming Languages' | 'Frameworks & Libraries' | 'Databases' | 'Cloud & DevOps' | 'Tools' | 'Soft Skills' | 'Domain Skills' | 'Other';
    items: {
      id: string;
      name: string;
      level: number; // 0-100
      years?: string;
      priority: 'Primary' | 'Secondary';
      linkedCertification?: string;
    }[];
  }[];
  experience: {
    id: string;
    title: string;
    company: string;
    website?: string;
    location: string;
    industry?: string;
    teamSize?: string;
    reportingTo?: string;
    employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance';
    startMonth: string;
    startYear: string;
    endMonth?: string;
    endYear?: string;
    current: boolean;
    responsibilities: string;
    achievements: string;
    technologies: string;
    kpiMetrics?: string;
    wasPromoted?: boolean;
    reasonForLeaving?: string;
  }[];
  education: {
    id: string;
    degreeType: string;
    degree: string;
    field: string;
    specialization?: string;
    school: string;
    schoolWebsite?: string;
    location: string;
    startYear: string;
    endYear: string;
    gpa?: string;
    honors?: string;
    scholarships?: string;
    thesisTitle?: string;
    coursework?: string;
    activities?: string;
  }[];
  projects: {
    id: string;
    title: string;
    role: string;
    teamSize?: string;
    duration?: string;
    description: string;
    problemStatement?: string;
    solutionApproach?: string;
    technologies: string;
    github?: string;
    live?: string;
    impact?: string;
  }[];
  certifications: {
    id: string;
    name: string;
    org: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
    url?: string;
  }[];
  achievements: {
    id: string;
    title: string;
    description: string;
    year: string;
    category: 'Academic' | 'Professional' | 'Sports' | 'Other';
  }[];
  publications: {
    id: string;
    title: string;
    platform: string;
    year: string;
    link?: string;
    doi?: string;
  }[];
  languages: {
    id: string;
    name: string;
    reading: 'Basic' | 'Intermediate' | 'Advanced' | 'Native';
    writing: 'Basic' | 'Intermediate' | 'Advanced' | 'Native';
    speaking: 'Basic' | 'Intermediate' | 'Advanced' | 'Native';
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
