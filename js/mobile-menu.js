(() => {
  const menuBtn = document.querySelector('.js-open-menu');

  const toggleMenu = () => {
    document.body.classList.toggle('menu-open');
  };

  menuBtn.addEventListener('click', toggleMenu);

  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (e.matches) {
      document.body.classList.remove('menu-open');
    }
  });
})();
