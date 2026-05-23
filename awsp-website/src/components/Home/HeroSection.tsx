import Link from 'next/link';

interface HeroSectionProps {
  locale: string;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const isAr = locale === 'ar';
  const fontHeading = isAr ? 'Cairo, sans-serif' : '"Source Serif 4", serif';
  const fontBody = isAr ? 'Cairo, sans-serif' : '"Source Sans 3", sans-serif';

  return (
    <section
      style={{
        background: 'linear-gradient(150deg, #1A3557 0%, #0F2340 60%, #0D2236 100%)',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative teal circle */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-120px',
          insetInlineEnd: '-80px',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13,122,110,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      {/* Decorative gold circle */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-60px',
          insetInlineStart: '-60px',
          width: '360px',
          height: '360px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,146,42,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '80px 24px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: '40px' }}>
          <img
            src="/images/awsp-logo.svg"
            alt="AWSP — Aden Water Sector Plan"
            style={{
              height: '90px',
              width: 'auto',
              filter: 'brightness(0) invert(1)',
            }}
          />
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: '56px',
            height: '3px',
            backgroundColor: '#C8922A',
            borderRadius: '2px',
            marginBottom: '32px',
          }}
        />

        {/* Headline */}
        <h1
          style={{
            fontFamily: fontHeading,
            color: 'white',
            fontSize: 'clamp(30px, 4.5vw, 52px)',
            fontWeight: '700',
            lineHeight: '1.2',
            maxWidth: '680px',
            marginBottom: '24px',
          }}
        >
          {isAr ? 'خطة قطاع المياه في عدن' : 'Aden Water Sector Plan'}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: fontBody,
            color: 'rgba(255,255,255,0.78)',
            fontSize: '18px',
            lineHeight: '1.75',
            maxWidth: '560px',
            marginBottom: '48px',
          }}
        >
          {isAr
            ? 'الانتقال من الاستجابة الإنسانية إلى نظام مياه وصرف صحي مستقر ومرن وتحت قيادة محلية.'
            : "Transitioning Aden's water and sanitation sector from emergency response to a stable, resilient, and locally governed system."}
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Link
            href={`/${locale}/projects`}
            style={{
              fontFamily: fontBody,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              backgroundColor: '#0D7A6E',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              border: '2px solid #0D7A6E',
              transition: 'background-color 150ms ease',
            }}
          >
            {isAr ? 'استكشاف المشاريع' : 'Explore Projects'}
          </Link>

          <a
            href="/docs/AWSP_Development_Framework.pdf"
            download
            style={{
              fontFamily: fontBody,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              backgroundColor: 'transparent',
              color: '#C8922A',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              border: '2px solid #C8922A',
              transition: 'all 150ms ease',
            }}
          >
            {isAr ? 'تحميل الإطار' : 'Download the Framework'}
          </a>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            marginTop: '64px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            opacity: 0.45,
          }}
        >
          <div
            style={{
              width: '1px',
              height: '48px',
              backgroundColor: 'white',
            }}
          />
        </div>
      </div>

      {/* Bottom gold accent bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #C8922A 0%, #E8B84B 50%, #C8922A 100%)',
        }}
      />
    </section>
  );
}
