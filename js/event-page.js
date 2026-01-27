// Smooth Scroll to Top
window.onscroll = function() {
    const moveTopBtn = document.getElementById("movetop");
    if (moveTopBtn) {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            moveTopBtn.style.display = "block";
            moveTopBtn.style.animation = "fadeIn 0.3s";
        } else {
            moveTopBtn.style.display = "none";
        }
    }
};

function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Fixed Header with Smooth Effect
$(window).on("scroll", function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 80) {
        $("#site-header").addClass("nav-fixed");
    } else {
        $("#site-header").removeClass("nav-fixed");
    }
});

// NOTE: Tab switching is now handled inline in the HTML
// Removed conflicting tab switching code

// Smooth Scroll for Anchor Links
$(document).ready(function() {
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if(target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 1200);
        }
    });
});

// Advanced Intersection Observer for Cards
function animateOnScroll() {
    const cards = document.querySelectorAll('.event-card, .dept-card, .schedule-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(card);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateOnScroll, 100);
});

// Parallax Effect for Hero Section
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            const hero = document.querySelector('.hero-section');
            if (hero) {
                const scrolled = window.pageYOffset;
                const limit = hero.offsetHeight;
                if (scrolled <= limit) {
                    hero.style.transform = `translateY(${scrolled * 0.4}px)`;
                    hero.style.opacity = 1 - (scrolled / limit) * 0.5;
                }
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Enhanced Counter Animation for Prizes
function animateCounters() {
    const counters = document.querySelectorAll('.prize-amount');
    
    counters.forEach(counter => {
        const text = counter.innerText;
        const target = parseInt(text.replace(/[^0-9]/g, ''));
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let current = 0;
                    const increment = target / 60;
                    const duration = 2000;
                    const stepTime = duration / 60;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.innerText = '₹' + target.toLocaleString('en-IN');
                            clearInterval(timer);
                        } else {
                            counter.innerText = '₹' + Math.floor(current).toLocaleString('en-IN');
                        }
                    }, stepTime);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateCounters, 300);
});

// Dynamic Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
});

// Department Cards Stagger Animation
document.addEventListener('DOMContentLoaded', function() {
    const deptCards = document.querySelectorAll('.dept-card');
    
    deptCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// Mobile Menu Toggle with Animation
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarTogglerDemo02');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
            
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.style.animation = 'slideDown 0.3s ease';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navbarToggler.contains(event.target) || navbarCollapse.contains(event.target);
            
            if (!isClickInside && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
        
        // Close menu when clicking nav links
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992) {
                    navbarCollapse.classList.remove('show');
                }
            });
        });
    }
});

// Animate Section Headers on Scroll
function animateSectionHeaders() {
    const headers = document.querySelectorAll('.section-header');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target.querySelector('.section-title');
                const subtitle = entry.target.querySelector('.section-subtitle');
                
                if (title) {
                    title.style.animation = 'fadeInUp 0.8s ease forwards';
                }
                if (subtitle) {
                    subtitle.style.animation = 'fadeInUp 0.8s ease 0.2s forwards';
                    subtitle.style.opacity = '0';
                    setTimeout(() => {
                        subtitle.style.opacity = '1';
                    }, 200);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    headers.forEach(header => {
        observer.observe(header);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    animateSectionHeaders();
});

// Button Ripple Effect
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-register, .btn-details, .btn-dept-register, .btn-dept-info, .btn-download-poster');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Preload images with fade-in effect
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });
});

// Add floating animation to schedule icons
document.addEventListener('DOMContentLoaded', function() {
    const icons = document.querySelectorAll('.schedule-icon');
    
    icons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.1}s`;
    });
});

// Make schedule items clickable to navigate to department pages
document.addEventListener('DOMContentLoaded', function() {
    const scheduleItems = document.querySelectorAll('.schedule-item');
    
    // Map event names to their respective HTML files
    const eventPageMap = {
        'CodeWizard': 'CSE.html',
        'Tech-Negotia 2.0': 'CSBS.html',
        'Dive In Circuit 3.0': 'ELE.html',
        'C-Coder Clash': 'ENTC.html',
        'Battle of Wits': 'Mech.html',
        'Civil Safari': 'Civil.html',
        'Beyond Resume': 'AIML.html',
        'En-Vision': 'CVEN.html',
        'Think & Ink': 'Bio.html'
    };
    
    scheduleItems.forEach(item => {
        const eventName = item.querySelector('h4').textContent.trim();
        
        if (eventPageMap[eventName]) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', function() {
                window.location.href = eventPageMap[eventName];
            });
        }
    });
});

// Department card click handlers
document.addEventListener('DOMContentLoaded', function() {
    // Map department cards to their info pages
    const deptInfoButtons = document.querySelectorAll('.btn-dept-info');
    
    const deptPageMap = {
        'CodeWizard': 'CSE.html',
        'Beyond Resume': 'AIML.html',
        'Tech-Negotia 2.0': 'CSBS.html',
        'Dive In Circuit 3.0': 'ELE.html',
        'C-Coder Clash': 'ENTC.html',
        'Battle of Wits': 'Mech.html',
        'Civil Safari': 'Civil.html',
        'En-Vision': 'CVEN.html',
        'Think & Ink': 'Bio.html'
    };
    
    deptInfoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.dept-card');
            const eventName = card.querySelector('.dept-event').textContent.trim();
            
            if (deptPageMap[eventName]) {
                window.location.href = deptPageMap[eventName];
            }
        });
    });
});