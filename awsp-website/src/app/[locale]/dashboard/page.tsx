'use client';
import { useState } from 'react';
import Link from 'next/link';
import DistrictMap from '@/components/Dashboard/DistrictMapDynamic';

const PHASES = [
  { n: 1,  status: 'completed', labelEn: 'Framework',      labelAr: 'الإطار' },
  { n: 2,  status: 'active',    labelEn: 'Survey Align',   labelAr: 'مواءمة' },
  { n: 3,  status: 'active',    labelEn: 'Survey Design',  labelAr: 'تصميم' },
  { n: 4,  status: 'planned',   labelEn: 'Survey ToRs',    labelAr: 'مرجعية' },
  { n: 5,  status: 'planned',   labelEn: 'Survey Impl',    labelAr: 'تنفيذ' },
  { n: 6,  status: 'planned',   labelEn: 'Options Align',  labelAr: 'مواءمة خيارات' },
  { n: 7,  status: 'planned',   labelEn: 'Options ToRs',   labelAr: 'مرجعية خيارات' },
  { n: 8,  status: 'planned',   labelEn: 'Options Study',  labelAr: 'دراسة خيارات' },
  { n: 9,  status: 'planned',   labelEn: 'Consultation',   labelAr: 'تشاور' },
  { n: 10, status: 'planned',   labelEn: 'Plan ToRs',      labelAr: 'مرجعية خطة' },
  { n: 11, status: 'planned',   labelEn: 'Plan Dev',       labelAr: 'تطوير خطة' },
  { n: 12, status: 'planned',   labelEn: 'Endorsement',    labelAr: 'إقرار' },
];

const DISTRICTS = [
  { en: 'Al-Mansoura',   ar: 'المنصورة',          count: 34, inv: '$9.4M', cx: 320, cy: 140, r: 20 },
  { en: 'Al-Buraiqeh',   ar: 'البريقة',            count: 33, inv: '$8.1M', cx: 415, cy: 235, r: 19 },
  { en: 'Sheikh Othman', ar: 'الشيخ عثمان',        count: 31, inv: '$7.8M', cx: 440, cy: 120, r: 19 },
  { en: 'Khormaksar',    ar: 'خورمكسر',            count: 28, inv: '$7.2M', cx: 195, cy: 125, r: 18 },
  { en: 'Crater',        ar: 'كريتر',              count: 21, inv: '$5.1M', cx: 140, cy: 185, r: 16 },
  { en: 'Al-Mualla',     ar: 'المعلا',             count: 19, inv: '$4.8M', cx: 285, cy: 225, r: 13 },
  { en: 'Dar Saad',      ar: 'دار سعد',            count: 15, inv: '$4.6M', cx: 525, cy: 92,  r: 14 },
  { en: 'Tawahi',        ar: 'التواهي',            count: 12, inv: '$3.6M', cx: 115, cy: 275, r: 14 },
];

const DONORS = [
  { name: 'ICRC',           val: '$14.8M', pct: 92, color: 'var(--teal-500)' },
  { name: 'UNICEF',         val: '$11.6M', pct: 72, color: 'var(--blue-500)' },
  { name: 'European Union', val: '$9.4M',  pct: 58, color: 'var(--sand-400)' },
  { name: 'World Bank',     val: '$7.8M',  pct: 48, color: 'var(--teal-500)' },
  { name: 'KfW',            val: '$6.8M',  pct: 42, color: 'var(--blue-500)' },
  { name: 'USAID',          val: '$5.2M',  pct: 32, color: 'var(--blue-400)' },
  { name: 'GIZ',            val: '$3.6M',  pct: 22, color: 'var(--teal-600)' },
];

