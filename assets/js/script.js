/* ========================================
   FIXED script.js - CLEAN & EFFICIENT
   Replace your entire script.js with this
   ======================================== */

document.addEventListener("DOMContentLoaded", function() {

    console.log('🚀 PIONEER 2026 - Scripts Loading...');

    // ========================================
    // NAVBAR TOGGLE
    // ========================================
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector("#navbarTogglerDemo02");
    const navbarLinks = document.querySelectorAll("#navbarTogglerDemo02 a");

    if (navbarToggler && navbarCollapse) {
        // Toggle navbar
        navbarToggler.addEventListener("click", function(event) {
            event.stopPropagation();
            this.classList.toggle("active");
            navbarCollapse.classList.toggle("show");
        });

        // Close on outside click
        document.addEventListener("click", function(event) {
            const isClickInside = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);
            if (!isClickInside && navbarCollapse.classList.contains("show")) {
                navbarCollapse.classList.remove("show");
                navbarToggler.classList.remove("active");
            }
        });

        // Close on link click
        navbarLinks.forEach(link => {
            link.addEventListener("click", function() {
                navbarCollapse.classList.remove("show");
                navbarToggler.classList.remove("active");
            });
        });
    }

    // ========================================
    // DARK MODE TOGGLE
    // ========================================
    const toggleSwitch = document.getElementById("checkbox");

    if (toggleSwitch) {
        // Load saved theme
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.body.classList.add("dark-mode");
            toggleSwitch.checked = true;
        }

        // Toggle theme
        toggleSwitch.addEventListener("change", function() {
            if (this.checked) {
                document.body.classList.add("dark-mode");
                localStorage.setItem("theme", "dark");
            } else {
                document.body.classList.remove("dark-mode");
                localStorage.setItem("theme", "light");
            }
        });
    }

    // ========================================
    // COUNTDOWN TIMER
    // ========================================
    const countdownDays = document.querySelector('.countdown__days .number');
    const countdownHours = document.querySelector('.countdown__hours .number');
    const countdownMinutes = document.querySelector('.countdown__minutes .number');
    const countdownSeconds = document.querySelector('.countdown__seconds .number');

    if (countdownDays && countdownHours && countdownMinutes && countdownSeconds) {
        const deadline = new Date('Feb 21, 2026 00:00:00').getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = deadline - now;

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                countdownDays.textContent = days;
                countdownHours.textContent = hours;
                countdownMinutes.textContent = minutes;
                countdownSeconds.textContent = seconds;
            } else {
                countdownDays.textContent = 0;
                countdownHours.textContent = 0;
                countdownMinutes.textContent = 0;
                countdownSeconds.textContent = 0;
            }
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ========================================
    // GALLERY SLIDER
    // ========================================
    const galleryWrapper = document.querySelector('.gallery-wrapper');
    const galleryImages = document.querySelectorAll('.gallery-image');
    const prevBtn = document.querySelector('.gallery-control.prev');
    const nextBtn = document.querySelector('.gallery-control.next');

    if (galleryWrapper && galleryImages.length > 0) {
        let currentIndex = 0;
        const totalImages = galleryImages.length;

        function updateGallery() {
            galleryWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % totalImages;
                updateGallery();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + totalImages) % totalImages;
                updateGallery();
            });
        }

        // Auto-play
        let autoPlay = setInterval(function() {
            currentIndex = (currentIndex + 1) % totalImages;
            updateGallery();
        }, 5000);

        // Pause on hover
        const galleryContainer = document.querySelector('.gallery-container');
        if (galleryContainer) {
            galleryContainer.addEventListener('mouseenter', function() {
                clearInterval(autoPlay);
            });

            galleryContainer.addEventListener('mouseleave', function() {
                autoPlay = setInterval(function() {
                    currentIndex = (currentIndex + 1) % totalImages;
                    updateGallery();
                }, 5000);
            });
        }
    }

    // ========================================
    // HEADER FIXED ON SCROLL
    // ========================================
    const siteHeader = document.getElementById("site-header");

    if (siteHeader) {
        window.addEventListener("scroll", function() {
            if (window.scrollY > 50) {
                siteHeader.classList.add("nav-fixed");
            } else {
                siteHeader.classList.remove("nav-fixed");
            }
        });
    }

    // ========================================
    // SCROLL TO TOP BUTTON
    // ========================================
    const moveTopBtn = document.getElementById("movetop");

    if (moveTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                moveTopBtn.style.display = "block";
            } else {
                moveTopBtn.style.display = "none";
            }
        });
    }

    // ========================================
    // SMOOTH SCROLL
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ========================================
    // INFINITE SCROLL SPEED
    // ========================================
    const infiniteScroll = document.querySelector(".infinite-scroll-container");

    if (infiniteScroll) {
        function adjustScrollSpeed() {
            const totalWidth = infiniteScroll.scrollWidth / 2;
            const speedFactor = window.innerWidth <= 768 ? 100 : 80;
            const duration = totalWidth / speedFactor;
            infiniteScroll.style.animationDuration = `${duration}s`;
        }

        adjustScrollSpeed();
        window.addEventListener("resize", adjustScrollSpeed);
    }

    console.log('✅ All scripts loaded successfully!');
});

// ========================================
// SCROLL TO TOP FUNCTION
// ========================================
function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}