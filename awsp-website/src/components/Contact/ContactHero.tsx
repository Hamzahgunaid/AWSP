import Link from 'next/link';

export default function ContactHero({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';
  const serif = isAr ? 'var(--font-arabic)' : 'var(--font-serif)';

  return (
    <div style={{
      background: 'var(--ink-800)', color: '#fff',
      padding: 'calc(74px + 64px) 0 80px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(circle at 85% 30%, rgba(63,168,154,0.18), transparent 50%),
          radial-gradient(circle at 15% 80%, rgba(91,177,227,0.12), transparent 50%)
        `,
      }} />
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.7,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><g fill='none' stroke='%23ffffff' stroke-width='0.6' opacity='0.08'><path d='M-50 200 Q 100 160 250 220 T 550 200'/><path d='M-50 240 Q 120 200 280 260 T 580 240'/><path d='M-50 160 Q 80 130 220 180 T 520 160'/></g></svg>")`,
        backgroundSize: 'cover',
      }} />
      <div className="wrap" style={{ position: 'relative' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          fontSize: '12px', fontWeight: '600', letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--sand-400)', fontFamily: ff,
        }}>
          <span style={{ width: '24px', height: '1.5px', background: 'var(--sand-400)', display: 'inline-block' }} />
          {isAr ? 'التواصل والمشاركة' : 'Contact & Engage'}
        </span>
        <h1 style={{
          fontFamily: serif, color: '#fff',
          marginTop: '16px', marginBottom: '24px',
          fontSize: 'clamp(2.4rem, 4.2vw, 4.4rem)',
          lineHeight: 1.04, letterSpacing: '-0.022em', fontWeight: 400,
        }}>
          {isAr ? 'تواصل مع فريق العمل' : 'Get in touch'}
        </h1>
        <p style={{
          fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)',
          fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
          color: 'rgba(255,255,255,0.78)',
          maxWidth: '56ch', lineHeight: 1.45, marginBottom: 0,
        }}>
          {isAr
            ? 'فريق عمل AWSP يرحّب باستفسارات جميع أصحاب المصلحة — الجهات المانحة والشركاء المنفذين ومؤسسات البحث والسلطات المحلية والمواطنين. سيرد ممثل خلال خمسة أيام عمل.'
            : 'The AWSP Taskforce welcomes enquiries from all stakeholders — donors, implementing partners, research institutions, local authorities, and citizens. A representative will respond within five working days.'}
        </p>
      </div>
    </div>
  );
}
