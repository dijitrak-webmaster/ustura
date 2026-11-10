import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CalendarPlus, Check } from 'lucide-react';
import { formatLongDate } from '@/lib/bookingSlots';
import { downloadAppointmentIcs, googleCalendarUrl } from '@/lib/calendarFile';

export default function BookingSuccess({ appointment, duration = 30 }) {
  useEffect(() => {
    confetti({
      particleCount: 110,
      spread: 78,
      startVelocity: 42,
      origin: { y: 0.32 },
      colors: ['#FF4A1C', '#F2C230', '#16130F', '#D8D5CD'],
      disableForReducedMotion: true,
    });
  }, []);

  const rows = [
    { label: 'HİZMET', value: appointment.service_name },
    { label: 'USTA', value: appointment.barber_name },
    { label: 'TARİH', value: formatLongDate(appointment.date) },
    { label: 'SAAT', value: appointment.time },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="border-2 border-[#16130F] bg-[#D8D5CD] shadow-[10px_10px_0_#16130F]"
    >
      <div className="border-b-2 border-[#16130F] bg-[#16130F] px-5 py-3 text-[10px] tracking-[0.16em] text-[#F2C230]">
        RANDEVU ALINDI · SALON ONAYI BEKLENİYOR
      </div>

      <div className="p-6 md:p-10">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 16 }}
          className="flex h-14 w-14 items-center justify-center border-2 border-[#16130F] bg-[#FF4A1C] text-[#16130F] shadow-[4px_4px_0_#16130F]"
        >
          <Check className="h-6 w-6" />
        </motion.div>

        <h2 className="mt-6 text-[34px] leading-none tracking-[-0.07em] md:text-[56px]">
          SANDALYE
          <br />
          <em className="inline-block bg-[#16130F] px-3 not-italic text-[#F2C230]">AYRILDI.</em>
        </h2>

        <p className="b-copy mt-4 max-w-lg text-[13px] leading-[1.6]">
          Randevu talebiniz alındı. Salon onayladığında sizi telefonla arayacağız. Geç kalırsanız 10
          dakika bekleyebiliriz.
        </p>

        <div className="mt-8 grid border-2 border-[#16130F] sm:grid-cols-2">
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`p-4 ${i % 2 === 0 ? 'sm:border-r-2 sm:border-[#16130F]' : ''} ${
                i < 2 ? 'border-b-2 border-[#16130F]' : ''
              }`}
            >
              <p className="text-[9px] tracking-[0.14em] opacity-60">{row.label}</p>
              <p className="mt-1.5 text-[13px]">{row.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 border-2 border-dashed border-[#16130F] p-4">
          <p className="text-[9px] tracking-[0.14em] opacity-60">HATIRLATMA</p>
          <p className="b-copy mt-1.5 text-[12px] leading-[1.6]">
            Randevuyu takviminize ekleyin; telefonunuz 1 saat önce haber verir.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={() => downloadAppointmentIcs(appointment, duration)} className="b-btn">
              Takvime Ekle
              <CalendarPlus className="h-3.5 w-3.5" />
            </button>
            <a
              href={googleCalendarUrl(appointment, duration)}
              target="_blank"
              rel="noreferrer"
              className="b-btn b-btn-w"
            >
              Google Takvim
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/" className="b-btn b-btn-w">
            Ana sayfaya dön
          </Link>
          <button onClick={() => window.location.reload()} className="b-btn">
            Yeni randevu ↗
          </button>
        </div>
      </div>
    </motion.div>
  );
}