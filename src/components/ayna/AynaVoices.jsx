import AynaSection from './AynaSection';

export default function AynaVoices({ items }) {
  return (
    <AynaSection
      id="yorumlar"
      tag="04 / YORUMLAR"
      title="SANDALYEDEN"
      accent="DUYULANLAR."
    >
      <div className="grid gap-8 md:grid-cols-3 md:gap-10">
        {items.map((item) => (
          <figure key={item.name} className="border-t border-[#F1ECE2]/15 pt-6">
            <span className="ayna-display block text-[40px] leading-none text-[#C9A15A]/40">”</span>
            <blockquote className="mt-2 font-heading text-[16px] leading-[1.5] text-[#F1ECE2]/85 md:text-[18px]">
              {item.quote}
            </blockquote>
            <figcaption className="mt-6">
              <b className="ayna-label block text-[#F1ECE2]/80">{item.name}</b>
              <span className="ayna-label mt-1 block text-[#C9A15A]/70">{item.detail}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </AynaSection>
  );
}