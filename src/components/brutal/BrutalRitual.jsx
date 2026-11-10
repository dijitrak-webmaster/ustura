import SectionHead from './SectionHead';

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

export default function BrutalRitual() {
  return (
    <section id="rituel" className="scroll-mt-24 px-5 py-16 md:px-10 md:py-[90px]">
      <SectionHead
        tag="RİTÜEL"
        index="06"
        title="SANDALYEDE"
        accent="GEÇEN KIRK DAKİKA."
        copy="Acele yok, sıra yok, sürpriz yok. Her randevu tek müşteriye ayrılır."
      />

      <div className="grid grid-cols-1 border-2 border-[#16130F] md:grid-cols-3">
        {steps.map((step, i) => (
          <div
            key={step.no}
            className={`bg-[#D8D5CD] p-[30px] transition-transform duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#F2C230] ${
              i < steps.length - 1 ? 'border-b-2 border-[#16130F] md:border-b-0 md:border-r-2' : ''
            }`}
          >
            <b className="b-num">{step.no}</b>
            <h3 className="mt-2.5 text-[30px] leading-none tracking-[-0.06em] md:text-[40px]">
              {step.title}
            </h3>
            <p className="b-copy mt-3.5 text-[13px] leading-[1.6]">{step.body}</p>
            <small className="mt-[18px] block border-t-2 border-dashed border-[#16130F] pt-3 text-[11px] tracking-[0.14em]">
              {step.detail}
            </small>
          </div>
        ))}
      </div>
    </section>
  );
}