
import { drizzle } from 'drizzle-orm/neon-http';
import { Client } from '@neondatabase/serverless';
import * as schema from './schema';
import { resumes } from './schema'; // Assuming 'resumes' is exported from schema.ts

// Define your ResumeData type
export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location?: string;
    linkedin?: string;
    website?: string;
  };
  targetJob: string;
  skills?: string[];
  experience?: Array<{ title?: string; company?: string; description?: string }>;
  education?: Array<{ degree?: string; institution?: string; year?: string }>;
  achievements?: string[];
  customizations?: Record<string, any>;
}

// Initialize the database
const client = new Client({
  connectionString: process.env.NETLIFY_DATABASE_URL
});

export const db = drizzle(client, { schema });

// Insert a new resume
export async function createResume(userId: string, resumeData: ResumeData) {
  const result = await db.insert(resumes).values({
    user_id: userId,
    personal_info: resumeData.personalInfo,
    target_job: resumeData.targetJob,
    skills: resumeData.skills || [],
    experience: resumeData.experience || [],
    education: resumeData.education || [],
    achievements: resumeData.achievements || [],
    customizations: resumeData.customizations || {},
    created_at: new Date()
  }).returning();

  return result[0];
}

// Query a resume by user ID
export async function getResumeByUser(userId: string) {
  const resume = await db.select().from(resumes).where(resumes.user_id.eq(userId));
  return resume;
}