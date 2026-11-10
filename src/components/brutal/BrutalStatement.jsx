import SectionHead from './SectionHead';
import { Image } from '@/components/ui/image';

const stats = [
  { k: '2016', v: 'KURULUŞ' },
  { k: '03', v: 'SANDALYE' },
  { k: '12B+', v: 'KESİM' },
  { k: '4.9', v: 'PUAN' },
];

export default function BrutalStatement({ image }) {
  return (
    <section className="relative overflow-hidden bg-[#16130F] px-5 py-16 text-[#D8D5CD] md:px-10 md:py-[90px]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 top-4 select-none text-[120px] leading-none text-[#D8D5CD]/[0.05] md:right-2 md:top-10 md:text-[240px]"
      >
        ✕
      </span>

      <SectionHead
        dark
        tag="MANİFESTO"
        index="00"
        title="SAÇ KESMİYORUZ,"
        accent="ÖLÇÜ ALIYORUZ."
        copy="Her sandalye bir tezgâh, her kesim bir ölçü işi. Mert Kuaför 2016'dan beri Edirne'de aynı ritüeli sürdürüyor: önce dinle, sonra kes."
      />

      <div className="grid gap-5 md:grid-cols-[0.85fr_1.15fr] md:gap-8">
        <figure className="relative border-2 border-[#D8D5CD] shadow-[8px_8px_0_#FF4A1C]">
          <div className="aspect-[4/5]">
            <Image
              src={image}
              alt="Atölye içi"
              className="block h-full w-full grayscale contrast-150"
            />
          </div>
          <figcaption className="absolute bottom-0 left-0 border-r-2 border-t-2 border-[#16130F] bg-[#F2C230] px-2.5 py-1.5 text-[10px] tracking-[0.14em] text-[#16130F]">
            ATÖLYE · EDİRNE
          </figcaption>
        </figure>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {stats.map((s) => (
            <div key={s.v} className="border-2 border-[#D8D5CD]/35 px-4 py-4 md:py-6">
              <b className="block text-[28px] leading-none tracking-[-0.06em] text-[#F2C230] md:text-[42px]">
                {s.k}
              </b>
              <i className="mt-2 block text-[9px] not-italic tracking-[0.14em] opacity-70 md:text-[10px]">
                {s.v}
              </i>
            </div>
          ))}
          <p className="col-span-2 border-l-4 border-[#FF4A1C] bg-[#D8D5CD]/[0.06] px-4 py-3 text-[12px] leading-[1.7] md:text-[13px]">
            “Kesim, müşteriyle ilk konuşmayla başlar. Makas her zaman son adımdır.”
          </p>
        </div>
      </div>
    </section>
  );
}