document.addEventListener("DOMContentLoaded", function() {
    const faqItems = document.querySelectorAll(".faq-item");
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    const navItems = document.querySelectorAll('.nav-links a');

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector(".faq-question");
            if (question) {
                question.addEventListener("click", () => {
                    item.classList.toggle("active");
                    const arrow = question.querySelector(".arrow");
                    if (arrow) {
                        arrow.innerHTML = item.classList.contains("active") ? "&#9650;" : "&#9660;";
                    }
                });
            }
        });
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    if (navItems.length > 0) {
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Header scroll behavior
    let lastScrollPosition = 0;
    const header = document.querySelector('header');
    const scrollThreshold = 100; // Minimum scroll amount before showing/hiding

    function handleScroll() {
        const currentScrollPosition = window.pageYOffset;
        
        // Only handle scroll after threshold to prevent tiny movements
        if (Math.abs(currentScrollPosition - lastScrollPosition) < scrollThreshold) {
            return;
        }

        // Scrolling down
        if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
            header.classList.add('nav-hidden');
        }
        // Scrolling up
        else {
            header.classList.remove('nav-hidden');
        }
        
        lastScrollPosition = currentScrollPosition;
    }

    // Throttle scroll event to improve performance
    let ticking = false;
    document.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
});
