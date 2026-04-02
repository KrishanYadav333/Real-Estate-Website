// Profile Menu Toggle - Click to open/close on mobile, auto-hide on blur
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const profileMenuItem = document.getElementById('menu-item-500');
    
    if (!profileMenuItem) return;

    const profileLink = profileMenuItem.querySelector('.menu-link');
    const menuToggleBtn = profileMenuItem.querySelector('.ast-menu-toggle');
    const subMenu = profileMenuItem.querySelector('.sub-menu');

    if (!menuToggleBtn || !subMenu) return;

    // Detect touch device
    const isTouchDevice = () => {
      return (('ontouchstart' in window) ||
              (navigator.maxTouchPoints > 0) ||
              (navigator.msMaxTouchPoints > 0));
    };

    const openMenu = function() {
      menuToggleBtn.setAttribute('aria-expanded', 'true');
      subMenu.classList.add('show');
    };

    const closeMenu = function() {
      menuToggleBtn.setAttribute('aria-expanded', 'false');
      subMenu.classList.remove('show');
    };

    const toggleMenu = function(e) {
      e.preventDefault();
      e.stopPropagation();
      const isExpanded = menuToggleBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    };

    profileLink.addEventListener('click', toggleMenu);
    menuToggleBtn.addEventListener('click', toggleMenu);

    // Desktop: Hide menu when cursor leaves the menu item (only on non-touch devices)
    if (!isTouchDevice()) {
      let hideTimer;
      profileMenuItem.addEventListener('mouseleave', function() {
        hideTimer = setTimeout(() => {
          closeMenu();
        }, 200);
      });

      profileMenuItem.addEventListener('mouseenter', function() {
        if (hideTimer) clearTimeout(hideTimer);
      });
    }

    // Hide menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!profileMenuItem.contains(e.target)) {
        closeMenu();
      }
    });

    // Handle submenu link clicks - close menu after navigation
    subMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function(e) {
        // Allow the link to navigate
        e.stopPropagation();
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
