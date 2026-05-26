'use client';

import { use, useState } from 'react';
import documentsData from '@/data/documents.json';

const DOC_TYPES = [
  { id: 'framework',     en: 'Framework',           ar: 'إطار عمل' },
  { id: 'diagnostic',    en: 'Diagnostic Study',    ar: 'دراسة تشخيصية' },
  { id: 'survey',        en: 'Foundational Survey', ar: 'مسح تأسيسي' },
  { id: 'report',        en: 'Report',              ar: 'تقرير' },
  { id: 'guideline',     en: 'Technical Guideline', ar: 'دليل تقني' },
  { id: 'data',          en: 'Reference Data',      ar: 'بيانات مرجعية' },
  { id: 'specification', en: 'Specification',       ar: 'مواصفات تقنية' },
];

const LANG_BADGE: Record<string, { en: string; ar: string; color: string }> = {
  bilingual: { en: 'AR / EN', ar: 'عربي / إنجليزي', color: 'var(--teal-600)' },
  arabic:    { en: 'Arabic',  ar: 'عربي',             color: 'var(--sand-500)' },
  english:   { en: 'English', ar: 'إنجليزي',          color: 'var(--blue-600)' },
};

const TYPE_ICON: Record<string, string> = {
  framework:     '⊞',
  diagnostic:    '⊕',
  survey:        '⊗',
  report:        '≡',
  guideline:     '◎',
  data:          '▦',
  specification: '⊟',
};

