'use client';

import Link from 'next/link';

interface Card {
  icon: string;
  titleAr: string;
  titleEn: string;
  bodyAr: string;
  bodyEn: string;
  href: string;
}

const CARDS: Card[] = [
  {
    icon: '🗺️',
    titleAr: 'مشاريعنا',
    titleEn: 'Our Projects',
    bodyAr: '١٩٤ مشروعاً للبنية التحتية تم تنفيذها عبر المديريات الثماني لمدينة عدن. تصفح حسب الموقع أو نوع التدخل أو الجهة المانحة أو القطاع.',
    bodyEn: "194 infrastructure projects delivered across Aden's eight urban districts. Browse by location, intervention type, donor, or sector.",
    href: '/projects',
  },
  {
    icon: '📚',
    titleAr: 'المنتجات المعرفية',
    titleEn: 'Knowledge Products',
    bodyAr: 'الدراسات التشخيصية وأطر التخطيط والمبادئ التوجيهية التقنية وموارد البيانات الداعمة لعملية تخطيط AWSP.',
    bodyEn: 'Diagnostic studies, planning frameworks, technical guidelines, and data resources supporting the AWSP planning process.',
    href: '/knowledge',
  },
  {
    icon: '📰',
    titleAr: 'الأخبار والفعاليات',
    titleEn: 'News & Events',
    bodyAr: 'أحدث تحديثات البرنامج ومعالم المراحل وفعاليات أصحاب المصلحة والموارد الإعلامية من فريق عمل AWSP.',
    bodyEn: 'Latest programme updates, phase milestones, stakeholder events, and media resources from the AWSP Taskforce.',
    href: '/news',
  },
];

export default function SnapshotCards({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const font = isAr ? 'Cairo, sans-serif' : 'Source Sans 3, sans-serif';

  return (
    <section style={{ backgroundColor: 'white', padding: '64px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {CARDS.map(card => (
            <Link
              key={card.href}
              href={`/${locale}${card.href}`}
              style={{
                display: 'block',
                backgroundColor: '#F4F6F8',
                borderRadius: '12px',
                padding: '32px 24px',
                textDecoration: 'none',
                borderTop: '3px solid transparent',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                transition: 'all 300ms ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderTopColor = '#0D7A6E';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderTopColor = 'transparent';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>{card.icon}</div>
              <h3 style={{
                fontFamily: font, fontWeight: '700',
                fontSize: '18px', color: '#1A3557',
                marginBottom: '12px',
              }}>
                {isAr ? card.titleAr : card.titleEn}
              </h3>
              <p style={{
                fontFamily: font, fontSize: '14px',
                color: '#6B7280', lineHeight: '1.8',
              }}>
                {isAr ? card.bodyAr : card.bodyEn}
              </p>
              <div style={{
                marginTop: '20px',
                fontFamily: font, fontSize: '13px',
                color: '#0D7A6E', fontWeight: '600',
              }}>
                {isAr ? '← اقرأ المزيد' : 'Learn more →'}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
