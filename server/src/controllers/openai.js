import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function assignmentAIGeneration(req, res) {
  try {
    // Extract the prompt from the request body
    const { prompt } = req.body;

    // Validate the prompt
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    try {
      // Get the generative model
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      // Generate content using the AI model
      const result = await model.generateContent(
        `Generate multiple-choice questions based on the input prompt: ${prompt}. Include 4 options (A, B, C, D), and specify the correct answer clearly.`,
      );

      // Parse the result and send it as a response
      const generatedText = result.response.text();
      res.status(200).json({ generatedText });
    } catch (error) {
      res.status(500).json({ error: error.message });
      return;
    }
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({ error: error.message });
    return;
  }
}
