# WARAS - Real-time IoT Dashboard for Smart Aquaculture

<p align="center">
  <img src="./public/logo-light.png#gh-light-mode-only" alt="WARAS Logo" width="300">
  <img src="./public/logo-dark2.png#gh-dark-mode-only" alt="WARAS Logo" width="300">
</p>

<p align="center">
  Sebuah dasbor web modern yang didedikasikan untuk pemantauan dan pengendalian kualitas air secara <em>real-time</em>, dirancang secara spesifik untuk sistem akuakultur cerdas.
</p>

---

## ⚖️ License & Copyright
**© 2026 Gerrio Irfan Pratama**

This project is strictly for educational, research, and personal use. It is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/). 
**Commercial use, including selling the software, hardware design, or integrating it into a commercial product, is strictly prohibited without explicit permission.**

## 📖 Latar Belakang Proyek

**WARAS (Water-Quality Realtime Analyzing System)** merupakan sebuah solusi berbasis web yang dibangun untuk menjawab tantangan dalam akuakultur modern. Dasbor ini menyajikan antarmuka yang intuitif untuk melakukan pemantauan parameter krusial kualitas air, seperti **pH**, **Oksigen Terlarut (DO)**, dan **suhu**, yang diterima secara langsung dari sensor IoT.

Lebih dari sekadar pemantauan, sistem ini dilengkapi dengan fitur kendali aktuator jarak jauh, analisis prediktif berbasis kecerdasan buatan (AI), dan sistem manajemen pengguna yang aman, menjadikannya sebuah perangkat komprehensif bagi para petambak maupun peneliti.

## ✨ Fitur Utama

- **Dasbor Real-time:** Pemantauan parameter vital dengan pembaruan data langsung dari perangkat keras (ESP32) melalui Firebase Realtime Database.
- **Visualisasi Data Historis:** Analisis tren data melalui grafik interaktif yang mendukung fitur *zoom* dan *brushing* untuk rentang waktu spesifik.
- **Analisis Prediktif AI:** Pemanfaatan model regresi linear untuk memprediksi kondisi air di masa depan dan mengantisipasi potensi masalah.
- **Kendali Aktuator Jarak Jauh:** Pengendalian manual perangkat seperti Penebar Pakan (*Feeder*) dan Pelontar Pakan dari lokasi mana pun.
- **Manajemen Akses Berbasis Peran:**
  - **Master:** Akses tanpa batas untuk mengontrol seluruh aktuator.
  - **Publik:** Akses terbatas untuk mencegah penyalahgunaan dan menjaga durabilitas perangkat keras.
- **Pembatasan Tingkat Akses (Rate Limiting):** Pengguna publik dibatasi untuk mengirim maksimal 2 perintah kontrol setiap 2 jam demi menjaga stabilitas sistem.
- **Ekspor Data:** Kemampuan untuk mengunduh data historis dalam format **CSV** atau **XML** untuk analisis luring atau keperluan pelaporan.
- **Autentikasi Aman:** Sistem login yang mendukung Email/Password serta integrasi dengan Google Sign-In.
- **Mode Terang & Gelap:** Antarmuka yang nyaman dan dapat disesuaikan dengan preferensi visual pengguna.
- **Desain Responsif:** Aksesibilitas optimal dari perangkat desktop maupun mobile.

## Tumpukan Teknologi

| Kategori | Teknologi |
| :--- | :--- |
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) |
| **Backend & Database** | ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black) (Realtime Database, Auth, Analytics) |
| **Pustaka Grafik** | ![Recharts](https://img.shields.io/badge/Recharts-0088FE?style=for-the-badge) |
| **Deployment** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) |

## 🏁 Panduan Memulai

Untuk menjalankan proyek ini pada lingkungan lokal Anda, ikuti langkah-langkah berikut.

### Prasyarat

 - [Node.js](https://nodejs.org/en/) (v18.x atau versi lebih baru)
- `npm` atau `yarn`

### 🔧 Konfigurasi Firebase

Proyek ini memerlukan Firebase sebagai backend. Ikuti langkah-langkah berikut untuk melakukan penyiapan dan mendapatkan kredensial yang diperlukan.

1.  **Buat Proyek di Firebase:**
    - Kunjungi Konsol Firebase.
    - Klik "**Add project**" dan ikuti instruksi untuk membuat proyek baru (Anda dapat menonaktifkan Google Analytics jika tidak diperlukan pada tahap awal).

2.  **Buat Aplikasi Web:**
    - Pada dasbor proyek Anda, klik ikon Web (`</>`) untuk menambahkan aplikasi web baru.
    - Beri nama aplikasi Anda (misal: "waras-dashboard") dan klik "**Register app**".
    - Firebase akan menampilkan objek `firebaseConfig`. **Salin semua nilainya**, karena akan digunakan pada langkah selanjutnya.

3.  **Aktifkan Layanan yang Diperlukan:**
    - **Authentication:**
        - Dari menu samping, navigasi ke `Build > Authentication`.
        - Klik "**Get started**".
        - Pada tab "**Sign-in method**", aktifkan penyedia layanan **Email/Password** dan **Google**.
    - **Realtime Database:**
        - Dari menu samping, navigasi ke `Build > Realtime Database`.
        - Klik "**Create Database**".
        - Pilih lokasi server (misalnya, `asia-southeast1`).
        - Pilih untuk memulai dalam **mode Uji (Test mode)**. Mode ini mengizinkan akses baca/tulis tanpa aturan kompleks, ideal untuk tahap pengembangan.
        > **Penting:** Untuk lingkungan produksi, Anda wajib memperketat Aturan Keamanan (Security Rules).

### Instalasi

1.  **Kloning repositori ini:**
    ```sh
    git clone https://github.com/username/waras-iot-dashboard.git
    cd waras-iot-dashboard
    ```

2.  **Instalasi dependensi:**
    ```sh
    npm install
    # atau
    yarn install
    ```

3.  **Konfigurasi Variabel Lingkungan:**
    Salin berkas contoh `.env.local.example` menjadi berkas baru bernama `.env.local`.
    ```sh
    cp .env.local.example .env.local
    ```
    Selanjutnya, isi semua variabel di dalam berkas `.env.local` dengan kredensial yang Anda peroleh dari **Langkah 2 Konfigurasi Firebase**.

    ```plaintext
    # Firebase Configuration
    NEXT_PUBLIC_FIREBASE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    NEXT_PUBLIC_FIREBASE_DATABASE_URL=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    NEXT_PUBLIC_FIREBASE_APP_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    ```

4.  **Jalankan server pengembangan:**
    ```sh
    npm run dev
    # atau
    yarn dev
    ```

5.  Buka http://localhost:3000 pada peramban Anda untuk melihat hasilnya.

## 📁 Struktur Proyek

```
waras-iot-dashboard/
├── components/         # Komponen React UI (Card, Chart, Modal, dll.)
├── lib/                # Logika utama & hooks
│   ├── firebase.ts     # Konfigurasi koneksi Firebase
│   ├── hooks.ts        # Custom hooks untuk fetching data & otentikasi
│   ├── predictive.ts   # Fungsi untuk kalkulasi prediksi
│   └── types.ts        # Definisi tipe TypeScript
├── pages/              # Halaman & routing Next.js
├── public/             # Aset statis (gambar, logo)
├── styles/             # File CSS global
├── .env.local.example  # Contoh file environment
├── next.config.js      # Konfigurasi Next.js
└── tsconfig.json       # Konfigurasi TypeScript
```

## 📄 Lisensi

Didistribusikan di bawah Lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.

---
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-red.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
