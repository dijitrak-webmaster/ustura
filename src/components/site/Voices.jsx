import { Star } from 'lucide-react';
import Reveal from './Reveal';

export default function Voices({ items }) {
  return (
    <section id="yorumlar" className="relative border-t border-border/60 bg-[#08080a] py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-accent" />
            <span className="label-mono text-[10px] text-blade">04 / YORUMLAR</span>
          </div>
          <h2 className="mt-6 font-display text-4xl leading-[0.95] tracking-tight md:text-6xl">
            SANDALYEDEN
            <br />
            <span className="text-blade">DUYULANLAR.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className="flex h-full flex-col justify-between border border-border/70 bg-card/40 p-7">
                <div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-3 w-3 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="mt-6 font-heading text-lg leading-relaxed text-foreground/85">“{t.quote}”</p>
                </div>
                <div className="mt-8 border-t border-border/60 pt-4">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-foreground">{t.name}</p>
                  <p className="label-mono mt-1 text-[9px] text-muted-foreground">{t.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}