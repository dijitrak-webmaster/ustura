import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHead from './SectionHead';

const faqs = [
  {
    q: 'RANDEVUSUZ GELEBİLİR MİYİM?',
    a: 'Müsaitlik varsa alırız, ama garanti yok. Hafta sonu ve akşam saatlerinde randevu olmadan gelen misafiri geri çevirmek zorunda kalıyoruz.',
  },
  {
    q: 'BİR KESİM NE KADAR SÜRÜYOR?',
    a: 'Klasik kesim 30, ustura tıraşı 40, saç + sakal ritüeli 60 dakika. Süre, saçın yoğunluğuna göre 10 dakikaya kadar uzayabilir.',
  },
  {
    q: 'ÖDEME NASIL YAPILIYOR?',
    a: 'Nakit ve tüm kredi kartları geçerli. Ödeme tezgâhta, kesim bittikten sonra alınır; ön ödeme istemiyoruz.',
  },
  {
    q: 'ÇOCUK KESİMİ YAPIYOR MUSUNUZ?',
    a: 'Evet. Sabırlı ellerle çalışan bir sandalyemiz var; kesim sonrası küçük bir ödül de bizden.',
  },
  {
    q: 'RANDEVUMU NASIL İPTAL EDERİM?',
    a: 'Randevudan 2 saat öncesine kadar telefonla arayın ya da paneldeki randevu kaydını iptal edin. Aynı gün iptallerde kart damgası düşülmez.',
  },
];

export default function BrutalFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="sss" className="scroll-mt-24 px-5 py-16 md:px-10 md:py-[90px]">
      <SectionHead
        tag="SSS"
        index="09"
        title="MERAK EDİLEN"
        accent="BEŞ SORU."
        copy="Aklınızda kalan varsa telefonda tek cümlede cevaplıyoruz. Buradakiler en sık sorulanlar."
      />

      <div className="border-2 border-[#16130F] bg-[#D8D5CD] shadow-[8px_8px_0_#16130F]">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className={i > 0 ? 'border-t-2 border-[#16130F]' : ''}>
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left md:px-6 md:py-5"
              >
                <span className="flex items-start gap-3">
                  <span className="mt-[1px] text-[10px] tracking-[0.12em] text-[#FF4A1C]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[13px] leading-[1.2] tracking-[-0.01em] md:text-[15px]">
                    {f.q}
                  </span>
                </span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center border-2 border-[#16130F] text-[14px] ${
                    isOpen ? 'bg-[#FF4A1C]' : 'bg-transparent'
                  }`}
                >
                  {isOpen ? '–' : '+'}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="b-copy px-4 pb-4 pl-[42px] text-[12px] leading-[1.7] md:px-6 md:pb-5 md:pl-[64px] md:text-[13px]">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}