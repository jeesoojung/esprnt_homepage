(function () {
  var buttons = document.querySelectorAll('.lang-btn');
  if (!buttons.length) return;

  var knownLangs = ['en', 'ja'];
  var hash = window.location.hash;
  var segments = window.location.pathname.split('/');
  var current = 'ko';

  knownLangs.forEach(function (code) {
    var idx = segments.indexOf(code);
    if (idx !== -1) {
      segments.splice(idx, 1);
      current = code;
    }
  });
  var basePath = segments.join('/') || '/';

  var pathFor = function (code) {
    if (code === 'ko') return basePath;
    var segs = basePath.split('/');
    var lastIndex = segs.length - 1;
    if (segs[lastIndex] === '') {
      segs[lastIndex] = code;
      segs.push('');
    } else {
      segs.splice(lastIndex, 0, code);
    }
    return segs.join('/');
  };

  buttons.forEach(function (btn) {
    var code = btn.getAttribute('data-lang');
    btn.classList.toggle('is-active', code === current);
    btn.setAttribute('href', (pathFor(code) || '/') + hash);
  });
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

/* work gallery: tap to reveal detail overlay on touch devices */
(function () {
  var items = document.querySelectorAll('.work-item');
  if (!items.length) return;

  var isTouch = window.matchMedia('(hover: none)').matches;
  if (!isTouch) return;

  items.forEach(function (item) {
    item.addEventListener('click', function () {
      var wasActive = item.classList.contains('is-active');
      items.forEach(function (other) { other.classList.remove('is-active'); });
      if (!wasActive) item.classList.add('is-active');
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.work-item')) {
      items.forEach(function (item) { item.classList.remove('is-active'); });
    }
  });
})();
