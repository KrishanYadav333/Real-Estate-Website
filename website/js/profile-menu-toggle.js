// Profile Menu Toggle - Inline styles approach
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
      console.error('[Menu] .sub-menu NOT FOUND inside menu-item-500!');
      console.log('[Menu] Available classes:', item.className);
      return false;
    }
    
    console.log('[Menu] Elements found! Setting up...');
    
    // Force submenu hidden initially with inline styles
    submenu.setAttribute('style', 'position: absolute; background: white; border: 1px solid #ddd; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 10000; top: 100%; right: 0; min-width: 180px; padding: 8px 0; margin: 0; list-style: none; display: none !important; visibility: hidden !important; opacity: 0 !important;');
    
    // Style the menu items
    submenu.querySelectorAll('li').forEach(li => {
      li.style.listStyle = 'none';
      li.style.padding = '0';
      li.style.margin = '0';
      
      const link = li.querySelector('a');
      if (link) {
        link.style.display = 'block';
        link.style.padding = '10px 16px';
        link.style.color = '#333';
        link.style.backgroundColor = 'white';
        link.style.textDecoration = 'none';
        link.style.fontSize = '14px';
        link.style.whiteSpace = 'nowrap';
        link.style.cursor = 'pointer';
        link.style.border = 'none';
        link.style.transition = 'all 0.2s ease';
        link.style.lineHeight = '1.5';
        
        link.addEventListener('mouseenter', function() {
          this.style.backgroundColor = '#f5f5f5';
          this.style.color = '#da2128';
          this.style.paddingLeft = '20px';
        });
        
        link.addEventListener('mouseleave', function() {
          this.style.backgroundColor = 'white';
          this.style.color = '#333';
          this.style.paddingLeft = '16px';
        });
      }
    });
    
    // Find the toggle button
    const btn = item.querySelector('.ast-menu-toggle');
    if (!btn) {
      console.error('[Menu] .ast-menu-toggle button not found!');
      return false;
    }
    
    console.log('[Menu] Toggle button found!');
    
    // Track state
    let isOpen = false;
    
    // Click handler - use capture phase to intercept before Astra
    function toggleClick(e) {
      console.log('[Menu] *** BUTTON CLICKED ***');
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      isOpen = !isOpen;
      console.log('[Menu] Toggle state:', isOpen ? 'OPEN' : 'CLOSE');
      
      if (isOpen) {
        submenu.style.display = 'block !important';
        submenu.style.visibility = 'visible !important';
        submenu.style.opacity = '1 !important';
        btn.setAttribute('aria-expanded', 'true');
        console.log('[Menu] Submenu should be VISIBLE now');
      } else {
        submenu.style.display = 'none !important';
        submenu.style.visibility = 'hidden !important';
        submenu.style.opacity = '0 !important';
        btn.setAttribute('aria-expanded', 'false');
        console.log('[Menu] Submenu should be HIDDEN now');
      }
    }
    
    // Attach handler on btn directly
    btn.addEventListener('click', toggleClick, true);
    
    // Also try menu link
    const link = item.querySelector('.menu-link');
    if (link) {
      link.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
          console.log('[Menu] Menu link clicked');
          btn.click();
        }
      }, true);
    }
    
    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!item.contains(e.target) && isOpen) {
        console.log('[Menu] Outside click - closing');
        isOpen = false;
        submenu.style.display = 'none !important';
        submenu.style.visibility = 'hidden !important';
        submenu.style.opacity = '0 !important';
        btn.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Close on submenu item click
    submenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', function() {
        console.log('[Menu] Menu item clicked:', this.textContent);
        isOpen = false;
        submenu.style.display = 'none !important';
        submenu.style.visibility = 'hidden !important';
        submenu.style.opacity = '0 !important';
        btn.setAttribute('aria-expanded', 'false');
      });
    });
    
    console.log('[Menu] Setup complete!');
    return true;
  }
  
  if (document.readyState === 'loading') {
    console.log('[Menu] Waiting for DOM...');
    document.addEventListener('DOMContentLoaded', function() {
      console.log('[Menu] DOM ready');
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
