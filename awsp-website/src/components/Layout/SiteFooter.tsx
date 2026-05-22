import Link from 'next/link';
import Image from 'next/image';

interface SiteFooterProps {
  locale: string;
}

const NAV_LINKS = [
  { labelAr: 'الرئيسية',          labelEn: 'Home',                href: '' },
  { labelAr: 'عن البرنامج',        labelEn: 'About the Programme', href: '/about' },
  { labelAr: 'مشاريعنا',           labelEn: 'Our Projects',        href: '/projects' },
  { labelAr: 'المنتجات المعرفية',  labelEn: 'Knowledge Products',  href: '/knowledge' },
  { labelAr: 'الأخبار والفعاليات', labelEn: 'News & Events',       href: '/news' },
  { labelAr: 'التواصل والمشاركة',  labelEn: 'Contact & Engage',    href: '/contact' },
];

export default function SiteFooter({ locale }: SiteFooterProps) {
  const isAr = locale === 'ar';
  const fontStyle = {
    fontFamily: isAr ? 'Cairo, sans-serif' : 'Source Sans 3, sans-serif',
  };

  return (
    <footer>
      {/* Teal top line */}
      <div style={{ height: '2px', backgroundColor: '#0D7A6E' }} />

      {/* Footer body */}
      <div style={{ backgroundColor: '#1A3557' }}>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '48px 24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
          }}
        >
          {/* Quick Links */}
          <div>
            <h3
              style={{
                ...fontStyle,
                color: 'white',
                fontWeight: '600',
                fontSize: '15px',
                marginBottom: '20px',
              }}
            >
              {isAr ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="footer-nav-link"
                    style={{
                      ...fontStyle,
                      textDecoration: 'none',
                      fontSize: '14px',
                    }}
                  >
                    {isAr ? link.labelAr : link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href="/docs/AWSP_Development_Framework.pdf"
              download
              style={{
                ...fontStyle,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '24px',
                color: '#C8922A',
                textDecoration: 'none',
                fontSize: '14px',
              }}
            >
              <span>↓</span>
              <span>
                {isAr
                  ? 'تحميل إطار AWSP (PDF)'
                  : 'Download AWSP Framework (PDF)'}
              </span>
            </a>
          </div>

          {/* Programme Info */}
          <div>
            <h3
              style={{
                ...fontStyle,
                color: 'white',
                fontWeight: '600',
                fontSize: '15px',
                marginBottom: '20px',
              }}
            >
              {isAr ? 'عن البرنامج' : 'Programme Info'}
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <Image
                src="/images/awsp-logo-mark.svg"
                alt="AWSP"
                width={140}
                height={42}
                style={{
                  height: '42px',
                  width: 'auto',
                  filter: 'brightness(0) invert(1)',
                }}
              />
            </div>

            <p
              style={{
                ...fontStyle,
                color: 'white',
                fontWeight: '600',
                fontSize: '14px',
                marginBottom: '4px',
              }}
            >
              {isAr ? 'خطة قطاع المياه في عدن' : 'Aden Water Sector Plan'}
            </p>
            <p
              style={{
                ...fontStyle,
                color: '#8A9BB0',
                fontSize: '13px',
                marginBottom: '20px',
              }}
            >
              {isAr ? 'Aden Water Sector Plan' : 'خطة قطاع المياه في عدن'}
            </p>

            <p
              style={{
                ...fontStyle,
                color: 'white',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '4px',
              }}
            >
              {isAr ? 'فريق عمل AWSP' : 'AWSP Taskforce'}
            </p>
            <p
              style={{
                ...fontStyle,
                color: '#8A9BB0',
                fontSize: '13px',
              }}
            >
              {isAr
                ? 'وزارة المياه والبيئة، عدن، الجمهورية اليمنية'
                : 'Ministry of Water and Environment, Aden, Republic of Yemen'}
            </p>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div style={{ backgroundColor: '#0F2340', padding: '12px 24px' }}>
        <p
          style={{
            ...fontStyle,
            textAlign: 'center',
            fontSize: '12px',
            color: '#8A9BB0',
          }}
        >
          {isAr
            ? '© ٢٠٢٥ وزارة المياه والبيئة، الجمهورية اليمنية. جميع الحقوق محفوظة.'
            : '© 2025 Ministry of Water and Environment, Republic of Yemen. All rights reserved.'}
        </p>
      </div>
    </footer>
  );
}
