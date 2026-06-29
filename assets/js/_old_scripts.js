// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('show');
    });
  });
}

// Navbar scroll effect
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }
});

// Reveal on scroll
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Smooth scroll helper
function scrollToContact() {
  const contact = document.getElementById('contact');
  if (contact) {
    contact.scrollIntoView({ behavior: 'smooth' });
  }
}

function scrollToWork() {
  const work = document.getElementById('work');
  if (work) {
    work.scrollIntoView({ behavior: 'smooth' });
  }
}

// Contact form mailto handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const res = await fetch('https://formspree.io/f/xgopbgop', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: document.getElementById('name')?.value.trim(),
          email: document.getElementById('email')?.value.trim(),
          business: document.getElementById('business')?.value.trim(),
          message: document.getElementById('message')?.value.trim()
        })
      });

      if (res.ok) {
        contactForm.innerHTML = '<div style="text-align:center;padding:40px 0"><h3 style="color:var(--green);margin-bottom:12px">Message Sent ✓</h3><p style="color:var(--text-dim)">Thanks! I\'ll get back to you shortly.</p></div>';
      } else {
        throw new Error('Send failed');
      }
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      alert('Something went wrong. Please try again or email lmlabs.dev@gmail.com directly.');
    }
  });
}