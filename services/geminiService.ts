import { GoogleGenAI, Type } from "@google/genai";
import { ArtStyle } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Helper to construct the prompt based on selected style.
 */
const getStylePrompt = (subject: string, style: ArtStyle): string => {
  switch (style) {
    case 'MARKER':
      return `A cute children's illustration of ${subject} drawn with acrylic paint markers. Flat design, vibrant colors, clean shapes, bold strokes, white background. Suitable for a 5-year-old to copy.`;
    case 'WATERCOLOR':
      return `A gentle children's illustration of ${subject} in watercolor style. Soft edges, pastel colors, artistic, wet-on-dry technique, on white paper.`;
    case 'CRAYON':
      return `A child's drawing of ${subject} using wax crayons. Textured, playful, naive style, colorful, on textured paper. Looks like a masterpiece by a 6-year-old.`;
    case 'SIMPLE':
      return `A very simple, colorful stick-figure style drawing of ${subject}. Minimalist, thick colored lines, geometric shapes, very easy for a 4-year-old to copy.`;
    case 'LINE_ART':
    default:
      return `A simple, cute, black and white line drawing coloring page for a 5-year-old child. Subject: ${subject}. White background, thick clean lines, no shading, easy to color. Aspect ratio 3:4 (A4 paper).`;
  }
};

/**
 * Generates an image using Imagen based on subject and style.
 */
export const generateImage = async (subject: string, style: ArtStyle): Promise<string> => {
  try {
    const prompt = getStylePrompt(subject, style);
    
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '3:4',
      },
    });

    const base64ImageBytes = response.generatedImages?.[0]?.image?.imageBytes;
    if (!base64ImageBytes) {
      throw new Error("No image generated");
    }
    
    return `data:image/jpeg;base64,${base64ImageBytes}`;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

/**
 * Generates parenting advice based on a topic.
 */
export const getParentingAdvice = async (topic: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide a short, encouraging, and educational tip for a parent teaching their 4-6 year old child about art. Focus on the topic: "${topic}". Keep it under 100 words.`,
    });
    return response.text || "Keep encouraging your child!";
  } catch (error) {
    console.error("Error getting advice:", error);
    return "Art is about expression. Let them play!";
  }
};