'use client';

import Link from 'next/link';

const NAV_LINKS = [
  { labelAr: 'الرئيسية',          labelEn: 'Home',                href: '' },
  { labelAr: 'عن البرنامج',        labelEn: 'About',               href: '/about' },
  { labelAr: 'مشاريعنا',           labelEn: 'Projects',            href: '/projects' },
  { labelAr: 'المنتجات المعرفية',  labelEn: 'Knowledge',           href: '/knowledge' },
  { labelAr: 'الأخبار والفعاليات', labelEn: 'News',                href: '/news' },
  { labelAr: 'لوحة المعلومات',     labelEn: 'Dashboard',           href: '/dashboard' },
  { labelAr: 'تواصل معنا',         labelEn: 'Contact',             href: '/contact' },
];

export default function SiteFooter({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const font = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';

  return (
    <footer>
      {/* Gradient accent line */}
      <div style={{
        height: '3px',
        background: 'linear-gradient(90deg, var(--teal-700) 0%, var(--teal-500) 40%, var(--sand-500) 70%, var(--sand-400) 100%)',
      }} />

      {/* Footer body */}
      <div style={{ backgroundColor: 'var(--ink-900)' }}>
        <div
          style={{
            maxWidth: 'var(--wrap-max)',
            margin: '0 auto',
            padding: '56px 24px 40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '48px',
          }}
        >
          {/* Brand column */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <img
                src="/images/awsp-logo-mark.png"
                alt="AWSP"
                style={{ height: '44px', width: 'auto', filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <p style={{
              fontFamily: font,
              color: 'white',
              fontWeight: '600',
              fontSize: '15px',
              marginBottom: '4px',
            }}>
              {isAr ? 'خطة قطاع المياه في عدن' : 'Aden Water Sector Plan'}
            </p>
            <p style={{ fontFamily: font, color: '#8A9BB0', fontSize: '13px', marginBottom: '20px' }}>
              {isAr ? 'Aden Water Sector Plan' : 'خطة قطاع المياه في عدن'}
            </p>
            <p style={{ fontFamily: font, color: '#8A9BB0', fontSize: '13px', lineHeight: '1.6' }}>
              {isAr
                ? 'وزارة المياه والبيئة، عدن، الجمهورية اليمنية'
                : 'Ministry of Water and Environment, Aden, Republic of Yemen'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontFamily: font, color: 'white', fontWeight: '600', fontSize: '14px', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {isAr ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="footer-nav-link"
                    style={{ fontFamily: font, textDecoration: 'none', fontSize: '14px' }}
                  >
                    {isAr ? link.labelAr : link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 style={{ fontFamily: font, color: 'white', fontWeight: '600', fontSize: '14px', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {isAr ? 'الموارد' : 'Resources'}
            </h3>
            <a
              href="/docs/AWSP_Development_Framework.pdf"
              download
              style={{
                fontFamily: font,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--sand-400)',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--sand-500)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--sand-400)'}
            >
              <span>↓</span>
              <span>{isAr ? 'تحميل إطار AWSP (PDF)' : 'Download AWSP Framework (PDF)'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div style={{ backgroundColor: 'var(--ink-800)', padding: '14px 24px' }}>
        <p style={{
          fontFamily: font,
          textAlign: 'center',
          fontSize: '12px',
          color: '#6B7280',
        }}>
          {isAr
            ? '© ٢٠٢٥ وزارة المياه والبيئة، الجمهورية اليمنية. جميع الحقوق محفوظة.'
            : '© 2025 Ministry of Water and Environment, Republic of Yemen. All rights reserved.'}
        </p>
      </div>
    </footer>
  );
}
