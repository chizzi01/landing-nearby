/* ─────────────────────────────────────────
   NEARBY LANDING — script.js
───────────────────────────────────────── */

// ─── NAV SCROLL ───
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ─── SCROLL REVEAL (custom AOS) ───
const aosEls = document.querySelectorAll('[data-aos]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

aosEls.forEach(el => observer.observe(el));

// ─── Also animate step cards ───
document.querySelectorAll('.step, .testimonial-card, .feature-row').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.08}s`;
  observer.observe(el);
  if (!el.hasAttribute('data-aos')) {
    el.setAttribute('data-aos', 'fade-up');
  }
});

// ─── SMOOTH ANCHOR SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── HERO PHONE CAROUSEL ───
// Auto-cycle between the three screenshot images
const screens = [
  'images/screen-radar.jpg',
  'images/screen-profile.jpg',
  'images/screen-matches.jpg',
  'images/screen-likes.jpg'
];
let currentScreen = 0;
const heroImg = document.getElementById('heroImg');

if (heroImg) {
  setInterval(() => {
    heroImg.style.opacity = '0';
    heroImg.style.transform = 'scale(0.96)';
    setTimeout(() => {
      currentScreen = (currentScreen + 1) % screens.length;
      heroImg.src = screens[currentScreen];
      heroImg.style.opacity = '1';
      heroImg.style.transform = 'scale(1)';
    }, 400);
  }, 3500);

  heroImg.style.transition = 'opacity .4s ease, transform .4s ease';
}

// ─── FLOATING CARDS ENTRANCE ───
setTimeout(() => {
  document.querySelectorAll('.floating-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity .6s ease ${i * 0.4 + 0.8}s, transform .6s ease ${i * 0.4 + 0.8}s`;
    requestAnimationFrame(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  });
}, 100);

// ─── COUNTER ANIMATION ───
function animateCounter(el, target, suffix = '') {
  const duration = 1500;
  const start = performance.now();
  const update = now => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (t < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// Observe stat numbers for counter animation
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent.trim();
      if (text.endsWith('km')) animateCounter(el, 1, 'km');
      else if (text.endsWith('%')) animateCounter(el, 100, '%');
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => statObserver.observe(el));
