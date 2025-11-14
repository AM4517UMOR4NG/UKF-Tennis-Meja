# UKF Table Tennis — Paket Lengkap

Sistem pendaftaran anggota UKF Table Tennis dengan interface modern dan responsive.

## Struktur Proyek

```
Tennis_Meja/
├── ukf-tt-frontend/    # Frontend React + Vite + Tailwind
└── ukf-tt-backend/     # Backend Node.js + Express + MongoDB
```

## Quick Start

### Backend

1. Masuk ke folder backend:
```bash
cd ukf-tt-backend
```

2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

4. Edit `.env` dan sesuaikan `MONGODB_URI` dan `ADMIN_API_KEY`

5. Pastikan MongoDB berjalan, lalu jalankan:
```bash
npm run dev
```

### Frontend

1. Masuk ke folder frontend:
```bash
cd ukf-tt-frontend
```

2. Install dependencies:
```bash
npm install
```

3. (Opsional) Buat `.env` untuk mengatur API URL:
```
VITE_API_BASE_URL=http://localhost:4000/api
```

4. Jalankan development server:
```bash
npm run dev
```

## Fitur

- ✅ Pendaftaran mahasiswa baru tanpa akun (one-shot)
- ✅ Pendaftaran turnamen
- ✅ Upload foto profil
- ✅ Admin panel untuk mengelola pendaftaran
- ✅ Export data ke CSV
- ✅ Responsive design

## Dokumentasi

Lihat README di masing-masing folder:
- [Frontend README](./ukf-tt-frontend/README.md)
- [Backend README](./ukf-tt-backend/README.md)

## Catatan

Proyek ini menggunakan proteksi admin sederhana dengan API key. Untuk production, disarankan menggunakan autentikasi yang lebih kuat.

