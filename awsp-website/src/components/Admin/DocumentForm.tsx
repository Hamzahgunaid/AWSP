'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Document {
  id?: string;
  type?: string;
  type_ar?: string;
  type_en?: string;
  title_ar?: string;
  title_en?: string;
  description_ar?: string;
  description_en?: string;
  date?: string;
  version?: string;
  pages?: number | null;
  lang?: string;
  file?: string | null;
  featured?: boolean;
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

const DOC_TYPES = [
  { id: 'framework',     en: 'Framework',           ar: 'إطار عمل' },
  { id: 'diagnostic',    en: 'Diagnostic Study',    ar: 'دراسة تشخيصية' },
  { id: 'survey',        en: 'Foundational Survey', ar: 'مسح تأسيسي' },
  { id: 'report',        en: 'Report',              ar: 'تقرير' },
  { id: 'guideline',     en: 'Technical Guideline', ar: 'دليل تقني' },
  { id: 'data',          en: 'Reference Data',      ar: 'بيانات مرجعية' },
  { id: 'specification', en: 'Technical Specification', ar: 'مواصفات تقنية' },
];

export default function DocumentForm({ initialData, isEdit }: { initialData?: Document; isEdit?: boolean }) {
  const router = useRouter();
  const [saving, setSaving]     = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');

  const [form, setForm] = useState<Document>({
    type: 'report', type_ar: 'تقرير', type_en: 'Report',
    title_ar: '', title_en: '', description_ar: '', description_en: '',
    date: '', version: 'Draft', pages: null, lang: 'bilingual',
    file: null, featured: false,
    ...initialData,
  });

  const set = (field: keyof Document, val: Document[keyof Document]) =>
    setForm(prev => ({ ...prev, [field]: val }));

  const handleTypeChange = (typeId: string) => {
    const t = DOC_TYPES.find(d => d.id === typeId);
    setForm(prev => ({ ...prev, type: typeId, type_en: t?.en || typeId, type_ar: t?.ar || typeId }));
  };

  const handleSave = async () => {
    setSaving(true); setError('');
    try {
      const url = isEdit ? `/api/admin/knowledge/${form.id}` : '/api/admin/knowledge';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      setSuccess(isEdit ? 'Document updated.' : 'Document created.');
      if (!isEdit) router.push('/admin/knowledge');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this document permanently?')) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/knowledge/${form.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(await res.text());
      router.push('/admin/knowledge');
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px', gap: '16px' }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Document Type</label>
            <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.type || 'report'} onChange={e => handleTypeChange(e.target.value)}>
              {DOC_TYPES.map(t => <option key={t.id} value={t.id}>{t.en}</option>)}
            </select>
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Language</label>
            <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.lang || 'bilingual'} onChange={e => set('lang', e.target.value)}>
              <option value="bilingual">AR / EN (Bilingual)</option>
              <option value="arabic">Arabic only</option>
              <option value="english">English only</option>
            </select>
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
            <label style={labelStyle}>Title (English)</label>
            <input style={inputStyle} value={form.title_en || ''} onChange={e => set('title_en', e.target.value)} placeholder="Document title in English" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Title (Arabic)</label>
            <input style={{ ...inputStyle, direction: 'rtl' }} value={form.title_ar || ''} onChange={e => set('title_ar', e.target.value)} placeholder="عنوان الوثيقة بالعربية" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Description (English)</label>
            <textarea style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} value={form.description_en || ''} onChange={e => set('description_en', e.target.value)} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Description (Arabic)</label>
            <textarea style={{ ...inputStyle, minHeight: '100px', resize: 'vertical', direction: 'rtl' }} value={form.description_ar || ''} onChange={e => set('description_ar', e.target.value)} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px', gap: '16px' }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Date</label>
            <input style={inputStyle} value={form.date || ''} onChange={e => set('date', e.target.value)} placeholder="April 2025 or Forthcoming" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>File path (PDF URL)</label>
            <input style={inputStyle} value={form.file || ''} onChange={e => set('file', e.target.value || null)} placeholder="/docs/filename.pdf" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Pages</label>
            <input type="number" style={inputStyle} value={form.pages ?? ''} onChange={e => set('pages', e.target.value ? parseInt(e.target.value) : null)} placeholder="—" min={1} />
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Version</label>
          <input style={{ ...inputStyle, maxWidth: '200px' }} value={form.version || ''} onChange={e => set('version', e.target.value)} placeholder="v1.0 / Final / Draft" />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        {isEdit ? (
          <button onClick={handleDelete} disabled={deleting} style={{
            padding: '10px 20px', background: 'rgba(194,90,78,0.1)', color: '#B23E33',
            border: '1px solid rgba(194,90,78,0.3)', borderRadius: '8px',
            fontSize: '13px', fontWeight: '600', cursor: 'pointer',
          }}>
            {deleting ? 'Deleting…' : 'Delete document'}
          </button>
        ) : <div />}

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => router.push('/admin/knowledge')} style={{
            padding: '10px 20px', background: '#F4F6F8', color: '#6B6B6B',
            border: '1px solid #E5DFD0', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
          }}>
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving} style={{
            padding: '10px 24px', background: saving ? '#BFBFBF' : '#1F7A78', color: '#fff',
            border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
          }}>
            {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create document'}
          </button>
        </div>
      </div>
    </div>
  );
}
