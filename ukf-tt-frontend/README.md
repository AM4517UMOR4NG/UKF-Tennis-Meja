# UKF Table Tennis — Frontend

Frontend aplikasi pendaftaran UKF Table Tennis menggunakan React + Vite + Tailwind CSS.

## Fitur

- Pendaftaran mahasiswa baru tanpa akun (one-shot registration)
- Pendaftaran turnamen
- Admin panel untuk mengelola pendaftaran
- Upload foto profil
- Responsive design dengan Tailwind CSS

## Setup

1. Install dependencies:
```bash
npm install
```

2. (Opsional) Buat file `.env` untuk mengatur API base URL:
```
VITE_API_BASE_URL=http://localhost:4000/api
```

3. Jalankan development server:
```bash
npm run dev
```

4. Build untuk production:
```bash
npm run build
```

## Struktur

- `src/pages/` - Halaman aplikasi
- `src/components/` - Komponen reusable
- `src/api.js` - Konfigurasi axios untuk API calls

## Teknologi

- React 18
- Vite
- Tailwind CSS
- React Router
- React Hook Form + Yup
- Axios

