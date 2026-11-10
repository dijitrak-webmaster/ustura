import { useState } from 'react';
import { Copy, Check, MessageCircle, Link2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const buildLink = (card) =>
  card ? `${window.location.origin}/kart/${card.id}` : '';

const waNumber = (phone) => {
  const digits = String(phone || '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('90')) return digits;
  if (digits.startsWith('0')) return `90${digits.slice(1)}`;
  return digits;
};

export default function LoyaltyLinkDialog({ card, open, onOpenChange }) {
  const [copied, setCopied] = useState(false);
  const link = buildLink(card);
  const message = `${card?.name ? `${card.name}, ` : ''}tıraş kartın burada: ${link}`;

  const copy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-2 border-[#16130F] bg-[#D8D5CD] font-mono text-[#16130F]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[16px] uppercase tracking-[0.06em]">
            <Link2 className="h-4 w-4" /> Müşteri kart linki
          </DialogTitle>
        </DialogHeader>

        <p className="text-[10px] tracking-[0.1em] opacity-60">
          {card?.name || 'İSİMSİZ'} · {card?.phone}
        </p>

        <div className="border-2 border-[#16130F] bg-[#ECE9E2] px-3 py-2.5 text-[10px] leading-[1.5] break-all">
          {link}
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <button
            onClick={copy}
            className="flex items-center justify-center gap-2 border-2 border-[#16130F] bg-[#16130F] py-3 text-[10px] tracking-[0.14em] text-[#F2C230] transition-colors hover:bg-[#FF4A1C] hover:text-[#16130F]"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'KOPYALANDI' : 'LİNKİ KOPYALA'}
          </button>
          <a
            href={`https://wa.me/${waNumber(card?.phone)}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 border-2 border-[#16130F] bg-[#F2C230] py-3 text-[10px] tracking-[0.14em] transition-colors hover:bg-[#FF4A1C]"
          >
            <MessageCircle className="h-3.5 w-3.5" /> WHATSAPP İLE GÖNDER
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}