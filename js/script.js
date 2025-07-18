document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    startPhoneThemeAnimation();
    setupFeatureHover();
    setupConnectionLines();
});

function startPhoneThemeAnimation() {
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

function initializeApp() {
    console.log('UConnect приложение загружено');
    
    if (!window.fetch) {
        console.warn('Ваш браузер не поддерживает все функции');
    }
}

function setupEventListeners() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('click', handleLanguageChange);
    }
    
    window.addEventListener('scroll', optimizedScrollHandler);
    window.addEventListener('resize', handleResize);
}

function handleNavClick(event) {
    event.preventDefault();
    const targetText = event.target.textContent;
    
    console.log(`Переход к разделу: ${targetText}`);
    
    if (targetText === 'Преимущества') {
        showAdvantages();
    } else if (targetText === 'Вопросы и ответы') {
        showFAQ();
    }
}

function handleLanguageChange(event) {
    const currentLang = event.target.textContent.includes('Рус') ? 'ru' : 'en';
    const newLang = currentLang === 'ru' ? 'en' : 'ru';
    
    console.log(`Изменение языка с ${currentLang} на ${newLang}`);
    
    changeLanguage(newLang);
}

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('.header');
    
    if (header) {
        if (scrollTop > 50) {
            header.style.background = 'rgba(39, 64, 205, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
        }
    }
}

function handleResize() {
    const width = window.innerWidth;
    console.log(`Изменение размера окна: ${width}px`);
    
    if (width < 768) {
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
}

function showAdvantages() {
    const featuresSection = document.querySelector('.features-section');
    if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
    console.log('Показать преимущества');
}

function showFAQ() {
    console.log('Показать FAQ');
}

function changeLanguage(lang) {
    const translations = {
        'en': {
            'advantages': 'Advantages',
            'faq': 'FAQ',
            'title': 'UConnect — messenger for open communication and collaboration',
            'subtitle': 'Built on open Matrix protocol. No ads, tracking or imposed rules.',
            'language': 'Eng',
            'features_title': 'What can',
            'features_brand': 'UConnect',
            'features_subtitle': 'Simple, convenient and secure — both for personal communication and project work',
            'security_title': 'Secure chats',
            'security_desc': 'Messages are encrypted and remain only with participants',
            'topics_title': 'Topics and groups',
            'topics_desc': 'Communicate in open or private rooms',
            'themes_title': 'Light and dark theme',
            'themes_desc': 'Suitable for any conditions and habits',
            'adaptive_title': 'Adaptability',
            'adaptive_desc': 'Works in browser, on desktop and on phone',
            'files_title': 'Files and images',
            'files_desc': 'Share files, photos, documents — right in chat'
        },
        'ru': {
            'advantages': 'Преимущества',
            'faq': 'Вопросы и ответы',
            'title': 'UConnect — мессенджер для открытого общения и сотрудничества',
            'subtitle': 'Построен на открытом протоколе Matrix. Без рекламы, слежки и навязанных правил.',
            'language': 'Рус',
            'features_title': 'Что умеет',
            'features_brand': 'UConnect',
            'features_subtitle': 'Просто, удобно и безопасно — как для личного общения, так и для работы над проектами',
            'security_title': 'Защищённые чаты',
            'security_desc': 'Сообщения шифруются и остаются только у участников',
            'topics_title': 'Темы и группы',
            'topics_desc': 'Общайтесь в открытых или приватных комнатах',
            'themes_title': 'Светлая и тёмная тема',
            'themes_desc': 'Подходит для любых условий и привычек',
            'adaptive_title': 'Адаптивность',
            'adaptive_desc': 'Работает в браузере, на десктопе и на телефоне',
            'files_title': 'Файлы и изображения',
            'files_desc': 'Делитесь файлами, фото, документами — прямо в чате'
        }
    };
    
    const t = translations[lang];
    if (t) {
        // Main section
        const mainTitle = document.querySelector('.main-title');
        const subtitle = document.querySelector('.subtitle');
        const languageSpan = document.querySelector('.language-selector span');
        
        if (mainTitle) mainTitle.textContent = t.title;
        if (subtitle) subtitle.textContent = t.subtitle;
        if (languageSpan) languageSpan.textContent = t.language;
        
        // Navigation
        const navLinks = document.querySelectorAll('.nav-link');
        if (navLinks.length >= 2) {
            navLinks[0].textContent = t.advantages;
            navLinks[1].textContent = t.faq;
        }
        
        // Features section
        const featuresTitle = document.querySelector('.features-title');
        const featuresBrand = document.querySelector('.features-brand');
        const featuresSubtitle = document.querySelector('.features-subtitle');
        
        if (featuresTitle) featuresTitle.textContent = t.features_title;
        if (featuresBrand) featuresBrand.textContent = t.features_brand;
        if (featuresSubtitle) featuresSubtitle.textContent = t.features_subtitle;
        
        // Feature items
        const featureItems = document.querySelectorAll('.feature-item');
        const featureTexts = [
            { title: t.security_title, desc: t.security_desc },
            { title: t.topics_title, desc: t.topics_desc },
            { title: t.themes_title, desc: t.themes_desc },
            { title: t.adaptive_title, desc: t.adaptive_desc },
            { title: t.files_title, desc: t.files_desc }
        ];
        
        featureItems.forEach((item, index) => {
            if (featureTexts[index]) {
                const title = item.querySelector('.feature-title');
                const desc = item.querySelector('.feature-description');
                
                if (title) title.textContent = featureTexts[index].title;
                if (desc) desc.textContent = featureTexts[index].desc;
            }
        });
    }
}

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

const optimizedScrollHandler = debounce(handleScroll, 10);

function setupFeatureHover() {
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transition = 'all 0.3s ease';
            item.style.transform = 'translateY(-5px)';
            item.style.boxShadow = '0 10px 30px rgba(27, 50, 184, 0.15)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = 'none';
        });
    });
}

