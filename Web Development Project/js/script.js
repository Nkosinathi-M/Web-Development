/**
 * script.js — Nkosinathi Mahlangu Portfolio
 *
 * Features:
 *   1. Sticky navbar — adds .scrolled class on scroll
 *   2. Active nav link tracking via IntersectionObserver
 *   3. Mobile hamburger menu toggle
 *   4. Close mobile menu when a nav link is clicked
 *   5. Contact form — client-side validation + Formspree fetch submission
 *   6. Footer year auto-update
 *   7. Skill bar animation on scroll (IntersectionObserver)
 */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. STICKY NAVBAR
     ---------------------------------------------------------- */
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });


  /* ----------------------------------------------------------
     2. ACTIVE NAV LINK (IntersectionObserver)
     ---------------------------------------------------------- */
  const navLinks = document.querySelectorAll('.navbar__link');
  const sections = document.querySelectorAll('section[id], div[id="home"]');

  // Map section id → nav link
  const linkMap = {};
  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      linkMap[href.slice(1)] = link;
    }
  });

  function setActiveLink(id) {
    navLinks.forEach(function (l) { l.classList.remove('active'); });
    if (linkMap[id]) {
      linkMap[id].classList.add('active');
    }
  }

  const observerOptions = {
    root: null,
    // Trigger when the section occupies 25% of the viewport
    threshold: 0.25,
    // Offset top by navbar height so sections trigger a bit earlier
    rootMargin: '-' + (navbar ? navbar.offsetHeight : 70) + 'px 0px 0px 0px',
  };

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach(function (sec) { sectionObserver.observe(sec); });


  /* ----------------------------------------------------------
     3. MOBILE HAMBURGER MENU TOGGLE
     ---------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen.toString());
    });
  }


  /* ----------------------------------------------------------
     4. CLOSE MOBILE MENU ON LINK CLICK
     ---------------------------------------------------------- */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });


  /* ----------------------------------------------------------
     5. CONTACT FORM — Formspree via fetch
        Validates client-side first, then POSTs to Formspree.
        No page redirect — success/error messages shown inline.

        Setup: replace YOUR_FORM_ID in the form's action attribute
        in index.html with the 8-character ID from your Formspree
        dashboard at https://formspree.io/forms
     ---------------------------------------------------------- */
  const contactForm  = document.getElementById('contactForm');
  const nameInput    = document.getElementById('contactName');
  const emailInput   = document.getElementById('contactEmail');
  const messageInput = document.getElementById('contactMessage');
  const nameError    = document.getElementById('nameError');
  const emailError   = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const formNote     = document.getElementById('formNote');
  const submitBtn    = document.getElementById('submitBtn');
  const submitBtnText = document.getElementById('submitBtnText');

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function clearErrors() {
    [nameError, emailError, messageError].forEach(function (el) {
      if (el) el.textContent = '';
    });
    [nameInput, emailInput, messageInput].forEach(function (el) {
      if (el) el.classList.remove('invalid');
    });
    if (formNote) {
      formNote.textContent = '';
      formNote.className = 'form-note';
    }
  }

  function validateForm() {
    var valid = true;

    if (nameInput && nameInput.value.trim().length < 2) {
      nameError.textContent = 'Please enter your name (at least 2 characters).';
      nameInput.classList.add('invalid');
      valid = false;
    }

    if (emailInput && !isValidEmail(emailInput.value)) {
      emailError.textContent = 'Please enter a valid email address.';
      emailInput.classList.add('invalid');
      valid = false;
    }

    if (messageInput && messageInput.value.trim().length < 10) {
      messageError.textContent = 'Message must be at least 10 characters.';
      messageInput.classList.add('invalid');
      valid = false;
    }

    return valid;
  }

  function setSubmitting(isSubmitting) {
    if (!submitBtn || !submitBtnText) return;
    submitBtn.disabled = isSubmitting;
    submitBtnText.textContent = isSubmitting ? 'Sending…' : 'Send Message';
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();

      if (!validateForm()) return;

      var formData = new FormData(contactForm);
      var endpoint = contactForm.getAttribute('action');

      // Guard: if the placeholder ID hasn't been replaced yet, warn in dev
      if (!endpoint || endpoint.includes('YOUR_FORM_ID')) {
        formNote.textContent = 'Form not yet connected — replace YOUR_FORM_ID in the form action with your Formspree endpoint.';
        formNote.classList.add('error');
        return;
      }

      setSubmitting(true);
      formNote.textContent = 'Sending your message…';
      formNote.classList.add('sending');

      fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          setSubmitting(false);
          formNote.className = 'form-note';

          if (response.ok) {
            formNote.textContent = 'Message sent! I\'ll get back to you soon.';
            formNote.classList.add('success');
            contactForm.reset();
          } else {
            // Formspree returns JSON with errors on 4xx
            return response.json().then(function (data) {
              var msg = (data.errors && data.errors.map(function (err) {
                return err.message;
              }).join(', ')) || 'Something went wrong. Please try again.';
              formNote.textContent = msg;
              formNote.classList.add('error');
            });
          }
        })
        .catch(function () {
          setSubmitting(false);
          formNote.className = 'form-note error';
          formNote.textContent = 'Network error — please check your connection and try again.';
        });
    });

    // Clear field-level errors as the user types
    [nameInput, emailInput, messageInput].forEach(function (input) {
      if (input) {
        input.addEventListener('input', function () {
          input.classList.remove('invalid');
        });
      }
    });
  }


  /* ----------------------------------------------------------
     6. FOOTER YEAR
     ---------------------------------------------------------- */
  var yearEl = document.getElementById('footerYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  /* ----------------------------------------------------------
     7. SKILL BAR ANIMATION ON SCROLL
        The CSS custom property --fill is set inline in HTML.
        On page load the bars start at 0 width; once the skills
        section enters the viewport we add .animate to trigger
        the CSS transition.
     ---------------------------------------------------------- */
  var skillFills = document.querySelectorAll('.skill-item__fill');

  if (skillFills.length > 0) {
    // Store target widths, then reset to 0 so the animation is visible
    skillFills.forEach(function (bar) {
      bar.dataset.target = bar.style.getPropertyValue('--fill');
      bar.style.setProperty('--fill', '0%');
    });

    var skillsSection = document.getElementById('skills');

    if (skillsSection && 'IntersectionObserver' in window) {
      var skillObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            skillFills.forEach(function (bar) {
              bar.style.setProperty('--fill', bar.dataset.target);
            });
            skillObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      skillObserver.observe(skillsSection);
    } else {
      // Fallback — just show the bars immediately
      skillFills.forEach(function (bar) {
        bar.style.setProperty('--fill', bar.dataset.target);
      });
    }
  }

})();
