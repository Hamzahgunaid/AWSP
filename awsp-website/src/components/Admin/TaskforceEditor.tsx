'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Member {
  id: string;
  name_en: string;
  name_ar: string;
  title_en: string;
  title_ar: string;
  department: 'MWE' | 'LWSCA';
  email: string;
  phone: string;
  active: boolean;
}

export default function TaskforceEditor({
  member,
  isNew,
}: {
  member: Member | null;
  isNew: boolean;
}) {
  const router = useRouter();
  const [saving, setSaving]     = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage]   = useState('');

  const [form, setForm] = useState<Member>({
    id:         member?.id         ?? `tf-${Date.now()}`,
    name_en:    member?.name_en    ?? '',
    name_ar:    member?.name_ar    ?? '',
    title_en:   member?.title_en   ?? '',
    title_ar:   member?.title_ar   ?? '',
    department: member?.department ?? 'MWE',
    email:      member?.email      ?? '',
    phone:      member?.phone      ?? '',
    active:     member?.active     ?? true,
  });

  const save = async () => {
    if (!form.name_en.trim() || !form.name_ar.trim()) {
      setMessage('Both English and Arabic names are required.');
      return;
    }
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch(
        isNew ? '/api/admin/taskforce' : `/api/admin/taskforce/${form.id}`,
        {
          method: isNew ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );
      if (res.ok) {
        setMessage('Saved successfully.');
        if (isNew) router.push('/admin/taskforce');
      } else {
        setMessage('Error saving. Please try again.');
      }
    } catch {
      setMessage('Network error.');
    }
    setSaving(false);
  };

  const deleteMember = async () => {
    if (!confirm(`Delete ${form.name_en}? This cannot be undone.`)) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/taskforce/${form.id}`, { method: 'DELETE' });
    if (res.ok) {
      router.push('/admin/taskforce');
    } else {
      setMessage('Error deleting.');
      setDeleting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', fontSize: '14px',
    border: '1px solid #D8D0BB', borderRadius: '8px',
    fontFamily: 'inherit', outline: 'none', background: '#fff',
    boxSizing: 'border-box',
  };
  const labelStyle: React.CSSProperties = {
    fontSize: '12px', fontWeight: '600', color: '#3D3D3D',
    letterSpacing: '0.04em', display: 'block', marginBottom: '6px',
  };
  const isError = message.includes('Error') || message.includes('required') || message.includes('Network');

  return (
    <div style={{ maxWidth: '720px' }}>

      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '28px',
      }}>
        <div>
          <Link href="/admin/taskforce" style={{
            fontSize: '13px', color: '#6B6B6B',
            textDecoration: 'none', display: 'inline-flex',
            alignItems: 'center', gap: '6px', marginBottom: '8px',
          }}>
            ← Back to Taskforce
          </Link>
          <h1 style={{
            fontFamily: 'Source Serif 4, serif', fontSize: '24px',
            fontWeight: '400', color: '#0E2A47', margin: 0,
          }}>
            {isNew ? 'Add Taskforce Member' : `Edit — ${form.name_en}`}
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
          {!isNew && (
            <button
              onClick={deleteMember}
              disabled={deleting}
              style={{
                padding: '10px 18px',
                background: 'rgba(194,90,78,0.08)',
                color: '#B23E33',
                border: '1px solid rgba(194,90,78,0.3)',
                borderRadius: '8px', fontSize: '13px',
                fontWeight: '600', cursor: deleting ? 'not-allowed' : 'pointer',
              }}
            >
              {deleting ? 'Deleting…' : 'Delete Member'}
            </button>
          )}
          <button
            onClick={save}
            disabled={saving}
            style={{
              padding: '10px 24px',
              background: saving ? '#BFBFBF' : '#0E2A47',
              color: '#fff', border: 'none', borderRadius: '8px',
              fontSize: '14px', fontWeight: '600',
              cursor: saving ? 'not-allowed' : 'pointer',
            }}
          >
            {saving ? 'Saving…' : isNew ? 'Add Member' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div style={{
          padding: '12px 16px', borderRadius: '8px',
          fontSize: '13px', marginBottom: '20px',
          background: isError ? 'rgba(194,90,78,0.08)' : 'rgba(42,138,138,0.08)',
          border: `1px solid ${isError ? 'rgba(194,90,78,0.3)' : 'rgba(42,138,138,0.3)'}`,
          color: isError ? '#B23E33' : '#1F7A78',
        }}>
          {message}
        </div>
      )}

      {/* Form */}
      <div style={{
        background: '#fff', border: '1px solid #E5DFD0',
        borderRadius: '12px', padding: '28px',
        display: 'flex', flexDirection: 'column', gap: '20px',
      }}>

        {/* Names */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Full Name (English) *</label>
            <input
              value={form.name_en}
              onChange={e => setForm(f => ({ ...f, name_en: e.target.value }))}
              placeholder="e.g. Ahmad Al-Yamani"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>الاسم الكامل (عربي) *</label>
            <input
              value={form.name_ar}
              onChange={e => setForm(f => ({ ...f, name_ar: e.target.value }))}
              placeholder="مثال: أحمد اليماني"
              dir="rtl"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Titles */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Job Title (English)</label>
            <input
              value={form.title_en}
              onChange={e => setForm(f => ({ ...f, title_en: e.target.value }))}
              placeholder="e.g. Technical Officer"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>المسمى الوظيفي (عربي)</label>
            <input
              value={form.title_ar}
              onChange={e => setForm(f => ({ ...f, title_ar: e.target.value }))}
              placeholder="مثال: ضابط تقني"
              dir="rtl"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Department */}
        <div>
          <label style={labelStyle}>Department *</label>
          <div style={{ display: 'flex', gap: '12px' }}>
            {(['MWE', 'LWSCA'] as const).map(dept => (
              <button
                key={dept}
                onClick={() => setForm(f => ({ ...f, department: dept }))}
                style={{
                  flex: 1, padding: '12px',
                  borderRadius: '8px', border: '2px solid',
                  borderColor: form.department === dept
                    ? (dept === 'MWE' ? '#2A78B8' : '#2A8A8A')
                    : '#E5DFD0',
                  background: form.department === dept
                    ? (dept === 'MWE' ? 'rgba(42,120,184,0.08)' : 'rgba(42,138,138,0.08)')
                    : '#fff',
                  color: form.department === dept
                    ? (dept === 'MWE' ? '#2A78B8' : '#1F7A78')
                    : '#6B6B6B',
                  fontSize: '14px', fontWeight: '700', cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Email (optional)</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="name@example.com"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Phone (optional)</label>
            <input
              type="tel"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              placeholder="+967 xxx xxx xxx"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Active toggle */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          paddingTop: '4px', borderTop: '1px solid #F2F2F2',
        }}>
          <button
            role="switch"
            aria-checked={form.active}
            onClick={() => setForm(f => ({ ...f, active: !f.active }))}
            style={{
              width: '44px', height: '24px', borderRadius: '999px',
              border: 'none', cursor: 'pointer',
              background: form.active ? '#2A8A8A' : '#BFBFBF',
              position: 'relative', transition: 'background 150ms ease',
              flexShrink: 0,
            }}
          >
            <span style={{
              position: 'absolute', top: '3px',
              left: form.active ? '22px' : '3px',
              width: '18px', height: '18px', borderRadius: '50%',
              background: '#fff', transition: 'left 150ms ease',
            }} />
          </button>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#0E2A47' }}>
              {form.active ? 'Active' : 'Inactive'}
            </div>
            <div style={{ fontSize: '12px', color: '#8E8E8E' }}>
              Inactive members are hidden from the public-facing About page.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
