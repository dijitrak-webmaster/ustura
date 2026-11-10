import AynaSection from './AynaSection';

const reasons = [
  {
    n: '01',
    t: 'TEK KULLANIMLIK JİLET',
    d: 'Her tıraşta yeni jilet, steril tezgâh. Aynı jilet ikinci bir surata girmez.',
  },
  {
    n: '02',
    t: 'ÜÇ PERDE SICAK HAVLU',
    d: 'Yüzü yumuşatan üç perde sıcak havlu, kapanışta tek perde soğuk kompres.',
  },
  {
    n: '03',
    t: 'SAATİNE SADIK RANDEVU',
    d: 'Sandalye senin adına ayrılır. Bekleme yok, sıkışma yok, acele yok.',
  },
  {
    n: '04',
    t: 'SESSİZ ATÖLYE',
    d: 'Müzik kısık, sohbet isteğe bağlı. Bazı müşteriler yalnızca sessizlik ister.',
  },
];

export default function AynaRules() {
  return (
    <AynaSection
      id="neden"
      tag="NEDEN USTURA"
      title="DÖRT KURAL,"
      accent="SIFIR TAVİZ."
      copy="Atölyede hız değil, tekrar denenebilirlik önemli. Her kesim aynı dört kuralın üzerine kurulur."
    >
      <div className="grid gap-x-10 gap-y-1 sm:grid-cols-2">
        {reasons.map((r) => (
          <div
            key={r.n}
            className="group flex gap-4 border-t border-[#F1ECE2]/12 py-6 transition-colors duration-300 hover:border-[#C9A15A]/60"
          >
            <span className="ayna-label pt-1 text-[#C9A15A]/70">{r.n}</span>
            <div>
              <h3 className="font-heading text-[16px] leading-[1.2] tracking-[-0.02em] md:text-[18px]">
                {r.t}
              </h3>
              <p className="mt-2 text-[12px] leading-[1.75] text-[#F1ECE2]/55 md:text-[13px]">{r.d}</p>
            </div>
          </div>
        ))}
      </div>
    </AynaSection>
  );
}