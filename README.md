# Genesis Core Deploy

This project is the core of the Genesis relay system with PostgreSQL memory and optional Claude relay integration.

## 🚀 Deploy on Railway or Render

### Requirements
- Node.js 18+
- PostgreSQL URL
- Optional: Claude API key

### Local Setup
1. Unzip the project
2. Run:
   ```
   npm install
   npm start
   ```

### Deploy with Railway
1. Fork this repo to your own GitHub
2. Go to Railway → New Project → Deploy from GitHub
3. Set environment variables:
   - `DATABASE_URL`: your Railway PostgreSQL plugin URL
   - `CLAUDE_API_KEY`: your Claude key (optional)
4. Deploy

### Deploy with Docker
```
docker build -t genesis-core .
docker run -p 3000:3000 --env-file .env genesis-core
```

---

Genesis will launch on port 3000.
