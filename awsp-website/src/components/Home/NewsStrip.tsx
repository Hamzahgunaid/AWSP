'use client';

import Link from 'next/link';

const MOCK_NEWS = [
  {
    tag: { en: 'Milestone',        ar: 'معلم رئيسي' },
    title: { en: 'Phase 2 Survey Alignment Matrix released for stakeholder review', ar: 'إطلاق مصفوفة مواءمة مسوحات المرحلة الثانية للمراجعة' },
    meta: '28 April 2026 · 5 min read',
    featured: true,
    img: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200&q=80&auto=format&fit=crop',
  },
  {
    tag: { en: 'Programme Update', ar: 'تحديث البرنامج' },
    title: { en: 'Survey alignment workshop convened with development partners in Aden', ar: 'انعقاد ورشة مواءمة المسوحات مع شركاء التنمية في عدن' },
    meta: '12 May 2026',
    featured: false,
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1000&q=80&auto=format&fit=crop',
  },
  {
    tag: { en: 'Partner News',     ar: 'أخبار الشركاء' },
    title: { en: 'AWSP Taskforce welcomes two new technical officers from LWSCA', ar: 'فريق عمل AWSP يرحّب بضابطَين تقنيَّين جديدَين من المؤسسة المحلية' },
    meta: '15 April 2026',
    featured: false,
    img: 'https://images.unsplash.com/photo-1581094289810-adf5d25690e3?w=1000&q=80&auto=format&fit=crop',
  },
];

export default function NewsStrip({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';

  return (
    <>
      {/* News section */}
      <section style={{ background: 'var(--paper)' }}>
        <div className="wrap">
          <div className="section-head">
            <div className="heading">
              <span className="eyebrow" style={{ fontFamily: ff }}>
                {isAr ? 'آخر ما في البرنامج' : 'Latest from the Programme'}
              </span>
              <h2 style={{ fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)', margin: '12px 0 0' }}>
                {isAr ? 'الأخبار والفعاليات' : 'News & events'}
              </h2>
            </div>
            <Link href={`/${locale}/news`} className="btn btn-ghost" style={{ fontFamily: ff, flexShrink: 0 }}>
              {isAr ? 'عرض جميع الأخبار والفعاليات' : 'View all news & events'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="icon-dir">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: '24px' }}>
            {MOCK_NEWS.map((item, i) => (
              <article key={i} style={{
                background: '#fff', borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--line)', overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
                transition: 'all 220ms ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-3px)';
                el.style.boxShadow = '0 18px 40px -22px rgba(14,42,71,0.18)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
              >
                <div style={{
                  aspectRatio: item.featured ? '4/3' : '16/9',
                  backgroundImage: `linear-gradient(180deg, rgba(14,42,71,0.2), rgba(14,42,71,0.6)), url('${item.img}')`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                }} />
                <div style={{ padding: '24px 28px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    fontSize: '11px', fontWeight: '600', letterSpacing: '0.12em',
                    textTransform: 'uppercase', color: 'var(--teal-600)',
                    marginBottom: '12px', fontFamily: ff,
                  }}>
                    <span style={{ width: '6px', height: '6px', background: 'currentColor', borderRadius: '50%' }} />
                    {isAr ? item.tag.ar : item.tag.en}
                  </span>
                  <h3 style={{
                    fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)',
                    fontSize: item.featured ? '1.45rem' : '1.2rem',
                    lineHeight: 1.25, marginBottom: '12px', flex: 1,
                    color: 'var(--ink-800)',
                  }}>
                    {isAr ? item.title.ar : item.title.en}
                  </h3>
                  <div style={{ fontSize: '13px', color: 'var(--gray-500)', fontVariantNumeric: 'tabular-nums', fontFamily: ff }}>
                    {item.meta}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section style={{
        background: 'radial-gradient(circle at 80% 50%, rgba(63,168,154,0.2), transparent 60%), linear-gradient(135deg, var(--ink-900), var(--ink-700))',
        color: '#fff', padding: '80px 0', position: 'relative', overflow: 'hidden',
      }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '48px', alignItems: 'center' }}>
          <div>
            <span className="eyebrow" style={{ color: 'var(--sand-400)', fontFamily: ff }}>
              {isAr ? 'تواصل مع البرنامج' : 'Engage with the programme'}
            </span>
            <h2 style={{
              fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)',
              color: '#fff', maxWidth: '24ch', marginTop: '14px',
            }}>
              {isAr
                ? 'المانحون، الشركاء، الباحثون — تواصلوا معنا.'
                : 'Donors, partners, researchers — get in touch.'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '50ch', fontFamily: ff }}>
              {isAr
                ? 'فريق عمل AWSP يرحّب باستفسارات جميع أصحاب المصلحة. سيرد ممثل خلال خمسة أيام عمل.'
                : 'The AWSP Taskforce welcomes enquiries from all stakeholders. A representative will respond within five working days.'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href={`/${locale}/contact`} className="btn btn-light" style={{ fontFamily: ff }}>
              {isAr ? 'التواصل مع فريق العمل' : 'Contact the Taskforce'}
            </Link>
            <Link href={`/${locale}/about`} className="btn btn-outline-light" style={{ fontFamily: ff }}>
              {isAr ? 'قراءة الإطار' : 'Read the framework'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