const INDICATORS = [
  { label: 'Schedule',      labelAr: 'الجدول الزمني',  level: 'On track', levelAr: 'في الموعد',    status: 'good', note: '3 of 12 phases delivered or active on time.',          noteAr: '٣ من ١٢ مرحلة منجزة أو نشطة في الموعد المحدد.' },
  { label: 'Funding',       labelAr: 'التمويل',         level: 'Secured',  levelAr: 'مؤمّن',         status: 'good', note: 'Phase 2 & 3 funded · Phase 4 pipeline confirmed.',       noteAr: 'المرحلتان ٢ و٣ ممولتان · تأكد خط أنابيب المرحلة ٤.' },
  { label: 'Data quality',  labelAr: 'جودة البيانات',  level: 'Monitor',  levelAr: 'متابعة',         status: 'warn', note: 'Hydraulic baseline incomplete in 2 districts.',           noteAr: 'الأساس الهيدروليكي غير مكتمل في مديريتين.' },
  { label: 'Engagement',    labelAr: 'التفاعل',         level: 'Strong',   levelAr: 'قوي',            status: 'good', note: '40+ stakeholder partners actively coordinated.',         noteAr: 'أكثر من ٤٠ شريكاً من أصحاب المصلحة يُنسَّق معهم.' },
  { label: 'Risk register', labelAr: 'سجل المخاطر',    level: '2 open',   levelAr: 'مخاطر: ٢',      status: 'warn', note: 'Power supply continuity · procurement timeline.',        noteAr: 'استمرارية الطاقة · الجدول الزمني للمشتريات.' },
  { label: 'Climate',       labelAr: 'المناخ',          level: 'Stressed', levelAr: 'ضغط مرتفع',     status: 'risk', note: 'Aquifer depletion rate exceeds replenishment.',          noteAr: 'معدل استنزاف الخزان يتجاوز التغذية.' },
  { label: 'Governance',    labelAr: 'الحوكمة',         level: 'Active',   levelAr: 'نشط',            status: 'good', note: 'Taskforce meeting weekly · 15 members.',                noteAr: 'فريق العمل يجتمع أسبوعياً · ١٥ عضواً.' },
  { label: 'Transparency',  labelAr: 'الشفافية',        level: 'Public',   levelAr: 'عام',            status: 'good', note: 'All Phase 1–2 outputs published.',                      noteAr: 'جميع مخرجات المرحلتين ١–٢ منشورة.' },
];

const ACTIVITY = [
  { icon: '✓', iconType: 'gold',    titleEn: 'Phase 1 endorsed',         titleAr: 'اعتماد المرحلة الأولى',       descEn: 'AWSP Framework signed by MWE',                descAr: 'إطار AWSP موقّع من وزارة المياه والبيئة',         date: '22 Jun' },
  { icon: '⊞', iconType: 'default', titleEn: 'Alignment matrix released', titleAr: 'إطلاق مصفوفة المواءمة',      descEn: 'Phase 2 stakeholder review opened',          descAr: 'مراجعة أصحاب المصلحة للمرحلة ٢ مفتوحة',         date: '28 Apr' },
  { icon: '◎', iconType: 'blue',    titleEn: 'Workshop convened',         titleAr: 'انعقاد ورشة العمل',           descEn: '40+ partners in Aden · survey alignment',    descAr: 'أكثر من ٤٠ شريكاً في عدن · مواءمة المسوحات',    date: '12 May' },
  { icon: '+', iconType: 'default', titleEn: 'Taskforce expansion',       titleAr: 'توسيع فريق العمل',            descEn: '2 new technical officers from LWSCA',         descAr: 'ضابطان تقنيان جديدان من المؤسسة المحلية',        date: '15 Apr' },
];

const BUBBLES_COLOR: Record<string, string> = {
  'Al-Mansoura':   'var(--teal-500)',
  'Al-Buraiqeh':   'var(--teal-500)',
  'Sheikh Othman': 'var(--sand-400)',
  'Khormaksar':    'var(--sand-400)',
  'Crater':        'var(--teal-500)',
  'Al-Mualla':     'var(--blue-500)',
  'Dar Saad':      'var(--teal-500)',
  'Tawahi':        'var(--blue-500)',
};

