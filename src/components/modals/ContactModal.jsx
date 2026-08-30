import { useState, useEffect, useRef } from 'react';

const WEB3FORMS_KEY = '7604252b-8b28-479a-8bc4-b6f35a7598ca';

export default function ContactModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Reset form
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setError('');
    setSending(false);
    setSuccess(false);

    const modal = modalRef.current;
    modal.classList.add('cm-open');
    requestAnimationFrame(() =>
      requestAnimationFrame(() => modal.classList.add('cm-visible'))
    );
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  function handleClose() {
    const modal = modalRef.current;
    modal.classList.remove('cm-visible');
    setTimeout(() => {
      modal.classList.remove('cm-open');
      onClose();
    }, 450);
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && isOpen) handleClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  async function handleSubmit() {
    setError('');

    if (!name || !email || !subject || !message) {
      setError('Please fill in all fields before sending.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSending(true);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject,
          from_name: name,
          email,
          message,
          botcheck: '',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        throw new Error(data.message || 'Send failed');
      }
    } catch (err) {
      setSending(false);
      setError('Could not send. Please email markwarren442@gmail.com directly.');
      console.error('Web3Forms error:', err);
    }
  }

  return (
    <div id="contact-modal" role="dialog" aria-modal="true" ref={modalRef}>
      <div id="contact-modal-blur" onClick={handleClose}></div>
      <div id="contact-modal-box">
        <button id="contact-modal-close" onClick={handleClose} aria-label="Close">
          <i className="bx bx-x"></i>
        </button>

        {/* Form view */}
        {!success && (
          <div id="cm-form-view">
            <p className="cm-header-label">Get In Touch</p>
            <h2 className="cm-header-title" id="cm-title">
              Send a Message
            </h2>
            <p className="cm-header-sub">
              Fill in the form below and your message will be sent directly to my inbox.
            </p>

            <div className="cm-row">
              <div className="cm-field">
                <label htmlFor="cm-name">Your Name</label>
                <input
                  type="text"
                  id="cm-name"
                  placeholder="e.g. Jane Smith"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="cm-field">
                <label htmlFor="cm-email">Your Email</label>
                <input
                  type="email"
                  id="cm-email"
                  placeholder="jane@email.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="cm-field">
              <label htmlFor="cm-subject">Subject</label>
              <input
                type="text"
                id="cm-subject"
                placeholder="e.g. VA Inquiry – Available for a call?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="cm-field">
              <label htmlFor="cm-message">Message</label>
              <textarea
                id="cm-message"
                placeholder="Hi Mark, I'd like to discuss..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            {error && (
              <p style={{ color: '#c0392b', fontSize: '.85rem', marginBottom: '12px' }}>
                {error}
              </p>
            )}

            <button
              onClick={handleSubmit}
              className="btn btn-gold"
              id="cm-submit"
              disabled={sending}
            >
              <span className="btn-shimmer"></span>
              {!sending ? (
                <span>
                  <i className="bx bx-send"></i> Send Message
                </span>
              ) : (
                <span>
                  <i
                    className="bx bx-loader-alt"
                    style={{ animation: 'cm-spin .8s linear infinite' }}
                  ></i>{' '}
                  Sending…
                </span>
              )}
            </button>
          </div>
        )}

        {/* Success view */}
        {success && (
          <div id="cm-success" className="cm-show">
            <div className="cm-success-icon">
              <i className="bx bx-check"></i>
            </div>
            <p className="cm-success-title">Message Sent!</p>
            <p className="cm-success-sub">
              Thank you for reaching out! I&apos;ll get back to you within 24 hours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
