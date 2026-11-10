export default function BrutalMarquee({ items }) {
  const doubled = [...items, ...items];

  return (
    <div className="b-mq">
      <div className="b-mq-track">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`}>
            {item} ✕
          </span>
        ))}
      </div>
    </div>
  );
}