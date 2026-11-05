# UTS Teknologi Web - Aplikasi Pemesanan Vila Permai
Nama: Assyifa
NIM: 24011130336
Kelas: D3/MI/5A/M
Program Studi: D3 Manajemen Informatika
Perguruan Tinggi: Universitas Bani Saleh
Repository: `uts-vila-permai-24011130336`

## Ringkasan Proyek
Proyek ini dibuat untuk memenuhi tugas UTS Teknologi Web. Aplikasi "Vila Permai" merupakan platform pemesanan vila statis (*client-side*) yang dirancang untuk membantu pemesanan vila milik Pak Hendra di daerah Puncak, Bogor. 

## Fitur yang Dikerjakan
- Render Data Dinamis: Daftar vila ditampilkan dari data array objek JavaScript menggunakan metode `createElement` dan `appendChild`.
- Pencarian & Filter: Fitur filter nama atau lokasi vila secara *real-time* saat pengguna mengetik kata kunci.
- Kalkulasi Biaya Otomatis: Perhitungan total harga menginap berdasarkan durasi (tanggal check-in & check-out) dan tarif per malam vila.
- Validasi Form (Bahasa Indonesia): Pengecekan input nama wajib diisi, mencegah pemilihan tanggal di masa lalu, memastikan tanggal check-out setelah check-in, serta batasan jumlah tamu (1–10 orang).
- Tampilan Responsif: Penataan layout menggunakan CSS Flexbox dan Grid yang menyesuaikan layar perangkat via media query (`max-width: 768px` dan `max-width: 480px`).
- Penyimpanan Lokal: Memanfaatkan `localStorage` untuk menyimpan nama pemesan terakhir agar terisi otomatis saat halaman dimuat ulang.

## Cara Menjalankan 
1. Clone repository ini.
2. Buka folder proyek.
3. Jalankan file index.html langsung pada browser.