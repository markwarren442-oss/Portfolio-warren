import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = -100, my = -100, rx = -100, ry = -100;
    let animId;

    function onMouseMove(e) {
      mx = e.clientX;
      my = e.clientY;
    }

    function loop() {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      animId = requestAnimationFrame(loop);
    }

    document.addEventListener('mousemove', onMouseMove);
    animId = requestAnimationFrame(loop);

    // Hover effect for interactive elements
    function addHover() { document.body.classList.add('cursor-hover'); }
    function removeHover() { document.body.classList.remove('cursor-hover'); }

    const hoverSelector = 'a, button, .service-card, .project-card, .soc-link, .footer-soc, .s-dot, .nav-cta, .stat-clickable, .cert-card';

    function attachHoverListeners() {
      document.querySelectorAll(hoverSelector).forEach((el) => {
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
      });
    }

    // Attach initially + re-attach on DOM changes (modal content, etc.)
    attachHoverListeners();
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Dark cursor on dark sections
    function addDark() { document.body.classList.add('cursor-dark'); }
    function removeDark() { document.body.classList.remove('cursor-dark'); }

    function attachDarkListeners() {
      document.querySelectorAll('#contact, footer').forEach((el) => {
        el.addEventListener('mouseenter', addDark);
        el.addEventListener('mouseleave', removeDark);
      });
    }
    attachDarkListeners();

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef}></div>
      <div id="cursor-ring" ref={ringRef}></div>
    </>
  );
}
