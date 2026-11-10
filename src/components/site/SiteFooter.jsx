import { Link } from 'react-router-dom';
import { Instagram, MapPin, Phone } from 'lucide-react';
import ScissorMark from './ScissorMark';
import { navItems, salon } from '@/data/salonContent';

export default function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-[#08080a]">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3">
              <ScissorMark className="h-7 w-7 text-accent" />
              <span className="font-display text-xl tracking-[0.35em]">{salon.name}</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-foreground/45">{salon.tagline}</p>
            <div className="mt-6 flex gap-3">
              <a
                href={`https://www.instagram.com/`}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center border border-border text-foreground/60 transition-colors hover:border-accent hover:text-accent"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={`tel:${salon.phone.replace(/\s/g, '')}`}
                aria-label="Telefon"
                className="flex h-10 w-10 items-center justify-center border border-border text-foreground/60 transition-colors hover:border-accent hover:text-accent"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(salon.address)}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Konum"
                className="flex h-10 w-10 items-center justify-center border border-border text-foreground/60 transition-colors hover:border-accent hover:text-accent"
              >
                <MapPin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="label-mono text-[10px] text-blade">MENÜ</p>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-foreground/55 transition-colors hover:text-accent">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/randevu" className="text-sm text-foreground/55 transition-colors hover:text-accent">
                  Randevu Al
                </Link>
              </li>
              <li>
                <Link to="/panel" className="text-sm text-foreground/55 transition-colors hover:text-accent">
                  İşletme Paneli
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="label-mono text-[10px] text-blade">İLETİŞİM</p>
            <ul className="mt-5 space-y-3 text-sm text-foreground/55">
              <li>{salon.address}</li>
              <li>
                <a href={`tel:${salon.phone.replace(/\s/g, '')}`} className="transition-colors hover:text-accent">
                  {salon.phone}
                </a>
              </li>
              <li className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Pzt – Cmt · 10:00 – 21:00
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 md:flex-row md:items-center">
          <p className="label-mono text-[9px] text-muted-foreground">
            © {new Date().getFullYear()} {salon.name} — TÜM HAKLARI SAKLIDIR
          </p>
          <p className="label-mono text-[9px] text-muted-foreground">KADIKÖY / İSTANBUL</p>
        </div>
      </div>
    </footer>
  );
}