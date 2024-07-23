// server.js
const express = require("express");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/generate-shayari", async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: `Generate a Shayari on ${prompt}` }],
      model: "gpt-3.5-turbo",
    });

    const shayari = completion.choices[0].message.content.trim();
    res.json({ shayari });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the Shayari" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
