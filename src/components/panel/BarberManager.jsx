import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { base44 } from '@/api/base44Client';
import { Image } from '@/components/ui/image';

const inputClass =
  'mt-2 w-full border-2 border-[#16130F] bg-[#ECE9E2] px-3 py-2 font-mono text-[11px] text-[#16130F] outline-none focus:bg-[#F2C230]';

const labelClass = 'text-[9px] tracking-[0.16em] text-[#16130F]/70';

const empty = { name: '', role: '', specialty: '', years: '', image: '', active: true };

export default function BarberManager({ barbers, onRefresh }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);

  const startNew = () => {
    setForm(empty);
    setEditingId(null);
    setOpen(true);
  };

  const startEdit = (barber) => {
    setForm({
      name: barber.name || '',
      role: barber.role || '',
      specialty: barber.specialty || '',
      years: barber.years ?? '',
      image: barber.image || '',
      active: barber.active !== false,
    });
    setEditingId(barber.id);
    setOpen(true);
  };

  const save = async () => {
    const payload = {
      name: form.name.trim(),
      role: form.role.trim(),
      specialty: form.specialty.trim(),
      years: Number(form.years) || 0,
      image: form.image.trim(),
      active: form.active,
    };
    if (editingId) await base44.entities.Barber.update(editingId, payload);
    else await base44.entities.Barber.create(payload);
    setOpen(false);
    onRefresh();
  };

  const remove = async (id) => {
    await base44.entities.Barber.delete(id);
    onRefresh();
  };

  return (
    <div>
      <button
        onClick={startNew}
        className="flex items-center gap-2 border-2 border-[#16130F] bg-[#FF4A1C] px-4 py-2.5 text-[10px] tracking-[0.14em] shadow-[4px_4px_0_#16130F] transition-transform duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#16130F]"
      >
        <Plus className="h-3.5 w-3.5" /> YENİ USTA
      </button>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {barbers.map((b) => (
          <div
            key={b.id}
            className="flex items-center gap-3 border-2 border-[#16130F] bg-[#D8D5CD] p-3 shadow-[4px_4px_0_#16130F]"
          >
            <div className="h-14 w-14 shrink-0 overflow-hidden border-2 border-[#16130F] bg-[#ECE9E2]">
              {b.image ? <Image src={b.image} alt={b.name} className="h-full w-full" fittingType="fill" /> : null}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] tracking-[-0.01em]">{b.name}</p>
              <p className="mt-1 truncate text-[10px] tracking-[0.06em] opacity-60">
                {b.role || b.specialty} · {b.years || 0} yıl
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => startEdit(b)}
                aria-label="Düzenle"
                className="flex h-8 w-8 items-center justify-center border-2 border-[#16130F] transition-colors hover:bg-[#F2C230]"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => remove(b.id)}
                aria-label="Sil"
                className="flex h-8 w-8 items-center justify-center border-2 border-[#16130F] transition-colors hover:bg-[#FF4A1C]"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-2 border-[#16130F] bg-[#D8D5CD] font-mono text-[#16130F]">
          <DialogHeader>
            <DialogTitle className="text-[16px] uppercase tracking-[0.06em]">
              {editingId ? 'Ustayı düzenle' : 'Yeni usta'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Ad soyad</label>
              <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Ünvan</label>
                <input className={inputClass} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Uzmanlık</label>
                <input
                  className={inputClass}
                  value={form.specialty}
                  onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Deneyim (yıl)</label>
                <input
                  className={inputClass}
                  value={form.years}
                  onChange={(e) => setForm({ ...form, years: e.target.value })}
                  inputMode="numeric"
                />
              </div>
              <div>
                <label className={labelClass}>Aktif</label>
                <label className="mt-3 flex items-center gap-2 text-[10px] tracking-[0.06em]">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  />
                  Randevu alabilir
                </label>
              </div>
            </div>
            <div>
              <label className={labelClass}>Fotoğraf bağlantısı</label>
              <input className={inputClass} value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            </div>
            <button
              onClick={save}
              className="w-full border-2 border-[#16130F] bg-[#16130F] py-3 text-[10px] tracking-[0.16em] text-[#F2C230] transition-colors hover:bg-[#FF4A1C] hover:text-[#16130F]"
            >
              KAYDET
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}