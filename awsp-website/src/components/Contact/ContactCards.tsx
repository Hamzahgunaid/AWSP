export default function ContactCards({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';
  const serif = isAr ? 'var(--font-arabic)' : 'var(--font-serif)';

  const cards = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 28, height: 28 }}>
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      titleEn: 'AWSP Taskforce',
      titleAr: 'فريق عمل AWSP',
      roleEn: 'Programme Administration & Coordination',
      roleAr: 'إدارة البرنامج والتنسيق',
      lines: [
        { labelEn: 'Email', labelAr: 'البريد الإلكتروني', value: 'taskforce@awsp.gov.ye', href: 'mailto:taskforce@awsp.gov.ye' },
        { labelEn: 'Address', labelAr: 'العنوان', value: isAr ? 'وزارة المياه والبيئة، عدن، الجمهورية اليمنية' : 'Ministry of Water and Environment, Aden, Republic of Yemen', href: null },
      ],
      accentColor: 'var(--teal-500)',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 28, height: 28 }}>
          <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      titleEn: 'Ministry of Water and Environment',
      titleAr: 'وزارة المياه والبيئة',
      roleEn: 'Lead Agency — AWSP',
      roleAr: 'الجهة القائدة — AWSP',
      lines: [
        { labelEn: 'Website', labelAr: 'الموقع الرسمي', value: 'mwe-ye.org', href: 'https://mwe-ye.org/' },
        { labelEn: 'Address', labelAr: 'العنوان', value: isAr ? 'صنعاء، الجمهورية اليمنية' : 'Sana\'a, Republic of Yemen', href: null },
      ],
      accentColor: 'var(--blue-500)',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 28, height: 28 }}>
          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      titleEn: 'Local Water & Sanitation Corporation – Aden',
      titleAr: 'المؤسسة المحلية للمياه والصرف الصحي – عدن',
      roleEn: 'Principal Service Provider',
      roleAr: 'مزود الخدمة الرئيسي',
      lines: [
        { labelEn: 'Location', labelAr: 'الموقع', value: isAr ? 'عدن، الجمهورية اليمنية' : 'Aden, Republic of Yemen', href: null },
        { labelEn: 'Role', labelAr: 'الدور', value: isAr ? 'تشغيل وصيانة البنية التحتية لمياه عدن' : 'Operations and infrastructure maintenance for Aden water services', href: null },
      ],
      accentColor: 'var(--sand-400)',
    },
  ];

  return (
    <section style={{ background: 'var(--bone)', padding: '64px 0' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {cards.map((card, i) => (
            <div key={i} style={{
              background: '#fff', border: '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)', padding: '28px',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: card.accentColor }} />
              <div style={{
                width: '52px', height: '52px',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '12px', background: 'var(--bone)',
                color: card.accentColor, marginBottom: '18px',
              }}>
                {card.icon}
              </div>
              <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '6px', fontFamily: ff }}>
                {isAr ? card.roleAr : card.roleEn}
              </div>
              <h3 style={{ fontFamily: serif, fontSize: '1.05rem', marginBottom: '20px', color: 'var(--ink-800)', lineHeight: 1.3 }}>
                {isAr ? card.titleAr : card.titleEn}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {card.lines.map((line, j) => (
                  <div key={j} style={{ fontSize: '13px', fontFamily: ff }}>
                    <span style={{ color: 'var(--gray-400)', fontWeight: '600', display: 'block', fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '3px' }}>
                      {isAr ? line.labelAr : line.labelEn}
                    </span>
                    {line.href ? (
                      <a href={line.href} target="_blank" rel="noreferrer" style={{ color: 'var(--teal-600)', fontWeight: '500', textDecoration: 'none' }}>
                        {line.value}
                      </a>
                    ) : (
                      <span style={{ color: 'var(--gray-700)' }}>{line.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
