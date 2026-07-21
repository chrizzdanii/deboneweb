// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var burger = document.querySelector('.hamburger');
  var nav = document.querySelector('.main-nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
      burger.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
  }

  // Contact form: build a WhatsApp/email friendly message (no backend)
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('cf-name').value.trim();
      var phone = document.getElementById('cf-phone').value.trim();
      var service = document.getElementById('cf-service').value;
      var message = document.getElementById('cf-message').value.trim();

      var text = `Hello Debone Studio, my name is ${name}.%0APhone: ${phone}%0AService interested in: ${service}%0AMessage: ${message}`;
      var waUrl = `https://wa.me/2348035988889?text=${text}`;
      window.open(waUrl, '_blank');
    });
  }
});
