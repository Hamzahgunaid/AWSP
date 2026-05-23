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
  { labelAr: 'عن البرنامج',        labelEn: 'About the Programme', href: '/about' },
  { labelAr: 'مشاريعنا',           labelEn: 'Our Projects',        href: '/projects' },
  { labelAr: 'المنتجات المعرفية',  labelEn: 'Knowledge Products',  href: '/knowledge' },
  { labelAr: 'الأخبار والفعاليات', labelEn: 'News & Events',       href: '/news' },
  { labelAr: 'التواصل والمشاركة',  labelEn: 'Contact & Engage',    href: '/contact' },
];

interface SiteHeaderProps {
  locale: string;
}

export default function SiteHeader({ locale }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isAr = locale === 'ar';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => {
    const full = `/${locale}${href}`;
    if (href === '') {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(full);
  };

  const fontStyle = {
    fontFamily: isAr ? 'Cairo, sans-serif' : 'Source Sans 3, sans-serif',
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        insetInlineStart: 0,
        width: '100%',
        height: '64px',
        backgroundColor: 'white',
        boxShadow: scrolled ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
        zIndex: 50,
        transition: 'box-shadow 300ms ease',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
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
          aria-label="AWSP — Aden Water Sector Plan — Return to Home"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <img
            src="/images/awsp-logo-mark.svg"
            alt="AWSP — Aden Water Sector Plan"
            style={{ height: '48px', width: 'auto' }}
          />
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label={isAr ? 'القائمة الرئيسية' : 'Main navigation'}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          className="hidden md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              style={{
                ...fontStyle,
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                textDecoration: 'none',
                color: isActive(item.href) ? '#0D7A6E' : '#1A3557',
                borderBottom: isActive(item.href)
                  ? '2px solid #0D7A6E'
                  : '2px solid transparent',
                transition: 'color 150ms ease',
              }}
            >
              {isAr ? item.labelAr : item.labelEn}
            </Link>
          ))}
        </nav>

        {/* Right side: language toggle + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <LanguageToggle locale={locale} />

          <button
            className="md:hidden"
            style={{
              padding: '8px',
              borderRadius: '6px',
              border: 'none',
              background: 'none',
              color: '#1A3557',
              cursor: 'pointer',
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={
              mobileOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          style={{
            position: 'absolute',
            top: '64px',
            insetInlineStart: 0,
            width: '100%',
            backgroundColor: 'white',
            borderTop: '1px solid #F4F6F8',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
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
                  ...fontStyle,
                  display: 'block',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  color: isActive(item.href) ? '#0D7A6E' : '#1A3557',
                  borderInlineStart: isActive(item.href)
                    ? '3px solid #0D7A6E'
                    : '3px solid transparent',
                  backgroundColor: isActive(item.href)
                    ? 'rgba(13,122,110,0.05)'
                    : 'transparent',
                }}
              >
                {isAr ? item.labelAr : item.labelEn}
              </Link>
            ))}
            <div style={{ padding: '12px 24px', borderTop: '1px solid #F4F6F8' }}>
              <LanguageToggle locale={locale} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
