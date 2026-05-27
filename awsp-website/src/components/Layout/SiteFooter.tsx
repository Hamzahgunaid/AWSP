'use client';

import Link from 'next/link';

const NAV = [
  { ar: 'الرئيسية',          en: 'Home',      href: '' },
  { ar: 'عن البرنامج',        en: 'About',     href: '/about' },
  { ar: 'مشاريعنا',           en: 'Projects',  href: '/projects' },
  { ar: 'لوحة التحكم',        en: 'Dashboard', href: '/dashboard' },
  { ar: 'المنتجات المعرفية',  en: 'Knowledge', href: '/knowledge' },
  { ar: 'الأخبار',            en: 'News',      href: '/news' },
  { ar: 'التواصل',            en: 'Contact',   href: '/contact' },
];

export default function SiteFooter({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';

  return (
    <footer style={{
      background: 'var(--ink-900)',
      color: 'rgba(255,255,255,0.75)',
      padding: '48px 0 28px',
      position: 'relative',
    }}>
      {/* Gradient top line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, var(--teal-400), var(--blue-500), var(--sand-400))',
      }} />

      <div className="wrap">
        {/* Top row */}
        <div className="footer-top" style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', paddingBottom: '28px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          gap: '32px', flexWrap: 'wrap',
        }}>
          <Link href={`/${locale}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <img
              src="/images/awsp-logo-mark.png"
              alt="AWSP"
              width={40}
              height={40}
              style={{
                width: '40px', height: '40px',
                objectFit: 'contain', flexShrink: 0,
                filter: 'brightness(0) invert(1)', opacity: 0.9,
              }}
            />
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <strong style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: '600', color: '#fff', letterSpacing: '0.02em' }}>
                AWSP
              </strong>
              <span style={{ fontFamily: ff, fontSize: '11px', fontWeight: '500', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
                {isAr ? 'خطة قطاع المياه في عدن' : 'Aden Water Sector Plan'}
              </span>
            </span>
          </Link>

          <nav className="footer-nav" style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
            {NAV.map(l => (
              <Link key={l.href} href={`/${locale}${l.href}`}
                style={{
                  fontFamily: ff, fontSize: '13.5px', fontWeight: '500',
                  color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
                  transition: 'color 160ms ease',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--teal-300)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'}
              >
                {isAr ? l.ar : l.en}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div style={{
          paddingTop: '24px',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', fontSize: '12.5px',
          color: 'rgba(255,255,255,0.5)',
          flexWrap: 'wrap', gap: '14px',
        }}>
          <span style={{ fontFamily: ff }}>
            {isAr
              ? '© ٢٠٢٥ وزارة المياه والبيئة، الجمهورية اليمنية'
              : '© 2025 Ministry of Water and Environment, Republic of Yemen'}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <a href="mailto:taskforce@awsp.gov.ye"
              style={{ fontFamily: ff, color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
              taskforce@awsp.gov.ye
            </a>
            <span style={{ opacity: 0.35 }}>·</span>
            <a href="/docs/AWSP_Development_Framework.pdf" download
              style={{ fontFamily: ff, color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
              Framework PDF
            </a>
            <span style={{ opacity: 0.35 }}>·</span>
            <Link href={`/${locale}/news`}
              style={{ fontFamily: ff, color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
              Press Kit
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
