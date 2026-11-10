import { useEffect, useState } from 'react';
import { Plus, Search, Ticket, Link2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { base44 } from '@/api/base44Client';
import { playCoinSound } from '@/lib/coinSound';
import LoyaltyLinkDialog from './LoyaltyLinkDialog';

const inputClass =
  'mt-2 w-full border-2 border-[#16130F] bg-[#ECE9E2] px-3 py-2 font-mono text-[11px] text-[#16130F] outline-none focus:bg-[#F2C230]';

const labelClass = 'text-[9px] tracking-[0.16em] text-[#16130F]/70';

const today = () => new Date().toISOString().slice(0, 10);

function Stamps({ visits }) {
  const filled = visits > 0 && visits % 10 === 0 ? 10 : visits % 10;
  return (
    <div className="flex gap-1">
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={i}
          className={`h-3 w-3 border-2 border-[#16130F] ${
            i < filled ? 'bg-[#FF4A1C]' : 'bg-transparent'
          }`}
        />
      ))}
    </div>
  );
}

export default function LoyaltyBoard({ cards, onRefresh }) {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState(cards);
  const [open, setOpen] = useState(false);
  const [linkCard, setLinkCard] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '' });

  useEffect(() => {
    const q = term.trim();
    if (!q) {
      setResults(cards);
      return;
    }
    let alive = true;
    base44.entities.LoyaltyCard.filter(
      { $or: [{ phone: { $regex: q } }, { name: { $regex: q } }] },
      { sort: '-last_visit', limit: 20 }
    ).then((page) => {
      if (alive) setResults(page.items || []);
    });
    return () => {
      alive = false;
    };
  }, [term, cards]);

  const punch = async (card) => {
    playCoinSound();
    const visits = Number(card.visits || 0);
    const free = Number(card.free_cuts || 0);
    await base44.entities.LoyaltyCard.update(card.id, {
      visits: visits + 1,
      free_cuts: visits % 10 === 9 ? free + 1 : free,
      last_visit: today(),
    });
    onRefresh();
  };

  const award = async (card) => {
    const free = Number(card.free_cuts || 0);
    await base44.entities.LoyaltyCard.update(card.id, {
      free_cuts: Math.max(0, free - 1),
    });
    onRefresh();
  };

  const create = async () => {
    if (!form.phone.trim()) return;
    await base44.entities.LoyaltyCard.create({
      name: form.name.trim(),
      phone: form.phone.trim(),
      visits: 0,
      free_cuts: 0,
      last_visit: today(),
    });
    setOpen(false);
    setForm({ name: '', phone: '' });
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
            placeholder="TELEFON VEYA İSİM YAZ"
            className="w-full border-2 border-[#16130F] bg-[#ECE9E2] py-2.5 pl-9 pr-3 font-mono text-[11px] tracking-[0.06em] outline-none focus:bg-[#F2C230]"
          />
        </div>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 border-2 border-[#16130F] bg-[#FF4A1C] px-4 py-2.5 text-[10px] tracking-[0.14em] shadow-[4px_4px_0_#16130F] transition-transform duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#16130F]"
        >
          <Plus className="h-3.5 w-3.5" /> YENİ KART
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {results.length === 0 && (
          <p className="border-2 border-dashed border-[#16130F]/40 p-6 text-center text-[10px] tracking-[0.14em] opacity-60">
            KAYIT BULUNAMADI. “YENİ KART” İLE EKLEYİN.
          </p>
        )}

        {results.map((card) => (
          <div
            key={card.id}
            className="flex flex-wrap items-center gap-x-4 gap-y-3 border-2 border-[#16130F] bg-[#D8D5CD] p-3 shadow-[4px_4px_0_#16130F]"
          >
            <div className="w-[64px] shrink-0 border-2 border-[#16130F] bg-[#16130F] px-1 py-1 text-center text-[#F2C230]">
              <p className="text-[18px] leading-none tracking-[-0.04em]">{card.visits || 0}</p>
              <p className="mt-1 text-[7px] tracking-[0.12em]">TIRAŞ</p>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[13px] tracking-[-0.01em]">{card.name || 'İSİMSİZ'}</p>
              <p className="mt-1 text-[10px] tracking-[0.06em] opacity-60">{card.phone}</p>
              <div className="mt-2">
                <Stamps visits={Number(card.visits || 0)} />
              </div>
            </div>

            <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
              {Number(card.free_cuts || 0) > 0 && (
                <button
                  onClick={() => award(card)}
                  className="flex items-center gap-1.5 border-2 border-[#16130F] bg-[#F2C230] px-2.5 py-2 text-[9px] tracking-[0.12em] shadow-[3px_3px_0_#16130F] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#16130F]"
                >
                  <Ticket className="h-3.5 w-3.5" />
                  BEDAVA TIRAŞ · {card.free_cuts} · KULLAN
                </button>
              )}

              <button
                onClick={() => setLinkCard(card)}
                className="flex items-center gap-1.5 border-2 border-[#16130F] bg-[#ECE9E2] px-2.5 py-2 text-[9px] tracking-[0.12em] shadow-[3px_3px_0_#16130F] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#16130F]"
              >
                <Link2 className="h-3.5 w-3.5" />
                KART LİNKİ
              </button>

              <button
                onClick={() => punch(card)}
                className="ml-auto border-2 border-[#16130F] bg-[#16130F] px-3.5 py-2 text-[9px] tracking-[0.14em] text-[#F2C230] transition-colors hover:bg-[#FF4A1C] hover:text-[#16130F] sm:ml-0"
              >
                +1 TIRAŞ
              </button>
            </div>
          </div>
        ))}
      </div>

      <LoyaltyLinkDialog
        card={linkCard}
        open={Boolean(linkCard)}
        onOpenChange={(v) => !v && setLinkCard(null)}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-2 border-[#16130F] bg-[#D8D5CD] font-mono text-[#16130F]">
          <DialogHeader>
            <DialogTitle className="text-[16px] uppercase tracking-[0.06em]">Yeni sadakat kartı</DialogTitle>
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
              onClick={create}
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