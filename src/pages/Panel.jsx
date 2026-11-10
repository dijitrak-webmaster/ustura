import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Lock } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import '@/styles/brutal.css';
import { salon } from '@/data/salonContent';
import PanelStats from '@/components/panel/PanelStats';
import AppointmentsBoard from '@/components/panel/AppointmentsBoard';
import ServiceManager from '@/components/panel/ServiceManager';
import BarberManager from '@/components/panel/BarberManager';
import GalleryManager from '@/components/panel/GalleryManager';
import LoyaltyBoard from '@/components/panel/LoyaltyBoard';
import CustomersBoard from '@/components/panel/CustomersBoard';
import UsersBoard from '@/components/panel/UsersBoard';

const TABS = [
  { key: 'randevular', label: 'RANDEVULAR' },
  { key: 'musteriler', label: 'MÜŞTERİLER' },
  { key: 'hizmetler', label: 'HİZMETLER' },
  { key: 'berberler', label: 'USTALAR' },
  { key: 'galeri', label: 'GALERİ' },
  { key: 'sadakat', label: 'SADAKAT' },
  { key: 'kullanicilar', label: 'KULLANICILAR' },
];

export default function Panel() {
  const { user } = useAuth();
  const [tab, setTab] = useState('randevular');
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.role === 'admin';

  const loadAll = async () => {
    const [a, s, b, g, c] = await Promise.all([
      base44.entities.Appointment.list({ sort: '-date', limit: 200 }),
      base44.entities.Service.list({ sort: 'sort_order', limit: 100 }),
      base44.entities.Barber.list({ sort: 'sort_order', limit: 100 }),
      base44.entities.GalleryImage.list({ sort: 'sort_order', limit: 200 }),
      base44.entities.LoyaltyCard.list({ sort: '-last_visit', limit: 200 }),
    ]);
    setAppointments(a.items || []);
    setServices(s.items || []);
    setBarbers(b.items || []);
    setGallery(g.items || []);
    setCards(c.items || []);
    setLoading(false);
  };

  useEffect(() => {
    if (!isAdmin) return;
    loadAll();
    const unsubscribe = base44.entities.Appointment.subscribe(() => {
      loadAll();
    });
    return unsubscribe;
  }, [isAdmin]);

  const pendingCount = appointments.filter((a) => a.status === 'pending').length;

  if (!isAdmin) {
    return (
      <div className="brutal flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="border-2 border-[#16130F] bg-[#D8D5CD] p-8 shadow-[10px_10px_0_#16130F] md:p-12">
          <span className="inline-flex h-12 w-12 items-center justify-center border-2 border-[#16130F] bg-[#FF4A1C]">
            <Lock className="h-5 w-5" />
          </span>
          <h1 className="mt-6 text-[26px] leading-[0.9] tracking-[-0.06em] md:text-[40px]">
            YETKİ
            <br />
            <em className="inline-block bg-[#16130F] px-2 not-italic text-[#F2C230]">GEREKLİ</em>
          </h1>
          <p className="b-copy mt-4 max-w-md text-[12px] leading-[1.7]">
            İşletme paneli yalnızca yönetici hesabına açıktır. Salon sahibinden hesabınızı yönetici
            olarak işaretlemesini isteyin.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/" className="b-btn b-btn-w">
              Ana sayfa
            </Link>
            <button onClick={() => base44.auth.logout('/')} className="b-btn">
              Çıkış yap
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="brutal min-h-screen">
      <header className="sticky top-0 z-30 border-b-2 border-[#16130F] bg-[#16130F] text-[#D8D5CD]">
        <div className="mx-auto flex max-w-[1300px] flex-wrap items-center justify-between gap-3 px-5 py-3 md:px-10">
          <div className="flex items-center gap-3">
            <img
              src={salon.logoMark}
              alt={salon.name}
              className="h-12 w-12 object-contain md:h-14 md:w-14"
            />
            <div>
              <p className="text-[15px] leading-none tracking-[-0.02em] md:text-[18px]">{salon.name}</p>
              <p className="mt-1.5 text-[9px] tracking-[0.24em] text-[#F2C230]">İŞLETME PANELİ</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 text-[9px] tracking-[0.18em] text-[#F2C230] sm:flex">
              <span className="b-dot h-[6px] w-[6px] bg-[#F2C230]" />
              CANLI
            </span>
            <span className="hidden text-[10px] tracking-[0.1em] text-[#D8D5CD]/60 md:block">
              {user?.email}
            </span>
            <Link
              to="/"
              className="border-2 border-[#D8D5CD] px-3 py-2 text-[10px] tracking-[0.14em] transition-colors hover:bg-[#D8D5CD] hover:text-[#16130F]"
            >
              SİTE
            </Link>
            <button
              onClick={() => base44.auth.logout('/')}
              aria-label="Çıkış yap"
              className="flex h-9 w-9 items-center justify-center border-2 border-[#D8D5CD] transition-colors hover:bg-[#FF4A1C] hover:text-[#16130F]"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <section className="border-b-2 border-[#16130F] px-5 pb-8 pt-8 md:px-10 md:pb-10 md:pt-12">
        <div className="mx-auto max-w-[1300px]">
          <p className="flex items-center gap-2 text-[10px] tracking-[0.2em]">
            <span className="b-dot" />
            KONTROL ODASI · {new Date().toLocaleDateString('tr-TR')}
          </p>
          <h1 className="mt-4 rotate-[-1deg] text-[30px] leading-[0.88] tracking-[-0.07em] sm:text-[44px] md:text-[72px]">
            TEZGAH
            <br />
            <em className="inline-block bg-[#16130F] px-2 not-italic text-[#F2C230] md:px-3">BAŞINDA.</em>
          </h1>
        </div>
      </section>

      <main className="mx-auto max-w-[1300px] px-5 py-8 md:px-10 md:py-10">
        <PanelStats appointments={appointments} />

        <div className="-mx-5 mt-7 flex snap-x gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:mt-9 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`shrink-0 snap-start border-2 border-[#16130F] px-4 py-2.5 text-[10px] tracking-[0.14em] transition-transform duration-150 ${
                tab === t.key
                  ? 'translate-x-[2px] translate-y-[2px] bg-[#16130F] text-[#F2C230] shadow-[2px_2px_0_#16130F]'
                  : 'bg-[#D8D5CD] shadow-[4px_4px_0_#16130F] hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-[#F2C230] hover:shadow-[3px_3px_0_#16130F]'
              }`}
            >
              {t.label}
              {t.key === 'randevular' && pendingCount > 0 && (
                <span className="ml-2 inline-flex min-w-[18px] justify-center border-2 border-[#16130F] bg-[#FF4A1C] px-1 py-[1px] text-[9px] leading-none text-[#16130F]">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-4 border-2 border-[#16130F] bg-[#D8D5CD] p-3.5 shadow-[6px_6px_0_#16130F] md:mt-6 md:p-6 md:shadow-[10px_10px_0_#16130F]">
          {loading ? (
            <p className="text-[11px] tracking-[0.14em] opacity-60">YÜKLENİYOR…</p>
          ) : (
            <>
              {tab === 'randevular' && (
                <AppointmentsBoard
                  appointments={appointments}
                  services={services}
                  barbers={barbers}
                  customers={cards}
                  onRefresh={loadAll}
                />
              )}
              {tab === 'hizmetler' && <ServiceManager services={services} onRefresh={loadAll} />}
              {tab === 'berberler' && <BarberManager barbers={barbers} onRefresh={loadAll} />}
              {tab === 'galeri' && <GalleryManager images={gallery} onRefresh={loadAll} />}
              {tab === 'musteriler' && <CustomersBoard cards={cards} onRefresh={loadAll} />}
              {tab === 'sadakat' && <LoyaltyBoard cards={cards} onRefresh={loadAll} />}
              {tab === 'kullanicilar' && <UsersBoard />}
            </>
          )}
        </div>
      </main>

      <div className="b-checker" aria-hidden="true" />
    </div>
  );
}