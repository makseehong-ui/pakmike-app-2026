import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const models = {
  general: "gemini-3-flash-preview",
  complex: "gemini-3.1-pro-preview",
  fast: "gemini-3.1-flash-lite-preview",
  image: "gemini-3.1-flash-image-preview",
};

export async function chatWithGemini(
  messages: { role: "user" | "model"; parts: { text: string }[] }[],
  systemInstruction: string = "You are a helpful assistant for Pakmike Technology, an expert security and electrical services provider in Penang. You are knowledgeable about CCTV (Hikvision, Dahua), electrical wiring, and smart home solutions."
) {
  try {
    const response = await ai.models.generateContent({
      model: models.general,
      contents: messages,
      config: {
        systemInstruction,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Sorry, I encountered an error. Please try again.";
  }
}

export async function searchWithGemini(query: string) {
  try {
    const response = await ai.models.generateContent({
      model: models.general,
      contents: [{ parts: [{ text: query }] }],
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map(
        (chunk: any) => ({
          uri: chunk.web?.uri,
          title: chunk.web?.title,
        })
      ),
    };
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return { text: "Search failed.", sources: [] };
  }
}

export async function generateImageWithGemini(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: models.image,
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: "1K",
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Error:", error);
    return null;
  }
}
