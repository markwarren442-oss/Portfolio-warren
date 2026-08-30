import { useEffect, useRef } from 'react';
import { certData } from '../../data/certData';

export default function CertLightbox({ certKey, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!certKey) return;

    const modal = modalRef.current;
    modal.classList.add('cl-open');
    requestAnimationFrame(() =>
      requestAnimationFrame(() => modal.classList.add('cl-visible'))
    );
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [certKey]);

  function handleClose() {
    const modal = modalRef.current;
    modal.classList.remove('cl-visible');
    setTimeout(() => {
      modal.classList.remove('cl-open');
      onClose();
    }, 350);
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && certKey) handleClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  const cert = certKey ? certData[certKey] : null;

  return (
    <div
      id="cert-lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-lightbox-title"
      ref={modalRef}
    >
      <div id="cert-lightbox-blur" onClick={handleClose}></div>
      <div id="cert-lightbox-box">
        <div id="cert-lightbox-header">
          <h3 id="cert-lightbox-title">{cert ? cert.title : 'Certification Viewer'}</h3>
          <button id="cert-lightbox-close" onClick={handleClose} aria-label="Close">
            <i className="bx bx-x"></i>
          </button>
        </div>
        <div id="cert-lightbox-body">
          {cert && (
            <img
              id="cert-lightbox-img"
              src={cert.img}
              alt={cert.title}
            />
          )}
        </div>
        <div id="cert-lightbox-footer">
          <span style={{ fontSize: '.85rem', color: 'var(--ink-2)' }}>
            <i className="bx bx-award" style={{ color: 'var(--accent)' }}></i>{' '}
            Issued by {cert ? cert.issuer : 'Certiport / Pearson VUE'}
          </span>
          {cert && (
            <a
              href={cert.img}
              download={cert.img.split('/').pop()}
              target="_blank"
              rel="noreferrer"
              className="btn btn-gold"
              style={{ fontSize: '.8rem', padding: '8px 18px', textDecoration: 'none' }}
            >
              <i className="bx bx-download"></i> Download Certificate PNG
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
