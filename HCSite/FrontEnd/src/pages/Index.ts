setInterval(() => {
  const themes = document.querySelectorAll('.js-theme');
  let currentActiveIndex = 0;
  themes.forEach((theme, index) => {
    if (theme.classList.contains('active')) {
      currentActiveIndex = index;
      theme.classList.remove('active')
    }
  });
  themes[(currentActiveIndex + 1) % themes.length].classList.add('active');
}, 2500);
