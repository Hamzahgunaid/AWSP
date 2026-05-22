'use client';

import { useRouter, usePathname } from 'next/navigation';

interface LanguageToggleProps {
  locale: string;
  className?: string;
}

export default function LanguageToggle({
  locale,
  className = '',
}: LanguageToggleProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const next = locale === 'ar' ? 'en' : 'ar';
    const newPath = pathname.replace(`/${locale}`, `/${next}`);
    router.push(newPath);
  };

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
        border: '2px solid #1A3557',
        overflow: 'hidden',
        fontSize: '13px',
        fontWeight: '600',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <span style={{
        padding: '4px 12px',
        backgroundColor: locale === 'ar' ? '#1A3557' : 'white',
        color: locale === 'ar' ? 'white' : '#1A3557',
        transition: 'all 150ms ease',
      }}>
        AR
      </span>
      <span style={{
        padding: '4px 12px',
        backgroundColor: locale === 'en' ? '#1A3557' : 'white',
        color: locale === 'en' ? 'white' : '#1A3557',
        transition: 'all 150ms ease',
      }}>
        EN
      </span>
    </button>
  );
}
