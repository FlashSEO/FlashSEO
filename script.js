// FlashSEO Rank — shared interactions

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Header scroll state ---- */
  const header = document.querySelector('.site-header');
  const toTop = document.querySelector('.to-top');
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 30);
    if (toTop) toTop.classList.toggle('is-visible', y > 500);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toTop){
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---- Mobile nav ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navScrim = document.querySelector('.nav-scrim');

  const closeNav = () => {
    navLinks && navLinks.classList.remove('is-open');
    navScrim && navScrim.classList.remove('is-open');
    navToggle && navToggle.setAttribute('aria-expanded', 'false');
  };
  const openNav = () => {
    navLinks && navLinks.classList.add('is-open');
    navScrim && navScrim.classList.add('is-open');
    navToggle && navToggle.setAttribute('aria-expanded', 'true');
  };
  if (navToggle){
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('is-open');
      isOpen ? closeNav() : openNav();
    });
  }
  navScrim && navScrim.addEventListener('click', closeNav);
  navLinks && navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

  /* ---- Active nav link ---- */
  const current = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if (a.dataset.page === current) a.classList.add('active');
  });

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---- Contact form: builds a WhatsApp / email handoff, no backend ---- */
  const form = document.querySelector('#contact-form');
  if (form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const service = form.service.value;
      const message = form.message.value.trim();
      const contactMethod = form.querySelector('input[name="method"]:checked').value;

      const text = `Hi FlashSEO Rank, I'm ${name}. I'm interested in: ${service}. ${message}`;
      const encoded = encodeURIComponent(text);

      const successEl = document.querySelector('.form-success');

      if (contactMethod === 'whatsapp'){
        window.open(`https://wa.me/923143092333?text=${encoded}`, '_blank');
      } else if (contactMethod === 'telegram'){
        window.open(`https://t.me/FlashSEORank?text=${encoded}`, '_blank');
      } else {
        window.location.href = `mailto:Flashseo9@gmail.com?subject=${encodeURIComponent('New enquiry from ' + name)}&body=${encoded}`;
      }

      if (successEl){
        successEl.classList.add('is-shown');
        successEl.textContent = "Opening " + (contactMethod === 'whatsapp' ? 'WhatsApp' : contactMethod === 'telegram' ? 'Telegram' : 'your email app') + " with your message ready to send.";
      }
    });
  }

});
