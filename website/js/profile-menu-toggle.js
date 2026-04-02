// Profile Menu Toggle - Override Astra hover behavior on click
(function() {
  console.log('[Menu] Script starting...');
  
  function setupMenu() {
    const item = document.getElementById('menu-item-500');
    if (!item) {
      console.error('[Menu] #menu-item-500 NOT FOUND!');
      return false;
    }
    
    const submenu = item.querySelector('.sub-menu');
    if (!submenu) {
      console.error('[Menu] .sub-menu NOT FOUND!');
      return false;
    }
    
    console.log('[Menu] Elements found!');
    
    const btn = item.querySelector('.ast-menu-toggle');
    if (!btn) {
      console.error('[Menu] .ast-menu-toggle button not found!');
      return false;
    }
    
    console.log('[Menu] Toggle button found!');
    
    // State tracking
    let isClickOpen = false;
    
    // Click handler - MUST prevent all closing
    function handleClick(e) {
      console.log('[Menu] *** BUTTON CLICKED - isClickOpen was:', isClickOpen);
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      isClickOpen = !isClickOpen;
      console.log('[Menu] Toggling to:', isClickOpen);
      
      if (isClickOpen) {
        console.log('[Menu] -> Setting OPEN state');
        item.classList.add('profile-menu-force-open');
        submenu.classList.add('profile-menu-force-open');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        console.log('[Menu] -> Setting CLOSED state');
        item.classList.remove('profile-menu-force-open');
        submenu.classList.remove('profile-menu-force-open');
        btn.setAttribute('aria-expanded', 'false');
      }
      
      return false; // Prevent default
    }
    
    // Attach with capture AND use stopImmediatePropagation
    btn.addEventListener('click', handleClick, true);
    btn.addEventListener('mousedown', function(e) {
      e.stopImmediatePropagation();
    }, true);
    
    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!item.contains(e.target)) {
        console.log('[Menu] Outside click detected');
        if (isClickOpen) {
          console.log('[Menu] Closing from outside click');
          isClickOpen = false;
          item.classList.remove('profile-menu-force-open');
          submenu.classList.remove('profile-menu-force-open');
          btn.setAttribute('aria-expanded', 'false');
        }
      }
    });
    
    // Close on submenu item click (but allow navigation)
    submenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', function(e) {
        console.log('[Menu] Menu item clicked:', this.textContent);
        // Let the link navigate, but close menu after navigation starts
        setTimeout(() => {
          isClickOpen = false;
          item.classList.remove('profile-menu-force-open');
          submenu.classList.remove('profile-menu-force-open');
          btn.setAttribute('aria-expanded', 'false');
        }, 50);
      });
    });
    
    console.log('[Menu] Setup complete!');
    return true;
  }
  
  if (document.readyState === 'loading') {
    console.log('[Menu] Waiting for DOM...');
    document.addEventListener('DOMContentLoaded', function() {
      console.log('[Menu] DOMContentLoaded fired');
      if (!setupMenu()) {
        console.log('[Menu] Retrying in 500ms...');
        setTimeout(setupMenu, 500);
      }
    });
  } else {
    console.log('[Menu] DOM already ready');
    if (!setupMenu()) {
      console.log('[Menu] Retrying in 500ms...');
      setTimeout(setupMenu, 500);
    }
  }
})();
})();
  });
})();
