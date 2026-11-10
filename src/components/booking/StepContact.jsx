const Label = ({ children }) => (
  <label className="flex items-center gap-2 text-[10px] tracking-[0.14em]">
    <span className="h-2 w-2 bg-[#FF4A1C]" />
    {children}
  </label>
);

export default function StepContact({ contact, onChange }) {
  const set = (key) => (e) => onChange({ ...contact, [key]: e.target.value });

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div>
        <Label>Ad soyad *</Label>
        <input
          className="b-field mt-2"
          value={contact.name}
          onChange={set('name')}
          placeholder="Adınız Soyadınız"
        />
      </div>
      <div>
        <Label>Telefon *</Label>
        <input
          className="b-field mt-2"
          value={contact.phone}
          onChange={set('phone')}
          placeholder="05XX XXX XX XX"
          inputMode="tel"
        />
      </div>
      <div className="sm:col-span-2">
        <Label>E-posta</Label>
        <input
          className="b-field mt-2"
          value={contact.email}
          onChange={set('email')}
          placeholder="ornek@mail.com"
          inputMode="email"
        />
      </div>
      <div className="sm:col-span-2">
        <Label>Not (isteğe bağlı)</Label>
        <textarea
          rows={3}
          className="b-field mt-2 resize-none"
          value={contact.notes}
          onChange={set('notes')}
          placeholder="Kısa kesim, sakal konturu vb."
        />
      </div>
    </div>
  );
}