import { Link } from 'react-router-dom';
import SectionHead from './SectionHead';

export default function BrutalServices({ services }) {
  return (
    <section id="hizmetler" className="scroll-mt-24 px-5 py-16 md:px-10 md:py-[90px]">
      <SectionHead
        tag="HİZMET MENÜSÜ"
        index="01"
        title="HER KESİM BİR"
        accent="ÖLÇÜ İŞİ."
        copy="Fiyatlar ustanın el emeği dahil, tek seansta biten işlemlerdir. Bir hizmete dokunun, randevuya geçin."
      />

      <div className="grid grid-cols-1 gap-x-[30px] gap-y-[34px] sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Link key={service.id || service.slug} to="/randevu" className="b-pt">
            <div className="flex items-start justify-between gap-3">
              <i className="border-2 border-[#16130F] bg-[#D8D5CD] px-2 py-1 text-[12px] not-italic tracking-[0.14em]">
                {service.duration} DK
              </i>
              <span className="b-svc-no" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="mt-[18px] text-[26px] leading-[1.1] tracking-[-0.05em] md:text-[30px]">
              {service.name}
            </h3>
            <p className="b-copy mt-3 text-[13px] leading-[1.6]">{service.description}</p>
            {service.tools?.length > 0 && (
              <span className="mt-2 block text-[10px] tracking-[0.1em]">
                {service.tools.join(' · ')}
              </span>
            )}
            <div className="mt-[26px] flex items-end justify-between border-t-2 border-dashed border-[#16130F] pt-[14px]">
              <b className="text-[38px] leading-none tracking-[-0.07em] md:text-[52px]">
                ₺{Number(service.price).toLocaleString('tr-TR')}
              </b>
              <span className="text-[22px] leading-none tracking-[-0.04em]">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}