'use client';

import { useState } from 'react';

interface Phase {
  id: number;
  status: string;
  name_en?: string;
  name_ar?: string;
}

const STATUS_OPTIONS = [
  { id: 'planned',   label: 'Planned',   bg: '#F4F6F8', color: '#8E8E8E' },
  { id: 'active',    label: 'Active',    bg: 'rgba(42,138,138,0.12)', color: '#1F7A78' },
  { id: 'completed', label: 'Completed', bg: 'rgba(200,137,58,0.12)', color: '#8B5C20' },
];

export default function PhaseStatusEditor({ initialPhases }: { initialPhases: Phase[] }) {
  const [phases, setPhases] = useState<Phase[]>(initialPhases);
  const [saving, setSaving] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<number, string>>({});
  const [saved, setSaved]   = useState<Record<number, boolean>>({});

  const updateStatus = async (phaseId: number, newStatus: string) => {
    setSaving(phaseId);
    setErrors(prev => ({ ...prev, [phaseId]: '' }));

    try {
      const res = await fetch(`/api/admin/phases/${phaseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to save');
      setPhases(prev => prev.map(p => p.id === phaseId ? { ...p, status: newStatus } : p));
      setSaved(prev => ({ ...prev, [phaseId]: true }));
      setTimeout(() => setSaved(prev => ({ ...prev, [phaseId]: false })), 2000);
    } catch {
      setErrors(prev => ({ ...prev, [phaseId]: 'Failed to save — changes may not persist in production.' }));
    } finally {
      setSaving(null);
    }
  };

  return (
    <div style={{ background: '#fff', border: '1px solid #E5DFD0', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '60px 1fr 280px 100px',
        gap: '16px', padding: '12px 20px',
        background: '#F4F6F8', fontSize: '11px', fontWeight: '600',
        letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8E8E8E',
        borderBottom: '1px solid #E5DFD0',
      }}>
        <span>Phase</span><span>Title</span><span>Status</span><span></span>
      </div>

      {phases.map((phase, i) => (
        <div key={phase.id} style={{
          display: 'grid', gridTemplateColumns: '60px 1fr 280px 100px',
          gap: '16px', padding: '16px 20px', alignItems: 'center',
          borderBottom: i < phases.length - 1 ? '1px solid #F2F2F2' : 'none',
        }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: '#F4F6F8', border: '2px solid #E5DFD0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Source Serif 4, serif', fontSize: '14px', fontWeight: '600', color: '#0E2A47',
          }}>
            {phase.id}
          </div>

          <div>
            <div style={{ fontWeight: '600', fontSize: '14px', color: '#0E2A47' }}>
              {phase.name_en || `Phase ${phase.id}`}
            </div>
            {phase.name_ar && (
              <div style={{ fontSize: '12px', color: '#8E8E8E' }}>
                {phase.name_ar}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {STATUS_OPTIONS.map(opt => (
              <button key={opt.id}
                onClick={() => updateStatus(phase.id, opt.id)}
                disabled={saving === phase.id}
                style={{
                  padding: '6px 12px', borderRadius: '999px',
                  border: `2px solid ${phase.status === opt.id ? opt.color : 'transparent'}`,
                  background: phase.status === opt.id ? opt.bg : '#F4F6F8',
                  color: phase.status === opt.id ? opt.color : '#8E8E8E',
                  fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div style={{ fontSize: '12px' }}>
            {saving === phase.id && <span style={{ color: '#8E8E8E' }}>Saving…</span>}
            {saved[phase.id] && <span style={{ color: '#1F7A78' }}>✓ Saved</span>}
            {errors[phase.id] && <span style={{ color: '#B23E33', fontSize: '11px' }}>{errors[phase.id]}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
