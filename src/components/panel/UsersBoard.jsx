import { useEffect, useState } from 'react';
import { Mail, ShieldCheck, ShieldOff, User, UserPlus } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';

const inputClass =
  'mt-2 w-full border-2 border-[#16130F] bg-[#ECE9E2] px-3 py-2 font-mono text-[11px] text-[#16130F] outline-none focus:bg-[#F2C230]';

const labelClass = 'text-[9px] tracking-[0.16em] text-[#16130F]/70';

export default function UsersBoard() {
  const { user: me } = useAuth();
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('admin');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    setUsers((await base44.entities.User.list()) || []);
  };

  useEffect(() => {
    load();
  }, []);

  const invite = async (e) => {
    e.preventDefault();
    const target = email.trim();
    if (!target) return;
    setBusy(true);
    setError('');
    setMessage('');
    try {
      await base44.users.inviteUser(target, role);
      setMessage(`${target} adresine davet gönderildi.`);
      setEmail('');
      await load();
    } catch (err) {
      setError(err?.message || 'Davet gönderilemedi.');
    } finally {
      setBusy(false);
    }
  };

  const setRoleFor = async (u, nextRole) => {
    setError('');
    setMessage('');
    await base44.entities.User.update(u.id, { role: nextRole });
    setMessage(
      nextRole === 'admin'
        ? `${u.email} artık panele girebilir.`
        : `${u.email} için panel yetkisi kaldırıldı.`
    );
    await load();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <form onSubmit={invite} className="border-2 border-[#16130F] bg-[#ECE9E2] p-4">
        <p className="flex items-center gap-2 text-[10px] tracking-[0.16em]">
          <UserPlus className="h-3.5 w-3.5" /> PANEL KULLANICISI EKLE
        </p>

        <div className="mt-4">
          <label className={labelClass}>E-posta</label>
          <input
            type="email"
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="usta@salon.com"
            required
          />
        </div>

        <div className="mt-4">
          <label className={labelClass}>Yetki</label>
          <select
            className={inputClass}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Yönetici · panele tam erişim</option>
            <option value="user">Kullanıcı · sadece kendi randevuları</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={busy}
          className="mt-5 w-full border-2 border-[#16130F] bg-[#16130F] py-3 text-[10px] tracking-[0.16em] text-[#F2C230] transition-colors hover:bg-[#FF4A1C] hover:text-[#16130F] disabled:opacity-50"
        >
          {busy ? 'GÖNDERİLİYOR…' : 'DAVET GÖNDER'}
        </button>

        {message && (
          <p className="mt-3 border-2 border-[#16130F] bg-[#F2C230] px-3 py-2 text-[10px] tracking-[0.08em]">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-3 border-2 border-[#16130F] bg-[#FF4A1C] px-3 py-2 text-[10px] tracking-[0.08em]">
            {error}
          </p>
        )}

        <p className="mt-4 text-[9px] leading-[1.7] tracking-[0.06em] opacity-60">
          Davet e-postasındaki bağlantıdan şifresini belirleyen kişi panele giriş yapabilir.
        </p>
      </form>

      <div>
        <p className="text-[10px] tracking-[0.16em]">KAYITLI KULLANICILAR · {users.length}</p>
        <div className="mt-3 space-y-2">
          {users.map((u) => (
            <div
              key={u.id}
              className="flex flex-wrap items-center gap-3 border-2 border-[#16130F] bg-[#D8D5CD] px-3 py-2.5"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center border-2 border-[#16130F] bg-[#16130F] text-[#F2C230]">
                {u.role === 'admin' ? (
                  <ShieldCheck className="h-3.5 w-3.5" />
                ) : (
                  <User className="h-3.5 w-3.5" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] tracking-[-0.01em]">{u.full_name || 'İSİMSİZ'}</p>
                <p className="mt-0.5 flex items-center gap-1.5 truncate text-[9px] tracking-[0.06em] opacity-60">
                  <Mail className="h-2.5 w-2.5" /> {u.email}
                </p>
              </div>
              <span className="border-2 border-[#16130F] bg-[#F2C230] px-2 py-1 text-[8px] tracking-[0.14em]">
                {u.role === 'admin' ? 'YÖNETİCİ' : 'KULLANICI'}
              </span>

              {u.id !== me?.id && (
                <button
                  onClick={() => setRoleFor(u, u.role === 'admin' ? 'user' : 'admin')}
                  className={`flex w-full items-center justify-center gap-1.5 border-2 border-[#16130F] px-2 py-2 text-[8px] tracking-[0.12em] shadow-[3px_3px_0_#16130F] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#16130F] sm:w-auto sm:py-1.5 ${
                    u.role === 'admin' ? 'bg-[#ECE9E2]' : 'bg-[#16130F] text-[#F2C230]'
                  }`}
                >
                  {u.role === 'admin' ? (
                    <ShieldOff className="h-3 w-3" />
                  ) : (
                    <ShieldCheck className="h-3 w-3" />
                  )}
                  {u.role === 'admin' ? 'YETKİYİ AL' : 'PANELE AL'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}