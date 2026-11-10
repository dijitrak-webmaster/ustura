export default function CutRule({ label }) {
  return (
    <div className="b-cut" aria-hidden="true">
      <span className="b-cut-line" />
      <span className="b-cut-scissors">✂</span>
      {label && <span className="b-cut-label">{label}</span>}
      <span className="b-cut-line" />
    </div>
  );
}