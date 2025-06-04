document.addEventListener('DOMContentLoaded', function () {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800, // Duración de la animación en ms
        once: true, // Si la animación debe ocurrir solo una vez
        offset: 50, // Offset (en px) desde el borde original del elemento
    });

    // Interactive Sparks System
    let lastSparkTime = 0;
    const sparkDelay = 50; // Minimum delay between sparks in milliseconds

    function createSpark(x, y) {
        const now = Date.now();
        if (now - lastSparkTime < sparkDelay) return;
        lastSparkTime = now;

        const spark = document.createElement('div');
        spark.className = 'spark';
        spark.style.left = x + 'px';
        spark.style.top = y + 'px';
        
        // Random color variations
        const colors = [
            'radial-gradient(circle, #667eea 0%, #764ba2 100%)',
            'radial-gradient(circle, #f093fb 0%, #f5576c 100%)',
            'radial-gradient(circle, #4facfe 0%, #00f2fe 100%)',
            'radial-gradient(circle, #fa709a 0%, #fee140 100%)'
        ];
        spark.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(spark);
        
        // Remove spark after animation
        setTimeout(() => {
            if (spark.parentNode) {
                spark.parentNode.removeChild(spark);
            }
        }, 800);
    }

    // Mouse move event
    document.addEventListener('mousemove', (e) => {
        // Only create sparks if mouse is moving fast enough
        if (Math.random() > 0.7) {
            createSpark(e.clientX, e.clientY);
        }
    });

    // Touch events for mobile - Only create sparks on tap, not during scroll
    let isScrolling = false;
    let touchStartY = 0;
    let touchStartTime = 0;

    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        touchStartY = touch.clientY;
        touchStartTime = Date.now();
        isScrolling = false;
        
        // Only create spark on initial touch if it's a quick tap
        setTimeout(() => {
            if (!isScrolling) {
                createSpark(touch.clientX, touch.clientY);
            }
        }, 100);
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const deltaY = Math.abs(touch.clientY - touchStartY);
        
        // If user moved more than 10px vertically, consider it scrolling
        if (deltaY > 10) {
            isScrolling = true;
        }
        
        // Only create sparks if not scrolling and moving slowly
        if (!isScrolling && Math.random() > 0.8) {
            createSpark(touch.clientX, touch.clientY);
        }
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        const touchDuration = Date.now() - touchStartTime;
        
        // If it was a quick tap (less than 200ms) and no scrolling, create extra sparks
        if (touchDuration < 200 && !isScrolling) {
            const touch = e.changedTouches[0];
            for (let i = 0; i < 2; i++) {
                setTimeout(() => {
                    const offsetX = (Math.random() - 0.5) * 15;
                    const offsetY = (Math.random() - 0.5) * 15;
                    createSpark(touch.clientX + offsetX, touch.clientY + offsetY);
                }, i * 30);
            }
        }
    }, { passive: true });

    // Click event for additional sparks
    document.addEventListener('click', (e) => {
        // Create multiple sparks on click
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const offsetX = (Math.random() - 0.5) * 20;
                const offsetY = (Math.random() - 0.5) * 20;
                createSpark(e.clientX + offsetX, e.clientY + offsetY);
            }, i * 50);
        }
    });

    // Menú de navegación fijo (Sticky nav)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled', 'bg-gray-900'); // bg-gray-900 o el color que prefieras
            navbar.classList.remove('bg-opacity-50', 'backdrop-blur-md');
        } else {
            navbar.classList.remove('scrolled', 'bg-gray-900');
            navbar.classList.add('bg-opacity-50', 'backdrop-blur-md');
        }
        
        // Medida de seguridad: remover la clase mobile-menu-open si se detecta scroll
        // Esto asegura que nunca quede bloqueado el scroll por el menú móvil
        if (document.body.classList.contains('mobile-menu-open')) {
            document.body.classList.remove('mobile-menu-open');
        }
    });

    // Scroll suave para los enlaces del menú
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // El scroll-snap-type en CSS se encargará del "snap".
                // scrollIntoView se usa para el click en los enlaces del menú.
                // 'block: start' alineará la parte superior del elemento (incluyendo su padding-top)
                // con la parte superior del viewport, lo cual es correcto.
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Cerrar menú móvil si está abierto
                // Asegurarse de que el body no tenga overflow:hidden si el menú se cierra
                // y el scroll snap está activo.
                if (mobileMenu.classList.contains('block')) {
                    mobileMenu.classList.remove('block');
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.querySelector('svg.block').classList.remove('hidden');
                    mobileMenuButton.querySelector('svg.hidden').classList.add('hidden');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                    
                    // Asegurar que se remueva la clase que bloquea el scroll
                    document.body.classList.remove('mobile-menu-open');
                }
            }
        });
    });

    // Menú hamburguesa para móvil
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconOpen = mobileMenuButton.querySelector('svg.block');
    const iconClose = mobileMenuButton.querySelector('svg.hidden');

    mobileMenuButton.addEventListener('click', () => {
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('block'); 
        iconOpen.classList.toggle('hidden');
        iconClose.classList.toggle('hidden');

        // Controlar el scroll del body cuando el menú móvil se abre/cierra
        if (mobileMenu.classList.contains('block')) {
            document.body.classList.add('mobile-menu-open');
        } else {
            document.body.classList.remove('mobile-menu-open');
        }
    });

    // Cerrar menú móvil al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('block')) {
                // Cerrar el menú móvil manualmente
                mobileMenu.classList.remove('block');
                mobileMenu.classList.add('hidden');
                iconOpen.classList.remove('hidden');
                iconClose.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                
                // Asegurar que se remueva la clase que bloquea el scroll
                document.body.classList.remove('mobile-menu-open');
            }
        });
    });

    // Inicializar Particles.js (si se decide usar)
    // Asegúrate de que el ID 'particles-background' exista en tu HTML (sección Hero)
    if (document.getElementById('particles-background')) {
        particlesJS('particles-background', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2, // Reducir velocidad para un movimiento más sutil
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab" // o "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 100, // Reducir distancia para menor efecto
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Funcionalidad para expandir/colapsar items de la línea de tiempo de experiencia
    const timelineTitles = document.querySelectorAll('#experiencia .timeline-title');
    timelineTitles.forEach(title => {
        title.addEventListener('click', () => {
            const details = title.nextElementSibling.nextElementSibling; // El div de detalles
            // const details = title.closest('.timeline-event-container').querySelector('.timeline-details');
            if (details) {
                details.classList.toggle('hidden');
                // Cambiar el ícono si se usa uno (ej. Font Awesome)
                // const icon = title.querySelector('i'); 
                // if (icon) {
                //     icon.classList.toggle('fa-chevron-down');
                //     icon.classList.toggle('fa-chevron-up');
                // }
            }
        });
    });

    // Inicialización de Swiper para el carrusel de certificados
    if (document.querySelector('.certificates-slider')) {
        new Swiper('.certificates-slider', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto', // 'auto' o un número como 3
            loop: true,
            coverflowEffect: {
                rotate: 50, // Rotación de las slides laterales
                stretch: 0, // Estiramiento entre slides
                depth: 100, // Profundidad del efecto
                modifier: 1, // Multiplicador del efecto
                slideShadows: true, // Mostrar sombras de las slides
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 3500, // Reducido para una rotación más dinámica
                disableOnInteraction: false,
            },
        });
    }

});