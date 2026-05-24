'use client';

import { useState, useEffect } from 'react';

const TABS = [
  { id: 'framework',    en: 'AWSP Framework',        ar: 'إطار AWSP' },
  { id: 'phases',       en: 'The 12 Phases',          ar: 'المراحل الـ ١٢' },
  { id: 'governance',   en: 'Governance & Taskforce', ar: 'الحوكمة وفريق العمل' },
  { id: 'stakeholders', en: 'Stakeholders',           ar: 'أصحاب المصلحة' },
];

export default function AboutSubNav({ locale }: { locale: string }) {
  const [active, setActive] = useState('framework');
  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && TABS.find(t => t.id === hash)) setActive(hash);
  }, []);

  const scrollTo = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 74 + 52;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    window.history.pushState(null, '', `#${id}`);
  };

  return (
    <nav style={{
      position: 'sticky', top: '74px', zIndex: 40,
      background: 'rgba(250,247,240,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--line)',
      boxShadow: '0 2px 8px rgba(14,42,71,0.06)',
    }}>
      <div className="wrap" style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => scrollTo(tab.id)}
            style={{
              padding: '16px 20px', fontSize: '14px', fontWeight: '500',
              fontFamily: ff, background: 'transparent', border: 'none',
              borderBottom: active === tab.id
                ? '2px solid var(--teal-500)' : '2px solid transparent',
              color: active === tab.id ? 'var(--teal-600)' : 'var(--gray-500)',
              cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'all 150ms ease',
            }}
          >
            {isAr ? tab.ar : tab.en}
          </button>
        ))}
      </div>
    </nav>
  );
}
