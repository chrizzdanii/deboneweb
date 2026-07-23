document.addEventListener('DOMContentLoaded', function () {
  // ---- Mobile nav toggle ----
  var burger = document.querySelector('.hamburger');
  var nav = document.querySelector('.main-nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      burger.textContent = isOpen ? '✕' : '☰';
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.classList.toggle('nav-open', isOpen);
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        burger.textContent = '☰';
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      });
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 960 && nav.classList.contains('open')) {
        nav.classList.remove('open');
        burger.textContent = '☰';
        document.body.classList.remove('nav-open');
      }
    });
  }

  // ---- Theme toggle (default dark) ----
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var html = document.documentElement;
      var isLight = html.getAttribute('data-theme') === 'light';
      if (isLight) {
        html.removeAttribute('data-theme');
        themeToggle.textContent = '☀️';
        themeToggle.setAttribute('aria-label', 'Switch to light theme');
      } else {
        html.setAttribute('data-theme', 'light');
        themeToggle.textContent = '🌙';
        themeToggle.setAttribute('aria-label', 'Switch to dark theme');
      }
    });
  }

  // ---- Contact form ----
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('cf-name').value.trim();
      var phone = document.getElementById('cf-phone').value.trim();
      var service = document.getElementById('cf-service').value;
      var message = document.getElementById('cf-message').value.trim();
      var text = `Hello Debone Studio, my name is ${name}.%0APhone: ${phone}%0AService interested in: ${service}%0AMessage: ${message}`;
      window.open(`https://wa.me/2348035988889?text=${text}`, '_blank');
    });
  }

  // ---- Homepage hero slideshow ----
  var heroSlider = document.getElementById('heroSlider');
  if (heroSlider) {
    var slides = heroSlider.querySelectorAll('.hero-slide');
    var dots = document.querySelectorAll('#heroDots button');
    var current = 0;
    var timer = null;

    function show(i) {
      current = (i + slides.length) % slides.length;
      slides.forEach(function (s, idx) { s.classList.toggle('active', idx === current); });
      dots.forEach(function (d, idx) { d.classList.toggle('active', idx === current); });
    }
    function restart() { clearInterval(timer); timer = setInterval(function () { show(current + 1); }, 5000); }

    document.getElementById('heroPrev').addEventListener('click', function () { show(current - 1); restart(); });
    document.getElementById('heroNext').addEventListener('click', function () { show(current + 1); restart(); });
    dots.forEach(function (d, idx) { d.addEventListener('click', function () { show(idx); restart(); }); });

    restart();
  }
});
