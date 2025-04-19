// Cart functionality
class Cart {
  constructor() {
    this.cart = document.querySelector('.cart');
    if (!this.cart) return;

    this.initialize();
  }

  initialize() {
    this.updateCartCount();
    this.setupEventListeners();
  }

  updateCartCount() {
    const countElement = document.querySelector('[data-cart-count]');
    if (countElement) {
      fetch('/cart.js')
        .then(response => response.json())
        .then(cart => {
          countElement.textContent = cart.item_count;
        });
    }
  }

  setupEventListeners() {
    const forms = document.querySelectorAll('form[action="/cart/add"]');
    forms.forEach(form => {
      form.addEventListener('submit', this.handleAddToCart.bind(this));
    });
  }

  handleAddToCart(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    fetch('/cart/add.js', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(() => {
      this.updateCartCount();
      // Show success message
      this.showNotification('Product added to cart');
    })
    .catch(error => {
      console.error('Error:', error);
      this.showNotification('Error adding product to cart', 'error');
    });
  }

  showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// Product variant selection
class ProductVariants {
  constructor() {
    this.variantSelects = document.querySelectorAll('.product__option-select');
    if (!this.variantSelects.length) return;

    this.initialize();
  }

  initialize() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.variantSelects.forEach(select => {
      select.addEventListener('change', this.handleVariantChange.bind(this));
    });
  }

  handleVariantChange(event) {
    const selectedOptions = Array.from(this.variantSelects).map(select => select.value);
    const variantId = this.findVariantId(selectedOptions);

    if (variantId) {
      this.updateVariant(variantId);
    }
  }

  findVariantId(selectedOptions) {
    // This would need to be implemented based on your variant data structure
    return null;
  }

  updateVariant(variantId) {
    // Update price, availability, etc.
  }
}

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
  new Cart();
  new ProductVariants();
}); 