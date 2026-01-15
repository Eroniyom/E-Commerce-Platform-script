// Products Data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        rating: 4.5,
        emoji: "🎧"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 249.99,
        rating: 4.8,
        emoji: "⌚"
    },
    {
        id: 3,
        name: "Laptop Stand",
        price: 49.99,
        rating: 4.3,
        emoji: "💻"
    },
    {
        id: 4,
        name: "Mechanical Keyboard",
        price: 129.99,
        rating: 4.7,
        emoji: "⌨️"
    },
    {
        id: 5,
        name: "Gaming Mouse",
        price: 79.99,
        rating: 4.6,
        emoji: "🖱️"
    },
    {
        id: 6,
        name: "USB-C Hub",
        price: 39.99,
        rating: 4.4,
        emoji: "🔌"
    }
];

// Cart
let cart = [];
let cartCount = 0;

// Initialize
function init() {
    renderProducts();
    loadCart();
}

// Render Products
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        const stars = '⭐'.repeat(Math.floor(product.rating));
        
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-rating">${stars} ${product.rating}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id}, event)">
                Add to Cart
            </button>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Add to Cart
function addToCart(productId, event) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Button animation
    const button = event.target;
    button.classList.add('clicked');
    setTimeout(() => {
        button.classList.remove('clicked');
    }, 500);

    // Ripple effect
    createRipple(event, button);

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    updateCartUI();
    saveCart();
    showNotification();
}

// Create Ripple Effect
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Update Cart UI
function updateCartUI() {
    const cartCountElement = document.getElementById('cartCount');
    cartCountElement.textContent = cartCount;
    
    // Bounce animation
    cartCountElement.classList.add('bounce');
    setTimeout(() => {
        cartCountElement.classList.remove('bounce');
    }, 500);
}

// Show Notification
function showNotification() {
    const notificationBar = document.getElementById('notificationBar');
    const notificationText = document.getElementById('notificationText');
    
    notificationText.textContent = `${cartCount} item(s) added to cart!`;
    notificationBar.classList.add('show');
    
    setTimeout(() => {
        notificationBar.classList.remove('show');
    }, 3000);
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartCount', cartCount.toString());
}

// Load Cart from LocalStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    const savedCount = localStorage.getItem('cartCount');
    
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    
    if (savedCount) {
        cartCount = parseInt(savedCount);
    } else {
        cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    }
    
    updateCartUI();
}

// View Cart (placeholder function)
function viewCart() {
    if (cart.length === 0) {
        alert('Sepetiniz boş!');
        return;
    }
    
    let cartDetails = 'Sepetinizdeki Ürünler:\n\n';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartDetails += `${item.name} x${item.quantity} - $${itemTotal.toFixed(2)}\n`;
    });
    
    cartDetails += `\nToplam: $${total.toFixed(2)}`;
    
    alert(cartDetails);
}

// Initialize on page load
init();
