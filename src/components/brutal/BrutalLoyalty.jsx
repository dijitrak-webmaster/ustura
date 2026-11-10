import { Link } from 'react-router-dom';
import SectionHead from './SectionHead';

const punches = Array.from({ length: 10 }, (_, i) => i < 7);

export default function BrutalLoyalty() {
  return (
    <section id="uyelik" className="scroll-mt-24 px-5 py-16 md:px-10 md:py-[90px]">
      <SectionHead
        tag="SADAKAT"
        index="08"
        title="ON TIRAŞ,"
        accent="BİRİSİ BİZDEN."
        copy="Her kesimde kart bir delik daha alır. Onuncu damgadan sonraki tıraş atölyeden. Kart kişiye özel, devredilemez."
      />

      <div className="grid items-center gap-8 md:grid-cols-[1fr_1fr] md:gap-12">
        <div className="relative rotate-[-1deg] border-2 border-[#16130F] bg-[#D8D5CD] p-5 shadow-[10px_10px_0_#16130F] md:p-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[9px] tracking-[0.2em] md:text-[10px]">MERT KUAFÖR · ÜYELİK</p>
              <p className="mt-1 text-[20px] leading-none tracking-[-0.05em] md:text-[26px]">
                TIRAŞ KARTI
              </p>
            </div>
            <span className="border-2 border-[#16130F] bg-[#F2C230] px-2 py-1 text-[9px] tracking-[0.12em] md:text-[10px]">
              NO 0142
            </span>
          </div>

          <div className="my-4 border-t-2 border-dashed border-[#16130F]" />

          <div className="grid grid-cols-5 gap-2">
            {punches.map((filled, i) => (
              <span
                key={i}
                className={`flex aspect-square items-center justify-center border-2 border-[#16130F] text-[11px] md:text-[13px] ${
                  filled ? 'bg-[#FF4A1C] text-[#16130F]' : 'bg-transparent text-[#16130F]/40'
                }`}
              >
                {filled ? '✂' : String(i + 1).padStart(2, '0')}
              </span>
            ))}
          </div>

          <div className="my-4 border-t-2 border-dashed border-[#16130F]" />

          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] tracking-[0.14em]">7 / 10 DAMGA</p>
              <p className="b-copy mt-1 text-[11px] leading-[1.6]">
                Üç kesim sonra sıradaki tıraş hediye.
              </p>
            </div>
            <span className="rotate-[-6deg] border-2 border-[#FF4A1C] px-3 py-1 text-[10px] tracking-[0.18em] text-[#FF4A1C]">
              ÜYE
            </span>
          </div>
        </div>

        <div>
          <p className="b-copy text-[13px] leading-[1.75] md:text-[15px]">
            Kart, ilk randevuda tezgâhta verilir. Nakit ya da kartla ödeme fark etmez; damga her
            seansın sonunda basılır. Kart kaybolursa geçmiş damgalar uygulamadaki randevu
            geçmişinden yeniden işlenir.
          </p>

          <ul className="mt-6 space-y-2 text-[11px] tracking-[0.08em] md:text-[12px]">
            {['DAMGA HER SEANSTA', 'ONUNCU TIRAŞ HEDİYE', 'KİŞİYE ÖZEL, DEVREDİLEMEZ'].map((li) => (
              <li key={li} className="flex items-center gap-2 border-b-2 border-[#16130F]/15 pb-2">
                <span className="h-2 w-2 shrink-0 bg-[#FF4A1C]" />
                {li}
              </li>
            ))}
          </ul>

          <Link to="/randevu" className="b-btn mt-6">
            KARTI ALMAK İÇİN RANDEVU ↘
          </Link>
        </div>
      </div>
    </section>
  );
}