import { useState } from 'react';
import { Link } from 'react-router-dom';
import { navItems, salon } from '@/data/salonContent';

export default function AynaHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#F1ECE2]/10 bg-[#060708]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-5 py-3.5 md:px-10">
        <Link to="/" className="flex items-baseline gap-3">
          <b className="ayna-display text-[26px] leading-none md:text-[30px]">{salon.name}</b>
          <span className="ayna-label hidden text-[#F1ECE2]/40 sm:block">{salon.suffix}</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="ayna-label text-[#F1ECE2]/60 transition-colors duration-200 hover:text-[#C9A15A]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={`tel:${salon.phone.replace(/\s/g, '')}`}
            className="ayna-label hidden text-[#F1ECE2]/50 xl:block"
          >
            {salon.phone}
          </a>
          <Link
            to="/randevu"
            className="ayna-label hidden border border-[#C9A15A] px-4 py-2.5 text-[#C9A15A] transition-colors duration-200 hover:bg-[#C9A15A] hover:text-[#060708] sm:inline-flex"
          >
            Randevu Al
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="ayna-label border border-[#F1ECE2]/25 px-3 py-2.5 text-[#F1ECE2]/75 lg:hidden"
          >
            {open ? 'Kapat' : 'Menü'}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#F1ECE2]/10 px-5 py-3 lg:hidden">
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="ayna-label border-b border-[#F1ECE2]/10 py-3.5 text-[#F1ECE2]/70"
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/randevu"
              onClick={() => setOpen(false)}
              className="ayna-label mt-4 border border-[#C9A15A] px-4 py-3 text-center text-[#C9A15A]"
            >
              Randevu Al
            </Link>
            <a href={`tel:${salon.phone.replace(/\s/g, '')}`} className="ayna-label mt-3 text-[#F1ECE2]/45">
              {salon.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}