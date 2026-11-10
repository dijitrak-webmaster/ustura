import { Link } from 'react-router-dom';
import { salon } from '@/data/salonContent';
import '@/styles/cinema-hero.css';

const [wordOne, ...wordRest] = salon.name.toUpperCase().split(' ');
const wordTwo = wordRest.join(' ');

export default function CinemaHero({ image }) {
  return (
    <section className="cine-hero">
      <div className="cine-panel">
        <div className="cine-meta">
          <span>EST. 2016 · {salon.city}</span>
          <span>№ 0001</span>
        </div>

        <div className="cine-status">
          <span className="cine-stock">BUGÜN 3 SANDALYE BOŞ</span>
          <span className="cine-open">ŞU AN AÇIK</span>
          <span className="cine-hours">10:00 – 21:00 · PAZAR KAPALI</span>
        </div>

        <h1 className="cine-title">
          <span>KESKİN ÇİZGİ,</span>
          <span>
            <em>SESSİZ</em>
          </span>
          <span>USTALIK.</span>
        </h1>

        <p className="cine-copy">
          Makasın sesi, usturanın soğuğu, aynada kusursuz bir çizgi. {salon.name} atölyesinde her
          kesim, ölçüyle başlayan bir zanaat.
        </p>

        <div className="cine-actions">
          <Link to="/randevu" className="cine-btn">
            RANDEVU AL ↘
          </Link>
          <a href="#hizmetler" className="cine-btn cine-btn--ghost">
            HİZMET MENÜSÜ
          </a>
        </div>
      </div>

      <div className="cine-stage">
        <img className="cine-portrait" src={image} alt={`${salon.name} ustura detayı`} />

        <div className="cine-seal">
          <span>KESİM</span>
          <b>ONAYLI</b>
          <span>· 2016 ·</span>
        </div>

        <span className="cine-scroll">KAYDIR ↓</span>

        <div className="cine-wordmark">
          <small>EST. 2016 · {salon.suffix}</small>
          <span className="cine-word-outline">{wordOne}</span>
          <span className="cine-word-solid">{wordTwo}</span>
        </div>

        <div className="cine-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>
    </section>
  );
}