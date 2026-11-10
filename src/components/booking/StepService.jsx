import { motion } from 'framer-motion';

export default function StepService({ services, selected, onSelect }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {services.map((service, i) => {
        const active = selected?.id === service.id || (selected?.slug && selected.slug === service.slug);
        return (
          <motion.button
            key={service.id || service.slug}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.055, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onSelect(service)}
            className={`relative border-2 border-[#16130F] p-5 text-left transition-transform duration-150 hover:translate-x-[2px] hover:translate-y-[2px] md:p-6 ${
              active
                ? 'translate-x-[2px] translate-y-[2px] bg-[#FF4A1C] shadow-[4px_4px_0_#16130F]'
                : 'bg-[#D8D5CD] shadow-[8px_8px_0_#16130F] hover:shadow-[6px_6px_0_#16130F]'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-[19px] leading-tight tracking-[-0.04em] md:text-[22px]">
                {service.name}
              </h3>
              <span className="whitespace-nowrap border-2 border-[#16130F] bg-[#F2C230] px-2 py-1 text-[10px] tracking-[0.1em] text-[#16130F]">
                {service.duration} DK
              </span>
            </div>

            <p className="b-copy mt-2 text-[13px] leading-[1.6]">{service.description}</p>

            {service.tools?.length > 0 && (
              <span className="mt-2 block text-[10px] tracking-[0.1em]">
                {service.tools.slice(0, 3).join(' · ')}
              </span>
            )}

            <div className="mt-4 flex items-end justify-between border-t-2 border-dashed border-[#16130F] pt-3">
              <b className="text-[26px] leading-none tracking-[-0.06em]">
                ₺{Number(service.price).toLocaleString('tr-TR')}
              </b>
              <span className="text-[10px] tracking-[0.12em]">
                {active ? 'SEÇİLDİ ✓' : 'SEÇ →'}
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}