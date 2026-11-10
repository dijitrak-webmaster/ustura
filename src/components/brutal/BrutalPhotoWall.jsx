import SectionHead from './SectionHead';
import { Image } from '@/components/ui/image';

export default function BrutalPhotoWall({ items }) {
  return (
    <section id="atolye" className="scroll-mt-24 px-5 py-16 md:px-10 md:py-[90px]">
      <SectionHead
        tag="ATÖLYE"
        index="05"
        title="TEZGÂHTAN"
        accent="KARELER."
        copy="Kesimden önce ve sonra: jilet, fırça, havlu, raf. Atölyenin müşterinin görmediği tarafı."
      />

      <div className="b-gl grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {items.map((item) => (
          <figure key={item.caption}>
            <Image src={item.image} alt={item.caption} className="block h-full w-full" />
            <figcaption className="absolute bottom-0 left-0 border-r-2 border-t-2 border-[#16130F] bg-[#F2C230] px-2.5 py-1.5 text-[9px] tracking-[0.12em] text-[#16130F] md:text-[10px]">
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}