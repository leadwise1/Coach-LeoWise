import { Resume } from '@/types/resume';

export const resumeService = {
  generateResume: async (
    resumeData: Resume,
    templateId?: string
  ): Promise<{ text: string; provider: string; downloadUrl: string }> => {
    try {
      const response = await fetch('/api/generate', {
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