const items = [
  'Administrative Support',
  'Customer Service',
  'Digital Marketing',
  'Website Management',
  'Finance & Bookkeeping',
  'Workflow Automation',
];

export default function Marquee() {
  // Double the items for seamless infinite scroll
  const doubled = [...items, ...items];

  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item}
            <span className="marquee-dot">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
