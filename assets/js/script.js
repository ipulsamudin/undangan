/* ==========================================
   WEDDING INVITATION - JAVASCRIPT
   ==========================================
   Membaca data dari config.js
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Load config data
    loadConfigData();

    // Fix mobile viewport height
    function setMobileViewportHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setMobileViewportHeight();
    window.addEventListener('resize', setMobileViewportHeight);
    window.addEventListener('orientationchange', function() {
        setTimeout(setMobileViewportHeight, 100);
    });

    // Initialize AOS Animation with mobile-friendly settings
    const isMobileDevice = window.innerWidth < 768;

    // Change fade-left and fade-right to fade-up on mobile to prevent horizontal scroll
    if (isMobileDevice) {
        document.querySelectorAll('[data-aos="fade-left"], [data-aos="fade-right"]').forEach(function(el) {
            el.setAttribute('data-aos', 'fade-up');
        });
    }

    AOS.init({
        duration: isMobileDevice ? 600 : 1000,
        once: true,
        offset: isMobileDevice ? 20 : 100,
        disable: false,
        startEvent: 'DOMContentLoaded'
    });

    // Elements
    const coverModal = document.getElementById('coverModal');
    const mainContent = document.getElementById('mainContent');
    const bottomNav = document.getElementById('bottomNav');
    const openBtn = document.getElementById('openInvitation');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const guestNameEl = document.getElementById('guestName');

    // Get guest name from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to') || CONFIG.settings.defaultGuestName;
    if (guestNameEl) {
        guestNameEl.textContent = decodeURIComponent(guestName.replace(/\+/g, ' '));
    }

    // Open Invitation
    if (openBtn) {
        openBtn.addEventListener('click', function() {
            coverModal.classList.add('hidden');
            mainContent.classList.add('show');
            bottomNav.classList.add('show');

            // Try to play music
            if (CONFIG.music.autoplay) {
                playMusic();
            }

            // Scroll to top
            window.scrollTo(0, 0);
        });
    }

    // Music Toggle
    let isPlaying = false;

    function playMusic() {
        if (bgMusic) {
            bgMusic.volume = CONFIG.music.volume;
            bgMusic.play().then(() => {
                isPlaying = true;
                musicToggle.classList.add('playing');
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(err => {
                console.log('Autoplay prevented:', err);
            });
        }
    }

    if (musicToggle) {
        musicToggle.addEventListener('click', function() {
            if (isPlaying) {
                bgMusic.pause();
                isPlaying = false;
                musicToggle.classList.remove('playing');
                musicToggle.innerHTML = '<i class="fas fa-music"></i>';
            } else {
                playMusic();
            }
        });
    }

    // Countdown Timer
    function updateCountdown() {
        const targetDate = new Date(CONFIG.event.date).getTime();
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        } else {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Bottom Navigation Active State
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('data-section') === sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Smooth scroll for navigation
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 20;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Copy to Clipboard - Bank
    const btnCopyBank = document.getElementById('btnCopyBank');
    if (btnCopyBank) {
        btnCopyBank.addEventListener('click', function() {
            copyToClipboard(CONFIG.gift.bank.accountNumber, this);
        });
    }

    // Copy to Clipboard - E-Wallet
    const btnCopyEwallet = document.getElementById('btnCopyEwallet');
    if (btnCopyEwallet) {
        btnCopyEwallet.addEventListener('click', function() {
            copyToClipboard(CONFIG.gift.ewallet.accountNumber, this);
        });
    }

    // Copy to Clipboard - Address
    const btnCopyAddress = document.getElementById('btnCopyAddress');
    if (btnCopyAddress) {
        btnCopyAddress.addEventListener('click', function() {
            copyToClipboard(CONFIG.gift.address.short, this);
        });
    }

    function copyToClipboard(text, button) {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
            button.classList.add('copied');

            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);

            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
            button.classList.add('copied');

            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('copied');
            }, 2000);
        });
    }

    // RSVP Form Submission with Firebase
    const rsvpForm = document.getElementById('rsvpForm');
    const wishesContainer = document.getElementById('wishesContainer');

    // Initialize Firebase RSVP when ready
    function initFirebaseRSVP() {
        if (!window.firebaseReady) {
            window.addEventListener('firebaseReady', initFirebaseRSVP);
            return;
        }

        // Load existing wishes from Firebase
        loadWishesFromFirebase();

        // Listen for realtime updates
        listenToWishes();
    }

    // Load wishes from Firebase
    async function loadWishesFromFirebase() {
        try {
            const q = window.firebaseQuery(
                window.firebaseCollection(window.firebaseDB, 'wishes'),
                window.firebaseOrderBy('createdAt', 'desc')
            );
            const querySnapshot = await window.firebaseGetDocs(q);

            // Clear container first
            if (wishesContainer) {
                wishesContainer.innerHTML = '';
            }

            // Reset stats
            let stats = { hadir: 0, tidak_hadir: 0, ragu: 0 };

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                stats[data.attendance] = (stats[data.attendance] || 0) + 1;
                renderWishItem(data);
            });

            // Update stats display
            updateStatsDisplay(stats);
        } catch (error) {
            console.error('Error loading wishes:', error);
        }
    }

    // Listen to realtime updates
    function listenToWishes() {
        try {
            const q = window.firebaseQuery(
                window.firebaseCollection(window.firebaseDB, 'wishes'),
                window.firebaseOrderBy('createdAt', 'desc')
            );

            window.firebaseOnSnapshot(q, (snapshot) => {
                // Clear container
                if (wishesContainer) {
                    wishesContainer.innerHTML = '';
                }

                // Reset stats
                let stats = { hadir: 0, tidak_hadir: 0, ragu: 0 };

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    stats[data.attendance] = (stats[data.attendance] || 0) + 1;
                    renderWishItem(data);
                });

                // Update stats display
                updateStatsDisplay(stats);
            });
        } catch (error) {
            console.error('Error listening to wishes:', error);
        }
    }

    // Render a single wish item
    function renderWishItem(data) {
        if (!wishesContainer) return;

        const wishItem = document.createElement('div');
        wishItem.className = 'wish-item';

        let statusClass = '';
        let statusText = '';

        switch(data.attendance) {
            case 'hadir':
                statusClass = 'hadir';
                statusText = 'Hadir';
                break;
            case 'tidak_hadir':
                statusClass = 'tidak';
                statusText = 'Tidak Hadir';
                break;
            case 'ragu':
                statusClass = 'ragu';
                statusText = 'Masih Ragu';
                break;
        }

        // Format time
        let timeText = 'Baru saja';
        if (data.createdAt) {
            const date = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
            timeText = formatTimeAgo(date);
        }

        wishItem.innerHTML = `
            <div class="wish-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="wish-content">
                <h4 class="wish-name">${escapeHtml(data.name)}</h4>
                <span class="wish-status ${statusClass}">${statusText}</span>
                ${data.guests > 1 ? `<span class="wish-guests">${data.guests} orang</span>` : ''}
                <p class="wish-message">${escapeHtml(data.message) || 'Selamat menempuh hidup baru!'}</p>
                <span class="wish-time">${timeText}</span>
            </div>
        `;

        wishesContainer.appendChild(wishItem);
    }

    // Update stats display
    function updateStatsDisplay(stats) {
        const hadirEl = document.querySelector('.stat-item.hadir .stat-number');
        const tidakEl = document.querySelector('.stat-item.tidak .stat-number');
        const raguEl = document.querySelector('.stat-item.ragu .stat-number');

        if (hadirEl) hadirEl.textContent = stats.hadir || 0;
        if (tidakEl) tidakEl.textContent = stats.tidak_hadir || 0;
        if (raguEl) raguEl.textContent = stats.ragu || 0;
    }

    // Format time ago
    function formatTimeAgo(date) {
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} hari yang lalu`;
        if (hours > 0) return `${hours} jam yang lalu`;
        if (minutes > 0) return `${minutes} menit yang lalu`;
        return 'Baru saja';
    }

    // Form submission
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const attendance = document.getElementById('attendance').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value.trim();

            if (!name || !attendance) {
                showNotification('Mohon lengkapi nama dan konfirmasi kehadiran.', 'error');
                return;
            }

            // Disable submit button
            const submitBtn = rsvpForm.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            submitBtn.disabled = true;

            try {
                // Check if Firebase is ready
                if (!window.firebaseReady) {
                    throw new Error('Firebase belum siap. Silakan refresh halaman.');
                }

                // Save to Firebase
                await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'wishes'), {
                    name: name,
                    attendance: attendance,
                    guests: parseInt(guests) || 1,
                    message: message || 'Selamat menempuh hidup baru!',
                    createdAt: window.firebaseServerTimestamp()
                });

                // Reset form
                rsvpForm.reset();

                // Show success message
                showNotification('Terima kasih atas ucapan dan doanya!', 'success');

            } catch (error) {
                console.error('Error saving wish:', error);
                showNotification('Gagal mengirim. Silakan coba lagi.', 'error');
            } finally {
                // Re-enable submit button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // Initialize Firebase RSVP
    initFirebaseRSVP();

    // Helper: Escape HTML
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Helper: Show notification
    function showNotification(message, type = 'success') {
        const bgColor = type === 'error' ? '#e74c3c' : '#27ae60';
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 10001;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Gallery Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentImageIndex = 0;
    const galleryImages = CONFIG.gallery;

    // Add click event to gallery items (after they are loaded)
    setTimeout(() => {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                currentImageIndex = index;
                openLightbox(galleryImages[index]);
            });
        });
    }, 500);

    function openLightbox(src) {
        lightboxImage.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImage.src = galleryImages[currentImageIndex];
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        lightboxImage.src = galleryImages[currentImageIndex];
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevImage);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }

    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
    });

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
            from { opacity: 0; transform: translateX(100px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOut {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(100px); }
        }
    `;
    document.head.appendChild(style);

    // Parallax Effect
    let isMobile = window.innerWidth < 768;

    if (!isMobile) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero-section');

            if (heroSection) {
                heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
            }
        });
    }

    // Handle resize
    window.addEventListener('resize', function() {
        isMobile = window.innerWidth < 768;
        // Refresh AOS on resize to fix layout issues
        AOS.refresh();
    });

    // Force refresh AOS after initial load to ensure proper positioning
    setTimeout(function() {
        AOS.refresh();
    }, 100);

});

/**
 * Load data from CONFIG to HTML elements
 */
