import { useMemo, useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { base44 } from '@/api/base44Client';
import { isoDay } from '@/lib/bookingSlots';

const inputClass =
  'mt-1.5 w-full border-2 border-[#16130F] bg-[#ECE9E2] px-3 py-2 font-mono text-[11px] text-[#16130F] outline-none focus:bg-[#F2C230]';
const labelClass = 'text-[9px] tracking-[0.16em] text-[#16130F]/70';

const empty = {
  customer_id: '',
  date: isoDay(new Date()),
  time: '12:00',
  service_id: '',
  barber_id: '',
  price: '',
  notes: '',
};

export default function ManualAppointmentForm({ services, barbers, customers = [], onCreated }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [term, setTerm] = useState('');

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const selected = customers.find((c) => c.id === form.customer_id) || null;

  const matches = useMemo(() => {
    const q = term.trim().toLowerCase();
    if (!q) return customers.slice(0, 12);
    return customers
      .filter(
        (c) =>
          (c.name || '').toLowerCase().includes(q) ||
          (c.phone || '').replace(/\s+/g, '').includes(q)
      )
      .slice(0, 12);
  }, [customers, term]);

  const save = async () => {
    if (!selected) {
      setError('Önce listeden bir müşteri seçin.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const service = services.find((s) => s.id === form.service_id);
      const barber = barbers.find((b) => b.id === form.barber_id);

      const record = await base44.entities.Appointment.create({
        customer_name: selected.name || selected.phone,
        customer_phone: selected.phone,
        service_name: service ? service.name : '',
        service_id: service ? service.id : '',
        barber_name: barber ? barber.name : '',
        barber_id: barber ? barber.id : '',
        date: form.date,
        time: form.time,
        price: Number(form.price) || (service ? Number(service.price) || 0 : 0),
        notes: form.notes.trim(),
        status: 'confirmed',
      });

      await base44.entities.BusySlot.create({
        date: form.date,
        time: form.time,
        duration: service ? Number(service.duration) || 30 : 30,
        barber_id: barber ? barber.id : '',
        appointment_id: record.id,
      });

      setOpen(false);
      setForm(empty);
      setTerm('');
      onCreated();
    } catch (e) {
      setError('Randevu kaydedilemedi.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 border-2 border-[#16130F] bg-[#FF4A1C] px-4 py-2 text-[10px] tracking-[0.14em] shadow-[4px_4px_0_#16130F] transition-transform duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#16130F]"
      >
        <Plus className="h-3.5 w-3.5" /> MANUEL RANDEVU
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-2 border-[#16130F] bg-[#D8D5CD] font-mono text-[#16130F]">
          <DialogHeader>
            <DialogTitle className="text-[16px] uppercase tracking-[0.06em]">
              Manuel randevu
            </DialogTitle>
          </DialogHeader>

          <div>
            <label className={labelClass}>Müşteri</label>
            {selected ? (
              <div className="mt-1.5 flex items-center justify-between gap-3 border-2 border-[#16130F] bg-[#F2C230] px-3 py-2">
                <div className="min-w-0">
                  <p className="truncate text-[12px]">{selected.name || 'İSİMSİZ'}</p>
                  <p className="mt-0.5 text-[10px] opacity-60">{selected.phone}</p>
                </div>
                <button
                  onClick={() => set('customer_id', '')}
                  className="shrink-0 border-2 border-[#16130F] bg-[#D8D5CD] px-2 py-1 text-[9px] tracking-[0.12em]"
                >
                  DEĞİŞTİR
                </button>
              </div>
            ) : (
              <div className="mt-1.5 border-2 border-[#16130F] bg-[#ECE9E2]">
                <div className="relative border-b-2 border-[#16130F]">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 opacity-50" />
                  <input
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="İSİM VEYA TELEFON"
                    className="w-full bg-transparent py-2 pl-8 pr-2 font-mono text-[11px] tracking-[0.06em] outline-none"
                  />
                </div>
                <div className="max-h-[168px] overflow-y-auto">
                  {matches.length === 0 && (
                    <p className="px-3 py-3 text-[10px] tracking-[0.1em] opacity-60">
                      MÜŞTERİ YOK · “MÜŞTERİLER” SEKMESİNDEN EKLEYİN.
                    </p>
                  )}
                  {matches.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => set('customer_id', c.id)}
                      className="flex w-full items-baseline justify-between gap-3 border-b border-[#16130F]/20 px-3 py-2 text-left transition-colors hover:bg-[#F2C230]"
                    >
                      <span className="truncate text-[12px]">{c.name || 'İSİMSİZ'}</span>
                      <span className="shrink-0 text-[10px] opacity-60">
                        {c.phone} · {Number(c.visits || 0)} tıraş
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Hizmet</label>
              <select
                className={inputClass}
                value={form.service_id}
                onChange={(e) => set('service_id', e.target.value)}
              >
                <option value="">Seçilmedi</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} · ₺{Number(s.price || 0).toLocaleString('tr-TR')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Usta</label>
              <select
                className={inputClass}
                value={form.barber_id}
                onChange={(e) => set('barber_id', e.target.value)}
              >
                <option value="">Seçilmedi</option>
                {barbers.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Tarih</label>
              <input
                type="date"
                className={inputClass}
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Saat</label>
              <input
                type="time"
                className={inputClass}
                value={form.time}
                onChange={(e) => set('time', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Tutar (₺)</label>
              <input
                type="number"
                className={inputClass}
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
                placeholder="Hizmet fiyatı"
              />
            </div>
            <div>
              <label className={labelClass}>Not</label>
              <input
                className={inputClass}
                value={form.notes}
                onChange={(e) => set('notes', e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p className="border-2 border-[#16130F] bg-[#FF4A1C] p-2 text-[10px] tracking-[0.06em]">
              {error}
            </p>
          )}

          <button
            onClick={save}
            disabled={saving}
            className="mt-1 w-full border-2 border-[#16130F] bg-[#16130F] py-3 text-[10px] tracking-[0.16em] text-[#F2C230] transition-colors hover:bg-[#FF4A1C] hover:text-[#16130F] disabled:opacity-50"
          >
            {saving ? 'KAYDEDİLİYOR…' : 'RANDEVUYU KAYDET'}
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}