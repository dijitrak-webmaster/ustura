import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarPlus, Phone } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import '@/styles/brutal.css';
import BrutalHeader from '@/components/brutal/BrutalHeader';
import BrutalFooter from '@/components/brutal/BrutalFooter';
import HazardBand from '@/components/brutal/HazardBand';
import { downloadAppointmentIcs, googleCalendarUrl } from '@/lib/calendarFile';
import { formatLongDate, isoDay } from '@/lib/bookingSlots';
import { salon } from '@/data/salonContent';

const STATUS_LABEL = {
  pending: 'ONAY BEKLİYOR',
  confirmed: 'ONAYLANDI',
  completed: 'TAMAMLANDI',
  cancelled: 'İPTAL',
};

const STATUS_TONE = {
  pending: 'bg-[#F2C230] text-[#16130F]',
  confirmed: 'bg-[#16130F] text-[#F2C230]',
  completed: 'bg-[#16130F]/10 text-[#16130F]',
  cancelled: 'bg-[#FF4A1C] text-[#16130F]',
};

function Ticket({ appointment }) {
  const status = appointment.status || 'pending';
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-2 border-[#16130F] bg-[#D8D5CD] p-3 shadow-[5px_5px_0_#16130F] md:p-4">
      <div className="w-[92px] shrink-0 border-2 border-[#16130F] bg-[#16130F] px-2 py-1.5 text-[#F2C230]">
        <p className="text-[9px] tracking-[0.12em]">
          {appointment.date ? appointment.date.split('-').reverse().slice(0, 2).join('.') : ''}
        </p>
        <p className="text-[16px] leading-none tracking-[-0.03em]">{appointment.time}</p>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[13px] tracking-[-0.01em]">{appointment.service_name}</p>
        <p className="mt-1 text-[10px] tracking-[0.06em] opacity-60">
          {appointment.barber_name} · ₺{Number(appointment.price || 0).toLocaleString('tr-TR')}
        </p>
        <p className="b-copy mt-1 text-[10px] opacity-50">{formatLongDate(appointment.date)}</p>
      </div>

      <span
        className={`border-2 border-[#16130F] px-2 py-1 text-[9px] tracking-[0.14em] ${STATUS_TONE[status]}`}
      >
        {STATUS_LABEL[status]}
      </span>

      {status !== 'cancelled' && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => downloadAppointmentIcs(appointment)}
            className="flex items-center gap-1.5 border-2 border-[#16130F] bg-[#ECE9E2] px-2.5 py-1.5 text-[9px] tracking-[0.12em] transition-colors hover:bg-[#F2C230]"
          >
            <CalendarPlus className="h-3 w-3" />
            TAKVİME EKLE
          </button>
          <a
            href={googleCalendarUrl(appointment)}
            target="_blank"
            rel="noreferrer"
            className="border-2 border-[#16130F] bg-[#16130F] px-2.5 py-1.5 text-[9px] tracking-[0.12em] text-[#F2C230] transition-colors hover:bg-[#F2C230] hover:text-[#16130F]"
          >
            GOOGLE TAKVİM
          </a>
        </div>
      )}
    </div>
  );
}

export default function Randevularim() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    let active = true;
    base44.entities.Appointment.filter(
      { created_by_id: user.id },
      { sort: '-date', limit: 100 }
    ).then((page) => {
      if (active) {
        setItems(page.items || []);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [user?.id]);

  const today = isoDay(new Date());
  const upcoming = items
    .filter((a) => a.date >= today && a.status !== 'cancelled')
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
  const past = items
    .filter((a) => a.date < today || a.status === 'cancelled')
    .sort((a, b) => `${b.date}${b.time}`.localeCompare(`${a.date}${a.time}`));

  return (
    <div className="brutal min-h-screen">
      <BrutalHeader />

      <section className="border-b-2 border-[#16130F] px-5 pb-10 pt-10 md:px-10 md:pb-12">
        <div className="mx-auto max-w-[1180px]">
          <p className="flex items-center gap-2 text-[10px] tracking-[0.2em]">
            <span className="b-dot" />
            MÜŞTERİ DOSYASI · {salon.name}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 rotate-[-1deg] text-[30px] leading-[0.88] tracking-[-0.07em] sm:text-[44px] md:text-[76px]"
          >
            RANDEVULARIM
          </motion.h1>
          <p className="b-copy mt-5 max-w-md text-[13px] leading-[1.6]">
            Hesabınızla aldığınız randevular burada durur. Saati takviminize ekleyebilir, iptal için
            atölyeyi arayabilirsiniz.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1180px] px-5 py-10 md:px-10 md:py-14">
        {loading ? (
          <p className="text-[11px] tracking-[0.14em] opacity-60">YÜKLENİYOR…</p>
        ) : (
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-3">
                <p className="text-[10px] tracking-[0.16em]">YAKLAŞAN</p>
                <span className="h-[2px] flex-1 bg-[#16130F]" />
                <span className="text-[10px] tracking-[0.12em]">{upcoming.length}</span>
              </div>
              <div className="mt-4 space-y-2.5">
                {upcoming.length === 0 && (
                  <p className="border-2 border-dashed border-[#16130F]/40 p-6 text-center text-[10px] tracking-[0.14em] opacity-60">
                    YAKLAŞAN RANDEVU YOK.
                  </p>
                )}
                {upcoming.map((a) => (
                  <Ticket key={a.id} appointment={a} />
                ))}
              </div>
            </div>

            {past.length > 0 && (
              <div>
                <div className="flex items-center gap-3">
                  <p className="text-[10px] tracking-[0.16em] opacity-70">GEÇMİŞ</p>
                  <span className="h-[2px] flex-1 bg-[#16130F]/30" />
                  <span className="text-[10px] tracking-[0.12em] opacity-70">{past.length}</span>
                </div>
                <div className="mt-4 space-y-2.5">
                  {past.map((a) => (
                    <Ticket key={a.id} appointment={a} />
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 border-2 border-[#16130F] bg-[#F2C230] p-4">
              <p className="b-copy flex-1 text-[11px] leading-[1.6]">
                Randevu iptali veya saat değişikliği için atölyeyi arayın.
              </p>
              <a href={`tel:${salon.phone.replace(/\s/g, '')}`} className="b-btn">
                <Phone className="h-3.5 w-3.5" />
                {salon.phone}
              </a>
              <Link to="/randevu" className="b-btn b-btn-w">
                Yeni randevu ↗
              </Link>
            </div>
          </div>
        )}
      </main>

      <HazardBand />
      <BrutalFooter />
    </div>
  );
}