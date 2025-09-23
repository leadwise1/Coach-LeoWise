import { Resume } from '@/types/resume';

// Get the base API URL based on environment
const getApiBaseUrl = () => {
  // In development, use the relative path
  // In production on Netlify, use the .netlify/functions path
  return import.meta.env.PROD ? '/.netlify/functions/api' : '/api';
};

export const resumeService = {
  generateResume: async (
    resumeData: Resume,
    templateId?: string
  ): Promise<{ text: string; provider: string; downloadUrl: string }> => {
    try {
      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: templateId || 'default',
          profile: resumeData.personalInfo,
          job: resumeData.targetJob,
          skills: resumeData.skills,
          experience: resumeData.experience,
          education: resumeData.education,
          achievements: resumeData.achievements,
          customizations: resumeData.customizations,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`AI resume API error: ${errorText}`);
      }

      const data: { text: string; provider: string; downloadUrl: string } = await response.json();
      return data;
    } catch (err) {
      console.error('Error in resumeService.generateResume:', err);
      throw err;
    }
  },
};