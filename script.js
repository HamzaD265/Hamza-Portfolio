const words = ["Web Developer|" , "Python Developer|"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 150;
const erasingSpeed = 100;
const delayBetweenWords = 2000;

function typeEffect() {
    const targetSpan = document.querySelector(".hero-text h1 span");
    if (!targetSpan) return;

    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        targetSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        targetSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let currentSpeed = typingSpeed;
    if (isDeleting) currentSpeed = erasingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
        currentSpeed = delayBetweenWords;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        currentSpeed = 500;
    }

    setTimeout(typeEffect, currentSpeed);
}

// 2. Mobile Menu Toggle (Fixed Code)
document.addEventListener("DOMContentLoaded", () => {
    // تشغيل تأثير الكتابة
    const targetSpan = document.querySelector(".hero-text h1 span");
    if(targetSpan) targetSpan.textContent = "";
    setTimeout(typeEffect, 500);

    // تشغيل قائمة الموبايل بأمان
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // إغلاق القائمة عند الضغط على أي رابط بداخلها
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
});
// ==========================================
// 4. ميزة تتبع الأقسام وتغيير لون الرابط النشط بدقة (للكمبيوتر والموبايل)
// ==========================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section, header');
    const navLi = document.querySelectorAll('.nav-links a');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    if (window.pageYOffset < 100) {
        current = 'hero';
    }

    navLi.forEach(a => {
        a.classList.remove('active');
        const href = a.getAttribute('href');
        if (href && href.includes(current)) {
            a.classList.add('active');
        }
    });
});
