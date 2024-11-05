// Select all add-to-cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Select cart section and cart items container
const cartSection = document.querySelector('.cart-section');
const cartItemsContainer = document.querySelector('.cart-items');

// Select clear cart button
const clearCartButton = document.querySelector('.clear-cart');

// Initialize cart
let cart = [];

// Add event listener to each add-to-cart button
addToCartButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    // Get the item's information
    const itemInfo = {
      name: e.target.parentNode.querySelector('h6').textContent,
      price: e.target.parentNode.querySelector('p:nth-child(4)').textContent,
    };

    // Add item to cart
    cart.push(itemInfo);

    // Update cart display and save to local storage
    updateCartDisplay();
    saveCartToLocalStorage();
  });
});

// Update cart display function
function updateCartDisplay() {
  // Clear cart items container
  cartItemsContainer.innerHTML = '';

  // Loop through cart items
  cart.forEach((item, index) => {
    // Create cart item element
    const cartItemElement = document.createElement('div');
    cartItemElement.innerHTML = `
      ${item.name} - ${item.price}
      <button class="remove-from-cart" data-index="${index}">Remove</button>
    `;

    // Add event listener to remove-from-cart button
    cartItemElement.querySelector('.remove-from-cart').addEventListener('click', () => {
      // Remove item from cart
      cart.splice(index, 1);

      // Update cart display and save to local storage
      updateCartDisplay();
      saveCartToLocalStorage();
    });

    // Append cart item element to cart items container
    cartItemsContainer.appendChild(cartItemElement);
  });

  // Update total
  const totalElement = document.querySelector('.total');
  totalElement.textContent = `$${calculateTotal().toFixed(2)}`;
}

// Calculate total function
function calculateTotal() {
  return cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', '')) || 0;
    return total + price;
  }, 0);
}

// Save cart to local storage function
function saveCartToLocalStorage() {
  if (window.localStorage) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

// Load cart from local storage function
function loadCartFromLocalStorage() {
  if (window.localStorage) {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      cart = JSON.parse(storedCart);
      updateCartDisplay();
    }
  }
}

// Load cart from local storage on page load
loadCartFromLocalStorage();

// Add event listener to clear cart button
clearCartButton.addEventListener('click', () => {
  // Clear cart
  cart = [];

  // Update cart display and save to local storage
  updateCartDisplay();
  saveCartToLocalStorage();
});
