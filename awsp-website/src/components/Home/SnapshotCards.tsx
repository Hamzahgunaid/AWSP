'use client';

import Link from 'next/link';

const SNAPSHOTS = [
  {
    href: '/projects',
    icon: <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}><path d="M4 8 L12 5 L20 8 L28 5 L28 24 L20 27 L12 24 L4 27 Z"/><path d="M12 5 L12 24 M20 8 L20 27"/><circle cx="22" cy="14" r="3.2"/><path d="M22 17.2 L22 21"/></svg>,
    en: { title: 'Our Projects',       body: "194 infrastructure projects delivered across Aden's eight urban districts. Browse by location, intervention type, donor, or sector.", link: 'View project database' },
    ar: { title: 'مشاريعنا',            body: '١٩٤ مشروعاً للبنية التحتية تم تنفيذها عبر المديريات الثماني لمدينة عدن. تصفح حسب الموقع أو نوع التدخل أو الجهة المانحة أو القطاع.', link: 'عرض قاعدة المشاريع' },
  },
  {
    href: '/knowledge',
    icon: <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}><path d="M9 8 L9 27 L23 27 L23 13 L18 8 Z"/><path d="M18 8 L18 13 L23 13"/><path d="M12 17 L20 17 M12 21 L20 21 M12 24 L17 24"/></svg>,
    en: { title: 'Knowledge Products', body: 'Diagnostic studies, planning frameworks, technical guidelines, and data resources supporting the AWSP planning process.', link: 'Browse the library' },
    ar: { title: 'المنتجات المعرفية',   body: 'الدراسات التشخيصية وأطر التخطيط والمبادئ التوجيهية التقنية وموارد البيانات الداعمة لعملية تخطيط AWSP.', link: 'تصفح المكتبة' },
  },
  {
    href: '/news',
    icon: <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}><path d="M5 13 L5 19 L11 19 L21 25 L21 7 L11 13 Z"/><path d="M21 11 C 24 12, 24 20, 21 21"/><path d="M9 19 L9 25 L13 25 L13 22"/></svg>,
    en: { title: 'News & Events',      body: 'Latest programme updates, phase milestones, stakeholder events, and media resources from the AWSP Taskforce.', link: 'Latest updates' },
    ar: { title: 'الأخبار والفعاليات', body: 'أحدث تحديثات البرنامج ومعالم المراحل وفعاليات أصحاب المصلحة والموارد الإعلامية من فريق عمل AWSP.', link: 'آخر التحديثات' },
  },
];

export default function SnapshotCards({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';

  return (
    <section style={{ background: 'var(--paper)' }}>
      <div className="wrap">
        <div className="section-head">
          <div className="heading">
            <span className="eyebrow" style={{ fontFamily: ff }}>
              {isAr ? 'لقطات البرنامج' : 'Programme Snapshots'}
            </span>
            <h2 style={{ fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)', margin: '12px 0 8px' }}>
              {isAr ? 'استكشف العمل' : 'Explore the work'}
            </h2>
            <p style={{ color: 'var(--gray-500)', maxWidth: '56ch', fontFamily: ff }}>
              {isAr
                ? 'من قاعدة بيانات المشاريع الحية إلى مكتبة المعرفة وتحديثات البرنامج الجارية — ثلاثة مداخل إلى AWSP.'
                : 'From the live project database to the knowledge library and ongoing programme updates — three ways into the AWSP.'}
            </p>
          </div>
        </div>
        <div className="snapshots-three-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {SNAPSHOTS.map(snap => {
            const d = isAr ? snap.ar : snap.en;
            return (
              <Link key={snap.href} href={`/${locale}${snap.href}`}
                style={{
                  display: 'flex', flexDirection: 'column',
                  background: '#fff', border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-lg)', padding: '36px',
                  textDecoration: 'none', transition: 'all 220ms ease',
                  minHeight: '320px',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(-3px)';
                  el.style.borderColor = 'var(--teal-500)';
                  el.style.boxShadow = '0 18px 40px -22px rgba(14,42,71,0.2)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(0)';
                  el.style.borderColor = 'var(--line)';
                  el.style.boxShadow = 'none';
                }}
              >
                <span style={{ width: '56px', height: '56px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '14px', background: 'var(--bone)', color: 'var(--teal-600)', marginBottom: '24px' }}>
                  {snap.icon}
                </span>
                <h3 style={{ fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)', marginBottom: '12px', color: 'var(--ink-800)' }}>
                  {d.title}
                </h3>
                <p style={{ color: 'var(--gray-700)', fontSize: '15px', flex: 1, marginBottom: '20px', fontFamily: ff }}>
                  {d.body}
                </p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--ink-800)', fontFamily: ff }}>
                  {d.link}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="icon-dir">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
