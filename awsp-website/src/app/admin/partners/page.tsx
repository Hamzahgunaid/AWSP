import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminShell from '@/components/Admin/AdminShell';
import partnersData from '@/data/partners.json';

export const dynamic = 'force-dynamic';

export default async function AdminPartnersPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  return (
    <AdminShell>
      <div style={{ maxWidth: '900px' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontFamily: 'Source Serif 4, serif', fontSize: '26px', fontWeight: '400', color: '#0E2A47', margin: '0 0 4px' }}>
            Partners
          </h1>
          <p style={{ fontSize: '13px', color: '#6B6B6B', margin: 0 }}>
            {partnersData.length} partner cards — edit src/data/partners.json to update
          </p>
        </div>

        <div style={{ background: '#FFF8F0', border: '1px solid #F5DFB0', borderRadius: '10px', padding: '14px 18px', marginBottom: '24px', fontSize: '13px', color: '#8B5C20' }}>
          Partner cards are managed directly in <code style={{ background: '#FFF0D0', padding: '2px 6px', borderRadius: '4px' }}>src/data/partners.json</code>. The admin interface for these is read-only.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {(partnersData as { id: string; name_en?: string; name_ar?: string; role_en?: string; href?: string; description_en?: string }[]).map(partner => (
            <div key={partner.id} style={{
              background: '#fff', border: '1px solid #E5DFD0', borderRadius: '10px',
              padding: '20px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px',
            }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '15px', color: '#0E2A47', marginBottom: '4px' }}>
                  {partner.name_en}
                </div>
                <div style={{ fontSize: '12px', color: '#8E8E8E', marginBottom: '8px' }}>{partner.role_en}</div>
                {partner.href && (
                  <a href={partner.href} target="_blank" style={{ fontSize: '12px', color: '#1F7A78', textDecoration: 'none' }}>
                    {partner.href}
                  </a>
                )}
              </div>
              <div>
                <div style={{ fontSize: '13px', color: '#6B6B6B', lineHeight: 1.6 }}>
                  {partner.description_en}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
