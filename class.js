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
      price: e.target.parentNode.querySelector('p:nth-child(4)').textContent.trim(),
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

    // Append cart item element to cart items container
    cartItemsContainer.appendChild(cartItemElement);
  });

  // Update total
  const totalElement = document.querySelector('.total');
  totalElement.textContent = `$${calculateTotal().toFixed(2)}`;

  // Set up event listener for remove buttons (event delegation)
  cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-from-cart')) {
      const index = e.target.getAttribute('data-index');
      cart.splice(index, 1);
      updateCartDisplay();
      saveCartToLocalStorage();
    }
  });
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
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from local storage function
function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCartDisplay();
  }
}

// Load cart from local storage on page load
loadCartFromLocalStorage();

// Add event listener to clear cart button
clearCartButton.addEventListener('click', () => {
  cart = [];
  updateCartDisplay();
  saveCartToLocalStorage();
});


// Select video and play button elements
const videoElement = document.querySelector('.video');
const playButton = document.querySelector('.play-button');

// Function to play/pause the video
function toggleVideoPlay() {
  if (videoElement.paused) {
    videoElement.play();
    playButton.textContent = "Pause";
  } else {
    videoElement.pause();
    playButton.textContent = "Play";
  }
}

// Add event listener to play button
playButton.addEventListener('click', toggleVideoPlay);


// Select the add-to-cart button in `.secTwo` section
const secTwoAddToCartButton = document.querySelector('.secTwo .add-to-cart');

// Function to get item details from `.secTwo`
function getItemDetails() {
  const productBrand = document.querySelector('.secTwo .bannerTopCards:nth-child(1) p').textContent;
  const productGender = document.querySelector('.secTwo .bannerTopCards:nth-child(2) p').textContent;
  const productSize = document.querySelector('.secTwo .bannerTopCards:nth-child(3) p').textContent;
  const productPrice = document.querySelector('.secTwo .bannerTopCards:nth-child(4) p').textContent;

  return {
    name: `${productBrand} - ${productGender} - ${productSize}`,
    price: productPrice.trim(),
  };
}

// Add event listener to `.secTwo` add-to-cart button
secTwoAddToCartButton.addEventListener('click', () => {
  const itemInfo = getItemDetails();
  cart.push(itemInfo);
  updateCartDisplay();
  saveCartToLocalStorage();
});
