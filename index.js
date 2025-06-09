
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Genesis is live'));

app.get('/env-check', (req, res) => {
  const keyStatus = process.env.CLAUDE_API_KEY
    ? 'CLAUDE_API_KEY is set'
    : 'CLAUDE_API_KEY is NOT set';
  res.send(keyStatus);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Genesis is listening on port ${PORT}`);
});
