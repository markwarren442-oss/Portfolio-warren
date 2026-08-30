import { useRef } from 'react';
import { projects } from '../data/projects';

export default function Portfolio() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="portfolio">
      <div className="container">
        <div className="portfolio-header" data-reveal="up">
          <div>
            <p className="section-label">Experience</p>
            <h2 className="section-title">Selected Projects</h2>
          </div>
          <div className="portfolio-nav-btns">
            <button
              className="proj-nav-btn"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              title="Previous project"
            >
              <i className="bx bx-chevron-left"></i>
            </button>
            <button
              className="proj-nav-btn"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              title="Next project"
            >
              <i className="bx bx-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* Horizontal scrollable track */}
        <div className="projects-carousel-wrap" data-reveal="up">
          <div className="projects-carousel" ref={scrollContainerRef}>
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-tag">{project.tag}</div>
                <div className="project-title">{project.title}</div>
                <p className="project-desc">{project.desc}</p>

                {project.tech && project.tech.length > 0 && (
                  <div className="project-tech-stack">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="project-tech-badge">
                        {t.icon === 'laravel' ? (
                          <svg
                            viewBox="0 0 24 24"
                            width="14"
                            height="14"
                            fill="currentColor"
                            className="laravel-icon"
                            style={{ flexShrink: 0 }}
                          >
                            <path d="M21.579 6.877l-4.133-2.385a1.86 1.86 0 0 0-1.859 0L7.754 9.006a1.86 1.86 0 0 0-.93 1.611v7.625l-2.79 1.611V9.923l4.649-2.684-1.395-.805L2.64 9.118a1.86 1.86 0 0 0-.93 1.611v9.645c0 .667.357 1.284.93 1.614l5.578 3.22a1.86 1.86 0 0 0 1.86 0l9.303-5.371a1.86 1.86 0 0 0 .93-1.614v-7.625l2.79-1.611v9.929l-4.649 2.684 1.395.805 4.649-2.684a1.86 1.86 0 0 0 .93-1.614V8.488a1.86 1.86 0 0 0-.93-1.611zM9.613 23.633L4.035 20.41v-7.625l5.578 3.22v7.628zm1.859-9.522l-5.578-3.22 7.438-4.295 5.578 3.22-7.438 4.295zm7.438 4.966l-5.578 3.22v-7.625l5.578-3.22v7.625z" />
                          </svg>
                        ) : (
                          <i className={t.icon}></i>
                        )}
                        {t.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="project-links-bar">
                  <a
                    href={project.liveUrl || '#'}
                    target={project.liveUrl && project.liveUrl !== '#' ? '_blank' : undefined}
                    rel="noreferrer"
                    className="project-btn btn-live"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!project.liveUrl || project.liveUrl === '#') e.preventDefault();
                    }}
                  >
                    <i className="bx bx-link-external"></i> Live Site
                  </a>
                  <a
                    href={project.githubUrl || 'https://github.com/markwarren442'}
                    target={project.githubUrl && project.githubUrl !== '#' ? '_blank' : undefined}
                    rel="noreferrer"
                    className="project-btn btn-github"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!project.githubUrl || project.githubUrl === '#') e.preventDefault();
                    }}
                  >
                    <i className="bx bxl-github"></i> GitHub
                  </a>
                  <a
                    href={project.figmaUrl || '#'}
                    target={project.figmaUrl && project.figmaUrl !== '#' ? '_blank' : undefined}
                    rel="noreferrer"
                    className="project-btn btn-figma"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!project.figmaUrl || project.figmaUrl === '#') e.preventDefault();
                    }}
                  >
                    <i className="bx bxl-figma"></i> Figma
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-hint-row">
          <span>
            <i className="bx bx-left-arrow-alt"></i> Scroll or swipe horizontally to view all projects{' '}
            <i className="bx bx-right-arrow-alt"></i>
          </span>
        </div>
      </div>
    </section>
  );
}
