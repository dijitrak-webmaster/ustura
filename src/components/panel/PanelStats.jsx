import { CalendarDays, Wallet, Clock3 } from 'lucide-react';
import { isoDay } from '@/lib/bookingSlots';

function weekStart() {
  const d = new Date();
  const diff = (d.getDay() + 6) % 7;
  const start = new Date(d);
  start.setDate(d.getDate() - diff);
  start.setHours(0, 0, 0, 0);
  return start;
}

export default function PanelStats({ appointments }) {
  const today = isoDay(new Date());
  const start = weekStart();

  const todays = appointments.filter((a) => a.date === today && a.status !== 'cancelled');
  const pending = appointments.filter((a) => a.status === 'pending');
  const weekRevenue = appointments
    .filter((a) => (a.status === 'confirmed' || a.status === 'completed') && a.date && new Date(a.date) >= start)
    .reduce((sum, a) => sum + (Number(a.price) || 0), 0);

  const cards = [
    { icon: CalendarDays, label: 'BUGÜNKÜ RANDEVU', value: todays.length },
    { icon: Clock3, label: 'ONAY BEKLEYEN', value: pending.length },
    { icon: Wallet, label: 'BU HAFTA CİRO', value: `₺${weekRevenue.toLocaleString('tr-TR')}` },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="border-2 border-[#16130F] bg-[#D8D5CD] p-3.5 shadow-[4px_4px_0_#16130F] last:col-span-2 sm:p-4 sm:shadow-[6px_6px_0_#16130F] sm:last:col-span-1"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-[9px] tracking-[0.18em] opacity-60">{card.label}</p>
            <span className="flex h-7 w-7 items-center justify-center border-2 border-[#16130F] bg-[#F2C230]">
              <card.icon className="h-3.5 w-3.5" />
            </span>
          </div>
          <p className="mt-3 text-[30px] leading-none tracking-[-0.05em] md:text-[36px]">{card.value}</p>
        </div>
      ))}
    </div>
  );
}