'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface NewsPost {
  id?: string;
  slug?: string;
  category?: string;
  category_ar?: string;
  category_en?: string;
  title_ar?: string;
  title_en?: string;
  excerpt_ar?: string;
  excerpt_en?: string;
  body_ar?: string;
  body_en?: string;
  published_at?: string;
  author_en?: string;
  author_ar?: string;
  img?: string;
  read_time?: number;
  featured?: boolean;
  tags_en?: string[];
  tags_ar?: string[];
}

const labelStyle: React.CSSProperties = {
  fontSize: '13px', fontWeight: '600', color: '#0E2A47', marginBottom: '6px', display: 'block',
};
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', fontSize: '14px',
  border: '1px solid #E5DFD0', borderRadius: '8px', outline: 'none',
  background: '#F9F7F4', boxSizing: 'border-box',
};
const fieldStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '6px' };

const CATEGORIES = [
  { id: 'milestone', en: 'Milestone',       ar: 'معلم رئيسي' },
  { id: 'event',     en: 'Event',           ar: 'فعالية' },
  { id: 'update',    en: 'Programme Update', ar: 'تحديث' },
];

export default function NewsForm({ initialData, isEdit }: { initialData?: NewsPost; isEdit?: boolean }) {
  const router = useRouter();
  const [saving, setSaving]   = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState<NewsPost>({
    slug: '', category: 'milestone', category_ar: 'معلم رئيسي', category_en: 'Milestone',
    title_ar: '', title_en: '', excerpt_ar: '', excerpt_en: '',
    body_ar: '', body_en: '', published_at: '', author_en: 'AWSP Taskforce',
    author_ar: 'فريق عمل AWSP', img: '', read_time: 3, featured: false,
    tags_en: [], tags_ar: [],
    ...initialData,
  });

  const set = (field: keyof NewsPost, val: NewsPost[keyof NewsPost]) =>
    setForm(prev => ({ ...prev, [field]: val }));

  const handleCategoryChange = (catId: string) => {
    const cat = CATEGORIES.find(c => c.id === catId);
    setForm(prev => ({ ...prev, category: catId, category_en: cat?.en || catId, category_ar: cat?.ar || catId }));
  };

  const handleSave = async () => {
    setSaving(true); setError('');
    try {
      const url = isEdit ? `/api/admin/news/${form.id}` : '/api/admin/news';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      setSuccess(isEdit ? 'Post updated.' : 'Post created.');
      if (!isEdit) router.push('/admin/news');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this post permanently?')) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/news/${form.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(await res.text());
      router.push('/admin/news');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed.');
      setDeleting(false);
    }
  };

  return (
    <div style={{ maxWidth: '840px' }}>
      {error && <div style={{ padding: '12px 16px', background: 'rgba(194,90,78,0.08)', border: '1px solid rgba(194,90,78,0.3)', borderRadius: '8px', fontSize: '13px', color: '#B23E33', marginBottom: '20px' }}>{error}</div>}
      {success && <div style={{ padding: '12px 16px', background: 'rgba(42,138,138,0.08)', border: '1px solid rgba(42,138,138,0.3)', borderRadius: '8px', fontSize: '13px', color: '#1F7A78', marginBottom: '20px' }}>{success}</div>}

      <div style={{ background: '#fff', border: '1px solid #E5DFD0', borderRadius: '12px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Slug (URL)</label>
            <input style={inputStyle} value={form.slug || ''} onChange={e => set('slug', e.target.value)} placeholder="phase-2-survey-alignment" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Category</label>
            <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.category || 'milestone'} onChange={e => handleCategoryChange(e.target.value)}>
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.en}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Title (English)</label>
            <input style={inputStyle} value={form.title_en || ''} onChange={e => set('title_en', e.target.value)} placeholder="English title" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Title (Arabic) — right-to-left</label>
            <input style={{ ...inputStyle, direction: 'rtl' }} value={form.title_ar || ''} onChange={e => set('title_ar', e.target.value)} placeholder="العنوان بالعربية" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Excerpt (English)</label>
            <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={form.excerpt_en || ''} onChange={e => set('excerpt_en', e.target.value)} placeholder="Short summary…" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Excerpt (Arabic)</label>
            <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical', direction: 'rtl' }} value={form.excerpt_ar || ''} onChange={e => set('excerpt_ar', e.target.value)} placeholder="ملخص قصير…" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Body (English) — separate paragraphs with blank line</label>
            <textarea style={{ ...inputStyle, minHeight: '160px', resize: 'vertical' }} value={form.body_en || ''} onChange={e => set('body_en', e.target.value)} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Body (Arabic)</label>
            <textarea style={{ ...inputStyle, minHeight: '160px', resize: 'vertical', direction: 'rtl' }} value={form.body_ar || ''} onChange={e => set('body_ar', e.target.value)} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px 80px', gap: '16px' }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Published date</label>
            <input style={inputStyle} value={form.published_at || ''} onChange={e => set('published_at', e.target.value)} placeholder="28 April 2026" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Image URL</label>
            <input style={inputStyle} value={form.img || ''} onChange={e => set('img', e.target.value)} placeholder="https://…" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Read time (min)</label>
            <input type="number" style={inputStyle} value={form.read_time ?? 3} onChange={e => set('read_time', parseInt(e.target.value))} min={1} max={30} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Featured</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '10px', cursor: 'pointer', fontSize: '14px' }}>
              <input type="checkbox" checked={form.featured ?? false} onChange={e => set('featured', e.target.checked)} />
              Pin
            </label>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Tags EN (comma-separated)</label>
            <input style={inputStyle} value={(form.tags_en || []).join(', ')} onChange={e => set('tags_en', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} placeholder="Phase 2, Surveys" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Tags AR (comma-separated)</label>
            <input style={{ ...inputStyle, direction: 'rtl' }} value={(form.tags_ar || []).join('، ')} onChange={e => set('tags_ar', e.target.value.split(/،|,/).map(t => t.trim()).filter(Boolean))} placeholder="المرحلة ٢، المسوحات" />
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        {isEdit ? (
          <button onClick={handleDelete} disabled={deleting} style={{
            padding: '10px 20px', background: 'rgba(194,90,78,0.1)', color: '#B23E33',
            border: '1px solid rgba(194,90,78,0.3)', borderRadius: '8px',
            fontSize: '13px', fontWeight: '600', cursor: 'pointer',
          }}>
            {deleting ? 'Deleting…' : 'Delete post'}
          </button>
        ) : <div />}

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => router.push('/admin/news')} style={{
            padding: '10px 20px', background: '#F4F6F8', color: '#6B6B6B',
            border: '1px solid #E5DFD0', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
          }}>
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving} style={{
            padding: '10px 24px', background: saving ? '#BFBFBF' : '#0E2A47', color: '#fff',
            border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
          }}>
            {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create post'}
          </button>
        </div>
      </div>
    </div>
  );
}
