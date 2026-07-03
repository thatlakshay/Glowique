/* --- PRODUCTS DATA --- */
const products = [
  { 
    id: 1, 
    name: "Hydrating Gentle Cleanser", 
    category: "Cleanser", 
    price: 499, 
    img: "cleanser.png", 
    tag: "Face Wash", 
    ingredients: "Hyaluronic Acid, Ceramides", 
    rating: 5, 
    desc: "A gentle, non-foaming cleanser that removes impurities while keeping the skin barrier hydrated and intact." 
  },
  { 
    id: 2, 
    name: "Ultra-Light Hydrating Gel", 
    category: "Moisturizer", 
    price: 599, 
    img: "moisturizer.png", 
    tag: "Moisturizer", 
    ingredients: "5% Niacinamide, Centella Asiatica", 
    rating: 5, 
    desc: "An oil-free, fast-absorbing gel moisturizer that intensely hydrates, calms irritation, and brightens skin tone." 
  },
  { 
    id: 3, 
    name: "Vitamin C Radiance Serum", 
    category: "Serum", 
    price: 799, 
    img: "serum.png", 
    tag: "Serum", 
    ingredients: "15% L-Ascorbic Acid, Ferulic Acid", 
    rating: 5, 
    desc: "A powerful antioxidant serum that visibly fades dark spots, evens complexion, and boosts natural collagen." 
  },
  { 
    id: 4, 
    name: "Matte Fluid Sunscreen SPF 50+", 
    category: "Sunscreen", 
    price: 649, 
    img: "sunscreen.png", 
    tag: "Sunscreen", 
    ingredients: "Zinc Oxide, Titanium Dioxide, Hyaluronic Acid", 
    rating: 5, 
    desc: "Broad-spectrum mineral SPF with a silky matte finish. No white cast, non-comedogenic, and deeply hydrating." 
  },
  { 
    id: 5, 
    name: "Pore-Refining Niacinamide Toner", 
    category: "Toner", 
    price: 449, 
    img: "toner.png", 
    tag: "Toner", 
    ingredients: "3% Niacinamide, Witch Hazel", 
    rating: 4, 
    desc: "Balances sebum, tightens enlarged pores, and smooths skin texture without stripping essential moisture." 
  },
  { 
    id: 6, 
    name: "10% AHA + 2% BHA Exfoliating Peel", 
    category: "Exfoliator", 
    price: 699, 
    img: "peel.png", 
    tag: "Exfoliator", 
    ingredients: "Glycolic Acid, Salicylic Acid", 
    rating: 5, 
    desc: "Weekly peeling solution to gently remove dead cells, target acne breakouts, and reveal a baby-smooth glow." 
  },
  { 
    id: 7, 
    name: "Peptide Recovery Eye Cream", 
    category: "Eye Cream", 
    price: 549, 
    img: "eyecream.png", 
    tag: "Eye Cream", 
    ingredients: "Multi-peptides, Caffeine", 
    rating: 4, 
    desc: "Diminishes dark circles, puffiness, and fine lines around the delicate eye area with active peptide action." 
  }
];

const WHATSAPP_NUMBER = "918837741698";

/* --- CART FUNCTIONALITY --- */
let cart = JSON.parse(localStorage.getItem('glowique_cart')) || [];

function saveCart() {
  localStorage.setItem('glowique_cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  saveCart();
  openCartPanel();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

function updateQuantity(productId, delta) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;
  
  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
  }
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

/* --- UI MANIPULATION --- */
function updateCartUI() {
  // Update header badges
  const badges = document.querySelectorAll('.cart-count');
  const count = getCartCount();
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });

  // Render items in mini-cart
  const container = document.querySelector('.cart-items-container');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-message">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:1rem; opacity:0.6;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <p>Your routine is currently empty.</p>
        <a href="shop.html" class="btn btn-outline" style="margin-top:1.5rem; font-size:0.75rem;">Shop Products</a>
      </div>
    `;
    const totalRow = document.querySelector('.cart-footer');
    if (totalRow) totalRow.style.display = 'none';
  } else {
    const totalRow = document.querySelector('.cart-footer');
    if (totalRow) totalRow.style.display = 'block';
    
    container.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.name}</h4>
          <div class="cart-item-price">Rs. ${item.price}</div>
          <div class="cart-item-quantity">
            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `).join('');

    const totalVal = document.getElementById('cart-total-value');
    if (totalVal) {
      totalVal.textContent = `Rs. ${getCartTotal()}`;
    }
  }
}

function openCartPanel() {
  const overlay = document.querySelector('.cart-overlay');
  if (overlay) overlay.classList.add('open');
}

function closeCartPanel() {
  const overlay = document.querySelector('.cart-overlay');
  if (overlay) overlay.classList.remove('open');
}

/* --- ORDER VIA WHATSAPP --- */
function orderSingle(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const text = `Hello Glowique!\n\nI would like to order:\n- *${product.name}*\n- Price: Rs. ${product.price}\n- Active Ingredients: ${product.ingredients}\n\nPlease let me know how to make the payment and arrange delivery.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

function checkoutCart() {
  if (cart.length === 0) return;
  
  let text = `Hello Glowique!\n\nI would like to order my personalized skincare routine:\n\n`;
  cart.forEach((item, index) => {
    text += `${index + 1}. *${item.name}* (Qty: ${item.quantity}) - Rs. ${item.price * item.quantity}\n`;
  });
  text += `\n*Total Amount: Rs. ${getCartTotal()}*\n\nPlease let me know the payment options and shipping process. Thank you!`;
  
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

/* --- COMMON INIT --- */
document.addEventListener('DOMContentLoaded', () => {
  // Sticky Header on scroll
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Mobile navigation toggle
  const mobileToggle = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const icon = mobileToggle.querySelector('svg');
      if (icon) {
        if (nav.classList.contains('open')) {
          icon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
        } else {
          icon.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
        }
      }
    });
  }

  // Mini-cart toggle events
  const cartBtn = document.querySelector('.cart-icon-btn');
  const cartOverlay = document.querySelector('.cart-overlay');
  const cartClose = document.querySelector('.cart-close-btn');

  if (cartBtn) {
    cartBtn.addEventListener('click', openCartPanel);
  }
  if (cartClose) {
    cartClose.addEventListener('click', closeCartPanel);
  }
  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) closeCartPanel();
    });
  }

  // Init UI
  updateCartUI();

  // Scroll animations observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.fade-in');
  animatedElements.forEach(el => observer.observe(el));
});
