'use client';

import Link from 'next/link';

const TICKER = [
  { date: '12 May 2026', en: 'Survey alignment workshop convened with development partners in Aden.', ar: 'انعقدت ورشة مواءمة المسوحات مع شركاء التنمية في عدن.' },
  { date: '28 Apr 2026', en: 'Phase 2 Survey Alignment Matrix released for stakeholder review.',       ar: 'صدرت مصفوفة مواءمة مسوحات المرحلة الثانية للمراجعة.' },
  { date: '15 Apr 2026', en: 'AWSP Taskforce welcomes two new technical officers.',                    ar: 'رحّب فريق عمل AWSP بضابطَين تقنيَّين جديدَين.' },
];

const AT_A_GLANCE = [
  { num: '01', en: { strong: 'July 2025 — January 2029', body: 'Twelve sequenced planning phases.' }, ar: { strong: 'يوليو ٢٠٢٥ — يناير ٢٠٢٩', body: 'اثنتا عشرة مرحلة تخطيطية متسلسلة.' } },
  { num: '02', en: { strong: '8 urban districts', body: 'Across Aden governorate.' }, ar: { strong: '٨ مديريات حضرية', body: 'عبر محافظة عدن.' } },
  { num: '03', en: { strong: 'Four foundational surveys', body: 'Household, hydrogeological, GIS, and hydraulic infrastructure.' }, ar: { strong: 'أربعة مسوحات تأسيسية', body: 'أسر، جيولوجية مائية، GIS وهيدروليكية.' } },
  { num: '04', en: { strong: 'Locally led', body: 'MWE and LWSCA with ICRC technical support.' }, ar: { strong: 'قيادة محلية', body: 'وزارة المياه والمؤسسة المحلية بدعم ICRC.' } },
];