export default function DashboardPage() {
  const [locale] = useState('en');
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [mapMetric, setMapMetric] = useState<'count' | 'investment' | 'sector'>('count');
  const [activeRange, setActiveRange] = useState<'3y' | '5y' | 'all'>('5y');
  const isAr = locale === 'ar';
  const ff    = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';
  const serif = isAr ? 'var(--font-arabic)' : 'var(--font-serif)';

  const indicatorColor = (s: string) =>
    ({ good: { dot: 'var(--teal-500)', text: 'var(--teal-700)', bg: 'rgba(42,138,138,0.08)' },
       warn: { dot: 'var(--sand-400)', text: '#B5710A',          bg: 'rgba(232,177,74,0.10)' },
       risk: { dot: '#C25A4E',         text: '#B23E33',           bg: 'rgba(194,90,78,0.08)' },
    }[s] || { dot: 'var(--gray-300)', text: 'var(--gray-500)', bg: 'var(--bone)' });

  const panelStyle: React.CSSProperties = {
    background: '#fff', border: '1px solid var(--line)',
    borderRadius: 'var(--radius-lg)', padding: '24px',
    position: 'relative', transition: 'border-color 200ms ease, box-shadow 200ms ease',
  };
  const headStyle: React.CSSProperties = {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'baseline', marginBottom: '16px',
  };
  const headH3: React.CSSProperties = {
    margin: 0, fontFamily: ff, fontSize: '13px', fontWeight: '600',
    letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-500)',
  };
  const moreLink: React.CSSProperties = {
    fontSize: '12px', color: 'var(--teal-600)', fontWeight: '600',
    letterSpacing: '0.04em', textDecoration: 'none', fontFamily: ff,
  };
  const tabsBg: React.CSSProperties = {
    display: 'flex', gap: '4px', background: 'var(--bone)',
    padding: '4px', borderRadius: 'var(--radius-pill)',
  };

  return (
    <>
      {/* ── HERO ── */}
      <section style={{
        background: 'var(--ink-900)', color: '#fff',
        padding: 'calc(74px + 36px) 0 32px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(circle at 90% 20%, rgba(63,168,154,0.2), transparent 50%),
                       radial-gradient(circle at 10% 90%, rgba(91,177,227,0.12), transparent 50%)`,
        }} />
        <div className="wrap" style={{
          position: 'relative', display: 'grid',
          gridTemplateColumns: '1fr auto', gap: '32px', alignItems: 'end',
        }}>
          <div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontSize: '12px', fontWeight: '600', letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--sand-400)', fontFamily: ff,
            }}>
              <span style={{ width: '24px', height: '1.5px', background: 'var(--sand-400)', display: 'inline-block' }} />
              {isAr ? 'لوحة التحكم' : 'Programme Dashboard'}
            </span>
            <h1 style={{
              fontFamily: serif, color: '#fff',
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', margin: '12px 0 0',
            }}>
              {isAr ? 'لقطة حية لخطة قطاع المياه في عدن' : 'Live snapshot of the Aden Water Sector Plan'}
            </h1>
            <div style={{
              color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginTop: '14px',
              display: 'flex', gap: '22px', flexWrap: 'wrap', alignItems: 'center', fontFamily: ff,
            }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontWeight: '600', color: 'var(--teal-300)', letterSpacing: '0.05em',
              }}>
                <span style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: 'var(--teal-300)', display: 'inline-block',
                  animation: 'dashPulse 1.6s ease-out infinite',
                }} />
                {isAr ? 'مباشر' : 'LIVE'}
              </span>
              <span>{isAr ? 'آخر تحديث: ٢٣ مايو ٢٠٢٦ · ١٤:٣٢' : 'Last updated 23 May 2026 · 14:32 AST'}</span>
              <span>{isAr ? 'المصدر: قاعدة بيانات AWSP v1.1' : 'Data source: AWSP Reference Database v1.1'}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 20px', fontSize: '14px', fontWeight: '600',
              background: 'transparent', color: '#fff',
              border: '1.5px solid rgba(255,255,255,0.4)',
              borderRadius: 'var(--radius)', cursor: 'pointer', fontFamily: ff,
            }}>
              {isAr ? 'تحديث' : 'Refresh'}
            </button>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 20px', fontSize: '14px', fontWeight: '600',
              background: 'rgba(255,255,255,0.95)', color: 'var(--ink-800)',
              border: '1.5px solid transparent',
              borderRadius: 'var(--radius)', cursor: 'pointer', fontFamily: ff,
            }}>
              {isAr ? 'تصدير' : 'Export'}
            </button>
          </div>
        </div>
      </section>

      {/* ── DASHBOARD SHELL ── */}
      <section style={{ background: 'var(--paper)', padding: '32px 0 96px', borderTop: '1px solid var(--line)' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* ── ROW 1: KPI tiles ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {[
              { labelEn: 'Projects Delivered',   labelAr: 'المشاريع المنجزة',      value: '193',   unit: '',  deltaEn: '+12 vs last quarter',  deltaAr: '+١٢ مقارنة بالربع الماضي', trend: 'up',   noteEn: 'Across 8 districts',               noteAr: 'عبر ٨ مديريات' },
              { labelEn: 'Total Investment',      labelAr: 'إجمالي الاستثمار',      value: '$51.9', unit: 'M', deltaEn: '+$4.2M YTD',            deltaAr: '+٤.٢ م. هذا العام',         trend: 'up',   noteEn: 'Aggregate · USD',                  noteAr: 'إجمالي بالدولار' },
              { labelEn: 'Active Donors',         labelAr: 'الجهات المانحة النشطة', value: '22',    unit: '',  deltaEn: '+2 this quarter',        deltaAr: '+٢ هذا الربع',              trend: 'up',   noteEn: 'Bilateral · multilateral · INGO',  noteAr: 'ثنائي · متعدد الأطراف · منظمات' },
              { labelEn: 'Phase Completion',      labelAr: 'اكتمال المراحل',         value: '28',    unit: '%', deltaEn: 'On schedule',             deltaAr: 'في الموعد المحدد',           trend: 'flat', noteEn: '3 of 12 phases done or active',    noteAr: '٣ من ١٢ مرحلة مكتملة أو نشطة' },
            ].map((tile, i) => (
              <div key={i} style={panelStyle}>
                <div style={{
                  fontSize: '12px', fontWeight: '600', letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: '14px', fontFamily: ff,
                }}>
                  {isAr ? tile.labelAr : tile.labelEn}
                </div>
                <div style={{
                  fontFamily: serif, fontSize: '44px', fontWeight: '400',
                  color: 'var(--ink-800)', lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em',
                }}>
                  {tile.value}
                  <span style={{ fontSize: '0.5em', color: 'var(--gray-500)', marginInlineStart: '4px' }}>{tile.unit}</span>
                </div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  fontSize: '12px', fontWeight: '600', marginTop: '8px',
                  color: tile.trend === 'up' ? 'var(--teal-600)' : 'var(--gray-500)', fontFamily: ff,
                }}>
                  {tile.trend === 'up' ? '↑' : '→'} {isAr ? tile.deltaAr : tile.deltaEn}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--gray-500)', marginTop: '6px', fontFamily: ff }}>
                  {isAr ? tile.noteAr : tile.noteEn}
                </div>
              </div>
            ))}
          </div>

          {/* ── ROW 2: Phase progress + Activity feed ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>

            {/* Phase progress panel */}
            <div style={panelStyle}>
              <div style={headStyle}>
                <h3 style={headH3}>{isAr ? 'خارطة طريق البرنامج — ١٢ مرحلة' : '12-Phase Programme Roadmap'}</h3>
                <Link href={`/${locale}/about#phases`} style={moreLink}>
                  {isAr ? 'عرض التفاصيل ←' : 'View detailed roadmap →'}
                </Link>
              </div>

              {/* Ring + text */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
                <svg width="100" height="100" viewBox="0 0 100 100" style={{ flexShrink: 0 }}>
                  <circle cx="50" cy="50" r="42" fill="none" stroke="var(--line)" strokeWidth="10"/>
                  <circle cx="50" cy="50" r="42" fill="none" stroke="var(--teal-500)" strokeWidth="10"
                    strokeDasharray="263.9" strokeDashoffset="190" strokeLinecap="round"
                    transform="rotate(-90 50 50)"/>
                  <text x="50" y="48" textAnchor="middle" fontFamily="Source Serif 4, serif" fontSize="22" fontWeight="500" fill="var(--ink-800)">28%</text>
                  <text x="50" y="64" textAnchor="middle" fontFamily="Source Sans 3, sans-serif" fontSize="9" letterSpacing="1" fill="var(--gray-500)">COMPLETE</text>
                </svg>
                <div>
                  <strong style={{ fontFamily: serif, fontSize: '22px', color: 'var(--ink-800)', display: 'block', lineHeight: 1 }}>
                    {isAr ? 'المرحلتان ٢ و٣ جاريتان' : 'Phases 2 & 3 in progress'}
                  </strong>
                  <div style={{ fontSize: '13px', color: 'var(--gray-500)', marginTop: '6px', fontFamily: ff }}>
                    {isAr
                      ? 'مواءمة المسوحات + الانتهاء من التصميم · يوليو ٢٠٢٥ — يناير ٢٠٢٦'
                      : 'Survey alignment + design finalisation · Jul 2025 — Jan 2026 window'}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--gray-500)', marginTop: '8px', fontFamily: ff }}>
                    <strong style={{ color: 'var(--teal-700)', fontFamily: ff }}>
                      {isAr ? 'المعلم القادم:' : 'Next milestone:'}
                    </strong>{' '}
                    {isAr ? 'الموافقة على تصميم المسح · يناير ٢٠٢٦' : 'Survey design sign-off · Jan 2026'}
                  </div>
                </div>
              </div>

              {/* Mini phases grid — 12 coloured bars */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4px' }}>
                {PHASES.map(p => (
                  <div key={p.n} style={{
                    height: '56px', borderRadius: '6px',
                    background: p.status === 'completed'
                      ? 'rgba(232,177,74,0.22)'
                      : p.status === 'active'
                      ? 'var(--teal-500)'
                      : 'var(--gray-100)',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'flex-end', padding: '6px 8px',
                    cursor: 'pointer', border: '1px solid transparent',
                    transition: 'transform 160ms ease',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}
                  >
                    <div style={{
                      fontFamily: serif, fontSize: '13px', lineHeight: 1,
                      color: p.status === 'active'
                        ? '#fff'
                        : p.status === 'completed'
                        ? '#8B5C20'
                        : 'var(--gray-500)',
                    }}>
                      {p.n}
                    </div>
                  </div>
                ))}
              </div>
              {/* Year labels */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', marginTop: '8px',
                fontSize: '11px', color: 'var(--gray-400)',
                fontVariantNumeric: 'tabular-nums', fontFamily: ff,
              }}>
                <span>Jul 2025</span><span>Jan 2027</span><span>Jan 2029</span>
              </div>
            </div>

            {/* Activity feed */}
            <div style={panelStyle}>
              <div style={headStyle}>
                <h3 style={headH3}>{isAr ? 'آخر النشاطات' : 'Recent Activity'}</h3>
                <Link href={`/${locale}/news`} style={moreLink}>
                  {isAr ? 'جميع التحديثات ←' : 'All updates →'}
                </Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {ACTIVITY.map((row, i) => {
                  const icBg    = row.iconType === 'gold'    ? 'rgba(232,177,74,0.18)'
                                : row.iconType === 'blue'    ? 'rgba(91,177,227,0.15)'
                                : 'var(--bone)';
                  const icColor = row.iconType === 'gold'    ? '#8B5C20'
                                : row.iconType === 'blue'    ? 'var(--blue-600)'
                                : 'var(--teal-600)';
                  return (
                    <div key={i} style={{
                      display: 'grid', gridTemplateColumns: '48px 1fr auto',
                      gap: '12px', padding: '14px 0',
                      borderBottom: i < ACTIVITY.length - 1 ? '1px solid var(--line)' : 'none',
                      alignItems: 'flex-start',
                    }}>
                      <span style={{
                        width: '32px', height: '32px', display: 'inline-flex',
                        alignItems: 'center', justifyContent: 'center',
                        borderRadius: '8px', background: icBg, color: icColor, fontSize: '14px',
                      }}>
                        {row.icon}
                      </span>
                      <div>
                        <h4 style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: '600', color: 'var(--ink-800)', fontFamily: ff }}>
                          {isAr ? row.titleAr : row.titleEn}
                        </h4>
                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--gray-500)', fontFamily: ff }}>
                          {isAr ? row.descAr : row.descEn}
                        </p>
                      </div>
                      <time style={{
                        fontSize: '12px', color: 'var(--gray-400)',
                        fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', fontFamily: ff,
                      }}>
                        {row.date}
                      </time>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── ROW 3: District SVG map + Donor bars ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '16px' }}>

            {/* Interactive SVG district map */}
            <div style={panelStyle}>
              <div style={headStyle}>
                <h3 style={headH3}>{isAr ? 'المشاريع حسب المديرية — محافظة عدن' : 'Projects by District — Aden Governorate'}</h3>
                <div style={tabsBg}>
                  {(['count', 'investment', 'sector'] as const).map(m => (
                    <button key={m} onClick={() => setMapMetric(m)} style={{
                      background: mapMetric === m ? '#fff' : 'transparent',
                      border: 0, cursor: 'pointer', padding: '6px 14px',
                      fontSize: '12px', fontWeight: '600',
                      color: mapMetric === m ? 'var(--ink-800)' : 'var(--gray-600)',
                      borderRadius: 'var(--radius-pill)', fontFamily: ff,
                      boxShadow: mapMetric === m ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                    }}>
                      {m === 'count' ? (isAr ? 'العدد' : 'Count')
                        : m === 'investment' ? (isAr ? 'الاستثمار' : 'Investment')
                        : (isAr ? 'القطاع' : 'Sector mix')}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <DistrictMap
                  hoveredDistrict={hoveredDistrict}
                  onHover={setHoveredDistrict}
                  metric={mapMetric}
                  locale={locale}
                />
                {/* Legend */}
                <div style={{
                  marginTop: '12px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  fontSize: '11px',
                  color: 'var(--gray-700)',
                  fontFamily: ff,
                }}>
                  <span style={{
                    fontWeight: '600',
                    color: 'var(--gray-500)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    flexShrink: 0,
                  }}>
                    {mapMetric === 'investment'
                      ? (isAr ? 'الحجم حسب الاستثمار · لون موحد' : 'Size by investment · unified colour')
                      : (isAr ? 'الحجم حسب عدد المشاريع' : 'Size by project count')}
                  </span>
                  {mapMetric !== 'investment' && (
                    <>
                      <span style={{ color: 'var(--line-2)' }}>·</span>
                      {[
                        { color: '#0D7A6E', size: 14, label: isAr ? 'أكثر من ٣٠' : '> 30 projects' },
                        { color: '#2A8A8A', size: 11, label: isAr ? '١٦–٣٠' : '16–30 projects' },
                        { color: '#6BC3B6', size: 9,  label: isAr ? 'أقل من ١٥' : 'Under 15 projects' },
                      ].map(s => (
                        <span key={s.label} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{
                            width: `${s.size}px`, height: `${s.size}px`,
                            borderRadius: '50%', background: s.color,
                            display: 'inline-block', flexShrink: 0,
                          }} />
                          {s.label}
                        </span>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Donor bar chart */}
            <div style={panelStyle}>
              <div style={headStyle}>
                <h3 style={headH3}>{isAr ? 'أبرز المانحين والشركاء' : 'Top Donors & Partners'}</h3>
                <Link href={`/${locale}/projects`} style={moreLink}>
                  {isAr ? 'جميع المانحين ←' : 'All donors →'}
                </Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {DONORS.map((d, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px 1fr 72px', gap: '14px', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: 'var(--ink-800)', fontWeight: '500', fontFamily: ff }}>{d.name}</span>
                    <div style={{ height: '8px', background: 'var(--bone)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${d.pct}%`, background: d.color,
                        borderRadius: '999px', transition: 'width 800ms cubic-bezier(0.2,0.8,0.2,1)',
                      }} />
                    </div>
                    <span style={{
                      textAlign: 'right', fontFamily: serif, fontSize: '14px',
                      color: 'var(--ink-800)', fontVariantNumeric: 'tabular-nums',
                    }}>{d.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── ROW 4: Investment trend + Health indicators ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '16px' }}>

            {/* Investment trend SVG area chart */}
            <div style={panelStyle}>
              <div style={headStyle}>
                <h3 style={headH3}>{isAr ? 'الاستثمار عبر الزمن' : 'Investment Over Time'}</h3>
                <div style={tabsBg}>
                  {(['3y', '5y', 'all'] as const).map(r => (
                    <button key={r} onClick={() => setActiveRange(r)} style={{
                      background: activeRange === r ? '#fff' : 'transparent',
                      border: 0, cursor: 'pointer', padding: '6px 14px',
                      fontSize: '12px', fontWeight: '600',
                      color: activeRange === r ? 'var(--ink-800)' : 'var(--gray-600)',
                      borderRadius: 'var(--radius-pill)', fontFamily: ff,
                      boxShadow: activeRange === r ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                    }}>
                      {r === '3y' ? '3Y' : r === '5y' ? '5Y' : isAr ? 'الكل' : 'All'}
                    </button>
                  ))}
                </div>
              </div>
              <svg viewBox="0 0 600 220" style={{ width: '100%', height: '220px' }}>
                <defs>
                  <linearGradient id="invFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="var(--teal-500)" stopOpacity="0.32"/>
                    <stop offset="1" stopColor="var(--teal-500)" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <g fontFamily="Source Sans 3, sans-serif" fontSize="10" fill="var(--gray-400)">
                  {[180, 140, 100, 60, 20].map((y, i) => (
                    <g key={y}>
                      <line x1="38" y1={y} x2="580" y2={y} stroke="var(--line)" strokeWidth="1"/>
                      <text x="32" y={y + 4} textAnchor="end">{['$0', '$15M', '$30M', '$45M', '$60M'][i]}</text>
                    </g>
                  ))}
                  <line x1="40" y1="20" x2="40" y2="180" stroke="var(--line-2)"/>
                  <line x1="40" y1="180" x2="580" y2="180" stroke="var(--line-2)"/>
                  <polygon points="60,170 150,150 240,130 330,90 420,55 510,40 580,30 580,180 60,180" fill="url(#invFill)"/>
                  <polyline points="60,170 150,150 240,130 330,90 420,55 510,40 580,30"
                    stroke="var(--teal-500)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  {([[60, 170], [150, 150], [240, 130], [330, 90], [420, 55], [510, 40]] as [number, number][]).map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r="3.5" fill="var(--teal-500)"/>
                  ))}
                  <circle cx="580" cy="30" r="4.5" fill="var(--teal-500)" stroke="#fff" strokeWidth="2"/>
                  {['2020', '2021', '2022', '2023', '2024', '2025', 'YTD'].map((lbl, i) => (
                    <text key={lbl} x={60 + i * ((580 - 60) / 6)} y="205" textAnchor="middle">{lbl}</text>
                  ))}
                  <line x1="580" y1="30" x2="580" y2="55" stroke="var(--teal-500)" strokeWidth="1" strokeDasharray="2 2"/>
                  <text x="572" y="22" textAnchor="end" fontFamily="Source Serif 4, serif" fontSize="11" fill="var(--ink-800)" fontWeight="500">$51.9M</text>
                </g>
              </svg>
            </div>

            {/* Health indicators — 8 in 2×4 grid */}
            <div style={panelStyle}>
              <div style={headStyle}>
                <h3 style={headH3}>{isAr ? 'مؤشرات صحة البرنامج' : 'Programme Health Indicators'}</h3>
                <Link href={`/${locale}/about#framework`} style={moreLink}>
                  {isAr ? 'الإطار ←' : 'Framework →'}
                </Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {INDICATORS.map((ind, i) => {
                  const c = indicatorColor(ind.status);
                  return (
                    <div key={i} style={{
                      padding: '14px 12px', background: c.bg,
                      borderRadius: '10px', border: '1px solid var(--line)',
                      display: 'flex', flexDirection: 'column', gap: '5px',
                    }}>
                      <div style={{
                        fontSize: '10px', fontWeight: '600', letterSpacing: '0.08em',
                        textTransform: 'uppercase', color: 'var(--gray-500)', fontFamily: ff,
                      }}>
                        {isAr ? ind.labelAr : ind.label}
                      </div>
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        fontWeight: '600', fontSize: '12px', color: c.text, fontFamily: ff,
                      }}>
                        <span style={{
                          width: '8px', height: '8px', borderRadius: '50%',
                          background: c.dot, display: 'inline-block', flexShrink: 0,
                        }} />
                        {isAr ? ind.levelAr : ind.level}
                      </div>
                      <p style={{ fontSize: '11px', color: 'var(--gray-600)', margin: 0, lineHeight: 1.4, fontFamily: ff }}>
                        {isAr ? ind.noteAr : ind.note}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── ROW 5: District table + Sector donut ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '16px' }}>

            {/* District breakdown table */}
            <div style={panelStyle}>
              <div style={headStyle}>
                <h3 style={headH3}>{isAr ? 'توزيع المديريات' : 'District Breakdown'}</h3>
                <Link href={`/${locale}/projects`} style={moreLink}>
                  {isAr ? 'فتح في المشاريع ←' : 'Open in projects →'}
                </Link>
              </div>
              <div style={{ fontSize: '13px' }}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 56px 80px', gap: '10px',
                  padding: '9px 0', borderBottom: '1px solid var(--line-2)',
                  fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'var(--gray-400)', fontFamily: ff,
                }}>
                  <span>{isAr ? 'المديرية' : 'District'}</span>
                  <span>{isAr ? 'المشاريع' : 'Projects'}</span>
                  <span style={{ textAlign: 'right' }}>{isAr ? 'الاستثمار' : 'Investment'}</span>
                </div>
                {DISTRICTS.map((d, i) => (
                  <div key={i}
                    style={{
                      display: 'grid', gridTemplateColumns: '1fr 56px 80px', gap: '10px',
                      padding: '9px 0',
                      borderBottom: i < DISTRICTS.length - 1 ? '1px solid var(--line)' : 'none',
                      alignItems: 'center',
                      background: hoveredDistrict === d.en ? 'var(--bone)' : 'transparent',
                      transition: 'background 160ms ease', cursor: 'default',
                    }}
                    onMouseEnter={() => setHoveredDistrict(d.en)}
                    onMouseLeave={() => setHoveredDistrict(null)}
                  >
                    <span style={{ color: 'var(--ink-800)', fontWeight: '500', fontFamily: ff }}>
                      {isAr ? d.ar : d.en}
                    </span>
                    <span style={{ color: 'var(--gray-500)', fontVariantNumeric: 'tabular-nums', fontFamily: ff }}>{d.count}</span>
                    <span style={{ textAlign: 'right', fontFamily: serif, color: 'var(--ink-800)', fontVariantNumeric: 'tabular-nums' }}>{d.inv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sector donut */}
            <div style={panelStyle}>
              <div style={headStyle}>
                <h3 style={headH3}>{isAr ? 'توزيع القطاعات' : 'Sector Mix'}</h3>
                <Link href={`/${locale}/projects`} style={moreLink}>
                  {isAr ? 'جميع المشاريع ←' : 'All projects →'}
                </Link>
              </div>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <svg width="160" height="160" viewBox="0 0 42 42" style={{ flexShrink: 0 }}>
                  <circle cx="21" cy="21" r="15.915" fill="#fff" stroke="var(--line)" strokeWidth="8"/>
                  <circle cx="21" cy="21" r="15.915" fill="none" stroke="var(--teal-500)" strokeWidth="8" strokeDasharray="43 57" strokeDashoffset="25"/>
                  <circle cx="21" cy="21" r="15.915" fill="none" stroke="var(--sand-400)" strokeWidth="8" strokeDasharray="30 70" strokeDashoffset="-18"/>
                  <circle cx="21" cy="21" r="15.915" fill="none" stroke="var(--blue-500)" strokeWidth="8" strokeDasharray="24 76" strokeDashoffset="-48"/>
                  <circle cx="21" cy="21" r="15.915" fill="none" stroke="var(--gray-300)" strokeWidth="8" strokeDasharray="3 97" strokeDashoffset="-72"/>
                  <text x="21" y="21" textAnchor="middle" fontFamily="Source Serif 4, serif" fontSize="6" fill="var(--ink-800)" fontWeight="500">193</text>
                  <text x="21" y="26" textAnchor="middle" fontFamily="Source Sans 3, sans-serif" fontSize="2.4" letterSpacing="0.3" fill="var(--gray-500)">PROJECTS</text>
                </svg>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { color: 'var(--teal-500)', labelEn: 'Water Supply',   labelAr: 'إمداد المياه',   pct: '43%' },
                    { color: 'var(--sand-400)', labelEn: 'Sanitation',     labelAr: 'الصرف الصحي',   pct: '30%' },
                    { color: 'var(--blue-500)', labelEn: 'Infrastructure', labelAr: 'البنية التحتية', pct: '24%' },
                    { color: 'var(--gray-300)', labelEn: 'Capacity',       labelAr: 'بناء القدرات',   pct: '3%' },
                  ].map(s => (
                    <div key={s.labelEn} style={{
                      display: 'flex', justifyContent: 'space-between',
                      fontSize: '13px', alignItems: 'center', fontFamily: ff,
                    }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          width: '10px', height: '10px', background: s.color,
                          borderRadius: '2px', display: 'inline-block', flexShrink: 0,
                        }} />
                        {isAr ? s.labelAr : s.labelEn}
                      </span>
                      <span style={{ fontFamily: serif, color: 'var(--ink-800)' }}>{s.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <style>{`
        @keyframes dashPulse {
          0%   { box-shadow: 0 0 0 0   rgba(107,195,182,0.6); }
          100% { box-shadow: 0 0 0 12px rgba(107,195,182,0);   }
        }
      `}</style>
    </>
  );
}
