import { Link } from 'react-router-dom';
import AynaSection from './AynaSection';

export default function AynaServices({ services }) {
  return (
    <AynaSection
      id="hizmetler"
      tag="01 / HİZMET MENÜSÜ"
      title="HER KESİM BİR"
      accent="ÖLÇÜ İŞİ."
      copy="Fiyatlar ustanın el emeği dahil, tek seansta biten işlemlerdir. Bir hizmete dokunun, randevuya geçin."
    >
      <div className="border-t border-[#F1ECE2]/12">
        {services.map((service) => (
          <Link
            key={service.id || service.slug}
            to="/randevu"
            className="group flex flex-col gap-3 border-b border-[#F1ECE2]/12 py-6 transition-colors duration-300 hover:bg-[#F1ECE2]/[0.03] md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-8 md:py-7"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="ayna-display text-[30px] transition-colors duration-300 group-hover:text-[#C9A15A] md:text-[40px]">
                  {service.name}
                </h3>
                <span className="ayna-label text-[#F1ECE2]/35">{service.duration} DK</span>
              </div>
              <p className="mt-2 max-w-[52ch] text-[12px] leading-[1.7] text-[#F1ECE2]/55 md:text-[13px]">
                {service.description}
              </p>
              {service.tools?.length > 0 && (
                <span className="ayna-label mt-2.5 block text-[#F1ECE2]/30">
                  {service.tools.join(' · ')}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between gap-6 md:justify-end">
              <b className="ayna-display text-[34px] text-[#F1ECE2] md:text-[46px]">
                ₺{Number(service.price).toLocaleString('tr-TR')}
              </b>
              <span className="ayna-label text-[#C9A15A] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Seç →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </AynaSection>
  );
}