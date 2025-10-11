// Import dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");

// Load environment variables
dotenv.config();
console.log("✅ OpenAI Key loaded:", process.env.OPENAI_API_KEY ? "Yes" : "No");

// Create OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Create server
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Route to generate anime images
app.post("/api/generate-image", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ error: "Please provide a prompt." });

  try {
    const result = await openai.images.generate({
      model: "gpt-image-1", // OpenAI image generation model
      prompt,
      size: "1024x1024" // You can also use "512x512" or "256x256"
    });

    res.json({ imageUrl: result.data[0].url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating image." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
