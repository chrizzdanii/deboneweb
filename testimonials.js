// Sample testimonials — only the first (Comedy T) is a real verified review found online.
// Replace the rest with real customer feedback as you collect it.
const REVIEWS = [
  { quote: "This company for me is one of the best I have entered in my life. The workers attend to customers well and render quality products.", who: "Comedy T, Verified Customer" },
  { quote: "Debone covered our wedding and the photos came out beautiful. They were patient with us all through the day.", who: "Ngozi A., Wedding Client" },
  { quote: "I did my video editing training here and I now freelance full time. The teachers really know Premiere Pro well.", who: "Chidi O., Training Graduate" },
  { quote: "My laptop wouldn't boot and they fixed it same day. Honest pricing too, no hidden charges.", who: "Emeka U., Computer Repair" },
  { quote: "The AI automation class opened my eyes to tools I didn't know existed. Practical and easy to follow.", who: "Blessing I., AI Training Student" },
  { quote: "Printed my wedding invitations and banners here — sharp quality and ready before the promised time.", who: "Amaka N., Business Center" },
  { quote: "Booked them for my daughter's birthday shoot. The photographer was patient with the children and got great shots.", who: "Ifeoma K., Birthday Client" },
  { quote: "Ordered a power bank and earbuds from the shop, delivered within Port Harcourt the same day.", who: "Tamuno B., Shop Customer" },
  { quote: "Their printer repair saved my small business — I was down for two days elsewhere before Debone fixed it properly.", who: "Chukwuemeka D., Printer Repair" },
  { quote: "Photoshop training here is thorough. I went from knowing nothing to editing professionally in a few weeks.", who: "Faith E., Training Graduate" },
  { quote: "Covered my brother's burial ceremony with dignity and care. We're grateful for how respectfully it was handled.", who: "Confidence T., Family Client" },
  { quote: "The cyber café is my go-to for printing and scanning documents — fast service, friendly staff.", who: "Miebaka S., Cyber Café" },
  { quote: "Got my ID card and passport photographs done in minutes. Quick and professional.", who: "Grace P., Walk-in Customer" },
  { quote: "The computer training school helped me get my first office job. I recommend it to anyone starting out.", who: "Victor A., Training Graduate" },
  { quote: "Great value for the accessories store — quality cables and a mouse that's still working perfectly a year later.", who: "Ebimobowei C., Shop Customer" },
];

let tCurrent = 0;
let tTimer = null;

function buildTestimonials() {
  const wrap = document.getElementById('testimonialWrap');
  const dots = document.getElementById('testimonialDots');
  if (!wrap) return;

  wrap.innerHTML = REVIEWS.map((r, i) => `
    <div class="testimonial-slide ${i === 0 ? 'active' : ''}" data-i="${i}">
      <div class="quote-card">
        <span class="quote-mark">"</span>
        <q>${r.quote}</q>
        <div class="who">— ${r.who}</div>
      </div>
    </div>
  `).join('') + `
    <button class="testimonial-arrow prev" id="tPrev" aria-label="Previous review">‹</button>
    <button class="testimonial-arrow next" id="tNext" aria-label="Next review">›</button>
  `;

  dots.innerHTML = REVIEWS.map((_, i) => `<button data-i="${i}" class="${i === 0 ? 'active' : ''}" aria-label="Go to review ${i + 1}"></button>`).join('');

  document.getElementById('tPrev').addEventListener('click', () => tGoTo(tCurrent - 1));
  document.getElementById('tNext').addEventListener('click', () => tGoTo(tCurrent + 1));
  dots.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => tGoTo(parseInt(btn.dataset.i))));

  tStart();
}

function tGoTo(i) {
  const total = REVIEWS.length;
  tCurrent = ((i % total) + total) % total;
  document.querySelectorAll('.testimonial-slide').forEach(el => el.classList.toggle('active', parseInt(el.dataset.i) === tCurrent));
  document.querySelectorAll('#testimonialDots button').forEach((el, idx) => el.classList.toggle('active', idx === tCurrent));
  tRestart();
}
function tStart() { tTimer = setInterval(() => tGoTo(tCurrent + 1), 5500); }
function tRestart() { clearInterval(tTimer); tStart(); }

document.addEventListener('DOMContentLoaded', buildTestimonials);
