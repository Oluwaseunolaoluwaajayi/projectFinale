// Constants
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartSection = document.querySelector('.cart-section');
const cartItemsContainer = document.querySelector('.cart-items');
const totalElement = document.querySelector('.total');
const clearCartButton = document.querySelector('.clear-cart');
const videoElement = document.querySelector('.video');
const playButton = document.querySelector('.play-button');
const secTwoAddToCartButton = document.querySelector('.secTwo .add-to-cart');

// Initialize cart
let cart = [];

// Helper function to get item info
function getItemInfo(itemNode) {
  if (!itemNode) return null;
  return {
    name: itemNode.querySelector('h6')?.textContent || 'Unknown Product',
    price: itemNode.querySelector('p:nth-child(4)')?.textContent.trim() || '$0.00',
  };
}

// Function to get item details from `.secTwo`
function getItemDetails() {
  const productBrand = document.querySelector('.secTwo .bannerTopCards:nth-child(1) select')?.value || 'Unknown';
  const productGender = document.querySelector('.secTwo .bannerTopCards:nth-child(2) select')?.value || 'Unknown';
  const productSize = document.querySelector('.secTwo .bannerTopCards:nth-child(3) select')?.value || 'Unknown';
  const productPrice = document.querySelector('.secTwo .bannerTopCards:nth-child(4) select')?.value || '0';
  
  return {
    name: `${productBrand} - ${productGender} - ${productSize}`,
    price: `$${productPrice}`,
  };
}

// Update cart display function
function updateCartDisplay() {
  if (!cartItemsContainer) return;
  cartItemsContainer.innerHTML = '';
  cart.forEach((item, index) => {
    const cartItemElement = document.createElement('div');
    cartItemElement.innerHTML = `
      ${item.name} - ${item.price}
      <button class="remove-from-cart" data-index="${index}">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItemElement);
  });
  if (totalElement) totalElement.textContent = `$${calculateTotal().toFixed(2)}`;
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

// Setup event listeners for remove buttons
function setupRemoveEventListeners() {
  if (cartItemsContainer) {
    cartItemsContainer.removeEventListener('click', handleRemoveFromCart);
    cartItemsContainer.addEventListener('click', handleRemoveFromCart);
  }
}

function handleRemoveFromCart(e) {
  if (e.target && e.target.classList.contains('remove-from-cart')) {
    const index = e.target.getAttribute('data-index');
    if (index) {
      cart.splice(index, 1);
      updateCartDisplay();
      saveCartToLocalStorage();
    }
  }
}

// Event listeners

// Add to cart for all buttons
if (addToCartButtons) {
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const itemInfo = getItemInfo(e.target.closest('.itemprice'));
      if (itemInfo) {
        cart.push(itemInfo);
        console.log(`Total Amount: $${calculateTotal().toFixed(2)}`);
        updateCartDisplay();
        saveCartToLocalStorage();
      }
    });
  });
}

// Add to cart for .secTwo button
if (secTwoAddToCartButton) {
  secTwoAddToCartButton.addEventListener('click', () => {
    const itemInfo = getItemDetails();
    if (itemInfo) {
      cart.push(itemInfo);
      updateCartDisplay();
      saveCartToLocalStorage();
    }
  });
}

// Clear cart
if (clearCartButton) {
  clearCartButton.addEventListener('click', () => {
    cart = [];
    updateCartDisplay();
    saveCartToLocalStorage();
  });
}

// Video controls
if (playButton && videoElement) {
  playButton.addEventListener('click', toggleVideoPlay);
}

function toggleVideoPlay() {
  if (videoElement.paused) {
    videoElement.play();
    if (playButton) playButton.textContent = "Pause";
  } else {
    videoElement.pause();
    if (playButton) playButton.textContent = "Play";
  }
}

// Load cart from local storage on page load
document.addEventListener('DOMContentLoaded', loadCartFromLocalStorage);


// Function to handle form submission
function handleFormSubmit(event, form) {
  event.preventDefault(); // Prevent the default form submission

  const emailInput = form.querySelector('input[type="email"]');
  const email = emailInput.value.trim();

  // Simple email validation
  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Here you would typically make an AJAX call to submit the form data to the server
  // For this example, we'll just log the email to console
  console.log('Email submitted:', email);

  // Clear the input field after submission
  emailInput.value = '';

  // Show success message to user
  alert('Thank you for submitting your email!');
}

// Email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Select both forms
  const contactForm = document.querySelector('.cont-content .newsletterForm');
  const newsletterForm = document.querySelector('.sign .newsletterForm');

  // Add event listeners to both forms
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      handleFormSubmit(event, contactForm);
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(event) {
      handleFormSubmit(event, newsletterForm);
    });
  }
});