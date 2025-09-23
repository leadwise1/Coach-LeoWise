export interface Resume {
  personalInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    website?: string;
  };
  targetJob?: string;
  summary?: string;
  experience?: { description: string }[];
  education?: Array<{
    id?: string;
    institution: string;
    degree: string;
    startDate?: string;
    endDate?: string;
    achievements?: string[];
  }>;
  skills?: string[];
  projects?: string[];
  certifications?: string[];
  volunteering?: string[];
  extracurricular?: string[];
  notes?: string;
  achievements?: string[];
  customizations?: Record<string, any>;
}

export type ResumeData = Resume;