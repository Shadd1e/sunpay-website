// ============================================================
// SUNPAY — Homepage interactions
// ============================================================

const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

burger?.addEventListener('click', () => mobileMenu?.classList.toggle('open'));
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

const revealEls = document.querySelectorAll('.reveal');
if (reduceMotion) {
  revealEls.forEach(el => el.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));
}

// Subtle editorial parallax for the staged product preview.
const heroStage = document.getElementById('heroStage');
if (heroStage && !reduceMotion && window.matchMedia('(pointer:fine)').matches) {
  heroStage.addEventListener('pointermove', (event) => {
    const rect = heroStage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroStage.style.setProperty('--px', `${x * 8}px`);
    heroStage.style.setProperty('--py', `${y * 8}px`);
    heroStage.style.transform = `translate(${x * 5}px, ${y * 3}px)`;
  });
  heroStage.addEventListener('pointerleave', () => {
    heroStage.style.transform = '';
  });
}

// Active nav state for in-page sections.
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
const setActiveNav = () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 140) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};
window.addEventListener('scroll', setActiveNav, { passive: true });
setActiveNav();

// Theme preference.
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('sunpay_theme') || 'dark';
if (savedTheme === 'light') document.body.classList.add('light');
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('sunpay_theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

// Merchant early-access form (used on merchant.html).
const merchantForm = document.getElementById('merchantForm');
if (merchantForm) {
  merchantForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const btn = merchantForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    const data = Object.fromEntries(new FormData(merchantForm));
    try {
      const response = await fetch(merchantForm.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Request failed');
      merchantForm.innerHTML = `<div class="form-success"><div class="form-success__icon">✓</div><h3>You're on the list!</h3><p>We'll email you at ${data.email || 'your inbox'} when merchant sign-up opens.</p></div>`;
    } catch {
      btn.textContent = original;
      btn.disabled = false;
      let error = merchantForm.querySelector('.form-error');
      if (!error) {
        error = document.createElement('p');
        error.className = 'form-error';
        error.style.cssText = 'color:#ff8b84;font-size:13px;margin-top:12px;text-align:center;';
        merchantForm.appendChild(error);
      }
      error.textContent = 'Something went wrong. Please try again or email us at sunpayngltd@gmail.com';
    }
  });
}
