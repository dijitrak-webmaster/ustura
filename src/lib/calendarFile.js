import { salon } from '@/data/salonContent';

const pad = (n) => String(n).padStart(2, '0');
const CRLF = '\r\n';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function parseDate(value) {
  const match = String(value || '').match(/(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  return { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) };
}

function parseTime(value) {
  const match = String(value || '').match(/(\d{1,2}):(\d{2})/);
  if (!match) return { hour: 10, minute: 0 };
  return { hour: Number(match[1]), minute: Number(match[2]) };
}

function utcStamp(date) {
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(
    date.getUTCHours()
  )}${pad(date.getUTCMinutes())}00Z`;
}

// Salon saatleri Türkiye saatidir (UTC+3, yaz saati uygulanmaz).
function eventRange(appointment, duration) {
  const date = parseDate(appointment?.date);
  const { hour, minute } = parseTime(appointment?.time);
  const start = date
    ? new Date(Date.UTC(date.year, date.month - 1, date.day, hour - 3, minute))
    : new Date();
  const minutes = Number(duration) > 0 ? Number(duration) : 30;
  return { start, end: new Date(start.getTime() + minutes * 60000) };
}

function escapeText(value) {
  return String(value || '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

// RFC 5545: satırlar 75 oktetten uzun olamaz, devamı bir boşlukla başlar.
function foldLine(line) {
  const bytes = encoder.encode(line);
  if (bytes.length <= 75) return line;

  const chunks = [];
  let offset = 0;
  let first = true;
  while (offset < bytes.length) {
    const limit = first ? 75 : 74;
    let slice = bytes.slice(offset, offset + limit);
    // çok baytlı bir karakteri ortadan kesme
    while (slice.length > 0 && (slice[slice.length - 1] & 0xc0) === 0x80) {
      slice = slice.slice(0, -1);
    }
    if (slice.length === 0) break;
    chunks.push((first ? '' : ' ') + decoder.decode(slice));
    offset += slice.length;
    first = false;
  }
  return chunks.join(CRLF);
}

function sortableDate(appointment) {
  const date = parseDate(appointment?.date);
  if (!date) return 'randevu';
  return `${date.year}-${pad(date.month)}-${pad(date.day)}`;
}

export function buildAppointmentIcs(appointment, duration = 30) {
  const { start, end } = eventRange(appointment, duration);

  const title = `${salon.name} · ${appointment?.service_name || 'Randevu'}`;
  const description = [
    `${appointment?.service_name || 'Randevu'} · ${appointment?.barber_name || 'Usta'}`,
    `Tel: ${salon.phone}`,
    'Geç kalırsanız 10 dakika bekleyebiliriz.',
  ].join('\n');

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mert Kuafor//Randevu//TR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${appointment?.id || Date.now()}@mertkuafor`,
    `DTSTAMP:${utcStamp(new Date())}`,
    `DTSTART:${utcStamp(start)}`,
    `DTEND:${utcStamp(end)}`,
    `SUMMARY:${escapeText(title)}`,
    `LOCATION:${escapeText(salon.address)}`,
    `DESCRIPTION:${escapeText(description)}`,
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT60M',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeText(`${salon.name} randevunuz 1 saat sonra`)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.map(foldLine).join(CRLF) + CRLF;
}

export function downloadAppointmentIcs(appointment, duration = 30) {
  const blob = new Blob([buildAppointmentIcs(appointment, duration)], {
    type: 'text/calendar;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `mert-kuafor-randevu-${sortableDate(appointment)}.ics`;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  // indirme başlayana kadar URL'i açık tut
  window.setTimeout(() => {
    link.remove();
    URL.revokeObjectURL(url);
  }, 2000);
}

// .ics indirmesi engellenen tarayıcılar için doğrudan Google Takvim bağlantısı
export function googleCalendarUrl(appointment, duration = 30) {
  const { start, end } = eventRange(appointment, duration);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${salon.name} · ${appointment?.service_name || 'Randevu'}`,
    dates: `${utcStamp(start)}/${utcStamp(end)}`,
    details: `${appointment?.barber_name || 'Usta'} · Tel: ${salon.phone}`,
    location: salon.address,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}