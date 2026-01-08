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
        // Tanggal & Waktu (format: YYYY-MM-DDTHH:MM:SS)
        date: "2027-09-30T08:00:00",

        // Format tanggal yang ditampilkan
        dateDisplay: "Kamis, 30 September 2027",
        dateShort: "30 . 09 . 2027",

        // Akad Nikah
        akad: {
            time: "08:00 - 10:00 WIB",
            venue: "Masjid Agung Al-Azhar",
            address: "Jl. Sisingamangaraja No.1, Jakarta Selatan",
            mapsUrl: "https://maps.google.com",
        },

        // Resepsi
        resepsi: {
            time: "11:00 - 14:00 WIB",
            venue: "Grand Ballroom Hotel Mulia",
            address: "Jl. Asia Afrika, Senayan, Jakarta Pusat",
            mapsUrl: "https://maps.google.com",
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
            accountNumber: "1234567890123",
        },

        // E-Wallet
        ewallet: {
            name: "GoPay / OVO",
            accountName: "Siti Sarah",
            accountNumber: "081234567890",
        },

        // Alamat Pengiriman Hadiah
        address: {
            full: "Jl. Kebahagiaan No. 123, RT 01/RW 02\nKelurahan Cinta, Kecamatan Bahagia\nJakarta Selatan 12345",
            short: "Jl. Kebahagiaan No. 123, RT 01/RW 02, Kelurahan Cinta, Kecamatan Bahagia, Jakarta Selatan 12345",
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
            date: "28 November 2026",
            title: "Lamaran",
            description: "Dengan penuh keberanian dan cinta, lamaran diajukan dan diterima dengan penuh kebahagiaan. Langkah menuju kehidupan baru dimulai.",
            icon: "fas fa-ring"
        },
        {
            date: "30 September 2027",
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
