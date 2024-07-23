const express = require("express");
const OpenAI = require("openai");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// Load environment variables from a .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure you have set your OpenAI API key in the .env file
});

app.use(bodyParser.json());
app.use(express.static("public"));

// Endpoint to handle chat requests
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to generate Shayari
app.post("/generate-shayari", async (req, res) => {
  try {
    const { keyword } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: `Write a Shayari about ${keyword}` }],
    });

    res.json({ shayari: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
