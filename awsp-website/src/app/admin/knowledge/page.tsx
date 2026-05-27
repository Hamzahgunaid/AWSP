import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import AdminShell from '@/components/Admin/AdminShell';
import documentsData from '@/data/documents.json';

export const dynamic = 'force-dynamic';

export default async function AdminKnowledgePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  return (
    <AdminShell>
      <div style={{ maxWidth: '1000px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontFamily: 'Source Serif 4, serif', fontSize: '26px', fontWeight: '400', color: '#0E2A47', margin: '0 0 4px' }}>
              Knowledge Products
            </h1>
            <p style={{ fontSize: '13px', color: '#6B6B6B', margin: 0 }}>
              {documentsData.length} documents
            </p>
          </div>
          <Link href="/admin/knowledge/new" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '11px 20px', background: '#1F7A78', color: '#fff',
            borderRadius: '8px', fontSize: '14px', fontWeight: '600', textDecoration: 'none',
          }}>
            + New Document
          </Link>
        </div>

        <div style={{ background: '#fff', border: '1px solid #E5DFD0', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 120px 80px 100px 110px',
            gap: '16px', padding: '12px 20px',
            background: '#F4F6F8', fontSize: '11px', fontWeight: '600',
            letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8E8E8E',
            borderBottom: '1px solid #E5DFD0',
          }}>
            <span>Title</span><span>Type</span><span>Lang</span><span>Date</span><span>Actions</span>
          </div>

          {(documentsData as { id: string; title_en: string; title_ar: string; type_en: string; lang: string; date: string; featured?: boolean; file: string | null }[]).map((doc, i) => (
            <div key={doc.id} style={{
              display: 'grid', gridTemplateColumns: '1fr 120px 80px 100px 110px',
              gap: '16px', padding: '16px 20px', alignItems: 'center',
              borderBottom: i < documentsData.length - 1 ? '1px solid #F2F2F2' : 'none',
            }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '14px', color: '#0E2A47', marginBottom: '3px' }}>
                  {doc.title_en}
                  {doc.featured && (
                    <span style={{ marginLeft: '8px', padding: '1px 6px', background: 'rgba(42,138,138,0.1)', color: '#1F7A78', borderRadius: '4px', fontSize: '10px', fontWeight: '600' }}>
                      FEATURED
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: '#8E8E8E' }}>{doc.title_ar}</div>
              </div>
              <span style={{
                display: 'inline-block', padding: '3px 8px', borderRadius: '999px',
                fontSize: '11px', fontWeight: '600',
                background: 'rgba(42,138,138,0.1)', color: '#1F7A78',
              }}>
                {doc.type_en}
              </span>
              <span style={{ fontSize: '12px', color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {doc.lang}
              </span>
              <span style={{ fontSize: '13px', color: '#6B6B6B' }}>{doc.date}</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link href={`/admin/knowledge/${doc.id}`} style={{
                  padding: '6px 12px', background: '#F4F6F8', color: '#0E2A47',
                  borderRadius: '6px', fontSize: '12px', fontWeight: '600',
                  textDecoration: 'none', border: '1px solid #E5DFD0',
                }}>
                  Edit
                </Link>
                {doc.file && (
                  <a href={doc.file} target="_blank" style={{
                    padding: '6px 12px', background: '#F4F6F8', color: '#6B6B6B',
                    borderRadius: '6px', fontSize: '12px', fontWeight: '600',
                    textDecoration: 'none', border: '1px solid #E5DFD0',
                  }}>
                    PDF
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
