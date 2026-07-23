const SLIDES = [
  { img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80', caption: 'Wedding day coverage' },
  { img: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&q=80', caption: 'Live event photography' },
  { img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80', caption: 'Birthday celebrations' },
  { img: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80', caption: 'Wedding detail shots' },
  { img: 'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=1200&q=80', caption: 'Editing training session' },
  { img: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&q=80', caption: 'On location coverage' },
  { img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80', caption: 'Computer training class' },
  { img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=80', caption: 'Behind the lens' },
];

let current = 0;
let autoTimer = null;

function buildCarousel() {
  const track = document.getElementById('carouselTrack');
  const dots = document.getElementById('carouselDots');
  const thumbs = document.getElementById('carouselThumbs');
  if (!track) return;

  track.innerHTML = SLIDES.map((s, i) => `
    <div class="carousel-slide ${i === 0 ? 'active' : ''}" data-i="${i}">
      <img src="${s.img}" alt="${s.caption}">
      <div class="carousel-caption">${s.caption}</div>
    </div>
  `).join('');

  dots.innerHTML = SLIDES.map((_, i) => `<button data-i="${i}" class="${i === 0 ? 'active' : ''}" aria-label="Go to slide ${i + 1}"></button>`).join('');
  thumbs.innerHTML = SLIDES.map((s, i) => `<img src="${s.img.replace('w=1200', 'w=200')}" data-i="${i}" class="${i === 0 ? 'active' : ''}" alt="thumbnail ${i + 1}">`).join('');

  dots.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => goTo(parseInt(btn.dataset.i))));
  thumbs.querySelectorAll('img').forEach(img => img.addEventListener('click', () => goTo(parseInt(img.dataset.i))));

  document.getElementById('carouselPrev').addEventListener('click', () => goTo(current - 1));
  document.getElementById('carouselNext').addEventListener('click', () => goTo(current + 1));

  startAuto();
}

function goTo(i) {
  const total = SLIDES.length;
  current = ((i % total) + total) % total;
  document.querySelectorAll('.carousel-slide').forEach(el => el.classList.toggle('active', parseInt(el.dataset.i) === current));
  document.querySelectorAll('.carousel-dots button').forEach(el => el.classList.toggle('active', parseInt(el.dataset.i) === current));
  document.querySelectorAll('.carousel-thumbs img').forEach(el => el.classList.toggle('active', parseInt(el.dataset.i) === current));
  restartAuto();
}

function startAuto() { autoTimer = setInterval(() => goTo(current + 1), 4500); }
function restartAuto() { clearInterval(autoTimer); startAuto(); }

document.addEventListener('DOMContentLoaded', buildCarousel);
