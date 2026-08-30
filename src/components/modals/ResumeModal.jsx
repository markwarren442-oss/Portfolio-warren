import { useEffect, useRef, useCallback } from 'react';

export default function ResumeModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const fillRef = useRef(null);
  const pctRef = useRef(null);
  const labelRef = useRef(null);
  const iconRef = useRef(null);
  const ringRef = useRef(null);
  const ctaRef = useRef(null);
  const noteRef = useRef(null);
  const canvasRef = useRef(null);
  const rdlTimerRef = useRef(null);
  const confettiAnimRef = useRef(null);

  const triggerDownload = useCallback(() => {
    fetch('CV_MarkWarren_Flores.pdf')
      .then((r) => r.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'CV_MarkWarren_Flores.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      })
      .catch(() => {
        window.open('CV_MarkWarren_Flores.pdf', '_blank');
      });
  }, []);

  const startConfetti = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const box = canvas.parentElement;
    canvas.width = box.offsetWidth;
    canvas.height = box.offsetHeight;

    const COLORS = ['#c8a96e', '#e8c97a', '#fff', '#f0e6d0', '#111111'];
    const particles = Array.from({ length: 72 }, () => ({
      x: canvas.width * (0.3 + Math.random() * 0.4),
      y: canvas.height * 0.28,
      vx: (Math.random() - 0.5) * 9,
      vy: -(4 + Math.random() * 6),
      r: 3 + Math.random() * 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 1,
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 8,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    }));

    function drawFrame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.28;
        p.vx *= 0.98;
        p.alpha = Math.max(0, p.alpha - 0.013);
        p.rot += p.rotV;
        if (p.alpha <= 0) return;
        alive = true;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        if (p.shape === 'rect') {
          ctx.fillRect(-p.r, -p.r * 0.5, p.r * 2, p.r);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.r * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });
      if (alive) confettiAnimRef.current = requestAnimationFrame(drawFrame);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    confettiAnimRef.current = requestAnimationFrame(drawFrame);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const fill = fillRef.current;
    const pct = pctRef.current;
    const label = labelRef.current;
    const icon = iconRef.current;
    const ring = ringRef.current;
    const cta = ctaRef.current;
    const note = noteRef.current;
    const modal = modalRef.current;

    // Reset state
    fill.style.width = '0%';
    pct.textContent = '0%';
    label.textContent = 'Preparing your resume\u2026';
    icon.className = '';
    icon.id = 'rdl-icon';
    icon.innerHTML = '<i class="bx bxs-file-pdf"></i>';
    ring.className = '';
    ring.id = 'rdl-icon-ring';
    cta.classList.remove('rdl-ready');
    note.classList.remove('rdl-ready');
    note.textContent = 'File will download automatically';

    // Open
    modal.classList.add('rdl-open');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() =>
      requestAnimationFrame(() => modal.classList.add('rdl-visible'))
    );

    // Progress animation
    const DURATION = 2600;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const raw = elapsed / DURATION;
      let progress = Math.min(100, Math.round((1 - Math.pow(1 - raw, 2.4)) * 100));

      fill.style.width = progress + '%';
      pct.textContent = progress + '%';

      if (progress >= 60 && label.textContent !== 'Almost ready\u2026') {
        label.textContent = 'Almost ready\u2026';
      }

      if (raw < 1) {
        rdlTimerRef.current = requestAnimationFrame(tick);
      } else {
        // Completed
        fill.style.width = '100%';
        pct.textContent = '100%';
        label.textContent = 'Ready to download!';

        icon.classList.add('rdl-done');
        icon.innerHTML = '<i class="bx bx-check"></i>';
        ring.classList.add('rdl-done');

        cta.classList.add('rdl-ready');
        note.classList.add('rdl-ready');

        startConfetti();

        setTimeout(() => {
          triggerDownload();
          note.textContent = '\u2713 Download started!';
        }, 600);
      }
    }

    rdlTimerRef.current = requestAnimationFrame(tick);

    return () => {
      if (rdlTimerRef.current) cancelAnimationFrame(rdlTimerRef.current);
      if (confettiAnimRef.current) cancelAnimationFrame(confettiAnimRef.current);
      document.body.style.overflow = '';
    };
  }, [isOpen, startConfetti, triggerDownload]);

  function handleClose() {
    const modal = modalRef.current;
    modal.classList.remove('rdl-visible');
    if (rdlTimerRef.current) cancelAnimationFrame(rdlTimerRef.current);
    if (confettiAnimRef.current) cancelAnimationFrame(confettiAnimRef.current);
    setTimeout(() => {
      modal.classList.remove('rdl-open');
      onClose();
    }, 450);
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && isOpen) handleClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  return (
    <div id="resume-modal" aria-modal="true" role="dialog" ref={modalRef}>
      <div id="resume-modal-backdrop" onClick={handleClose}></div>
      <div id="resume-modal-box">
        <button id="resume-modal-close" onClick={handleClose} aria-label="Close">
          <i className="bx bx-x"></i>
        </button>

        <canvas id="resume-confetti" ref={canvasRef}></canvas>

        <div id="rdl-icon-wrap">
          <div id="rdl-icon-ring" ref={ringRef}></div>
          <div id="rdl-icon" ref={iconRef}>
            <i className="bx bxs-file-pdf"></i>
          </div>
        </div>

        <p id="rdl-label" ref={labelRef}>
          Preparing your resume…
        </p>
        <h2 id="rdl-title">Mark Warren Flores</h2>
        <p id="rdl-sub">Virtual Assistant · Quezon City, PH</p>

        <div id="rdl-bar-track">
          <div id="rdl-bar-fill" ref={fillRef}></div>
          <span id="rdl-bar-pct" ref={pctRef}>
            0%
          </span>
        </div>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            triggerDownload();
          }}
          id="rdl-cta"
          className="btn btn-gold"
          ref={ctaRef}
        >
          <span className="btn-shimmer"></span>
          <i className="bx bx-download"></i> Download Now
        </a>
        <p id="rdl-note" ref={noteRef}>
          File will download automatically
        </p>
      </div>
    </div>
  );
}
