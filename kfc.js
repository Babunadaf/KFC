const products = [
    { id: 1, name: 'Chicken Bucket', price: 15, image: 'dish1.jpg' },
    { id: 2, name: 'Chicken Wings', price: 10, image: 'dish2.jpg' },
    { id: 3, name: 'Fries', price: 5, image: 'dish2.jpg' }
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCart();
    document.getElementById('checkout-btn').addEventListener('click', displayOrderSummary);
    document.getElementById('pay-btn').addEventListener('click', payNow);
});

function loadProducts() {
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
        const productElem = document.createElement('div');
        productElem.className = 'product';
        productElem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="300" height="400">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(productElem);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItemElem = document.createElement('div');
        cartItemElem.className = 'cart-item';
        cartItemElem.innerHTML = `
            <h3>${item.name}</h3>
            <p>$${item.price} x ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartContainer.appendChild(cartItemElem);
    });
    updateCartTotal();
}

function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
    }
    updateCart();
}

function updateCartTotal() {
    const totalContainer = document.getElementById('cart-total');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalContainer.innerHTML = `<h3>Total: $${total}</h3>`;
}

function displayOrderSummary() {
    const orderSummaryContainer = document.getElementById('order-summary');
    orderSummaryContainer.innerHTML = '<h3>Order Summary</h3>';
    cart.forEach(item => {
        const summaryItem = document.createElement('div');
        summaryItem.innerHTML = `<p>${item.name} x ${item.quantity} - $${item.price * item.quantity}</p>`;
        orderSummaryContainer.appendChild(summaryItem);
    });
}

function payNow() {
    alert('Payment Successful! Thank you for your order.');
    cart = [];
    updateCart();
    document.getElementById('order-summary').innerHTML = '';
}
