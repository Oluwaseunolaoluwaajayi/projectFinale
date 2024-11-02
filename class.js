
// Select all gallery items in secFive
const galItems = document.querySelectorAll('.itemprice');

// Add event listener to each gallery item
galItems.forEach((item) => {
  item.addEventListener('mouseover', () => {
    // Add active class to the hovered item
    item.classList.add('active');
  });

  item.addEventListener('mouseout', () => {
    // Remove active class from the item
    item.classList.remove('active');
  });
});

// Select the category links
const categoryLinks = document.querySelectorAll('.galLists a');

// Add event listener to each category link
categoryLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    // Prevent default link behavior
    e.preventDefault();

    // Get the category name from the link text
    const category = link.textContent.toLowerCase();

    // Filter the gallery items based on the category
    galItems.forEach((item) => {
      if (item.dataset.category === category || category === 'all') {
        item.classList.remove('hide');
      } else {item.classList.add('hide');
      }
    });
  });
});

// Add data-category attribute to each gallery item
galItems.forEach((item, index) => {
  item.dataset.category = `category${index % 3 + 1}`;
});