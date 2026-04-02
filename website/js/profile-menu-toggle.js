(function () {
  function initProfileMenu() {
    var menuItems = document.querySelectorAll('#menu-item-500, .menu-item-500');
    console.log('[ProfileMenu] Found menu items:', menuItems.length);
    if (!menuItems.length) {
      console.warn('[ProfileMenu] No menu items found with selectors #menu-item-500 or .menu-item-500');
      return;
    }

    function closeAllMenus() {
      menuItems.forEach(function (item) {
        var menu = item.querySelector('.sub-menu');
        var btn = item.querySelector('.ast-menu-toggle');
        item.classList.remove('profile-menu-force-open');
        if (menu) {
          menu.classList.remove('profile-menu-force-open');
        }
        if (btn) {
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    menuItems.forEach(function (menuItem) {
      var subMenu = menuItem.querySelector('.sub-menu');
      var toggleBtn = menuItem.querySelector('.ast-menu-toggle');
      var menuLink = menuItem.querySelector('.menu-link');
      if (!subMenu || !toggleBtn) {
        return;
      }

      function isMobileViewport() {
        return window.matchMedia('(max-width: 921px)').matches;
      }

      function placeMobileMenu() {
        // On mobile, CSS media query handles positioning with !important
        // Just ensure the element is rendered properly
        if (!isMobileViewport()) {
          subMenu.style.position = '';
          subMenu.style.top = '';
          subMenu.style.left = '';
          subMenu.style.right = '';
          subMenu.style.width = '';
          subMenu.style.maxHeight = '';
        }
      }

      function openMenu() {
        console.log('[ProfileMenu] openMenu() called', { menuItem, subMenu });
        closeAllMenus();
        menuItem.classList.add('profile-menu-force-open');
        subMenu.classList.add('profile-menu-force-open');
        toggleBtn.setAttribute('aria-expanded', 'true');
        
        // Ensure dropdown is visible with inline styles as backup
        subMenu.style.display = 'block';
        subMenu.style.visibility = 'visible';
        subMenu.style.opacity = '1';
        subMenu.style.pointerEvents = 'auto';
        console.log('[ProfileMenu] Inline styles applied', { display: subMenu.style.display, visibility: subMenu.style.visibility, opacity: subMenu.style.opacity });
        
        if (isMobileViewport()) {
          console.log('[ProfileMenu] Mobile viewport detected, scrolling into view');
          menuItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        window.requestAnimationFrame(placeMobileMenu);
      }

      function closeMenu() {
        menuItem.classList.remove('profile-menu-force-open');
        subMenu.classList.remove('profile-menu-force-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        
        // Clear inline styles to let CSS take over
        subMenu.style.display = '';
        subMenu.style.visibility = '';
        subMenu.style.opacity = '';
        subMenu.style.pointerEvents = '';
        
        if (isMobileViewport()) {
          subMenu.style.top = '';
          subMenu.style.left = '';
          subMenu.style.right = '';
          subMenu.style.width = '';
          subMenu.style.maxHeight = '';
        }
      }

      function isOpen() {
        return menuItem.classList.contains('profile-menu-force-open');
      }

      function toggleMenu(e) {
        console.log('[ProfileMenu] Toggle button clicked', { isOpen: isOpen(), button: toggleBtn });
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }

        if (isOpen()) {
          console.log('[ProfileMenu] Closing menu');
          closeMenu();
        } else {
          console.log('[ProfileMenu] Opening menu');
          openMenu();
        }
      }

      toggleBtn.addEventListener('click', toggleMenu, true);

      if (menuLink) {
        menuLink.addEventListener('click', function (e) {
          var href = menuLink.getAttribute('href');
          if (href === '#' || href === '') {
            toggleMenu(e);
          }
        }, true);
      }

      subMenu.addEventListener('click', function (e) {
        e.stopPropagation();
      });

      subMenu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function (e) {
          var href = a.getAttribute('href');
          e.preventDefault();
          e.stopPropagation();
          closeMenu();
          if (href && href !== '#') {
            window.location.href = href;
          }
        }, true);
      });

      window.addEventListener('resize', function () {
        if (isOpen()) {
          placeMobileMenu();
        }
      });
    });

    document.addEventListener('click', function (e) {
      var clickedInsideAny = false;
      menuItems.forEach(function (menuItem) {
        if (menuItem.contains(e.target)) {
          clickedInsideAny = true;
        }
      });

      if (!clickedInsideAny) {
        closeAllMenus();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfileMenu);
  } else {
    initProfileMenu();
  }
  console.log('[ProfileMenu] Script initialized, DOM ready state:', document.readyState);
})();
