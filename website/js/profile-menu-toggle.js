// Profile Menu Toggle - Click to open/close on mobile, auto-hide on blur
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const profileMenuItem = document.getElementById('menu-item-500');
    
    if (!profileMenuItem) return;

    const profileLink = profileMenuItem.querySelector('.menu-link');
    const menuToggleBtn = profileMenuItem.querySelector('.ast-menu-toggle');
    const subMenu = profileMenuItem.querySelector('.sub-menu');

    if (!menuToggleBtn || !subMenu) return;

    // Toggle submenu on click
    profileLink.addEventListener('click', function(e) {
      e.preventDefault();
      const isExpanded = menuToggleBtn.getAttribute('aria-expanded') === 'true';
      menuToggleBtn.setAttribute('aria-expanded', !isExpanded);
      subMenu.style.display = isExpanded ? 'none' : 'block';
    });

    // Also handle the toggle button click directly
    menuToggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      subMenu.style.display = isExpanded ? 'none' : 'block';
    });

    // Hide menu when cursor leaves the menu item
    profileMenuItem.addEventListener('mouseleave', function() {
      menuToggleBtn.setAttribute('aria-expanded', 'false');
      subMenu.style.display = 'none';
    });

    // Hide menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!profileMenuItem.contains(e.target)) {
        menuToggleBtn.setAttribute('aria-expanded', 'false');
        subMenu.style.display = 'none';
      }
    });

    // Allow touch/click on subMenu items without closing
    subMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        setTimeout(() => {
          menuToggleBtn.setAttribute('aria-expanded', 'false');
          subMenu.style.display = 'none';
        }, 200);
      });
    });
  });
})();
