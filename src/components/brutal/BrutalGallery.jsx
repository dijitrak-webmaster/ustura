import SectionHead from './SectionHead';
import { Image } from '@/components/ui/image';

export default function BrutalGallery({ items }) {
  return (
    <section id="galeri" className="scroll-mt-24 px-5 py-16 md:px-10 md:py-[90px]">
      <SectionHead
        tag="GALERİ"
        index="03"
        title="AYNADAN"
        accent="ÇIKAN İŞLER."
        copy="Atölyeden son kesitler. Her kare, cetvelsiz bir ölçünün sonucu."
      />

      <div className="b-gl grid grid-cols-2 gap-6 lg:grid-cols-4">
        {items.map((item) => (
          <figure key={item.id || item.caption}>
            <Image
              src={item.image}
              alt={item.caption}
              className="block h-full w-full"
              loading="lazy"
            />
            <figcaption className="absolute bottom-0 left-0 max-w-full truncate border-r-2 border-t-2 border-[#16130F] bg-[#F2C230] px-2.5 py-2 text-[10px] tracking-[0.1em] text-[#16130F] md:px-3 md:text-[11px] md:tracking-[0.12em]">
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}