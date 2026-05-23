import Link from 'next/link';
import newsData from '@/data/news.json';
import type { NewsPost } from '@/types';

export default function NewsStrip({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const font = isAr ? 'Cairo, sans-serif' : 'Source Sans 3, sans-serif';

  const recentPosts = (newsData as NewsPost[]).slice(0, 3);

  if (recentPosts.length === 0) {
    return (
      <section style={{ backgroundColor: '#F4F6F8', padding: '64px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: isAr ? 'Cairo, sans-serif' : 'Source Serif 4, serif',
            fontWeight: '700', fontSize: 'clamp(22px, 3vw, 32px)',
            color: '#1A3557', marginBottom: '16px',
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
    <section style={{ backgroundColor: '#F4F6F8', padding: '64px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <h2 style={{
            fontFamily: isAr ? 'Cairo, sans-serif' : 'Source Serif 4, serif',
            fontWeight: '700', fontSize: 'clamp(22px, 3vw, 32px)', color: '#1A3557',
          }}>
            {isAr ? 'آخر أخبار البرنامج' : 'Latest from the Programme'}
          </h2>
          <Link href={`/${locale}/news`} style={{
            fontFamily: font, fontSize: '14px', fontWeight: '600',
            color: '#0D7A6E', textDecoration: 'none',
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
            <div key={post.id} style={{
              backgroundColor: 'white', borderRadius: '12px',
              padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <span style={{
                  padding: '2px 10px', borderRadius: '100px',
                  fontSize: '11px', fontWeight: '600', fontFamily: font,
                  backgroundColor: '#E0F2F1', color: '#0D7A6E',
                }}>
                  {isAr ? 'تحديث البرنامج' : 'Programme Update'}
                </span>
              </div>
              <h3 style={{
                fontFamily: font, fontWeight: '700',
                fontSize: '15px', color: '#1A3557', marginBottom: '8px',
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
                color: '#0D7A6E', fontWeight: '600', textDecoration: 'none',
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
