export default function About({ onOpenInfoModal }) {
  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-text" data-reveal="left">
            <p className="section-label">About Me</p>
            <h2 className="section-title">
              Technical problem solver &amp; workflow optimizer.
            </h2>
            <p>
              I hold a Bachelor of Science in Information Technology from the University of the East,
              bringing a strong analytical mindset to the virtual assistant space.
            </p>
            <p>
              Whether you need reliable administrative support, custom system automation, or
              high-volume device management, I deliver precise and efficient results that scale with
              your business.
            </p>
          </div>
          <div className="about-stats" data-reveal="right">
            <div
              className="stat-box stat-clickable"
              onClick={() => onOpenInfoModal('school')}
              title="Click to learn more"
            >
              <div className="stat-num">
                <i className="bx bx-buildings" style={{ fontSize: '2rem' }}></i>
              </div>
              <div className="stat-label">UE Manila Graduate</div>
              <div className="stat-hint">Quezon City · tap for details</div>
            </div>
            <div
              className="stat-box stat-clickable"
              onClick={() => onOpenInfoModal('course')}
              title="Click to learn more"
            >
              <div className="stat-num">BSIT</div>
              <div className="stat-label">Degree Background</div>
              <div className="stat-hint">BS Info. Technology · tap for details</div>
            </div>
            <div
              className="stat-box stat-clickable"
              onClick={() => onOpenInfoModal('certifications')}
              title="Click to learn more"
            >
              <div className="stat-num">
                <i
                  className="bx bx-badge-check"
                  style={{ fontSize: '2rem', color: 'var(--accent)' }}
                ></i>
              </div>
              <div className="stat-label">ITS Certified</div>
              <div className="stat-hint">HTML/CSS &amp; Cybersecurity</div>
            </div>
            <div
              className="stat-box stat-clickable"
              onClick={() => onOpenInfoModal('experience')}
              title="Click to learn more"
            >
              <div className="stat-num">
                <i className="bx bx-id-card" style={{ fontSize: '2rem' }}></i>
              </div>
              <div className="stat-label">Internship</div>
              <div className="stat-hint">Div. Office QC · tap for details</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
