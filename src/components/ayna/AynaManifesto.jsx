import { Image } from '@/components/ui/image';
import AynaSection from './AynaSection';
import Mirrored from './Mirrored';

const stats = [
  { k: '2016', v: 'KURULUŞ' },
  { k: '03', v: 'SANDALYE' },
  { k: '12B+', v: 'KESİM' },
  { k: '4.9', v: 'PUAN' },
];

export default function AynaManifesto({ image }) {
  return (
    <AynaSection
      tag="MANİFESTO"
      title="SAÇ KESMİYORUZ,"
      accent="ÖLÇÜ ALIYORUZ."
      copy="Her sandalye bir tezgâh, her kesim bir ölçü işi. Ustura 2016'dan beri Kadıköy'de aynı ritüeli sürdürüyor: önce dinle, sonra kes."
    >
      <div className="grid gap-10 md:grid-cols-[1fr_0.8fr] md:gap-14">
        <Mirrored fade="h-[90px] md:h-[150px]">
          <p className="font-heading text-[24px] leading-[1.35] tracking-[-0.02em] text-[#F1ECE2]/90 sm:text-[30px] md:text-[36px]">
            “Kesim, müşteriyle ilk konuşmayla başlar. Makas her zaman son adımdır.”
          </p>
          <p className="ayna-label mt-4 text-[#C9A15A]">KEREM AYDIN · KURUCU USTA</p>
        </Mirrored>

        <div className="order-first md:order-none">
          <div className="relative aspect-[5/4] overflow-hidden border border-[#F1ECE2]/12">
            <Image
              src={image}
              alt="Atölye içi"
              className="h-full w-full object-cover grayscale contrast-125"
              fittingType="fill"
            />
          </div>
          <div aria-hidden="true" className="ayna-reflect h-[90px] overflow-hidden">
            <div className="aspect-[5/4]">
              <Image src={image} alt="" className="h-full w-full object-cover grayscale" />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5">
            {stats.map((s) => (
              <div key={s.v} className="border-t border-[#F1ECE2]/15 pt-3">
                <b className="ayna-display block text-[30px] text-[#C9A15A] md:text-[40px]">{s.k}</b>
                <span className="ayna-label mt-1 block text-[#F1ECE2]/40">{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AynaSection>
  );
}