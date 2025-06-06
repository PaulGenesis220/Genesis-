
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Genesis started'));

app.get('/relay', async (req, res) => {
  const prompt = req.query.prompt;
  const apiKey = process.env.CLAUDE_API_KEY;

  if (!prompt || !apiKey) {
    return res.status(400).json({ error: 'Missing prompt or Claude API key' });
  }

  try {
    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: 'claude-3-opus-20240229',
      max_tokens: 300,
      temperature: 0.7,
      messages: [{ role: 'user', content: prompt }]
    }, {
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('Claude API error:', err?.response?.data || err.message);
    res.status(500).json({ error: 'Claude relay failed' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Genesis is listening on port ${PORT}`);
});
