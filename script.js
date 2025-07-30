$(document).ready(function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        disable: function() {
            // Disable AOS on mobile devices for better performance
            return window.innerWidth < 768;
        }
    });

    // Initialize jQuery Mobile
/*     $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false; */

    // Initialize Gallery Slider
    $('.gallery-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        pauseOnFocus: true,
        accessibility: true,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev" aria-label="Предыдущее изображение"><span aria-hidden="true">‹</span></button>',
        nextArrow: '<button type="button" class="slick-next" aria-label="Следующее изображение"><span aria-hidden="true">›</span></button>',
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    });

        // Настройка lightbox'a с Magnific Popup
    $('.gallery-slide img').magnificPopup({
        type: 'image',
        gallery: { enabled:true }, // Включаем галерею
        mainClass: 'mfp-with-zoom', // Класс анимации zoom-in/out
        zoom: {
            enabled: true, // Включаем зумирование
            duration: 300, // Продолжительность эффекта зума
            easing: 'ease-in-out'
        }
    });

    // Initialize Testimonials Slider
    $('.testimonials-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        pauseOnFocus: true,
        accessibility: true,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev" aria-label="Предыдущий отзыв"><span aria-hidden="true">‹</span></button>',
        nextArrow: '<button type="button" class="slick-next" aria-label="Следующий отзыв"><span aria-hidden="true">›</span></button>',
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    });

    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();

        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800, 'easeInOutCubic');
        }
    });

    // Mobile menu toggle
    let mobileMenuOpen = false;

    function createMobileMenuToggle() {
        if ($('.mobile-menu-toggle').length === 0) {
            const toggleButton = $('<button class="mobile-menu-toggle" aria-label="Открыть меню" aria-expanded="false"><span></span><span></span><span></span></button>');
            $('.top-navigation .nav-container').prepend(toggleButton);
        }
    }

    function handleMobileMenu() {
        if ($(window).width() <= 991) {
            createMobileMenuToggle();
            $('.nav-menu').addClass('mobile-menu');
        } else {
            $('.mobile-menu-toggle').remove();
            $('.nav-menu').removeClass('mobile-menu mobile-menu-open');
            mobileMenuOpen = false;
        }
    }

    // Mobile menu toggle functionality
    $(document).on('click', '.mobile-menu-toggle', function() {
        mobileMenuOpen = !mobileMenuOpen;
        $('.nav-menu').toggleClass('mobile-menu-open', mobileMenuOpen);
        $(this).attr('aria-expanded', mobileMenuOpen);
        $(this).attr('aria-label', mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню');
    });

    // Close mobile menu when clicking on a link
    $(document).on('click', '.mobile-menu a', function() {
        if (mobileMenuOpen) {
            $('.nav-menu').removeClass('mobile-menu-open');
            $('.mobile-menu-toggle').attr('aria-expanded', 'false');
            $('.mobile-menu-toggle').attr('aria-label', 'Открыть меню');
            mobileMenuOpen = false;
        }
    });

    // Handle window resize
    $(window).on('resize', function() {
        handleMobileMenu();
    });

    // Initialize mobile menu on load
    handleMobileMenu();

    // CTA Button click handlers
    $('[open-modal]').on('click', function(e) {
        e.preventDefault();

        const buttonText = $(this).text().trim();
        let modalTitle = 'Заказать консультацию';
        let modalContent = 'Оставьте ваши контактные данные, и мы свяжемся с вами в ближайшее время.';

        if (buttonText.includes('Калькулятор')) {
            modalTitle = 'Калькулятор стоимости окон';
            modalContent = 'Рассчитайте стоимость ваших окон онлайн.';
        } else if (buttonText.includes('замерщика')) {
            modalTitle = 'Вызов замерщика';
            modalContent = 'Наш специалист приедет для бесплатного замера в удобное для вас время.';
        }

        showContactModal(modalTitle, modalContent);
    });

    // Contact modal functionality
    function showContactModal(title, content) {
        const modal = $(`
            <div class="contact-modal" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-content">
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 id="modal-title">${title}</h3>
                        <button class="modal-close" aria-label="Закрыть модальное окно">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p id="modal-content">${content}</p>
                        <form class="contact-form" novalidate>
                            <div class="form-group">
                                <label for="contact-name">Имя *</label>
                                <input type="text" id="contact-name" name="name" required aria-required="true">
                                <span class="error-message" role="alert"></span>
                            </div>
                            <div class="form-group">
                                <label for="contact-phone">Телефон *</label>
                                <input type="tel" id="contact-phone" name="phone" required aria-required="true">
                                <span class="error-message" role="alert"></span>
                            </div>
                            
                            <div class="form-group">
                                <label for="contact-message">Сообщение</label>
                                <textarea id="contact-message" name="message" rows="4"></textarea>
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="submit-btn">Отправить заявку</button>
                                <button type="button" class="cancel-btn">Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `);

       /*  <div class="form-group">
                                <label for="contact-email">Email</label>
                                <input type="email" id="contact-email" name="email">
                                <span class="error-message" role="alert"></span>
                            </div> */

        $('body').append(modal);
        modal.fadeIn(300);

        // Focus management
        modal.find('#contact-name').focus();

        // Trap focus within modal
        modal.on('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }

            if (e.key === 'Tab') {
                const focusableElements = modal.find('button, input, textarea, select, a[href]');
                const firstElement = focusableElements.first();
                const lastElement = focusableElements.last();

                if (e.shiftKey && document.activeElement === firstElement[0]) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement[0]) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }

    // Close modal functionality
    function closeModal() {
        $('.contact-modal').fadeOut(300, function() {
            $(this).remove();
        });
    }

    $(document).on('click', '.modal-close, .cancel-btn, .modal-overlay', closeModal);

    // Form validation and submission
    $(document).on('submit', '.contact-form', function(e) {
        e.preventDefault();

        const form = $(this);
        const formData = {
            name: form.find('#contact-name').val().trim(),
            phone: form.find('#contact-phone').val().trim(),
            email: form.find('#contact-email').val().trim(),
            message: form.find('#contact-message').val().trim()
        };

        // Clear previous errors
        form.find('.error-message').text('');
        form.find('.form-group').removeClass('error');

        let isValid = true;

        // Validate name
        if (!formData.name) {
            showFieldError(form.find('#contact-name'), 'Пожалуйста, введите ваше имя');
            isValid = false;
        }

        // Validate phone
        if (!formData.phone) {
            showFieldError(form.find('#contact-phone'), 'Пожалуйста, введите номер телефона');
            isValid = false;
        } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
            showFieldError(form.find('#contact-phone'), 'Пожалуйста, введите корректный номер телефона');
            isValid = false;
        }

        // Validate email if provided
/*         if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            showFieldError(form.find('#contact-email'), 'Пожалуйста, введите корректный email');
            isValid = false;
        } */

        if (isValid) {
            // Simulate form submission
            const submitBtn = form.find('.submit-btn');
            const originalText = submitBtn.text();

            submitBtn.prop('disabled', true).text('Отправка...');

            setTimeout(() => {
                alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
                closeModal();
            }, 1500);
        }
    });

    function showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        formGroup.addClass('error');
        formGroup.find('.error-message').text(message);

        if (field.is(':first-child')) {
            field.focus();
        }
    }

    // Lazy loading for images
    function lazyLoadImages() {
        const images = $('img[data-src]');

        images.each(function() {
            const img = $(this);
            const src = img.attr('data-src');

            if (isElementInViewport(img[0])) {
                img.attr('src', src).removeAttr('data-src');
                img.on('load', function() {
                    img.addClass('loaded');
                });
            }
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Scroll event for lazy loading
    $(window).on('scroll', function() {
        lazyLoadImages();
    });

    // Initialize lazy loading
    lazyLoadImages();

    // Accessibility improvements

    // Skip link functionality
    $('<a href="#main-content" class="skip-link">Перейти к основному содержанию</a>').prependTo('body');

    // Add main content landmark
    $('.main-wrapper').attr('id', 'main-content').attr('role', 'main');

    // Improve keyboard navigation for sliders
    $('.slick-slide').attr('tabindex', '-1');
    $('.slick-active .slick-slide').attr('tabindex', '0');

    // Update slider accessibility on slide change
    $('.gallery-slider, .testimonials-slider').on('afterChange', function(event, slick, currentSlide) {
        $(this).find('.slick-slide').attr('tabindex', '-1');
        $(this).find('.slick-active').attr('tabindex', '0');
    });

    // Announce slider changes to screen readers
    $('.gallery-slider').on('afterChange', function(event, slick, currentSlide) {
        const announcement = `Изображение ${currentSlide + 1} из ${slick.slideCount}`;
        announceToScreenReader(announcement);
    });

    $('.testimonials-slider').on('afterChange', function(event, slick, currentSlide) {
        const announcement = `Отзыв ${currentSlide + 1} из ${slick.slideCount}`;
        announceToScreenReader(announcement);
    });

    function announceToScreenReader(message) {
        const announcement = $('<div class="sr-only" aria-live="polite" aria-atomic="true"></div>');
        $('body').append(announcement);
        announcement.text(message);

        setTimeout(() => {
            announcement.remove();
        }, 1000);
    }

    // High contrast mode detection
    if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
        $('body').addClass('high-contrast');
    }

    // Reduced motion detection
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        $('body').addClass('reduced-motion');

        // Disable autoplay for sliders
        $('.gallery-slider, .testimonials-slider').slick('slickSetOption', 'autoplay', false, true);
    }

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Debounced scroll handler
    const debouncedScrollHandler = debounce(() => {
        lazyLoadImages();
    }, 100);

    $(window).off('scroll').on('scroll', debouncedScrollHandler);

    // Error handling for sliders
    $('.gallery-slider, .testimonials-slider').on('init', function(event, slick) {
        console.log('Slider initialized successfully');
    }).on('breakpoint', function(event, slick, breakpoint) {
        console.log('Slider breakpoint changed:', breakpoint);
    });

    // Fallback for browsers without JavaScript
    $('body').addClass('js-enabled');

    console.log('Window company website initialized successfully');
});

