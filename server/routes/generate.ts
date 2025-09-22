import { RequestHandler } from "express";

export const handleGenerate: RequestHandler = async (req, res) => {
  // 1. Get the prompt from the frontend's request
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt in request body." });
  }

  // 2. Get the secure API key from your Netlify environment variables
  // This uses the key WITHOUT the "VITE_" prefix
  const apiKey = process.env.GEMINI_API_KEY; 
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not configured in Netlify environment variables.");
    return res.status(500).json({ error: "API key is not configured on the server." });
  }
  
  const model = 'gemini-1.5-flash-latest';
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  // 3. Construct the payload to send to the Gemini API
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  try {
    // 4. Securely call the Gemini API from your server
    const geminiResponse = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!geminiResponse.ok) {
        const errorBody = await geminiResponse.text();
        console.error("Gemini API Error:", errorBody);
        return res.status(geminiResponse.status).json({ error: `Failed to fetch from Gemini API: ${errorBody}` });
    }
    
    const data = await geminiResponse.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
        return res.status(500).json({ error: "Received an empty or invalid response from the AI." });
    }

    // 5. Send the AI's response back to the frontend
    res.status(200).json({ response: text });

  } catch (err: any) {
    console.error("Server Error while calling Gemini API:", err);
    res.status(500).json({ error: "Internal server error: " + err.message });
  }
};