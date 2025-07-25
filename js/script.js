document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    startPhoneAnimation();
    setupFeatureBorderGlow();
});

function initializeApp() {
    console.log('UConnect загружен');
    setupVideoBackground();
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

// Настройка видео-фона
function setupVideoBackground() {
    const video = document.querySelector('.features-background-video');
    if (video) {
        video.play().catch(error => {
            console.log('Автовоспроизведение видео заблокировано:', error);
        });
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

// Усиленная функция для настройки интенсивного свечения
function setupFeatureBorderGlow() {
    const featureItems = document.querySelectorAll('.feature-item:not(.empty-item)');
    
    featureItems.forEach(item => {
        // Устанавливаем начальные CSS-переменные для интенсивного свечения
        item.style.setProperty('--glow-color-primary', 'rgba(27, 50, 184, 0.95)');
        item.style.setProperty('--glow-color-secondary', 'rgba(74, 144, 226, 0.9)');
        item.style.setProperty('--glow-opacity', '0');
        item.style.setProperty('--glow-size', '120px');
        item.style.setProperty('--glow-spread', '20px');
        
        // Функция обновления позиции и интенсивности свечения
        const updateGlowPosition = (e) => {
            const rect = item.getBoundingClientRect();
            let x, y;
            
            if (e && e.clientX && e.clientY) {
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;
            } else {
                x = rect.width / 2;
                y = rect.height / 2;
            }
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
            const maxDistance = Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) / 2;
            
            const normalizedDistance = distance / maxDistance;
            const dynamicSize = 150 + (100 * (1 - normalizedDistance));
            const dynamicOpacity = 1 - (normalizedDistance * 0.3); // Меньше затухание
            const dynamicSpread = 25 + (15 * (1 - normalizedDistance));
            
            item.style.setProperty('--mouse-x', `${x}px`);
            item.style.setProperty('--mouse-y', `${y}px`);
            item.style.setProperty('--glow-size', `${dynamicSize}px`);
            item.style.setProperty('--glow-opacity', `${dynamicOpacity}`);
            item.style.setProperty('--glow-spread', `${dynamicSpread}px`);
        };

        // Обработчики событий мыши
        item.addEventListener('mousemove', (e) => {
            updateGlowPosition(e);
            item.style.setProperty('--glow-size', '180px');
            item.style.setProperty('--glow-spread', '30px');
        });

        item.addEventListener('mouseenter', (e) => {
            updateGlowPosition(e);
            item.style.setProperty('--glow-opacity', '1');
            item.style.setProperty('--glow-size', '200px');
            item.style.setProperty('--glow-spread', '35px');
        });

        item.addEventListener('mouseleave', () => {
            item.style.setProperty('--glow-opacity', '0');
        });

        // Для активного элемента (active-glow)
        if (item.classList.contains('active-glow')) {
            updateGlowPosition();
            item.style.setProperty('--glow-opacity', '1');
            item.style.setProperty('--glow-size', '180px');
            item.style.setProperty('--glow-spread', '30px');
            
            // Интенсивная анимация пульсации
            let pulseDirection = 1;
            const pulseAnimation = () => {
                const currentSize = parseInt(item.style.getPropertyValue('--glow-size') || 180);
                const currentSpread = parseInt(item.style.getPropertyValue('--glow-spread') || 30);
                const newSize = currentSize + (pulseDirection * 5);
                const newSpread = currentSpread + (pulseDirection * 2);
                
                if (newSize > 220) pulseDirection = -1;
                if (newSize < 180) pulseDirection = 1;
                
                item.style.setProperty('--glow-size', `${newSize}px`);
                item.style.setProperty('--glow-spread', `${newSpread}px`);
                
                const intensity = 0.9 + 0.1 * Math.sin(Date.now() / 200);
                item.style.setProperty('--glow-opacity', `${intensity}`);
                
                requestAnimationFrame(pulseAnimation);
            };
            
            pulseAnimation();
        }
    });
}