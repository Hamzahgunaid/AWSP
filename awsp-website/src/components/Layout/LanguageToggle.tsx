'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function LanguageToggle({ locale, onDark = false }: { locale: string; onDark?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const toggle = () => {
    const next = locale === 'ar' ? 'en' : 'ar';
    router.push(pathname.replace(`/${locale}`, `/${next}`));
  };
  return (
    <button
      onClick={toggle}
      aria-label={locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '8px 14px', fontSize: '13px', fontWeight: '600',
        letterSpacing: '0.06em', cursor: 'pointer', transition: 'all 160ms ease',
        color: onDark ? '#fff' : 'var(--ink-800)',
        border: `1px solid ${onDark ? 'rgba(255,255,255,0.3)' : 'var(--line-2)'}`,
        borderRadius: 'var(--radius-pill)', background: 'transparent',
        fontFamily: 'inherit',
      }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = onDark ? 'rgba(255,255,255,0.1)' : 'var(--bone)'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
    >
      <span style={{ color: locale === 'ar' ? (onDark ? 'var(--teal-300)' : 'var(--teal-600)') : 'inherit' }}>AR</span>
      <span style={{ opacity: 0.4 }}>|</span>
      <span style={{ color: locale === 'en' ? (onDark ? 'var(--teal-300)' : 'var(--teal-600)') : 'inherit' }}>EN</span>
    </button>
  );
}
