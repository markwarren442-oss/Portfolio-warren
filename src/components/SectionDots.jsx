import { useEffect, useState } from 'react';

const sectionIds = ['home', 'about', 'services', 'portfolio', 'certifications', 'contact'];

export default function SectionDots({ onDotClick }) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionIds.indexOf(entry.target.id);
            if (idx >= 0) setActiveIdx(idx);
          }
        });
      },
      { threshold: 0.35 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div id="section-dots">
      {sectionIds.map((id, i) => (
        <div
          key={id}
          className={`s-dot${i === activeIdx ? ' active' : ''}`}
          data-target={id}
          onClick={() => onDotClick(id)}
        ></div>
      ))}
    </div>
  );
}
