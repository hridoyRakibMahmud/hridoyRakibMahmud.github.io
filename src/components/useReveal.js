import { useEffect } from 'react';

// Adds the fade-up-on-scroll behaviour to every matching element.
// Elements are visible by default in CSS; the hidden state only applies when
// html.js-reveal is present, which the pre-paint script sets. So if JS fails,
// if IntersectionObserver is missing, or if reduced motion is on, nothing is
// ever hidden.
export default function useReveal(selector) {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('js-reveal')) return;

    const targets = Array.from(document.querySelectorAll(selector));
    targets.forEach((el) => el.classList.add('reveal'));

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const siblings = Array.from(entry.target.parentNode.children);
          const i = siblings.indexOf(entry.target);
          entry.target.style.setProperty('--d', `${Math.min(i, 4) * 70}ms`);
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
}
