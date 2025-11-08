# 🚀 Komiku REST API dengan Supabase

REST API modern untuk data manhwa menggunakan **Supabase Storage** sebagai database dan **Express.js** sebagai server.

---

## ✨ Fitur

- ✅ **REST API** - Endpoint lengkap untuk data manhwa
- ✅ **Supabase Storage** - Cloud storage untuk data JSON
- ✅ **Web Interface** - UI modern untuk browse dan copy API
- ✅ **Quick Copy** - Copy API URL dengan 1 klik
- ✅ **API Documentation** - Dokumentasi interaktif + test endpoint
- ✅ **Search & Filter** - Cari manhwa berdasarkan judul/genre
- ✅ **Pagination** - Support pagination untuk list data

---

## 📦 Instalasi

```bash
# Clone atau download project
cd "Restful API"

# Install dependencies (sudah terinstall)
npm install

# Setup sudah selesai!
```

---

## ⚙️ Konfigurasi

File `.env` sudah dibuat dengan kredensial Supabase:

```env
SUPABASE_URL=https://huhhzvaiqskhldhxexcu.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_BUCKET=komiku-data
PORT=3000
```

**Data Source:** `metadata/metadata.json` di Supabase Storage

---

## 🚀 Quick Start

### 1. Upload File ke Supabase

**Opsi A - Via Dashboard:**
1. Login ke https://supabase.com
2. Storage → `komiku-data` → buat folder `metadata`
3. Upload `metadata.json` ke folder `metadata/`

**Opsi B - Via Script:**
```bash
npm run upload
```

### 2. Jalankan Server

```bash
npm run api
```

Atau double-click: `start-api.bat`

### 3. Akses Web Interface

```
http://localhost:3000
```

---

## 🌐 Web Interface

### 1. **Halaman Utama** - http://localhost:3000
- Browse manhwa (Latest, All, Search)
- Detail modal dengan info lengkap
- UI modern dan responsive

### 2. **Quick Copy** - http://localhost:3000/quick-copy.html ⭐
- Copy API URL dengan 1 klik
- Custom URL builder
- Toast notification
- **Paling direkomendasikan untuk developer!**

### 3. **API Docs** - http://localhost:3000/api-docs.html
- Dokumentasi lengkap setiap endpoint
- Test endpoint langsung dari browser
- Copy JSON response
- Parameter explanation

---

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### 1. Get All Manhwa
```http
GET /api/manhwa?page=1&limit=20
```

**Query Parameters:**
- `page` (optional) - Halaman (default: 1)
- `limit` (optional) - Jumlah per halaman (default: 20)

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### 2. Get Latest Manhwa
```http
GET /api/manhwa/latest?limit=10
```

**Query Parameters:**
- `limit` (optional) - Jumlah data (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [...]
}
```

### 3. Get Manhwa Detail
```http
GET /api/manhwa/:slug
```

**Path Parameters:**
- `slug` (required) - Slug manhwa (contoh: solo-leveling)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "solo-leveling",
    "slug": "solo-leveling",
    "title": "Solo Leveling",
    "rating": 9.2,
    "genres": ["Action", "Fantasy"],
    "chapters": [...],
    "totalChapters": 100,
    ...
  },
  "source": "detail_file"
}
```

**Data Source:**
1. Primary: `Chapter/komiku/[slug].json` (detail lengkap + chapters)
2. Fallback: `metadata/metadata.json` (jika detail tidak ada)

### 4. Search Manhwa
```http
GET /api/search?q=keyword
```

**Query Parameters:**
- `q` (required) - Kata kunci pencarian

**Response:**
```json
{
  "success": true,
  "query": "keyword",
  "count": 5,
  "data": [...]
}
```

### 5. Get Chapters
```http
GET /api/chapters/:slug?page=1&limit=50
```

**Path Parameters:**
- `slug` (required) - Slug manhwa

**Query Parameters:**
- `page` (optional) - Halaman (default: 1)
- `limit` (optional) - Jumlah per halaman (default: 50)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "chapter-1",
      "number": "1",
      "title": "Chapter 1",
      "releaseDate": "2024-01-01T00:00:00.000Z",
      "url": "https://...",
      "images": [...]
    }
  ],
  "pagination": {...},
  "source": "detail_file"
}
```

### 6. Get Chapter Detail
```http
GET /api/chapters/:slug/:chapterId
```

**Path Parameters:**
- `slug` (required) - Slug manhwa
- `chapterId` (required) - ID chapter

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "chapter-1",
    "number": "1",
    "title": "Chapter 1",
    "images": [...],
    "manhwa": {
      "id": "solo-leveling",
      "title": "Solo Leveling",
      "slug": "solo-leveling"
    }
  },
  "source": "detail_file"
}
```

---

## 📁 Struktur Project

