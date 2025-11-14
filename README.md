# UKF Table Tennis 

Sistem pendaftaran anggota UKF Table Tennis dengan interface modern dan responsive.

## Struktur Proyek

```
Tennis_Meja/
├── ukf-tt-frontend/    # Frontend React + Vite + Tailwind
└── ukf-tt-backend/     # Backend Node.js + Express + MongoDB
```

## Quick Start

> ❗ **Deployment**  
> Repositori ini sekarang sudah dilengkapi `vercel.json` sehingga Vercel tahu bahwa source code utama berada di folder `ukf-tt-frontend`.

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


## Deploy ke Vercel

1. **Siapkan backend lebih dulu.** Deploy `ukf-tt-backend` ke layanan Node.js (misal Render, Railway, atau VPS) dan pastikan URL publiknya tersedia, misal `https://ukf-backend.vercel.app/api`.
2. **Set environment variable di Vercel.**  
   Masuk ke dashboard Vercel → Project Settings → Environment Variables dan tambahkan `VITE_API_BASE_URL` dengan nilai URL API backend Anda.
3. **Import repo di Vercel.**  
   Pilih opsi *Use Vercel Configuration* → Vercel otomatis membaca `vercel.json`, menjalankan `npm install` + `npm run build` di folder `ukf-tt-frontend`, dan mem-publish konten dari `dist/`.
4. **SPA fallback sudah aktif.**  
   `vercel.json` juga menambahkan route fallback ke `index.html` sehingga routing `react-router-dom` bekerja di production tanpa konfigurasi ekstra.
5. **Tes hasil deploy.**  
   Setelah build sukses, buka URL Vercel Anda dan cek form pendaftaran. Jika API gagal dipanggil, pastikan ENV `VITE_API_BASE_URL` sudah benar dan backend mengizinkan CORS dari domain Vercel.

