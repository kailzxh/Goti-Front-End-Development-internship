
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


// Enhanced interactions and animations
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== PARALLAX EFFECT FOR HERO =====
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroLeft = document.querySelector('.hero-left');
    if (heroLeft) {
      heroLeft.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
  
  // ===== LAZY LOAD IMAGES WITH FADE IN =====
  const images = document.querySelectorAll('img');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.animation = 'fadeInImage 0.5s ease-out forwards';
        observer.unobserve(img);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px 50px 0px'
  });
  
  images.forEach(img => imageObserver.observe(img));
  
  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ===== PRODUCT CARD INTERACTION =====
  const cards = document.querySelectorAll('.card, .review-card, .gift-card, .collection-item');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });
  
  // ===== TAB INTERACTIONS =====
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
  
  // ===== ADD TO CART/BAG INTERACTION =====
  const bagIcon = document.querySelector('.fa-bag-shopping');
  if (bagIcon) {
    bagIcon.addEventListener('click', function(e) {
      e.preventDefault();
      // Add animation to bag icon
      this.style.transform = 'scale(1.2)';
      setTimeout(() => {
        this.style.transform = '';
      }, 300);
      
      // Show notification (you can customize this)
      showNotification('Item added to cart!');
    });
  }
  
  // ===== HEART/FAVORITE INTERACTION =====
  const heartIcon = document.querySelector('.fa-heart');
  if (heartIcon) {
    heartIcon.addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.toggle('fa-regular');
      this.classList.toggle('fa-solid');
      this.classList.toggle('text-red-500');
      
      // Add animation
      this.style.transform = 'scale(1.3)';
      setTimeout(() => {
        this.style.transform = '';
      }, 300);
    });
  }
  
  // ===== NOTIFICATION FUNCTION =====
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #234f4b;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        transform: translateX(150%);
        transition: transform 0.3s ease;
        font-family: Arial, sans-serif;
        font-size: 14px;
      ">
        ${message}
      </div>
    `;
    
    document.body.appendChild(notification);
    
    const notificationDiv = notification.querySelector('div');
    setTimeout(() => {
      notificationDiv.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
      notificationDiv.style.transform = 'translateX(150%)';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
  
  // ===== SCROLL PROGRESS INDICATOR =====
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(to right, #c5a880, #234f4b);
    z-index: 9999;
    width: 0%;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
  
  // ===== HOVER SOUND EFFECTS (OPTIONAL) =====
  // Uncomment if you want to add subtle sound effects
  /*
  const hoverSound = new Audio('path/to/hover-sound.mp3');
  hoverSound.volume = 0.1;
  
  const clickSound = new Audio('path/to/click-sound.mp3');
  clickSound.volume = 0.2;
  
  document.querySelectorAll('.card, .tab, .shop-btn a').forEach(element => {
    element.addEventListener('mouseenter', () => {
      hoverSound.currentTime = 0;
      hoverSound.play();
    });
    
    element.addEventListener('click', () => {
      clickSound.currentTime = 0;
      clickSound.play();
    });
  });
  */
  
  // ===== SEARCH BAR ENHANCEMENT =====
  const searchInput = document.querySelector('.search input');
  if (searchInput) {
    searchInput.addEventListener('focus', function() {
      this.parentElement.style.boxShadow = '0 0 0 2px rgba(197, 168, 128, 0.3)';
    });
    
    searchInput.addEventListener('blur', function() {
      this.parentElement.style.boxShadow = 'none';
    });
  }
});