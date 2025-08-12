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
    document.querySelectorAll('.cs.field').forEach(shell => {
      const name = shell.dataset.name;
      const opts = dropdownData[name] || [];
      new SimpleSelect(shell, opts);
    });

  // === Footer accordions (mobile) ===
  const footerCols = [...document.querySelectorAll('.footer-links .footer-col')];

  footerCols.forEach(col => {
    const heading = col.querySelector('h4');
    const list = col.querySelector('ul');
    if (!heading || !list) return;

    // Accessibility wiring
    const id = list.id || `footer-${(heading.textContent || 'section').trim().toLowerCase().replace(/\s+/g, '-')}`;
    list.id = id;
    heading.setAttribute('role', 'button');
    heading.setAttribute('aria-controls', id);
    heading.setAttribute('aria-expands', 'false');
    heading.tabIndex = 0;

    const toggle = () => {
      const open = col.classList.toggle('open');
      heading.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    // Only act like an accordion on mobile
    const isMobile = () => window.matchMedia('(max-width: 768px').matches;

    const clickHandler = () => { if (isMobile()) toggle(); };
    const keyHandler = (e) => {
      if (!isMobile()) return;
      if (e.key === 'Enter' || e.key === '') { e.preventDefault(); toggle(); }
    };
  
    heading.addEventListener('click', clickHandler);
    heading.addEventListener('keydown', keyHandler);
  });

  // Open only one section at a time:
  footerCols.forEach(col => {
    const heading = col.querySelector('h4');
    heading.addEventListener('click', () => {
      if (!window.matchMedia('(max-width: 768px)').matches) return;
      footerCols.forEach(c => { if (c !== col) c.classList.remove('open'); });
    });
  });
});
