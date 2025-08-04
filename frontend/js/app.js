// document.addEventListener('DOMContentLoaded', () => {
//   // Sticky header
//   window.addEventListener('scroll', () => {
//     const header = document.querySelector('.site-header');
//     if (window.scrollY > 50) {
//       header.classList.add('scrolled-header');
//     } else {
//       header.classList.remove('scrolled-header');
//     }
//   });

//   // Toggle mobile menu
//   const hamburger = document.getElementById('hamburger-btn');
//   const mobileMenu = document.getElementById('mobile-menu');
//   const loginBtn = document.querySelector('.login-btn');

//   let menuOpen = false;

//   if (hamburger && mobileMenu && loginBtn) {
//     hamburger.addEventListener('click', () => {
//       menuOpen = !menuOpen;

//       mobileMenu.classList.toggle('open');
//       mobileMenu.classList.toggle('hidden');

//       hamburger.src = menuOpen
//         ? '../images/icons/close.svg'
//         : '../images/icons/hamburger.svg';

//       loginBtn.classList.toggle('hide-login');
//     });
//   }

//   // Populate dropdowns
//   const dropdownData = {
//     bedrooms: ['One', 'Two', 'Three', 'Four', 'Five+'],
//     bathrooms: ['One', 'Two', 'Three', 'Four'],
//     cleaning: ['Standard', 'Deep Clean', 'Move-in/out', 'Eco Clean']
//   };

//   const populateOptions = (selectId, options) => {
//     const select = document.getElementById(selectId);
//     if (select) {
//       options.forEach(opt => {
//         const option = document.createElement('option');
//         option.value = opt.toLowerCase().replace(/\s+/g, '-');
//         option.textContent = opt;
//         select.appendChild(option);
//       });
//     }
//   };

//   populateOptions('select-bedrooms', dropdownData.bedrooms);
//   populateOptions('select-bathrooms', dropdownData.bathrooms);
//   populateOptions('select-cleaning', dropdownData.cleaning);
// });



document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const hamburger = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const loginBtn = document.querySelector('.login-btn');

  let menuOpen = false;

  const handleScrollEffect = () => {
    const isScrolled = window.scrollY > 50;
    header.classList.toggle('glassy', isScrolled);
    if (menuOpen) {
      mobileMenu.classList.toggle('mobile-menu-glassy', isScrolled);
    } else {
      mobileMenu.classList.remove('mobile-menu-glassy');
    }
  };

  // Scroll effect
  window.addEventListener('scroll', handleScrollEffect);

  // Menu toggle
  if (hamburger && mobileMenu && loginBtn) {
    hamburger.addEventListener('click', () => {
      menuOpen = !menuOpen;

      mobileMenu.classList.toggle('open');
      mobileMenu.classList.toggle('hidden');

      hamburger.src = menuOpen
        ? '../images/icons/close.svg'
        : '../images/icons/hamburger.svg';

      loginBtn.classList.toggle('hide-login');

      // Apply glassy style to mobile menu only if scrolled
      handleScrollEffect();
    });
  }

  // Populate dropdowns
  const dropdownData = {
    bedrooms: ['One', 'Two', 'Three', 'Four', 'Five+'],
    bathrooms: ['One', 'Two', 'Three', 'Four'],
    cleaning: ['Standard', 'Deep Clean', 'Move-in/out', 'Eco Clean']
  };

  const populateOptions = (selectId, options) => {
    const select = document.getElementById(selectId);
    if (select) {
      options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.toLowerCase().replace(/\s+/g, '-');
        option.textContent = opt;
        select.appendChild(option);
      });
    }
  };

  populateOptions('select-bedrooms', dropdownData.bedrooms);
  populateOptions('select-bathrooms', dropdownData.bathrooms);
  populateOptions('select-cleaning', dropdownData.cleaning);
});
