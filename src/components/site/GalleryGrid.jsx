import { Image } from '@/components/ui/image';
import Reveal from './Reveal';

export default function GalleryGrid({ items }) {
  return (
    <section id="galeri" className="relative border-t border-border/60 bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-accent" />
                <span className="label-mono text-[10px] text-blade">03 / GALERİ</span>
              </div>
              <h2 className="mt-6 font-display text-4xl leading-[0.95] tracking-tight md:text-6xl">
                AYNADAN
                <br />
                <span className="text-blade">ÇIKAN İŞLER.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-foreground/50">
              Atölyeden son kesitler. Her kare, cetvelsiz bir ölçünün sonucu.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.caption} delay={i * 0.07}>
              <figure
                className={`group relative overflow-hidden border border-border/70 ${
                  item.span === 'tall' ? 'aspect-[3/4]' : 'aspect-square'
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.caption}
                  className="h-full w-full opacity-75 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                  fittingType="fill"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                  <span className="label-mono text-[9px] text-foreground/80">{item.caption}</span>
                  <span className="h-px w-5 bg-accent transition-all duration-500 group-hover:w-10" />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}