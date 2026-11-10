import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import AynaSection from './AynaSection';

export default function AynaMasters({ barbers }) {
  return (
    <AynaSection
      id="ustalar"
      tag="02 / USTALAR"
      title="MAKASI TUTAN"
      accent="ELLER."
      copy="Üç sandalye, üç ayrı el. Her usta kendi sandalyesinden sorumlu."
    >
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
        {barbers.map((barber) => (
          <article key={barber.id || barber.slug} className="group">
            <div className="relative aspect-[3/4] overflow-hidden border border-[#F1ECE2]/12">
              <Image
                src={barber.image}
                alt={barber.name}
                className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                fittingType="fill"
              />
              <span className="ayna-label absolute left-3 top-3 bg-[#060708]/80 px-2 py-1 text-[#C9A15A]">
                {barber.years} YIL
              </span>
            </div>
            <div aria-hidden="true" className="ayna-reflect h-[90px] overflow-hidden">
              <div className="aspect-[3/4]">
                <Image src={barber.image} alt="" className="h-full w-full object-cover grayscale" />
              </div>
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <p className="ayna-label text-[#C9A15A]">{barber.role}</p>
                <h3 className="ayna-display mt-1.5 text-[28px] md:text-[32px]">{barber.name}</h3>
                <p className="ayna-label mt-2 text-[#F1ECE2]/35">
                  {barber.specialty} · {barber.years} YIL
                </p>
              </div>
            </div>
            <Link
              to={`/randevu?usta=${barber.slug}`}
              className="ayna-label mt-4 flex items-center justify-between border-t border-[#F1ECE2]/12 pt-3 text-[#F1ECE2]/60 transition-colors duration-200 hover:text-[#C9A15A]"
            >
              Bu ustadan randevu al <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </AynaSection>
  );
}