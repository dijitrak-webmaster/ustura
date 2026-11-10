import '@/styles/brutal.css';
import IntroSplash from '@/components/brutal/IntroSplash';
import HazardBand from '@/components/brutal/HazardBand';
import CutRule from '@/components/brutal/CutRule';
import BrutalHeader from '@/components/brutal/BrutalHeader';
import CinemaHero from '@/components/cinema/CinemaHero';
import BrutalMarquee from '@/components/brutal/BrutalMarquee';
import BrutalStatement from '@/components/brutal/BrutalStatement';
import BrutalRitual from '@/components/brutal/BrutalRitual';
import BrutalServices from '@/components/brutal/BrutalServices';
import BrutalMasters from '@/components/brutal/BrutalMasters';
import BrutalWhy from '@/components/brutal/BrutalWhy';
import BrutalPhotoWall from '@/components/brutal/BrutalPhotoWall';
import BrutalGallery from '@/components/brutal/BrutalGallery';
import BrutalLoyalty from '@/components/brutal/BrutalLoyalty';
import BrutalVoices from '@/components/brutal/BrutalVoices';
import BrutalFaq from '@/components/brutal/BrutalFaq';
import BrutalCta from '@/components/brutal/BrutalCta';
import BrutalContact from '@/components/brutal/BrutalContact';
import BrutalFooter from '@/components/brutal/BrutalFooter';
import CinematicLayer from '@/components/brutal/CinematicLayer';
import useSalonData from '@/hooks/useSalonData';
import { marqueeItems, photoWall, testimonials } from '@/data/salonContent';

const HERO_IMAGE =
  'https://media.base44.com/images/public/6af2cea922bdc55ca6a1d1a8/2bc8ad19d_generated_image.png';
const CTA_IMAGE =
  'https://media.base44.com/images/public/6af2cea922bdc55ca6a1d1a8/538e839f4_generated_b9d770a6.jpg';
const STATEMENT_IMAGE =
  'https://media.base44.com/images/public/6af2cea922bdc55ca6a1d1a8/fc4e12ffb_generated_image.png';

export default function Home() {
  const { services, barbers, gallery } = useSalonData();

  return (
    <div className="brutal min-h-screen">
      <IntroSplash />
      <CinematicLayer />
      <BrutalHeader />
      <CinemaHero image={HERO_IMAGE} />
      <HazardBand />
      <BrutalMarquee items={marqueeItems} />
      <BrutalStatement image={STATEMENT_IMAGE} />
      <BrutalRitual />
      <CutRule label="KESİM BAŞLIYOR" />
      <BrutalServices services={services} />
      <BrutalMasters barbers={barbers} />
      <BrutalWhy />
      <BrutalPhotoWall items={photoWall} />
      <BrutalGallery items={gallery} />
      <BrutalLoyalty />
      <BrutalVoices items={testimonials} />
      <BrutalFaq />
      <CutRule label="SANDALYE HAZIR" />
      <BrutalCta image={CTA_IMAGE} />
      <BrutalContact />
      <div className="b-checker" aria-hidden="true" />
      <BrutalFooter />
    </div>
  );
}