import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import AdminShell from '@/components/Admin/AdminShell';
import NewsForm from '@/components/Admin/NewsForm';

export const dynamic = 'force-dynamic';

export default async function AdminNewsNewPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  return (
    <AdminShell>
      <div style={{ maxWidth: '900px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <Link href="/admin/news" style={{ fontSize: '13px', color: '#6B6B6B', textDecoration: 'none' }}>
            ← News & Events
          </Link>
          <span style={{ color: '#D0D0D0' }}>/</span>
          <h1 style={{ fontFamily: 'Source Serif 4, serif', fontSize: '22px', fontWeight: '400', color: '#0E2A47', margin: 0 }}>
            New Post
          </h1>
        </div>
        <NewsForm />
      </div>
    </AdminShell>
  );
}
