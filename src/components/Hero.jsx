import { useEffect, useRef } from 'react';
import { socialLinks } from '../data/socials';

export default function Hero({ onOpenResumeModal, onOpenInfoModal, onNavClick }) {
  const parallaxRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.22}px)`;
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home">
      <div className="hero-text-col">
        <p className="hero-eyebrow" id="h-eyebrow">
          Virtual Assistant · Philippines
        </p>
        <h1 className="hero-name" id="h-name">
          Hi, I&apos;m
          <br />
          <em>Mark Warren</em>
          <br />
          Flores.
        </h1>
        <p className="hero-desc" id="h-desc">
          A hybrid specialist who blends day-to-day administrative excellence with deep technical
          problem-solving — built to optimize workflows and free your business to grow.
        </p>
        <div className="hero-actions" id="h-actions">
          <a
            href="#portfolio"
            className="btn btn-dark"
            onClick={(e) => {
              e.preventDefault();
              onNavClick('portfolio');
            }}
          >
            <span className="btn-shimmer"></span>
            View Projects <i className="bx bx-briefcase-alt"></i>
          </a>
          <a
            href="#"
            className="btn btn-ghost"
            id="resume-btn"
            onClick={(e) => {
              e.preventDefault();
              onOpenResumeModal();
            }}
          >
            <span className="btn-shimmer"></span>
            Resume <i className="bx bx-download"></i>
          </a>
        </div>
        <div className="hero-socials" id="h-socials">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="soc-link"
              title={item.name}
            >
              <i className={item.icon}></i>
            </a>
          ))}
        </div>
      </div>
      <div className="hero-img-col">
        <div className="hero-img-inner" id="hero-parallax" ref={parallaxRef}>
          <div className="img-curtain" id="img-curtain"></div>
          <img src="PERSONAL/My image.JPG" alt="Mark Warren Flores" />
        </div>
        <div
          className="hero-badge"
          id="hero-badge"
          onClick={() => onOpenInfoModal('school')}
          title="Click to learn more"
        >
          <span>
            <i className="bx bx-buildings"></i>
          </span>
          UE Manila
          <br />
          <small style={{ fontSize: '.6rem', letterSpacing: '.08em', opacity: 0.8 }}>
            Quezon City
          </small>
        </div>
      </div>
    </section>
  );
}