export default function HeroSection({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';
  const allTicker = [...TICKER, ...TICKER];

  return (
    <section style={{
      position: 'relative', minHeight: '92vh',
      background: 'var(--ink-900)', color: '#fff',
      display: 'flex', alignItems: 'stretch',
      overflow: 'hidden', marginTop: '-74px', paddingTop: '74px',
    }}>

      {/* Background photo + gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(180deg, rgba(10,31,56,0.65) 0%, rgba(10,31,56,0.78) 60%, rgba(10,31,56,0.94) 100%),
          linear-gradient(90deg, rgba(10,31,56,0.85) 0%, rgba(10,31,56,0.45) 50%, rgba(10,31,56,0.65) 100%),
          url('https://images.unsplash.com/photo-1583146193020-3b35cb04165f?w=2000&q=80&auto=format&fit=crop')
        `,
        backgroundSize: 'cover', backgroundPosition: 'center', filter: 'saturate(0.85)',
      }} />

      {/* Wave grain overlay */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'><g fill='none' stroke='%23ffffff' stroke-width='0.5' opacity='0.06'><path d='M0 400 Q 200 340 400 400 T 800 400 T 1200 400'/><path d='M0 460 Q 240 400 460 460 T 880 460 T 1240 460'/><path d='M0 340 Q 180 290 380 340 T 780 340 T 1200 340'/></g></svg>")`,
        backgroundSize: '100% 100%',
      }} />

      {/* Two-column content grid */}
      <div className="wrap" style={{
        position: 'relative', width: '100%',
        display: 'grid', gridTemplateColumns: '1.4fr 1fr',
        alignItems: 'end', padding: '80px 0 64px', gap: '48px',
      }}>

        {/* LEFT — headline */}
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '14px',
            fontSize: '12px', fontWeight: '600', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--sand-400)',
            marginBottom: '28px', fontFamily: ff,
          }}>
            <span style={{ width: '32px', height: '1.5px', background: 'var(--sand-400)', display: 'inline-block', flexShrink: 0 }} />
            {isAr ? 'وزارة المياه والبيئة' : 'Ministry of Water and Environment'}
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--sand-400)', flexShrink: 0 }} />
            {isAr ? 'المؤسسة المحلية — عدن' : 'LWSCA — Aden'}
          </div>

          <h1 style={{
            fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)',
            color: '#fff',
            fontSize: 'clamp(2.8rem, 6vw, 5.6rem)',
            lineHeight: 0.98, letterSpacing: '-0.025em',
            fontWeight: isAr ? '600' : '400',
            marginBottom: '32px',
          }}>
            {isAr ? 'خطة قطاع المياه في عدن' : <><span>Aden Water</span><br/><span>Sector Plan</span></>}
          </h1>

          <p style={{
            fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)',
            fontSize: 'clamp(1.15rem, 1.5vw, 1.4rem)',
            color: 'rgba(255,255,255,0.82)',
            maxWidth: '38ch', lineHeight: 1.45, marginBottom: '40px',
          }}>
            {isAr
              ? 'الانتقال من الاستجابة الإنسانية إلى نظام مياه وصرف صحي مستقر ومرن وتحت قيادة محلية في عدن.'
              : "Transitioning Aden's water and sanitation sector from emergency response to a stable, resilient, and locally governed system."}
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link href={`/${locale}/projects`} className="btn btn-light" style={{ fontFamily: ff }}>
              {isAr ? 'استكشاف المشاريع' : 'Explore Projects'}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="icon-dir" style={{ width: 16, height: 16 }}>
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a href="/docs/AWSP_Development_Framework.pdf" download
              className="btn btn-outline-light" style={{ fontFamily: ff }}>
              {isAr ? 'تحميل الإطار' : 'Download the Framework'}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16 }}>
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* RIGHT — At a glance sidebar */}
        <aside style={{
          borderInlineStart: '1px solid rgba(255,255,255,0.16)',
          paddingInlineStart: '36px', paddingBottom: '12px',
        }}>
          <div style={{
            fontSize: '11px', fontWeight: '600', letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
            marginBottom: '22px', fontFamily: ff,
          }}>
            {isAr ? 'لمحة سريعة' : 'At a glance'}
          </div>
          {AT_A_GLANCE.map(row => {
            const d = isAr ? row.ar : row.en;
            return (
              <div key={row.num} style={{
                display: 'flex', gap: '14px',
                padding: '16px 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-serif)', fontSize: '13px',
                  color: 'var(--sand-400)', letterSpacing: '0.05em',
                  flexShrink: 0, width: '32px',
                }}>
                  {row.num}
                </div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.4, fontFamily: ff }}>
                  <strong style={{ display: 'block', color: '#fff', fontWeight: '600', marginBottom: '2px' }}>
                    {d.strong}
                  </strong>
                  {d.body}
                </div>
              </div>
            );
          })}
        </aside>
      </div>

      {/* Scroll cue */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '52px', left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.5)',
        display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        fontFamily: ff,
      }}>
        <span>{isAr ? 'مرر' : 'Scroll'}</span>
        <span style={{
          width: '1px', height: '36px',
          background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.6), transparent)',
          animation: 'scrollLine 2s ease-in-out infinite',
        }} />
      </div>

      {/* News ticker */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
        borderTop: '1px solid rgba(255,255,255,0.12)',
        padding: '12px 0', fontSize: '13px',
        color: 'rgba(255,255,255,0.85)', overflow: 'hidden',
      }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <span style={{
            fontWeight: '700', fontSize: '11px', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--sand-400)',
            flexShrink: 0, paddingInlineEnd: '18px',
            borderInlineEnd: '1px solid rgba(255,255,255,0.2)',
            fontFamily: ff,
          }}>
            {isAr ? 'آخر الأخبار' : 'Latest'}
          </span>
          <div style={{
            display: 'flex', gap: '56px', whiteSpace: 'nowrap',
            animation: 'ticker 40s linear infinite',
            flexShrink: 0,
          }}>
            {allTicker.map((t, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: ff }}>
                <span style={{ color: 'var(--teal-300)', fontWeight: '600', fontSize: '12px', letterSpacing: '0.04em' }}>{t.date}</span>
                <span>{isAr ? t.ar : t.en}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0%  { transform: translateY(-12px); opacity: 0; }
          50% { opacity: 1; }
          100%{ transform: translateY(12px);  opacity: 0; }
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (max-width: 980px) {
          .hero-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
