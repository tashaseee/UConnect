document.addEventListener('DOMContentLoaded', function() {
    // Инициализация приложения
    initializeApp();
    
    // Настройка эффекта свечения границы
    setupLocalBorderGlow();
    
    // Запуск анимации телефонов
    startPhoneAnimation();
    
    // Настройка обработчиков событий
    setupEventListeners();
});

/**
 * Основная функция инициализации приложения
 */
function initializeApp() {
    console.log('UConnect initialized');
    
    // Проверка поддержки CSS-переменных
    if (!CSS.supports('(--a: 0)')) {
        console.warn('CSS variables not supported, some effects may not work');
    }
}

/**
 * Настройка локального свечения границы при наведении
 */
function setupLocalBorderGlow() {
    const featureItems = document.querySelectorAll('.feature-item:not(.empty-item)');
    
    featureItems.forEach(item => {
        // Функция обновления позиции свечения
        const updateGlowPosition = (e) => {
            const rect = item.getBoundingClientRect();
            let x, y;
            
            if (e && e.clientX && e.clientY) {
                // Для событий мыши
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;
            } else {
                // Для активного элемента (центрируем свечение)
                x = rect.width / 2;
                y = rect.height / 2;
            }
            
            item.style.setProperty('--mouse-x', `${x}px`);
            item.style.setProperty('--mouse-y', `${y}px`);
            
            // Динамический расчет размера свечения
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const distance = Math.sqrt(
                Math.pow(x - centerX, 2) + 
                Math.pow(y - centerY, 2)
            );
            
            // Плавное изменение размера в зависимости от положения курсора
            const dynamicSize = Math.min(100, 60 + distance * 0.2);
            item.style.setProperty('--glow-size', `${dynamicSize}px`);
        };

        // Обработчики событий мыши
        item.addEventListener('mousemove', (e) => {
            updateGlowPosition(e);
            item.style.setProperty('--glow-opacity', '1');
        });

        item.addEventListener('mouseenter', (e) => {
            updateGlowPosition(e);
            item.style.setProperty('--glow-opacity', '1');
        });

        item.addEventListener('mouseleave', () => {
            item.style.setProperty('--glow-opacity', '0');
        });

        // Для активного элемента (active-glow)
        if (item.classList.contains('active-glow')) {
            // Начальные значения
            updateGlowPosition();
            item.style.setProperty('--glow-opacity', '1');
            item.style.setProperty('--glow-size', '80px');
            
            // Анимация пульсации для активного элемента
            let pulseDirection = 1;
            const pulseAnimation = () => {
                const currentSize = parseInt(item.style.getPropertyValue('--glow-size') || 80);
                const newSize = currentSize + (pulseDirection * 0.5);
                
                if (newSize > 100) pulseDirection = -1;
                if (newSize < 80) pulseDirection = 1;
                
                item.style.setProperty('--glow-size', `${newSize}px`);
                
                requestAnimationFrame(pulseAnimation);
            };
            
            // Запуск анимации
            pulseAnimation();
        }
    });
}

/**
 * Анимация переключения изображений телефонов
 */
function startPhoneAnimation() {
    const phoneImages = document.querySelectorAll('.phone-img');
    let currentIndex = 0;
    let animationInterval;
    
    if (phoneImages.length > 0) {
        // Показываем первое изображение
        phoneImages[0].classList.add('active');
        
        // Запускаем интервал переключения
        animationInterval = setInterval(() => {
            phoneImages[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % phoneImages.length;
            phoneImages[currentIndex].classList.add('active');
        }, 3000);
    }
    
    // Остановка анимации при скрытии страницы
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(animationInterval);
        } else {
            animationInterval = setInterval(() => {
                phoneImages[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % phoneImages.length;
                phoneImages[currentIndex].classList.add('active');
            }, 3000);
        }
    });
}

/**
 * Настройка обработчиков событий
 */
function setupEventListeners() {
    // Обработчик скролла для хедера
    window.addEventListener('scroll', debounce(handleScroll, 15));
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', debounce(handleResize, 200));
    
    // Клик по языковому селектору
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('click', toggleLanguageDropdown);
    }
}

/**
 * Обработчик скролла - изменение стиля хедера
 */
function handleScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const scrollY = window.scrollY;
    if (scrollY > 50) {
        header.style.background = 'rgba(39, 64, 205, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'transparent';
        header.style.backdropFilter = 'none';
        header.style.boxShadow = 'none';
    }
}

/**
 * Обработчик изменения размера окна
 */
function handleResize() {
    // Проверяем мобильное устройство
    const isMobile = window.innerWidth < 768;
    document.body.classList.toggle('mobile', isMobile);
}

/**
 * Переключение языкового меню
 */
function toggleLanguageDropdown() {
    const dropdown = document.querySelector('.language-dropdown');
    if (!dropdown) {
        createLanguageDropdown();
        return;
    }
    
    dropdown.classList.toggle('visible');
}

/**
 * Создание выпадающего меню языков
 */
function createLanguageDropdown() {
    const dropdown = document.createElement('div');
    dropdown.className = 'language-dropdown';
    dropdown.innerHTML = `
        <div class="language-option">Русский</div>
        <div class="language-option">English</div>
        <div class="language-option">Қазақша</div>
    `;
    
    document.querySelector('.language-selector').appendChild(dropdown);
}

/**
 * Функция для устранения дребезга (debounce)
 */
function debounce(func, wait, immediate = false) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Проверка поддержки CSS-свойств
 */
function checkCssSupport() {
    const supports = (property, value) => {
        if (typeof CSS !== 'undefined' && CSS.supports) {
            return CSS.supports(property, value);
        }
        return false;
    };
    
    const features = {
        cssVariables: supports('(--test: 0)'),
        backdropFilter: supports('backdrop-filter', 'blur(10px)'),
        maskComposite: supports('-webkit-mask-composite', 'xor')
    };
    
    return features;
}

// Экспорт функций для тестирования
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        setupLocalBorderGlow,
        startPhoneAnimation,
        debounce
    };
}