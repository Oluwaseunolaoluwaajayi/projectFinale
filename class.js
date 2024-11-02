// Select all gallery items in secFive
const galItems = document.querySelectorAll('.itemprice');

console.log("Gallery items selected:", galItems);

// Add event listener to each gallery item
galItems.forEach((item) => {
  item.addEventListener('mouseover', () => {
    // Add active class to the hovered item
    item.classList.add('active');
    console.log("Mouse over event triggered on:", item);
  });

  item.addEventListener('mouseout', () => {
    // Remove active class from the item
    item.classList.remove('active');
    console.log("Mouse out event triggered on:", item);
  });
});

// Select the category links
const categoryLinks = document.querySelectorAll('.galLists a');

console.log("Category links selected:", categoryLinks);
// Add event listener to each category link
categoryLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    // Prevent default link behavior
    e.preventDefault();
    console.log("Click event triggered on category link:", link);

    // Get the category name from the link text
    const category = link.textContent.toLowerCase();
    console.log("Selected category:", category);

    // Filter the gallery items based on the category
    galItems.forEach((item) => {
      if (item.dataset.category === category || category === 'all') {
        item.classList.remove('hide');
        console.log("Showing item:", item);
      } else {
        item.classList.add('hide');
        console.log("Hiding item:", item);
      }
    });
  });
});
