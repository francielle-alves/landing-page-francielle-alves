// Modern script for Francielle Alves website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the loader
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }, 300);
    }
    
    // Inicializar Swiper para tratamentos apenas em mobile
    function initTreatmentsSwiper() {
        if (window.innerWidth <= 767) {
            // Só inicializa em dispositivos móveis
            const treatmentsSwiper = new Swiper('.swiper-treatments-container', {
                slidesPerView: 1,
                spaceBetween: 20,
                centeredSlides: true,
                loop: true,
                autoplay: {
                    delay: 3500,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.treatments-pagination',
                    clickable: true,
                },
                breakpoints: {
                    // Quando a largura da tela for >= 480px
                    480: {
                        slidesPerView: 1.2,
                        spaceBetween: 20,
                    },
                }
            });
        }
    }
    
    // Inicializar na carga e redimensionamento
    initTreatmentsSwiper();
    window.addEventListener('resize', function() {
        initTreatmentsSwiper();
    });

    // Scroll animations for elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    // Observer for animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Optional: Unobserve after animation is triggered
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove the class when element is not in view
                // entry.target.classList.remove('appear');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Navbar hide/show on scroll
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    // Adicionar padding-top no primeiro elemento para compensar a altura do header
    const firstSection = document.querySelector('main').firstElementChild;
    if (firstSection) {
        const headerHeight = header.offsetHeight;
        firstSection.style.paddingTop = headerHeight + 'px';
    }
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Adiciona classe scrolled para mudar aparência
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Comportamento de ocultar ao rolar para baixo e mostrar ao rolar para cima
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Rolando para baixo e já passou 200px do topo
            header.classList.add('nav-hidden');
        } else {
            // Rolando para cima ou próximo ao topo
            header.classList.remove('nav-hidden');
        }
        
        // Fechar menu se estiver aberto durante o scroll
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.remove('active'));
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger menu animation
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
            
            // Prevent body scrolling when menu is open
            document.body.classList.toggle('menu-open');
            
            // Reset header state when menu is clicked
            header.classList.remove('scrolled', 'nav-hidden');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !e.target.closest('.nav-links') && 
                !e.target.closest('.menu-toggle')) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
            }
        });
        
        // Close menu when clicking on a nav link
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    
                    const spans = menuToggle.querySelectorAll('span');
                    spans.forEach(span => span.classList.remove('active'));
                }
            });
        });
    }
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('h3');
            const answer = item.querySelector('.faq-answer');
            
            question.addEventListener('click', () => {
                // Close all others
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = null;
                }
            });
        });
    }
    
    // Inicializar biblioteca BeerSlider para comparativos antes/depois
    if (typeof BeerSlider === 'function') {
        // Selecionar todos os elementos beer-slider e inicializar
        const beerSliders = document.querySelectorAll('.beer-slider');
        if (beerSliders.length > 0) {
            beerSliders.forEach(slider => {
                new BeerSlider(slider);
            });
        }
    }
    
    // Initialize testimonial sliders if any
    const testimonialsContainer = document.querySelector('.testimonial-container');
    if (testimonialsContainer) {
        let currentSlide = 0;
        const testimonials = testimonialsContainer.querySelectorAll('.testimonial-item');
        const totalSlides = testimonials.length;
        
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'testimonial-dots';
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.className = i === 0 ? 'dot active' : 'dot';
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            dotsContainer.appendChild(dot);
        }
        
        testimonialsContainer.appendChild(dotsContainer);
        
        // Create prev/next buttons
        const prevButton = document.createElement('button');
        prevButton.className = 'testimonial-prev';
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevButton.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });
        
        const nextButton = document.createElement('button');
        nextButton.className = 'testimonial-next';
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextButton.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });
        
        testimonialsContainer.appendChild(prevButton);
        testimonialsContainer.appendChild(nextButton);
        
        function goToSlide(slideIndex) {
            if (slideIndex < 0) {
                slideIndex = totalSlides - 1;
            } else if (slideIndex >= totalSlides) {
                slideIndex = 0;
            }
            
            testimonials.forEach((slide, index) => {
                slide.style.transform = `translateX(${100 * (index - slideIndex)}%)`;
            });
            
            // Update dots
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === slideIndex);
            });
            
            currentSlide = slideIndex;
        }
        
        // Set initial positions
        testimonials.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * index}%)`;
        });
        
        // Auto slide
        let slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
        
        // Pause auto slide on hover
        testimonialsContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        testimonialsContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);
        });
    }
    
    // Add active class to current page in navigation
    const currentLocation = window.location.pathname;
    const menuLinks = document.querySelectorAll('.nav-links a');
    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation.substring(currentLocation.lastIndexOf('/') + 1)) {
            link.classList.add('active');
        }
    });
});
