'use client';

import { useEffect, useRef, useState } from 'react';

interface KPI {
  numericValue: number;
  prefix: string;
  suffix: string;
  labelAr: string;
  labelEn: string;
}

const KPIS: KPI[] = [
  { numericValue: 194, prefix: '',  suffix: '+',  labelAr: 'مشروع منجز',       labelEn: 'Projects Delivered' },
  { numericValue: 51,  prefix: '$', suffix: 'M+', labelAr: 'إجمالي الاستثمار', labelEn: 'Total Investment (USD)' },
  { numericValue: 8,   prefix: '',  suffix: '',   labelAr: 'مديريات مشمولة',   labelEn: 'Districts Covered' },
  { numericValue: 20,  prefix: '',  suffix: '+',  labelAr: 'شريك ومانح',       labelEn: 'Donors & Partners' },
  { numericValue: 12,  prefix: '',  suffix: '',   labelAr: 'مرحلة تخطيطية',    labelEn: 'Planning Phases' },
];

function AnimatedCounter({ target, prefix, suffix, duration = 1500 }: {
  target: number; prefix: string; suffix: string; duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export default function KPIBand({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const font = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';

  return (
    <section style={{ backgroundColor: 'var(--ink-900)', padding: '52px 24px' }}>
      <div style={{
        maxWidth: 'var(--wrap-max)',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '32px',
      }}>
        {KPIS.map((kpi, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{
              width: '36px', height: '3px',
              backgroundColor: 'var(--sand-500)',
              margin: '0 auto 16px',
              borderRadius: '2px',
            }} />
            <div style={{
              fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)',
              fontWeight: '700',
              fontSize: 'clamp(36px, 4vw, 52px)',
              color: 'white',
              lineHeight: '1',
              marginBottom: '10px',
            }}>
              <AnimatedCounter
                target={kpi.numericValue}
                prefix={kpi.prefix}
                suffix={kpi.suffix}
              />
            </div>
            <p style={{
              fontFamily: font,
              fontSize: '13px',
              color: 'rgba(255,255,255,0.55)',
              fontWeight: '500',
              letterSpacing: '0.3px',
              margin: 0,
            }}>
              {isAr ? kpi.labelAr : kpi.labelEn}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
