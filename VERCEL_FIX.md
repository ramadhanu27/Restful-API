# 🔧 Vercel 404 Error - Quick Fix

## ❌ Masalah
Error 404 NOT_FOUND saat deploy ke Vercel

## ✅ Solusi

### File yang Sudah Dibuat/Diupdate:

1. ✅ `vercel.json` - Simplified configuration
2. ✅ `api/index.js` - Complete serverless handler
3. ✅ `api.js` - Root level entry point
4. ✅ `index.js` - Alternative entry point

---

## 🚀 Deploy Ulang ke Vercel

### Step 1: Commit Changes

```bash
git add .
git commit -m "Fix Vercel 404 error"
git push
```

Vercel akan auto-redeploy (tunggu 2-3 menit)

---

### Step 2: Manual Redeploy (Jika Auto Deploy Tidak Jalan)

**Via Vercel Dashboard:**
1. Login https://vercel.com
2. Pilih project Anda
3. Tab **Deployments**
4. Klik **Redeploy** pada deployment terakhir
5. Atau klik **...** → **Redeploy**

**Via CLI:**
```bash
vercel --prod
```

---

## 🧪 Test Setelah Deploy

### Test API Endpoints:

```
https://your-project.vercel.app/api/manhwa?limit=5
https://your-project.vercel.app/api/manhwa/latest?limit=5
https://your-project.vercel.app/api/search?q=academy
```

### Test Web Interface:

```
https://your-project.vercel.app/
https://your-project.vercel.app/quick-copy.html
```

---

## ⚙️ Vercel Environment Variables

**PENTING:** Pastikan environment variables sudah diset!

### Check di Vercel Dashboard:

1. Project → **Settings**
2. Tab **Environment Variables**
3. Pastikan ada:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `SUPABASE_BUCKET`

### Jika Belum Ada, Tambahkan:

```
SUPABASE_URL=https://huhhzvaiqskhldhxexcu.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1aGh6dmFpcXNraGxkaHhleGN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDY5NDQxOCwiZXhwIjoyMDc2MjcwNDE4fQ.OdYbHT0jY2oWkKGufOnJb0uiZDAX-jO9kWMHx02uW94
SUPABASE_BUCKET=komiku-data
```

**Setelah tambah env vars, WAJIB REDEPLOY!**

---

## 🔍 Debug Jika Masih Error

### 1. Check Build Logs

**Via Dashboard:**
1. Project → **Deployments**
2. Klik deployment terakhir
3. Tab **Building**
4. Lihat error messages

### 2. Check Function Logs

**Via Dashboard:**
1. Project → **Deployments**
2. Klik deployment terakhir
3. Tab **Functions**
4. Lihat runtime logs

### 3. Test Locally

```bash
# Test di local dulu
npm run api:dev

# Test endpoint
curl http://localhost:3000/api/manhwa?limit=1
```

Jika local works tapi Vercel tidak:
- ✅ Check environment variables
- ✅ Check build logs
- ✅ Redeploy

---

## 🎯 Struktur File yang Benar

```
Restful API/
├── api/                      # API folder
│   ├── index.js             # Main serverless handler ✅
│   ├── server.js            # Express server
│   ├── config/
│   │   └── supabase.js
│   ├── routes/
│   │   ├── manhwa.js
│   │   ├── chapter.js
│   │   └── search.js
│   ├── controllers/
│   │   ├── manhwaController.js
│   │   ├── chapterController.js
│   │   └── searchController.js
│   └── public/              # Static files
│       ├── index.html
│       ├── quick-copy.html
│       └── app.js
├── vercel.json              # Vercel config ✅
├── api.js                   # Root entry point ✅
├── package.json
└── .env                     # Local only (not deployed)
```

---

## 💡 Alternative: Vercel CLI Deploy

Jika GitHub auto-deploy bermasalah:

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Link project (jika belum)
vercel link

# 4. Set environment variables
vercel env add SUPABASE_URL production
# Paste value: https://huhhzvaiqskhldhxexcu.supabase.co

vercel env add SUPABASE_KEY production
# Paste value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

vercel env add SUPABASE_BUCKET production
# Paste value: komiku-data

# 5. Deploy
vercel --prod
```

---

## 📋 Checklist

Sebelum deploy, pastikan:

- [x] `vercel.json` ada di root
- [x] `api/index.js` complete dengan routes
- [x] `api.js` ada di root
- [x] Environment variables set di Vercel
- [ ] Code di-push ke GitHub
- [ ] Redeploy triggered
- [ ] Test endpoints setelah deploy

---

## 🆘 Masih Error?

### Coba Ini:

1. **Delete & Recreate Project:**
   - Delete project di Vercel
   - Import ulang dari GitHub
   - Set environment variables
   - Deploy

2. **Check Framework Detection:**
   - Vercel Dashboard → Project Settings
   - Framework Preset: **Other** atau **Node.js**
   - Root Directory: `./`

3. **Check Build Command:**
   - Build Command: (kosongkan atau `npm run vercel-build`)
   - Output Directory: (kosongkan)
   - Install Command: `npm install`

---

## ✅ Expected Result

Setelah fix ini, Anda akan dapat:

```
✅ https://your-project.vercel.app/
✅ https://your-project.vercel.app/api/manhwa
✅ https://your-project.vercel.app/api/manhwa/latest
✅ https://your-project.vercel.app/api/search?q=test
✅ https://your-project.vercel.app/quick-copy.html
```

---

## 🎉 Success Indicators

Jika berhasil, Anda akan lihat:

1. ✅ Build success di Vercel
2. ✅ Function deployed
3. ✅ No 404 errors
4. ✅ API returns JSON data
5. ✅ Web interface loads

---

**Commit changes dan push ke GitHub untuk trigger redeploy!** 🚀
