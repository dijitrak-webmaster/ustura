import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { salon } from '@/data/salonContent';
import Mirrored from './Mirrored';

export default function AynaCta({ image }) {
  return (
    <section id="randevu" className="relative scroll-mt-24 overflow-hidden px-5 py-16 md:px-10 md:py-24">
      <div className="absolute inset-0" aria-hidden="true">
        <Image src={image} alt="" className="h-full w-full object-cover opacity-30" fittingType="fill" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060708] via-[#060708]/80 to-[#060708]" />
      </div>

      <div className="relative mx-auto max-w-[1180px]">
        <span className="ayna-label text-[#C9A15A]">SANDALYE BOŞ</span>

        <Mirrored className="mt-4" fade="h-[80px] md:h-[130px]">
          <h2 className="ayna-display text-[52px] sm:text-[76px] md:text-[104px]">
            SAATİNİ SEÇ,
            <br />
            <span className="text-[#C9A15A]">GERİSİNİ BIRAK.</span>
          </h2>
        </Mirrored>

        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_0.75fr] md:items-end md:gap-14">
          <div>
            <p className="max-w-[46ch] text-[13px] leading-[1.75] text-[#F1ECE2]/60 md:text-[14px]">
              Bugün için son müsait saatler 16:30 ve 18:00. Randevunuz salon onayına düşer, telefonla
              kesinleşir.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/randevu"
                className="ayna-label bg-[#C9A15A] px-5 py-3.5 text-[#060708] transition-colors duration-200 hover:bg-[#E0BC7C]"
              >
                Randevu Oluştur ↗
              </Link>
              <a
                href={`tel:${salon.phone.replace(/\s/g, '')}`}
                className="ayna-label border border-[#F1ECE2]/25 px-5 py-3.5 text-[#F1ECE2]/80"
              >
                {salon.phone}
              </a>
            </div>
          </div>

          <div className="border-t border-[#F1ECE2]/15">
            {salon.hours.map((h) => (
              <div
                key={h.day}
                className="flex justify-between border-b border-[#F1ECE2]/10 py-2.5 text-[11px] tracking-[0.06em] md:text-[12px]"
              >
                <span className="text-[#F1ECE2]/55">{h.day}</span>
                <span className={h.time === 'Kapalı' ? 'text-[#F1ECE2]/25' : 'text-[#F1ECE2]/85'}>
                  {h.time}
                </span>
              </div>
            ))}
            <p className="ayna-label mt-4 text-[#F1ECE2]/40">{salon.address}</p>
          </div>
        </div>
      </div>
    </section>
  );
}