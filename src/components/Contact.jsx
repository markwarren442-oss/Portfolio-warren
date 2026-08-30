export default function Contact({ onOpenContactModal }) {
  return (
    <section id="contact">
      <div className="contact-inner" data-reveal="up">
        <p className="section-label">Get In Touch</p>
        <h2 className="contact-title">
          Let&apos;s work
          <br />
          <em>together.</em>
        </h2>
        <p className="contact-sub">
          Available for freelance and remote opportunities worldwide.
        </p>
        <button
          onClick={onOpenContactModal}
          className="btn btn-gold"
          id="contact-send-btn"
          style={{ border: 'none', cursor: 'pointer' }}
        >
          <span className="btn-shimmer"></span>
          Send a Message <i className="bx bx-send"></i>
        </button>
      </div>
    </section>
  );
}
