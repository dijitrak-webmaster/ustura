import SectionHead from './SectionHead';

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

export default function BrutalWhy() {
  return (
    <section id="neden" className="scroll-mt-24 px-5 py-16 md:px-10 md:py-[90px]">
      <SectionHead
        tag="NEDEN MERT KUAFÖR"
        index="07"
        title="DÖRT KURAL,"
        accent="SIFIR TAVİZ."
        copy="Atölyede hız değil, tekrar denenebilirlik önemli. Her kesim aynı dört kuralın üzerine kurulur."
      />

      <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
        {reasons.map((r) => (
          <article key={r.n} className="b-pt">
            <span className="block text-[34px] leading-none tracking-[-0.07em] text-[#FF4A1C] md:text-[44px]">
              {r.n}
            </span>
            <h3 className="mt-4 text-[15px] leading-[1.15] tracking-[-0.02em] md:text-[16px]">
              {r.t}
            </h3>
            <p className="b-copy mt-2 text-[12px] leading-[1.65]">{r.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}