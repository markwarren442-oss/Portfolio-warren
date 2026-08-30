import { socialLinks } from '../data/socials';

export default function Footer() {
  return (
    <footer>
      <a href="#home" className="footer-logo">
        MWF.
      </a>
      <p className="footer-copy">© 2026 Mark Warren Flores. All rights reserved.</p>
      <div className="footer-socials">
        {socialLinks.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="footer-soc"
            title={item.name}
          >
            <i className={item.icon}></i>
          </a>
        ))}
      </div>
    </footer>
  );
}