function setupConnectionLines() {
    const connectionPaths = document.querySelectorAll('.connection-path');
    const featureItems = document.querySelectorAll('.feature-item');
    
    // Create glow effect for connection lines
    featureItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            // Activate connection lines related to this feature
            activateConnectionLines(index);
        });
        
        item.addEventListener('mouseleave', () => {
            // Deactivate all connection lines
            deactivateConnectionLines();
        });
    });
    
    // Add mouse tracking for dynamic glow effect
    const svg = document.querySelector('.connection-lines');
    if (svg) {
        svg.addEventListener('mousemove', handleMouseMove);
        svg.addEventListener('mouseleave', clearDynamicGlow);
    }
}

function activateConnectionLines(featureIndex) {
    const connectionPaths = document.querySelectorAll('.connection-path');
    
    // Define which paths are connected to which features
    const connectionMap = {
        0: [0, 2], // Security connects to first two paths
        1: [1, 3], // Topics connects to paths 1 and 3
        2: [2, 5], // Themes connects to paths 2 and 5
        3: [3, 6], // Adaptive connects to paths 3 and 6
        4: [4, 6]  // Files connects to paths 4 and 6
    };
    
    const activePaths = connectionMap[featureIndex] || [];
    
    connectionPaths.forEach((path, index) => {
        if (activePaths.includes(index)) {
            path.classList.add('active');
            path.style.stroke = '#4A90E2';
            path.style.strokeWidth = '3';
            path.style.filter = 'drop-shadow(0 0 8px rgba(74, 144, 226, 0.6))';
        }
    });
}

function deactivateConnectionLines() {
    const connectionPaths = document.querySelectorAll('.connection-path');
    connectionPaths.forEach(path => {
        path.classList.remove('active');
        path.style.stroke = '#C0C0C0';
        path.style.strokeWidth = '2';
        path.style.filter = 'none';
    });
}

function handleMouseMove(event) {
    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Create dynamic glow effect around cursor
    createDynamicGlow(x, y);
}

function createDynamicGlow(x, y) {
    const svg = document.querySelector('.connection-lines');
    if (!svg) return;
    
    // Remove existing dynamic glow
    const existingGlow = svg.querySelector('.dynamic-glow');
    if (existingGlow) {
        existingGlow.remove();
    }
    
    // Create new glow element
    const glowCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    glowCircle.setAttribute('class', 'dynamic-glow');
    glowCircle.setAttribute('cx', x);
    glowCircle.setAttribute('cy', y);
    glowCircle.setAttribute('r', '30');
    glowCircle.setAttribute('fill', 'none');
    glowCircle.setAttribute('stroke', '#4A90E2');
    glowCircle.setAttribute('stroke-width', '2');
    glowCircle.setAttribute('opacity', '0.7');
    glowCircle.style.filter = 'blur(3px)';
    glowCircle.style.pointerEvents = 'none';
    
    svg.appendChild(glowCircle);
    
    // Animate the glow
    glowCircle.style.animation = 'glowPulse 1s ease-out forwards';
}

function clearDynamicGlow() {
    const svg = document.querySelector('.connection-lines');
    if (svg) {
        const dynamicGlow = svg.querySelector('.dynamic-glow');
        if (dynamicGlow) {
            dynamicGlow.remove();
        }
    }
}

// Add CSS animation for glow effect
function addGlowAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glowPulse {
            0% {
                r: 10;
                opacity: 0.9;
            }
            50% {
                r: 25;
                opacity: 0.5;
            }
            100% {
                r: 40;
                opacity: 0;
            }
        }
        
        .connection-path {
            transition: all 0.3s ease;
        }
        
        .dynamic-glow {
            animation: glowPulse 1s ease-out forwards;
        }
    `;
    document.head.appendChild(style);
}

// Initialize glow animation styles
document.addEventListener('DOMContentLoaded', function() {
    addGlowAnimation();
});