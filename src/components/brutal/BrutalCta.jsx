import { Link } from 'react-router-dom';
import { salon } from '@/data/salonContent';

export default function BrutalCta({ image }) {
  return (
    <section id="randevu" className="b-cta scroll-mt-24">
      <div className="b-cta-bg" aria-hidden="true">
        <img src={image} alt="" />
      </div>

      <div className="relative grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-[60px]">
        <div>
          <span className="inline-block rotate-[-2deg] border-2 border-[#D8D5CD] bg-[#FF4A1C] px-3 py-1.5 text-[11px] tracking-[0.16em] text-[#16130F] md:text-[12px]">
            SANDALYE BOŞ
          </span>
          <h2 className="mt-[18px] rotate-[-1deg] text-[32px] leading-[0.92] tracking-[-0.07em] sm:text-[42px] md:text-[64px] xl:text-[100px]">
            SAATİNİ SEÇ,
            <br />
            <em className="inline-block max-w-full bg-[#FF4A1C] px-2 not-italic text-[#16130F] md:px-3">
              GERİSİNİ BIRAK.
            </em>
          </h2>
          <p className="b-copy mt-[26px] max-w-[460px] text-[14px] leading-[1.6]">
            Bugün için son müsait saatler 16:30 ve 18:00. Randevunuz salon onayına düşer, telefonla
            kesinleşir.
          </p>
          <div className="mt-[34px] flex flex-wrap gap-4">
            <Link to="/randevu" className="b-btn b-btn-y">
              Randevu Oluştur ↗
            </Link>
            <a href={`tel:${salon.phone.replace(/\s/g, '')}`} className="b-btn b-btn-w">
              {salon.phone}
            </a>
          </div>
        </div>

        <div className="border-2 border-[#D8D5CD] bg-[#D8D5CD] p-7 text-[#16130F] shadow-[10px_10px_0_#FF4A1C]">
          {salon.hours.map((h) => (
            <div
              key={h.day}
              className="flex justify-between border-b-2 border-dashed border-[#16130F] py-3 text-[12px] tracking-[0.08em] last:border-0 md:text-[13px]"
            >
              <span>{h.day}</span>
              <span className={h.time === 'Kapalı' ? 'opacity-40' : ''}>{h.time}</span>
            </div>
          ))}
          <div className="mt-[14px] border-2 border-[#16130F] bg-[#F2C230] p-[14px] text-[12px] tracking-[0.08em] md:text-[13px]">
            {salon.address}
          </div>
        </div>
      </div>
    </section>
  );
}