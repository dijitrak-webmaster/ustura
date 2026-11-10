import { Image } from '@/components/ui/image';
import AynaSection from './AynaSection';

export default function AynaGallery({ plates, shots }) {
  return (
    <AynaSection
      id="galeri"
      tag="03 / GALERİ"
      title="AYNADAN"
      accent="ÇIKAN İŞLER."
      copy="Atölyeden son kesitler. Her kare, cetvelsiz bir ölçünün sonucu."
    >
      <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-6">
        {plates.map((plate) => (
          <figure key={plate.caption} className="w-[62%] shrink-0 snap-start sm:w-[38%] md:w-auto">
            <div className="relative aspect-[3/4] overflow-hidden border border-[#F1ECE2]/12">
              <Image
                src={plate.image}
                alt={plate.caption}
                className="h-full w-full object-cover grayscale contrast-125"
                fittingType="fill"
              />
            </div>
            <div aria-hidden="true" className="ayna-reflect h-[54px] overflow-hidden">
              <div className="aspect-[3/4]">
                <Image src={plate.image} alt="" className="h-full w-full object-cover grayscale" />
              </div>
            </div>
            <figcaption className="ayna-label mt-2.5 text-[9px] text-[#F1ECE2]/35">
              {plate.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:mt-14 md:grid-cols-4 md:gap-6">
        {shots.map((shot) => (
          <figure key={shot.caption}>
            <div className="relative aspect-[4/5] overflow-hidden border border-[#F1ECE2]/12">
              <Image
                src={shot.image}
                alt={shot.caption}
                className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
                fittingType="fill"
              />
            </div>
            <div aria-hidden="true" className="ayna-reflect h-[70px] overflow-hidden">
              <div className="aspect-[4/5]">
                <Image src={shot.image} alt="" className="h-full w-full object-cover grayscale" />
              </div>
            </div>
            <figcaption className="ayna-label mt-2.5 text-[9px] text-[#C9A15A]/70">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </AynaSection>
  );
}