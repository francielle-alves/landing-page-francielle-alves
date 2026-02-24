// Taping page specific scripts
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa as animações AOS
    if (typeof AOS !== 'undefined') {
        AOS.init();
    }

    // Botão fixo - esconder quando seção de matrícula está visível
    var botaoFixo = document.getElementById('botao-fixo');
    var matriculaSection = document.getElementById('matricula');

    if (botaoFixo && matriculaSection) {
        function verificarPosicao() {
            var matriculaRect = matriculaSection.getBoundingClientRect();
            if (matriculaRect.top <= window.innerHeight && matriculaRect.bottom >= 0) {
                botaoFixo.style.opacity = '0';
                botaoFixo.style.pointerEvents = 'none';
            } else {
                botaoFixo.style.opacity = '1';
                botaoFixo.style.pointerEvents = 'auto';
            }
        }
        window.addEventListener('scroll', verificarPosicao);
        verificarPosicao();
    }

    // Syllabus accordion
    var syllabusItems = document.querySelectorAll('.syllabus-item');
    if (syllabusItems.length > 0) {
        syllabusItems[0].classList.add('active');

        syllabusItems.forEach(function(item) {
            var header = item.querySelector('.syllabus-header');
            if (header) {
                header.addEventListener('click', function() {
                    if (item.classList.contains('active')) {
                        item.classList.remove('active');
                    } else {
                        syllabusItems.forEach(function(otherItem) {
                            otherItem.classList.remove('active');
                        });
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // Bonus carousel (mobile only)
    var bonusCarouselInitialized = false;
    function setupBonusCarousel() {
        if (window.innerWidth > 767) return;

        var container = document.querySelector('.bonus-carousel-container');
        var dots = document.querySelectorAll('.bonus-nav-dot');
        var cards = document.querySelectorAll('.bonus-carousel-card');

        if (!container || !cards.length || !dots.length) return;

        container.style.msOverflowStyle = 'none';
        container.style.scrollbarWidth = 'none';

        if (!document.getElementById('bonus-scrollbar-hide')) {
            var style = document.createElement('style');
            style.id = 'bonus-scrollbar-hide';
            style.textContent = '.bonus-carousel-container::-webkit-scrollbar { display: none; }';
            document.head.appendChild(style);
        }

        dots.forEach(function(dot, index) {
            dot.addEventListener('click', function() {
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

        container.addEventListener('scroll', function() {
            var scrollPosition = container.scrollLeft;
            var containerWidth = container.offsetWidth;

            cards.forEach(function(card, index) {
                var cardLeft = card.offsetLeft - container.offsetLeft;
                var cardCenter = cardLeft + (card.offsetWidth / 2);
                var containerCenter = scrollPosition + (containerWidth / 2);
                var distance = Math.abs(cardCenter - containerCenter);

                if (distance < card.offsetWidth * 0.75) {
                    dots.forEach(function(d) {
                        d.classList.remove('active');
                        d.style.backgroundColor = '#ddd';
                    });
                    dots[index].classList.add('active');
                    dots[index].style.backgroundColor = 'var(--color-primary)';
                }
            });
        });

        if (!bonusCarouselInitialized) {
            setTimeout(function() {
                container.scrollLeft = 0;
                dots[0].classList.add('active');
                dots[0].style.backgroundColor = 'var(--color-primary)';
                dots.forEach(function(d, i) {
                    if (i > 0) d.style.backgroundColor = '#ddd';
                });
                bonusCarouselInitialized = true;
            }, 100);
        }
    }

    setupBonusCarousel();
    window.addEventListener('resize', setupBonusCarousel);
});
