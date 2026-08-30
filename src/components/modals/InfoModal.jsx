import { useEffect, useRef } from 'react';
import { infoCards } from '../../data/infoCards';

export default function InfoModal({ infoKey, onClose, onOpenCertModal }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!infoKey) return;

    const ov = overlayRef.current;
    ov.style.display = 'flex';
    requestAnimationFrame(() =>
      requestAnimationFrame(() => ov.classList.add('visible'))
    );
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [infoKey]);

  function handleClose() {
    const ov = overlayRef.current;
    ov.classList.remove('visible');
    setTimeout(() => {
      ov.style.display = 'none';
      onClose();
    }, 450);
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && infoKey) handleClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  const d = infoKey ? infoCards[infoKey] : null;

  // Build photo section
  let photoContent = null;
  if (d) {
    if (d.photos && d.photos.length > 0) {
      photoContent = (
        <>
          <div className="cert-photo-strip">
            {d.photos.map((p, i) => (
              <div className="cert-photo-item" key={i}>
                <img
                  src={p.src}
                  alt={`${p.label} Certificate`}
                  onClick={() => {
                    if (onOpenCertModal) {
                      const certKey = p.label.includes('CSS') ? 'htmlcss' : 'cybersec';
                      onOpenCertModal(certKey);
                    }
                  }}
                />
                <div className="cert-photo-label">{p.label}</div>
              </div>
            ))}
          </div>
          <p className="cert-strip-hint">
            <i className="bx bx-mouse" style={{ fontSize: '1rem' }}></i> Scroll sideways to see both
            certificates &nbsp;·&nbsp; Click to enlarge
          </p>
        </>
      );
    } else if (d.photo) {
      photoContent = (
        <div className="info-modal-photo">
          <img src={d.photo} alt={d.photoAlt || ''} />
        </div>
      );
    }
  }

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      style={{ display: infoKey ? undefined : 'none' }}
    >
      <div className="modal-backdrop-blur" onClick={handleClose}></div>
      <div className="modal-box">
        <button className="modal-close" onClick={handleClose}>
          <i className="bx bx-x"></i>
        </button>
        {d && (
          <div>
            <div className="modal-icon">
              <i className={`bx ${d.icon}`}></i>
            </div>
            <div className="modal-title">{d.title}</div>
            <div className="modal-sub">{d.sub}</div>
            {photoContent}
            <div className="info-modal-meta">
              {d.tags.map((t, i) => (
                <span key={i} className={`info-modal-tag${t.gold ? ' gold' : ''}`}>
                  {t.text}
                </span>
              ))}
            </div>
            <div className="info-modal-body">
              {d.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
