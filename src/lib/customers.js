import { base44 } from '@/api/base44Client';

const today = () => new Date().toISOString().slice(0, 10);

/**
 * Randevu ile gelen müşteriyi sadakat kartına kaydeder.
 * Aynı telefon varsa yeni kayıt açmaz, ismi boşsa tamamlar.
 */
export async function ensureCustomer({ name = '', phone = '' } = {}) {
  const cleanPhone = String(phone).replace(/\s+/g, '');
  if (cleanPhone.length < 6) return null;

  const page = await base44.entities.LoyaltyCard.filter({ phone: cleanPhone }, { limit: 1 });
  const existing = (page.items || [])[0];

  if (existing) {
    if (!existing.name && name) {
      await base44.entities.LoyaltyCard.update(existing.id, { name });
    }
    return existing;
  }

  return base44.entities.LoyaltyCard.create({
    name: name || '',
    phone: cleanPhone,
    visits: 0,
    free_cuts: 0,
    last_visit: today(),
  });
}