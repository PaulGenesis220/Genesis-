const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/relay', async (req, res) => {
  const prompt = req.query.prompt;
  if (!prompt) return res.status(400).send("Missing prompt");

  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: "claude-3-opus-20240229",
        max_tokens: 512,
        temperature: 0.7,
        messages: [{ role: "user", content: prompt }]
      },
      {
        headers: {
          'x-api-key': process.env.CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        }
      }
    );
    res.send(response.data);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Genesis is listening on port ${PORT}`);
});
