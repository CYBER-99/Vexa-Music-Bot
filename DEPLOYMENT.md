# 🚀 Deployment Guide

Deploy your Vexa Music Bot to production.

---

## Pre-Deployment Checklist

Before deploying, run:

```bash
npm run validate
```

Make sure all checks pass ✅

---

## Railway

Railway is recommended for beginners.

### 1. Create Railway Account
- Go to [railway.app](https://railway.app)
- Sign up with GitHub

### 2. Create New Project
- Click "New Project"
- Select "Deploy from GitHub"
- Connect your repository

### 3. Configure Environment
- Go to project settings
- Add variables:
  ```
  DISCORD_TOKEN=your_token
  CLIENT_ID=your_id
  GUILD_ID=your_guild
  SPOTIFY_CLIENT_ID=your_spotify_id
  SPOTIFY_CLIENT_SECRET=your_spotify_secret
  YOUTUBE_API_KEY=your_youtube_key (optional)
  NODE_ENV=production
  ```

### 4. Deploy
- Push to your repository
- Railway auto-deploys
- Monitor in Railway dashboard

### Cost
- Free tier available
- Pay-as-you-go beyond free tier

---

## Render

### 1. Create Render Account
- Go to [render.com](https://render.com)
- Sign up

### 2. Create New Service
- Click "New +"
- Select "Web Service"
- Connect GitHub repo

### 3. Configure Service
- **Name**: `vexa-music-bot`
- **Region**: Choose closest to users
- **Branch**: `main`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 4. Add Environment Variables
- Go to "Environment"
- Add all variables from `.env`

### 5. Deploy
- Click "Create Web Service"
- Render deploys automatically

### Cost
- Free tier: $0 (with limitations)
- Paid tier: $7+/month

---

## Replit

### 1. Create Replit Account
- Go to [replit.com](https://replit.com)
- Sign up

### 2. Import Repository
- Click "Create"
- Select "Import from GitHub"
- Paste your repo URL

### 3. Add Secrets
- Go to "Secrets" (lock icon)
- Add all variables from `.env`
  ```
  DISCORD_TOKEN=your_token
  CLIENT_ID=your_id
  ... (all variables)
  ```

### 4. Run Bot
- Click "Run"
- Bot starts automatically

### Cost
- Free tier available
- Replit Pro: $7/month for better performance

**Note**: Free tier has limitations. Upgrade for 24/7 uptime.

---

## VPS (Digital Ocean, Linode, AWS)

### 1. Get VPS
- Choose provider (DigitalOcean, Linode, AWS, etc.)
- Get Ubuntu 22.04 or similar

### 2. SSH into VPS
```bash
ssh root@your_vps_ip
```

### 3. Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 4. Clone Repository
```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 5. Install Dependencies
```bash
npm install
```

### 6. Setup Environment
```bash
cp .env.example .env
nano .env  # Edit with your variables
```

### 7. Use PM2 for Auto-Restart
```bash
sudo npm install -g pm2
pm2 start index.js --name "vexa-bot"
pm2 startup
pm2 save
```

### 8. Setup Nginx (Optional, for monitoring)
```bash
sudo apt-get install nginx
# Configure reverse proxy if needed
```

### Cost
- DigitalOcean: $4-12/month
- Linode: $5-30/month
- AWS: Pay-as-you-go (usually $5-20/month)

---

## Docker Deployment

### 1. Create Dockerfile
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

CMD ["node", "index.js"]
```

### 2. Build Image
```bash
docker build -t vexa-music-bot .
```

### 3. Run Container
```bash
docker run -d \
  -e DISCORD_TOKEN=your_token \
  -e CLIENT_ID=your_id \
  -e GUILD_ID=your_guild \
  -e SPOTIFY_CLIENT_ID=your_spotify_id \
  -e SPOTIFY_CLIENT_SECRET=your_spotify_secret \
  --name vexa-bot \
  vexa-music-bot
```

### 4. View Logs
```bash
docker logs -f vexa-bot
```

---

## Production Best Practices

### 1. Environment Variables
- Never commit `.env` file
- Use `.env.example` as template
- Store secrets securely

### 2. Error Handling
- Bot automatically handles errors
- Check logs regularly
- Set up monitoring/alerts

### 3. Performance
- Monitor memory usage
- Check uptime regularly
- Set Discord status rotation

### 4. Updates
- Keep dependencies updated
- Test updates locally first
- Deploy incrementally

### 5. Monitoring
Option A: Built-in logging
- Logs appear in console
- Check daily for errors

Option B: Uptime Monitoring
- Use services like Uptime Robot
- Get alerts if bot goes down

---

## Common Issues

### Bot Goes Offline
- Check logs for errors
- Verify token is valid
- Check internet connection
- Restart the bot

### "No Connection" Errors
- Internet may be unstable
- Network could be rate-limited
- Check Discord status page

### Memory Issues
- Bot uses ~100MB normally
- If using >500MB, restart
- PM2 auto-restarts on crash

### Rate Limiting
- Discord may rate-limit
- Bot handles this automatically
- Wait 10+ minutes before retry

---

## Scaling

If your bot needs to handle:
- **Large servers**: Increase memory allocation
- **Many commands**: Bot handles 10,000+ servers
- **Heavy usage**: Distribute across multiple instances (advanced)

---

## Monitoring Dashboard

Create a simple monitoring setup:

1. **Uptime Robot** (free)
   - Monitor bot status
   - Get alerts via email/SMS

2. **Discord Status**
   - Regularly update bot status
   - Shows server status in activity

3. **Logs**
   - Review logs daily
   - Archive important events

---

## Where to Host

| Platform | Cost | Pros | Cons |
|----------|------|------|------|
| Railway | Free/Paid | Easy, GitHub sync | Limited free tier |
| Render | $7+/month | Good free tier | Slower startup |
| Replit | Free/Paid | Simple interface | Limited free tier |
| VPS | $5-20/month | Full control | Manual setup |
| Docker | ~0 | Portable | Requires hosting |

**Recommendation for beginners**: Railway or Render

---

## Final Tips

1. **Test locally first** before deploying
2. **Keep backups** of your configuration
3. **Monitor logs** regularly
4. **Update dependencies** monthly
5. **Have a rollback plan** for issues

---

**Your bot is production-ready!** 🚀
