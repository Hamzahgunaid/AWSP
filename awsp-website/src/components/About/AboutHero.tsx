import Link from 'next/link';

export default function AboutHero({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';

  return (
    <div style={{
      background: 'var(--ink-800)',
      color: '#fff',
      padding: 'calc(74px + 64px) 0 80px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Radial overlays */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(circle at 85% 30%, rgba(63,168,154,0.18), transparent 50%),
          radial-gradient(circle at 15% 80%, rgba(91,177,227,0.12), transparent 50%)
        `,
      }} />
      {/* Topo lines */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.7,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><g fill='none' stroke='%23ffffff' stroke-width='0.6' opacity='0.08'><path d='M-50 200 Q 100 160 250 220 T 550 200'/><path d='M-50 240 Q 120 200 280 260 T 580 240'/><path d='M-50 160 Q 80 130 220 180 T 520 160'/><path d='M-50 280 Q 140 240 300 290 T 600 270'/></g></svg>")`,
        backgroundSize: 'cover',
      }} />

      <div className="wrap" style={{ position: 'relative' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          fontSize: '12px', fontWeight: '600', letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--sand-400)', fontFamily: ff,
        }}>
          <span style={{ width: '24px', height: '1.5px', background: 'var(--sand-400)', display: 'inline-block' }} />
          {isAr ? 'عن البرنامج' : 'About the Programme'}
        </span>

        <h1 style={{
          fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)',
          color: '#fff', marginTop: '16px', marginBottom: '24px',
          fontSize: 'clamp(2.4rem, 4.2vw, 4.4rem)',
          lineHeight: 1.04, letterSpacing: '-0.022em', fontWeight: 400,
        }}>
          {isAr ? 'خطة قطاع المياه في عدن' : 'Aden Water Sector Plan'}
        </h1>

        <p style={{
          fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)',
          fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
          color: 'rgba(255,255,255,0.78)', maxWidth: '64ch',
          lineHeight: 1.45, marginBottom: '40px',
        }}>
          {isAr
            ? 'عملية تخطيط طويلة الأمد ومبنية على الأدلة، تقودها وزارة المياه والبيئة والمؤسسة المحلية للمياه والصرف الصحي في عدن.'
            : 'A long-term, evidence-based planning process led by the Ministry of Water and Environment and the Local Water and Sanitation Corporation – Aden, with technical support from the International Committee of the Red Cross.'}
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <a href="/docs/AWSP_Development_Framework.pdf" download
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '14px 24px', fontSize: '15px', fontWeight: '600',
              background: 'rgba(255,255,255,0.95)', color: 'var(--ink-800)',
              borderRadius: 'var(--radius)', border: '1.5px solid transparent',
              textDecoration: 'none', fontFamily: ff, cursor: 'pointer',
              transition: 'all 180ms ease',
            }}
          >
            {isAr ? 'تحميل الإطار (PDF)' : 'Download Framework (PDF)'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16 }}>
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <Link href={`/${locale}/contact`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '14px 24px', fontSize: '15px', fontWeight: '600',
              background: 'transparent', color: '#fff',
              borderRadius: 'var(--radius)', border: '1.5px solid rgba(255,255,255,0.5)',
              textDecoration: 'none', fontFamily: ff,
              transition: 'all 180ms ease',
            }}
          >
            {isAr ? 'التواصل مع فريق العمل' : 'Contact the Taskforce'}
          </Link>
        </div>
      </div>
    </div>
  );
}
