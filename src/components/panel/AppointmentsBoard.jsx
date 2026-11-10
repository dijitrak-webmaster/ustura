import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { isoDay } from '@/lib/bookingSlots';
import ManualAppointmentForm from './ManualAppointmentForm';

const STATUS = [
  { value: 'pending', label: 'Bekliyor' },
  { value: 'confirmed', label: 'Onaylandı' },
  { value: 'completed', label: 'Tamamlandı' },
  { value: 'cancelled', label: 'İptal' },
];

const FILTERS = [
  { key: 'upcoming', label: 'YAKLAŞAN' },
  { key: 'today', label: 'BUGÜN' },
  { key: 'all', label: 'TÜMÜ' },
];

function shortDate(iso) {
  if (!iso) return '';
  const [, m, d] = iso.split('-');
  return `${d}.${m}`;
}

export default function AppointmentsBoard({ appointments, services = [], barbers = [], customers = [], onRefresh }) {
  const [filter, setFilter] = useState('upcoming');
  const today = isoDay(new Date());

  const visible = appointments
    .filter((a) => {
      if (filter === 'today') return a.date === today;
      if (filter === 'upcoming') return a.date >= today;
      return true;
    })
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));

  const setStatus = async (id, status) => {
    await base44.entities.Appointment.update(id, { status });
    if (status === 'cancelled') {
      await base44.entities.BusySlot.deleteMany({ appointment_id: id });
    }
    onRefresh();
  };

  const remove = async (id) => {
    await base44.entities.BusySlot.deleteMany({ appointment_id: id });
    await base44.entities.Appointment.delete(id);
    onRefresh();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <ManualAppointmentForm
          services={services}
          barbers={barbers}
          customers={customers}
          onCreated={onRefresh}
        />
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`border-2 border-[#16130F] px-3 py-1.5 text-[9px] tracking-[0.14em] transition-transform duration-150 ${
              filter === f.key
                ? 'translate-x-[2px] translate-y-[2px] bg-[#FF4A1C] shadow-[2px_2px_0_#16130F]'
                : 'bg-[#D8D5CD] shadow-[3px_3px_0_#16130F] hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-[#F2C230]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-2.5">
        {visible.length === 0 && (
          <p className="border-2 border-dashed border-[#16130F]/40 p-6 text-center text-[10px] tracking-[0.14em] opacity-60">
            BU GÖRÜNÜMDE RANDEVU YOK.
          </p>
        )}
        {visible.map((a) => (
          <div
            key={a.id}
            className="grid gap-3 border-2 border-[#16130F] bg-[#D8D5CD] p-3 shadow-[5px_5px_0_#16130F] md:grid-cols-[96px_1fr_auto_auto] md:items-center"
          >
            <div className="flex items-baseline justify-between gap-2 border-2 border-[#16130F] bg-[#16130F] px-2.5 py-1.5 text-[#F2C230] md:flex-col md:items-start md:gap-0.5">
              <p className="text-[10px] tracking-[0.12em]">{shortDate(a.date)}</p>
              <p className="text-[16px] leading-none tracking-[-0.03em]">{a.time}</p>
            </div>
            <div className="min-w-0">
              <p className="truncate text-[13px] tracking-[-0.01em]">{a.customer_name}</p>
              <p className="mt-1 text-[10px] tracking-[0.06em] opacity-60">
                {a.service_name} · {a.barber_name} · {a.customer_phone}
              </p>
              {a.notes && <p className="b-copy mt-1 text-[10px] opacity-50">“{a.notes}”</p>}
            </div>
            <p className="text-[13px] tracking-[-0.02em]">₺{Number(a.price || 0).toLocaleString('tr-TR')}</p>
            <div className="flex items-center gap-2">
              <select
                value={a.status || 'pending'}
                onChange={(e) => setStatus(a.id, e.target.value)}
                className="min-w-0 flex-1 border-2 border-[#16130F] bg-[#ECE9E2] px-2 py-1.5 text-[10px] tracking-[0.06em] outline-none focus:bg-[#F2C230] md:flex-none"
              >
                {STATUS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => remove(a.id)}
                aria-label="Randevuyu sil"
                className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[#16130F] transition-colors hover:bg-[#FF4A1C] md:h-8 md:w-8"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}