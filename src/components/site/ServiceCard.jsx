import { motion } from 'framer-motion';
import { Clock, Scissors } from 'lucide-react';
import Reveal from './Reveal';

export default function ServiceCard({ service, index }) {
  return (
    <Reveal delay={index * 0.06}>
      <motion.article
        whileHover="hover"
        initial="rest"
        animate="rest"
        className="group relative h-full border border-border/80 bg-card/60 p-7 transition-colors duration-500 hover:bg-card clip-blade-sm"
      >
        <div className="glint-border absolute inset-0" />
        <div className="flex items-start justify-between">
          <span className="label-mono text-[10px] text-accent">{String(index + 1).padStart(2, '0')}</span>
          <span className="flex items-center gap-1.5 label-mono text-[9px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            {service.duration} DK
          </span>
        </div>

        <h3 className="mt-6 font-heading text-2xl font-medium tracking-tight text-foreground">{service.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground/50">{service.description}</p>

        <motion.div
          variants={{ rest: { height: 0, opacity: 0 }, hover: { height: 'auto', opacity: 1 } }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap items-center gap-2 pt-5">
            {service.tools.map((tool) => (
              <span
                key={tool}
                className="flex items-center gap-1.5 border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-blade"
              >
                <Scissors className="h-3 w-3" />
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="mt-7 flex items-end justify-between border-t border-border/70 pt-5">
          <span className="font-mono text-xl text-foreground">
            ₺{service.price.toLocaleString('tr-TR')}
          </span>
          <span className="label-mono text-[9px] text-foreground/40 transition-colors group-hover:text-accent">
            Seç →
          </span>
        </div>
      </motion.article>
    </Reveal>
  );
}