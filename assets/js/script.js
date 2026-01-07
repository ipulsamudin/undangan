/* ==========================================
   WEDDING INVITATION - JAVASCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS Animation
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
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
    const guestName = urlParams.get('to') || 'Tamu Undangan';
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
            playMusic();

            // Scroll to top
            window.scrollTo(0, 0);
        });
    }

    // Music Toggle
    let isPlaying = false;

    function playMusic() {
        if (bgMusic) {
            bgMusic.volume = 0.5;
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
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        const targetDate = new Date(countdownEl.dataset.date).getTime();

        function updateCountdown() {
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
    }

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

    // Copy to Clipboard
    const copyButtons = document.querySelectorAll('.btn-copy');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const textToCopy = this.dataset.copy;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
                this.classList.add('copied');

                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                // Fallback
                const textarea = document.createElement('textarea');
                textarea.value = textToCopy;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);

                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
                this.classList.add('copied');

                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.remove('copied');
                }, 2000);
            });
        });
    });

    // RSVP Form Submission
    const rsvpForm = document.getElementById('rsvpForm');
    const wishesContainer = document.getElementById('wishesContainer');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const attendance = document.getElementById('attendance').value;
            const message = document.getElementById('message').value;

            if (!name || !attendance) {
                alert('Mohon lengkapi nama dan konfirmasi kehadiran.');
                return;
            }

            // Create new wish item
            const wishItem = document.createElement('div');
            wishItem.className = 'wish-item';
            wishItem.style.animation = 'fadeIn 0.5s ease';

            let statusClass = '';
            let statusText = '';

            switch(attendance) {
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

            wishItem.innerHTML = `
                <div class="wish-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="wish-content">
                    <h4 class="wish-name">${escapeHtml(name)}</h4>
                    <span class="wish-status ${statusClass}">${statusText}</span>
                    <p class="wish-message">${escapeHtml(message) || 'Selamat menempuh hidup baru!'}</p>
                    <span class="wish-time">Baru saja</span>
                </div>
            `;

            // Add to top of wishes container
            if (wishesContainer) {
                wishesContainer.insertBefore(wishItem, wishesContainer.firstChild);
            }

            // Update stats (dummy - in real app, this would be from database)
            updateStats(attendance);

            // Reset form
            rsvpForm.reset();

            // Show success message
            showNotification('Terima kasih atas ucapan dan doanya!');
        });
    }

    // Helper: Escape HTML
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Helper: Update stats (dummy)
    function updateStats(attendance) {
        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach(item => {
            if (item.classList.contains('hadir') && attendance === 'hadir') {
                const numEl = item.querySelector('.stat-number');
                numEl.textContent = parseInt(numEl.textContent) + 1;
            } else if (item.classList.contains('tidak') && attendance === 'tidak_hadir') {
                const numEl = item.querySelector('.stat-number');
                numEl.textContent = parseInt(numEl.textContent) + 1;
            } else if (item.classList.contains('ragu') && attendance === 'ragu') {
                const numEl = item.querySelector('.stat-number');
                numEl.textContent = parseInt(numEl.textContent) + 1;
            }
        });
    }

    // Helper: Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 10001;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentImageIndex = 0;
    const galleryImages = [];

    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        galleryImages.push(img.src);

        item.addEventListener('click', function() {
            currentImageIndex = index;
            openLightbox(img.src);
        });
    });

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

    // Parallax Effect (optional - for better performance, can be disabled on mobile)
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
    });

    // Preload images for smoother gallery
    galleryImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

});

// Service Worker Registration (optional - for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // navigator.serviceWorker.register('/sw.js');
    });
}
