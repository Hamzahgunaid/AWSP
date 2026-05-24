'use client';

import { useState } from 'react';
import Link from 'next/link';
import phases from '@/data/phases.json';

const STATUS_CONFIG = {
  completed: { chipClass: 'chip-completed', dotColor: 'var(--sand-400)', en: 'Completed',   ar: 'مكتملة' },
  active:    { chipClass: 'chip-active',    dotColor: 'var(--teal-500)', en: 'In Progress', ar: 'جارية'  },
  planned:   { chipClass: 'chip-planned',   dotColor: 'var(--gray-300)', en: 'Planned',     ar: 'مخططة' },
};

export default function PhaseTracker({ locale }: { locale: string }) {
  const [open, setOpen] = useState<number | null>(1);
  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';

  const visible = phases.slice(0, 3);

  return (
    <section style={{ background: 'var(--paper)', padding: '120px 0', position: 'relative' }}>
      <div className="wrap">

        {/* Intro grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '64px', alignItems: 'end', marginBottom: '80px' }}>
          <div>
            <span className="eyebrow" style={{ fontFamily: ff }}>
              {isAr ? 'رحلة التخطيط' : 'The Planning Journey'}
            </span>
            <h2 style={{ fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)', fontSize: 'clamp(2rem, 3.4vw, 3.2rem)', lineHeight: 1.05, marginTop: '16px' }}>
              {isAr
                ? 'اثنتا عشرة مرحلة متسلسلة من الإطار إلى الإقرار العام.'
                : (<>Twelve sequenced phases<br />from framework to public endorsement.</>)}
            </h2>
            <p className="lead" style={{ marginTop: '24px', fontFamily: ff }}>
              {isAr
                ? 'يتضمن AWSP اثنتي عشرة مرحلة متسلسلة منطقياً، من يوليو ٢٠٢٥ إلى يناير ٢٠٢٩. تُبنى كل مرحلة على مخرجات المرحلة السابقة المُتحقق منها.'
                : 'The AWSP is structured around twelve logically sequenced phases, spanning July 2025 to January 2029. Each phase builds on validated outputs of the preceding stages, with intentional overlaps that enable stakeholder engagement and timely course correction.'}
            </p>
          </div>
          <div>
            {/* Summary card */}
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '24px 28px', marginTop: '28px' }}>
              {[
                { k: isAr ? 'نافذة البرنامج'  : 'Programme window', v: 'Jul 2025 → Jan 2029' },
                { k: isAr ? 'إجمالي المراحل'   : 'Total phases',     v: '12' },
                { k: isAr ? 'مكتملة'           : 'Completed',        v: isAr ? '١ من ١٢' : '1 of 12' },
                { k: isAr ? 'قيد التنفيذ'      : 'In progress',      v: isAr ? 'المراحل ٢–٣' : 'Phases 2 — 3' },
                { k: isAr ? 'المعلم القادم'     : 'Next milestone',   v: isAr ? 'الموافقة على تصميم المسح · يناير ٢٠٢٦' : 'Survey design sign-off · Jan 2026' },
              ].map(row => (
                <div key={row.k} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: '14px', borderBottom: '1px solid var(--line)' }}>
                  <span style={{ color: 'var(--gray-500)', fontFamily: ff }}>{row.k}</span>
                  <span style={{ color: 'var(--ink-800)', fontWeight: '600', fontFamily: 'var(--font-serif)' }}>{row.v}</span>
                </div>
              ))}
            </div>
            {/* Status chips */}
            <div style={{ display: 'flex', gap: '14px', marginTop: '16px', flexWrap: 'wrap' }}>
              {(['completed', 'active', 'planned'] as const).map(s => {
                const cfg = STATUS_CONFIG[s];
                return (
                  <span key={s} className={`chip ${cfg.chipClass}`}>
                    <span className="chip-dot" />
                    {isAr ? cfg.ar : cfg.en}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Vertical timeline */}
        <div style={{ position: 'relative', paddingInlineStart: '56px', maxWidth: '920px', margin: '0 auto' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            insetInlineStart: '22px',
            top: 0, bottom: 0, width: '2px',
            background: 'linear-gradient(180deg, var(--sand-400) 0%, var(--teal-500) 18%, var(--gray-300) 55%, var(--gray-300) 100%)',
          }} />

          {visible.map((phase, i) => {
            const st = phase.status as 'completed' | 'active' | 'planned';
            const cfg = STATUS_CONFIG[st];
            const isOpen = open === i;

            return (
              <div key={phase.id} style={{ position: 'relative', marginBottom: '56px' }}>
                {/* Dot */}
                <div style={{
                  position: 'absolute',
                  insetInlineStart: '-42px', top: '8px',
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: cfg.dotColor,
                  border: '3px solid var(--paper)',
                  boxShadow: st === 'active'
                    ? `0 0 0 1px var(--teal-500), 0 0 0 6px rgba(42,138,138,0.18)`
                    : `0 0 0 1px ${cfg.dotColor}`,
                  zIndex: 1,
                  animation: st === 'active' ? 'pulseActive 2s ease-in-out infinite' : 'none',
                }} />
                {/* Phase number */}
                <div style={{
                  position: 'absolute',
                  insetInlineStart: '-78px', top: 0,
                  fontFamily: 'var(--font-serif)',
                  fontSize: '12px', fontWeight: '500', letterSpacing: '0.08em',
                  color: 'var(--gray-400)', width: '28px',
                  textAlign: isAr ? 'left' : 'right',
                }}>
                  P.{String(phase.id).padStart(2, '0')}
                </div>

                {/* Phase card */}
                <div style={{
                  background: '#fff',
                  border: `1px solid ${isOpen ? 'var(--teal-500)' : 'var(--line)'}`,
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  transition: 'all 220ms ease',
                  boxShadow: isOpen ? '0 18px 40px -22px rgba(14,42,71,0.18)' : 'none',
                }}>
                  {/* Card head */}
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    style={{
                      width: '100%', display: 'flex', justifyContent: 'space-between',
                      alignItems: 'flex-start', padding: '24px 28px', gap: '16px',
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      textAlign: 'start', transition: 'background 160ms ease',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--bone)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '13px', color: 'var(--teal-600)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
                        {isAr ? `المرحلة ${phase.id}` : `Phase ${phase.id}`}
                        {st === 'active' ? (isAr ? ' · المرحلة الحالية' : ' · Current Phase') : ''}
                      </div>
                      <h3 style={{ fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)', fontSize: '1.35rem', margin: '0 0 8px', letterSpacing: '-0.01em', color: 'var(--ink-800)' }}>
                        {isAr ? phase.name_ar : phase.name_en}
                      </h3>
                      <div style={{ fontSize: '13px', color: 'var(--gray-500)', fontFamily: ff, fontVariantNumeric: 'tabular-nums' }}>
                        {phase.start_date} → {phase.end_date}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', flexShrink: 0 }}>
                      <span className={`chip ${cfg.chipClass}`}>
                        <span className="chip-dot" />
                        {isAr ? cfg.ar : cfg.en}
                      </span>
                      <span style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        border: '1px solid var(--line-2)',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 200ms ease',
                        background: isOpen ? 'var(--ink-800)' : 'transparent',
                        color: isOpen ? '#fff' : 'var(--ink-700)',
                        transform: isOpen ? 'rotate(45deg)' : 'none',
                        flexShrink: 0, fontSize: '20px', lineHeight: '1', cursor: 'pointer',
                      }}>+</span>
                    </div>
                  </button>

                  {/* Expandable body */}
                  {isOpen && (
                    <div style={{ padding: '0 28px 28px', borderTop: '1px solid var(--line)', paddingTop: '24px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '36px' }}>
                      <div>
                        <p style={{ color: 'var(--gray-700)', lineHeight: 1.6, fontFamily: ff, fontSize: '15px', marginBottom: '20px' }}>
                          {isAr ? phase.description_ar : phase.description_en}
                        </p>
                        <div style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal-600)', marginBottom: '12px', fontFamily: ff }}>
                          {isAr ? 'الأنشطة الرئيسية' : 'Key activities'}
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {(isAr ? phase.activities_ar : phase.activities_en).map((a, j) => (
                            <li key={j} style={{ position: 'relative', paddingInlineStart: '18px', fontSize: '14px', lineHeight: 1.5, marginBottom: '8px', color: 'var(--gray-700)', fontFamily: ff }}>
                              <span style={{ position: 'absolute', insetInlineStart: 0, top: '9px', width: '6px', height: '6px', background: 'var(--teal-500)', borderRadius: '50%', display: 'inline-block' }} />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal-600)', marginBottom: '12px', fontFamily: ff }}>
                          {isAr ? 'مخرجات المرحلة' : 'Phase outputs'}
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {(isAr ? phase.outputs_ar : phase.outputs_en).map((o, j) => (
                            <li key={j} style={{ position: 'relative', paddingInlineStart: '18px', fontSize: '14px', lineHeight: 1.5, marginBottom: '8px', color: 'var(--gray-700)', fontFamily: ff }}>
                              <span style={{ position: 'absolute', insetInlineStart: 0, top: '9px', width: '6px', height: '6px', background: 'var(--sand-400)', borderRadius: '50%', display: 'inline-block' }} />
                              {o}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* View full roadmap */}
        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <Link href={`/${locale}/about#phases`} className="btn btn-secondary" style={{ fontFamily: ff }}>
            {isAr ? 'عرض خارطة الطريق الكاملة' : 'View Full Roadmap'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="icon-dir" style={{ width: 16, height: 16 }}>
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes pulseActive {
          0%,100% { box-shadow: 0 0 0 1px var(--teal-500), 0 0 0 6px rgba(42,138,138,0.18); }
          50% { box-shadow: 0 0 0 1px var(--teal-500), 0 0 0 10px rgba(42,138,138,0.08); }
        }
      `}</style>
    </section>
  );
}
