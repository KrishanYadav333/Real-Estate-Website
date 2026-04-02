(function () {
  function initProfileMenu() {
    var menuItem = document.getElementById('menu-item-500');
    if (!menuItem) {
      return;
    }

    var subMenu = menuItem.querySelector('.sub-menu');
    var toggleBtn = menuItem.querySelector('.ast-menu-toggle');
    var menuLink = menuItem.querySelector('.menu-link');
    if (!subMenu || !toggleBtn) {
      return;
    }

    function openMenu() {
      menuItem.classList.add('profile-menu-force-open');
      subMenu.classList.add('profile-menu-force-open');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      menuItem.classList.remove('profile-menu-force-open');
      subMenu.classList.remove('profile-menu-force-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
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

    document.addEventListener('click', function (e) {
      if (!menuItem.contains(e.target)) {
        closeMenu();
      }
    });

    subMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        closeMenu();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfileMenu);
  } else {
    initProfileMenu();
  }
})();
