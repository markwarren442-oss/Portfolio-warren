const serviceCards = [
  { id: 1, icon: 'bx-task', num: '01', title: 'Administrative & Executive Support', peek: 'Email management, calendar coordination, document preparation & travel planning.' },
  { id: 2, icon: 'bx-headphone', num: '02', title: 'Customer Service', peek: 'Inquiry handling, issue resolution, and seamless client onboarding workflows.' },
  { id: 3, icon: 'bx-bar-chart-alt-2', num: '03', title: 'Digital Marketing & Social Media', peek: 'Post scheduling, email funnels, SEO content formatting & affiliate management.' },
  { id: 4, icon: 'bx-code-block', num: '04', title: 'Technical & Website Management', peek: 'Plugin updates, CRM setup, workflow automation & media production.' },
  { id: 5, icon: 'bx-calculator', num: '05', title: 'Finance & Bookkeeping', peek: 'Invoicing, QuickBooks/Xero reconciliation & contractor payment tracking.' },
  { id: 6, icon: 'bx-code-alt', num: '06', title: 'Web Development', peek: 'Building modern, responsive, and performance-optimized websites using clean code and SEO best practices.' },
];

export default function Services({ onOpenServiceModal }) {
  return (
    <section id="services">
      <div className="container">
        <div className="services-intro" data-reveal="up">
          <p className="section-label">What I Offer</p>
          <h2 className="section-title">VA Services &amp; Capabilities</h2>
          <p>
            A highly versatile range of services allowing businesses and professionals to delegate
            tasks and focus on their core goals — from daily ops to complex technical systems.
          </p>
        </div>
        <div className="services-grid">
          {serviceCards.map((card, i) => (
            <div
              key={card.id}
              className="service-card"
              data-reveal="up"
              data-delay={String(i * 90)}
              onClick={() => onOpenServiceModal(card.id)}
            >
              <div className="service-icon">
                <i className={`bx ${card.icon}`}></i>
              </div>
              <div className="service-num">{card.num}</div>
              <div className="service-title">{card.title}</div>
              <div className="service-peek">{card.peek}</div>
              <div className="service-cta">Details →</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
