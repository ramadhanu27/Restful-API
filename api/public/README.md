# Komiku API Web Interface

Web interface untuk menampilkan data manhwa dari Komiku REST API.

## Fitur

- **Latest Updates** - Menampilkan manhwa dengan update terbaru
- **All Manhwa** - Menampilkan semua manhwa dengan pagination
- **Search** - Mencari manhwa berdasarkan judul atau genre
- **Detail Modal** - Melihat detail lengkap manhwa

## Cara Menggunakan

1. Pastikan server API sudah berjalan:
```bash
npm run api
```

2. Buka browser dan akses:
```
http://localhost:3000
```

3. Web interface akan otomatis terhubung ke API di `http://localhost:3000/api`

## Teknologi yang Digunakan

- **HTML5** - Struktur halaman
- **Tailwind CSS** - Styling modern dan responsive
- **Vanilla JavaScript** - Interaksi dan API calls
- **Font Awesome** - Icons

## Fitur Detail

### Latest Updates
- Menampilkan manhwa terbaru berdasarkan update terakhir
- Dapat memilih jumlah item yang ditampilkan (10, 20, 30, 50)

### All Manhwa
- Menampilkan semua manhwa dengan pagination
- Dapat memilih jumlah item per halaman (12, 24, 36, 48)
- Navigasi pagination yang user-friendly

### Search
- Mencari manhwa berdasarkan judul
- Mencari berdasarkan genre
- Menampilkan jumlah hasil pencarian

### Detail Modal
- Menampilkan cover image
- Rating manhwa
- Genres
- Synopsis
- Status dan informasi lainnya
- Link ke halaman asli Komiku
