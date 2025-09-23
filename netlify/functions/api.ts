// netlify/functions/api.ts
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  
  export const handler = async () => {
    const geminiKey = process.env.GEMINI_API_KEY;
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Serverless function running",
        geminiKey: geminiKey ? "Loaded" : "Missing",
      }),
    };
  };  