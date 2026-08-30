import { useState, useRef, useCallback, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import PageWipe from './components/PageWipe';
import ProgressBar from './components/ProgressBar';
import SectionDots from './components/SectionDots';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ServiceModal from './components/modals/ServiceModal';
import InfoModal from './components/modals/InfoModal';
import ContactModal from './components/modals/ContactModal';
import ResumeModal from './components/modals/ResumeModal';
import CertLightbox from './components/modals/CertLightbox';

export default function App() {
  const wipeRef = useRef(null);

  // Modal state
  const [serviceModalId, setServiceModalId] = useState(null);
  const [infoModalKey, setInfoModalKey] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [certLightboxKey, setCertLightboxKey] = useState(null);

  // Wipe-transition navigation
  const navigateTo = useCallback((sectionId) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    if (wipeRef.current) {
      wipeRef.current.wipeTransition(() => {
        target.scrollIntoView({ behavior: 'instant' });
      });
    }
  }, []);

  // Setup scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const delay = parseInt(entry.target.dataset.delay || '0', 10);
          setTimeout(() => entry.target.classList.add('in-view'), delay);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <CustomCursor />
      <PageWipe ref={wipeRef} />
      <ProgressBar />
      <SectionDots onDotClick={navigateTo} />
      <Navbar onNavClick={navigateTo} />

      <Hero
        onOpenResumeModal={() => setResumeOpen(true)}
        onOpenInfoModal={(key) => setInfoModalKey(key)}
        onNavClick={navigateTo}
      />
      <Marquee />
      <About onOpenInfoModal={(key) => setInfoModalKey(key)} />
      <Services onOpenServiceModal={(id) => setServiceModalId(id)} />
      <Portfolio />
      <Certifications onOpenCertModal={(key) => setCertLightboxKey(key)} />
      <Contact onOpenContactModal={() => setContactOpen(true)} />
      <Footer />

      {/* Modals */}
      <ServiceModal
        serviceId={serviceModalId}
        onClose={() => setServiceModalId(null)}
      />
      <InfoModal
        infoKey={infoModalKey}
        onClose={() => setInfoModalKey(null)}
        onOpenCertModal={(key) => setCertLightboxKey(key)}
      />
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
      <CertLightbox
        certKey={certLightboxKey}
        onClose={() => setCertLightboxKey(null)}
      />
    </>
  );
}
