app.get('/env-check', (req, res) => {
  const key = process.env.CLAUDE_API_KEY;
  if (key && key.startsWith("sk-")) {
    res.send('CLAUDE_API_KEY is set');
  } else {
    res.send('CLAUDE_API_KEY is NOT set');
  }
});
