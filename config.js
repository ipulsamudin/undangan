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
        photo: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
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
        photo: "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=400",
        fatherName: "R.M Sholeh (Alm)",
        motherName: "Muhani (Almh)",
        instagram: "https://instagram.com/sitisarah12__", // Kosongkan "" jika tidak ada
    },

    // ==========================================
    // DATA ACARA
    // ==========================================
    event: {
        // Tanggal & Waktu utama untuk countdown (format: YYYY-MM-DDTHH:MM:SS)
        // -> Diarahkan ke tanggal akad nikah (acara puncak)
        date: "2026-12-06T08:00:00",

        // Format tanggal yang ditampilkan (acara puncak: Akad Nikah)
        dateDisplay: "Minggu, 6 Desember 2026",
        dateShort: "06 . 12 . 2026",

        // Akad Nikah
        akad: {
            time: "08:00 - 10:00 WIB",
            venue: "Basecamp Konsep Depok",
            address: "Cisalak Ps., Kec. Cimanggis, Kota Depok, Jawa Barat 16452",
            mapsUrl: "https://maps.app.goo.gl/CMCuqAuoe93w5BvXA?g_st=aw",
        },

        // Resepsi
        resepsi: {
            time: "11:00 WIB - Selesai",
            venue: "Basecamp Konsep Depok",
            address: "Cisalak Ps., Kec. Cimanggis, Kota Depok, Jawa Barat 16452",
            mapsUrl: "https://maps.app.goo.gl/CMCuqAuoe93w5BvXA?g_st=aw",
        },
    },

    // ==========================================
    // AMPLOP DIGITAL / GIFT
    // ==========================================
    gift: {
        // Bank Transfer
        bank: {
            name: "Bank Mandiri",
            accountName: "Muhammad Nur Syaifullah",
            accountNumber: "1380018318548",
        },

        // E-Wallet
        ewallet: {
            name: "GoPay / OVO",
            accountName: "Syaiful",
            accountNumber: "085219679808",
        },

        // Alamat Pengiriman Hadiah
        address: {
            full: "Basecamp Konsep Depok\nCisalak Ps., Kec. Cimanggis\nKota Depok, Jawa Barat 16452",
            short: "Basecamp Konsep Depok, Cisalak Ps., Kec. Cimanggis, Kota Depok, Jawa Barat 16452",
            mapsUrl: "https://maps.app.goo.gl/CMCuqAuoe93w5BvXA?g_st=aw",
        },
    },

    // ==========================================
    // OUR JOURNEY / PERJALANAN CINTA
    // ==========================================
    journey: [
        {
            date: "20 Juli 2025",
            title: "Pertama Bertemu",
            description: "Kami pertama kali bertemu di dating app. Saat itu, kami sering mengirim pesan dan ada sesuatu yang berbeda terasa di hati.",
            icon: "fas fa-heart"
        },
        {
            date: "18 September 2025",
            title: "Mulai Dekat",
            description: "Setelah beberapa kali bertemu, kami mulai sering mengobrol dan berbagi cerita. Dari sini, kami mulai mengenal satu sama lain lebih dalam.",
            icon: "fas fa-comments"
        },
        {
            date: "30 September 2025",
            title: "Resmi Berpacaran",
            description: "Di bawah langit malam yang penuh bintang, kami memutuskan untuk memulai hubungan yang lebih serius. Hari yang tak akan pernah terlupakan.",
            icon: "fas fa-hand-holding-heart"
        },
        {
            date: "19 Juli 2026",
            title: "Lamaran",
            description: "Dengan penuh keberanian dan cinta, lamaran diajukan dan diterima dengan penuh kebahagiaan. Langkah menuju kehidupan baru dimulai.",
            icon: "fas fa-ring"
        },
        {
            date: "6 Desember 2026",
            title: "Hari Bahagia",
            description: "Akhirnya, hari yang kami tunggu-tunggu tiba. Kami siap untuk memulai perjalanan baru sebagai suami dan istri.",
            icon: "fas fa-mosque"
        }
    ],

    // ==========================================
    // GALERI FOTO
    // ==========================================
    gallery: [
        "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1488315/pexels-photo-1488315.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1308318/pexels-photo-1308318.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=600",
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
