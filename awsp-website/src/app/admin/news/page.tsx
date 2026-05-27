import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import AdminShell from '@/components/Admin/AdminShell';
import newsData from '@/data/news.json';

export const dynamic = 'force-dynamic';

const CAT_STYLE: Record<string, { bg: string; color: string }> = {
  milestone: { bg: 'rgba(200,137,58,0.12)', color: '#8B5C20' },
  event:     { bg: 'rgba(42,138,138,0.1)',  color: '#1F7A78' },
  update:    { bg: 'rgba(59,143,212,0.1)',  color: '#2A78B8' },
};

export default async function AdminNewsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  return (
    <AdminShell>
      <div style={{ maxWidth: '1000px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontFamily: 'Source Serif 4, serif', fontSize: '26px', fontWeight: '400', color: '#0E2A47', margin: '0 0 4px' }}>
              News & Events
            </h1>
            <p style={{ fontSize: '13px', color: '#6B6B6B', margin: 0 }}>
              {newsData.length} posts
            </p>
          </div>
          <Link href="/admin/news/new" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '11px 20px', background: '#0E2A47', color: '#fff',
            borderRadius: '8px', fontSize: '14px', fontWeight: '600', textDecoration: 'none',
          }}>
            + New Post
          </Link>
        </div>

        <div style={{ background: '#fff', border: '1px solid #E5DFD0', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 120px 110px 120px',
            gap: '16px', padding: '12px 20px',
            background: '#F4F6F8', fontSize: '11px', fontWeight: '600',
            letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8E8E8E',
            borderBottom: '1px solid #E5DFD0',
          }}>
            <span>Title</span><span>Category</span><span>Date</span><span>Actions</span>
          </div>

          {(newsData as { id: string; title_en: string; title_ar: string; category: string; category_en: string; featured?: boolean; published_at: string }[]).map((post, i) => {
            const cs = CAT_STYLE[post.category] || { bg: 'var(--bone)', color: '#6B6B6B' };
            return (
              <div key={post.id} style={{
                display: 'grid', gridTemplateColumns: '1fr 120px 110px 120px',
                gap: '16px', padding: '16px 20px', alignItems: 'center',
                borderBottom: i < newsData.length - 1 ? '1px solid #F2F2F2' : 'none',
              }}>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '14px', color: '#0E2A47', marginBottom: '3px' }}>
                    {post.title_en}
                    {post.featured && (
                      <span style={{ marginLeft: '8px', padding: '1px 6px', background: 'rgba(42,138,138,0.1)', color: '#1F7A78', borderRadius: '4px', fontSize: '10px', fontWeight: '600' }}>
                        FEATURED
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: '#8E8E8E' }}>{post.title_ar}</div>
                </div>
                <span style={{
                  display: 'inline-block', padding: '3px 8px', borderRadius: '999px',
                  fontSize: '11px', fontWeight: '600',
                  background: cs.bg, color: cs.color,
                }}>
                  {post.category_en}
                </span>
                <span style={{ fontSize: '13px', color: '#6B6B6B' }}>{post.published_at}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link href={`/admin/news/${post.id}`} style={{
                    padding: '6px 12px', background: '#F4F6F8', color: '#0E2A47',
                    borderRadius: '6px', fontSize: '12px', fontWeight: '600',
                    textDecoration: 'none', border: '1px solid #E5DFD0',
                  }}>
                    Edit
                  </Link>
                  <Link href={`/en/news/${(post as { slug?: string }).slug || post.id}`} target="_blank" style={{
                    padding: '6px 12px', background: '#F4F6F8', color: '#6B6B6B',
                    borderRadius: '6px', fontSize: '12px', fontWeight: '600',
                    textDecoration: 'none', border: '1px solid #E5DFD0',
                  }}>
                    View
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminShell>
  );
}
