/**
 * Wire "Add to cart" buttons on menu/shop pages – price always ₱1.00
 */
(function () {
  function wire() {
    if (!window.CoffeeCart) return;

    const productCards = document.querySelectorAll('.menu-wrap, .product, .menu-entry, .product-item');
    productCards.forEach((card) => {
      const btn = card.querySelector('a.btn, button.add-to-cart, .add-to-cart-btn');
      if (!btn || btn.dataset.wired) return;
      btn.dataset.wired = '1';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const nameEl = card.querySelector('h3 a, h3, .heading a, .heading');
        const baseName = (nameEl && nameEl.textContent.trim()) || 'Burger Item';
        const qtyInput = card.querySelector('input[type="number"].quantity, #quantity');
        const qty = qtyInput ? Math.max(1, parseInt(qtyInput.value, 10) || 1) : 1;
        CoffeeCart.addToCart({ name: baseName, price: 1, quantity: qty });
        const original = btn.textContent;
        btn.textContent = 'Added ✓';
        setTimeout(() => { btn.textContent = original; }, 1200);
      });
    });

    const singleBtn = document.querySelector('.product-details .btn, #add-to-cart-btn, a[href="cart.html"].btn');
    if (singleBtn && !singleBtn.dataset.wired) {
      singleBtn.dataset.wired = '1';
      singleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const name = (document.querySelector('.product-details h3, .heading-section h2') || {}).textContent || 'Classic Smash Burger';
        const qtyInput = document.querySelector('input[type="number"].quantity, #quantity');
        const qty = qtyInput ? Math.max(1, parseInt(qtyInput.value, 10) || 1) : 1;
        CoffeeCart.addToCart({ name: name.trim(), price: 1, quantity: qty });
        alert('Added to cart (₱1.00 × ' + qty + ')');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }
})();
