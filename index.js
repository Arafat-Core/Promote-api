require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/prompt", async (req, res) => {
  const { url, text } = req.query;

  try {
    if (url) {
      return res.json({ result: `Describe this image in detail: ${url}` });
    } else if (text) {
      return res.json({ prompt: `A detailed and creative prompt based on: ${text}` });
    } else {
      return res.status(400).json({ error: "No input provided" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get("/prompt2", (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ code: 400, message: "URL required" });

  const animePrompt = `Create an anime-style artwork based on this image: ${url}`;
  return res.json({ code: 200, data: animePrompt });
});

app.get("/prompt-random", (req, res) => {
  const prompts = [
    "A fantasy castle in the clouds",
    "A samurai in a cyberpunk city",
    "A steampunk airship over the desert",
    "A peaceful forest with magical creatures"
  ];
  const random = prompts[Math.floor(Math.random() * prompts.length)];
  return res.json({ data: { prompt: random } });
});

app.get("/", (req, res) => res.send("Prompt API is running 🚀"));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
