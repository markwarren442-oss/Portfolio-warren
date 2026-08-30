import { useEffect, useRef } from 'react';
import { services } from '../../data/services';

export default function ServiceModal({ serviceId, onClose }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (serviceId == null) return;

    const ov = overlayRef.current;
    ov.style.display = 'flex';
    requestAnimationFrame(() =>
      requestAnimationFrame(() => ov.classList.add('visible'))
    );
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [serviceId]);

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
      if (e.key === 'Escape' && serviceId != null) handleClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  const s = serviceId != null ? services[serviceId] : null;

  return (
    <div
      className="modal-overlay"
      id="modal-overlay"
      ref={overlayRef}
      style={{ display: serviceId != null ? undefined : 'none' }}
    >
      <div className="modal-backdrop-blur" onClick={handleClose}></div>
      <div className="modal-box" id="modal-box">
        <button className="modal-close" onClick={handleClose}>
          <i className="bx bx-x"></i>
        </button>
        {s && (
          <div id="modal-content">
            <div className="modal-icon">
              <i className={`bx ${s.icon}`}></i>
            </div>
            <div className="modal-title">{s.title}</div>
            <div className="modal-sub">{s.sub}</div>
            <ul className="modal-list">
              {s.items.map((it, i) => (
                <li key={i}>
                  <div>
                    <strong>{it.h}</strong>
                    <span>{it.b}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
