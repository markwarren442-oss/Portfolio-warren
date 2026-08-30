import { useRef, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react';

const PageWipe = forwardRef(function PageWipe(_, ref) {
  const stripsRef = useRef([]);
  const wipingRef = useRef(false);

  // On mount: reveal page with strip retraction + hero animations
  useEffect(() => {
    const strips = stripsRef.current;

    // Start with strips fully covering the screen
    strips.forEach((s) => {
      if (!s) return;
      s.style.transition = 'none';
      s.style.transform = 'scaleY(1)';
      s.style.transformOrigin = 'top';
    });

    let revealed = false;

    function revealPage() {
      if (revealed) return;
      revealed = true;

      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          strips.forEach((s, i) => {
            if (!s) return;
            s.style.transition = `transform 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 55}ms`;
            s.style.transform = 'scaleY(0)';
          });

          // Hero animations
          setTimeout(() => {
            animateHeroIn();
          }, 280);

          // Image curtain
          setTimeout(() => {
            const curtain = document.getElementById('img-curtain');
            if (curtain) curtain.style.transform = 'scaleY(0)';
          }, 480);

          // Badge
          setTimeout(() => {
            const badge = document.getElementById('hero-badge');
            if (badge) badge.classList.add('show');
          }, 750);
        })
      );
    }

    if (document.readyState === 'complete') {
      revealPage();
    } else {
      window.addEventListener('load', revealPage, { once: true });
      setTimeout(revealPage, 300);
    }
  }, []);

  const wipeTransition = useCallback((callback) => {
    if (wipingRef.current) return;
    wipingRef.current = true;

    const strips = stripsRef.current;

    // Wipe IN — strips grow from bottom
    strips.forEach((s, i) => {
      if (!s) return;
      s.style.transformOrigin = 'bottom';
      s.style.transition = `transform 0.48s cubic-bezier(0.76,0,0.24,1) ${i * 40}ms`;
      s.style.transform = 'scaleY(1)';
    });

    setTimeout(() => {
      callback();
      // Wipe OUT — strips shrink from top
      setTimeout(() => {
        strips.forEach((s, i) => {
          if (!s) return;
          s.style.transformOrigin = 'top';
          s.style.transition = `transform 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 45}ms`;
          s.style.transform = 'scaleY(0)';
        });
        setTimeout(() => {
          wipingRef.current = false;
        }, 600);
      }, 60);
    }, 520);
  }, []);

  useImperativeHandle(ref, () => ({ wipeTransition }), [wipeTransition]);

  return (
    <div id="page-wipe">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="wipe-strip"
          ref={(el) => { stripsRef.current[i] = el; }}
        ></div>
      ))}
    </div>
  );
});

// Hero entrance animation
function animHero(el, delay) {
  if (!el) return;
  setTimeout(() => {
    el.style.transition =
      'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, delay);
}

function animateHeroIn() {
  animHero(document.getElementById('h-eyebrow'), 0);
  animHero(document.getElementById('h-name'), 100);
  animHero(document.getElementById('h-desc'), 200);
  animHero(document.getElementById('h-actions'), 300);
  animHero(document.getElementById('h-socials'), 400);

  const navItems = [
    document.getElementById('nav-logo'),
    document.getElementById('nl-0'),
    document.getElementById('nl-1'),
    document.getElementById('nl-2'),
    document.getElementById('nl-3'),
    document.getElementById('nl-4'),
    document.getElementById('nav-cta'),
  ];
  navItems.forEach((el, i) => {
    if (!el) return;
    setTimeout(() => {
      el.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 55);
  });
}

export default PageWipe;
