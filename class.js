// Select all add-to-cart buttons
// Constants
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartSection = document.querySelector('.cart-section');
const cartItemsContainer = document.querySelector('.cart-items');
const totalElement = document.querySelector('.total');
const clearCartButton = document.querySelector('.clear-cart');

// Cart initialization
let cart = [];

// Event listeners for add-to-cart buttons
addToCartButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const itemInfo = getItemInfo(e.target.parentNode);
    cart.push(itemInfo);
    console.log(`Total Amount: $${calculateTotal().toFixed(2)}`);
    updateCartDisplay();
    saveCartToLocalStorage();
  });
});

// Helper function to get item info
function getItemInfo(itemNode) {
  return {
    name: itemNode.querySelector('h6').textContent,
    price: itemNode.querySelector('p:nth-child(4)').textContent.trim(),
  };
}

// Update cart display function
function updateCartDisplay() {
  cartItemsContainer.innerHTML = '';
  cart.forEach((item, index) => {
    const cartItemElement = document.createElement('div');
cartItemElement.innerHTML = `
      ${item.name} - ${item.price}
      <button class="remove-from-cart" data-index="${index}">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItemElement);
  });
  totalElement.textContent = `$${calculateTotal().toFixed(2)}`;
  setupRemoveEventListeners();
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

// Setup event listeners for remove buttons
function setupRemoveEventListeners() {
  cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-from-cart')) {
      const index = e.target.getAttribute('data-index');
      cart.splice(index, 1);
      updateCartDisplay();
      saveCartToLocalStorage();
    }
  });
}

// Clear cart event listener
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
