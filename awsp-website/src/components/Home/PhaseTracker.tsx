'use client';

import { useState } from 'react';
import Link from 'next/link';
import phases from '@/data/phases.json';
import type { Phase } from '@/types';

export default function PhaseTracker({ locale }: { locale: string }) {
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const isAr = locale === 'ar';
  const font = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';

  const getNodeStyle = (status: string, isSelected: boolean) => {
    const base = {
      width: '36px', height: '36px',
      borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '13px', fontWeight: '700' as const,
      cursor: 'pointer' as const,
      transition: 'all 200ms ease',
      border: '3px solid transparent',
      position: 'relative' as const,
      flexShrink: 0,
      outline: isSelected ? '3px solid rgba(42,138,138,0.4)' : 'none',
      outlineOffset: '2px',
    };
    if (status === 'completed') return { ...base, backgroundColor: 'var(--sand-500)', color: 'white', borderColor: 'var(--sand-500)' };
    if (status === 'active') return { ...base, backgroundColor: 'var(--teal-600)', color: 'white', borderColor: 'var(--teal-600)', boxShadow: '0 0 0 4px rgba(31,122,120,0.25)' };
    return { ...base, backgroundColor: 'white', color: '#8A9BB0', borderColor: 'var(--line-2)' };
  };

  const selectedPhase: Phase | null = activePhase !== null ? (phases as Phase[])[activePhase] : null;

  return (
    <section style={{ backgroundColor: 'var(--paper)', padding: '72px 24px' }}>
      <div style={{ maxWidth: 'var(--wrap-max)', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{
            fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)',
            fontWeight: '700',
            fontSize: 'clamp(24px, 3vw, 36px)',
            color: 'var(--ink-900)',
            marginBottom: '12px',
          }}>
            {isAr ? 'رحلة التخطيط في AWSP' : 'The AWSP Planning Journey'}
          </h2>
          <p style={{ fontFamily: font, fontSize: '15px', color: '#6B7280' }}>
            {isAr
              ? '١٢ مرحلة متسلسلة من اعتماد الإطار إلى الإقرار الرسمي — يوليو ٢٠٢٥ إلى يناير ٢٠٢٩'
              : '12 sequenced phases from framework adoption to public endorsement — July 2025 to January 2029'}
          </p>
        </div>

        {/* Timeline */}
        <div style={{
          display: 'flex', alignItems: 'center', overflowX: 'auto',
          paddingBottom: '16px', gap: '0', position: 'relative',
        }}>
          {(phases as Phase[]).map((phase, i) => (
            <div key={phase.id} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                {phase.status === 'active' ? (
                  <span style={{
                    fontSize: '10px', fontFamily: font,
                    color: 'var(--teal-600)', fontWeight: '700',
                    backgroundColor: 'rgba(31,122,120,0.10)',
                    padding: '2px 8px', borderRadius: '100px',
                  }}>
                    {isAr ? 'جارية' : 'Current'}
                  </span>
                ) : (
                  <span style={{ height: '20px', display: 'block' }} />
                )}

                <button
                  style={getNodeStyle(phase.status, activePhase === i)}
                  onClick={() => setActivePhase(activePhase === i ? null : i)}
                  title={isAr ? phase.name_ar : phase.name_en}
                  aria-pressed={activePhase === i}
                >
                  {phase.id}
                </button>

                <span style={{
                  fontSize: '10px', fontFamily: font,
                  color: '#8A9BB0', textAlign: 'center',
                  maxWidth: '64px', lineHeight: '1.3',
                }}>
                  {isAr
                    ? phase.name_ar.split(' ').slice(0, 2).join(' ')
                    : phase.name_en.split(' ').slice(0, 2).join(' ')}
                </span>
              </div>

              {i < phases.length - 1 && (
                <div style={{
                  height: '2px', width: '24px', flexShrink: 0,
                  backgroundColor: phase.status === 'completed' ? 'var(--sand-500)' : 'var(--line)',
                  marginBottom: '28px',
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Phase detail panel */}
        {selectedPhase && (
          <div style={{
            marginTop: '32px', padding: '28px',
            backgroundColor: 'var(--bone)',
            borderRadius: '12px',
            borderInlineStart: '4px solid var(--teal-600)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontFamily: font, fontWeight: '700', fontSize: '18px', color: 'var(--ink-900)', marginBottom: '4px' }}>
                  {isAr
                    ? `المرحلة ${selectedPhase.id}: ${selectedPhase.name_ar}`
                    : `Phase ${selectedPhase.id}: ${selectedPhase.name_en}`}
                </h3>
                <span style={{ fontSize: '12px', fontFamily: font, color: '#8A9BB0' }}>
                  {selectedPhase.start_date} — {selectedPhase.end_date}
                </span>
              </div>
              <span style={{
                padding: '4px 14px', borderRadius: '100px',
                fontSize: '12px', fontWeight: '600', fontFamily: font,
                backgroundColor: selectedPhase.status === 'completed' ? 'rgba(200,137,58,0.12)'
                  : selectedPhase.status === 'active' ? 'rgba(31,122,120,0.10)' : 'var(--bone)',
                color: selectedPhase.status === 'completed' ? 'var(--sand-500)'
                  : selectedPhase.status === 'active' ? 'var(--teal-600)' : '#8A9BB0',
              }}>
                {isAr
                  ? selectedPhase.status === 'completed' ? 'مكتملة'
                    : selectedPhase.status === 'active' ? 'جارية' : 'مخططة'
                  : selectedPhase.status === 'completed' ? 'Completed'
                    : selectedPhase.status === 'active' ? 'In Progress' : 'Planned'}
              </span>
            </div>
            <p style={{ fontFamily: font, fontSize: '14px', color: '#4B5563', marginTop: '16px', lineHeight: '1.8' }}>
              {isAr ? selectedPhase.description_ar : selectedPhase.description_en}
            </p>
            <div style={{ marginTop: '16px' }}>
              <p style={{ fontFamily: font, fontSize: '13px', fontWeight: '700', color: 'var(--ink-900)', marginBottom: '8px' }}>
                {isAr ? 'الأنشطة الرئيسية:' : 'Key Activities:'}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {(isAr ? selectedPhase.activities_ar : selectedPhase.activities_en).map((a, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '8px', fontFamily: font, fontSize: '13px', color: '#4B5563' }}>
                    <span style={{ color: 'var(--teal-600)', fontWeight: '700', flexShrink: 0 }}>•</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link href={`/${locale}/about#phases`} style={{
            fontFamily: font, fontSize: '14px', fontWeight: '600',
            color: 'var(--teal-600)', textDecoration: 'none',
          }}>
            {isAr ? '← عرض خارطة الطريق الكاملة' : 'View Full Roadmap →'}
          </Link>
        </div>
      </div>
    </section>
  );
}
