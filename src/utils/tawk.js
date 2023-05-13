import { isSsr } from '../helpers/ssr';

function init() {
  if (process.env.NODE_ENV === 'development' || isSsr()) {
    return;
  }
  (function () {
    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60a117b2185beb22b30dae86/1f5qk953t';
    s1.setAttribute('crossorigin', '*');
    document.head.prepend(s1);
  })();

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_API.onLoad = function () {
    window.Tawk_API.addTags(['Mentor', 'User']);
  };
}

export function setVisitor(visitor) {
  if (!window.Tawk_API) {
    return;
  }
  window.Tawk_API.visitor = visitor;
}

init();
