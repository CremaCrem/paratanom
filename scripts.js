// ============================================================
// PARATANOM - Website Scripts
// ============================================================

// Utility: detect touch/mobile device
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

// ===== AOS Initialization =====
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 30,
  disable: false,
});

// ===== Typed.js Subtitle =====
document.addEventListener('DOMContentLoaded', () => {
  new Typed('#typed-subtitle', {
    strings: [
      'AN AUGMENTED REALITY 2D FARMING GAME',
      'FOR AGRICULTURAL EDUCATION',
      'LEARN ABOUT PARTIDO\'S CROPS',
      'SCAN, COLLECT, FARM, PROGRESS!',
    ],
    typeSpeed: 40,
    backSpeed: 20,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: '_',
  });
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-md');
    navbar.classList.remove('bg-white/0');
  } else {
    navbar.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-md');
    navbar.classList.add('bg-white/0');
  }
}, { passive: true });

// ===== Mobile Menu =====
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileOverlay = document.getElementById('mobile-overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function openMobileMenu() {
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', openMobileMenu);
mobileMenuClose.addEventListener('click', closeMobileMenu);
mobileOverlay.addEventListener('click', closeMobileMenu);

mobileNavLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// ===== Back to Top Button =====
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.remove('opacity-0', 'pointer-events-none');
    backToTop.classList.add('opacity-100');
  } else {
    backToTop.classList.add('opacity-0', 'pointer-events-none');
    backToTop.classList.remove('opacity-100');
  }
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Counter Animation =====
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseFloat(counter.getAttribute('data-target'));
      const isDecimal = counter.hasAttribute('data-decimal');
      const duration = 2000;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = target * easeProgress;

        counter.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }

      requestAnimationFrame(updateCounter);
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.3 });

counters.forEach(counter => counterObserver.observe(counter));

// ===== Progress Bar Animation =====
const progressBars = document.querySelectorAll('.progress-bar');
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const targetWidth = bar.getAttribute('data-width');
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 300);
      progressObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

progressBars.forEach(bar => progressObserver.observe(bar));

// ===== GSAP Scroll Animations =====
gsap.registerPlugin(ScrollTrigger);

// Parallax effect on hero floating elements
gsap.to('#hero .absolute div', {
  yPercent: -30,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
  },
});

// Stagger feature cards on scroll
gsap.utils.toArray('.feature-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    delay: i * 0.1,
  });
});

// ===== Tilt Effect on Feature Cards (desktop only) =====
if (!isTouchDevice) {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// ===== Active Nav Link Highlighting =====
const sections = document.querySelectorAll('section[id]');
const desktopNavLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  desktopNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}, { passive: true });

// ===== Floating Leaf Particles =====
// FIX: Use position:fixed so leaves don't extend document height
function createLeaf() {
  const leaf = document.createElement('div');
  leaf.classList.add('floating-leaf');
  const icons = ['\u{1F33F}', '\u{1F340}', '\u{1F331}', '\u{1F342}'];
  leaf.textContent = icons[Math.floor(Math.random() * icons.length)];
  leaf.style.left = Math.random() * 100 + 'vw';
  leaf.style.fontSize = (Math.random() * 16 + 12) + 'px';
  leaf.style.animationDuration = (Math.random() * 10 + 12) + 's';
  document.body.appendChild(leaf);

  setTimeout(() => {
    if (leaf.parentNode) leaf.remove();
  }, 22000);
}

// Reduce frequency on mobile for performance
const leafInterval = isTouchDevice ? 5000 : 3000;
setInterval(createLeaf, leafInterval);

// ===== Canvas Particle System =====
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.15 + 0.02;
    const colors = ['234,118,5', '70,166,17', '0,74,173'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
  }
}

// Fewer particles on mobile for performance
const particleCount = isTouchDevice ? 30 : 60;
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

const connectionDistance = isTouchDevice ? 100 : 150;

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  // Draw connections (skip on mobile for perf)
  if (!isTouchDevice) {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 74, 173, ${0.03 * (1 - distance / connectionDistance)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  requestAnimationFrame(animateParticles);
}

animateParticles();

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== Cursor Trail Effect (desktop only) =====
if (!isTouchDevice) {
  let trail = [];
  const trailLength = 8;

  document.addEventListener('mousemove', (e) => {
    trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    if (trail.length > trailLength) trail.shift();
  });

  function drawTrail() {
    const now = Date.now();
    trail = trail.filter(p => now - p.time < 300);

    trail.forEach((point, i) => {
      const age = (now - point.time) / 300;
      const existing = document.querySelector(`.trail-dot-${i}`);
      if (existing) existing.remove();

      const dot = document.createElement('div');
      dot.className = `trail-dot-${i}`;
      dot.style.cssText = `
        position: fixed;
        left: ${point.x}px;
        top: ${point.y}px;
        width: ${4 * (1 - age)}px;
        height: ${4 * (1 - age)}px;
        background: rgba(234, 118, 5, ${0.3 * (1 - age)});
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
      `;
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 100);
    });

    requestAnimationFrame(drawTrail);
  }

  drawTrail();
}

// ===== Gallery Image Click Feedback =====
document.querySelectorAll('.gallery-placeholder').forEach(item => {
  item.addEventListener('click', () => {
    item.style.transform = 'scale(0.95)';
    setTimeout(() => {
      item.style.transform = '';
    }, 200);
  });
});

// ===== Easter Egg: Konami Code =====
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.keyCode);
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
    document.body.style.transition = 'filter 0.5s';
    document.body.style.filter = 'hue-rotate(90deg)';
    setTimeout(() => {
      document.body.style.filter = '';
    }, 3000);
    konamiCode = [];
  }
});
