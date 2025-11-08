# 🚀 Vercel Deployment Guide

Panduan lengkap deploy REST API ke Vercel.

---

## 📋 Prerequisites

- ✅ Akun Vercel (https://vercel.com)
- ✅ GitHub account (optional, tapi recommended)
- ✅ Supabase sudah setup
- ✅ File metadata.json sudah di-upload ke Supabase

---

## 🔧 Setup Files (Sudah Dibuat)

### 1. **vercel.json** - Konfigurasi Vercel
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "api/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "api/server.js"
    }
  ]
}
```

### 2. **api/index.js** - Serverless Entry Point
```javascript
import app from './server.js';
export default app;
```

### 3. **.vercelignore** - Files to Ignore
- Scrapers
- Local data
- Documentation
- Test files

---

## 🚀 Deployment Steps

### Metode 1: Via Vercel Dashboard (Recommended)

#### Step 1: Push ke GitHub

```bash
# Initialize git (jika belum)
git init

# Add files
git add .

# Commit
git commit -m "Initial commit for Vercel deployment"

# Create GitHub repo dan push
git remote add origin https://github.com/username/repo-name.git
git branch -M main
git push -u origin main
```

#### Step 2: Connect ke Vercel

1. Login ke https://vercel.com
2. Klik **"Add New Project"**
3. **Import Git Repository**
4. Pilih repository Anda
5. Klik **"Import"**

#### Step 3: Configure Project

**Framework Preset:** Other (atau Node.js)

**Build Settings:**
- Build Command: `npm run vercel-build` (atau kosongkan)
- Output Directory: (kosongkan)
- Install Command: `npm install`

**Root Directory:** `./` (root)

#### Step 4: Environment Variables

Tambahkan environment variables:

```
SUPABASE_URL=https://huhhzvaiqskhldhxexcu.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_BUCKET=komiku-data
PORT=3000
```

**Cara tambah:**
1. Di project settings
2. Tab **"Environment Variables"**
3. Add each variable
4. Klik **"Save"**

#### Step 5: Deploy

1. Klik **"Deploy"**
2. Wait for build (2-3 menit)
3. Done! 🎉

---

### Metode 2: Via Vercel CLI

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login

```bash
vercel login
```

#### Step 3: Deploy

```bash
# Di root folder project
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (pilih account Anda)
# - Link to existing project? N
# - Project name? (enter nama)
# - Directory? ./
# - Override settings? N
```

#### Step 4: Set Environment Variables

```bash
vercel env add SUPABASE_URL
# Paste value dan enter

vercel env add SUPABASE_KEY
# Paste value dan enter

vercel env add SUPABASE_BUCKET
# Enter: komiku-data

vercel env add PORT
# Enter: 3000
```

#### Step 5: Deploy Production

```bash
vercel --prod
```

---

## 🌐 Setelah Deploy

### Your API URL:

```
https://your-project-name.vercel.app
```

### Test Endpoints:

```
https://your-project-name.vercel.app/api/manhwa?limit=5
https://your-project-name.vercel.app/api/manhwa/latest?limit=5
https://your-project-name.vercel.app/api/manhwa/12321-academys-genius-swordmaster
https://your-project-name.vercel.app/api/search?q=academy
```

### Web Interface:

```
https://your-project-name.vercel.app/
https://your-project-name.vercel.app/quick-copy.html
https://your-project-name.vercel.app/api-docs.html
```

---

## 🔄 Update Deployment

### Via GitHub (Auto Deploy):

```bash
# Make changes
git add .
git commit -m "Update API"
git push

# Vercel will auto-deploy! 🎉
```

### Via CLI:

```bash
vercel --prod
```

---

## ⚙️ Update Frontend Config

Setelah deploy, update `api/public/config.js`:

```javascript
const API_BASE_URL = 'https://your-project-name.vercel.app/api';
```

Atau buat auto-detect:

```javascript
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api'
  : 'https://your-project-name.vercel.app/api';
```

---

## 🐛 Troubleshooting

### Error: 404 NOT_FOUND

**Penyebab:** Routing issue

**Solusi:**
1. Check `vercel.json` ada di root
2. Check `api/index.js` exists
3. Redeploy: `vercel --prod`

### Error: 500 Internal Server Error

**Penyebab:** Environment variables tidak diset

**Solusi:**
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Add semua env vars
3. Redeploy

### Error: Module not found

**Penyebab:** Dependencies tidak terinstall

**Solusi:**
1. Check `package.json` dependencies
2. Vercel akan auto-install saat deploy
3. Jika masih error, check build logs

### Error: Function size too large

**Penyebab:** Dependencies terlalu besar (puppeteer)

**Solusi:**
✅ Sudah dihapus dari package.json
- Puppeteer removed
- Only essential dependencies

---

## 📊 Vercel Limits (Free Tier)

- **Bandwidth:** 100GB/month
- **Invocations:** 100GB-hours/month
- **Function Duration:** 10 seconds
- **Function Size:** 50MB
- **Deployments:** Unlimited

---

## 💡 Best Practices

### 1. Use Environment Variables
- Never commit `.env` file
- Set all secrets in Vercel dashboard

### 2. Optimize Bundle Size
- Remove unused dependencies
- Use production builds

### 3. Enable Caching
```javascript
// In your API responses
res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
```

### 4. Monitor Performance
- Check Vercel Analytics
- Monitor function execution time

### 5. Use CDN for Static Files
- Vercel automatically serves static files via CDN
- Put images/assets in `public/` folder

---

## 🔒 Security

### 1. CORS Configuration

Already configured in `server.js`:
```javascript
app.use(cors());
```

For production, restrict origins:
```javascript
app.use(cors({
  origin: ['https://your-domain.com', 'https://your-project.vercel.app']
}));
```

### 2. Rate Limiting

Consider adding rate limiting:
```bash
npm install express-rate-limit
```

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## 📚 Resources

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Node.js:** https://vercel.com/docs/functions/serverless-functions/runtimes/node-js
- **Vercel CLI:** https://vercel.com/docs/cli

---

## ✅ Deployment Checklist

- [ ] `vercel.json` created
- [ ] `api/index.js` created
- [ ] `.vercelignore` created
- [ ] `puppeteer` removed from package.json
- [ ] Code pushed to GitHub
- [ ] Project imported to Vercel
- [ ] Environment variables set
- [ ] Deployed successfully
- [ ] Test all endpoints
- [ ] Update frontend config

---

## 🎉 Done!

Your API is now live on Vercel! 🚀

**Next Steps:**
1. Test all endpoints
2. Update documentation with production URL
3. Share API with users
4. Monitor usage in Vercel dashboard

---

## 📞 Support

Jika ada masalah:
1. Check Vercel build logs
2. Check function logs di Vercel dashboard
3. Test locally first: `npm run api:dev`
4. Verify environment variables
