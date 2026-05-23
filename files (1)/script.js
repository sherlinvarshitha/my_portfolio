/* =============================================
   PORTFOLIO — script.js
   Author : Bollam Sherlin Varshitha
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────
     1. Initialise Lucide icons
  ────────────────────────────────────────── */
  if (window.lucide) {
    lucide.createIcons();
  }

  /* ──────────────────────────────────────────
     2. Navbar: scroll shadow + active link
  ────────────────────────────────────────── */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  const sections = document.querySelectorAll('section[id]');

  function updateNavbar() {
    // Add shadow when scrolled
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlight active section link
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  /* ──────────────────────────────────────────
     3. Hamburger / mobile menu toggle
  ────────────────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  /* ──────────────────────────────────────────
     4. Scroll-reveal (IntersectionObserver)
  ────────────────────────────────────────── */
  const revealItems = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Stagger cards inside grids
        const delay = entry.target.closest('.projects-grid, .certs-grid, .about-stats, .skills-grid')
          ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100
          : 0;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(el => revealObserver.observe(el));

  /* ──────────────────────────────────────────
     5. Animate skill bars when they enter view
  ────────────────────────────────────────── */
  const skillFills = document.querySelectorAll('.fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(bar => barObserver.observe(bar));

  /* ──────────────────────────────────────────
     6. Smooth-scroll for all anchor links
  ────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 70; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ──────────────────────────────────────────
     7. Project card hover — glow effect
  ────────────────────────────────────────── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect  = card.getBoundingClientRect();
      const x     = e.clientX - rect.left;
      const y     = e.clientY - rect.top;
      const cx    = rect.width  / 2;
      const cy    = rect.height / 2;
      const rotX  = ((y - cy) / cy) * 5;
      const rotY  = ((x - cx) / cx) * -5;
      card.style.transform = `translateY(-8px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ──────────────────────────────────────────
     8. Typing effect in hero eyebrow
  ────────────────────────────────────────── */
  const roles = [
    'AI Developer & Full-Stack Engineer',
    'Machine Learning Enthusiast',
    /*'Cloud & DevOps Learner', */
    'Open Source Contributor'
  ];
  const roleEl = document.querySelector('.hero-role');
  if (roleEl) {
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function type() {
      const current = roles[roleIdx];
      if (isDeleting) {
        roleEl.textContent = current.slice(0, charIdx - 1);
        charIdx--;
      } else {
        roleEl.textContent = current.slice(0, charIdx + 1);
        charIdx++;
      }

      let delay = isDeleting ? 50 : 80;

      if (!isDeleting && charIdx === current.length) {
        delay = 1800;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        delay = 400;
      }
      setTimeout(type, delay);
    }

    // Start typing after hero animation completes
    setTimeout(type, 1400);
  }

  /* ──────────────────────────────────────────
     9. Stat counter animation
  ────────────────────────────────────────── */
  const statNums = document.querySelectorAll('.stat-num');

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el      = entry.target;
        const target  = parseFloat(el.textContent);
        const isFloat = el.textContent.includes('.');
        const suffix  = el.textContent.replace(/[\d.]/g, '');
        let start     = 0;
        const dur     = 1500;
        const step    = 16;
        const steps   = dur / step;
        const inc     = target / steps;

        const timer = setInterval(() => {
          start += inc;
          if (start >= target) {
            start = target;
            clearInterval(timer);
          }
          el.textContent = (isFloat ? start.toFixed(2) : Math.floor(start)) + suffix;
        }, step);

        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => statObserver.observe(el));

  /* ──────────────────────────────────────────
     10. Cursor glow effect (desktop only)
  ────────────────────────────────────────── */
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      width: 300px; height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(200,245,66,0.04) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
      transform: translate(-50%, -50%);
      transition: left 0.12s ease, top 0.12s ease;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    });
  }

});
