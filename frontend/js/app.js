// Sticky header behavior
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled-header');
  } else {
    header.classList.remove('scrolled-header');
  }
});