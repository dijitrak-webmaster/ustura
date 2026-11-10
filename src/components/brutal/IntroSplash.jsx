import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { salon } from '@/data/salonContent';

const KEY = 'ustura_intro_seen';
const STRIPES = {
  backgroundImage: 'repeating-linear-gradient(45deg, #F2C230 0 12px, #16130F 12px 24px)',
};

function HazardRail({ flip = false }) {
  return (
    <div className="relative h-3 shrink-0 overflow-hidden border-[#F2C230]">
      <motion.div
        className="absolute inset-y-0 left-0 w-[200%]"
        style={STRIPES}
        animate={{ x: flip ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

function SideTape({ side }) {
  return (
    <div
      className={`absolute inset-y-0 hidden w-3 overflow-hidden sm:block ${
        side === 'left' ? 'left-0 border-r-2' : 'right-0 border-l-2'
      } border-[#F2C230]`}
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-[200%]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, #F2C230 0 12px, #16130F 12px 24px)' }}
        animate={{ y: side === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

export default function IntroSplash() {
  const [visible, setVisible] = useState(() => {
    try {
      return !sessionStorage.getItem(KEY);
    } catch {
      return true;
    }
  });
  const [pct, setPct] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / 1400);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const t1 = setTimeout(() => setExiting(true), 1500);
    const t2 = setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, '1');
      } catch {
        /* ignore */
      }
      setVisible(false);
    }, 2250);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = prevOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[95] flex flex-col overflow-hidden bg-[#16130F] font-mono text-[#D8D5CD]"
      initial={{ y: 0 }}
      animate={exiting ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
    >
      <HazardRail />
      <SideTape side="left" />
      <SideTape side="right" />

      <div className="relative flex flex-1 flex-col items-center justify-center px-8">
        <motion.div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(#F2C230 1px, transparent 1px), radial-gradient(#F2C230 1px, transparent 1px)',
            backgroundSize: '22px 22px',
            backgroundPosition: '0 0, 11px 11px',
          }}
          animate={{ backgroundPosition: ['0px 0px, 11px 11px', '22px 22px, 33px 33px'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div
          className="relative flex flex-col items-center"
          animate={exiting ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative flex h-[150px] w-[150px] items-center justify-center sm:h-[190px] sm:w-[190px]">
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-dashed border-[#F2C230]/45"
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            />
            <motion.span
              className="absolute inset-[10px] rounded-full border border-[#F2C230]/20"
              animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.9, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.img
              src={salon.logoMark}
              alt={`${salon.name} rozeti`}
              initial={{ opacity: 0, scale: 0.6, rotate: -16 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[104px] w-[104px] object-contain drop-shadow-[0_6px_0_rgba(0,0,0,0.55)] sm:h-[136px] sm:w-[136px]"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-7 border-2 border-[#F2C230] bg-[#D8D5CD] px-5 py-3 shadow-[7px_7px_0_#F2C230] sm:px-8 sm:py-4"
          >
            <img src={salon.logo} alt={salon.name} className="h-11 w-auto sm:h-16" />
            <motion.span
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.85) 50%, transparent 62%)',
                backgroundSize: '250% 100%',
              }}
              initial={{ backgroundPosition: '150% 0' }}
              animate={{ backgroundPosition: '-50% 0' }}
              transition={{ delay: 0.7, duration: 1.1, ease: 'easeInOut' }}
            />
          </motion.div>

          <motion.div
            className="mt-6 flex items-center gap-2 text-[9px] tracking-[0.26em] text-[#F2C230]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <span className="h-[2px] w-7 bg-[#F2C230]" />
            TIRAŞ ATÖLYESİ · EST. 2016
            <span className="h-[2px] w-7 bg-[#F2C230]" />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative shrink-0 overflow-hidden border-y-2 border-[#F2C230] bg-[#F2C230] py-1.5 text-[#16130F]">
        <motion.div
          className="flex w-[200%] whitespace-nowrap text-[9px] tracking-[0.3em]"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        >
          {[0, 1].map((k) => (
            <span key={k} className="flex w-1/2 justify-around">
              <span>EDİRNE · MERKEZ</span>
              <span>USTURA</span>
              <span>SICAK HAVLU</span>
              <span>ÖLÇÜYLE KESİM</span>
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="shrink-0 bg-[#16130F] px-6 pb-5 pt-4"
        animate={exiting ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-end justify-between text-[9px] tracking-[0.26em]">
          <span className="text-[#F2C230]">TEZGAH HAZIRLANIYOR</span>
          <span>%{String(pct).padStart(3, '0')}</span>
        </div>
        <div className="mt-2 h-[9px] border-2 border-[#F2C230]">
          <div className="h-full bg-[#FF4A1C]" style={{ width: `${pct}%` }} />
        </div>
      </motion.div>

      <HazardRail flip />
    </motion.div>
  );
}