export default function Certifications({ onOpenCertModal }) {
  return (
    <section id="certifications">
      <div className="container">
        <div data-reveal="up">
          <p className="section-label">Verified Credentials</p>
          <h2 className="section-title">Official Certifications</h2>
          <p
            className="section-desc"
            style={{
              maxWidth: '640px',
              color: 'var(--ink-2)',
              marginTop: '12px',
              marginBottom: '36px',
              fontSize: '1rem',
              lineHeight: 1.7,
            }}
          >
            Industry-recognized Information Technology Specialist (ITS) certifications issued by
            Certiport, validating expertise in Web Development and Cybersecurity.
          </p>
        </div>
        <div className="cert-grid">
          {/* HTML & CSS */}
          <div
            className="cert-card"
            data-reveal="left"
            onClick={() => onOpenCertModal('htmlcss')}
          >
            <div className="cert-img-wrap">
              <img src="certifications/htmlcss-cert.png" alt="ITS HTML and CSS Certification" />
              <div className="cert-overlay">
                <span className="cert-zoom-btn">
                  <i className="bx bx-zoom-in"></i> View Certificate
                </span>
              </div>
            </div>
            <div className="cert-content">
              <div className="cert-header">
                <span className="cert-tag">ITS Certified · Certiport</span>
                <span className="cert-badge-pill">
                  <i className="bx bx-code-curly"></i> HTML &amp; CSS
                </span>
              </div>
              <h3 className="cert-title">
                Information Technology Specialist — HTML &amp; CSS
              </h3>
              <p className="cert-desc">
                Demonstrates fundamental web development proficiency including semantic HTML5 markup,
                responsive layout design, CSS3 styling, accessibility, and web standards.
              </p>
              <div className="cert-footer">
                <span>
                  <i
                    className="bx bx-check-shield"
                    style={{ color: 'var(--accent)', marginRight: '4px' }}
                  ></i>
                  Verified Credential
                </span>
                <span className="cert-link-text">
                  Click to View PNG <i className="bx bx-expand-alt"></i>
                </span>
              </div>
            </div>
          </div>

          {/* Cybersecurity */}
          <div
            className="cert-card"
            data-reveal="right"
            data-delay="100"
            onClick={() => onOpenCertModal('cybersec')}
          >
            <div className="cert-img-wrap">
              <img src="certifications/cyber sec- cert .png" alt="ITS Cybersecurity Certification" />
              <div className="cert-overlay">
                <span className="cert-zoom-btn">
                  <i className="bx bx-zoom-in"></i> View Certificate
                </span>
              </div>
            </div>
            <div className="cert-content">
              <div className="cert-header">
                <span className="cert-tag">ITS Certified · Certiport</span>
                <span className="cert-badge-pill">
                  <i className="bx bx-shield-quarter"></i> Cybersecurity
                </span>
              </div>
              <h3 className="cert-title">
                Information Technology Specialist — Cybersecurity
              </h3>
              <p className="cert-desc">
                Validates comprehensive knowledge in threat analysis, network security fundamentals,
                operational security protocols, data protection, and risk mitigation strategies.
              </p>
              <div className="cert-footer">
                <span>
                  <i
                    className="bx bx-check-shield"
                    style={{ color: 'var(--accent)', marginRight: '4px' }}
                  ></i>
                  Verified Credential
                </span>
                <span className="cert-link-text">
                  Click to View PNG <i className="bx bx-expand-alt"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
