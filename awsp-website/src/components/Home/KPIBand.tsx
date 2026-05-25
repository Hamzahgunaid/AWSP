'use client';

import { useEffect, useRef, useState } from 'react';

const KPIS = [
  { target: 194, prefix: '',    suffix: '',   labelEn: 'Projects Delivered',    labelAr: 'مشروع منجز',       metaEn: 'All districts · live count',       metaAr: 'جميع المديريات · إحصاء حي' },
  { target: 51,  prefix: '>$', suffix: 'M',  labelEn: 'Total Investment (USD)', labelAr: 'إجمالي الاستثمار',  metaEn: 'Project database aggregate',        metaAr: 'إجمالي قاعدة المشاريع' },
  { target: 8,   prefix: '',    suffix: '',   labelEn: 'Districts Covered',      labelAr: 'مديريات مشمولة',   metaEn: 'Aden urban governorate',            metaAr: 'محافظة عدن الحضرية' },
  { target: 20,  prefix: '',    suffix: '+',  labelEn: 'Donors & Partners',      labelAr: 'شريك ومانح',        metaEn: 'Bilateral · multilateral · INGO',   metaAr: 'ثنائي · متعدد الأطراف · منظمات' },
  { target: 12,  prefix: '',    suffix: '',   labelEn: 'AWSP Planning Phases',   labelAr: 'مرحلة تخطيطية',    metaEn: 'Jul 2025 → Jan 2029',              metaAr: 'يوليو ٢٠٢٥ ← يناير ٢٠٢٩' },
];

function Counter({ target }: { target: number }) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started) setStarted(true); },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / 1400, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target]);

  return <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>{val}</span>;
}

export default function KPIBand({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';

  return (
    <section style={{
      background: 'var(--ink-800)', color: '#fff',
      padding: '70px 0', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--teal-400), var(--sand-400), transparent)',
        opacity: 0.5,
      }} />
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0 }}>
          {KPIS.map((k, i) => (
            <div key={i} style={{
              padding: '8px 24px',
              borderInlineEnd: i < 4 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.6rem, 4.5vw, 4rem)',
                fontWeight: '400', lineHeight: 1, color: '#fff',
                letterSpacing: '-0.02em',
                display: 'flex', alignItems: 'baseline', gap: '4px',
              }}>
                {k.prefix && <span style={{ fontSize: '0.55em', color: 'var(--sand-400)', fontWeight: '500' }}>{k.prefix}</span>}
                <Counter target={k.target} />
                {k.suffix && <span style={{ fontSize: '0.55em', color: 'var(--sand-400)', fontWeight: '500' }}>{k.suffix}</span>}
              </div>
              <div style={{ marginTop: '14px', fontSize: '13px', fontWeight: '500', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em', lineHeight: 1.4, fontFamily: ff }}>
                {isAr ? k.labelAr : k.labelEn}
              </div>
              <div style={{ marginTop: '6px', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: ff }}>
                {isAr ? k.metaAr : k.metaEn}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
