import type { RequestHandler } from "express";
import type { GenerateRequest, GenerateResponse } from "@shared/api";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";
const GROK_MODEL = process.env.GROK_MODEL || "grok-2-latest";

async function callGemini(
  prompt: string,
  temperature: number,
  maxTokens: number,
) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY");
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    GEMINI_MODEL,
  )}:generateContent?key=${apiKey}`;
  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature,
      maxOutputTokens: maxTokens,
    },
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini error: ${res.status} ${text}`);
  }
  const data = (await res.json()) as any;
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  if (!text) throw new Error("Gemini returned empty text");
  return text as string;
}

async function callGrok(
  prompt: string,
  temperature: number,
  maxTokens: number,
) {
  const apiKey = process.env.GROK_API_KEY || process.env.VITE_GROK_API_KEY;
  if (!apiKey) throw new Error("Missing GROK_API_KEY");
  const url = "https://api.x.ai/v1/chat/completions";
  const body = {
    model: GROK_MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are an expert resume and career coach. Be concise, specific, and quantifiable.",
      },
      { role: "user", content: prompt },
    ],
    temperature,
    max_tokens: maxTokens,
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Grok error: ${res.status} ${text}`);
  }
  const data = (await res.json()) as any;
  const text = data?.choices?.[0]?.message?.content || "";
  if (!text) throw new Error("Grok returned empty text");
  return text as string;
}

export const handleGenerate: RequestHandler = async (req, res) => {
  try {
    const {
      profile,
      job,
      temperature = 0.6,
      maxTokens = 512,
    } = req.body as GenerateRequest;
    if (!profile || !job) {
      res.status(400).json({ error: "Missing profile or job" });
      return;
    }

    const prompt = `Create a resume snippet tailored to the job. Return EXACTLY three sections in plain text (no markdown, no extra headers):\n\nProfessional Summary\n- 2-3 sentences summarizing strengths and fit.\n\nKey Achievements\n- 3 bullets. Each: action verb + skill + quantified impact (%, $, time).\n\nOptimization Notes\n- 1-2 lines on mirroring JD keywords for ATS.\n\nConstraints:\n- Do NOT echo placeholder tokens like 'Name', 'Jane', 'Doe', 'N/A'.\n- If profile lacks detail, infer plausible skills from the JOB DESCRIPTION.\n- Avoid repeating input verbatim or listing names.\n- Keep results concise, specific, and role-aligned.\n\nPROFILE:\n${profile}\n\nJOB DESCRIPTION:\n${job}`;

    try {
      const text = await callGemini(prompt, temperature, maxTokens);
      const payload: GenerateResponse = { provider: "gemini", text };
      res.json(payload);
      return;
    } catch (err) {
      // fall back to Grok
    }

    const text = await callGrok(prompt, temperature, maxTokens);
    const payload: GenerateResponse = { provider: "grok", text };
    res.json(payload);
  } catch (error: any) {
    res.status(500).json({ error: String(error?.message || error) });
  }
};
