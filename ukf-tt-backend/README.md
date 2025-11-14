# UKF Table Tennis — Backend

Backend API untuk aplikasi pendaftaran UKF Table Tennis menggunakan Node.js + Express + MongoDB.

## Fitur

- Endpoint pendaftaran mahasiswa baru
- Endpoint pendaftaran turnamen
- Admin endpoints (list, approve, export CSV)
- Upload foto profil (disimpan lokal di `/uploads`)
- Proteksi admin menggunakan API key

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` menjadi `.env` dan sesuaikan:
```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/ukf_tt
ADMIN_API_KEY=super-secret-admin-key-ubahini
UPLOAD_DIR=uploads
```

3. Pastikan MongoDB berjalan (local atau gunakan MongoDB Atlas)

4. Jalankan server:
```bash
npm run dev
```
atau
```bash
npm start
```

### Tanpa MongoDB lokal?
Gunakan database in-memory (hanya untuk pengujian) dengan:
```bash
npm run dev:memory
```
Script ini otomatis menjalankan Mongo Memory Server, mengisi `MONGODB_URI`, lalu start API sehingga kamu bisa cek endpoint tanpa butuh instalasi Mongo di mesin lokal.

## Deploy ke Render/Railway
1. **Buat environment variables** sesuai `.env.example` (PORT, MONGODB_URI, ADMIN_API_KEY, UPLOAD_DIR).  
   - Render: Dashboard → Service → Environment → tambahkan key/value.  
   - Railway: Variables tab → Add Variable.
2. **Siapkan MongoDB**:
   - Render: gunakan MongoDB Atlas (gratis) dan isi `MONGODB_URI` dengan connection string (`?retryWrites=true&w=majority`).
   - Railway: tambahkan plugin Mongo → salin `DATABASE_URL` → gunakan sebagai `MONGODB_URI`.
3. **Build & Start command**:
   - Build: `npm install`
   - Start: `npm start`
4. **Uploads**:
   - Jika ingin simpan file di storage eksternal (S3, Cloudinary), ganti implementasi di `routes/registrations.js`.
   - Jika tetap gunakan filesystem, pastikan platform mendukung persistent disk (Render disk, Railway volume).
5. **Frontend**:
   - Endpoint backend akan dilayani di `<service-url>/api/...`. Pastikan frontend `VITE_API_BASE_URL` menunjuk ke URL ini.

## Endpoints

### Public
- `POST /api/registrations` - Pendaftaran mahasiswa baru
- `POST /api/registrations/tournaments/:id/register` - Pendaftaran turnamen

### Admin (memerlukan `Authorization: Bearer <ADMIN_API_KEY>`)
- `GET /api/admin/registrations` - List semua pendaftaran
- `GET /api/admin/registrations?export=csv` - Export CSV
- `PUT /api/admin/registrations/:id/approve` - Approve pendaftaran

## Catatan Keamanan

⚠️ **PENTING**: Sebelum production, pertimbangkan:
- Ganti proteksi admin dengan autentikasi yang lebih kuat (OAuth, session-based)
- Validasi dan scan file upload
- Rate limiting untuk mencegah spam
- Sanitasi input untuk mencegah XSS/NoSQL injection
- Gunakan HTTPS di production

## Struktur

- `models/` - Mongoose models
- `routes/` - Express routes
- `middleware/` - Custom middleware
- `uploads/` - Direktori untuk file upload (otomatis dibuat)

