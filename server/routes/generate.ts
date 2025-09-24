import { RequestHandler } from "express";

export const handleGenerate: RequestHandler = async (req, res) => {
  // 1. Get data from the frontend's request
  const { profile, job, temperature, maxTokens } = req.body;

  if (!profile || !job) {
    return res
      .status(400)
      .json({ error: "Missing profile or job in request body." });
  }

  // 2. Create a detailed prompt for the AI
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

  // 3. Get the secure API key from your Netlify environment variables
  // This uses the key WITHOUT the "VITE_" prefix
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error(
      "GEMINI_API_KEY is not configured in Netlify environment variables.",
    );
    return res
      .status(500)
      .json({ error: "API key is not configured on the server." });
  }

  const model = "gemini-1.5-flash-latest";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  // 4. Construct the payload to send to the Gemini API
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: temperature || 0.7,
      maxOutputTokens: maxTokens || 1024,
    },
  };

  try {
    // 5. Securely call the Gemini API from your server
    const geminiResponse = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!geminiResponse.ok) {
      const errorBody = await geminiResponse.text();
      console.error("Gemini API Error:", errorBody);
      return res
        .status(geminiResponse.status)
        .json({ error: `Failed to fetch from Gemini API: ${errorBody}` });
    }

    const data = await geminiResponse.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res
        .status(500)
        .json({ error: "Received an empty or invalid response from the AI." });
    }

    // 6. Send the AI's response back to the frontend
    res.status(200).json({ text: text, provider: "gemini" });
  } catch (err: any) {
    console.error("Server Error while calling Gemini API:", err);
    res.status(500).json({ error: "Internal server error: " + err.message });
  }
};