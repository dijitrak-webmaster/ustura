import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import '@/styles/brutal.css';
import BrutalHeader from '@/components/brutal/BrutalHeader';
import BrutalFooter from '@/components/brutal/BrutalFooter';
import HazardBand from '@/components/brutal/HazardBand';
import BookingStepper from '@/components/booking/BookingStepper';
import StepService from '@/components/booking/StepService';
import StepBarber from '@/components/booking/StepBarber';
import StepDateTime from '@/components/booking/StepDateTime';
import StepContact from '@/components/booking/StepContact';
import BookingSummary from '@/components/booking/BookingSummary';
import BookingSuccess from '@/components/booking/BookingSuccess';
import { blockedSlots, nextDays } from '@/lib/bookingSlots';
import useSalonData from '@/hooks/useSalonData';
import { ensureCustomer } from '@/lib/customers';

const days = nextDays(14);

const STEP_META = [
  { title: 'HİZMETİ SEÇ', hint: 'Menüden bir ritüel seçin; süresi ve fiyatı yanında.' },
  { title: 'USTANI SEÇ', hint: 'Makası tutan eli siz belirleyin.' },
  { title: 'SAATİNİ SEÇ', hint: 'Sandalye sizin için ayrılır.' },
  { title: 'SON DOKUNUŞ', hint: 'İletişim bilgilerinizi girin, gerisini biz halledelim.' },
];

