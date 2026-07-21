// ---- Product catalog (sample placeholder inventory — swap in real stock) ----
const PRODUCTS = [
  { id: 'p1', name: 'USB Flash Drive 64GB', category: 'Accessories', price: 6500, img: 'https://images.unsplash.com/photo-1618410320928-25228d811631?w=500&q=80', tag: 'Bestseller' },
  { id: 'p2', name: 'Wireless Bluetooth Earbuds', category: 'Audio', price: 15000, img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80', tag: 'New' },
  { id: 'p3', name: 'Power Bank 20000mAh', category: 'Accessories', price: 18500, img: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80', tag: '' },
  { id: 'p4', name: 'HDMI Cable 3m', category: 'Cables', price: 3500, img: 'https://images.unsplash.com/photo-1601524909162-ae8725290836?w=500&q=80', tag: '' },
  { id: 'p5', name: 'Wireless Computer Mouse', category: 'Accessories', price: 8500, img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80', tag: '' },
  { id: 'p6', name: 'Mechanical Keyboard', category: 'Accessories', price: 32000, img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80', tag: 'Popular' },
  { id: 'p7', name: 'Memory Card 128GB', category: 'Storage', price: 12000, img: 'https://images.unsplash.com/photo-1591290619762-c4bd0ab3b053?w=500&q=80', tag: '' },
  { id: 'p8', name: 'Printer Ink Cartridge (Set)', category: 'Printer', price: 14500, img: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&q=80', tag: '' },
  { id: 'p9', name: 'Laptop Cooling Pad', category: 'Accessories', price: 11000, img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&q=80', tag: '' },
  { id: 'p10', name: 'External Hard Drive 1TB', category: 'Storage', price: 45000, img: 'https://images.unsplash.com/photo-1531492746076-161ba9bf7ab1?w=500&q=80', tag: 'Bestseller' },
  { id: 'p11', name: 'Phone Camera Lens Clip-On', category: 'Photography', price: 9500, img: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=500&q=80', tag: '' },
  { id: 'p12', name: 'Ring Light with Tripod', category: 'Photography', price: 22000, img: 'https://images.unsplash.com/photo-1600861195091-690c92f1d2cd?w=500&q=80', tag: 'New' },
];

// in-memory cart — resets on page reload (no localStorage per environment constraints)
let cart = [];

function formatNaira(n) {
  return '₦' + n.toLocaleString('en-NG');
}

function renderProducts(filter) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  const list = filter && filter !== 'All' ? PRODUCTS.filter(p => p.category === filter) : PRODUCTS;
  grid.innerHTML = list.map(p => `
    <div class="product-card">
      <div class="thumb"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
      <div class="pbody">
        ${p.tag ? `<span class="tag">${p.tag}</span>` : ''}
        <h4>${p.name}</h4>
        <div class="price">${formatNaira(p.price)}</div>
        <button class="add-btn" data-id="${p.id}">Add to cart</button>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(btn.getAttribute('data-id'));
      btn.textContent = 'Added ✓';
      btn.classList.add('added');
      setTimeout(() => { btn.textContent = 'Add to cart'; btn.classList.remove('added'); }, 1200);
    });
  });
}

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ ...product, qty: 1 });
  renderCart();
  showToast(`${product.name} added to your order`);
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  renderCart();
}

function renderCart() {
  const itemsEl = document.getElementById('cartItems');
  const countEl = document.getElementById('cartCount');
  const totalEl = document.getElementById('cartTotal');
  const pillEl = document.getElementById('navCartCount');
  if (!itemsEl) return;

  const totalQty = cart.reduce((s, c) => s + c.qty, 0);
  const totalPrice = cart.reduce((s, c) => s + c.qty * c.price, 0);

  if (countEl) countEl.textContent = totalQty;
  if (pillEl) pillEl.textContent = totalQty;
  if (totalEl) totalEl.textContent = formatNaira(totalPrice);

  if (cart.length === 0) {
    itemsEl.innerHTML = `<div class="cart-empty">Your order is empty.<br>Add products from the shop to get started.</div>`;
  } else {
    itemsEl.innerHTML = cart.map(c => `
      <div class="cart-item">
        <div>
          <div class="ci-name">${c.name}</div>
          <div class="ci-meta">${c.qty} × ${formatNaira(c.price)}</div>
        </div>
        <button class="ci-remove" data-id="${c.id}">Remove</button>
      </div>
    `).join('');
    itemsEl.querySelectorAll('.ci-remove').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(btn.getAttribute('data-id')));
    });
  }
}

function checkoutWhatsApp() {
  if (cart.length === 0) { showToast('Add a product before checking out'); return; }
  const lines = cart.map(c => `${c.qty} x ${c.name} (${formatNaira(c.price)} each)`).join('%0A');
  const total = cart.reduce((s, c) => s + c.qty * c.price, 0);
  const text = `Hello Debone Studio, I would like to order:%0A${lines}%0A%0ATotal: ${formatNaira(total)}%0A%0APlease confirm availability and delivery/pickup details.`;
  window.open(`https://wa.me/2348035988889?text=${text}`, '_blank');
}

function checkoutEmail() {
  if (cart.length === 0) { showToast('Add a product before checking out'); return; }
  const lines = cart.map(c => `${c.qty} x ${c.name} (${formatNaira(c.price)} each)`).join('%0D%0A');
  const total = cart.reduce((s, c) => s + c.qty * c.price, 0);
  const subject = 'New Order from Website';
  const body = `Order details:%0D%0A${lines}%0D%0A%0D%0ATotal: ${formatNaira(total)}%0D%0A%0D%0AName:%0D%0APhone:%0D%0ADelivery/Pickup:`;
  window.location.href = `mailto:bonechidi@gmail.com?subject=${subject}&body=${body}`;
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

document.addEventListener('DOMContentLoaded', function () {
  renderProducts('All');
  renderCart();

  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderProducts(chip.getAttribute('data-filter'));
    });
  });

  const waBtn = document.getElementById('checkoutWhatsApp');
  const emailBtn = document.getElementById('checkoutEmail');
  if (waBtn) waBtn.addEventListener('click', checkoutWhatsApp);
  if (emailBtn) emailBtn.addEventListener('click', checkoutEmail);
});
