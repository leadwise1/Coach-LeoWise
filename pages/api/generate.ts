import { GoogleGenerativeAI } from "@google/generative-ai";
import type { NextApiRequest, NextApiResponse } from "next";

const MODEL_NAME = "gemini-1.5-flash-latest";
const DEFAULT_TEMPERATURE = 0.7;
const DEFAULT_MAX_TOKENS = 1024;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // 1. Get data from the frontend's request
  const { profile, job, temperature, maxTokens } = req.body;

  if (!profile || !job) {
    return res
      .status(400)
      .json({ error: "Missing profile or job in request body." });
  }

  // 2. Create a detailed prompt for the AI (logic is identical to your original file)
  const prompt = `
Given the following user profile and job description, generate a professional and optimized resume snippet.
The output should be formatted in plain text and include a "Professional Summary", "Key Achievements" as a bulleted list, and "Optimization Notes".

    USER PROFILE:
    ---
    ${profile}
    ---
    JOB DESCRIPTION:
    ---
    ${job}
    ---
    GENERATED RESUME SNIPPET:
  `;

  // 3. Get the secure API key from environment variables
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not configured in environment variables.");
    return res
      .status(500)
      .json({ error: "API key is not configured on the server." });
  }

  try {
    // 4. Initialize the GoogleGenerativeAI SDK
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // 5. Construct generation config
    const generationConfig = {
      temperature: temperature || DEFAULT_TEMPERATURE,
      maxOutputTokens: maxTokens || DEFAULT_MAX_TOKENS,
    };

    // 6. Call the Gemini API and send the response
    const result = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig });
    const response = result.response;
    const text = response.text();

    if (!text) {
      return res
        .status(500)
        .json({ error: "Received an empty or invalid response from the AI." });
    }

    res.status(200).json({ text: text, provider: "gemini" });
  } catch (err: any) {
    console.error("Server Error while calling Gemini API:", err);
    res.status(500).json({ error: "Internal server error: " + err.message });
  }
}