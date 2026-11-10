import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Reveal from './Reveal';

const steps = [
  {
    no: '01',
    title: 'ÖLÇÜ',
    body: 'Yüz hattınız, saç yönünüz, sakal çıkışınız. Makas değmeden önce on dakika sadece bakıyoruz.',
    detail: 'AYNA · CETVEL · IŞIK',
    image: 'https://media.base44.com/images/public/6af2cea922bdc55ca6a1d1a8/2514a02a8_generated_image.png',
  },
  {
    no: '02',
    title: 'KESİM',
    body: 'Makas yavaş, makine kontrollü. Her geçişte aynayı size çevirip onay alıyoruz; sürpriz yok.',
    detail: 'MAKAS · MAKİNE · TARAK',
    image: 'https://media.base44.com/images/public/6af2cea922bdc55ca6a1d1a8/ed70b5814_generated_image.png',
  },
  {
    no: '03',
    title: 'BİTİŞ',
    body: 'Sıcak havlu, soğuk kompres, son kontur. Sandalyeden kalktığınızda çizgi yerinde kalıyor.',
    detail: 'USTURA · HAVLU · KOLONYA',
    image: 'https://media.base44.com/images/public/6af2cea922bdc55ca6a1d1a8/fc4e12ffb_generated_image.png',
  },
];

export default function Ritual() {
  const [active, setActive] = useState(0);

  return (
    <section id="rituel" className="relative overflow-hidden border-t border-border/60 bg-background py-24 md:py-32">
      <div className="pointer-events-none absolute -left-24 top-1/3 select-none font-display text-[26rem] leading-none text-foreground/[0.025]">
        USTURA
      </div>

      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-5 md:grid-cols-[0.9fr_1fr] md:px-10">
        <div className="relative hidden md:block">
          <div className="sticky top-28">
            <div className="relative aspect-[3/4] overflow-hidden border border-border/70">
              <AnimatePresence>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={steps[active].image}
                    alt={steps[active].title}
                    className="h-full w-full opacity-80 saturate-[0.75]"
                    fittingType="fill"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <span className="absolute left-5 top-5 label-mono text-[9px] text-blade">
                ADIM {steps[active].no}
              </span>
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
                <span className="font-display text-3xl text-foreground">{steps[active].title}</span>
                <span className="label-mono text-[8px] text-foreground/50">{steps[active].detail}</span>
              </div>
            </div>
            <div className="mt-4 flex gap-1.5">
              {steps.map((s, i) => (
                <span
                  key={s.no}
                  className={`h-[2px] flex-1 transition-colors duration-500 ${
                    i === active ? 'bg-accent' : 'bg-border'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-accent" />
              <span className="label-mono text-[10px] text-blade">RİTÜEL / ÜÇ ADIM</span>
            </div>
            <h2 className="mt-6 font-display text-4xl leading-[0.95] tracking-tight md:text-6xl">
              SANDALYEDE
              <br />
              <span className="text-blade">GEÇEN KIRK DAKİKA.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/50">
              Acele yok, sıra yok, sürpriz yok. Her randevu tek müşteriye ayrılır; o kırk dakika yalnızca size
              aittir.
            </p>
          </Reveal>

          <div className="mt-12 border-t border-border/60">
            {steps.map((step, i) => {
              const isActive = i === active;
              return (
                <div
                  key={step.no}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group cursor-pointer border-b border-border/60 py-7"
                >
                  <div className="flex items-start gap-5">
                    <span
                      className={`font-mono text-xs transition-colors duration-300 ${
                        isActive ? 'text-accent' : 'text-muted-foreground'
                      }`}
                    >
                      {step.no}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`font-display text-3xl tracking-tight transition-colors duration-300 md:text-4xl ${
                            isActive ? 'text-foreground' : 'text-foreground/45'
                          }`}
                        >
                          {step.title}
                        </h3>
                        <motion.span
                          animate={{ rotate: isActive ? 45 : 0, opacity: isActive ? 1 : 0.35 }}
                          transition={{ duration: 0.4 }}
                          className="text-2xl font-light text-blade"
                        >
                          +
                        </motion.span>
                      </div>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="max-w-md pt-4 text-sm leading-relaxed text-foreground/55">
                              {step.body}
                            </p>
                            <p className="mt-4 label-mono text-[8px] text-blade/70 md:hidden">
                              {step.detail}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <div className="mt-5 h-px w-full overflow-hidden bg-border/40">
                    <motion.div
                      animate={{ width: isActive ? '100%' : '0%' }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="h-px bg-accent"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}