'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  locale: string;
}

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

export default function HeroSection({ locale }: HeroSectionProps) {
  const isAr = locale === 'ar';
  const [tickerIdx, setTickerIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setTickerIdx(i => (i + 1) % TICKER_ITEMS.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ position: 'relative', width: '100%' }}>

      {/* Hero background */}
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '90vh',
        background: 'linear-gradient(135deg, #0F2340 0%, #1A3557 40%, #0D4A6E 70%, #0D7A6E 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 24px 60px',
      }}>

        {/* Decorative water pattern overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 20% 50%, rgba(13,122,110,0.3) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(27,124,184,0.2) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />

        {/* Programme badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(13,122,110,0.3)',
          border: '1px solid rgba(13,122,110,0.6)',
          borderRadius: '100px',
          padding: '6px 18px',
          marginBottom: '32px',
          position: 'relative',
        }}>
          <div style={{
            width: '8px', height: '8px',
            borderRadius: '50%',
            backgroundColor: '#2CB5A0',
          }} />
          <span style={{
            color: '#A0E4D8',
            fontSize: '13px',
            fontFamily: isAr ? 'Cairo, sans-serif' : 'Source Sans 3, sans-serif',
            fontWeight: '500',
            letterSpacing: '0.5px',
          }}>
            {isAr ? 'البرنامج الرسمي — وزارة المياه والبيئة' : 'Official Programme — Ministry of Water & Environment'}
          </span>
        </div>

        {/* Arabic headline */}
        <h1 style={{
          fontFamily: 'Cairo, sans-serif',
          fontWeight: '700',
          fontSize: 'clamp(32px, 6vw, 64px)',
          color: 'white',
          lineHeight: '1.2',
          marginBottom: '16px',
          position: 'relative',
          maxWidth: '900px',
        }}>
          خطة قطاع المياه في عدن
        </h1>

        {/* English headline */}
        <h2 style={{
          fontFamily: 'Source Serif 4, serif',
          fontWeight: '400',
          fontSize: 'clamp(18px, 3vw, 32px)',
          color: 'rgba(255,255,255,0.85)',
          marginBottom: '28px',
          position: 'relative',
        }}>
          Aden Water Sector Plan
        </h2>

        {/* Mission statement */}
        <p style={{
          fontFamily: isAr ? 'Cairo, sans-serif' : 'Source Sans 3, sans-serif',
          fontSize: 'clamp(15px, 2vw, 19px)',
          color: 'rgba(255,255,255,0.75)',
          fontStyle: 'italic',
          maxWidth: '720px',
          lineHeight: '1.8',
          marginBottom: '48px',
          position: 'relative',
        }}>
          {isAr
            ? 'الانتقال من الاستجابة الإنسانية إلى نظام مياه وصرف صحي مستقر ومرن وتحت قيادة محلية في عدن.'
            : "Transitioning Aden's water and sanitation sector from emergency response to a stable, resilient, and locally governed system."}
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <Link
            href={`/${locale}/projects`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              border: '2px solid white',
              borderRadius: '8px',
              color: 'white',
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Source Sans 3, sans-serif',
              fontWeight: '600',
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'all 150ms ease',
              backgroundColor: 'rgba(255,255,255,0.1)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'white';
              (e.currentTarget as HTMLElement).style.color = '#1A3557';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.1)';
              (e.currentTarget as HTMLElement).style.color = 'white';
            }}
          >
            {isAr ? '← استكشاف المشاريع' : 'Explore Projects →'}
          </Link>

          <a
            href="/docs/AWSP_Development_Framework.pdf"
            download
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              border: '2px solid rgba(255,255,255,0.4)',
              borderRadius: '8px',
              color: 'rgba(255,255,255,0.85)',
              fontFamily: isAr ? 'Cairo, sans-serif' : 'Source Sans 3, sans-serif',
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
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)';
            }}
          >
            ↓ {isAr ? 'تحميل الإطار' : 'Download Framework'}
          </a>
        </div>
      </div>

      {/* News Ticker */}
      <div style={{
        backgroundColor: '#0D7A6E',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        overflow: 'hidden',
      }}>
        <span style={{
          color: '#C8922A',
          fontFamily: isAr ? 'Cairo, sans-serif' : 'Source Sans 3, sans-serif',
          fontWeight: '700',
          fontSize: '13px',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          {isAr ? 'آخر الأخبار:' : 'Latest:'}
        </span>
        <span style={{
          color: 'white',
          fontFamily: isAr ? 'Cairo, sans-serif' : 'Source Sans 3, sans-serif',
          fontSize: '13px',
          transition: 'opacity 500ms ease',
        }}>
          {isAr ? TICKER_ITEMS[tickerIdx].ar : TICKER_ITEMS[tickerIdx].en}
        </span>
      </div>
    </section>
  );
}
