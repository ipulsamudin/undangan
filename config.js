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
    // GALERI FOTO
    // ==========================================
    gallery: [
        "assets/images/gallery-1.jpg",
        "assets/images/gallery-2.jpg",
        "assets/images/gallery-3.jpg",
        "assets/images/gallery-4.jpg",
        "assets/images/gallery-5.jpg",
        "assets/images/gallery-6.jpg",
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