export default function KnowledgePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';
  const serif = isAr ? 'var(--font-arabic)' : 'var(--font-serif)';

  const [activeType, setActiveType] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = documentsData.filter(doc => {
    const matchType = !activeType || doc.type === activeType;
    const q = search.toLowerCase();
    const matchSearch = !search ||
      doc.title_en.toLowerCase().includes(q) ||
      doc.title_ar.includes(search) ||
      doc.type_en.toLowerCase().includes(q);
    return matchType && matchSearch;
  });

  const featured = documentsData.filter(d => d.featured);

  return (
    <>
      {/* ── HERO ── */}
      <div style={{
        background: 'var(--ink-800)', color: '#fff',
        padding: 'calc(74px + 64px) 0 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(circle at 85% 30%, rgba(63,168,154,0.18), transparent 50%),
            radial-gradient(circle at 15% 80%, rgba(91,177,227,0.12), transparent 50%)
          `,
        }} />
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.7,
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><g fill='none' stroke='%23ffffff' stroke-width='0.6' opacity='0.08'><path d='M-50 200 Q 100 160 250 220 T 550 200'/><path d='M-50 240 Q 120 200 280 260 T 580 240'/></g></svg>")`,
          backgroundSize: 'cover',
        }} />
        <div className="wrap" style={{ position: 'relative' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            fontSize: '12px', fontWeight: '600', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--sand-400)', fontFamily: ff,
          }}>
            <span style={{ width: '24px', height: '1.5px', background: 'var(--sand-400)', display: 'inline-block' }} />
            {isAr ? 'المكتبة المعرفية' : 'Knowledge Library'}
          </span>
          <h1 style={{
            fontFamily: serif, color: '#fff',
            marginTop: '16px', marginBottom: '24px',
            fontSize: 'clamp(2.4rem, 4.2vw, 4.4rem)',
            lineHeight: 1.04, letterSpacing: '-0.022em', fontWeight: 400,
          }}>
            {isAr ? 'المنتجات المعرفية' : 'Knowledge Products'}
          </h1>
          <p style={{
            fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)',
            fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
            color: 'rgba(255,255,255,0.78)',
            maxWidth: '60ch', lineHeight: 1.45, marginBottom: 0,
          }}>
            {isAr
              ? 'الدراسات التشخيصية وأطر التخطيط والمبادئ التوجيهية التقنية وموارد البيانات الداعمة لعملية تخطيط AWSP.'
              : 'Diagnostic studies, planning frameworks, technical guidelines, and data resources supporting the AWSP planning process.'}
          </p>
        </div>
      </div>

      {/* ── FEATURED DOCUMENTS ── */}
      <section style={{ background: 'var(--bone)', padding: '64px 0' }}>
        <div className="wrap">
          <div style={{ marginBottom: '32px' }}>
            <span className="eyebrow" style={{ fontFamily: ff }}>
              {isAr ? 'الوثائق الرئيسية' : 'Key Documents'}
            </span>
            <h2 style={{ fontFamily: serif, marginTop: '12px' }}>
              {isAr ? 'الإصدارات المميزة' : 'Featured Publications'}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {featured.map(doc => (
              <div key={doc.id} style={{
                background: '#fff', border: '1px solid var(--line)',
                borderRadius: 'var(--radius-lg)', padding: '32px',
                display: 'flex', flexDirection: 'column', gap: '16px',
                position: 'relative', overflow: 'hidden',
                transition: 'all 220ms ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 18px 40px -22px rgba(14,42,71,0.18)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
              >
                <div style={{ position: 'absolute', top: 0, insetInlineStart: 0, insetInlineEnd: 0, height: '3px', background: 'var(--teal-500)' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 'var(--radius-pill)',
                      fontSize: '11px', fontWeight: '600', fontFamily: ff,
                      background: 'rgba(42,138,138,0.1)', color: 'var(--teal-700)',
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                    }}>
                      {isAr ? doc.type_ar : doc.type_en}
                    </span>
                    {doc.lang && (
                      <span style={{
                        padding: '3px 10px', borderRadius: 'var(--radius-pill)',
                        fontSize: '11px', fontWeight: '600', fontFamily: ff,
                        background: 'var(--bone)', color: LANG_BADGE[doc.lang]?.color || 'var(--gray-500)',
                      }}>
                        {isAr ? LANG_BADGE[doc.lang]?.ar : LANG_BADGE[doc.lang]?.en}
                      </span>
                    )}
                  </div>
                  <span style={{ fontFamily: ff, fontSize: '12px', color: 'var(--gray-400)', whiteSpace: 'nowrap' }}>
                    {doc.version} · {doc.date}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: serif, fontSize: '1.3rem',
                  color: 'var(--ink-800)', lineHeight: 1.3, margin: 0,
                }}>
                  {isAr ? doc.title_ar : doc.title_en}
                </h3>

                <p style={{
                  fontFamily: ff, fontSize: '14px',
                  color: 'var(--gray-700)', lineHeight: 1.7,
                  margin: 0, flex: 1,
                }}>
                  {isAr ? doc.description_ar : doc.description_en}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                  {doc.pages && (
                    <span style={{ fontFamily: ff, fontSize: '12px', color: 'var(--gray-400)' }}>
                      {doc.pages} {isAr ? 'صفحة · PDF' : 'pages · PDF'}
                    </span>
                  )}
                  {doc.file ? (
                    <a href={doc.file} download style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      padding: '10px 20px', background: 'var(--ink-800)', color: '#fff',
                      borderRadius: 'var(--radius)', fontSize: '13px',
                      fontWeight: '600', fontFamily: ff, textDecoration: 'none',
                      transition: 'background 160ms ease',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--teal-700)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--ink-800)'}
                    >
                      {isAr ? 'تحميل PDF' : 'Download PDF'}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 14, height: 14 }}>
                        <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  ) : (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      padding: '10px 16px', background: 'var(--bone)',
                      borderRadius: 'var(--radius)', fontSize: '13px',
                      fontWeight: '600', fontFamily: ff, color: 'var(--gray-400)',
                    }}>
                      {isAr ? 'قريباً' : 'Forthcoming'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL LIBRARY ── */}
      <section style={{ background: 'var(--paper)', padding: '64px 0 96px' }}>
        <div className="wrap">

          <div style={{ marginBottom: '32px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '11px', fontWeight: '600', letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'var(--teal-600)', fontFamily: ff,
            }}>
              <span style={{ width: '20px', height: '1.5px', background: 'currentColor', display: 'inline-block' }} />
              {isAr ? 'المكتبة الكاملة' : 'Full Library'}
            </span>
            <h2 style={{ fontFamily: serif, margin: '12px 0 0', fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)', color: 'var(--ink-800)' }}>
              {isAr ? 'جميع الوثائق' : 'All Documents'}
            </h2>
          </div>

          {/* Search + filters */}
          <div style={{
            background: '#fff', border: '1px solid var(--line)',
            borderRadius: 'var(--radius-lg)', padding: '20px 24px',
            marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '14px',
          }}>
            <div style={{ position: 'relative', maxWidth: '480px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth={2}
                style={{ width: 16, height: 16, position: 'absolute', insetInlineStart: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/>
              </svg>
              <input
                type="text" value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={isAr ? 'ابحث في الوثائق...' : 'Search documents...'}
                dir={isAr ? 'rtl' : 'ltr'}
                style={{
                  width: '100%', padding: '10px 14px 10px 36px',
                  fontSize: '14px', fontFamily: ff,
                  background: 'var(--paper)', border: '1px solid var(--line-2)',
                  borderRadius: 'var(--radius)', outline: 'none', color: 'var(--gray-900)',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveType(null)}
                style={{
                  padding: '6px 14px', borderRadius: 'var(--radius-pill)',
                  border: `2px solid ${!activeType ? 'var(--ink-800)' : 'var(--line-2)'}`,
                  background: !activeType ? 'var(--ink-800)' : '#fff',
                  color: !activeType ? '#fff' : 'var(--gray-500)',
                  fontFamily: ff, fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                }}
              >
                {isAr ? `الكل (${documentsData.length})` : `All (${documentsData.length})`}
              </button>
              {DOC_TYPES.map(t => {
                const count = documentsData.filter(d => d.type === t.id).length;
                if (count === 0) return null;
                const isActive = activeType === t.id;
                return (
                  <button key={t.id}
                    onClick={() => setActiveType(isActive ? null : t.id)}
                    style={{
                      padding: '6px 14px', borderRadius: 'var(--radius-pill)',
                      border: `2px solid ${isActive ? 'var(--teal-500)' : 'var(--line-2)'}`,
                      background: isActive ? 'var(--teal-500)' : '#fff',
                      color: isActive ? '#fff' : 'var(--gray-500)',
                      fontFamily: ff, fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                    }}
                  >
                    {isAr ? t.ar : t.en} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Document list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.length === 0 ? (
              <div style={{
                textAlign: 'center', padding: '48px',
                background: '#fff', border: '1px solid var(--line)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <p style={{ fontFamily: ff, color: 'var(--gray-500)' }}>
                  {isAr ? 'لا توجد وثائق مطابقة.' : 'No documents match your search.'}
                </p>
              </div>
            ) : filtered.map(doc => (
              <div key={doc.id} style={{
                background: '#fff', border: '1px solid var(--line)',
                borderRadius: 'var(--radius-lg)', padding: '24px 28px',
                display: 'grid',
                gridTemplateColumns: '48px 1fr auto',
                gap: '20px', alignItems: 'center',
                transition: 'all 220ms ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--teal-500)';
                (e.currentTarget as HTMLElement).style.background = 'var(--paper)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--line)';
                (e.currentTarget as HTMLElement).style.background = '#fff';
              }}
              >
                <div style={{
                  width: '48px', height: '48px',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '12px', background: 'var(--bone)',
                  color: 'var(--teal-600)', fontSize: '20px', flexShrink: 0,
                }}>
                  {TYPE_ICON[doc.type] || '⊞'}
                </div>

                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '2px 8px', borderRadius: 'var(--radius-pill)',
                      fontSize: '10px', fontWeight: '600', fontFamily: ff,
                      background: 'rgba(42,138,138,0.1)', color: 'var(--teal-700)',
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                    }}>
                      {isAr ? doc.type_ar : doc.type_en}
                    </span>
                    {doc.lang && (
                      <span style={{
                        padding: '2px 8px', borderRadius: 'var(--radius-pill)',
                        fontSize: '10px', fontWeight: '600', fontFamily: ff,
                        background: 'var(--bone)',
                        color: LANG_BADGE[doc.lang]?.color || 'var(--gray-500)',
                      }}>
                        {isAr ? LANG_BADGE[doc.lang]?.ar : LANG_BADGE[doc.lang]?.en}
                      </span>
                    )}
                    <span style={{ fontFamily: ff, fontSize: '11px', color: 'var(--gray-400)' }}>
                      {doc.version} · {doc.date}
                      {doc.pages ? ` · ${doc.pages} ${isAr ? 'صفحة' : 'pp.'}` : ''}
                    </span>
                  </div>
                  <h4 style={{
                    fontFamily: serif, fontSize: '15px',
                    color: 'var(--ink-800)', margin: '0 0 6px',
                  }}>
                    {isAr ? doc.title_ar : doc.title_en}
                  </h4>
                  <p style={{
                    fontFamily: ff, fontSize: '13px',
                    color: 'var(--gray-600)', lineHeight: 1.6, margin: 0,
                  }}>
                    {isAr ? doc.description_ar : doc.description_en}
                  </p>
                </div>

                <div style={{ flexShrink: 0 }}>
                  {doc.file ? (
                    <a href={doc.file} download style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      padding: '10px 18px', background: 'var(--ink-800)', color: '#fff',
                      borderRadius: 'var(--radius)', fontSize: '13px',
                      fontWeight: '600', fontFamily: ff, textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}>
                      {isAr ? 'تحميل' : 'Download'}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 13, height: 13 }}>
                        <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  ) : (
                    <span style={{
                      display: 'inline-flex', padding: '10px 16px',
                      background: 'var(--bone)', borderRadius: 'var(--radius)',
                      fontSize: '12px', fontWeight: '600', fontFamily: ff,
                      color: 'var(--gray-400)', whiteSpace: 'nowrap',
                    }}>
                      {isAr ? 'قريباً' : 'Forthcoming'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
