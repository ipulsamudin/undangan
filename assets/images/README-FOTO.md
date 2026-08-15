# Panduan Foto

## Foto Mempelai (profil bulat)

| Nama file       | Untuk                       | Rekomendasi                            |
|-----------------|-----------------------------|----------------------------------------|
| `groom.jpg`     | Foto Syaiful (profil bulat) | Kotak 1:1, min 400×400px, wajah tengah |
| `bride.jpg`     | Foto Sarah (profil bulat)   | Kotak 1:1, min 400×400px, wajah tengah |
| `couple.jpg`    | Cover photo (bentuk love)   | Portrait, saat ini disembunyikan — **JANGAN dihapus**, mungkin dipakai lagi |

## Galeri Foto

Semua foto galeri sekarang **hidup di sub-folder `gallery/`** dengan nama file asli
(bukan lagi `gallery-1.jpg` … `gallery-6.jpg`). Urutan tampil di undangan diatur oleh
array `gallery` di [`config.js`](../../config.js) — 48 slot, tersusun bercerita
mengikuti alur *"Perjalanan Modern → Hari Pernikahan Adat"*.

### Menambah / mengganti foto galeri

1. Taruh file foto baru di `assets/images/gallery/`
2. Edit `config.js` bagian `gallery: [ … ]`:
   ```js
   { src: "assets/images/gallery/NAMA_FILE.png", caption: "Narasi singkat", type: "regular" },
   ```
3. Pilih `type`:
   - `"regular"`  — 1×1 tile (default, cocok untuk foto biasa)
   - `"featured"` — 2×1 tile lebar (untuk foto yang ingin ditonjolkan)
   - `"hero"`     — 3×2 tile besar (untuk foto klimaks / pembuka)

## Catatan

- File `.JPG` (uppercase) yang datang dari kamera aman selama path di `config.js` **persis** sama termasuk uppercase/lowercase. GitHub Pages (Linux) case-sensitive.
- Optimasi ukuran sangat dianjurkan: resize ke max 1500px sisi terpanjang dan kompres ke JPG/WebP quality 80% supaya undangan cepat dibuka di mobile.
- File lama `gallery-1.jpg` … `gallery-6.jpg` di folder ini sudah tidak dipakai — boleh dihapus.

## Cara verifikasi setelah taruh foto

1. Buka `http://localhost/undangan-digital/undangan/index.html` di browser.
2. Cek section **Mempelai** — foto Syaiful & Sarah muncul di lingkaran bulat.
3. Cek section **Galeri Foto** — tile foto tampil dalam layout bento (ada tile besar & kecil), dengan divider bab di antaranya. Hover → caption slide-up. Klik → lightbox dengan navigasi.
4. Kalau ada foto broken, buka DevTools (F12) → Console → cek error 404 untuk tahu nama file mana yang salah.
