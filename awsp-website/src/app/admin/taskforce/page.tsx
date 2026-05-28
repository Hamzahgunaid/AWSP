import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AdminShell from '@/components/Admin/AdminShell';
import taskforceData from '@/data/taskforce.json';

export default async function AdminTaskforcePage() {
  const session = await getServerSession();
  if (!session) redirect('/admin/login');

  const members = taskforceData as any[];
  const mwe    = members.filter(m => m.department === 'MWE');
  const lwsca  = members.filter(m => m.department === 'LWSCA');
  const active = members.filter(m => m.active);

  return (
    <AdminShell>
      <div style={{ maxWidth: '960px' }}>

        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '28px',
        }}>
          <div>
            <h1 style={{
              fontFamily: 'Source Serif 4, serif', fontSize: '26px',
              fontWeight: '400', color: '#0E2A47', margin: '0 0 4px',
            }}>
              Taskforce Members
            </h1>
            <p style={{ fontSize: '13px', color: '#6B6B6B', margin: 0 }}>
              {active.length} active members · {mwe.length} MWE · {lwsca.length} LWSCA
            </p>
          </div>
          <Link href="/admin/taskforce/new" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '11px 20px', background: '#0E2A47', color: '#fff',
            borderRadius: '8px', fontSize: '14px', fontWeight: '600',
            textDecoration: 'none',
          }}>
            + Add Member
          </Link>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px', marginBottom: '28px',
        }}>
          {[
            { label: 'Total members', val: members.length, color: '#0E2A47' },
            { label: 'MWE members',   val: mwe.length,     color: '#2A78B8' },
            { label: 'LWSCA members', val: lwsca.length,   color: '#2A8A8A' },
          ].map(s => (
            <div key={s.label} style={{
              background: '#fff', border: '1px solid #E5DFD0',
              borderRadius: '10px', padding: '18px',
            }}>
              <div style={{
                fontFamily: 'Source Serif 4, serif', fontSize: '32px',
                fontWeight: '400', color: s.color, lineHeight: 1,
              }}>{s.val}</div>
              <div style={{ fontSize: '12px', color: '#6B6B6B', marginTop: '6px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Member list */}
        <div style={{
          background: '#fff', border: '1px solid #E5DFD0',
          borderRadius: '12px', overflow: 'hidden',
        }}>
          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 100px 80px 120px',
            gap: '12px', padding: '12px 20px',
            background: '#F4F6F8', fontSize: '11px',
            fontWeight: '600', letterSpacing: '0.08em',
            textTransform: 'uppercase', color: '#8E8E8E',
            borderBottom: '1px solid #E5DFD0',
          }}>
            <span>Name (EN/AR)</span>
            <span>Title</span>
            <span>Department</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {members.map((member, i) => (
            <div key={member.id} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 100px 80px 120px',
              gap: '12px', padding: '14px 20px',
              borderBottom: i < members.length - 1 ? '1px solid #F2F2F2' : 'none',
              alignItems: 'center',
              opacity: member.active ? 1 : 0.5,
            }}>
              {/* Name */}
              <div>
                <div style={{ fontWeight: '600', fontSize: '14px', color: '#0E2A47' }}>
                  {member.name_en}
                </div>
                <div style={{ fontSize: '12px', color: '#8E8E8E', marginTop: '2px' }}>
                  {member.name_ar}
                </div>
              </div>

              {/* Title */}
              <div>
                <div style={{ fontSize: '13px', color: '#3D3D3D' }}>{member.title_en}</div>
                <div style={{ fontSize: '11px', color: '#BFBFBF', marginTop: '2px' }}>{member.title_ar}</div>
              </div>

              {/* Department badge */}
              <span style={{
                display: 'inline-block', padding: '3px 10px',
                borderRadius: '999px', fontSize: '12px', fontWeight: '600',
                background: member.department === 'MWE'
                  ? 'rgba(42,120,184,0.1)' : 'rgba(42,138,138,0.1)',
                color: member.department === 'MWE' ? '#2A78B8' : '#1F7A78',
              }}>
                {member.department}
              </span>

              {/* Status */}
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                fontSize: '12px', fontWeight: '600',
                color: member.active ? '#1F7A78' : '#8E8E8E',
              }}>
                <span style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: member.active ? '#2A8A8A' : '#BFBFBF',
                  display: 'inline-block',
                }} />
                {member.active ? 'Active' : 'Inactive'}
              </span>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link href={`/admin/taskforce/${member.id}`} style={{
                  padding: '6px 12px', background: '#F4F6F8',
                  color: '#0E2A47', borderRadius: '6px',
                  fontSize: '12px', fontWeight: '600', textDecoration: 'none',
                }}>
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
