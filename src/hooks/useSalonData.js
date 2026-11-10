import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import {
  barbers as sampleBarbers,
  gallery as sampleGallery,
  services as sampleServices,
} from '@/data/salonContent';

export default function useSalonData() {
  const [services, setServices] = useState(sampleServices);
  const [barbers, setBarbers] = useState(sampleBarbers);
  const [gallery, setGallery] = useState(sampleGallery);

  useEffect(() => {
    let alive = true;
    Promise.all([
      base44.entities.Service.list({ sort: 'sort_order', limit: 50 }),
      base44.entities.Barber.list({ sort: 'sort_order', limit: 50 }),
      base44.entities.GalleryImage.list({ sort: 'sort_order', limit: 100 }),
    ]).then(([servicePage, barberPage, galleryPage]) => {
      if (!alive) return;
      const liveServices = (servicePage.items || []).filter((s) => s.active !== false);
      const liveBarbers = (barberPage.items || []).filter((b) => b.active !== false);
      const liveGallery = (galleryPage.items || []).filter((g) => g.active !== false);
      if (liveServices.length) setServices(liveServices);
      if (liveBarbers.length) setBarbers(liveBarbers);
      if (liveGallery.length) setGallery(liveGallery);
    });
    return () => {
      alive = false;
    };
  }, []);

  return { services, barbers, gallery };
}