import { useEffect, useMemo, useState } from 'react';
import { Pencil, Plus, Search, Ticket, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { base44 } from '@/api/base44Client';

const inputClass =
  'mt-1.5 w-full border-2 border-[#16130F] bg-[#ECE9E2] px-3 py-2 font-mono text-[11px] text-[#16130F] outline-none focus:bg-[#F2C230]';
const labelClass = 'text-[9px] tracking-[0.16em] text-[#16130F]/70';

const emptyForm = { name: '', phone: '' };

export default function CustomersBoard({ cards, onRefresh }) {
  const [term, setTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const visible = useMemo(() => {
    const q = term.trim().toLowerCase();
    if (!q) return cards;
    return cards.filter(
      (c) =>
        (c.name || '').toLowerCase().includes(q) || (c.phone || '').replace(/\s+/g, '').includes(q)
    );
  }, [cards, term]);

  useEffect(() => {
    if (!open) setEditing(null);
  }, [open]);

  const startNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const startEdit = (card) => {
    setEditing(card);
    setForm({ name: card.name || '', phone: card.phone || '' });
    setOpen(true);
  };

  const save = async () => {
    const phone = form.phone.replace(/\s+/g, '');
    if (phone.length < 6) return;
    if (editing) {
      await base44.entities.LoyaltyCard.update(editing.id, { name: form.name.trim(), phone });
    } else {
      await base44.entities.LoyaltyCard.create({
        name: form.name.trim(),
        phone,
        visits: 0,
        free_cuts: 0,
        last_visit: new Date().toISOString().slice(0, 10),
      });
    }
    setOpen(false);
    setForm(emptyForm);
    onRefresh();
  };

  const remove = async (card) => {
    await base44.entities.LoyaltyCard.delete(card.id);
    onRefresh();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 opacity-50" />
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="İSİM VEYA TELEFON ARA"
            className="w-full border-2 border-[#16130F] bg-[#ECE9E2] py-2.5 pl-9 pr-3 font-mono text-[11px] tracking-[0.06em] outline-none focus:bg-[#F2C230]"
          />
        </div>
        <button
          onClick={startNew}
          className="flex items-center gap-2 border-2 border-[#16130F] bg-[#FF4A1C] px-4 py-2.5 text-[10px] tracking-[0.14em] shadow-[4px_4px_0_#16130F] transition-transform duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#16130F]"
        >
          <Plus className="h-3.5 w-3.5" /> MÜŞTERİ EKLE
        </button>
      </div>

      <p className="mt-3 text-[9px] tracking-[0.16em] opacity-60">
        {cards.length} KAYITLI MÜŞTERİ · RANDEVU ALANLAR OTOMATİK EKLENİR
      </p>

      <div className="mt-3 hidden border-2 border-[#16130F] bg-[#16130F] px-3 py-2 text-[9px] tracking-[0.14em] text-[#F2C230] md:grid md:grid-cols-[1fr_150px_90px_90px_120px]">
        <span>MÜŞTERİ</span>
        <span>TELEFON</span>
        <span>TIRAŞ</span>
        <span>BEDAVA</span>
        <span className="text-right">İŞLEM</span>
      </div>

      <div className="mt-2 space-y-2">
        {visible.length === 0 && (
          <p className="border-2 border-dashed border-[#16130F]/40 p-6 text-center text-[10px] tracking-[0.14em] opacity-60">
            MÜŞTERİ BULUNAMADI.
          </p>
        )}

        {visible.map((card) => (
          <div
            key={card.id}
            className="grid gap-2 border-2 border-[#16130F] bg-[#ECE9E2] px-3 py-2.5 md:grid-cols-[1fr_150px_90px_90px_120px] md:items-center"
          >
            <div className="min-w-0">
              <p className="truncate text-[13px] tracking-[-0.01em]">{card.name || 'İSİMSİZ'}</p>
              {card.last_visit && (
                <p className="mt-0.5 text-[9px] tracking-[0.08em] opacity-50">
                  SON: {card.last_visit.split('-').reverse().join('.')}
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 md:contents">
              <p className="text-[11px] tracking-[0.06em] opacity-80">{card.phone}</p>
              <p className="text-[13px] tracking-[-0.02em]">
                <b className="font-semibold">{Number(card.visits || 0)}</b>
                <span className="ml-1 text-[9px] opacity-50">/ 10 TIRAŞ</span>
              </p>
              <p className="text-[11px]">
                {Number(card.free_cuts || 0) > 0 ? (
                  <span className="inline-flex items-center gap-1 border-2 border-[#16130F] bg-[#F2C230] px-1.5 py-0.5">
                    <Ticket className="h-3 w-3" /> {card.free_cuts}
                  </span>
                ) : (
                  <span className="opacity-40">—</span>
                )}
              </p>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => startEdit(card)}
                aria-label="Müşteriyi düzenle"
                className="flex h-9 w-9 items-center justify-center border-2 border-[#16130F] transition-colors hover:bg-[#F2C230] md:h-7 md:w-7"
              >
                <Pencil className="h-3 w-3" />
              </button>
              <button
                onClick={() => remove(card)}
                aria-label="Müşteriyi sil"
                className="flex h-9 w-9 items-center justify-center border-2 border-[#16130F] transition-colors hover:bg-[#FF4A1C] md:h-7 md:w-7"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-2 border-[#16130F] bg-[#D8D5CD] font-mono text-[#16130F]">
          <DialogHeader>
            <DialogTitle className="text-[16px] uppercase tracking-[0.06em]">
              {editing ? 'Müşteriyi düzenle' : 'Yeni müşteri'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Telefon</label>
              <input
                className={inputClass}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="05xx xxx xx xx"
              />
            </div>
            <div>
              <label className={labelClass}>İsim</label>
              <input
                className={inputClass}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
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