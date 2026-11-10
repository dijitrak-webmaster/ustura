import { useEffect } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';

export default function CinematicLayer() {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.35);
  const sx = useSpring(px, { stiffness: 55, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 55, damping: 18, mass: 0.6 });
  const left = useTransform(sx, (v) => `${v * 100}%`);
  const top = useTransform(sy, (v) => `${v * 100}%`);

  const { scrollYProgress } = useScroll();
  const sweepTop = useTransform(scrollYProgress, [0, 1], ['-25%', '105%']);
  const sweepOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.2, 1, 1, 0.2]);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    const onMove = (event) => {
      px.set(event.clientX / window.innerWidth);
      py.set(event.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [px, py]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
    >
      {/* imleci takip eden altın ışık */}
      <motion.div
        className="absolute hidden h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
        style={{
          left,
          top,
          background:
            'radial-gradient(circle, rgba(242,194,48,0.10) 0%, rgba(242,194,48,0.04) 38%, transparent 68%)',
        }}
      />

      {/* kaydırmayla inen sıcak ışık şeridi */}
      <motion.div
        className="absolute inset-x-0 h-[300px]"
        style={{
          top: sweepTop,
          opacity: sweepOpacity,
          background:
            'linear-gradient(180deg, transparent 0%, rgba(255,74,28,0.07) 45%, transparent 100%)',
        }}
      />

      {/* kenar karartma */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(125% 85% at 50% 40%, transparent 45%, rgba(0,0,0,0.32) 100%)',
        }}
      />
    </div>
  );
}