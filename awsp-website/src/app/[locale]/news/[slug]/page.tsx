import Link from 'next/link';
import { notFound } from 'next/navigation';
import newsData from '@/data/news.json';

export function generateStaticParams() {
  const locales = ['ar', 'en'];
  return locales.flatMap(locale =>
    newsData.map(post => ({ locale, slug: post.slug }))
  );
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = newsData.find(p => p.slug === slug);
  if (!post) notFound();

  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';
  const serif = isAr ? 'var(--font-arabic)' : 'var(--font-serif)';

  return (
    <>
      {/* Article hero */}
      <div style={{
        background: 'var(--ink-800)', color: '#fff',
        padding: 'calc(74px + 48px) 0 64px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(circle at 85% 30%, rgba(63,168,154,0.18), transparent 50%)',
        }} />
        <div className="wrap-narrow" style={{ position: 'relative' }}>
          <Link href={`/${locale}/news`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '13px', fontFamily: ff, color: 'rgba(255,255,255,0.65)',
              textDecoration: 'none', marginBottom: '24px',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 14, height: 14 }}>
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {isAr ? 'الأخبار والفعاليات' : 'News & Events'}
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{
              padding: '4px 12px', borderRadius: 'var(--radius-pill)',
              fontSize: '11px', fontWeight: '600', fontFamily: ff,
              background: 'rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.9)',
              textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              {isAr ? post.category_ar : post.category_en}
            </span>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontFamily: ff }}>
              {post.published_at} · {post.read_time} {isAr ? 'دقائق قراءة' : 'min read'}
            </span>
          </div>

          <h1 style={{
            fontFamily: serif, color: '#fff',
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            lineHeight: 1.1, letterSpacing: '-0.018em',
            fontWeight: 400, marginBottom: '24px',
          }}>
            {isAr ? post.title_ar : post.title_en}
          </h1>

          <p style={{
            fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)',
            fontSize: 'clamp(1.05rem, 1.3vw, 1.2rem)',
            color: 'rgba(255,255,255,0.78)', lineHeight: 1.5,
          }}>
            {isAr ? post.excerpt_ar : post.excerpt_en}
          </p>
        </div>
      </div>

      {/* Featured image */}
      <div style={{
        height: '400px',
        backgroundImage: `url('${post.img}')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
      }} />

      {/* Article body */}
      <section style={{ background: 'var(--paper)', padding: '64px 0 96px' }}>
        <div className="wrap-narrow">
          <div className="news-article-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: '64px', alignItems: 'start' }}>

            <div>
              {(isAr ? post.body_ar : post.body_en).split('\n\n').map((para, i) => (
                <p key={i} style={{
                  fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)',
                  fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                  lineHeight: 1.75, color: 'var(--gray-800)',
                  marginBottom: '1.5em',
                }}>
                  {para}
                </p>
              ))}

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--line)' }}>
                {(isAr ? post.tags_ar : post.tags_en).map(tag => (
                  <span key={tag} style={{
                    padding: '5px 12px', borderRadius: 'var(--radius-pill)',
                    fontSize: '12px', fontWeight: '600', fontFamily: ff,
                    background: 'var(--bone)', color: 'var(--gray-600)',
                    border: '1px solid var(--line)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <aside className="news-article-sidebar" style={{ position: 'sticky', top: '94px' }}>
              <div style={{
                background: '#fff', border: '1px solid var(--line)',
                borderRadius: 'var(--radius-lg)', padding: '24px',
              }}>
                <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: '16px', fontFamily: ff }}>
                  {isAr ? 'تفاصيل المقال' : 'Article details'}
                </div>
                {[
                  { labelEn: 'Category',   labelAr: 'الفئة',          val: isAr ? post.category_ar : post.category_en },
                  { labelEn: 'Published',  labelAr: 'تاريخ النشر',    val: post.published_at },
                  { labelEn: 'Author',     labelAr: 'الكاتب',         val: isAr ? post.author_ar : post.author_en },
                  { labelEn: 'Read time',  labelAr: 'وقت القراءة',    val: `${post.read_time} ${isAr ? 'دقائق' : 'min'}` },
                ].map(row => (
                  <div key={row.labelEn} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line)', fontSize: '13px', gap: '8px' }}>
                    <span style={{ color: 'var(--gray-500)', fontFamily: ff, flexShrink: 0 }}>{isAr ? row.labelAr : row.labelEn}</span>
                    <span style={{ color: 'var(--ink-800)', fontWeight: '500', fontFamily: ff, textAlign: 'end' }}>{row.val}</span>
                  </div>
                ))}

                <Link href={`/${locale}/news`}
                  style={{
                    display: 'block', textAlign: 'center', marginTop: '20px',
                    padding: '10px', background: 'var(--ink-800)', color: '#fff',
                    borderRadius: 'var(--radius)', fontSize: '13px',
                    fontWeight: '600', fontFamily: ff, textDecoration: 'none',
                  }}
                >
                  {isAr ? '← جميع الأخبار' : '← All news'}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
