import { useEffect, useRef } from 'react';

export default function Navbar({ onNavClick }) {
  const navRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      const nav = navRef.current;
      if (!nav) return;
      if (window.scrollY > 10) {
        nav.style.boxShadow = '0 1px 12px rgba(0,0,0,.06)';
      } else {
        nav.style.boxShadow = 'none';
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
  ];

  function handleClick(e, sectionId) {
    e.preventDefault();
    onNavClick(sectionId);
  }

  return (
    <nav id="navbar" ref={navRef}>
      <div className="nav-inner">
        <a
          href="#home"
          className="nav-logo"
          id="nav-logo"
          onClick={(e) => handleClick(e, 'home')}
        >
          Mark Warren Flores
        </a>
        <ul className="nav-links">
          {links.map((link, i) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                id={`nl-${i}`}
                onClick={(e) => handleClick(e, link.id)}
              >
                <span className="nav-visible">{link.label}</span>
                <span className="nav-hidden">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="nav-cta"
          id="nav-cta"
          onClick={(e) => handleClick(e, 'contact')}
        >
          Let&apos;s Talk
        </a>
      </div>
    </nav>
  );
}
