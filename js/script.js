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
});
