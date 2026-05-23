'use client';

import { useRouter, usePathname } from 'next/navigation';

interface LanguageToggleProps {
  locale: string;
  onDark?: boolean;
  className?: string;
}

export default function LanguageToggle({
  locale,
  onDark = false,
  className = '',
}: LanguageToggleProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const next = locale === 'ar' ? 'en' : 'ar';
    const newPath = pathname.replace(`/${locale}`, `/${next}`);
    router.push(newPath);
  };

  const borderColor = onDark ? 'rgba(255,255,255,0.5)' : 'var(--ink-700)';
  const activeText = onDark ? 'var(--ink-900)' : 'white';
  const activeBg   = onDark ? 'white' : 'var(--ink-700)';
  const inactiveText = onDark ? 'rgba(255,255,255,0.8)' : 'var(--ink-700)';
  const inactiveBg   = 'transparent';

  return (
    <button
      onClick={switchLocale}
      aria-label={
        locale === 'ar'
          ? 'Switch site language to English'
          : 'تبديل لغة الموقع إلى العربية'
      }
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '9999px',
        border: `2px solid ${borderColor}`,
        overflow: 'hidden',
        fontSize: '13px',
        fontWeight: '600',
        cursor: 'pointer',
        userSelect: 'none',
        background: 'none',
        transition: 'border-color 200ms ease',
      }}
    >
      <span
        style={{
          padding: '4px 12px',
          backgroundColor: locale === 'ar' ? activeBg : inactiveBg,
          color:           locale === 'ar' ? activeText : inactiveText,
          transition: 'all 150ms ease',
        }}
      >
        AR
      </span>
      <span
        style={{
          padding: '4px 12px',
          backgroundColor: locale === 'en' ? activeBg : inactiveBg,
          color:           locale === 'en' ? activeText : inactiveText,
          transition: 'all 150ms ease',
        }}
      >
        EN
      </span>
    </button>
  );
}
