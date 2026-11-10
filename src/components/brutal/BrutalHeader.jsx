import { useState } from 'react';
import { Link } from 'react-router-dom';
import { navItems, salon } from '@/data/salonContent';
import BarberPole from './BarberPole';

export default function BrutalHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[#16130F] bg-[#D8D5CD]">
      <BarberPole className="h-[10px] w-full border-b-2 border-[#16130F]" />
      <div className="flex items-center justify-between gap-4 px-5 py-[18px] md:px-10">
        <Link to="/" aria-label={salon.name} className="flex items-center">
          <img
            src={salon.logo}
            alt={`${salon.name} · ${salon.suffix}`}
            className="h-12 w-auto sm:h-12 lg:h-14 xl:h-16"
          />
        </Link>

        <nav className="hidden items-center gap-7 text-[12px] tracking-[0.14em] lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="border-b-2 border-transparent py-1.5 transition-colors duration-200 hover:border-[#FF4A1C] hover:text-[#FF4A1C] focus-visible:border-[#FF4A1C] focus-visible:text-[#FF4A1C] focus-visible:outline-none"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/randevularim"
            className="hidden border-b-2 border-transparent py-1.5 text-[11px] tracking-[0.14em] transition-colors hover:border-[#FF4A1C] hover:text-[#FF4A1C] md:block"
          >
            Randevularım
          </Link>
          <span className="hidden text-[12px] tracking-[0.16em] xl:block">{salon.phone}</span>
          <span className="hidden sm:inline-flex">
            <Link to="/randevu" className="b-btn">
              Randevu Al
            </Link>
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="b-btn b-btn-w px-4 py-3 lg:hidden"
            aria-expanded={open}
          >
            {open ? 'Kapat' : 'Menü'}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t-2 border-[#16130F] px-5 py-4 lg:hidden">
          <nav className="flex flex-col text-[12px] tracking-[0.14em]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b-2 border-[#16130F]/20 py-3.5"
              >
                {item.label}
              </a>
            ))}
            <Link to="/randevularim" onClick={() => setOpen(false)} className="border-b-2 border-[#16130F]/20 py-3.5">
              Randevularım
            </Link>
            <Link to="/randevu" onClick={() => setOpen(false)} className="b-btn mt-4 justify-center">
              Randevu Al
            </Link>
            <a
              href={`tel:${salon.phone.replace(/\s/g, '')}`}
              className="mt-3 flex items-center justify-between border-2 border-[#16130F] bg-[#D8D5CD] px-4 py-3 text-[11px] tracking-[0.14em]"
            >
              {salon.phone}
              <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}