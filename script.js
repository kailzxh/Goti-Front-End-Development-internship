
// Move search bar for mobile without affecting desktop
document.addEventListener('DOMContentLoaded', function() {
  // Check if mobile
  if (window.innerWidth <= 575) {
    const searchDiv = document.querySelector('.header .search');
    const mobileSearchContainer = document.querySelector('.mobile-search-container');
    
    if (searchDiv && mobileSearchContainer) {
      // Clone the search div to mobile container
      const clonedSearch = searchDiv.cloneNode(true);
      mobileSearchContainer.appendChild(clonedSearch);
      
      // Hide original in header (already hidden by CSS)
    }
  }
  
  // Optional: Update on window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth <= 575) {
      const searchDiv = document.querySelector('.header .search');
      const mobileSearchContainer = document.querySelector('.mobile-search-container');
      const existingMobileSearch = document.querySelector('.mobile-search-container .search');
      
      if (searchDiv && mobileSearchContainer && !existingMobileSearch) {
        const clonedSearch = searchDiv.cloneNode(true);
        mobileSearchContainer.appendChild(clonedSearch);
      }
    } else {
      // Remove mobile search if resizing back to desktop
      const mobileSearch = document.querySelector('.mobile-search-container .search');
      if (mobileSearch) {
        mobileSearch.remove();
      }
    }
  });
});
