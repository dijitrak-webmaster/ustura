import { useState } from 'react';
import { ImagePlus, Pencil, Plus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { base44 } from '@/api/base44Client';
import { Image } from '@/components/ui/image';

const inputClass =
  'mt-2 w-full border-2 border-[#16130F] bg-[#ECE9E2] px-3 py-2 font-mono text-[11px] text-[#16130F] outline-none focus:bg-[#F2C230]';

const labelClass = 'text-[9px] tracking-[0.16em] text-[#16130F]/70';

const empty = { caption: '', image: '', active: true, sort_order: '', uploading: false };

export default function GalleryManager({ images, onRefresh }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);

  const startNew = () => {
    setForm({ ...empty, sort_order: images.length });
    setEditingId(null);
    setOpen(true);
  };

  const startEdit = (item) => {
    setForm({
      caption: item.caption || '',
      image: item.image || '',
      active: item.active !== false,
      sort_order: item.sort_order ?? '',
      uploading: false,
    });
    setEditingId(item.id);
    setOpen(true);
  };

  const upload = async (file) => {
    if (!file) return;
    setForm((f) => ({ ...f, uploading: true }));
    const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
    setForm((f) => ({ ...f, image: file_url, uploading: false }));
  };

  const save = async () => {
    if (!form.image.trim()) return;
    const payload = {
      caption: form.caption.trim(),
      image: form.image.trim(),
      active: form.active,
      sort_order: Number(form.sort_order) || 0,
    };
    if (editingId) await base44.entities.GalleryImage.update(editingId, payload);
    else await base44.entities.GalleryImage.create(payload);
    setOpen(false);
    onRefresh();
  };

  const remove = async (id) => {
    await base44.entities.GalleryImage.delete(id);
    onRefresh();
  };

  return (
    <div>
      <button
        onClick={startNew}
        className="flex items-center gap-2 border-2 border-[#16130F] bg-[#FF4A1C] px-4 py-2.5 text-[10px] tracking-[0.14em] shadow-[4px_4px_0_#16130F] transition-transform duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#16130F]"
      >
        <Plus className="h-3.5 w-3.5" /> YENİ GÖRSEL
      </button>

      {images.length === 0 ? (
        <p className="mt-4 border-2 border-dashed border-[#16130F]/40 p-6 text-center text-[10px] tracking-[0.14em] opacity-60">
          GALERİDE GÖRSEL YOK.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((item) => (
            <div
              key={item.id}
              className="border-2 border-[#16130F] bg-[#D8D5CD] shadow-[4px_4px_0_#16130F]"
            >
              <div className="aspect-[4/5] border-b-2 border-[#16130F] bg-[#16130F]/10">
                <Image src={item.image} alt={item.caption} className="h-full w-full object-cover" />
              </div>
              <div className="flex items-center justify-between gap-2 p-2">
                <div className="min-w-0">
                  <p className="truncate text-[10px] tracking-[0.04em]">
                    {item.caption || 'BAŞLIKSIZ'}
                  </p>
                  {item.active === false && (
                    <span className="text-[9px] tracking-[0.12em] opacity-50">(PASİF)</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => startEdit(item)}
                    aria-label="Düzenle"
                    className="flex h-7 w-7 items-center justify-center border-2 border-[#16130F] transition-colors hover:bg-[#F2C230]"
                  >
                    <Pencil className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    aria-label="Sil"
                    className="flex h-7 w-7 items-center justify-center border-2 border-[#16130F] transition-colors hover:bg-[#FF4A1C]"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-2 border-[#16130F] bg-[#D8D5CD] font-mono text-[#16130F]">
          <DialogHeader>
            <DialogTitle className="text-[16px] uppercase tracking-[0.06em]">
              {editingId ? 'Görseli düzenle' : 'Yeni görsel'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Görsel yükle</label>
              <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 border-2 border-dashed border-[#16130F] bg-[#ECE9E2] px-3 py-6 text-[10px] tracking-[0.12em] transition-colors hover:bg-[#F2C230]">
                <ImagePlus className="h-4 w-4" />
                {form.uploading ? 'YÜKLENİYOR…' : 'DOSYA SEÇ'}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => upload(e.target.files?.[0])}
                />
              </label>
            </div>
            <div>
              <label className={labelClass}>Görsel adresi</label>
              <input
                className={inputClass}
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://…"
              />
            </div>
            {form.image && (
              <div className="aspect-[4/5] w-24 border-2 border-[#16130F] bg-[#16130F]/10">
                <Image src={form.image} alt="Önizleme" className="h-full w-full object-cover" />
              </div>
            )}
            <div>
              <label className={labelClass}>Başlık</label>
              <input
                className={inputClass}
                value={form.caption}
                onChange={(e) => setForm({ ...form, caption: e.target.value })}
                placeholder="Fade / 02 mm"
              />
            </div>
            <div>
              <label className={labelClass}>Sıra</label>
              <input
                className={inputClass}
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
                inputMode="numeric"
              />
            </div>
            <label className="flex items-center gap-2 text-[10px] tracking-[0.06em]">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
              />
              Galeride görünsün
            </label>
            <button
              onClick={save}
              disabled={form.uploading}
              className="w-full border-2 border-[#16130F] bg-[#16130F] py-3 text-[10px] tracking-[0.16em] text-[#F2C230] transition-colors hover:bg-[#FF4A1C] hover:text-[#16130F] disabled:opacity-50"
            >
              KAYDET
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}