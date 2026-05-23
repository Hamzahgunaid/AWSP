'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const TICKER_ITEMS = [
  {
    ar: 'تم إطلاق برنامج خطة قطاع المياه في عدن رسمياً — يونيو ٢٠٢٥',
    en: 'Aden Water Sector Plan officially launched — June 2025',
  },
  {
    ar: 'المرحلة الثانية جارية: مواءمة المسوحات وتنسيق أصحاب المصلحة',
    en: 'Phase 2 active: Survey Alignment & Stakeholder Coordination',
  },
  {
    ar: '١٩٤ مشروع منجز عبر مديريات عدن الثماني',
    en: "194 projects delivered across Aden's eight urban districts",
  },
];

export default function HeroSection({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const [tickerIdx, setTickerIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTickerIdx(i => (i + 1) % TICKER_ITEMS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const font = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        marginTop: 'calc(-1 * var(--header-h))',
      }}
    >
      {/* Hero panel */}
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '92vh',
        background: 'linear-gradient(135deg, var(--ink-900) 0%, var(--ink-800) 35%, var(--teal-700) 70%, var(--teal-600) 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'calc(var(--header-h) + 48px) 24px 72px',
      }}>

        {/* Radial overlays */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 20% 50%, rgba(31,122,120,0.35) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(63,168,154,0.18) 0%, transparent 50%)',
        }} />

        {/* Programme badge */}
        <div style={{
          position: 'relative',
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          backgroundColor: 'rgba(31,122,120,0.25)',
          border: '1px solid rgba(63,168,154,0.5)',
          borderRadius: '100px',
          padding: '6px 18px',
          marginBottom: '32px',
        }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--teal-400)' }} />
          <span style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '13px',
            fontFamily: font,
            fontWeight: '500',
            letterSpacing: '0.4px',
          }}>
            {isAr ? 'البرنامج الرسمي — وزارة المياه والبيئة' : 'Official Programme — Ministry of Water & Environment'}
          </span>
        </div>

        {/* Main headline */}
        <h1 style={{
          position: 'relative',
          fontFamily: 'var(--font-arabic)',
          fontWeight: '700',
          fontSize: 'clamp(32px, 6vw, 64px)',
          color: 'white',
          lineHeight: '1.2',
          marginBottom: '16px',
          maxWidth: '900px',
        }}>
          خطة قطاع المياه في عدن
        </h1>

        <h2 style={{
          position: 'relative',
          fontFamily: 'var(--font-serif)',
          fontWeight: '400',
          fontSize: 'clamp(18px, 3vw, 30px)',
          color: 'rgba(255,255,255,0.80)',
          marginBottom: '28px',
        }}>
          Aden Water Sector Plan
        </h2>

        {/* Mission */}
        <p style={{
          position: 'relative',
          fontFamily: font,
          fontSize: 'clamp(15px, 2vw, 18px)',
          color: 'rgba(255,255,255,0.70)',
          fontStyle: 'italic',
          maxWidth: '700px',
          lineHeight: '1.9',
          marginBottom: '52px',
        }}>
          {isAr
            ? 'الانتقال من الاستجابة الإنسانية إلى نظام مياه وصرف صحي مستقر ومرن وتحت قيادة محلية في عدن.'
            : "Transitioning Aden's water and sanitation sector from emergency response to a stable, resilient, and locally governed system."}
        </p>

        {/* CTAs */}
        <div style={{
          position: 'relative',
          display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center',
        }}>
          <Link
            href={`/${locale}/projects`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 32px',
              border: '2px solid white',
              borderRadius: '8px',
              color: 'white',
              fontFamily: font,
              fontWeight: '600',
              fontSize: '15px',
              textDecoration: 'none',
              backgroundColor: 'rgba(255,255,255,0.12)',
              transition: 'all 150ms ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'white';
              (e.currentTarget as HTMLElement).style.color = 'var(--ink-900)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.12)';
              (e.currentTarget as HTMLElement).style.color = 'white';
            }}
          >
            {isAr ? '← استكشاف المشاريع' : 'Explore Projects →'}
          </Link>

          <a
            href="/docs/AWSP_Development_Framework.pdf"
            download
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 32px',
              border: '2px solid rgba(255,255,255,0.35)',
              borderRadius: '8px',
              color: 'rgba(255,255,255,0.80)',
              fontFamily: font,
              fontWeight: '600',
              fontSize: '15px',
              textDecoration: 'none',
              backgroundColor: 'transparent',
              transition: 'all 150ms ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'white';
              (e.currentTarget as HTMLElement).style.color = 'white';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.35)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.80)';
            }}
          >
            ↓ {isAr ? 'تحميل الإطار' : 'Download Framework'}
          </a>
        </div>
      </div>

      {/* News ticker */}
      <div style={{
        backgroundColor: 'var(--teal-700)',
        padding: '11px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        overflow: 'hidden',
      }}>
        <span style={{
          color: 'var(--sand-400)',
          fontFamily: font,
          fontWeight: '700',
          fontSize: '12px',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          {isAr ? 'آخر الأخبار:' : 'Latest:'}
        </span>
        <span style={{
          color: 'rgba(255,255,255,0.90)',
          fontFamily: font,
          fontSize: '13px',
          transition: 'opacity 500ms ease',
        }}>
          {isAr ? TICKER_ITEMS[tickerIdx].ar : TICKER_ITEMS[tickerIdx].en}
        </span>
      </div>
    </section>
  );
}
