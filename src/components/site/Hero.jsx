import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowDownRight, MoveDown } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { salon } from '@/data/salonContent';

const stats = [
  { value: '12', label: 'Yıl ustalık' },
  { value: '4.9', label: '280 yorum' },
  { value: '18:00', label: 'Aynı gün randevu' },
];

const lines = [
  { text: 'KESKİN ÇİZGİ,', tone: 'text-foreground' },
  { text: 'SESSİZ USTALIK.', tone: 'text-blade' },
];

export default function Hero({ image }) {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], [0, 140]);
  const contentY = useTransform(scrollY, [0, 800], [0, -70]);
  const contentOpacity = useTransform(scrollY, [0, 520], [1, 0.1]);

  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const sx = useSpring(mx, { stiffness: 70, damping: 22 });
  const sy = useSpring(my, { stiffness: 70, damping: 22 });
  const gx = useTransform(sx, (v) => `${v}%`);
  const gy = useTransform(sy, (v) => `${v}%`);
  const glint = useMotionTemplate`radial-gradient(circle 380px at ${gx} ${gy}, rgba(255,255,255,0.16), transparent 70%)`;

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <section ref={ref} onMouseMove={handleMove} className="relative min-h-[100svh] overflow-hidden bg-background">
      <motion.div style={{ y: imgY }} className="absolute -inset-y-24 inset-x-0">
        <motion.div
          initial={{ scale: 1.16, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.9, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full"
        >
          <Image
            src={image}
            alt="Ustura detayı"
            className="h-full w-full opacity-[0.62] saturate-[0.7]"
            fittingType="fill"
          />
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-background/[0.05]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/70" />
      <motion.div className="pointer-events-none absolute inset-0 hidden md:block" style={{ background: glint }} />

      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-foreground/[0.06] lg:block" />
      <div className="pointer-events-none absolute inset-y-0 right-[22%] hidden w-px bg-foreground/[0.06] lg:block" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-center px-5 pb-16 pt-32 md:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="flex flex-wrap items-center gap-4"
        >
          <span className="h-px w-16 bg-accent" />
          <span className="label-mono text-[10px] text-blade">EST. 2016 · İSTANBUL</span>
          <span className="flex items-center gap-2 border border-border/80 bg-background/40 px-3 py-1.5 backdrop-blur-sm">
            <motion.span
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            <span className="label-mono text-[8px] text-foreground/60">BUGÜN 3 SANDALYE BOŞ</span>
          </span>
        </motion.div>

        <div className="mt-8 max-w-5xl">
          <h1 className="font-display text-[15vw] leading-[0.84] tracking-tight sm:text-[11vw] lg:text-[8.75rem]">
            {lines.map((line, i) => (
              <span key={line.text} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  initial={{ y: '112%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.35 + i * 0.14, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                  className={`block ${line.tone}`}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.8 }}
            className="mt-8 flex max-w-xl items-start gap-4"
          >
            <span className="mt-2 h-px w-10 shrink-0 bg-accent" />
            <p className="text-base leading-relaxed text-foreground/65 md:text-lg">
              Makasın sesi, usturanın soğuğu, aynada kusursuz bir çizgi. {salon.name} atölyesinde her kesim,
              ölçüyle başlayan bir zanaat.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            to="/randevu"
            className="group relative flex items-center gap-4 overflow-hidden bg-accent px-8 py-4 label-mono text-[11px] text-accent-foreground"
          >
            <span className="relative z-10">Randevu Al</span>
            <ArrowDownRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
            <span className="absolute inset-0 translate-y-full bg-foreground transition-transform duration-500 group-hover:translate-y-0" />
            <span className="absolute inset-0 z-10 flex items-center justify-center gap-4 text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Randevu Al
              <ArrowDownRight className="h-4 w-4" />
            </span>
          </Link>
          <a
            href="#hizmetler"
            className="group flex items-center gap-3 border border-border px-8 py-4 label-mono text-[11px] text-foreground/80 transition-colors hover:border-blade hover:text-foreground"
          >
            Hizmet Menüsü
            <span className="h-px w-6 bg-foreground/40 transition-all duration-300 group-hover:w-10 group-hover:bg-accent" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-border/70 pt-6"
        >
          {stats.map((s) => (
            <div key={s.label} className="group">
              <p className="font-mono text-2xl text-foreground transition-colors duration-300 group-hover:text-accent md:text-3xl">
                {s.value}
              </p>
              <p className="label-mono mt-2 text-[9px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 right-5 hidden flex-col items-center gap-3 md:right-10 md:flex">
        <span className="label-mono rotate-90 text-[9px] text-muted-foreground">KAYDIR</span>
        <span className="relative h-16 w-px bg-foreground/25">
          <motion.span
            animate={{ y: [0, 56, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-accent"
          />
        </span>
        <MoveDown className="h-3.5 w-3.5 text-foreground/40" />
      </div>
    </section>
  );
}