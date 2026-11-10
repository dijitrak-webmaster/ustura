import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import ScissorMark from './ScissorMark';
import { navItems, salon } from '@/data/salonContent';

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'border-b border-border/70 bg-background/80 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 md:px-10">
          <Link to="/" className="group flex items-center gap-3">
            <ScissorMark className="h-7 w-7 text-accent transition-transform duration-500 group-hover:rotate-12" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl tracking-[0.35em] text-foreground">{salon.name}</span>
              <span className="label-mono mt-1 text-[9px] text-muted-foreground">{salon.suffix}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative label-mono text-[10px] text-foreground/70 transition-colors hover:text-foreground"
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${salon.phone.replace(/\s/g, '')}`}
              className="hidden items-center gap-2 label-mono text-[10px] text-foreground/70 transition-colors hover:text-accent md:flex"
            >
              <Phone className="h-3.5 w-3.5" />
              {salon.phone}
            </a>
            <Link
              to="/randevu"
              className="group relative hidden overflow-hidden bg-accent px-6 py-3 label-mono text-[10px] text-accent-foreground sm:block"
            >
              <span className="relative z-10">Randevu Al</span>
              <span className="absolute inset-0 -translate-x-full bg-foreground transition-transform duration-500 group-hover:translate-x-0" />
              <span className="absolute inset-0 z-10 flex items-center justify-center text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Randevu Al
              </span>
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors hover:border-accent hover:text-accent lg:hidden"
              aria-label="Menüyü aç"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] lg:hidden">
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-x-0 top-0 h-[52%] bg-[#08080a]"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-x-0 bottom-0 h-[52%] bg-[#08080a]"
            />
            <div className="relative flex h-full flex-col justify-between px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-lg tracking-[0.35em]">MENÜ</span>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-11 items-center justify-center border border-border text-foreground"
                  aria-label="Menüyü kapat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
                    className="border-b border-border/60 py-4 font-display text-3xl tracking-wide text-foreground"
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="mt-6">
                  <Link
                    to="/randevu"
                    onClick={() => setOpen(false)}
                    className="block bg-accent px-6 py-4 text-center label-mono text-[11px] text-accent-foreground"
                  >
                    Randevu Al
                  </Link>
                </motion.div>
              </nav>
              <p className="label-mono text-[10px] text-muted-foreground">{salon.address}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}