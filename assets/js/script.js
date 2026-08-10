/* ==========================================
   WEDDING INVITATION - JAVASCRIPT
   ==========================================
   Membaca data dari config.js
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Safety: reset body overflow (bfcache/iOS bisa mewarisi state 'hidden' dari lightbox sebelumnya)
    document.body.style.overflow = '';

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
    const btnLoadMore = document.getElementById('btnLoadMore');
    const wishesEmpty = document.getElementById('wishesEmpty');

    const WISHES_PAGE_SIZE = 5;
    const wishesState = {
        lastVisibleDoc: null,        // cursor, only updated by loadMoreWishes
        hasMoreOlder: true,
        renderedIds: new Map(),      // id -> attendance (for dedup + modified handling)
        optimisticIds: new Set(),    // ids counted client-side; skip re-count on snapshot echo
        initialSeeded: false,
        stats: { hadir: 0, tidak_hadir: 0, ragu: 0 },
    };

    // Initialize Firebase RSVP when ready
    function initFirebaseRSVP() {
        if (!window.firebaseReady) {
            window.addEventListener('firebaseReady', initFirebaseRSVP);
            return;
        }

        // Seed accurate totals for stats (independent of paginated list)
        seedStatsFromServer();

        // Subscribe realtime to only the newest page
        listenToWishes();

        if (btnLoadMore) {
            btnLoadMore.addEventListener('click', loadMoreWishes);
        }
    }

    // Seed hadir/tidak_hadir/ragu counts via Firestore aggregate count (1 read each)
    async function seedStatsFromServer() {
        try {
            const coll = window.firebaseCollection(window.firebaseDB, 'wishes');
            const attendances = ['hadir', 'tidak_hadir', 'ragu'];
            const results = await Promise.all(attendances.map(a =>
                window.firebaseGetCountFromServer(
                    window.firebaseQuery(coll, window.firebaseWhere('attendance', '==', a))
                )
            ));
            attendances.forEach((a, i) => {
                wishesState.stats[a] = results[i].data().count;
            });
            updateStatsDisplay(wishesState.stats);
        } catch (error) {
            console.error('Error seeding stats:', error);
        }
    }

    // Realtime listener on the newest PAGE_SIZE wishes only
    function listenToWishes() {
        try {
            const q = window.firebaseQuery(
                window.firebaseCollection(window.firebaseDB, 'wishes'),
                window.firebaseOrderBy('createdAt', 'desc'),
                window.firebaseLimit(WISHES_PAGE_SIZE)
            );

            window.firebaseOnSnapshot(q, (snapshot) => {
                if (!wishesState.initialSeeded) {
                    // First fire: batch render as the initial page
                    if (wishesContainer) wishesContainer.innerHTML = '';
                    wishesState.renderedIds.clear();

                    snapshot.forEach((docSnap) => {
                        const data = docSnap.data();
                        const el = renderWishItem(docSnap.id, data);
                        if (wishesContainer) wishesContainer.appendChild(el);
                        wishesState.renderedIds.set(docSnap.id, data.attendance);
                    });

                    wishesState.lastVisibleDoc = snapshot.docs.length
                        ? snapshot.docs[snapshot.docs.length - 1]
                        : null;
                    wishesState.hasMoreOlder = snapshot.size === WISHES_PAGE_SIZE;
                    wishesState.initialSeeded = true;

                    updateEmptyState();
                    updateLoadMoreButton();
                    return;
                }

                // Subsequent updates: react to changes only
                snapshot.docChanges().forEach((change) => {
                    const id = change.doc.id;
                    const data = change.doc.data();

                    if (change.type === 'added') {
                        if (wishesState.renderedIds.has(id)) return;

                        const el = renderWishItem(id, data);
                        if (wishesContainer) {
                            if (wishesContainer.firstChild) {
                                wishesContainer.insertBefore(el, wishesContainer.firstChild);
                            } else {
                                wishesContainer.appendChild(el);
                            }
                        }
                        wishesState.renderedIds.set(id, data.attendance);

                        if (wishesState.optimisticIds.has(id)) {
                            wishesState.optimisticIds.delete(id);
                        } else {
                            bumpStats(data.attendance, 1);
                        }
                        updateEmptyState();
                    } else if (change.type === 'modified') {
                        const oldAttendance = wishesState.renderedIds.get(id);
                        const existing = wishesContainer
                            ? wishesContainer.querySelector(`[data-id="${CSS.escape(id)}"]`)
                            : null;
                        if (existing) {
                            existing.replaceWith(renderWishItem(id, data));
                        }
                        wishesState.renderedIds.set(id, data.attendance);
                        if (oldAttendance && oldAttendance !== data.attendance) {
                            bumpStats(oldAttendance, -1);
                            bumpStats(data.attendance, 1);
                        }
                    }
                    // 'removed' is ignored: docs leaving the limit(PAGE_SIZE) window
                    // aren't actually deleted, and their DOM node must stay visible.
                });
            });
        } catch (error) {
            console.error('Error listening to wishes:', error);
        }
    }

    // Load older wishes on demand (non-realtime cursor pagination)
    async function loadMoreWishes() {
        if (!wishesState.hasMoreOlder || !wishesState.lastVisibleDoc) return;

        const label = btnLoadMore && btnLoadMore.querySelector('.btn-load-more-label');
        const originalLabel = label ? label.textContent : '';
        if (btnLoadMore) btnLoadMore.disabled = true;
        if (label) label.textContent = 'Memuat...';

        try {
            const q = window.firebaseQuery(
                window.firebaseCollection(window.firebaseDB, 'wishes'),
                window.firebaseOrderBy('createdAt', 'desc'),
                window.firebaseStartAfter(wishesState.lastVisibleDoc),
                window.firebaseLimit(WISHES_PAGE_SIZE)
            );
            const snap = await window.firebaseGetDocs(q);

            snap.forEach((docSnap) => {
                const id = docSnap.id;
                if (wishesState.renderedIds.has(id)) return;
                const data = docSnap.data();
                const el = renderWishItem(id, data);
                if (wishesContainer) wishesContainer.appendChild(el);
                wishesState.renderedIds.set(id, data.attendance);
            });

            if (snap.docs.length > 0) {
                wishesState.lastVisibleDoc = snap.docs[snap.docs.length - 1];
            }
            if (snap.size < WISHES_PAGE_SIZE) {
                wishesState.hasMoreOlder = false;
            }
        } catch (error) {
            console.error('Error loading more wishes:', error);
        } finally {
            if (btnLoadMore) btnLoadMore.disabled = false;
            if (label) label.textContent = originalLabel || 'Muat Lebih Banyak';
            updateLoadMoreButton();
        }
    }

    function updateEmptyState() {
        if (wishesEmpty) {
            wishesEmpty.hidden = wishesState.renderedIds.size > 0;
        }
    }

    function updateLoadMoreButton() {
        if (btnLoadMore) {
            btnLoadMore.hidden = !wishesState.hasMoreOlder;
        }
    }

    function bumpStats(attendance, delta) {
        if (!(attendance in wishesState.stats)) return;
        wishesState.stats[attendance] = Math.max(0, (wishesState.stats[attendance] || 0) + delta);
        updateStatsDisplay(wishesState.stats);
    }

    // Build a single wish item element (caller decides where to insert)
    function renderWishItem(docId, data) {
        const wishItem = document.createElement('div');
        wishItem.className = 'wish-item';
        if (docId) wishItem.dataset.id = docId;

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

        return wishItem;
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
                const docRef = await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'wishes'), {
                    name: name,
                    attendance: attendance,
                    guests: parseInt(guests) || 1,
                    message: message || 'Selamat menempuh hidup baru!',
                    createdAt: window.firebaseServerTimestamp()
                });

                // Optimistic stats bump so the counter updates instantly,
                // even before the snapshot echo arrives. The listener will
                // skip re-counting this id via wishesState.optimisticIds.
                if (docRef && docRef.id) {
                    wishesState.optimisticIds.add(docRef.id);
                    bumpStats(attendance, 1);
                }

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

    // Gallery Lightbox - cinematic mode
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxIndexEl = document.getElementById('lightboxIndex');
    const lightboxTotalEl = document.getElementById('lightboxTotal');
    const lightboxPlay = document.getElementById('lightboxPlay');

    let currentImageIndex = 0;
    let autoplayTimer = null;
    const AUTOPLAY_MS = 4000;
    const galleryData = CONFIG.gallery;

    if (lightboxTotalEl) lightboxTotalEl.textContent = galleryData.length;

    // Attach click handler to gallery items (bind by data-index so chapter cards are skipped)
    setTimeout(() => {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function () {
                const idx = parseInt(this.dataset.index, 10);
                if (!isNaN(idx)) openLightbox(idx);
            });
        });
    }, 500);

    function renderLightboxSlide(index) {
        const item = galleryData[index];
        if (!item) return;
        // Fade + Ken Burns: reset then set
        lightboxImage.classList.remove('is-visible', 'kenburns');
        // Force reflow to restart transition
        void lightboxImage.offsetWidth;
        lightboxImage.src = item.src;
        lightboxImage.alt = item.caption || `Gallery ${index + 1}`;
        // When new image is loaded, fade in + start Ken Burns
        lightboxImage.onload = () => {
            lightboxImage.classList.add('is-visible', 'kenburns');
        };
        // Kalau image broken/hilang, auto-skip ke slide berikutnya
        lightboxImage.onerror = () => {
            showNextImage();
        };
        if (lightboxIndexEl) lightboxIndexEl.textContent = index + 1;
    }

    function openLightbox(index) {
        currentImageIndex = index;
        renderLightboxSlide(index);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        startAutoplay();
    }

    function closeLightbox() {
        stopAutoplay();
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
        renderLightboxSlide(currentImageIndex);
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryData.length;
        renderLightboxSlide(currentImageIndex);
    }

    function startAutoplay() {
        stopAutoplay();
        lightbox.classList.add('autoplay-on');
        if (lightboxPlay) lightboxPlay.innerHTML = '<i class="fas fa-pause"></i>';
        autoplayTimer = setInterval(showNextImage, AUTOPLAY_MS);
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
        lightbox.classList.remove('autoplay-on');
        if (lightboxPlay) lightboxPlay.innerHTML = '<i class="fas fa-play"></i>';
    }

    function toggleAutoplay() {
        autoplayTimer ? stopAutoplay() : startAutoplay();
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => { stopAutoplay(); showPrevImage(); });
    if (lightboxNext) lightboxNext.addEventListener('click', () => { stopAutoplay(); showNextImage(); });
    if (lightboxPlay) lightboxPlay.addEventListener('click', toggleAutoplay);

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) closeLightbox();
        });

        // Swipe gesture (mobile)
        let touchStartX = 0;
        let touchEndX = 0;
        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const dx = touchEndX - touchStartX;
            if (Math.abs(dx) < 50) return;
            stopAutoplay();
            dx > 0 ? showPrevImage() : showNextImage();
        }, { passive: true });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowLeft')  { stopAutoplay(); showPrevImage(); }
        else if (e.key === 'ArrowRight') { stopAutoplay(); showNextImage(); }
        else if (e.key === ' ')          { e.preventDefault(); toggleAutoplay(); }
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
    const coverPhotoEl = document.getElementById('coverPhoto');
    if (coverPhotoEl && CONFIG.cover && CONFIG.cover.photo) {
        coverPhotoEl.src = CONFIG.cover.photo;
    }

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

    // Gallery Section - initial: first 8 tiles. Sisanya hidden sampai CTA diklik.
    const GALLERY_INITIAL_VISIBLE = 8;
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
        galleryGrid.innerHTML = CONFIG.gallery.map((item, index) => {
            const type = item.type || 'regular';
            const extraCls = index >= GALLERY_INITIAL_VISIBLE ? ' gallery-item--extra' : '';
            const aosName = type === 'hero' ? 'zoom-in-up' : 'fade-up';
            const aosDelay = Math.min(index * 40, 300);
            return `
                <div class="gallery-item gallery-item--${type}${extraCls}" data-aos="${aosName}" data-aos-delay="${aosDelay}" data-index="${index}">
                    <img src="${item.src}" alt="${item.caption || 'Gallery ' + (index + 1)}" loading="lazy" onerror="this.closest('.gallery-item').style.display='none'">
                    <div class="gallery-overlay">
                        <i class="fas fa-search-plus gallery-zoom-icon"></i>
                    </div>
                </div>
            `;
        }).join('');
    }

    // "Lihat Selengkapnya" CTA — reveals hidden regular tiles
    const galleryShowMore = document.getElementById('galleryShowMore');
    if (galleryShowMore && galleryGrid) {
        galleryShowMore.addEventListener('click', () => {
            galleryGrid.classList.add('is-expanded');
            galleryShowMore.classList.add('is-hidden');
            if (window.AOS && typeof window.AOS.refreshHard === 'function') {
                window.AOS.refreshHard();
            }
        });
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
    setAttr('giftAddressMaps', 'href', CONFIG.gift.address.mapsUrl);

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
