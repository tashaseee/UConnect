document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    startPhoneAnimation();
    setupFeatureBorderGlow();
});

function initializeApp() {
    console.log('UConnect загружен');
}

function setupEventListeners() {
    window.addEventListener('scroll', debounce(handleScroll, 10));
    window.addEventListener('resize', handleResize);
}

// Анимация телефонов
function startPhoneAnimation() {
    const phoneImages = document.querySelectorAll('.phone-img');
    let currentIndex = 0;
    
    if (phoneImages.length > 0) {
        phoneImages[0].classList.add('active');
        
        setInterval(() => {
            phoneImages[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % phoneImages.length;
            phoneImages[currentIndex].classList.add('active');
        }, 5000);
    }
}

// Обработчик скролла для хедера
function handleScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const scrollY = window.scrollY;
    if (scrollY > 50) {
        header.style.background = 'rgba(39, 64, 205, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'transparent';
        header.style.backdropFilter = 'none';
    }
}

// Обработчик изменения размера окна
function handleResize() {
    const isMobile = window.innerWidth < 768;
    document.body.classList.toggle('mobile', isMobile);
}

// Утилита для debounce
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

// Главная функция для подсветки границы, следующей за курсором
function setupFeatureBorderGlow() {
    const featureItems = document.querySelectorAll('.feature-item:not(.empty-item)');

    featureItems.forEach(item => {
        // Инициализируем начальный угол
        item.style.setProperty('--angle', '0deg');
        
        // Функция для обновления угла свечения на основе позиции курсора
        function updateGlowAngle(event) {
            const rect = item.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Вычисляем угол от центра элемента к курсору
            const deltaX = event.clientX - centerX;
            const deltaY = event.clientY - centerY;
            
            // Конвертируем в угол в градусах (0-360)
            let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
            angle = angle < 0 ? angle + 360 : angle;
            
            // Устанавливаем CSS переменную для угла
            item.style.setProperty('--angle', `${angle}deg`);
        }

        // Обработчик входа курсора
        item.addEventListener('mouseenter', (event) => {
            updateGlowAngle(event);
        });

        // Обработчик движения курсора
        item.addEventListener('mousemove', (event) => {
            updateGlowAngle(event);
        });

        // Обработчик выхода курсора
        item.addEventListener('mouseleave', () => {
            // Сбрасываем угол к начальному значению
            item.style.setProperty('--angle', '0deg');
        });
    });
}