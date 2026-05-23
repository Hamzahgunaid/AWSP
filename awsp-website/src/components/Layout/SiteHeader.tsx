'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import LanguageToggle from './LanguageToggle';

interface NavItem {
  labelAr: string;
  labelEn: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { labelAr: 'الرئيسية',          labelEn: 'Home',                href: '' },
  { labelAr: 'عن البرنامج',        labelEn: 'About',               href: '/about' },
  { labelAr: 'مشاريعنا',           labelEn: 'Projects',            href: '/projects' },
  { labelAr: 'المنتجات المعرفية',  labelEn: 'Knowledge',           href: '/knowledge' },
  { labelAr: 'الأخبار والفعاليات', labelEn: 'News',                href: '/news' },
  { labelAr: 'لوحة المعلومات',     labelEn: 'Dashboard',           href: '/dashboard' },
  { labelAr: 'تواصل معنا',         labelEn: 'Contact',             href: '/contact' },
];

export default function SiteHeader({ locale }: { locale: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isAr = locale === 'ar';

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => {
    const full = `/${locale}${href}`;
    if (href === '') return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(full);
  };

  const navColor = (href: string) => {
    if (isActive(href)) return transparent ? 'white' : 'var(--teal-600)';
    return transparent ? 'rgba(255,255,255,0.85)' : 'var(--ink-700)';
  };

  const font = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        insetInlineStart: 0,
        width: '100%',
        height: 'var(--header-h)',
        backgroundColor: transparent ? 'transparent' : 'white',
        boxShadow: transparent ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
        zIndex: 50,
        transition: 'background-color 300ms ease, box-shadow 300ms ease',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--wrap-max)',
          margin: '0 auto',
          height: '100%',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          aria-label="AWSP — Aden Water Sector Plan"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <img
            src="/images/awsp-logo-mark.png"
            alt="AWSP — Aden Water Sector Plan"
            style={{
              height: '48px',
              width: 'auto',
              filter: transparent ? 'brightness(0) invert(1)' : 'none',
              transition: 'filter 300ms ease',
            }}
          />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label={isAr ? 'القائمة الرئيسية' : 'Main navigation'}
          style={{ display: 'flex', alignItems: 'center', gap: '2px' }}
          className="hidden md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              style={{
                fontFamily: font,
                padding: '8px 11px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                textDecoration: 'none',
                color: navColor(item.href),
                borderBottom: isActive(item.href)
                  ? `2px solid ${transparent ? 'white' : 'var(--teal-600)'}`
                  : '2px solid transparent',
                transition: 'color 150ms ease, border-color 150ms ease',
              }}
            >
              {isAr ? item.labelAr : item.labelEn}
            </Link>
          ))}
        </nav>

        {/* Right: lang toggle + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <LanguageToggle locale={locale} onDark={transparent} />

          <button
            className="md:hidden"
            style={{
              padding: '8px',
              borderRadius: '6px',
              border: 'none',
              background: 'none',
              color: transparent ? 'white' : 'var(--ink-700)',
              cursor: 'pointer',
              transition: 'color 300ms ease',
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--header-h)',
            insetInlineStart: 0,
            width: '100%',
            backgroundColor: 'white',
            borderTop: `1px solid var(--bone)`,
            boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
            zIndex: 40,
          }}
        >
          <nav style={{ padding: '8px 0' }}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: font,
                  display: 'block',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  color: isActive(item.href) ? 'var(--teal-600)' : 'var(--ink-700)',
                  borderInlineStart: isActive(item.href)
                    ? '3px solid var(--teal-600)'
                    : '3px solid transparent',
                  backgroundColor: isActive(item.href)
                    ? 'rgba(31,122,120,0.05)'
                    : 'transparent',
                }}
              >
                {isAr ? item.labelAr : item.labelEn}
              </Link>
            ))}
            <div style={{ padding: '12px 24px', borderTop: `1px solid var(--bone)` }}>
              <LanguageToggle locale={locale} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
