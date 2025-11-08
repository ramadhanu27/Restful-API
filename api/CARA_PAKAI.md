# Cara Menggunakan Komiku API

## 🚀 Quick Start

### 1. Jalankan Server
```bash
npm run api
```
atau double-click file `start-api.bat`

### 2. Buka Web Interface
Buka browser dan akses: **http://localhost:3000**

---

## 📖 Fitur Web Interface

### Halaman Utama (index.html)
Menampilkan data manhwa dengan 3 tab:
- **Latest** - Manhwa update terbaru
- **All Manhwa** - Semua manhwa dengan pagination
- **Search** - Cari manhwa berdasarkan judul/genre

### Halaman API Documentation (api-docs.html)
**Fitur utama untuk copy API URL!**

#### Cara Copy API Endpoint:
1. Klik tombol **"API Docs"** di navigation bar
2. Setiap endpoint memiliki tombol **"Copy"**
3. Klik tombol copy untuk menyalin URL endpoint
4. URL akan otomatis tersalin ke clipboard
5. Paste di aplikasi/tool yang Anda gunakan (Postman, Thunder Client, dll)

#### Fitur Test Endpoint:
- Klik tombol **"Test Endpoint"** untuk mencoba API langsung
- Hasil response akan ditampilkan dalam format JSON
- JSON response juga bisa di-copy dengan tombol **"Copy JSON"**

---

## 🔗 Daftar API Endpoints

### 1. Get All Manhwa
```
GET http://localhost:3000/api/manhwa?page=1&limit=20
```
**Copy:** Klik tombol copy di halaman API Docs

### 2. Get Latest Manhwa
```
GET http://localhost:3000/api/manhwa/latest?limit=10
```
**Copy:** Klik tombol copy di halaman API Docs

### 3. Get Manhwa Detail
```
GET http://localhost:3000/api/manhwa/:id
```
**Copy:** Klik tombol copy di halaman API Docs
**Test:** Masukkan ID manhwa dan klik Test

### 4. Get Chapters
```
GET http://localhost:3000/api/chapters/:manhwaId?page=1&limit=50
```
**Copy:** Klik tombol copy di halaman API Docs

### 5. Search Manhwa
```
GET http://localhost:3000/api/search?q=keyword
```
**Copy:** Klik tombol copy di halaman API Docs
**Test:** Masukkan kata kunci dan klik Test

---

## 💡 Tips Penggunaan

### Untuk Developer:
1. Buka halaman **API Docs** (http://localhost:3000/api-docs.html)
2. Copy endpoint yang dibutuhkan
3. Paste di Postman/Thunder Client/Insomnia
4. Test langsung dari browser dengan tombol "Test Endpoint"

### Untuk Integrasi ke Aplikasi:
```javascript
// Contoh fetch API
const response = await fetch('http://localhost:3000/api/manhwa/latest?limit=10');
const data = await response.json();
console.log(data);
```

### Base URL untuk Production:
Jika deploy ke server, ganti base URL di file `config.js`:
```javascript
const API_CONFIG = {
    baseUrl: 'https://your-domain.com/api',
    // ...
};
```

---

## 📱 Akses dari Perangkat Lain

Jika ingin akses dari HP/laptop lain di jaringan yang sama:

1. Cari IP address komputer Anda:
```bash
ipconfig
```

2. Akses dari perangkat lain:
```
http://192.168.x.x:3000
```
(Ganti dengan IP address komputer Anda)

---

## ❓ Troubleshooting

### Port 3000 sudah digunakan?
Matikan server yang lama dengan `Ctrl+C` di terminal, atau ubah PORT di `.env`:
```
PORT=3001
```

### API tidak bisa diakses?
- Pastikan server sudah running
- Check console untuk error messages
- Pastikan file metadata ada di `public/metadata/`

### Copy tidak berfungsi?
- Pastikan browser mendukung Clipboard API
- Gunakan browser modern (Chrome, Firefox, Edge)
- Pastikan HTTPS jika di production

---

## 📞 Support

Jika ada masalah, check:
1. Console browser (F12 > Console)
2. Terminal server untuk error logs
3. File README.md untuk dokumentasi lengkap
