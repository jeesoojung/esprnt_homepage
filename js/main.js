(function () {
  var toggle = document.querySelector('.lang-toggle');
  if (!toggle) return;
  var hash = window.location.hash;
  var segments = window.location.pathname.split('/');
  var enIndex = segments.indexOf('en');
  var target, label;
  if (enIndex !== -1) {
    segments.splice(enIndex, 1);
    target = segments.join('/') || '/';
    label = 'KOR';
  } else {
    var lastIndex = segments.length - 1;
    if (segments[lastIndex] === '') {
      segments[lastIndex] = 'en';
      segments.push('');
    } else {
      segments.splice(lastIndex, 0, 'en');
    }
    target = segments.join('/');
    label = 'ENG';
  }
  toggle.textContent = label;
  toggle.setAttribute('href', (target || '/') + hash);
})();

(function () {
  var nav = document.querySelector('.nav');
  if (nav) {
    var setScrollOffset = function () {
      document.documentElement.style.scrollPaddingTop = (nav.offsetHeight + 12) + 'px';
    };
    var toggleShadow = function () {
      nav.classList.toggle('nav--scrolled', window.scrollY > 4);
    };
    setScrollOffset();
    toggleShadow();
    window.addEventListener('resize', setScrollOffset);
    window.addEventListener('scroll', toggleShadow, { passive: true });
  }
})();

(function () {
  var sections = document.querySelectorAll('main > section:not(.hero)');

  if (!('IntersectionObserver' in window) || !sections.length) return;

  sections.forEach(function (section) {
    section.style.opacity = '0';
    section.style.transform = 'translateY(16px)';
    section.style.transition = 'opacity .7s ease, transform .7s ease';
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
