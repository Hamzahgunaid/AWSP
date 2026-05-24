'use client';

import partnersData from '@/data/partners.json';

const ROLE_COLORS = ['var(--teal-600)', 'var(--blue-600)', 'var(--sand-500)'];
const TOP_COLORS  = ['var(--teal-500)', 'var(--blue-500)', 'var(--sand-400)'];
const EXTERNAL_LINKS = [
  { en: 'Visit MWE',           ar: 'زيارة موقع الوزارة' },
  { en: 'Visit LWSCA',         ar: 'زيارة موقع المؤسسة' },
  { en: 'Meet the Taskforce',  ar: 'تعرف على فريق العمل' },
];

export default function PartnerCards({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';

  return (
    <section style={{ background: 'var(--bone)', padding: '96px 0' }}>
      <div className="wrap">
        <div className="section-head">
          <div className="heading">
            <span className="eyebrow" style={{ fontFamily: ff }}>
              {isAr ? 'قيادة البرنامج' : 'Programme Leadership'}
            </span>
            <h2 style={{ fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)', margin: '12px 0 8px' }}>
              {isAr ? 'شركاؤنا الأساسيون' : 'Our Primary Partners'}
            </h2>
            <p style={{ color: 'var(--gray-500)', maxWidth: '56ch', fontFamily: ff }}>
              {isAr
                ? 'يُقاد AWSP مشتركاً من وزارة المياه والبيئة والمؤسسة المحلية للمياه والصرف الصحي في عدن، بدعم من فريق عمل مشترك مخصص.'
                : 'The AWSP is jointly led by the Ministry of Water and Environment and the Local Water and Sanitation Corporation – Aden, supported by a dedicated joint Taskforce.'}
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {partnersData.map((p, i) => (
            <a
              key={p.id}
              href={p.href}
              target={p.href.startsWith('http') ? '_blank' : '_self'}
              rel="noreferrer"
              style={{
                display: 'block', background: '#fff', borderRadius: 'var(--radius-lg)',
                padding: '36px', position: 'relative', overflow: 'hidden',
                transition: 'all 220ms ease', border: '1px solid var(--line)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = '0 24px 50px -24px rgba(14,42,71,0.2)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Top colour stripe */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: TOP_COLORS[i] }} />

              {/* Logo */}
              <div style={{ width: '120px', height: '120px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', padding: '8px' }}>
                <img
                  src={p.logo_src.replace('.svg', '.png')}
                  alt={isAr ? p.name_ar : p.name_en}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onError={e => { (e.currentTarget as HTMLImageElement).src = p.logo_src; }}
                />
              </div>

              {/* Role */}
              <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.14em', textTransform: 'uppercase', color: ROLE_COLORS[i], marginBottom: '10px', fontFamily: ff }}>
                {isAr ? p.role_ar : p.role_en}
              </div>

              {/* Name */}
              <div style={{ fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)', fontSize: '1.15rem', fontWeight: '500', color: 'var(--ink-800)', marginBottom: '14px', lineHeight: 1.3 }}>
                {isAr ? p.name_ar : p.name_en}
              </div>

              {/* Description */}
              <p style={{ fontSize: '14px', color: 'var(--gray-700)', lineHeight: 1.55, marginBottom: '24px', fontFamily: ff }}>
                {isAr ? p.description_ar : p.description_en}
              </p>

              {/* External link */}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', color: 'var(--ink-800)', fontFamily: ff }}>
                {isAr ? EXTERNAL_LINKS[i]?.ar : EXTERNAL_LINKS[i]?.en}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  {p.href.startsWith('http')
                    ? <path d="M7 17L17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round"/>
                    : <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>}
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
