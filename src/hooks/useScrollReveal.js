import { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const delay = parseInt(entry.target.dataset.delay || '0', 10);
          setTimeout(() => entry.target.classList.add('in-view'), delay);
          observer.unobserve(entry.target);
        });
      },
      { threshold: options.threshold || 0.1 }
    );

    // Observe the element itself and all children with data-reveal
    const targets = el.querySelectorAll('[data-reveal]');
    targets.forEach((t) => observer.observe(t));
    if (el.hasAttribute('data-reveal')) observer.observe(el);

    return () => observer.disconnect();
  }, [options.threshold]);

  return ref;
}
