
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyAjuPn9MIjZmsTsBCTvjMOQwdLKeIJFtbU" });

async function runGemini(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });
  // console.log(response.text);
  return response.text;
}

export default runGemini;