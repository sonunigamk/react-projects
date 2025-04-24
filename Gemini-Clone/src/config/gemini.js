import { GoogleGenAI } from "@google/genai";

const geminiapiKey = import.meta.env.VITE_API_KEY;
const ai = new GoogleGenAI({ apiKey: geminiapiKey });

async function runGemini(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  return response.text;
}

export default runGemini;
