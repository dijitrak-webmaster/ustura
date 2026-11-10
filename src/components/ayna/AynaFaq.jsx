import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AynaSection from './AynaSection';

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

export default function AynaFaq() {
  const [open, setOpen] = useState(0);

  return (
    <AynaSection
      id="sss"
      tag="SSS"
      title="MERAK EDİLEN"
      accent="BEŞ SORU."
      copy="Aklınızda kalan varsa telefonda tek cümlede cevaplıyoruz. Buradakiler en sık sorulanlar."
    >
      <div className="border-t border-[#F1ECE2]/12">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="border-b border-[#F1ECE2]/12">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="flex items-start gap-3">
                  <span className="ayna-label pt-0.5 text-[#C9A15A]/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-heading text-[14px] leading-[1.3] tracking-[-0.01em] md:text-[16px]">
                    {f.q}
                  </span>
                </span>
                <span
                  className={`ayna-display shrink-0 text-[22px] transition-colors duration-200 ${
                    isOpen ? 'text-[#C9A15A]' : 'text-[#F1ECE2]/40'
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
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[70ch] pb-5 pl-[30px] text-[12px] leading-[1.75] text-[#F1ECE2]/55 md:pl-[34px] md:text-[13px]">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </AynaSection>
  );
}