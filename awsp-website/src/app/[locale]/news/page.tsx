'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import newsData from '@/data/news.json';

const CATEGORIES = [
  { id: 'milestone', en: 'Milestone',        ar: 'معلم رئيسي' },
  { id: 'event',     en: 'Event',            ar: 'فعالية' },
  { id: 'update',    en: 'Programme Update', ar: 'تحديث البرنامج' },
];

const CAT_COLORS: Record<string, string> = {
  milestone: 'var(--sand-500)',
  event:     'var(--teal-600)',
  update:    'var(--blue-600)',
};

export default function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';
  const serif = isAr ? 'var(--font-arabic)' : 'var(--font-serif)';

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = newsData.filter(n =>
    !activeCategory || n.category === activeCategory
  );

  const featured = newsData.find(n => n.featured);
  const rest = filtered.filter(n => !n.featured || activeCategory);

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
            {isAr ? 'أخبار البرنامج' : 'Programme News'}
          </span>
          <h1 style={{
            fontFamily: serif, color: '#fff',
            marginTop: '16px', marginBottom: '24px',
            fontSize: 'clamp(2.4rem, 4.2vw, 4.4rem)',
            lineHeight: 1.04, letterSpacing: '-0.022em', fontWeight: 400,
          }}>
            {isAr ? 'الأخبار والفعاليات' : 'News & Events'}
          </h1>
          <p style={{
            fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)',
            fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
            color: 'rgba(255,255,255,0.78)',
            maxWidth: '56ch', lineHeight: 1.45,
          }}>
            {isAr
              ? 'آخر تحديثات البرنامج ومعالم المراحل وفعاليات أصحاب المصلحة من فريق عمل AWSP.'
              : 'Latest programme updates, phase milestones, and stakeholder events from the AWSP Taskforce.'}
          </p>
        </div>
      </div>

      {/* ── FEATURED POST ── */}
      {featured && !activeCategory && (
        <section style={{ background: 'var(--bone)', padding: '64px 0' }}>
          <div className="wrap">
            <div style={{
              background: '#fff', border: '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)', overflow: 'hidden',
              display: 'grid', gridTemplateColumns: '1.2fr 1fr',
            }}>
              <div style={{
                minHeight: '360px',
                backgroundImage: `linear-gradient(180deg, rgba(14,42,71,0.2), rgba(14,42,71,0.5)), url('${featured.img}')`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                position: 'relative',
              }}>
                <span style={{
                  position: 'absolute', top: '20px', insetInlineStart: '20px',
                  padding: '4px 12px', borderRadius: 'var(--radius-pill)',
                  fontSize: '11px', fontWeight: '600', fontFamily: ff,
                  background: 'rgba(255,255,255,0.9)',
                  color: CAT_COLORS[featured.category] || 'var(--ink-800)',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  {isAr ? featured.category_ar : featured.category_en}
                </span>
              </div>

              <div style={{ padding: '40px' }}>
                <div style={{ fontSize: '12px', color: 'var(--gray-400)', fontFamily: ff, marginBottom: '16px' }}>
                  {featured.published_at} · {featured.read_time} {isAr ? 'دقائق قراءة' : 'min read'}
                </div>
                <h2 style={{
                  fontFamily: serif, fontSize: '1.6rem',
                  lineHeight: 1.2, color: 'var(--ink-800)', marginBottom: '16px',
                }}>
                  {isAr ? featured.title_ar : featured.title_en}
                </h2>
                <p style={{
                  fontFamily: ff, fontSize: '14px',
                  color: 'var(--gray-700)', lineHeight: 1.7, marginBottom: '28px',
                }}>
                  {isAr ? featured.excerpt_ar : featured.excerpt_en}
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
                  {(isAr ? featured.tags_ar : featured.tags_en).map(tag => (
                    <span key={tag} style={{
                      padding: '4px 10px', borderRadius: 'var(--radius-pill)',
                      fontSize: '11px', fontWeight: '600', fontFamily: ff,
                      background: 'var(--bone)', color: 'var(--gray-600)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/${locale}/news/${featured.slug}`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '12px 24px', background: 'var(--ink-800)', color: '#fff',
                    borderRadius: 'var(--radius)', fontSize: '14px',
                    fontWeight: '600', fontFamily: ff, textDecoration: 'none',
                  }}
                >
                  {isAr ? 'اقرأ المقال' : 'Read the article'}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="icon-dir" style={{ width: 14, height: 14 }}>
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── ALL POSTS ── */}
      <section style={{ background: 'var(--paper)', padding: '64px 0 96px' }}>
        <div className="wrap">

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <button onClick={() => setActiveCategory(null)}
              style={{
                padding: '7px 16px', borderRadius: 'var(--radius-pill)',
                border: `2px solid ${!activeCategory ? 'var(--ink-800)' : 'var(--line-2)'}`,
                background: !activeCategory ? 'var(--ink-800)' : '#fff',
                color: !activeCategory ? '#fff' : 'var(--gray-500)',
                fontFamily: ff, fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              }}
            >
              {isAr ? `الكل (${newsData.length})` : `All (${newsData.length})`}
            </button>
            {CATEGORIES.map(cat => {
              const count = newsData.filter(n => n.category === cat.id).length;
              if (!count) return null;
              const isActive = activeCategory === cat.id;
              return (
                <button key={cat.id} onClick={() => setActiveCategory(isActive ? null : cat.id)}
                  style={{
                    padding: '7px 16px', borderRadius: 'var(--radius-pill)',
                    border: `2px solid ${isActive ? 'var(--teal-500)' : 'var(--line-2)'}`,
                    background: isActive ? 'var(--teal-500)' : '#fff',
                    color: isActive ? '#fff' : 'var(--gray-500)',
                    fontFamily: ff, fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                  }}
                >
                  {isAr ? cat.ar : cat.en} ({count})
                </button>
              );
            })}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {(activeCategory ? filtered : rest).map(post => (
              <article key={post.id} style={{
                background: '#fff', border: '1px solid var(--line)',
                borderRadius: 'var(--radius-lg)', overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
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
                <div style={{
                  aspectRatio: '16/9',
                  backgroundImage: `linear-gradient(180deg, rgba(14,42,71,0.15), rgba(14,42,71,0.5)), url('${post.img}')`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                }} />

                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      fontSize: '10px', fontWeight: '600', letterSpacing: '0.1em',
                      textTransform: 'uppercase', fontFamily: ff,
                      color: CAT_COLORS[post.category] || 'var(--teal-600)',
                    }}>
                      <span style={{ width: '6px', height: '6px', background: 'currentColor', borderRadius: '50%' }} />
                      {isAr ? post.category_ar : post.category_en}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--gray-400)', fontFamily: ff }}>
                      {post.read_time} {isAr ? 'دق' : 'min'}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: serif, fontSize: '1.15rem',
                    lineHeight: 1.3, color: 'var(--ink-800)',
                    marginBottom: '10px', flex: 1,
                  }}>
                    {isAr ? post.title_ar : post.title_en}
                  </h3>
                  <p style={{
                    fontFamily: ff, fontSize: '13px',
                    color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: '16px',
                  }}>
                    {isAr ? post.excerpt_ar : post.excerpt_en}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                    <span style={{ fontSize: '12px', color: 'var(--gray-400)', fontFamily: ff }}>
                      {post.published_at}
                    </span>
                    <Link href={`/${locale}/news/${post.slug}`}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        fontSize: '13px', fontWeight: '600', fontFamily: ff,
                        color: 'var(--ink-800)', textDecoration: 'none',
                      }}
                    >
                      {isAr ? 'اقرأ' : 'Read'}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="icon-dir" style={{ width: 13, height: 13 }}>
                        <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