```
Restful API/
├── .env                        # Environment variables
├── package.json                # Dependencies
├── start-api.bat              # Quick start script
├── upload-to-supabase.js      # Upload script
├── metadata-example.json      # Contoh format list manhwa
├── chapter-detail-example.json # Contoh format detail + chapters
│
├── api/
│   ├── server.js              # Main server
│   ├── config/
│   │   └── supabase.js        # Supabase configuration
│   ├── routes/
│   │   ├── manhwa.js          # Manhwa routes
│   │   ├── chapter.js         # Chapter routes
│   │   └── search.js          # Search routes
│   ├── controllers/
│   │   ├── manhwaController.js
│   │   ├── chapterController.js
│   │   └── searchController.js
│   └── public/
│       ├── index.html         # Main UI
│       ├── quick-copy.html    # Quick copy page
│       ├── api-docs.html      # API documentation
│       ├── app.js             # Frontend logic
│       └── config.js          # Frontend config
│
└── docs/
    ├── README.md              # This file
    ├── QUICK_START.md         # Quick start guide
    ├── SUPABASE_SETUP.md      # Supabase setup guide
    └── CARA_PAKAI.md          # User guide (Indonesian)
```

---

## 🔧 Scripts

```bash
# Jalankan API server
npm run api

# Development mode (auto-reload)
npm run api:dev

# Upload file ke Supabase
npm run upload
```

---

## 📊 Format Data

File `metadata.json` harus berformat:

```json
[
  {
    "id": "manhwa-id",
    "title": "Manhwa Title",
    "alternativeTitle": "Alternative Title",
    "coverImage": "https://...",
    "rating": 8.5,
    "genres": ["Action", "Fantasy"],
    "status": "Ongoing",
    "type": "Manhwa",
    "author": "Author Name",
    "synopsis": "Description...",
    "lastUpdate": "2024-01-01T00:00:00.000Z",
    "url": "https://komiku.id/..."
  }
]
```

Lihat `metadata-example.json` untuk contoh lengkap.

---

## 🎯 Cara Copy API URL

### Metode 1 - Quick Copy (Tercepat) ⭐

1. Buka http://localhost:3000/quick-copy.html
2. Klik tombol **Copy** di endpoint yang diinginkan
3. URL langsung tersalin ke clipboard
4. Paste di Postman/Thunder Client/aplikasi Anda

### Metode 2 - Custom URL Builder

1. Buka http://localhost:3000/quick-copy.html
2. Scroll ke "Custom URL Builder"
3. Masukkan parameter (ID, keyword, dll)
4. Klik "Copy URL"

### Metode 3 - API Docs (Dengan Test)

1. Buka http://localhost:3000/api-docs.html
2. Klik "Copy" atau "Test Endpoint"
3. Lihat response dan copy JSON jika perlu

---

## 🔒 Security

- ✅ Menggunakan `service_role` key untuk akses private
- ✅ CORS enabled untuk akses dari browser
- ✅ Environment variables untuk kredensial
- ✅ Error handling di semua endpoint

---

## 🐛 Troubleshooting

### Error: "File not found in Supabase"
**Solusi:** Upload file `metadata.json` ke Supabase Storage di folder `metadata/`

### Error: "Missing Supabase credentials"
**Solusi:** Pastikan file `.env` ada dan berisi kredensial yang benar

### Port 3000 sudah digunakan
**Solusi:** Matikan server lama (Ctrl+C) atau ubah PORT di `.env`

### Data tidak muncul di web
**Solusi:**
1. Check console browser (F12)
2. Check terminal server untuk error
3. Test endpoint: http://localhost:3000/api/manhwa

---

## 📱 Akses dari Perangkat Lain

1. Cek IP komputer: `ipconfig`
2. Akses dari HP/laptop lain: `http://192.168.x.x:3000`

---

## 🚀 Deployment

### Vercel/Netlify:
1. Push ke GitHub
2. Connect repository
3. Set environment variables
4. Deploy!

### Environment Variables:
```
SUPABASE_URL=https://huhhzvaiqskhldhxexcu.supabase.co
SUPABASE_KEY=your-service-role-key
SUPABASE_BUCKET=komiku-data
PORT=3000
```

---

## 📚 Dokumentasi

- **QUICK_START.md** - Panduan cepat mulai
- **SUPABASE_SETUP.md** - Setup Supabase lengkap
- **UPLOAD_GUIDE.md** - Panduan upload file ke Supabase
- **CARA_PAKAI.md** - Panduan penggunaan web interface
- **RINGKASAN.txt** - Quick reference guide

---

## 🛠️ Tech Stack

- **Backend:** Node.js + Express.js
- **Database:** Supabase Storage (JSON files)
- **Frontend:** HTML + TailwindCSS + Vanilla JS
- **Icons:** Font Awesome
- **Deployment:** Vercel/Netlify ready

---

## ✅ Checklist

- [x] Environment variables configured
- [x] Supabase integration setup
- [x] API endpoints created
- [x] Web interface built
- [x] Quick copy feature added
- [ ] Upload metadata.json to Supabase
- [ ] Test all endpoints
- [ ] Ready to use!

---

## 📞 Support

- **Supabase Docs:** https://supabase.com/docs
- **Express Docs:** https://expressjs.com
- **API Docs:** http://localhost:3000/api-docs.html

---

**Dibuat dengan ❤️ untuk Komiku Manhwa Database**
