export const salon = {
  name: 'Mert Kuaför',
  suffix: 'TIRAŞ ATÖLYESİ',
  logo: 'https://base44.app/api/apps/6af2cea922bdc55ca6a1d1a8/files/mp/public/6af2cea922bdc55ca6a1d1a8/f9ced6541_02_Yatay_Logo.png',
  logoMark: 'https://base44.app/api/apps/6af2cea922bdc55ca6a1d1a8/files/mp/public/6af2cea922bdc55ca6a1d1a8/68e967998_07_Dairesel_Rozet.png',
  favicon: 'https://base44.app/api/apps/6af2cea922bdc55ca6a1d1a8/files/mp/public/6af2cea922bdc55ca6a1d1a8/b28db641b_04_Favicon_Sari.png',
  tagline: 'Keskin çizgi, sessiz ustalık.',
  phone: '0543 215 98 85',
  address: 'Oral İş Merkezi, Sabuni, Tahmis Ar. No:5, 22100 Edirne Merkez / Edirne',
  city: 'EDİRNE',
  hours: [
    { day: 'Pazartesi – Cumartesi', time: '10:00 – 21:00' },
    { day: 'Pazar', time: 'Kapalı' },
  ],
};

export const navItems = [
  { label: 'Hizmetler', href: '#hizmetler' },
  { label: 'Ustalar', href: '#ustalar' },
  { label: 'Atölye', href: '#atolye' },
  { label: 'Galeri', href: '#galeri' },
  { label: 'İletişim', href: '#iletisim' },
  { label: 'SSS', href: '#sss' },
];

export const services = [
  {
    slug: 'klasik-kesim',
    name: 'Klasik Kesim',
    description: 'Yüz hatlarına göre ölçülmüş kesim, sıcak havlu ve fön ile bitiş.',
    price: 450,
    duration: 30,
    tools: ['Makas', 'Tarak', 'Makine'],
  },
  {
    slug: 'ustura-tirasi',
    name: 'Ustura Tıraşı',
    description: 'Tek kullanımlık jilet, üç perde sıcak havlu ve soğuk kompres ritüeli.',
    price: 550,
    duration: 40,
    tools: ['Ustura', 'Badger Fırça', 'Havlu'],
  },
  {
    slug: 'sakal-tasarimi',
    name: 'Sakal Tasarımı',
    description: 'Çene hattı ve gıdık üzerinde milimetrik kontur çalışması.',
    price: 350,
    duration: 25,
    tools: ['Makine', 'Ustura', 'Kontur'],
  },
  {
    slug: 'sac-sakal-ritueli',
    name: 'Saç + Sakal Ritüeli',
    description: 'Kesim, sakal tasarımı ve yüz bakımını tek seansta birleştiren tam paket.',
    price: 800,
    duration: 60,
    tools: ['Makas', 'Ustura', 'Bakım'],
  },
  {
    slug: 'cocuk-kesim',
    name: 'Çocuk Kesim',
    description: 'Sabırlı eller, sessiz makine ve kesim sonrası küçük bir ödül.',
    price: 300,
    duration: 20,
    tools: ['Makas', 'Makine'],
  },
  {
    slug: 'damat-paketi',
    name: 'Damat Paketi',
    description: 'Düğün sabahı için kesim, tıraş, yüz maskesi ve son dokunuş.',
    price: 1500,
    duration: 90,
    tools: ['Ustura', 'Maske', 'Styling'],
  },
];

export const barbers = [
  {
    slug: 'kerem',
    name: 'Kerem Aydın',
    role: 'Kurucu Usta',
    years: 12,
    specialty: 'Ustura tıraşı',
    image: 'https://media.base44.com/images/public/6af2cea922bdc55ca6a1d1a8/2514a02a8_generated_image.png',
  },
  {
    slug: 'selin',
    name: 'Selin Arda',
    role: 'Sakal & Ustura',
    years: 7,
    specialty: 'Kontur tasarımı',
    image: 'https://media.base44.com/images/public/6af2cea922bdc55ca6a1d1a8/b9f3ee275_generated_image.png',
  },
  {
    slug: 'deniz',
    name: 'Deniz Yalçın',
    role: 'Saç Tasarımı',
    years: 9,
    specialty: 'Fade & doku',
    image: 'https://media.base44.com/images/public/6af2cea922bdc55ca6a1d1a8/ed70b5814_generated_image.png',
  },
];

export const gallery = [
  {
    caption: 'Fade / 02 mm',
    image: 'https://media.base44.com/images/public/6af2cea922bdc55ca6a1d1a8/1c6e87314_generated_image.png',
    span: 'tall',
  },
  {
    caption: 'Ustura detayı',
    image: 'https://media.base44.com/images/public/6af2cea922bdc55ca6a1d1a8/de4e244e8_generated_image.png',
    span: 'short',
  },
  {
    caption: 'Kontur / ustura',
    image: 'https://media.base44.com/images/public/6af2cea922bdc55ca6a1d1a8/a6e2b25ed_generated_image.png',
    span: 'short',
  },
  {
    caption: 'Fade / ense',
    image: 'https://media.base44.com/images/public/6af2cea922bdc55ca6a1d1a8/7d60752b6_generated_image.png',
    span: 'tall',
  },
];

export const photoWall = [
  {
    caption: 'SANDALYE / 06:40',
    image:
      'https://media.base44.com/images/public/6af2cea922bdc55ca6a1d1a8/74953f585_generated_image.png',
  },
  {
    caption: 'TEZGÂH / USTURA',
    image:
      'https://media.base44.com/images/public/6af2cea922bdc55ca6a1d1a8/605e0f4f7_generated_image.png',
  },
  {
    caption: 'SICAK HAVLU',
    image:
      'https://media.base44.com/images/public/6af2cea922bdc55ca6a1d1a8/affd94249_generated_image.png',
  },
  {
    caption: 'RAF DÜZENİ',
    image:
      'https://media.base44.com/images/public/6af2cea922bdc55ca6a1d1a8/057a6df9a_generated_image.png',
  },
  {
    caption: 'MAKAS / ORTA KESİM',
    image:
      'https://media.base44.com/images/public/6af2cea922bdc55ca6a1d1a8/b3fcf6aa0_generated_image.png',
  },
  {
    caption: 'ENSE / PUDRA',
    image:
      'https://media.base44.com/images/public/6af2cea922bdc55ca6a1d1a8/57d06d519_generated_image.png',
  },
];

export const testimonials = [
  {
    quote: 'Ustura tıraşından sonra yüzüm on yıl gençleşti. Sıcak havlu ritüeli tek başına gelmeye değer.',
    name: 'Mert K.',
    detail: 'Aylık üye · 2 yıl',
  },
  {
    quote: 'Fade’i cetvelle kesiyorlar sanki. Üç aydır başka yere gitmedim, gitmem de.',
    name: 'Onur T.',
    detail: 'Klasik Kesim',
  },
  {
    quote: 'Salonun karanlığı, müzik ve makasın sesi… burada kesim bir ritüel.',
    name: 'Barış D.',
    detail: 'Saç + Sakal Ritüeli',
  },
];

export const marqueeItems = [
  'USTURA TIRAŞI',
  'KESKİN FADE',
  'SAKAL KONTURU',
  'SICAK HAVLU',
  'MAKAS İŞÇİLİĞİ',
  'YÜZ BAKIMI',
];