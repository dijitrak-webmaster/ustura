import { Link } from 'react-router-dom';
import AynaSection from './AynaSection';

const punches = Array.from({ length: 10 }, (_, i) => i < 7);

export default function AynaLoyalty() {
  return (
    <AynaSection
      id="uyelik"
      tag="SADAKAT"
      title="ON TIRAŞ,"
      accent="BİRİSİ BİZDEN."
      copy="Her kesimde kart bir delik daha alır. Onuncu damgadan sonraki tıraş atölyeden. Kart kişiye özel, devredilemez."
    >
      <div className="grid items-center gap-10 md:grid-cols-[0.95fr_1fr] md:gap-16">
        <div className="ayna-sheen relative overflow-hidden border border-[#F1ECE2]/20 p-5 md:p-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="ayna-label text-[#F1ECE2]/45">USTURA · ÜYELİK</p>
              <p className="ayna-display mt-1.5 text-[26px] md:text-[32px]">TIRAŞ KARTI</p>
            </div>
            <span className="ayna-label border border-[#C9A15A]/60 px-2 py-1 text-[#C9A15A]">NO 0142</span>
          </div>

          <div className="my-5 h-px bg-[#F1ECE2]/15" />

          <div className="grid grid-cols-5 gap-2">
            {punches.map((filled, i) => (
              <span
                key={i}
                className={`flex aspect-square items-center justify-center border text-[11px] ${
                  filled
                    ? 'border-[#C9A15A] bg-[#C9A15A] text-[#060708]'
                    : 'border-[#F1ECE2]/20 text-[#F1ECE2]/30'
                }`}
              >
                {filled ? '✕' : String(i + 1).padStart(2, '0')}
              </span>
            ))}
          </div>

          <div className="my-5 h-px bg-[#F1ECE2]/15" />

          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="ayna-label text-[#F1ECE2]/70">7 / 10 DAMGA</p>
              <p className="mt-1.5 text-[11px] leading-[1.6] text-[#F1ECE2]/40">
                Üç kesim sonra sıradaki tıraş hediye.
              </p>
            </div>
            <span className="ayna-label border border-[#C9A15A]/50 px-2.5 py-1 text-[#C9A15A]">ÜYE</span>
          </div>
        </div>

        <div>
          <p className="text-[13px] leading-[1.8] text-[#F1ECE2]/65 md:text-[15px]">
            Kart, ilk randevuda tezgâhta verilir. Nakit ya da kartla ödeme fark etmez; damga her
            seansın sonunda basılır. Kart kaybolursa geçmiş damgalar uygulamadaki randevu
            geçmişinden yeniden işlenir.
          </p>
          <ul className="mt-6 space-y-3">
            {['DAMGA HER SEANSTA', 'ONUNCU TIRAŞ HEDİYE', 'KİŞİYE ÖZEL, DEVREDİLEMEZ'].map((li) => (
              <li key={li} className="ayna-label flex items-center gap-3 border-b border-[#F1ECE2]/10 pb-3 text-[#F1ECE2]/60">
                <span className="h-1 w-1 shrink-0 bg-[#C9A15A]" />
                {li}
              </li>
            ))}
          </ul>
          <Link
            to="/randevu"
            className="ayna-label mt-7 inline-flex border border-[#C9A15A] px-5 py-3.5 text-[#C9A15A] transition-colors duration-200 hover:bg-[#C9A15A] hover:text-[#060708]"
          >
            Kartı almak için randevu ↘
          </Link>
        </div>
      </div>
    </AynaSection>
  );
}