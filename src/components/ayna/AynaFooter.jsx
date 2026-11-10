import { Link } from 'react-router-dom';
import { navItems, salon } from '@/data/salonContent';

const year = new Date().getFullYear();

export default function AynaFooter() {
  return (
    <footer className="border-t border-[#F1ECE2]/12 px-5 pb-8 pt-12 md:px-10 md:pt-16">
      <div className="mx-auto max-w-[1180px]">
        <p className="ayna-display text-[64px] leading-[0.8] text-[#F1ECE2]/10 md:text-[120px]">
          {salon.name}
        </p>

        <div className="mt-8 grid gap-9 md:grid-cols-[1.3fr_1fr_1fr] md:gap-12">
          <div>
            <p className="ayna-label text-[#C9A15A]">
              {salon.name} · {salon.suffix}
            </p>
            <p className="mt-3 max-w-[34ch] text-[12px] leading-[1.8] text-[#F1ECE2]/50 md:text-[13px]">
              Kadıköy'de ölçüyle çalışan bir tıraş atölyesi. Kesim, ustura ve sıcak havlu; hepsi aynı
              tezgâhta, aynı elde.
            </p>
            <Link
              to="/randevu"
              className="ayna-label mt-5 inline-flex border border-[#C9A15A] px-4 py-3 text-[#C9A15A] transition-colors duration-200 hover:bg-[#C9A15A] hover:text-[#060708]"
            >
              Randevu Al ↘
            </Link>
          </div>

          <div>
            <p className="ayna-label text-[#F1ECE2]/30">İLETİŞİM</p>
            <a
              href={`tel:${salon.phone.replace(/\s/g, '')}`}
              className="mt-3 block text-[15px] tracking-[-0.01em] text-[#F1ECE2]/85 md:text-[16px]"
            >
              {salon.phone}
            </a>
            <p className="mt-2 text-[12px] leading-[1.7] text-[#F1ECE2]/45">{salon.address}</p>

            <p className="ayna-label mt-6 text-[#F1ECE2]/30">MENÜ</p>
            <nav className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={`/${item.href}`}
                  className="ayna-label text-[#F1ECE2]/55 transition-colors hover:text-[#C9A15A]"
                >
                  {item.label}
                </a>
              ))}
              <a href="/#uyelik" className="ayna-label text-[#F1ECE2]/55 transition-colors hover:text-[#C9A15A]">
                Üyelik
              </a>
            </nav>
          </div>

          <div>
            <p className="ayna-label text-[#F1ECE2]/30">ÇALIŞMA SAATLERİ</p>
            <ul className="mt-3 space-y-2">
              {salon.hours.map((slot) => (
                <li
                  key={slot.day}
                  className="flex items-baseline justify-between gap-3 border-b border-[#F1ECE2]/10 pb-2 text-[11px] tracking-[0.05em] md:text-[12px]"
                >
                  <span className="text-[#F1ECE2]/50">{slot.day}</span>
                  <b className="font-normal text-[#F1ECE2]/85">{slot.time}</b>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[11px] leading-[1.7] text-[#F1ECE2]/40">
              Son randevu kapanıştan 45 dakika önce alınır. Pazar günü atölye kapalı.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[#F1ECE2]/10 pt-5 md:flex-row md:items-center md:justify-between">
          <span className="ayna-label text-[#F1ECE2]/30">
            © {year} {salon.name} TIRAŞ ATÖLYESİ
          </span>
          <Link
            to="/panel"
            className="ayna-label w-fit border border-[#F1ECE2]/20 px-3.5 py-2 text-[#F1ECE2]/60 transition-colors hover:border-[#C9A15A] hover:text-[#C9A15A]"
          >
            İşletme Paneli
          </Link>
        </div>
      </div>
    </footer>
  );
}