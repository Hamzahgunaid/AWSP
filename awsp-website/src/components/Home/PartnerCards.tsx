'use client';

import partnersData from '@/data/partners.json';

export default function PartnerCards({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const font = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';

  return (
    <section style={{ backgroundColor: 'var(--bone)', padding: '72px 24px' }}>
      <div style={{ maxWidth: 'var(--wrap-max)', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{
            fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)',
            fontWeight: '700',
            fontSize: 'clamp(22px, 3vw, 32px)',
            color: 'var(--ink-900)',
          }}>
            {isAr ? 'شركاؤنا الأساسيون' : 'Our Primary Partners'}
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {partnersData.map(partner => (
            <a
              key={partner.id}
              href={partner.href}
              target={partner.href.startsWith('http') ? '_blank' : '_self'}
              rel="noreferrer"
              style={{
                display: 'block',
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '32px 24px',
                textAlign: 'center',
                textDecoration: 'none',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                transition: 'all 300ms ease',
                border: '1px solid transparent',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--teal-500)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <img
                  src={partner.logo_src}
                  alt={isAr ? partner.name_ar : partner.name_en}
                  style={{ maxHeight: '80px', maxWidth: '160px', objectFit: 'contain' }}
                />
              </div>
              <h3 style={{ fontFamily: font, fontWeight: '700', fontSize: '15px', color: 'var(--ink-900)', marginBottom: '6px' }}>
                {isAr ? partner.name_ar : partner.name_en}
              </h3>
              <p style={{ fontFamily: font, fontSize: '12px', color: 'var(--teal-600)', fontWeight: '600', marginBottom: '12px' }}>
                {isAr ? partner.role_ar : partner.role_en}
              </p>
              <p style={{ fontFamily: font, fontSize: '13px', color: '#6B7280', lineHeight: '1.7' }}>
                {isAr ? partner.description_ar : partner.description_en}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
