/**
 * ==========================================
 * KONFIGURASI UNDANGAN PERNIKAHAN
 * ==========================================
 * Ubah data di bawah ini sesuai kebutuhan Anda
 */

const CONFIG = {
    // ==========================================
    // DATA MEMPELAI PRIA
    // ==========================================
    groom: {
        name: "Muhammad Nur Syaifullah",
        shortName: "Syaiful",
        photo: "assets/images/groom.jpg",
        fatherName: "Sarwi",
        motherName: "Eka Purwanti",
        instagram: "https://instagram.com/mnurs", // Kosongkan "" jika tidak ada
    },

    // ==========================================
    // DATA MEMPELAI WANITA
    // ==========================================
    bride: {
        name: "Siti Sarah",
        shortName: "Sarah",
        photo: "assets/images/bride.jpg",
        fatherName: "R.M Sholeh (Alm)",
        motherName: "Muhani (Almh)",
        instagram: "https://instagram.com/sitisarah12__", // Kosongkan "" jika tidak ada
    },

    // ==========================================
    // FOTO COVER (BENTUK LOVE)
    // ==========================================
    cover: {
        // Ganti dengan URL foto pasangan kakak (lokal atau eksternal)
        photo: "assets/images/couple.jpg",
    },

    // ==========================================
    // DATA ACARA
    // ==========================================
    event: {
        // Tanggal & Waktu utama untuk countdown (format: YYYY-MM-DDTHH:MM:SS)
        // -> Diarahkan ke tanggal akad nikah (acara puncak)
        date: "2026-12-06T09:00:00",

        // Format tanggal yang ditampilkan (acara puncak: Akad Nikah)
        dateDisplay: "Minggu, 6 Desember 2026",
        dateShort: "6 . 12 . 2026",

        // Akad Nikah
        akad: {
            time: "09:00 - 11:00 WIB",
            venue: "Basecamp Konsep Depok",
            address: "Pedurenan depok Jln Nayan RT 06 RW 01 Cisalak Pasar, Kec. Cimanggis, Kota Depok, Jawa Barat 16452",
            mapsUrl: "https://maps.app.goo.gl/CMCuqAuoe93w5BvXA?g_st=aw",
        },

        // Resepsi
        resepsi: {
            time: "11:00 WIB - Selesai",
            venue: "Basecamp Konsep Depok",
            address: "Pedurenan depok Jln Nayan RT 06 RW 01 Cisalak Pasar, Kec. Cimanggis, Kota Depok, Jawa Barat 16452",
            mapsUrl: "https://maps.app.goo.gl/CMCuqAuoe93w5BvXA?g_st=aw",
        },
    },

    // ==========================================
    // AMPLOP DIGITAL / GIFT
    // ==========================================
    gift: {
        // Bank Transfer
        bank: {
            name: "BANK BCA",
            accountName: "Siti Sarah",
            accountNumber: "1663708396",
        },

        // E-Wallet
        ewallet: {
            name: "GoPay / OVO",
            accountName: "Syaiful",
            accountNumber: "085219679808",
        },

        // Alamat Pengiriman Hadiah
        address: {
            full: "Basecamp Konsep Depok\nPedurenan depok Jln Nayan RT 06 RW 01\nCisalak Pasar, Kec. Cimanggis\nKota Depok, Jawa Barat 16452",
            short: "Basecamp Konsep Depok, Pedurenan depok Jln Nayan RT 06 RW 01 Cisalak Pasar, Kec. Cimanggis, Kota Depok, Jawa Barat 16452",
            mapsUrl: "https://maps.app.goo.gl/CMCuqAuoe93w5BvXA?g_st=aw",
        },
    },

    // ==========================================
    // OUR JOURNEY / PERJALANAN CINTA
    // ==========================================
    journey: [
        {
            date: "20 Juli 2025",
            title: "Awal Pertemuan",
            description: "Di antara ribuan wajah asing di dunia maya, takdir memilih jalannya sendiri. Sebuah sapa sederhana menjadi awal dari kisah yang tak pernah kami duga — hati mulai berbicara dalam bahasa yang sama.",
            icon: "fas fa-heart"
        },
        {
            date: "18 September 2025",
            title: "Merajut Kedekatan",
            description: "Perlahan, jarak menjelma menjadi kedekatan. Cerita-cerita kecil kami rangkai menjadi kenangan, dan setiap pertemuan menumbuhkan rasa yang tak lagi bisa disembunyikan.",
            icon: "fas fa-comments"
        },
        {
            date: "30 September 2025",
            title: "Sepakat Bersama",
            description: "Di bawah taburan bintang, janji pertama terucap. Dua hati sepakat berjalan beriringan — bukan lagi 'aku' dan 'kamu', melainkan 'kita'.",
            icon: "fas fa-hand-holding-heart"
        },
        {
            date: "19 Juli 2026",
            title: "Ikrar Lamaran",
            description: "Sebuah cincin, sebuah pertanyaan, dan sebuah 'iya' yang mengubah segalanya. Restu keluarga menjadi saksi — cinta kami kini memiliki arah yang pasti.",
            icon: "fas fa-ring"
        },
        {
            date: "6 Desember 2026",
            title: "Hari yang Dinantikan",
            description: "Hari yang lama kami rindukan akhirnya menjelma nyata. Dengan menyebut nama-Nya, dua jiwa disatukan dalam ikatan suci — awal dari selamanya.",
            icon: "fas fa-mosque"
        }
    ],

    // ==========================================
    // GALERI FOTO PREWEDDING - 40 foto tersusun bercerita
    // Struktur: { src, caption, type }
    // type: "regular" (1x1) | "featured" (2x1 wide) | "hero" (3x3 big)
    //
    // Nama file diurutkan 01..40 sesuai urutan tampil.
    // Untuk mengubah urutan: cukup rename file (mis. tukar 05.png <-> 15.png)
    // dan sesuaikan baris di array ini.
    // ==========================================
    gallery: [
        { src: "assets/images/gallery/01.jpg", caption: "Takdir mempertemukan",              type: "hero"     },
        { src: "assets/images/gallery/02.png", caption: "Melangkah, belum menoleh",          type: "regular"  },
        { src: "assets/images/gallery/03.png", caption: "Berbagi ruang, belum saling melihat", type: "regular" },
        { src: "assets/images/gallery/04.jpg", caption: "Hampir bersentuhan",                type: "featured" },
        { src: "assets/images/gallery/05.png", caption: "Menoleh untuk pertama kalinya",     type: "regular"  },
        { src: "assets/images/gallery/06.png", caption: "Berdiri bersisian",                 type: "regular"  },
        { src: "assets/images/gallery/07.png", caption: "Candaan mulai tumbuh",              type: "regular"  },
        { src: "assets/images/gallery/08.png", caption: "Tertawa bersama",                   type: "regular"  },
        { src: "assets/images/gallery/09.png", caption: "Semangat berdua",                   type: "regular"  },
        { src: "assets/images/gallery/10.png", caption: "Duduk bersandar",                   type: "regular"  },
        { src: "assets/images/gallery/11.jpg", caption: "Kamu — yang kupilih",               type: "featured" },
        { src: "assets/images/gallery/12.png", caption: "Sepakat dalam hening",              type: "regular"  },
        { src: "assets/images/gallery/13.png", caption: "Sandaran jiwa",                     type: "regular"  },
        { src: "assets/images/gallery/14.png", caption: "Cerita ringan berdua",              type: "regular"  },
        { src: "assets/images/gallery/15.png", caption: "Menari dalam rasa",                 type: "regular"  },
        { src: "assets/images/gallery/16.png", caption: "Saling membutuhkan",                type: "regular"  },
        { src: "assets/images/gallery/17.png", caption: "Mawar mulai hadir",                 type: "regular"  },
        { src: "assets/images/gallery/18.png", caption: "Ikrar dilontarkan",                 type: "regular"  },
        { src: "assets/images/gallery/19.png", caption: "'Iya' yang menggetarkan",           type: "regular"  },
        { src: "assets/images/gallery/20.png", caption: "Menanti hari itu",                  type: "regular"  },
        { src: "assets/images/gallery/21.png", caption: "Menghitung mundur",                 type: "regular"  },
        { src: "assets/images/gallery/22.jpg", caption: "Hari terbaik menanti",              type: "featured" },
        { src: "assets/images/gallery/23.png", caption: "Berdiri di ambang hari sakral",     type: "regular"  },
        { src: "assets/images/gallery/24.png", caption: "Menyiapkan hati",                   type: "regular"  },
        { src: "assets/images/gallery/25.png", caption: "Warna merah mulai hadir",           type: "regular"  },
        { src: "assets/images/gallery/26.png", caption: "Tegak dalam iman",                  type: "regular"  },
        { src: "assets/images/gallery/27.png", caption: "Sekilas menoleh",                   type: "regular"  },
        { src: "assets/images/gallery/28.png", caption: "Kini kita berdua di depan",         type: "regular"  },
        { src: "assets/images/gallery/29.png", caption: "Bersama di kursi tua",              type: "regular"  },
        { src: "assets/images/gallery/30.png", caption: "Kesetiaan sejati",                  type: "regular"  },
        { src: "assets/images/gallery/31.png", caption: "Rendah hati, dalam bakti",          type: "regular"  },
        { src: "assets/images/gallery/32.png", caption: "Menghormati tradisi",               type: "regular"  },
        { src: "assets/images/gallery/33.png", caption: "Dekat dalam janji",                 type: "regular"  },
        { src: "assets/images/gallery/34.png", caption: "Bersisian tanpa jeda",              type: "regular"  },
        { src: "assets/images/gallery/35.png", caption: "Melindungi setia",                  type: "regular"  },
        { src: "assets/images/gallery/36.png", caption: "Wajah yang dinanti",                type: "regular"  },
        { src: "assets/images/gallery/37.png", caption: "Senyum menyongsong hari besar",     type: "regular"  },
        { src: "assets/images/gallery/38.png", caption: "Menghitung hari-hari terakhir",     type: "regular"  },
        { src: "assets/images/gallery/39.png", caption: "Berteduh dalam cinta",              type: "regular"  },
        { src: "assets/images/gallery/40.jpg", caption: "Menuju selamanya",                  type: "hero"     },
    ],

    // ==========================================
    // MUSIK LATAR
    // ==========================================
    music: {
        src: "assets/audio/music.mp3",
        autoplay: true,
        volume: 0.5,
    },

    // ==========================================
    // QUOTE / AYAT
    // ==========================================
    quote: {
        text: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.",
        source: "Q.S. Ar-Rum: 21",
    },

    // ==========================================
    // PENGATURAN LAINNYA
    // ==========================================
    settings: {
        // Bahasa greeting
        salam: "Assalamualaikum Warahmatullahi Wabarakatuh",
        salamPenutup: "Wassalamualaikum Warahmatullahi Wabarakatuh",

        // Default nama tamu jika tidak ada parameter URL
        defaultGuestName: "Tamu Undangan",
    },
};
