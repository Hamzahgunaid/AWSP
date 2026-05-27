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
  const [onDark,     setOnDark]     = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile,   setIsMobile]   = useState(false);
  const pathname = usePathname();
  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 980);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isHome) { setOnDark(false); return; }
    const update = () => setOnDark(window.scrollY < window.innerHeight * 0.7);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [isHome]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) => {
    const full = `/${locale}${href}`;
    return href === ''
      ? pathname === `/${locale}` || pathname === `/${locale}/`
      : pathname.startsWith(full);
  };

  const headerBg    = onDark ? 'rgba(10,31,56,0.75)' : 'rgba(250,247,240,0.96)';
  const headerBorder= onDark ? 'rgba(255,255,255,0.1)' : 'var(--line)';
  const linkColor   = onDark ? 'rgba(255,255,255,0.85)' : 'var(--gray-700)';
  const linkActive  = onDark ? '#fff' : 'var(--ink-800)';
  const activeLine  = onDark ? 'var(--sand-400)' : 'var(--teal-500)';
  const brandStrong = onDark ? '#fff' : 'var(--ink-800)';
  const brandSpan   = onDark ? 'rgba(255,255,255,0.6)' : 'var(--gray-500)';
  const hamColor    = onDark ? 'rgba(255,255,255,0.25)' : 'var(--line-2)';
  const hamIconColor= onDark ? '#fff' : 'var(--ink-800)';

  return (
    <>
      <header style={{
        position: 'fixed', top: 0,
        insetInlineStart: 0,
        width: '100%', zIndex: 50,
        background: headerBg,
        backdropFilter: 'saturate(180%) blur(16px)',
        WebkitBackdropFilter: 'saturate(180%) blur(16px)',
        borderBottom: `1px solid ${headerBorder}`,
        transition: 'background 300ms ease, border-color 300ms ease',
      }}>
        <div className="wrap" style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          height: '74px', gap: '16px',
        }}>

          {/* Brand */}
          <Link href={`/${locale}`} style={{
            display: 'inline-flex', alignItems: 'center',
            gap: '10px', textDecoration: 'none', flexShrink: 0,
          }}>
            <img
              src="/images/awsp-logo-mark.png"
              alt="AWSP"
              width={40} height={40}
              style={{ width: '40px', height: '40px', objectFit: 'contain', flexShrink: 0 }}
            />
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <strong style={{
                fontFamily: 'var(--font-serif)', fontSize: '17px',
                fontWeight: '600', color: brandStrong, letterSpacing: '0.02em',
              }}>AWSP</strong>
              <span style={{
                fontFamily: ff, fontSize: '10px', fontWeight: '500',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: brandSpan,
                display: isMobile ? 'none' : 'block',
              }}>
                {isAr ? 'خطة قطاع المياه في عدن' : 'Aden · Water Sector Plan'}
              </span>
            </span>
          </Link>

          {/* Desktop nav — hidden on mobile */}
          {!isMobile && (
            <nav style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1, justifyContent: 'center' }}>
              {NAV.map(item => {
                const active = isActive(item.href);
                return (
                  <Link key={item.href} href={`/${locale}${item.href}`}
                    style={{
                      position: 'relative', padding: '22px 11px',
                      fontSize: '13.5px', fontWeight: '500', fontFamily: ff,
                      color: active ? linkActive : linkColor,
                      textDecoration: 'none', transition: 'color 160ms ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {isAr ? item.ar : item.en}
                    {active && (
                      <span style={{
                        position: 'absolute', bottom: 0,
                        insetInlineStart: '11px', insetInlineEnd: '11px',
                        height: '2px', background: activeLine, borderRadius: '1px',
                      }} />
                    )}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Right side: lang + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <LanguageToggle locale={locale} onDark={onDark} />
            {/* Hamburger — only on mobile */}
            {isMobile && (
              <button
                onClick={() => setMobileOpen(o => !o)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                style={{
                  width: '40px', height: '40px',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  background: 'transparent',
                  border: `1.5px solid ${hamColor}`,
                  borderRadius: '50%', cursor: 'pointer',
                  color: hamIconColor, flexShrink: 0,
                  transition: 'all 160ms ease',
                }}
              >
                {mobileOpen ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile drawer menu */}
      {isMobile && mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(10,31,56,0.5)',
              zIndex: 48,
              backdropFilter: 'blur(2px)',
            }}
          />
          {/* Drawer */}
          <div style={{
            position: 'fixed',
            top: '74px',
            insetInlineStart: 0,
            insetInlineEnd: 0,
            background: 'rgba(250,247,240,0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--line)',
            zIndex: 49,
            paddingBottom: '16px',
            boxShadow: '0 8px 32px rgba(10,31,56,0.12)',
          }}>
            {NAV.map((item, i) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '15px 24px',
                    fontFamily: ff,
                    fontSize: '16px',
                    fontWeight: active ? '600' : '500',
                    color: active ? 'var(--teal-600)' : 'var(--ink-800)',
                    textDecoration: 'none',
                    borderBottom: i < NAV.length - 1 ? '1px solid var(--line)' : 'none',
                    background: active ? 'rgba(42,138,138,0.06)' : 'transparent',
                    borderInlineStart: active
                      ? '3px solid var(--teal-500)'
                      : '3px solid transparent',
                    transition: 'background 150ms ease',
                  }}
                >
                  <span>{isAr ? item.ar : item.en}</span>
                  {active && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ opacity: 0.5 }}>
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </Link>
              );
            })}

            {/* Footer info in drawer */}
            <div style={{
              padding: '16px 24px 8px',
              fontSize: '12px', color: 'var(--gray-400)',
              fontFamily: ff, borderTop: '1px solid var(--line)',
              marginTop: '8px',
            }}>
              {isAr ? 'خطة قطاع المياه في عدن — ٢٠٢٥' : 'Aden Water Sector Plan — 2025'}
            </div>
          </div>
        </>
      )}
    </>
  );
}
