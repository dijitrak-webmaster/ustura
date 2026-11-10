import { SLOTS, blockedSlots, isoDay } from '@/lib/bookingSlots';

const GROUPS = [
  { label: 'SABAH', from: 0, to: 4 },
  { label: 'ÖĞLEDEN SONRA', from: 4, to: 14 },
  { label: 'AKŞAM', from: 14, to: SLOTS.length },
];

export default function StepDateTime({ days, date, time, onDate, onTime, busy = [], barberId = '' }) {
  const blocked = blockedSlots(busy, barberId);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-baseline justify-between">
          <p className="border-2 border-[#16130F] bg-[#F2C230] px-2 py-1 text-[10px] tracking-[0.14em]">
            TARİH
          </p>
          <p className="text-[10px] tracking-[0.12em] opacity-60">PAZAR KAPALI</p>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          {days.map((d) => {
            const value = isoDay(d);
            const active = value === date;
            return (
              <button
                key={value}
                onClick={() => onDate(value)}
                className={`flex min-w-[70px] flex-col items-center gap-1 border-2 border-[#16130F] px-3 py-2.5 transition-transform duration-150 hover:translate-x-[2px] hover:translate-y-[2px] ${
                  active
                    ? 'translate-x-[2px] translate-y-[2px] bg-[#FF4A1C] shadow-[2px_2px_0_#16130F]'
                    : 'bg-[#D8D5CD] shadow-[4px_4px_0_#16130F] hover:shadow-[2px_2px_0_#16130F]'
                }`}
              >
                <span className="text-[9px] tracking-[0.12em] opacity-70">
                  {d.toLocaleDateString('tr-TR', { weekday: 'short' })}
                </span>
                <span className="text-[22px] leading-none tracking-[-0.06em]">
                  {String(d.getDate()).padStart(2, '0')}
                </span>
                <span className="text-[9px] tracking-[0.12em] opacity-70">
                  {d.toLocaleDateString('tr-TR', { month: 'short' })}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        {!date && (
          <p className="border-2 border-dashed border-[#16130F]/40 p-4 text-[11px] tracking-[0.1em] opacity-70">
            SAATLERİ GÖRMEK İÇİN ÖNCE BİR GÜN SEÇİN.
          </p>
        )}

        {GROUPS.map((group) => (
          <div key={group.label} className={date ? '' : 'opacity-40'}>
            <div className="flex items-center gap-3">
              <p className="text-[10px] tracking-[0.14em]">{group.label}</p>
              <span className="h-[2px] flex-1 bg-[#16130F]" />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
              {SLOTS.slice(group.from, group.to).map((slot) => {
                const active = slot === time;
                const isBlocked = blocked.has(slot);
                return (
                  <button
                    key={slot}
                    onClick={() => onTime(slot)}
                    disabled={isBlocked || !date}
                    title={isBlocked ? 'Bu saat dolu' : undefined}
                    className={`border-2 border-[#16130F] py-2 text-[11px] tracking-[0.08em] transition-transform duration-150 ${
                      isBlocked
                        ? 'cursor-not-allowed bg-[#16130F]/10 text-[#16130F]/35 line-through'
                        : 'hover:translate-x-[2px] hover:translate-y-[2px]'
                    } ${
                      active
                        ? 'translate-x-[2px] translate-y-[2px] bg-[#FF4A1C] text-[#16130F] shadow-[2px_2px_0_#16130F]'
                        : isBlocked
                          ? ''
                          : 'bg-[#D8D5CD] hover:bg-[#F2C230]'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <p className="flex items-center gap-2 text-[10px] tracking-[0.12em] opacity-60">
          <span className="inline-block h-3 w-3 border-2 border-[#16130F] bg-[#16130F]/10" />
          ÜSTÜ ÇİZİLİ SAATLER DOLU
        </p>
      </div>
    </div>
  );
}