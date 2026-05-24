'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageToggle from './LanguageToggle';

const NAV = [
  { ar: 'الرئيسية',          en: 'Home',      href: '' },
  { ar: 'عن البرنامج',        en: 'About',     href: '/about' },
  { ar: 'مشاريعنا',           en: 'Projects',  href: '/projects' },
  { ar: 'لوحة التحكم',        en: 'Dashboard', href: '/dashboard' },
  { ar: 'المنتجات المعرفية',  en: 'Knowledge', href: '/knowledge' },
  { ar: 'الأخبار',            en: 'News',      href: '/news' },
  { ar: 'التواصل',            en: 'Contact',   href: '/contact' },
];

export default function SiteHeader({ locale }: { locale: string }) {
  const [onDark, setOnDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  useEffect(() => {
    if (!isHome) { setOnDark(false); return; }
    const update = () => setOnDark(window.scrollY < window.innerHeight * 0.7);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [isHome]);

  const isActive = (href: string) => {
    const full = `/${locale}${href}`;
    return href === ''
      ? pathname === `/${locale}` || pathname === `/${locale}/`
      : pathname.startsWith(full);
  };

  const headerBg    = onDark ? 'rgba(10,31,56,0.6)' : 'rgba(250,247,240,0.92)';
  const headerBorder= onDark ? 'rgba(255,255,255,0.1)' : 'var(--line)';
  const linkColor   = onDark ? 'rgba(255,255,255,0.85)' : 'var(--gray-700)';
  const linkActive  = onDark ? '#fff' : 'var(--ink-800)';
  const activeLine  = onDark ? 'var(--sand-400)' : 'var(--teal-500)';
  const brandStrong = onDark ? '#fff' : 'var(--ink-800)';
  const brandSpan   = onDark ? 'rgba(255,255,255,0.6)' : 'var(--gray-500)';
  const hamColor    = onDark ? 'rgba(255,255,255,0.25)' : 'var(--line-2)';

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, insetInlineStart: 0,
        width: '100%', zIndex: 50,
        background: headerBg,
        backdropFilter: 'saturate(180%) blur(16px)',
        WebkitBackdropFilter: 'saturate(180%) blur(16px)',
        borderBottom: `1px solid ${headerBorder}`,
        transition: 'background 300ms ease, border-color 300ms ease',
      }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '74px', gap: '24px' }}>

          {/* Brand */}
          <Link href={`/${locale}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <img
              src="/images/awsp-logo-mark.png"
              alt="AWSP"
              width={44}
              height={44}
              style={{ width: '44px', height: '44px', objectFit: 'contain', flexShrink: 0 }}
            />
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <strong style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: '600', color: brandStrong, letterSpacing: '0.02em' }}>
                AWSP
              </strong>
              <span style={{ fontFamily: ff, fontSize: '11px', fontWeight: '500', letterSpacing: '0.16em', textTransform: 'uppercase', color: brandSpan }}>
                {isAr ? 'خطة قطاع المياه في عدن' : 'Aden · Water Sector Plan'}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {NAV.map(item => {
              const active = isActive(item.href);
              return (
                <Link key={item.href} href={`/${locale}${item.href}`} style={{
                  position: 'relative', padding: '22px 14px',
                  fontSize: '14px', fontWeight: '500', fontFamily: ff,
                  color: active ? linkActive : linkColor,
                  textDecoration: 'none', transition: 'color 160ms ease',
                }}>
                  {isAr ? item.ar : item.en}
                  {active && (
                    <span style={{
                      position: 'absolute', bottom: 0,
                      insetInlineStart: '14px', insetInlineEnd: '14px',
                      height: '2px', background: activeLine, borderRadius: '1px',
                    }} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: lang + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <LanguageToggle locale={locale} onDark={onDark} />
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              style={{
                width: '40px', height: '40px',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: 'transparent', border: `1px solid ${hamColor}`,
                borderRadius: '50%', cursor: 'pointer',
                color: onDark ? '#fff' : 'var(--ink-800)',
              }}
            >
              {mobileOpen
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 6 6 18M6 6l12 12" strokeLinecap="round"/></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}><path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round"/></svg>}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: '74px', insetInlineStart: 0,
          width: '100%', background: 'rgba(250,247,240,0.98)',
          backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--line)',
          zIndex: 49, padding: '12px 0 20px',
        }}>
          {NAV.map(item => (
            <Link key={item.href} href={`/${locale}${item.href}`}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block', padding: '14px 32px', fontFamily: ff,
                fontSize: '15px', fontWeight: '500', textDecoration: 'none',
                color: isActive(item.href) ? 'var(--ink-800)' : 'var(--gray-700)',
                borderInlineStart: isActive(item.href)
                  ? '3px solid var(--teal-500)' : '3px solid transparent',
              }}>
              {isAr ? item.ar : item.en}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
