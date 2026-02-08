// Index page specific scripts
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS para animações de entrada
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // Efeito Parallax para o footer
    var parallaxFooter = document.getElementById('parallax-footer');
    var parallaxImg = document.getElementById('parallax-img');

    if (parallaxFooter && parallaxImg) {
        window.addEventListener('scroll', function() {
            var scrollPosition = window.scrollY;
            var footerPosition = parallaxFooter.offsetTop;
            var windowHeight = window.innerHeight;

            if (scrollPosition + windowHeight > footerPosition) {
                var visibleAmount = (scrollPosition + windowHeight) - footerPosition;
                var parallaxValue = visibleAmount * 0.2;
                parallaxImg.style.transform = 'translateY(-' + parallaxValue + 'px) scale(' + (1 + visibleAmount / 2000) + ')';
            }
        });
    }

    // Função para configurar um carousel mobile
    var setupMobileCarousel = function(containerSelector, cardSelector, dotsSelector) {
        if (window.innerWidth > 767) return;

        var container = document.querySelector(containerSelector);
        var dots = dotsSelector === '.testimonial-navigation'
            ? document.querySelectorAll(dotsSelector + ' .testimonial-nav-dot')
            : document.querySelectorAll(dotsSelector + ' .dot');
        var cards = document.querySelectorAll(cardSelector);
        var autoScrollInterval = null;
        var userInteracted = false;

        if (!container || !dots.length || !cards.length) return;

        var startAutoScroll = function() {
            if (userInteracted) return;

            if (containerSelector === '.testimonials-container') {
                setTimeout(function() {
                    container.scrollTo({ left: 0, behavior: 'auto' });
                }, 200);
            }

            var currentIndex = 0;
            autoScrollInterval = setInterval(function() {
                currentIndex = (currentIndex + 1) % cards.length;
                var card = cards[currentIndex];
                var cardRect = card.getBoundingClientRect();
                var containerRect = container.getBoundingClientRect();
                var scrollPos = card.offsetLeft - container.offsetLeft -
                    (containerRect.width / 2) + (cardRect.width / 2);

                container.scrollTo({ left: scrollPos, behavior: 'smooth' });
                dots.forEach(function(d) { d.classList.remove('active'); });
                dots[currentIndex].classList.add('active');
            }, 5000);
        };

        var stopAutoScroll = function() {
            userInteracted = true;
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        };

        setTimeout(function() {
            if (containerSelector === '.testimonials-container') {
                container.scrollLeft = 0;
            }
        }, 500);

        dots.forEach(function(dot, index) {
            dot.addEventListener('click', function() {
                stopAutoScroll();
                var card = cards[index];
                var cardRect = card.getBoundingClientRect();
                var containerRect = container.getBoundingClientRect();
                var targetPosition = index === 0
                    ? 0
                    : card.offsetLeft - container.offsetLeft -
                      (containerRect.width / 2) + (cardRect.width / 2);

                container.scrollTo({ left: targetPosition, behavior: 'smooth' });
                dots.forEach(function(d) { d.classList.remove('active'); });
                dot.classList.add('active');
            });
        });

        container.addEventListener('touchstart', stopAutoScroll);
        container.addEventListener('mousedown', stopAutoScroll);

        container.addEventListener('scroll', function() {
            var scrollPosition = container.scrollLeft;
            var containerWidth = container.offsetWidth;

            cards.forEach(function(card, index) {
                var cardLeft = card.offsetLeft - container.offsetLeft;
                var cardCenter = cardLeft + (card.offsetWidth / 2);
                var containerCenter = scrollPosition + (containerWidth / 2);
                var distance = Math.abs(cardCenter - containerCenter);

                if (distance < card.offsetWidth * 0.75) {
                    dots.forEach(function(d) { d.classList.remove('active'); });
                    dots[index].classList.add('active');
                }
            });
        });

        startAutoScroll();
    };

    // Configurar os carousels
    setupMobileCarousel('.treatments-cards-container', '.treatment-modern-card', '.mobile-dots');
    setupMobileCarousel('.testimonials-container', '.testimonial-card', '.testimonial-navigation');

    // Garantir que todos os carousels comecem pelo primeiro item
    window.addEventListener('load', function() {
        var containers = [
            document.querySelector('.treatments-cards-container'),
            document.querySelector('.testimonials-container')
        ];

        for (var i = 0; i < 5; i++) {
            (function(delay) {
                setTimeout(function() {
                    containers.forEach(function(c) {
                        if (c) c.scrollLeft = 0;
                    });
                }, 300 * delay);
            })(i);
        }

        var treatmentDots = document.querySelectorAll('.mobile-dots .dot');
        var testimonialDots = document.querySelectorAll('.testimonial-navigation .dot');

        treatmentDots.forEach(function(dot) { dot.classList.remove('active'); });
        testimonialDots.forEach(function(dot) { dot.classList.remove('active'); });

        if (treatmentDots.length > 0) treatmentDots[0].classList.add('active');
        if (testimonialDots.length > 0) testimonialDots[0].classList.add('active');

        var testimonialContainer = document.querySelector('.testimonials-container');
        var testimonialCards = document.querySelectorAll('.testimonial-card');
        var testimonyDots = document.querySelectorAll('.testimonial-navigation .dot');

        if (testimonialContainer && testimonialCards.length > 0 && testimonyDots.length > 0) {
            testimonialContainer.addEventListener('scroll', function() {
                var scrollPosition = testimonialContainer.scrollLeft;
                var containerWidth = testimonialContainer.offsetWidth;

                testimonialCards.forEach(function(card, index) {
                    var cardLeft = card.offsetLeft - testimonialContainer.offsetLeft;
                    var cardCenter = cardLeft + (card.offsetWidth / 2);
                    var containerCenter = scrollPosition + (containerWidth / 2);
                    var distance = Math.abs(cardCenter - containerCenter);

                    if (distance < card.offsetWidth * 0.6) {
                        testimonyDots.forEach(function(d) { d.classList.remove('active'); });
                        testimonyDots[index].classList.add('active');
                    }
                });
            });

            testimonyDots.forEach(function(dot, index) {
                dot.addEventListener('click', function() {
                    var card = testimonialCards[index];
                    if (card) {
                        var cardRect = card.getBoundingClientRect();
                        var containerRect = testimonialContainer.getBoundingClientRect();
                        var scrollPos = card.offsetLeft - testimonialContainer.offsetLeft -
                            (containerRect.width / 2) + (cardRect.width / 2);

                        testimonialContainer.scrollTo({ left: scrollPos, behavior: 'smooth' });
                        testimonyDots.forEach(function(d) { d.classList.remove('active'); });
                        dot.classList.add('active');
                    }
                });
            });
        }
    });

    // Inicializar BeerSlider com suporte touch
    if (typeof BeerSlider === 'function') {
        document.querySelectorAll('.beer-slider').forEach(function(el) {
            new BeerSlider(el, { start: 50, prefix: 'beer', touch: true });
        });

        document.querySelectorAll('.beer-slider').forEach(function(slider) {
            var range = slider.querySelector('.beer-range');
            if (range) {
                range.addEventListener('touchstart', function(e) {
                    e.preventDefault();
                }, { passive: false });

                range.addEventListener('touchmove', function(e) {
                    e.preventDefault();
                    var touch = e.touches[0];
                    var rect = range.getBoundingClientRect();
                    var x = touch.clientX - rect.left;
                    var value = Math.round((x / rect.width) * 100);
                    range.value = Math.max(0, Math.min(100, value));
                    range.dispatchEvent(new Event('input'));
                }, { passive: false });
            }
        });
    }
});
