# Panduan Nama File Foto

Taruh file foto di folder ini dengan nama **persis** seperti di tabel.
Kalau nama tidak cocok, gambar akan broken di undangan.

| Nama file       | Untuk                       | Rekomendasi                            |
|-----------------|-----------------------------|----------------------------------------|
| groom.jpg       | Foto Syaiful (profil bulat) | Kotak 1:1, min 400×400px, wajah tengah |
| bride.jpg       | Foto Sarah (profil bulat)   | Kotak 1:1, min 400×400px, wajah tengah |
| gallery-1.jpg   | Galeri foto #1              | Min 600px sisi terpendek, <500KB       |
| gallery-2.jpg   | Galeri foto #2              | (idem)                                 |
| gallery-3.jpg   | Galeri foto #3              | (idem)                                 |
| gallery-4.jpg   | Galeri foto #4              | (idem)                                 |
| gallery-5.jpg   | Galeri foto #5              | (idem)                                 |
| gallery-6.jpg   | Galeri foto #6              | (idem)                                 |

## Catatan

- Nama file di-hardcode di `config.js`. Kalau punya `.png` / `.webp`,
  convert ke `.jpg` atau ubah ekstensi di `config.js` (baris 15, 27, 136-141).
- Total **8 file** yang harus ada.
- File `couple.jpg` yang sudah ada di folder ini adalah cover photo (bentuk love)
  — saat ini disembunyikan, **JANGAN dihapus**, mungkin dipakai lagi nanti.

## Cara verifikasi setelah taruh foto

1. Buka `http://localhost/undangan-digital/undangan/index.html` di browser.
2. Cek section **Mempelai** — foto Syaiful & Sarah muncul di lingkaran bulat.
3. Cek section **Galeri** — 6 foto tampil, klik → lightbox terbuka.
4. Kalau ada foto broken, buka DevTools (F12) → tab Console → cek error 404
   untuk tahu nama file mana yang salah.
