import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { base44 } from '@/api/base44Client';

const inputClass =
  'mt-2 w-full border-2 border-[#16130F] bg-[#ECE9E2] px-3 py-2 font-mono text-[11px] text-[#16130F] outline-none focus:bg-[#F2C230]';

const labelClass = 'text-[9px] tracking-[0.16em] text-[#16130F]/70';

const empty = { name: '', description: '', price: '', duration: '', tools: '', active: true };

export default function ServiceManager({ services, onRefresh }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);

  const startNew = () => {
    setForm(empty);
    setEditingId(null);
    setOpen(true);
  };

  const startEdit = (service) => {
    setForm({
      name: service.name || '',
      description: service.description || '',
      price: service.price ?? '',
      duration: service.duration ?? '',
      tools: (service.tools || []).join(', '),
      active: service.active !== false,
    });
    setEditingId(service.id);
    setOpen(true);
  };

  const save = async () => {
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price) || 0,
      duration: Number(form.duration) || 0,
      tools: form.tools
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      active: form.active,
    };
    if (editingId) await base44.entities.Service.update(editingId, payload);
    else await base44.entities.Service.create(payload);
    setOpen(false);
    onRefresh();
  };

  const remove = async (id) => {
    await base44.entities.Service.delete(id);
    onRefresh();
  };

  return (
    <div>
      <button
        onClick={startNew}
        className="flex items-center gap-2 border-2 border-[#16130F] bg-[#FF4A1C] px-4 py-2.5 text-[10px] tracking-[0.14em] shadow-[4px_4px_0_#16130F] transition-transform duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#16130F]"
      >
        <Plus className="h-3.5 w-3.5" /> YENİ HİZMET
      </button>

      <div className="mt-4 space-y-2">
        {services.map((s) => (
          <div
            key={s.id}
            className="flex flex-wrap items-center justify-between gap-3 border-2 border-[#16130F] bg-[#D8D5CD] p-3 shadow-[4px_4px_0_#16130F]"
          >
            <div className="min-w-0">
              <p className="text-[13px] tracking-[-0.01em]">
                {s.name}
                {s.active === false && (
                  <span className="ml-2 text-[9px] tracking-[0.12em] opacity-50">(PASİF)</span>
                )}
              </p>
              <p className="mt-1 text-[10px] tracking-[0.06em] opacity-60">
                ₺{Number(s.price || 0).toLocaleString('tr-TR')} · {s.duration} dk
                {s.tools?.length ? ` · ${s.tools.join(', ')}` : ''}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => startEdit(s)}
                aria-label="Düzenle"
                className="flex h-8 w-8 items-center justify-center border-2 border-[#16130F] transition-colors hover:bg-[#F2C230]"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => remove(s.id)}
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
              {editingId ? 'Hizmeti düzenle' : 'Yeni hizmet'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Hizmet adı</label>
              <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Açıklama</label>
              <textarea
                rows={2}
                className={`${inputClass} resize-none`}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Fiyat (₺)</label>
                <input
                  className={inputClass}
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  inputMode="numeric"
                />
              </div>
              <div>
                <label className={labelClass}>Süre (dk)</label>
                <input
                  className={inputClass}
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  inputMode="numeric"
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Aletler (virgülle)</label>
              <input
                className={inputClass}
                value={form.tools}
                onChange={(e) => setForm({ ...form, tools: e.target.value })}
                placeholder="Makas, Ustura"
              />
            </div>
            <label className="flex items-center gap-2 text-[10px] tracking-[0.06em]">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
              />
              Menüde görünsün
            </label>
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