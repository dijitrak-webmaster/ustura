export default function AynaRibbon({ items }) {
  const doubled = [...items, ...items];

  return (
    <div className="border-y border-[#F1ECE2]/10 py-3.5">
      <div className="ayna-ribbon-track">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="ayna-label flex items-center gap-6 pr-6 text-[#F1ECE2]/45">
            {item}
            <span className="text-[#C9A15A]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}