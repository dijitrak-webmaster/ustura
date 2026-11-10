import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Ticket, Scissors } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import '@/styles/brutal.css';
import BrutalHeader from '@/components/brutal/BrutalHeader';
import BrutalFooter from '@/components/brutal/BrutalFooter';
import HazardBand from '@/components/brutal/HazardBand';
import { salon } from '@/data/salonContent';
import { formatLongDate } from '@/lib/bookingSlots';

const STAMP_COUNT = 10;

function Stamps({ visits }) {
  const filled = visits > 0 && visits % STAMP_COUNT === 0 ? STAMP_COUNT : visits % STAMP_COUNT;
  return (
    <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-10">
      {Array.from({ length: STAMP_COUNT }).map((_, i) => (
        <div
          key={i}
          className={`flex aspect-square items-center justify-center border-2 border-[#16130F] ${
            i < filled ? 'bg-[#FF4A1C]' : 'bg-transparent'
          }`}
        >
          {i < filled && <Scissors className="h-3.5 w-3.5 text-[#16130F]" />}
        </div>
      ))}
    </div>
  );
}

export default function MusteriKarti() {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [state, setState] = useState('loading');

  useEffect(() => {
    let active = true;
    base44.entities.LoyaltyCard.get(id)
      .then((record) => {
        if (!active) return;
        if (record) {
          setCard(record);
          setState('ready');
        } else {
          setState('missing');
        }
      })
      .catch(() => active && setState('missing'));
    return () => {
      active = false;
    };
  }, [id]);

  const visits = Number(card?.visits || 0);
  const filled = visits > 0 && visits % STAMP_COUNT === 0 ? STAMP_COUNT : visits % STAMP_COUNT;
  const remaining = STAMP_COUNT - filled;
  const freeCuts = Number(card?.free_cuts || 0);

  return (
    <div className="brutal min-h-screen">
      <BrutalHeader />

      <section className="border-b-2 border-[#16130F] px-5 pb-9 pt-9 md:px-10">
        <div className="mx-auto max-w-[820px]">
          <p className="flex items-center gap-2 text-[10px] tracking-[0.2em]">
            <span className="b-dot" />
            SADAKAT KARTI · {salon.name}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 rotate-[-1deg] text-[30px] leading-[0.88] tracking-[-0.07em] sm:text-[46px] md:text-[64px]"
          >
            TIRAŞ KARTIN
          </motion.h1>
        </div>
      </section>

      <main className="mx-auto max-w-[820px] px-5 py-9 md:px-10 md:py-12">
        {state === 'loading' && (
          <p className="text-[11px] tracking-[0.14em] opacity-60">KART YÜKLENİYOR…</p>
        )}

        {state === 'missing' && (
          <div className="border-2 border-[#16130F] bg-[#D8D5CD] p-6 shadow-[6px_6px_0_#16130F]">
            <p className="text-[14px] tracking-[-0.01em]">KART BULUNAMADI</p>
            <p className="b-copy mt-3 text-[12px] leading-[1.7]">
              Link geçersiz olabilir. Atölyeyi arayıp kartınızı yeniden isteyebilirsiniz.
            </p>
            <a href={`tel:${salon.phone.replace(/\s/g, '')}`} className="b-btn mt-5">
              <Phone className="h-3.5 w-3.5" />
              {salon.phone}
            </a>
          </div>
        )}

        {state === 'ready' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="border-2 border-[#16130F] bg-[#D8D5CD] shadow-[8px_8px_0_#16130F]"
          >
            <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-[#16130F] bg-[#16130F] px-5 py-4 text-[#F2C230]">
              <div>
                <p className="text-[9px] tracking-[0.2em] opacity-70">KART SAHİBİ</p>
                <p className="mt-1 text-[18px] tracking-[-0.02em] md:text-[22px]">
                  {card.name || 'İSİMSİZ MÜŞTERİ'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] tracking-[0.2em] opacity-70">TOPLAM</p>
                <p className="text-[26px] leading-none tracking-[-0.04em]">{visits}</p>
                <p className="text-[8px] tracking-[0.18em]">TIRAŞ</p>
              </div>
            </div>

            <div className="px-5 py-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] tracking-[0.16em]">DAMGALAR</p>
                <p className="text-[10px] tracking-[0.12em] opacity-60">
                  {filled} / {STAMP_COUNT}
                </p>
              </div>

              <Stamps visits={visits} />

              <p className="b-copy mt-5 text-[12px] leading-[1.7]">
                {remaining === STAMP_COUNT
                  ? 'İlk damganı aldığında kart başlıyor. Her tıraş bir damga.'
                  : `Bedava tıraşa ${remaining} damga kaldı.`}
              </p>

              {freeCuts > 0 && (
                <div className="mt-5 flex flex-wrap items-center gap-3 border-2 border-[#16130F] bg-[#F2C230] px-4 py-3">
                  <Ticket className="h-4 w-4" />
                  <p className="text-[11px] tracking-[0.12em]">
                    {freeCuts} BEDAVA TIRAŞ HAZIR · KASADA SÖYLE
                  </p>
                </div>
              )}

              {card.last_visit && (
                <p className="mt-5 text-[10px] tracking-[0.1em] opacity-55">
                  SON TIRAŞ · {formatLongDate(card.last_visit)}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t-2 border-[#16130F] px-5 py-4">
              <Link to="/randevu" className="b-btn">
                Randevu al ↗
              </Link>
              <a href={`tel:${salon.phone.replace(/\s/g, '')}`} className="b-btn b-btn-w">
                <Phone className="h-3.5 w-3.5" />
                {salon.phone}
              </a>
            </div>
          </motion.div>
        )}
      </main>

      <HazardBand />
      <BrutalFooter />
    </div>
  );
}