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

  // Populate dropdowns (Dummy data for now, the data source will come from REST API later)
  const dropdownData = {
    bedrooms: ['One', 'Two', 'Three', 'Four', 'Five+'],
    bathrooms: ['One', 'Two', 'Three', 'Four'],
    cleaning: ['Standard', 'Deep Clean', 'Move-in/out', 'Eco Clean']
  };

  class SimpleSelect {
    constructor(shell, options) {
      this.shell = shell;
      this.name = shell.dataset.name;
      this.placeholder = shell.dataset.placeholder || 'Select';
      this.options = options || [];
      this.value = '';

      // hidden input for form submission
      this.input = document.createElement('input');
      this.input.type = 'hidden';
      this.input.name = this.name;

      // trigger
      this.trigger = document.createElement('button');
      this.trigger.type = 'button';
      this.trigger.className = 'cs-trigger';

      this.label = document.createElement('span');
      this.label.className = 'cs-label cs-placeholder';
      this.label.textContent = this.placeholder;

      const caret = document.createElement('span');
      caret.className = 'cs-caret';

      this.trigger.append(this.label, caret);

      // list
      this.list = document.createElement('div');
      this.list.className = 'cs-list';

      this.options.forEach(opt => {
        const n = document.createElement('div');
        n.className = 'cs-option';
        n.dataset.value = opt.toLowerCase().replace(/\s+/g, '-');
        n.textContent = opt;

        // hover highlight (.active)
        n.addEventListener('mouseenter', () => {
          this.list.querySelectorAll('.cs-option').forEach(o => o.classList.remove('active'));
          n.classList.add('active');
        });

        // click to select (.selected)
        n.addEventListener('click', () => this.select(opt, n.dataset.value, n));

        this.list.appendChild(n);
      });

      // assemble
      this.shell.append(this.trigger, this.list, this.input);

      // events
      this.trigger.addEventListener('click', () => {
        this.shell.classList.toggle('open');
      });

      document.addEventListener('click', (e) => {
        if (!this.shell.contains(e.target)) {
          this.shell.classList.remove('open');
        }
      });
    }

    select(label, value, node) {
      this.label.classList.remove('cs-placeholder');
      this.label.textContent = label;
      this.input.value = value;

      // remove old .selected and add to clicked
      this.list.querySelectorAll('.cs-option').forEach(o => o.classList.remove('selected'));
      node.classList.add('selected');

      this.shell.classList.remove('open');
    }
  }

  // init
  // document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cs.field').forEach(shell => {
      const name = shell.dataset.name;
      const opts = dropdownData[name] || [];
      new SimpleSelect(shell, opts);
    });
  // });
});
