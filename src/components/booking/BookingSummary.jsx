import { motion } from 'framer-motion';
import { formatLongDate } from '@/lib/bookingSlots';

export default function BookingSummary({ service, barber, date, time }) {
  const rows = [
    { label: 'Hizmet', value: service?.name || '—' },
    { label: 'Usta', value: barber === 'any' ? 'Fark etmez' : barber?.name || '—' },
    { label: 'Tarih', value: date ? formatLongDate(date) : '—' },
    { label: 'Saat', value: time || '—' },
  ];

  return (
    <div className="border-2 border-[#16130F] bg-[#F2C230] shadow-[8px_8px_0_#16130F]">
      <div className="flex items-center justify-between border-b-2 border-[#16130F] bg-[#16130F] px-4 py-2.5 text-[10px] tracking-[0.16em] text-[#F2C230]">
        <span>SEÇİMİNİZ</span>
        <span>№ {date ? date.slice(8, 10) : '--'}</span>
      </div>

      <div className="p-5">
        <ul>
          {rows.map((row) => (
            <li
              key={row.label}
              className="border-b-2 border-dashed border-[#16130F] py-2.5 first:pt-0"
            >
              <p className="text-[9px] tracking-[0.14em] opacity-60">{row.label}</p>
              <motion.p
                key={row.value}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-1 text-[12px] leading-relaxed"
              >
                {row.value}
              </motion.p>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-end justify-between border-b-2 border-[#16130F] pb-3">
          <span className="text-[9px] tracking-[0.14em]">TOPLAM</span>
          <span className="text-[32px] leading-none tracking-[-0.07em]">
            ₺{Number(service?.price || 0).toLocaleString('tr-TR')}
          </span>
        </div>

        <p className="b-copy mt-4 text-[11px] leading-[1.6]">
          Ödeme salonda yapılır. Randevu, salon onayladıktan sonra kesinleşir.
        </p>
      </div>
    </div>
  );
}