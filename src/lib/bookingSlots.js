export const SLOTS = Array.from({ length: 22 }, (_, i) => {
  const minutes = 10 * 60 + i * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
});

export function nextDays(count = 14) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < count + 7 && days.length < count; i += 1) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0) days.push(d);
  }
  return days;
}

export function isoDay(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function slotMinutes(slot) {
  const [h, m] = String(slot || '0:0').split(':').map(Number);
  return h * 60 + m;
}

// Seçili ustanın dolu randevularına denk gelen saatleri işaretler.
export function blockedSlots(busy, barberId, slots = SLOTS) {
  const blocked = new Set();
  busy
    .filter((b) => barberId && b.barber_id === barberId)
    .forEach((b) => {
      const start = slotMinutes(b.time);
      const end = start + (Number(b.duration) || 30);
      slots.forEach((s) => {
        const minutes = slotMinutes(s);
        if (minutes >= start && minutes < end) blocked.add(s);
      });
    });
  return blocked;
}

export function formatLongDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: 'long',
    weekday: 'long',
  });
}