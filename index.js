const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Genesis server is running.');
});

app.get('/relay', async (req, res) => {
  const prompt = req.query.prompt || 'Hello Claude';
  if (!CLAUDE_API_KEY) {
    return res.status(500).json({ error: 'Claude API key not configured.' });
  }

  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-opus-20240229',
        max_tokens: 512,
        temperature: 0.7,
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error relaying to Claude API', details: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Genesis is listening on port ${PORT}`);
});