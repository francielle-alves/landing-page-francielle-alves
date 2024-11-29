document.addEventListener("DOMContentLoaded", function() {
    const faqItems = document.querySelectorAll(".faq-item");
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const menuToggle = document.querySelector('.menu-toggle');

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        question.addEventListener("click", () => {
            item.classList.toggle("active");
            const arrow = question.querySelector(".arrow");
            if (item.classList.contains("active")) {
                arrow.innerHTML = "&#9650;"; // Seta para cima
            } else {
                arrow.innerHTML = "&#9660;"; // Seta para baixo
            }
        });
    });

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
});