function loadConfigData() {
    const coupleNames = `${CONFIG.groom.shortName} & ${CONFIG.bride.shortName}`;

    // Update page title
    document.title = `Undangan Pernikahan - ${coupleNames}`;

    // Cover Section
    setText('coverNames', coupleNames);
    setText('coverDate', CONFIG.event.dateDisplay);

    // Hero Section
    setText('heroNames', coupleNames);
    setText('heroDate', CONFIG.event.dateShort);

    // Greeting Section
    setText('salamPembuka', CONFIG.settings.salam);

    // Groom Section
    setImage('groomPhoto', CONFIG.groom.photo);
    setText('groomName', CONFIG.groom.name);
    setHTML('groomParents', `Putra Pertama dari<br>Bapak ${CONFIG.groom.fatherName}<br>&<br>Ibu ${CONFIG.groom.motherName}`);

    // Groom Social
    const groomSocial = document.getElementById('groomSocial');
    if (groomSocial && CONFIG.groom.instagram) {
        groomSocial.innerHTML = `<a href="${CONFIG.groom.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>`;
    }

    // Bride Section
    setImage('bridePhoto', CONFIG.bride.photo);
    setText('brideName', CONFIG.bride.name);
    setHTML('brideParents', `Putri Ketiga dari<br>Bapak ${CONFIG.bride.fatherName}<br>&<br>Ibu ${CONFIG.bride.motherName}`);

    // Bride Social
    const brideSocial = document.getElementById('brideSocial');
    if (brideSocial && CONFIG.bride.instagram) {
        brideSocial.innerHTML = `<a href="${CONFIG.bride.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>`;
    }

    // Quote Section
    setText('quoteText', `"${CONFIG.quote.text}"`);
    setText('quoteSource', `— ${CONFIG.quote.source} —`);

    // Journey Section
    const journeyTimeline = document.getElementById('journeyTimeline');
    if (journeyTimeline && CONFIG.journey) {
        journeyTimeline.innerHTML = CONFIG.journey.map((item, index) => `
            <div class="journey-item" data-aos="fade-up" data-aos-delay="${(index + 1) * 100}">
                <div class="journey-dot"></div>
                <div class="journey-content">
                    <div class="journey-icon">
                        <i class="${item.icon}"></i>
                    </div>
                    <span class="journey-date">${item.date}</span>
                    <h3 class="journey-title">${item.title}</h3>
                    <p class="journey-description">${item.description}</p>
                </div>
            </div>
        `).join('');
    }

    // Event Section - Akad
    setText('akadDate', CONFIG.event.dateDisplay);
    setText('akadTime', CONFIG.event.akad.time);
    setText('akadVenue', CONFIG.event.akad.venue);
    setText('akadAddress', CONFIG.event.akad.address);
    setAttr('akadMaps', 'href', CONFIG.event.akad.mapsUrl);

    // Event Section - Resepsi
    setText('resepsiDate', CONFIG.event.dateDisplay);
    setText('resepsiTime', CONFIG.event.resepsi.time);
    setText('resepsiVenue', CONFIG.event.resepsi.venue);
    setText('resepsiAddress', CONFIG.event.resepsi.address);
    setAttr('resepsiMaps', 'href', CONFIG.event.resepsi.mapsUrl);

    // Gallery Section
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
        galleryGrid.innerHTML = CONFIG.gallery.map((src, index) => `
            <div class="gallery-item" data-aos="zoom-in" data-aos-delay="${(index + 1) * 100}">
                <img src="${src}" alt="Gallery ${index + 1}">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            </div>
        `).join('');
    }

    // Gift Section - Bank
    setText('bankName', CONFIG.gift.bank.name);
    setText('bankAccountName', `a.n. ${CONFIG.gift.bank.accountName}`);
    setText('bankNumber', CONFIG.gift.bank.accountNumber);

    // Gift Section - E-Wallet
    setText('ewalletName', CONFIG.gift.ewallet.name);
    setText('ewalletAccountName', `a.n. ${CONFIG.gift.ewallet.accountName}`);
    setText('ewalletNumber', CONFIG.gift.ewallet.accountNumber);

    // Gift Section - Address
    setHTML('giftAddress', CONFIG.gift.address.full.replace(/\n/g, '<br>'));

    // Closing Section
    setText('closingNames', coupleNames);
    setText('salamPenutup', CONFIG.settings.salamPenutup);

    // Footer
    setText('footerNames', coupleNames);
    const year = new Date(CONFIG.event.date).getFullYear();
    setText('footerYear', `© ${year} Wedding Invitation`);

    // Music
    const musicSource = document.getElementById('musicSource');
    if (musicSource) {
        musicSource.src = CONFIG.music.src;
        document.getElementById('bgMusic').load();
    }
}

// Helper functions
function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

function setHTML(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
}

function setImage(id, src) {
    const el = document.getElementById(id);
    if (el) el.src = src;
}

function setAttr(id, attr, value) {
    const el = document.getElementById(id);
    if (el) el.setAttribute(attr, value);
}
