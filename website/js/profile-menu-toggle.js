// Profile Menu Toggle - Simplified and robust
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const menuItem = document.getElementById('menu-item-500');
    
    if (!menuItem) {
      console.error('Profile menu item #menu-item-500 not found');
      return;
    }

    const subMenu = menuItem.querySelector('ul.sub-menu');
    
    if (!subMenu) {
      console.error('Submenu not found in profile menu item');
      return;
    }

    console.log('Profile menu found and initialized');

    let isOpen = false;

    const openMenu = function() {
      console.log('[Menu] Opening submenu');
      subMenu.style.display = 'block';
      subMenu.style.visibility = 'visible';
      subMenu.style.opacity = '1';
      isOpen = true;
    };

    const closeMenu = function() {
      console.log('[Menu] Closing submenu');
      subMenu.style.display = 'none';
      subMenu.style.visibility = 'hidden';
      subMenu.style.opacity = '0';
      isOpen = false;
    };

    // Initialize menu as closed
    closeMenu();

    // Handle clicks on the entire menu item to toggle
    menuItem.addEventListener('click', function(e) {
      // Prevent the click from bubbling to document
      e.stopPropagation();
      
      // If clicking on menu items inside the submenu, don't toggle
      if (e.target.closest('.sub-menu a')) {
        return;
      }

      console.log('[Menu] Click detected, current state:', isOpen);
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!menuItem.contains(e.target) && isOpen) {
        console.log('[Menu] Clicked outside, closing');
        closeMenu();
      }
    });

    // Detect touch device
    const isTouchDevice = () => {
      return (('ontouchstart' in window) ||
              (navigator.maxTouchPoints > 0) ||
              (navigator.msMaxTouchPoints > 0));
    };

    // Desktop: auto-hide on mouse leave
    if (!isTouchDevice()) {
      let hideTimer;
      menuItem.addEventListener('mouseleave', function() {
        hideTimer = setTimeout(() => {
          if (isOpen) {
            console.log('[Menu] Mouse left, auto-closing');
            closeMenu();
          }
        }, 300);
      });

      menuItem.addEventListener('mouseenter', function() {
        if (hideTimer) {
          clearTimeout(hideTimer);
          hideTimer = null;
        }
      });
    }
  });
})();

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
