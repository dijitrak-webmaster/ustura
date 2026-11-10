import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Reveal from './Reveal';

export default function Masters({ barbers }) {
  return (
    <section id="ustalar" className="relative overflow-hidden border-t border-border/60 bg-[#08080a] py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-accent" />
            <span className="label-mono text-[10px] text-blade">02 / USTALAR</span>
          </div>
          <h2 className="mt-6 max-w-2xl font-display text-4xl leading-[0.95] tracking-tight md:text-6xl">
            MAKASI TUTAN
            <br />
            <span className="text-blade">ELLER.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {barbers.map((barber, i) => (
            <Reveal key={barber.slug || barber.id} delay={i * 0.08}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.4 }} className="group relative overflow-hidden border border-border/70">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={barber.image}
                    alt={barber.name}
                    className="h-full w-full opacity-80 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                    fittingType="fill"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="label-mono text-[9px] text-accent">{barber.role}</p>
                    <h3 className="mt-2 font-heading text-2xl font-medium text-foreground">{barber.name}</h3>
                    <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-foreground/50">
                        {barber.specialty}
                      </span>
                      <span className="font-mono text-[11px] text-blade">{barber.years} YIL</span>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/randevu?usta=${barber.slug}`}
                  className="flex items-center justify-between border-t border-border/70 px-6 py-4 label-mono text-[10px] text-foreground/60 transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Bu ustadan randevu al
                  <span>→</span>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}