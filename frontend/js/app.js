// Sticky header behavior
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled-header');
  } else {
    header.classList.remove('scrolled-header');
  }
});

// Dynamic dropdown options
document.addEventListener('DOMContentLoaded', () => {
    const dropdownData = {
        bedrooms: ['One', 'Two', 'Three', 'Four', 'Five+'],
        bathrooms: ['One', 'Two', 'Three', 'Four'],
        cleaning: ['Standard', 'Deep Clean', 'Move-in/out', 'Eco Clean']
    };

    const populateOptions = (selectId, options) => {
        const select = document.getElementById(selectId);
        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.toLowerCase().replace(/\s+/g, '-');
            option.textContent = opt;
            select.appendChild(option);
        });
    };

    populateOptions('select-bedrooms', dropdownData.bedrooms);
    populateOptions('select-bathrooms', dropdownData.bathrooms);
    populateOptions('select-cleaning', dropdownData.cleaning);
});