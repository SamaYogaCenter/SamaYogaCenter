// Navigation functionality - Mobile menu toggle and scroll behavior

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const header = document.getElementById('header');

  if (menuToggle && nav) {
    // Set nav top to match actual header height (eliminates white-line gap)
    function updateNavTop() {
      nav.style.top = header.offsetHeight + 'px';
    }
    updateNavTop();
    window.addEventListener('resize', updateNavTop);

    menuToggle.addEventListener('click', function() {
      // Toggle menu open state
      updateNavTop();
      nav.classList.toggle('nav--open');
      menuToggle.classList.toggle('menu-toggle--active');

      // Update ARIA attribute for accessibility
      const isOpen = nav.classList.contains('nav--open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a link (mobile) — but NOT dropdown toggles
    const navLinks = nav.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          // Skip closing for dropdown parent items so submenu stays open
          if (this.classList.contains('nav__link--dropdown')) return;
          nav.classList.remove('nav--open');
          menuToggle.classList.remove('menu-toggle--active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close menu when clicking outside (mobile)
    document.addEventListener('click', function(event) {
      if (window.innerWidth <= 768) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);

        if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('nav--open')) {
          nav.classList.remove('nav--open');
          menuToggle.classList.remove('menu-toggle--active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  // Header scroll behavior - add shadow when scrolled and make it fixed
  let lastScroll = 0;
  const headerHeight = header.offsetHeight;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > headerHeight) {
      header.classList.add('header--scrolled');
      // Add padding to body to prevent jump when header becomes fixed
      document.body.style.paddingTop = headerHeight + 'px';
    } else {
      header.classList.remove('header--scrolled');
      document.body.style.paddingTop = '0';
    }

    lastScroll = currentScroll;
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Skip if it's just "#" (for placeholder links)
      if (href === '#') {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Mobile dropdown toggle
  const dropdownToggles = document.querySelectorAll('.nav__link--dropdown');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parentItem = this.closest('.nav__item--has-dropdown');

        // Toggle this dropdown
        parentItem.classList.toggle('nav__item--open');

        // Close other dropdowns
        document.querySelectorAll('.nav__item--has-dropdown').forEach(item => {
          if (item !== parentItem) {
            item.classList.remove('nav__item--open');
          }
        });
      }
    });
  });

  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav__link:not(.nav__link--dropdown)');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');

    link.classList.remove('nav__link--active');

    if (linkPage === currentPage ||
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === '/' && linkPage === 'index.html')) {
      link.classList.add('nav__link--active');
    }
  });

  // Also highlight parent dropdown if child link is active
  const dropdownLinks = document.querySelectorAll('.nav__dropdown-link');
  dropdownLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      const parentItem = link.closest('.nav__item--has-dropdown');
      if (parentItem) {
        parentItem.querySelector('.nav__link--dropdown').classList.add('nav__link--active');
      }
    }
  });

  // Footer newsletter form — AJAX submit with inline Thank you! (no redirect)
  const newsletterForm = document.querySelector('.footer__newsletter');
  if (newsletterForm) {
    // Use capture:true so this fires before any other handler
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      e.stopPropagation();

      const fields = newsletterForm.querySelector('.footer__newsletter-fields');
      const btn = newsletterForm.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = '...'; }

      // Build form payload manually so fetch sends as POST to Netlify
      const payload = new URLSearchParams({
        'form-name': 'newsletter',
        'name': (newsletterForm.querySelector('input[name="name"]') || {}).value || '',
        'email': (newsletterForm.querySelector('input[name="email"]') || {}).value || ''
      });

      fetch(window.location.pathname, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString()
      })
      .then(function() {
        if (fields) fields.style.display = 'none';
        if (btn) btn.style.display = 'none';
        const thanks = document.createElement('span');
        thanks.textContent = 'Thank you!';
        thanks.style.cssText = 'font-size: 0.875rem; color: var(--color-text-primary); padding: 6px 4px; display: inline-block;';
        newsletterForm.appendChild(thanks);
      })
      .catch(function() {
        if (btn) { btn.textContent = '↺ Try again'; btn.disabled = false; }
      });

      return false;
    }, true); // capture phase
  }
});
