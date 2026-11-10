import Reveal from './Reveal';
import ServiceCard from './ServiceCard';

export default function ServiceForge({ services }) {
  return (
    <section id="hizmetler" className="relative border-t border-border/60 bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-accent" />
                <span className="label-mono text-[10px] text-blade">01 / HİZMET MENÜSÜ</span>
              </div>
              <h2 className="mt-6 max-w-xl font-display text-4xl leading-[0.95] tracking-tight md:text-6xl">
                HER KESİM BİR
                <br />
                <span className="text-blade">ÖLÇÜ İŞİ.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-sm leading-relaxed text-foreground/50">
              Kartların üzerine gelin: her hizmetin hangi aletlerle çalışıldığını göreceksiniz. Fiyatlar
              ustanın el emeği dahil, tek seansta biten işlemlerdir.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.slug || service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}