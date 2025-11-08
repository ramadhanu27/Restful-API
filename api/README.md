# Komiku REST API

REST API untuk mengakses data manhwa dari Komiku.

## Instalasi

```bash
npm install
```

## Menjalankan Server

```bash
npm run api
```

atau untuk development mode dengan auto-reload:

```bash
npm run api:dev
```

## Web Interface

Setelah server berjalan, buka browser dan akses:
```
http://localhost:3000
```

Web interface menyediakan:
- **Latest Updates** - Manhwa dengan update terbaru
- **All Manhwa** - Semua manhwa dengan pagination
- **Search** - Pencarian berdasarkan judul atau genre
- **Detail Modal** - Informasi lengkap manhwa

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### 1. Get All Manhwa
```
GET /api/manhwa?page=1&limit=20
```

**Query Parameters:**
- `page` (optional): Halaman yang ingin diakses (default: 1)
- `limit` (optional): Jumlah data per halaman (default: 20)

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1000,
    "totalPages": 50
  }
}
```

### 2. Get Latest Manhwa
```
GET /api/manhwa/latest?limit=10
```

**Query Parameters:**
- `limit` (optional): Jumlah data yang ingin ditampilkan (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [...]
}
```

### 3. Get Manhwa Detail
```
GET /api/manhwa/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "manhwa-id",
    "title": "Manhwa Title",
    "alternativeTitle": "Alternative Title",
    "genres": [...],
    "rating": 8.5,
    ...
  }
}
```

### 4. Get Chapters by Manhwa
```
GET /api/chapters/:manhwaId?page=1&limit=50
```

**Query Parameters:**
- `page` (optional): Halaman yang ingin diakses (default: 1)
- `limit` (optional): Jumlah data per halaman (default: 50)

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 200,
    "totalPages": 4
  }
}
```

### 5. Get Chapter Detail
```
GET /api/chapters/:manhwaId/:chapterId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "chapter": "Chapter 1",
    "images": [...],
    ...
  }
}
```

### 6. Search Manhwa
```
GET /api/search?q=keyword
```

**Query Parameters:**
- `q` (required): Kata kunci pencarian

**Response:**
```json
{
  "success": true,
  "query": "keyword",
  "count": 10,
  "data": [...]
}
```

## Error Response

```json
{
  "success": false,
  "error": "Error message"
}
```

## Status Codes

- `200` - Success
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error
