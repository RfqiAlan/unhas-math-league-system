# UNHAS Math League System (`unhas-math-league-system`)

> **Sistem Turnamen & Klasemen Resmi Cerdas Cermat Matematika**  
> Pusat Konsultasi Matematika (PKM) — Fakultas Matematika dan Ilmu Pengetahuan Alam, Universitas Hasanuddin (UNHAS)

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Supported-emerald?logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-Academic-crimson)]()

---

## 📌 Gambaran Umum

Platform kompetisi cerdas cermat matematika untuk mengelola dan menyajikan data turnamen round-robin 9 pekan PKM FMIPA UNHAS. Dibangun dengan frontend React berperforma tinggi dan backend Next.js App Router API Routes.

### Divisi Kompetisi
1. **Mathematics Champions League (MCL)**: Divisi kasta utama untuk mahasiswa senior dan kualifikasi jalur prestasi (Jumat, 16.00 WITA).
2. **Mathematics Rookie League (MRL)**: Divisi kasta pengembangan untuk mahasiswa tingkat muda (Rabu, 16.00 WITA).

---

## 🚀 Fitur Utama

- **Tabel Klasemen Interaktif (High-Density)**: Perhitungan klasemen real-time dengan hierarki tie-breaker resmi:
  $$\text{Total Poin} \longrightarrow \text{Soal Benar (SB)} \longrightarrow \text{Total Skor} \longrightarrow \text{Alfabetis}$$
- **Jadwal & Hasil Duel 9 Pekan**: Tampilan fixture per pekan lengkap dengan status duel, skor kotor, soal benar, dan penalti.
- **Regulasi Walkover (WO) & Denda Otomatis**:
  - **WO Sepihak**: Pemenang (+3 Poin). Peserta absen mendapatkan sanksi **Denda -50 Skor** yang otomatis memotong skor di pekan berikutnya.
  - **WO Ganda**: Status Seri (+1 Poin) dengan denda -50 skor untuk kedua belah pihak.
- **Podium Kejuaraan Arsitektural**: Apresiasi visual Top 3 (Champion, Runner Up, 3rd Place) bertekstur brushed metal.
- **Showcase MVP Pekan**: Menampilkan peserta terbaik pekanan dengan foto potret, kontrol offset (X/Y), dan skala tampilan.
- **Buku Pedoman & Simulator Interaktif (`/guidebook`)**: Regulasi lengkap Bab I s/d Bab IV beserta simulator skor duel.
- **Panel Kontrol Staf PKM**:
  - Input & edit skor duel
  - Manajemen data MVP pekanan
  - Pembaruan podium kejuaraan
  - Pendaftaran & penghapusan peserta
- **Ekspor Grafik Klasemen PNG**: Tangkapan layar beresolusi tinggi langsung dari browser via `html2canvas`.
- **Hybrid Data Layer (Supabase + Local Engine)**: Mendukung sinkronisasi Supabase dengan fallback penyimpanan lokal server yang kebal terhadap batasan Row-Level Security (RLS).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS kustom (Anti-Slop Tournament Theme)
- **Database / Backend**: Supabase Client + Server JSON Store Fallback
- **Utility**: `html2canvas`

---

## 💻 Memulai (Local Development)

### 1. Kloning Repositori
```bash
git clone https://github.com/RfqiAlan/unhas-math-league-system.git
cd unhas-math-league-system
```

### 2. Instal Dependensi
```bash
npm install
```

### 3. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) pada peramban Anda.

### 4. Build untuk Produksi
```bash
npm run build
npm run start
```

---

## 🔐 Kredensial Akses Staf

- **Email**: `admin@pkm.unhas.ac.id`
- **Kata Sandi**: `pkm2026`

---

## 🚢 Deploy ke Vercel

Proyek ini telah dikonfigurasi secara native untuk Vercel:
1. Hubungkan repositori GitHub `RfqiAlan/unhas-math-league-system` ke Vercel Dashboard.
2. Vercel akan otomatis mendeteksi konfigurasi Next.js (`npm run build`).
3. *(Opsional)* Tambahkan variabel lingkungan Supabase:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Tekan **Deploy**.

---

&copy; 2026 Pusat Konsultasi Matematika (PKM) FMIPA Universitas Hasanuddin.
