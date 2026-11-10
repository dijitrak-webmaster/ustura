import SectionHead from './SectionHead';
import { salon } from '@/data/salonContent';

const phoneDigits = salon.phone.replace(/\D/g, '');
const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  salon.address
)}`;
const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(salon.address)}&z=15&output=embed`;

export default function BrutalContact() {
  return (
    <section id="iletisim" className="scroll-mt-24 px-5 py-16 md:px-10 md:py-[90px]">
      <SectionHead
        tag="İLETİŞİM"
        index="10"
        title="KAPIYI ÇAL,"
        accent="SANDALYEYE OTUR."
        copy="Randevusuz gelen misafir için bekleme koltuğu her zaman var. Kesin saat için telefonla teyit alın."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border-2 border-[#16130F] bg-[#D8D5CD] p-5 shadow-[8px_8px_0_#16130F] sm:col-span-2">
            <p className="text-[10px] tracking-[0.2em] opacity-60">ADRES</p>
            <p className="mt-2 text-[17px] leading-[1.35] tracking-[-0.02em]">{salon.address}</p>
            <a
              href={directions}
              target="_blank"
              rel="noreferrer"
              className="b-btn b-btn-w mt-4 inline-flex"
            >
              Yol Tarifi ↘
            </a>
          </div>

          <div className="border-2 border-[#16130F] bg-[#16130F] p-5 text-[#D8D5CD] shadow-[8px_8px_0_#FF4A1C]">
            <p className="text-[10px] tracking-[0.2em] opacity-60">TELEFON</p>
            <a
              href={`tel:+${phoneDigits}`}
              className="mt-2 block text-[17px] tracking-[-0.01em] underline decoration-[#FF4A1C] decoration-2 underline-offset-4"
            >
              {salon.phone}
            </a>
            <a
              href={`https://wa.me/${phoneDigits}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex border-2 border-[#FF4A1C] px-3 py-2 text-[10px] tracking-[0.16em] text-[#FF4A1C] transition-colors duration-150 hover:bg-[#FF4A1C] hover:text-[#16130F]"
            >
              WHATSAPP →
            </a>
          </div>

          <div className="border-2 border-[#16130F] bg-[#D8D5CD] p-5 shadow-[8px_8px_0_#16130F]">
            <p className="text-[10px] tracking-[0.2em] opacity-60">ÇALIŞMA SAATLERİ</p>
            <ul className="mt-2 space-y-1.5 text-[12px] tracking-[0.02em]">
              {salon.hours.map((slot) => (
                <li
                  key={slot.day}
                  className="flex items-baseline justify-between gap-3 border-b border-[#16130F]/20 pb-1"
                >
                  <span>{slot.day}</span>
                  <b className="whitespace-nowrap font-semibold">{slot.time}</b>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[10px] tracking-[0.12em] opacity-60">
              SON RANDEVU KAPANIŞTAN 45 DK ÖNCE
            </p>
          </div>
        </div>

        <div className="relative border-2 border-[#16130F] bg-[#D8D5CD] shadow-[10px_10px_0_#16130F]">
          <iframe
            title={`${salon.name} konumu`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[320px] w-full grayscale contrast-[1.15] md:h-full md:min-h-[420px]"
          />
          <span className="pointer-events-none absolute left-4 top-4 rotate-[-2deg] border-2 border-[#16130F] bg-[#F2C230] px-3 py-1.5 text-[10px] tracking-[0.18em]">
            {salon.name.toUpperCase()} · {salon.city}
          </span>
        </div>
      </div>
    </section>
  );
}