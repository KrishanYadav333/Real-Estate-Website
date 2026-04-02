// Profile Menu Toggle - Override Astra menu completely
(function() {
  console.log('[ProfileMenu] Script loaded');
  
  function initProfileMenu() {
    const menuItem = document.getElementById('menu-item-500');
    
    if (!menuItem) {
      console.error('[ProfileMenu] ERROR: menu-item-500 not found');
      console.log('[ProfileMenu] Available menu items:', document.querySelectorAll('[id*="menu-item"]').length);
      return false;
    }

    const subMenu = menuItem.querySelector('ul.sub-menu');
    const toggleBtn = menuItem.querySelector('.ast-menu-toggle');
    const menuLink = menuItem.querySelector('.menu-link');
    
    console.log('[ProfileMenu] Elements found:', { subMenu: !!subMenu, toggleBtn: !!toggleBtn, menuLink: !!menuLink });
    
    if (!subMenu) {
      console.error('[ProfileMenu] ERROR: sub-menu not found');
      return false;
    }

    // Remove any existing click handlers from Astra
    const newToggleBtn = toggleBtn.cloneNode(true);
    if (toggleBtn.parentNode) {
      toggleBtn.parentNode.replaceChild(newToggleBtn, toggleBtn);
    }

    // Reset submenu initial state
    subMenu.style.cssText = 'display:none !important; visibility:hidden !important; opacity:0 !important;';
    newToggleBtn.setAttribute('aria-expanded', 'false');

    console.log('[ProfileMenu] Initialized successfully');

    // CRITICAL: Click handler on toggle button
    newToggleBtn.addEventListener('click', function(e) {
      console.log('[ProfileMenu] *** TOGGLE BUTTON CLICKED ***');
      e.preventDefault();
      e.stopPropagation();
      
      const isOpen = subMenu.style.display === 'block';
      console.log('[ProfileMenu] Current state: ' + (isOpen ? 'OPEN' : 'CLOSED'));
      
      if (isOpen) {
        console.log('[ProfileMenu] -> CLOSING');
        subMenu.style.cssText = 'display:none !important; visibility:hidden !important; opacity:0 !important;';
        newToggleBtn.setAttribute('aria-expanded', 'false');
      } else {
        console.log('[ProfileMenu] -> OPENING');
        subMenu.style.cssText = 'display:block !important; visibility:visible !important; opacity:1 !important;';
        newToggleBtn.setAttribute('aria-expanded', 'true');
      }
    }, true); // Use capture phase

    // Also handle menu link clicks
    if (menuLink) {
      menuLink.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
          console.log('[ProfileMenu] Menu link clicked (# href)');
          e.preventDefault();
          e.stopPropagation();
          newToggleBtn.click();
        }
      }, true);
    }

    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (!menuItem.contains(e.target) && subMenu.style.display === 'block') {
        console.log('[ProfileMenu] Outside click detected, closing');
        subMenu.style.cssText = 'display:none !important; visibility:hidden !important; opacity:0 !important;';
        newToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on submenu item clicks
    subMenu.querySelectorAll('li a').forEach(link => {
      link.addEventListener('click', function(e) {
        console.log('[ProfileMenu] Submenu item clicked:', this.textContent);
        setTimeout(() => {
          subMenu.style.cssText = 'display:none !important; visibility:hidden !important; opacity:0 !important;';
          newToggleBtn.setAttribute('aria-expanded', 'false');
        }, 100);
      });
    });

    console.log('[ProfileMenu] All handlers attached');
    return true;
  }

  // Try immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      console.log('[ProfileMenu] DOMContentLoaded fired');
      if (!initProfileMenu()) {
        // Retry after a delay if not found
        setTimeout(() => {
          console.log('[ProfileMenu] Retrying initialization...');
          initProfileMenu();
        }, 500);
      }
    });
  } else {
    console.log('[ProfileMenu] DOM already loaded');
    if (!initProfileMenu()) {
      setTimeout(() => {
        console.log('[ProfileMenu] Retrying initialization...');
        initProfileMenu();
      }, 500);
    }
  }
})();
})();
  });
})();
