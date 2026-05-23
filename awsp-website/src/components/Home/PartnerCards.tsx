'use client';

import partnersData from '@/data/partners.json';

export default function PartnerCards({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const font = isAr ? 'Cairo, sans-serif' : 'Source Sans 3, sans-serif';

  return (
    <section style={{ backgroundColor: '#F4F6F8', padding: '64px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <h2 style={{
          textAlign: 'center',
          fontFamily: isAr ? 'Cairo, sans-serif' : 'Source Serif 4, serif',
          fontWeight: '700',
          fontSize: 'clamp(22px, 3vw, 32px)',
          color: '#1A3557',
          marginBottom: '40px',
        }}>
          {isAr ? 'شركاؤنا الأساسيون' : 'Our Primary Partners'}
        </h2>

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
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                transition: 'all 300ms ease',
                border: '1px solid transparent',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.14)';
                (e.currentTarget as HTMLElement).style.borderColor = '#0D7A6E';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
                (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              {/* Logo */}
              <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <img
                  src={partner.logo_src}
                  alt={isAr ? partner.name_ar : partner.name_en}
                  style={{ maxHeight: '80px', maxWidth: '160px', objectFit: 'contain' }}
                />
              </div>
              {/* Name */}
              <h3 style={{
                fontFamily: font, fontWeight: '700',
                fontSize: '15px', color: '#1A3557',
                marginBottom: '6px',
              }}>
                {isAr ? partner.name_ar : partner.name_en}
              </h3>
              {/* Role */}
              <p style={{
                fontFamily: font, fontSize: '12px',
                color: '#0D7A6E', fontWeight: '600',
                marginBottom: '12px',
              }}>
                {isAr ? partner.role_ar : partner.role_en}
              </p>
              {/* Description */}
              <p style={{
                fontFamily: font, fontSize: '13px',
                color: '#6B7280', lineHeight: '1.7',
              }}>
                {isAr ? partner.description_ar : partner.description_en}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