export default function Randevu() {
  const [params] = useSearchParams();
  const { services, barbers } = useSalonData();
  const [step, setStep] = useState(0);
  const [service, setService] = useState(null);
  const [barber, setBarber] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [contact, setContact] = useState({ name: '', phone: '', email: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [created, setCreated] = useState(null);
  const [busy, setBusy] = useState([]);

  const barberId = barber && barber !== 'any' ? barber.id || '' : '';

  useEffect(() => {
    if (!date) {
      setBusy([]);
      return;
    }
    let active = true;
    base44.entities.BusySlot.filter({ date }, { limit: 500 })
      .then((page) => {
        if (active) setBusy(page.items || []);
      })
      .catch(() => {
        if (active) setBusy([]);
      });
    return () => {
      active = false;
    };
  }, [date]);

  const preselected = params.get('usta');
  useEffect(() => {
    if (!preselected || barber) return;
    const match = barbers.find((b) => b.slug === preselected || b.id === preselected);
    if (match) setBarber(match);
  }, [preselected, barbers, barber]);

  const canContinue = useMemo(() => {
    if (step === 0) return Boolean(service);
    if (step === 1) return Boolean(barber);
    if (step === 2) return Boolean(date && time);
    return contact.name.trim().length > 1 && contact.phone.trim().length > 6;
  }, [step, service, barber, date, time, contact]);

  const submit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const fresh = await base44.entities.BusySlot.filter({ date }, { limit: 500 });
      if (blockedSlots(fresh.items || [], barberId).has(time)) {
        setBusy(fresh.items || []);
        setTime(null);
        setStep(2);
        setError('Seçtiğiniz saat az önce doldu. Lütfen başka bir saat seçin.');
        return;
      }

      const record = await base44.entities.Appointment.create({
        customer_name: contact.name.trim(),
        customer_phone: contact.phone.trim(),
        customer_email: contact.email.trim(),
        service_name: service.name,
        service_id: service.id || '',
        barber_name: barber === 'any' ? 'Fark etmez' : barber.name,
        barber_id: barber === 'any' ? '' : barber.id || '',
        date,
        time,
        price: Number(service.price) || 0,
        notes: contact.notes.trim(),
        status: 'pending',
      });
      await base44.entities.BusySlot.create({
        date,
        time,
        duration: Number(service.duration) || 30,
        barber_id: barberId,
        appointment_id: record.id,
      });
      await ensureCustomer({ name: contact.name.trim(), phone: contact.phone.trim() }).catch(() => {});
      setCreated(record);
    } catch (e) {
      setError('Randevu kaydedilemedi. Lütfen tekrar deneyin.');
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => {
    if (step < 3) setStep(step + 1);
    else submit();
  };

  const meta = STEP_META[Math.min(step, 3)];

  return (
    <div className="brutal min-h-screen">
      <BrutalHeader />

      <section className="border-b-2 border-[#16130F] px-5 pb-10 pt-10 md:px-10 md:pb-12">
        <div className="mx-auto max-w-[1180px]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 text-[11px] tracking-[0.2em]"
          >
            <span className="b-dot" />
            RANDEVU · 4 ADIM
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 rotate-[-1deg] text-[30px] leading-[0.9] tracking-[-0.07em] sm:text-[44px] md:text-[88px]"
          >
            {created ? 'ONAY BEKLİYOR' : 'SANDALYEYİ'}
            {!created && (
              <>
                <br />
                <em className="inline-block max-w-full bg-[#16130F] px-2 not-italic text-[#F2C230] md:px-3">
                  SEÇ.
                </em>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="b-copy mt-5 max-w-md text-[14px] leading-[1.6]"
          >
            Dört adım, toplam bir dakika. Ödeme salonda, kesim ustada, ayna sizde.
          </motion.p>

          {!created && (
            <div className="mt-9 max-w-2xl">
              <BookingStepper step={step} />
            </div>
          )}
        </div>
      </section>

      <main className="px-5 py-10 md:px-10 md:py-14">
        <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[1fr_330px] lg:items-start">
          <div>
            {created ? (
              <BookingSuccess appointment={created} duration={Number(service?.duration) || 30} />
            ) : (
              <div className="border-2 border-[#16130F] bg-[#D8D5CD] p-4 shadow-[6px_6px_0_#16130F] md:p-9 md:shadow-[10px_10px_0_#16130F]">
                <div className="flex items-start justify-between gap-6 border-b-2 border-[#16130F] pb-5">
                  <div>
                    <p className="text-[10px] tracking-[0.16em] text-[#FF4A1C]">
                      ADIM {String(step + 1).padStart(2, '0')} / 04
                    </p>
                    <AnimatePresence mode="wait">
                      <motion.h2
                        key={meta.title}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 text-[24px] leading-none tracking-[-0.06em] md:text-[32px]"
                      >
                        {meta.title}
                      </motion.h2>
                    </AnimatePresence>
                    <p className="b-copy mt-2 text-[13px] leading-[1.6]">{meta.hint}</p>
                  </div>
                  <span className="hidden border-2 border-[#16130F] px-2 py-1 text-[10px] tracking-[0.12em] sm:block">
                    {step + 1}/4
                  </span>
                </div>

                <div className="mt-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {step === 0 && <StepService services={services} selected={service} onSelect={setService} />}
                      {step === 1 && <StepBarber barbers={barbers} selected={barber} onSelect={setBarber} />}
                      {step === 2 && (
                        <StepDateTime
                          days={days}
                          date={date}
                          time={time}
                          busy={busy}
                          barberId={barberId}
                          onDate={(value) => {
                            if (value !== date) setTime(null);
                            setDate(value);
                          }}
                          onTime={setTime}
                        />
                      )}
                      {step === 3 && <StepContact contact={contact} onChange={setContact} />}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-8 flex flex-col-reverse gap-3 border-t-2 border-[#16130F] pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    onClick={() => setStep(Math.max(0, step - 1))}
                    disabled={step === 0}
                    className="min-h-[44px] text-[11px] tracking-[0.14em] transition-colors hover:text-[#FF4A1C] disabled:opacity-30 sm:min-h-0"
                  >
                    ← Geri
                  </button>

                  <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end">
                    {service && (
                      <span className="hidden text-[11px] tracking-[0.12em] sm:block">
                        ₺{Number(service.price).toLocaleString('tr-TR')}
                      </span>
                    )}
                    <button
                      onClick={next}
                      disabled={!canContinue || submitting}
                      className="b-btn flex-1 justify-center disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
                    >
                      {step === 3 ? 'Randevuyu Onayla' : 'Devam'}
                      {submitting ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <span aria-hidden="true">→</span>
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="mt-4 border-2 border-[#16130F] bg-[#FF4A1C] p-3 text-[11px] tracking-[0.06em]">
                    {error}
                  </p>
                )}
              </div>
            )}
          </div>

          {!created && (
            <div className="lg:sticky lg:top-28">
              <BookingSummary service={service} barber={barber} date={date} time={time} />
              <div className="mt-4 border-2 border-[#16130F] bg-[#F2C230] p-4">
                <p className="b-copy text-[11px] leading-[1.6]">
                  Randevunuz salon onayına düşer. Onaylandığında telefonla bilgilendirilirsiniz.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <HazardBand />
      <BrutalFooter />
    </div>
  );
}