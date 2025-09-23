import { ResumeData } from '@/types/resume';

export const resumeService = {
  generateResume: async (data: ResumeData, templateId?: string) => {
    // Replace this with actual API call or processing logic
    console.log("Generating resume with data:", data, "templateId:", templateId);
    return { success: true, data, templateId, text: "AI generated resume text" };
  }
};
// client/services/ResumeService.ts
export class ResumeService {
  // ... other methods

  someMethod() {
    return { success: true, data: {}, templateId: '1', text: "AI generated resume text" };
  }
}
