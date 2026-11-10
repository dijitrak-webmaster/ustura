import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { salon } from '@/data/salonContent';
import Mirrored from './Mirrored';

const stats = [
  { value: '12', label: 'Yıl ustalık' },
  { value: '4.9', label: '280 yorum' },
  { value: '18:00', label: 'Aynı gün randevu' },
];

export default function AynaHero({ image }) {
  return (
    <section className="px-5 pb-12 pt-8 md:px-10 md:pb-20 md:pt-14">
      <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-14">
        <div>
          <div className="flex items-center justify-between gap-4">
            <span className="ayna-label text-[#F1ECE2]/40">EST. 2016 · İSTANBUL</span>
            <span className="ayna-label text-[#F1ECE2]/40">№ 0001</span>
          </div>

          <div className="mt-5 flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C9A15A]" />
            <span className="ayna-label text-[#C9A15A]">BUGÜN 3 SANDALYE BOŞ</span>
          </div>

          <Mirrored className="mt-4" fade="h-[96px] md:h-[150px]">
            <h1 className="ayna-display text-[64px] sm:text-[92px] md:text-[118px]">
              KESKİN ÇİZGİ,
              <br />
              <span className="text-[#C9A15A]">SESSİZ USTALIK.</span>
            </h1>
          </Mirrored>

          <p className="mt-7 max-w-[42ch] text-[14px] leading-[1.75] text-[#F1ECE2]/65 md:text-[15px]">
            Makasın sesi, usturanın soğuğu, aynada kusursuz bir çizgi. {salon.name} atölyesinde her
            kesim, ölçüyle başlayan bir zanaat.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/randevu"
              className="ayna-label bg-[#C9A15A] px-5 py-3.5 text-[#060708] transition-colors duration-200 hover:bg-[#E0BC7C]"
            >
              Randevu Al ↘
            </Link>
            <a
              href="#hizmetler"
              className="ayna-label border border-[#F1ECE2]/25 px-5 py-3.5 text-[#F1ECE2]/80 transition-colors duration-200 hover:border-[#F1ECE2]/60"
            >
              Hizmet Menüsü
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[#F1ECE2]/12 pt-5">
            {stats.map((s) => (
              <div key={s.label}>
                <b className="ayna-display block text-[26px] text-[#F1ECE2] md:text-[34px]">
                  {s.value}
                </b>
                <span className="ayna-label mt-1 block text-[#F1ECE2]/40">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <figure className="relative">
          <div className="relative aspect-[4/5] overflow-hidden border border-[#F1ECE2]/12">
            <Image
              src={image}
              alt="Ustura atölyesinde kesim"
              className="h-full w-full object-cover"
              fittingType="fill"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060708]/70 via-transparent to-transparent" />
          </div>
          <div aria-hidden="true" className="ayna-reflect h-[130px] overflow-hidden md:h-[190px]">
            <div className="aspect-[4/5]">
              <Image src={image} alt="" className="h-full w-full object-cover" />
            </div>
          </div>
          <figcaption className="ayna-label mt-3 text-[#F1ECE2]/35">ATÖLYE · KADIKÖY · 06:40</figcaption>
        </figure>
      </div>
    </section>
  );
}