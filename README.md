# WARAS - Real-time IoT Dashboard for Smart Aquaculture

<p align="center">
  <img src="./public/logo-light.png#gh-light-mode-only" alt="WARAS Logo" width="300">
  <img src="./public/logo-dark2.png#gh-dark-mode-only" alt="WARAS Logo" width="300">
</p>

<p align="center">
  Sebuah dashboard web modern untuk memonitor dan mengontrol kualitas air secara <em>real-time</em>, dirancang khusus untuk sistem akuakultur cerdas.
</p>

---

## 📖 Tentang Proyek

**WARAS (Water-Quality Realtime Analyzing System)** adalah sebuah solusi berbasis web yang dibangun untuk menjawab tantangan dalam budidaya perairan modern. Dashboard ini menyediakan antarmuka yang intuitif untuk memantau parameter air krusial seperti **pH**, **Dissolved Oxygen (DO)**, dan **suhu** secara langsung dari sensor IoT.

Tidak hanya memonitor, sistem ini juga dilengkapi dengan fitur kontrol aktuator jarak jauh, analisis prediktif berbasis AI, dan sistem manajemen pengguna yang aman, menjadikannya alat yang komprehensif untuk petambak atau peneliti.

## ✨ Fitur Utama

- **Dasbor Real-time:** Pantau parameter vital dengan update langsung dari perangkat keras (ESP32) melalui Firebase Realtime Database.
- **Visualisasi Data Historis:** Analisis tren data dengan grafik interaktif yang mendukung fitur *zoom* dan *brushing* untuk rentang waktu tertentu.
- **Analisis Prediktif AI:** Manfaatkan model regresi linear sederhana untuk memprediksi kondisi air di masa depan dan mengantisipasi potensi masalah.
- **Kontrol Aktuator Jarak Jauh:** Kendalikan perangkat seperti Penebar Pakan (*Feeder*) dan Pelontar Pakan secara manual dari mana saja.
- **Manajemen Akses Berbasis Peran:**
  - **Master:** Akses tanpa batas untuk mengontrol semua aktuator.
  - **Publik:** Akses terbatas untuk mencegah spam dan menjaga keawetan perangkat keras.
- **Rate Limiting:** Pengguna publik dibatasi hanya dapat mengirim 2 perintah kontrol setiap 2 jam untuk menjaga stabilitas sistem.
- **Ekspor Data:** Unduh data historis dalam format **CSV** atau **XML** untuk analisis offline atau keperluan laporan.
- **Autentikasi Aman:** Sistem login yang mendukung Email/Password dan integrasi dengan Google Sign-In.
- **Mode Terang & Gelap:** Tampilan antarmuka yang nyaman dan dapat disesuaikan dengan preferensi pengguna.
- **Desain Responsif:** Akses dashboard dengan optimal dari perangkat desktop maupun mobile.

## Teknologi yang Digunakan

| Kategori | Teknologi |
| :--- | :--- |
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) |
| **Backend & Database** | ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black) (Realtime Database, Auth, Analytics) |
| **Library Grafik** | ![Recharts](https://img.shields.io/badge/Recharts-0088FE?style=for-the-badge) |
| **Deployment** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) |

## 🏁 Memulai

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut.

### Prasyarat

- [Node.js](https://nodejs.org/en/) (v18.x atau lebih baru)
- `npm` atau `yarn`

### 🔧 Konfigurasi Firebase

Proyek ini memerlukan Firebase sebagai backend. Ikuti langkah-langkah ini untuk menyiapkan dan mendapatkan kredensial yang diperlukan.

1.  **Buat Proyek di Firebase:**
    - Kunjungi Firebase Console.
    - Klik "**Add project**" dan ikuti petunjuk untuk membuat proyek baru (Anda bisa menonaktifkan Google Analytics jika tidak dibutuhkan untuk awal).

2.  **Buat Aplikasi Web:**
    - Di dasbor proyek Anda, klik ikon Web (`</>`) untuk menambahkan aplikasi web baru.
    - Beri nama aplikasi Anda (misal: "waras-dashboard") dan klik "**Register app**".
    - Firebase akan menampilkan objek `firebaseConfig`. **Salin semua nilai di dalamnya**, karena akan digunakan pada langkah selanjutnya.

3.  **Aktifkan Layanan yang Dibutuhkan:**
    - **Authentication:**
        - Dari menu samping, buka `Build > Authentication`.
        - Klik "**Get started**".
        - Di tab "**Sign-in method**", aktifkan provider **Email/Password** dan **Google**.
    - **Realtime Database:**
        - Dari menu samping, buka `Build > Realtime Database`.
        - Klik "**Create Database**".
        - Pilih lokasi server (misalnya, `asia-southeast1`).
        - Pilih untuk memulai dalam **Test mode**. Ini akan mengizinkan akses baca/tulis tanpa aturan kompleks, cocok untuk development.
        > **Penting:** Untuk produksi, Anda harus memperketat Aturan Keamanan Anda.

### Instalasi

1.  **Clone repository ini:**
    ```sh
    git clone https://github.com/username/waras-iot-dashboard.git
    cd waras-iot-dashboard
    ```

2.  **Install dependensi:**
    ```sh
    npm install
    # atau
    yarn install
    ```

3.  **Konfigurasi Environment Variables:**
    Salin file contoh `.env.local.example` menjadi file baru bernama `.env.local`.
    ```sh
    cp .env.local.example .env.local
    ```
    Kemudian, isi semua variabel di dalam file `.env.local` dengan kredensial yang Anda dapatkan dari **Langkah 2 Konfigurasi Firebase**.

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

4.  **Jalankan server development:**
    ```sh
    npm run dev
    # atau
    yarn dev
    ```

5.  Buka http://localhost:3000 di browser Anda untuk melihat hasilnya.

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

Dibuat dengan ❤️ untuk kemajuan akuakultur Indonesia.