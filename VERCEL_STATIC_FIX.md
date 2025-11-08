# 🎨 Vercel Static Assets Fix

## ✅ Yang Sudah Diperbaiki

### 1. **vercel.json** - Added Static Routes
```json
{
  "routes": [
    {
      "src": "/(.*\\.(html|css|js|json|png|jpg|jpeg|gif|svg|ico))",
      "dest": "/api/public/$1"
    }
  ]
}
```

### 2. **api/index.js** - Explicit HTML Serving
- ✅ Root route serves `index.html`
- ✅ HTML files explicitly handled
- ✅ Static middleware configured

### 3. **.vercelignore** - Optimized
- ✅ Exclude unnecessary files
- ✅ Reduce deployment size

---

## 🚀 Deploy Ulang

### Step 1: Commit & Push

```bash
git add .
git commit -m "Fix static assets serving"
git push
```

### Step 2: Wait for Redeploy

Tunggu 2-3 menit untuk auto-deploy.

---

## 🧪 Test Static Assets

### Test Web Interface:

```
https://your-project.vercel.app/
https://your-project.vercel.app/quick-copy.html
https://your-project.vercel.app/api-docs.html
```

### Test API:

```
https://your-project.vercel.app/api/manhwa?limit=5
https://your-project.vercel.app/api/manhwa/latest
```

---

## 📁 File Structure di Vercel

Setelah deploy, struktur yang di-serve:

```
/                           → api/public/index.html
/quick-copy.html           → api/public/quick-copy.html
/api-docs.html             → api/public/api-docs.html
/app.js                    → api/public/app.js
/config.js                 → api/public/config.js
/api/manhwa                → API endpoint
/api/search                → API endpoint
```

---

## 🔍 Verify Deployment

### Check di Vercel Dashboard:

1. **Deployment** tab
2. Klik deployment terakhir
3. **Static Assets** section
4. Pastikan ada:
   - `/api/public/index.html`
   - `/api/public/quick-copy.html`
   - `/api/public/app.js`
   - `/api/public/config.js`

---

## ⚙️ Update Frontend Config

Setelah deploy, update `api/public/config.js`:

```javascript
// Auto-detect environment
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api'
  : `${window.location.origin}/api`;

console.log('API Base URL:', API_BASE_URL);
```

Atau hardcode production URL:

```javascript
const API_BASE_URL = 'https://your-project.vercel.app/api';
```

---

## 💡 Tips

### 1. Cache Static Assets

Add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*\\.(html|css|js|json|png|jpg|jpeg|gif|svg|ico))",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, must-revalidate"
        }
      ]
    }
  ]
}
```

### 2. Compress Assets

Vercel automatically compresses:
- HTML
- CSS
- JavaScript
- JSON

### 3. CDN Distribution

Vercel serves static files via global CDN automatically.

---

## 🐛 Troubleshooting

### Issue: HTML Not Loading

**Check:**
1. File exists in `api/public/`
2. File name correct (case-sensitive)
3. Routes configured in `vercel.json`

**Fix:**
```bash
# Verify files exist
ls api/public/

# Should show:
# index.html
# quick-copy.html
# api-docs.html
# app.js
# config.js
```

### Issue: CSS/JS Not Loading

**Check:**
1. Paths in HTML correct
2. Files in `api/public/`
3. No CORS errors in browser console

**Fix:**
Update HTML file paths:
```html
<!-- Use relative paths -->
<script src="config.js"></script>
<script src="app.js"></script>

<!-- Or absolute paths -->
<script src="/config.js"></script>
<script src="/app.js"></script>
```

### Issue: 404 on Static Files

**Check Vercel logs:**
1. Dashboard → Deployments
2. Click deployment
3. Functions tab → Check logs

**Common causes:**
- File not in `api/public/`
- Wrong path in HTML
- Route not configured

---

## ✅ Checklist

- [x] `vercel.json` updated with routes
- [x] `api/index.js` has static serving
- [x] `.vercelignore` optimized
- [ ] **Code pushed to GitHub**
- [ ] **Redeploy completed**
- [ ] **Test web interface**
- [ ] **Test API endpoints**
- [ ] **Check browser console for errors**

---

## 🎯 Expected Result

Setelah fix:

### ✅ Web Interface Works:
- Homepage loads
- Quick Copy page works
- API Docs accessible
- JavaScript executes
- CSS styles applied

### ✅ API Works:
- All endpoints respond
- JSON data returned
- CORS enabled
- No 404 errors

---

## 📊 Performance

Vercel provides:
- ✅ Global CDN
- ✅ Automatic compression
- ✅ HTTP/2 support
- ✅ Edge caching
- ✅ DDoS protection

---

**Push code dan test setelah redeploy!** 🚀
