// Translations
const translations = {
    en: {
        nav: {
            about: "About",
            research: "Research",
            education: "Education",
            publications: "Publications",
            contact: "Contact"
        },
        hero: {
            subtitle: "PhD Candidate in Nanoengineering at UC San Diego",
            focus: "Specializing in Atomistic Simulations of Polymer Systems"
        },
        about: {
            title: "About Me",
            content: "I am a PhD candidate in the Nanoengineering program at UC San Diego, co-advised by Prof. Tod Pascal and Prof. Darren Lipomi. My research focuses on atomistic simulations of polymer systems, polymer-bio interfaces, and organic molecular systems. I use simulations as a computational microscope to understand nanoscale phenomena and explore high-throughput materials design.",
            researchFocus: "Research Focus",
            researchDesc: "Molecular simulations of sustainable polymers, semiconducting polymers, engineered living materials, nanoparticle-ligand dynamics",
            intlExp: "International Experience",
            intlDesc: "Studied at Fudan University, Shanghai (2017) | Mandarin Speaker"
        },
        research: {
            title: "Research",
            currentProjects: "Current Projects",
            expertise: "Areas of Expertise",
            skills: "Technical Skills"
        },
        education: {
            title: "Education",
            phd: "PhD in Nanoengineering",
            ms: "M.S. in Nanoengineering",
            bs: "B.S. in Nanoengineering & B.A. in Chinese Studies"
        },
        publications: {
            title: "Publications",
            viewOn: "View complete publication list on",
            upcoming: "Upcoming",
            inPrep: "In preparation"
        },
        contact: {
            title: "Contact",
            intro: "For research collaborations or inquiries, please reach out:"
        }
    },
    zh: {
        nav: {
            about: "关于",
            research: "研究",
            education: "教育",
            publications: "出版物",
            contact: "联系"
        },
        hero: {
            subtitle: "加州大学圣地亚哥分校纳米工程博士生",
            focus: "专注于高分子系统的原子模拟"
        },
        about: {
            title: "关于我",
            content: "我是加州大学圣地亚哥分校纳米工程专业的博士生，由Tod Pascal教授和Darren Lipomi教授共同指导。我的研究重点是高分子系统的原子模拟、高分子-生物界面和有机分子系统。我使用模拟作为计算显微镜来理解纳米尺度现象并探索高通量材料设计。",
            researchFocus: "研究重点",
            researchDesc: "可持续高分子、半导体高分子、工程活体材料、纳米粒子配体动力学的分子模拟",
            intlExp: "国际经验",
            intlDesc: "复旦大学学习经历（2017年）| 中文熟练"
        },
        research: {
            title: "研究",
            currentProjects: "当前项目",
            expertise: "专业领域",
            skills: "技术技能"
        },
        education: {
            title: "教育背景",
            phd: "纳米工程博士",
            ms: "纳米工程硕士",
            bs: "纳米工程理学学士 & 中国研究文学学士"
        },
        publications: {
            title: "出版物",
            viewOn: "在以下网站查看完整出版物列表",
            upcoming: "即将发表",
            inPrep: "准备中"
        },
        contact: {
            title: "联系方式",
            intro: "如需研究合作或咨询，请联系："
        }
    }
};

// Language switching functionality
const initLanguageSwitch = () => {
    const currentLang = localStorage.getItem('language') || 'en';
    document.documentElement.lang = currentLang;
    updateContent(currentLang);
    const button = document.querySelector('.lang-toggle .lang-text');
    button.textContent = currentLang === 'en' ? '中' : 'ENG';
};

const updateContent = (lang) => {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.dataset.translate;
        const keys = key.split('.');
        let translation = translations[lang];
        keys.forEach(k => translation = translation[k]);
        if (translation) {
            element.textContent = translation;
        }
    });
    localStorage.setItem('language', lang);
};

const toggleLanguage = () => {
    const currentLang = document.documentElement.lang;
    const newLang = currentLang === 'en' ? 'zh' : 'en';
    const button = document.querySelector('.lang-toggle .lang-text');
    button.textContent = newLang === 'en' ? '中' : 'ENG';
    document.documentElement.lang = newLang;
    updateContent(newLang);
};

// Background Slideshow
const initSlideshow = () => {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
// Handle nav bar visibility on scroll
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const navHeight = nav.offsetHeight;

    // At the very top of the page
    if (currentScroll <= navHeight) {
        nav.classList.remove('floating');
        nav.classList.remove('hidden');
        return;
    }

    // Scrolling down
    if (currentScroll > lastScroll && currentScroll > navHeight) {
        nav.classList.add('hidden');
        nav.classList.remove('floating');
    }
    // Scrolling up
    else if (currentScroll < lastScroll) {
        nav.classList.remove('hidden');
        nav.classList.add('floating');
    }

    lastScroll = currentScroll;
});

    const showSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    // Show first slide
    showSlide(0);

    // Rotate slides every 5 seconds
    setInterval(nextSlide, 5000);
};

// Initialize slideshow and language switch when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSlideshow();
    initLanguageSwitch();
    
    // Add language toggle event listener
    document.querySelector('.lang-toggle').addEventListener('click', toggleLanguage);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// Responsive navigation menu
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    const navContent = document.querySelector('.nav-content');
    
    // Create hamburger menu button
    const menuButton = document.createElement('button');
    menuButton.className = 'menu-toggle';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Add button to nav
    navContent.insertBefore(menuButton, document.querySelector('.nav-links'));
    
    // Style for mobile menu
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .menu-toggle {
                position: absolute;
                right: 1rem;
                top: 1rem;
                display: block !important;
                background: none;
                border: none;
                color: var(--primary-color);
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.3rem;
                z-index: 1001;
            }
            
            .nav-links {
                display: none;
                width: 100%;
            }
            
            .nav-links.active {
                display: flex;
            }

            .logo {
                padding: 0.5rem 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Toggle menu
    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        nav.classList.toggle('menu-open');
        menuButton.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    };

    menuButton.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            toggleMenu();
        }
    });

    // Hide menu on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });
};

// Initialize mobile menu
createMobileMenu();

// Add scroll animation to sections
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
};

// Add CSS for animations
const addAnimationStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
};

// Initialize animations
addAnimationStyles();
observeElements();