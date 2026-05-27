import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import AdminShell from '@/components/Admin/AdminShell';
import DocumentForm from '@/components/Admin/DocumentForm';
import documentsData from '@/data/documents.json';

export const dynamic = 'force-dynamic';

export default async function AdminKnowledgeEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const { id } = await params;
  const doc = (documentsData as { id: string }[]).find(d => d.id === id);
  if (!doc) notFound();

  return (
    <AdminShell>
      <div style={{ maxWidth: '900px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <Link href="/admin/knowledge" style={{ fontSize: '13px', color: '#6B6B6B', textDecoration: 'none' }}>
            ← Knowledge Products
          </Link>
          <span style={{ color: '#D0D0D0' }}>/</span>
          <h1 style={{ fontFamily: 'Source Serif 4, serif', fontSize: '22px', fontWeight: '400', color: '#0E2A47', margin: 0 }}>
            Edit Document
          </h1>
        </div>
        <DocumentForm initialData={doc} isEdit />
      </div>
    </AdminShell>
  );
}
