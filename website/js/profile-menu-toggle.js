(function () {
  function initProfileMenu() {
    var menuItems = document.querySelectorAll('#menu-item-500, .menu-item-500');
    if (!menuItems.length) {
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
        if (!isMobileViewport()) {
          subMenu.style.position = '';
          subMenu.style.top = '';
          subMenu.style.left = '';
          subMenu.style.right = '';
          subMenu.style.width = '';
          subMenu.style.maxHeight = '';
          return;
        }
        var vw = window.innerWidth;
        var vh = window.innerHeight;
        var menuWidth = Math.min(220, vw - 16);
        var safeTop = 72;
        var safeMaxHeight = Math.max(140, vh - safeTop - 8);

        subMenu.style.position = 'fixed';
        subMenu.style.left = 'auto';
        subMenu.style.right = '8px';
        subMenu.style.top = safeTop + 'px';
        subMenu.style.width = menuWidth + 'px';
        subMenu.style.maxHeight = safeMaxHeight + 'px';
      }

      function openMenu() {
        closeAllMenus();
        menuItem.classList.add('profile-menu-force-open');
        subMenu.classList.add('profile-menu-force-open');
        toggleBtn.setAttribute('aria-expanded', 'true');
        window.requestAnimationFrame(placeMobileMenu);
      }

      function closeMenu() {
        menuItem.classList.remove('profile-menu-force-open');
        subMenu.classList.remove('profile-menu-force-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
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
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }

        if (isOpen()) {
          closeMenu();
        } else {
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
})();
