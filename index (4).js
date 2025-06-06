
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Genesis started');
});

app.get('/relay', async (req, res) => {
  const prompt = req.query.prompt;
  const claudeApiKey = process.env.CLAUDE_API_KEY;

  if (!claudeApiKey) {
    return res.status(500).json({ error: 'Claude API key not configured.' });
  }

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt query parameter missing.' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': claudeApiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 200,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    res.json({ response: data?.content?.[0]?.text || 'No response from Claude.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error contacting Claude API.' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Genesis is listening on port ${PORT}`);
});
