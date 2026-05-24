'use client';

import { useState } from 'react';
import phases from '@/data/phases.json';

const STATUS_CONFIG = {
  completed: { chipClass: 'chip-completed', dotColor: 'var(--sand-400)', en: 'Completed',   ar: 'مكتملة'  },
  active:    { chipClass: 'chip-active',    dotColor: 'var(--teal-500)', en: 'In Progress', ar: 'جارية'   },
  planned:   { chipClass: 'chip-planned',   dotColor: 'var(--gray-300)', en: 'Planned',     ar: 'مخططة'  },
};

export default function PhasesSection({ locale }: { locale: string }) {
  const [open, setOpen] = useState<number | null>(1);
  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';
  const serif = isAr ? 'var(--font-arabic)' : 'var(--font-serif)';

  return (
    <section id="phases" style={{ background: 'var(--bone)', padding: '96px 0' }}>
      <div className="wrap">

        <div style={{ maxWidth: '720px', marginBottom: '64px' }}>
          <span className="eyebrow" style={{ fontFamily: ff }}>
            {isAr ? 'خارطة الطريق' : 'The Roadmap'}
          </span>
          <h2 style={{ fontFamily: serif, marginTop: '16px', marginBottom: '16px' }}>
            {isAr ? 'المراحل الـ ١٢ لـ AWSP' : 'The AWSP 12-Phase Roadmap'}
          </h2>
          <p className="lead" style={{ fontFamily: ff }}>
            {isAr
              ? 'من يوليو ٢٠٢٥ إلى يناير ٢٠٢٩ — اثنتا عشرة مرحلة متسلسلة منطقياً، تُبنى كل منها على مخرجات المرحلة السابقة.'
              : 'July 2025 to January 2029 — twelve logically sequenced phases, each building on validated outputs of the preceding stage.'}
          </p>
        </div>

        {/* Full vertical timeline — all 12 phases */}
        <div style={{
          position: 'relative',
          paddingInlineStart: '56px',
          maxWidth: '920px',
        }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            insetInlineStart: '22px',
            top: 0, bottom: 0, width: '2px',
            background: 'linear-gradient(180deg, var(--sand-400) 0%, var(--teal-500) 10%, var(--teal-500) 25%, var(--gray-300) 35%, var(--gray-300) 100%)',
          }} />

          {phases.map((phase, i) => {
            const st = phase.status as 'completed' | 'active' | 'planned';
            const cfg = STATUS_CONFIG[st];
            const isOpen = open === i;

            return (
              <div key={phase.id} style={{ position: 'relative', marginBottom: '24px' }}>
                {/* Dot */}
                <div style={{
                  position: 'absolute',
                  insetInlineStart: '-42px', top: '20px',
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: cfg.dotColor,
                  border: '3px solid var(--bone)',
                  boxShadow: st === 'active'
                    ? '0 0 0 1px var(--teal-500), 0 0 0 6px rgba(42,138,138,0.18)'
                    : `0 0 0 1px ${cfg.dotColor}`,
                  zIndex: 1,
                  animation: st === 'active' ? 'pulseActive 2s ease-in-out infinite' : 'none',
                }} />

                {/* Phase number */}
                <div style={{
                  position: 'absolute',
                  insetInlineStart: '-78px', top: '14px',
                  fontFamily: 'var(--font-serif)', fontSize: '12px',
                  fontWeight: '500', letterSpacing: '0.08em',
                  color: 'var(--gray-400)', width: '28px',
                  textAlign: isAr ? 'left' : 'right',
                }}>
                  P.{String(phase.id).padStart(2, '0')}
                </div>

                {/* Card */}
                <div style={{
                  background: '#fff',
                  border: `1px solid ${isOpen ? 'var(--teal-500)' : 'var(--line)'}`,
                  borderRadius: 'var(--radius-lg)', overflow: 'hidden',
                  transition: 'all 220ms ease',
                  boxShadow: isOpen ? '0 18px 40px -22px rgba(14,42,71,0.18)' : 'none',
                }}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    style={{
                      width: '100%', display: 'flex',
                      justifyContent: 'space-between', alignItems: 'flex-start',
                      padding: '20px 28px', gap: '16px',
                      background: 'transparent', border: 'none',
                      cursor: 'pointer', textAlign: 'start',
                      transition: 'background 160ms ease',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--paper)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: serif, fontSize: '12px',
                        color: 'var(--teal-600)', letterSpacing: '0.1em',
                        textTransform: 'uppercase', marginBottom: '4px',
                      }}>
                        {isAr ? `المرحلة ${phase.id}` : `Phase ${phase.id}`}
                        {st === 'active' ? (isAr ? ' · المرحلة الحالية' : ' · Current Phase') : ''}
                      </div>
                      <h3 style={{
                        fontFamily: serif, fontSize: '1.2rem',
                        margin: '0 0 6px', color: 'var(--ink-800)',
                        letterSpacing: '-0.01em',
                      }}>
                        {isAr ? phase.name_ar : phase.name_en}
                      </h3>
                      <div style={{
                        fontSize: '13px', color: 'var(--gray-500)',
                        fontFamily: ff, fontVariantNumeric: 'tabular-nums',
                      }}>
                        {phase.start_date} → {phase.end_date} · {phase.duration}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flexShrink: 0 }}>
                      <span className={`chip ${cfg.chipClass}`}>
                        <span className="chip-dot" />
                        {isAr ? cfg.ar : cfg.en}
                      </span>
                      <span style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        border: '1px solid var(--line-2)',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 200ms ease',
                        background: isOpen ? 'var(--ink-800)' : 'transparent',
                        color: isOpen ? '#fff' : 'var(--ink-700)',
                        transform: isOpen ? 'rotate(45deg)' : 'none',
                        flexShrink: 0, fontSize: '18px', lineHeight: '1',
                      }}>+</span>
                    </div>
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '20px 28px 28px',
                      borderTop: '1px solid var(--line)',
                      display: 'grid',
                      gridTemplateColumns: '1.4fr 1fr',
                      gap: '32px',
                    }}>
                      <div>
                        <p style={{
                          color: 'var(--gray-700)', lineHeight: 1.65,
                          fontFamily: ff, fontSize: '15px', marginBottom: '20px',
                        }}>
                          {isAr ? phase.description_ar : phase.description_en}
                        </p>
                        <div style={{
                          fontSize: '11px', fontWeight: '600',
                          letterSpacing: '0.12em', textTransform: 'uppercase',
                          color: 'var(--teal-600)', marginBottom: '12px', fontFamily: ff,
                        }}>
                          {isAr ? 'الأنشطة الرئيسية' : 'Key Activities'}
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {(isAr ? phase.activities_ar : phase.activities_en).map((a, j) => (
                            <li key={j} style={{
                              position: 'relative', paddingInlineStart: '16px',
                              fontSize: '14px', lineHeight: 1.5,
                              marginBottom: '8px', color: 'var(--gray-700)', fontFamily: ff,
                            }}>
                              <span style={{
                                position: 'absolute', insetInlineStart: 0, top: '8px',
                                width: '6px', height: '6px',
                                background: 'var(--teal-500)', borderRadius: '50%',
                                display: 'inline-block',
                              }} />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div style={{
                          fontSize: '11px', fontWeight: '600',
                          letterSpacing: '0.12em', textTransform: 'uppercase',
                          color: 'var(--teal-600)', marginBottom: '12px', fontFamily: ff,
                        }}>
                          {isAr ? 'مخرجات المرحلة' : 'Phase Outputs'}
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {(isAr ? phase.outputs_ar : phase.outputs_en).map((o, j) => (
                            <li key={j} style={{
                              position: 'relative', paddingInlineStart: '16px',
                              fontSize: '14px', lineHeight: 1.5,
                              marginBottom: '8px', color: 'var(--gray-700)', fontFamily: ff,
                            }}>
                              <span style={{
                                position: 'absolute', insetInlineStart: 0, top: '8px',
                                width: '6px', height: '6px',
                                background: 'var(--sand-400)', borderRadius: '50%',
                                display: 'inline-block',
                              }} />
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
      </div>

      <style>{`
        @keyframes pulseActive {
          0%,100% { box-shadow: 0 0 0 1px var(--teal-500), 0 0 0 6px rgba(42,138,138,0.18); }
          50%      { box-shadow: 0 0 0 1px var(--teal-500), 0 0 0 10px rgba(42,138,138,0.08); }
        }
      `}</style>
    </section>
  );
}
