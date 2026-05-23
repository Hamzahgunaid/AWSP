'use client';

import Link from 'next/link';
import newsData from '@/data/news.json';
import type { NewsPost } from '@/types';

export default function NewsStrip({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const font = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';

  const recentPosts = (newsData as NewsPost[]).slice(0, 3);

  if (recentPosts.length === 0) {
    return (
      <section style={{ backgroundColor: 'var(--bone)', padding: '72px 24px' }}>
        <div style={{ maxWidth: 'var(--wrap-max)', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)',
            fontWeight: '700', fontSize: 'clamp(22px, 3vw, 32px)',
            color: 'var(--ink-900)', marginBottom: '16px',
          }}>
            {isAr ? 'آخر أخبار البرنامج' : 'Latest from the Programme'}
          </h2>
          <p style={{ fontFamily: font, fontSize: '15px', color: '#8A9BB0' }}>
            {isAr
              ? 'لم يتم نشر أي أخبار بعد. تابعونا قريباً.'
              : 'No news posts yet. Check back soon for programme updates.'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ backgroundColor: 'var(--bone)', padding: '72px 24px' }}>
      <div style={{ maxWidth: 'var(--wrap-max)', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <h2 style={{
            fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)',
            fontWeight: '700', fontSize: 'clamp(22px, 3vw, 32px)',
            color: 'var(--ink-900)',
          }}>
            {isAr ? 'آخر أخبار البرنامج' : 'Latest from the Programme'}
          </h2>
          <Link href={`/${locale}/news`} style={{
            fontFamily: font, fontSize: '14px', fontWeight: '600',
            color: 'var(--teal-600)', textDecoration: 'none',
          }}>
            {isAr ? '← عرض جميع الأخبار' : 'View all news →'}
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {recentPosts.map(post => (
            <div
              key={post.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                transition: 'all 300ms ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 10px rgba(0,0,0,0.06)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <span className="chip-teal" style={{ fontFamily: font }}>
                  {isAr ? 'تحديث البرنامج' : 'Programme Update'}
                </span>
              </div>
              <h3 style={{
                fontFamily: font, fontWeight: '700',
                fontSize: '15px', color: 'var(--ink-900)', marginBottom: '8px',
              }}>
                {isAr ? post.title_ar : post.title_en}
              </h3>
              <p style={{
                fontFamily: font, fontSize: '13px',
                color: '#6B7280', lineHeight: '1.7', marginBottom: '16px',
              }}>
                {isAr ? post.excerpt_ar : post.excerpt_en}
              </p>
              <Link href={`/${locale}/news/${post.slug}`} style={{
                fontFamily: font, fontSize: '13px',
                color: 'var(--teal-600)', fontWeight: '600', textDecoration: 'none',
              }}>
                {isAr ? '← اقرأ المزيد' : 'Read more →'}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
