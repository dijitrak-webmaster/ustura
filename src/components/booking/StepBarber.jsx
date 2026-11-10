import { motion } from 'framer-motion';

export default function StepBarber({ barbers, selected, onSelect }) {
  const anySelected = selected === 'any';

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <motion.button
        onClick={() => onSelect('any')}
        className={`flex min-h-[190px] flex-col justify-between border-2 border-[#16130F] p-5 text-left transition-transform duration-150 hover:translate-x-[2px] hover:translate-y-[2px] ${
          anySelected
            ? 'translate-x-[2px] translate-y-[2px] bg-[#FF4A1C] shadow-[4px_4px_0_#16130F]'
            : 'bg-[#D8D5CD] shadow-[8px_8px_0_#16130F] hover:shadow-[6px_6px_0_#16130F]'
        }`}
      >
        <span className="text-[24px] leading-none">✦</span>
        <div>
          <p className="text-[20px] tracking-[-0.04em]">Fark etmez</p>
          <p className="b-copy mt-1 text-[12px] leading-[1.6]">İlk müsait usta sandalyeyi alır.</p>
        </div>
      </motion.button>

      {barbers.map((barber, i) => {
        const active = selected?.id === barber.id || (selected?.slug && selected.slug === barber.slug);
        return (
          <motion.button
            key={barber.id || barber.slug}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onSelect(barber)}
            className={`border-2 border-[#16130F] text-left transition-transform duration-150 hover:translate-x-[2px] hover:translate-y-[2px] ${
              active
                ? 'translate-x-[2px] translate-y-[2px] shadow-[4px_4px_0_#FF4A1C]'
                : 'shadow-[8px_8px_0_#16130F] hover:shadow-[6px_6px_0_#16130F]'
            }`}
          >
            <div className="relative aspect-[4/5] overflow-hidden border-b-2 border-[#16130F] bg-[#16130F]">
              <img
                src={barber.image}
                alt={barber.name}
                loading="lazy"
                className="h-full w-full object-cover grayscale contrast-[1.5]"
              />
              <span className="absolute left-2 top-2 border-2 border-[#16130F] bg-[#F2C230] px-2 py-1 text-[10px] tracking-[0.12em] text-[#16130F]">
                {barber.years} YIL
              </span>
              {active && (
                <span className="absolute right-2 top-2 border-2 border-[#16130F] bg-[#FF4A1C] px-2 py-1 text-[10px] text-[#16130F]">
                  ✓
                </span>
              )}
            </div>
            <div className={`px-4 py-3 ${active ? 'bg-[#FF4A1C]' : 'bg-[#D8D5CD]'}`}>
              <p className="text-[10px] tracking-[0.12em]">{barber.role || barber.specialty}</p>
              <p className="mt-1 text-[18px] leading-none tracking-[-0.04em]">{barber.name}</p>
              <p className="mt-1.5 text-[10px] tracking-[0.1em] opacity-60">
                {barber.years} YIL · {barber.specialty}
              </p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}