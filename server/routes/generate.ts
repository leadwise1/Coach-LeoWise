import { RequestHandler } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini client
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable not set.");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const handleGenerate: RequestHandler = async (req, res) => {
  try {
    const { profile, job } = req.body;

    if (!profile || !job) {
      return res.status(400).json({ error: "Profile and job description are required." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const fullPrompt = `
      You are an expert career coach and resume writer named "Coach Leo".
      Your task is to generate a professional summary and key achievement bullet points for a resume.
      You will be given the user's current profile/experience and a target job description.

      Instructions:
      1. Analyze both the user's profile and the job description.
      2. Create a compelling, results-oriented "Professional Summary" of 2-4 sentences.
      3. Create 3-5 "Key Achievement" bullet points that highlight the user's skills and align with the job requirements. Quantify achievements where possible.
      4. Provide a short "Optimization Notes" section with 1-2 sentences on how to further tailor the resume for Applicant Tracking Systems (ATS).
      5. Format the output clearly with headings for each section (Professional Summary, Key Achievements, Optimization Notes). Do not add any extra conversation or introductory text.

      User Profile:
      ---
      ${profile}
      ---

      Target Job Description:
      ---
      ${job}
      ---
    `;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    res.json({ text: text, provider: "gemini" });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: "Failed to generate response from AI." });
  }
};