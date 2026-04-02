// Profile Menu Toggle - Click to open/close on mobile, auto-hide on blur
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const profileMenuItem = document.getElementById('menu-item-500');
    
    if (!profileMenuItem) {
      console.log('Profile menu item not found');
      return;
    }

    const profileLink = profileMenuItem.querySelector('.menu-link');
    const menuToggleBtn = profileMenuItem.querySelector('.ast-menu-toggle');
    const subMenu = profileMenuItem.querySelector('.sub-menu');

    if (!profileLink || !menuToggleBtn || !subMenu) {
      console.log('Profile menu elements not found', { profileLink, menuToggleBtn, subMenu });
      return;
    }

    console.log('Profile menu initialized successfully');

    // Detect touch device
    const isTouchDevice = () => {
      return (('ontouchstart' in window) ||
              (navigator.maxTouchPoints > 0) ||
              (navigator.msMaxTouchPoints > 0));
    };

    const isTouch = isTouchDevice();

    const openMenu = function() {
      console.log('Opening menu');
      subMenu.style.display = 'block';
    };

    const closeMenu = function() {
      console.log('Closing menu');
      subMenu.style.display = 'none';
    };

    const toggleMenu = function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Toggle clicked');
      if (subMenu.style.display === 'block') {
        closeMenu();
      } else {
        openMenu();
      }
    };

    // Click handlers
    profileLink.addEventListener('click', toggleMenu);
    if (menuToggleBtn) {
      menuToggleBtn.addEventListener('click', toggleMenu);
    }

    // Desktop: Hide menu when cursor leaves (only on non-touch devices)
    if (!isTouch) {
      let hideTimer;
      profileMenuItem.addEventListener('mouseleave', function() {
        hideTimer = setTimeout(() => {
          closeMenu();
        }, 300);
      });

      profileMenuItem.addEventListener('mouseenter', function() {
        if (hideTimer) clearTimeout(hideTimer);
      });
    }

    // Hide menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!profileMenuItem.contains(e.target) && subMenu.style.display === 'block') {
        closeMenu();
      }
    });

    // Handle submenu link clicks
    subMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function(e) {
        e.stopPropagation();
        setTimeout(() => {
          closeMenu();
        }, 100);
      });
    });
  });
})();
        // Close menu after a brief delay
        setTimeout(() => {
          closeMenu();
        }, 300);
      });
    });
  });
})();
  });
})();
