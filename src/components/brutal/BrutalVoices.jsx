import SectionHead from './SectionHead';

export default function BrutalVoices({ items }) {
  return (
    <section
      id="yorumlar"
      className="scroll-mt-24 bg-[#16130F] px-5 py-16 text-[#D8D5CD] md:px-10 md:py-[90px]"
    >
      <SectionHead tag="YORUMLAR" index="04" title="SANDALYEDEN" accent="DUYULANLAR." dark />

      <div className="grid grid-cols-1 gap-[30px] md:grid-cols-3">
        {items.map((t) => (
          <div key={t.name} className="b-qt">
            <div>
              <div className="flex gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i key={i} className="b-star" />
                ))}
              </div>
              <p className="b-quote mt-[22px] text-[21px] leading-[1.35] md:text-[24px]">
                “{t.quote}”
              </p>
            </div>
            <div className="mt-7 border-t-2 border-dashed border-[#16130F] pt-3.5">
              <b className="block text-[13px] tracking-[0.12em] md:text-[14px]">{t.name}</b>
              <span className="text-[10px] tracking-[0.14em] text-[#FF4A1C] md:text-[11px]">
                {t.detail}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}