// CSS for modal and mobile menu (to be added to SCSS)
const additionalCSS = `
.contact-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    display: none;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #eee;
}

.modal-header h3 {
    margin: 0;
    color: #161226;
}

.modal-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-body {
    padding: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
    color: #161226;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #ff9f43;
}

.form-group.error input,
.form-group.error textarea {
    border-color: #e74c3c;
}

.error-message {
    color: #e74c3c;
    font-size: 14px;
    margin-top: 5px;
    display: block;
}

.form-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 20px;
}

.submit-btn,
.cancel-btn {
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.submit-btn {
    background-color: #ff9f43;
    color: white;
}

.submit-btn:hover {
    background-color: #e67e22;
}

.submit-btn:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
}

.cancel-btn {
    background-color: #95a5a6;
    color: white;
}

.cancel-btn:hover {
    background-color: #7f8c8d;
}

.mobile-menu-toggle {
    display: none;
    flex-direction: column;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    margin-right: 15px;
}

.mobile-menu-toggle span {
    width: 25px;
    height: 3px;
    background-color: currentColor;
    margin: 2px 0;
    transition: 0.3s;
}

.mobile-menu {
    position: absolute;
    top: 125px;
    left: 0;
    right: 0;
    background-color: rgba(255, 217, 191, 0.95);
    flex-direction: column;
    padding: 20px;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    width: 99dvh;
}

.mobile-menu-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
}

@media (max-width: 991px) {
    .mobile-menu-toggle {
        display: flex;
        position: absolute;
    }

    .nav-menu {
        position: relative;
        z-index: 2;
    }
}

.skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: #161226;
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 1000;
    border-radius: 4px;
}

.skip-link:focus {
    top: 6px;
}

.js-enabled .no-js {
    display: none;
}

.loaded {
    opacity: 1;
    transition: opacity 0.3s ease;
}

img[data-src] {
    opacity: 0;
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
