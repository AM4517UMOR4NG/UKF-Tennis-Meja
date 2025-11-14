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

