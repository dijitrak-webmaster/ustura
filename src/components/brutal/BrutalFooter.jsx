import { Link } from 'react-router-dom';
import { navItems, salon } from '@/data/salonContent';

const year = new Date().getFullYear();

export default function BrutalFooter() {
  return (
    <footer className="border-t-2 border-[#16130F] bg-[#F2C230] px-5 pb-7 pt-10 md:px-10 md:pt-14">
      <div className="mx-auto grid max-w-[1180px] gap-9 md:grid-cols-[1.25fr_1fr_1fr] md:gap-12">
        <div>
          <img
            src={salon.logo}
            alt={`${salon.name} · ${salon.suffix}`}
            className="h-16 w-auto md:h-24"
          />
          <p className="mt-3 text-[10px] tracking-[0.2em] md:text-[11px]">EDİRNE · EST. 2016</p>
          <p className="b-copy mt-4 max-w-[34ch] text-[12px] leading-[1.7] md:text-[13px]">
            Edirne'de ölçüyle çalışan bir tıraş atölyesi. Kesim, ustura ve sıcak havlu; hepsi aynı
            tezgâhta, aynı elde.
          </p>
          <Link to="/randevu" className="b-btn mt-5">
            Randevu Al ↘
          </Link>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.2em] opacity-60">İLETİŞİM</p>
          <a
            href={`tel:${salon.phone.replace(/\s/g, '')}`}
            className="mt-3 block border-b-2 border-[#16130F] pb-1 text-[15px] tracking-[-0.01em] md:text-[17px]"
          >
            {salon.phone}
          </a>
          <p className="b-copy mt-3 text-[12px] leading-[1.7]">{salon.address}</p>

          <p className="mt-6 text-[10px] tracking-[0.2em] opacity-60">MENÜ</p>
          <nav className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] tracking-[0.08em]">
            {navItems.map((item) => (
              <a key={item.href} href={`/${item.href}`} className="border-b border-[#16130F]/25 pb-1">
                {item.label}
              </a>
            ))}
            <a href="/#uyelik" className="border-b border-[#16130F]/25 pb-1">
              Üyelik
            </a>
          </nav>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.2em] opacity-60">ÇALIŞMA SAATLERİ</p>
          <ul className="mt-3 space-y-2 text-[11px] tracking-[0.04em] md:text-[12px]">
            {salon.hours.map((slot) => (
              <li
                key={slot.day}
                className="flex items-baseline justify-between gap-3 border-b border-[#16130F]/20 pb-1.5"
              >
                <span>{slot.day}</span>
                <b className="font-semibold">{slot.time}</b>
              </li>
            ))}
          </ul>
          <p className="b-copy mt-4 text-[11px] leading-[1.65]">
            Son randevu kapanıştan 45 dakika önce alınır. Pazar günü atölye kapalı.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1180px] flex-col gap-4 border-t-2 border-[#16130F] pt-4 text-[10px] tracking-[0.14em] md:flex-row md:items-center md:justify-between">
        <span>
          © {year} {salon.name} TIRAŞ ATÖLYESİ · TÜM HAKLARI SAKLIDIR
        </span>
        <Link
          to="/panel"
          className="w-fit border-2 border-[#16130F] bg-[#D8D5CD] px-3.5 py-2 transition-colors duration-150 hover:bg-[#FF4A1C] focus-visible:bg-[#FF4A1C] focus-visible:outline-none"
        >
          İşletme Paneli
        </Link>
      </div>
    </footer>
  );
}