import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Phone } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Reveal from './Reveal';
import { salon } from '@/data/salonContent';

const Corners = () => (
  <>
    <span className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l border-t border-accent/70" />
    <span className="pointer-events-none absolute right-0 top-0 h-5 w-5 border-r border-t border-accent/70" />
    <span className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b border-l border-accent/70" />
    <span className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b border-r border-accent/70" />
  </>
);

export default function BookingCta({ image }) {
  return (
    <section id="randevu" className="relative overflow-hidden border-t border-border/60">
      <Image src={image} alt="Salon" className="absolute inset-0 h-full w-full opacity-30" fittingType="fill" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />

      <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-end">
          <Reveal>
            <div className="flex items-center gap-3">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full bg-accent"
              />
              <span className="label-mono text-[10px] text-blade">SANDALYE BOŞ</span>
            </div>

            <h2 className="mt-6 font-display text-4xl leading-[0.92] tracking-tight md:text-7xl">
              SAATİNİ SEÇ,
              <br />
              <span className="text-blade">GERİSİNİ BIRAK.</span>
            </h2>

            <p className="mt-7 max-w-md text-sm leading-relaxed text-foreground/50">
              Bugün için son müsait saatler 16:30 ve 18:00. Randevunuz salon onayına düşer, telefonla
              kesinleşir.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/randevu"
                className="group relative flex items-center gap-4 overflow-hidden bg-accent px-8 py-5 label-mono text-[11px] text-accent-foreground"
              >
                <span className="relative z-10">Randevu Oluştur</span>
                <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                <span className="absolute inset-0 translate-y-full bg-foreground transition-transform duration-500 group-hover:translate-y-0" />
              </Link>
              <a
                href={`tel:${salon.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 border border-border px-6 py-5 label-mono text-[10px] text-foreground/75 transition-colors hover:border-blade hover:text-foreground"
              >
                <Phone className="h-3.5 w-3.5" />
                {salon.phone}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative border border-border/70 bg-background/70 p-7 backdrop-blur-sm">
              <Corners />
              <p className="label-mono text-[10px] text-accent">ÇALIŞMA SAATLERİ</p>
              <ul className="mt-5 space-y-3">
                {salon.hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex items-center justify-between border-b border-border/50 pb-3 font-mono text-[11px] uppercase tracking-wider"
                  >
                    <span className="text-foreground/60">{h.day}</span>
                    <span className={h.time === 'Kapalı' ? 'text-foreground/35' : 'text-foreground'}>
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {salon.address}
              </p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(salon.address)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 label-mono text-[9px] text-blade transition-colors hover:text-accent"
              >
                Yol tarifi al
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}