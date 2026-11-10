import AynaSection from './AynaSection';

const steps = [
  {
    no: '01',
    title: 'ÖLÇÜ',
    body: 'Yüz hattınız, saç yönünüz, sakal çıkışınız. Makas değmeden önce on dakika sadece bakıyoruz.',
    detail: 'AYNA · CETVEL · IŞIK',
  },
  {
    no: '02',
    title: 'KESİM',
    body: 'Makas yavaş, makine kontrollü. Her geçişte aynayı size çevirip onay alıyoruz; sürpriz yok.',
    detail: 'MAKAS · MAKİNE · TARAK',
  },
  {
    no: '03',
    title: 'BİTİŞ',
    body: 'Sıcak havlu, soğuk kompres, son kontur. Sandalyeden kalktığınızda çizgi yerinde kalıyor.',
    detail: 'USTURA · HAVLU · KOLONYA',
  },
];

export default function AynaRitual() {
  return (
    <AynaSection
      id="rituel"
      tag="RİTÜEL / ÜÇ ADIM"
      title="SANDALYEDE"
      accent="GEÇEN KIRK DAKİKA."
      copy="Acele yok, sıra yok, sürpriz yok. Her randevu tek müşteriye ayrılır."
    >
      <div className="border-t border-[#F1ECE2]/12">
        {steps.map((step) => (
          <div
            key={step.no}
            className="group grid gap-3 border-b border-[#F1ECE2]/12 py-7 md:grid-cols-[110px_1fr_0.9fr] md:items-baseline md:gap-8 md:py-9"
          >
            <span className="ayna-display text-[34px] text-[#C9A15A]/70 transition-colors duration-300 group-hover:text-[#C9A15A] md:text-[46px]">
              {step.no}
            </span>
            <h3 className="ayna-display text-[30px] transition-transform duration-300 md:text-[42px] md:group-hover:translate-x-1.5">
              {step.title}
            </h3>
            <div>
              <p className="text-[13px] leading-[1.7] text-[#F1ECE2]/60 md:text-[14px]">{step.body}</p>
              <small className="ayna-label mt-3 block text-[#C9A15A]/80">{step.detail}</small>
            </div>
          </div>
        ))}
      </div>
    </AynaSection>
  );
}