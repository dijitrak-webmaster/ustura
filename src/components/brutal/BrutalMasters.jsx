import { Link } from 'react-router-dom';
import SectionHead from './SectionHead';

export default function BrutalMasters({ barbers }) {
  return (
    <section id="ustalar" className="scroll-mt-24 bg-[#16130F] px-5 py-16 text-[#D8D5CD] md:px-10 md:py-[90px]">
      <SectionHead tag="USTALAR" index="02" title="MAKASI TUTAN" accent="ELLER." dark />

      <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
        {barbers.map((barber, i) => (
          <div key={barber.id || barber.slug} className="b-pp">
            <div className="relative aspect-[3/4] overflow-hidden border-b-2 border-[#16130F]">
              <img src={barber.image} alt={barber.name} loading="lazy" />
              <span className="absolute left-3 top-3 border-2 border-[#16130F] bg-[#F2C230] px-2 py-1 text-[11px] tracking-[0.14em] text-[#16130F]">
                {barber.years} YIL
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="text-[11px] tracking-[0.14em] text-[#FF4A1C]">{barber.role}</div>
                <span className="text-[26px] leading-none tracking-[-0.08em] text-[#16130F]/35">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-1.5 text-[30px] leading-none tracking-[-0.06em] md:text-[34px]">
                {barber.name}
              </h3>
              <div className="mt-4 flex justify-between border-t-2 border-dashed border-[#16130F] pt-3 text-[11px] tracking-[0.1em]">
                <span>{barber.specialty}</span>
                <span>{barber.years} YIL</span>
              </div>
            </div>
            <Link
              to={`/randevu?usta=${barber.slug}`}
              className="mt-auto flex justify-between border-t-2 border-[#16130F] bg-[#16130F] px-5 py-4 text-[11px] tracking-[0.14em] text-[#F2C230]"
            >
              Bu ustadan randevu al <span>→</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}