import { motion } from 'framer-motion';

const labels = ['Hizmet', 'Usta', 'Zaman', 'Bilgiler'];

export default function BookingStepper({ step }) {
  const progress = (Math.min(step, 3) / 3) * 100;

  return (
    <div className="relative">
      <div className="relative h-[2px] bg-[#16130F]">
        <motion.div
          className="absolute inset-y-0 left-0 bg-[#FF4A1C]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2">
        {labels.map((label, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <div key={label} className="flex flex-col gap-2">
              <motion.span
                animate={{
                  backgroundColor: active || done ? '#FF4A1C' : '#D8D5CD',
                  scale: active ? 1 : 0.94,
                }}
                transition={{ duration: 0.4 }}
                className="flex h-8 items-center justify-center border-2 border-[#16130F] text-[12px] tracking-[0.1em]"
              >
                {String(i + 1).padStart(2, '0')}
              </motion.span>
              <span
                className={`text-[10px] tracking-[0.14em] transition-colors ${
                  active ? 'text-[#16130F]' : 'text-[#16130F]/50'
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}