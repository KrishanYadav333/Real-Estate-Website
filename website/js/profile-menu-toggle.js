// Profile Menu Toggle - Direct approach targeting Astra menu
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const menuItem = document.getElementById('menu-item-500');
    
    if (!menuItem) {
      console.error('[ProfileMenu] ERROR: #menu-item-500 not found');
      return;
    }

    const subMenu = menuItem.querySelector('ul.sub-menu');
    const toggleBtn = menuItem.querySelector('.ast-menu-toggle');
    
    if (!subMenu) {
      console.error('[ProfileMenu] ERROR: .sub-menu not found');
      return;
    }

    console.log('[ProfileMenu] Initialized - element found');

    // Force initial state
    subMenu.classList.remove('profile-menu-open');
    subMenu.style.display = 'none !important';

    const openMenu = function() {
      console.log('[ProfileMenu] OPENING menu');
      subMenu.classList.add('profile-menu-open');
      subMenu.style.display = 'block !important';
      subMenu.style.visibility = 'visible !important';
      subMenu.style.opacity = '1 !important';
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = function() {
      console.log('[ProfileMenu] CLOSING menu');
      subMenu.classList.remove('profile-menu-open');
      subMenu.style.display = 'none !important';
      subMenu.style.visibility = 'hidden !important';
      subMenu.style.opacity = '0 !important';
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    };

    // Click handler on button specifically
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function(e) {
        console.log('[ProfileMenu] Toggle button clicked');
        e.preventDefault();
        e.stopPropagation();
        
        if (subMenu.classList.contains('profile-menu-open')) {
          closeMenu();
        } else {
          openMenu();
        }
      });
    }

    // Also handle clicks on the menu-link
    const menuLink = menuItem.querySelector('.menu-link');
    if (menuLink) {
      menuLink.addEventListener('click', function(e) {
        // Don't toggle if it's just a normal link click
        if (this.href && this.href !== '#') {
          return;
        }
        
        console.log('[ProfileMenu] Menu link clicked');
        e.preventDefault();
        e.stopPropagation();
        
        if (subMenu.classList.contains('profile-menu-open')) {
          closeMenu();
        } else {
          openMenu();
        }
      });
    }

    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (!menuItem.contains(e.target)) {
        console.log('[ProfileMenu] Click outside detected, closing');
        closeMenu();
      }
    });

    // Close submenu item clicks
    subMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        console.log('[ProfileMenu] Submenu item clicked, closing menu');
        closeMenu();
      });
    });

    // Detect touch vs desktop
    const isTouchDevice = () => {
      return (('ontouchstart' in window) || 
              (navigator.maxTouchPoints > 0) ||
              (navigator.msMaxTouchPoints > 0));
    };

    // Desktop: auto-hide on hover out
    if (!isTouchDevice()) {
      menuItem.addEventListener('mouseleave', function() {
        setTimeout(() => {
          if (subMenu.classList.contains('profile-menu-open')) {
            console.log('[ProfileMenu] Mouse left, auto-closing');
            closeMenu();
          }
        }, 200);
      });
    }

    console.log('[ProfileMenu] All event listeners attached');
  });
})();
})();
  });
})();
