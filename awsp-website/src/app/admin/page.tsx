import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import AdminShell from '@/components/Admin/AdminShell';
import newsData      from '@/data/news.json';
import documentsData from '@/data/documents.json';
import phasesData    from '@/data/phases.json';
import projectsData  from '@/data/projects.json';
import partnersData   from '@/data/partners.json';
import taskforceData  from '@/data/taskforce.json';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const stats = [
    { label: 'News Posts',      value: newsData.length,      href: '/admin/news',      icon: '≡' },
    { label: 'Documents',       value: documentsData.length, href: '/admin/knowledge', icon: '⊟' },
    { label: 'Planning Phases', value: phasesData.length,    href: '/admin/phases',    icon: '◎' },
    { label: 'Projects',        value: projectsData.length,  href: '/admin/projects',  icon: '▦' },
    { label: 'Partners',          value: partnersData.length,                                                         href: '/admin/partners',   icon: '⊕' },
    { label: 'Taskforce Members', value: (taskforceData as any[]).filter((m: any) => m.active).length, href: '/admin/taskforce',  icon: '👥' },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activePhases    = (phasesData as any[]).filter(p => p.status === 'active').length;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const completedPhases = (phasesData as any[]).filter(p => p.status === 'completed').length;

  return (
    <AdminShell>
      <div style={{ maxWidth: '1100px' }}>
        <h1 style={{ fontFamily: 'Source Serif 4, serif', fontSize: '28px', fontWeight: '400', color: '#0E2A47', marginBottom: '6px' }}>
          Dashboard
        </h1>
        <p style={{ fontSize: '14px', color: '#6B6B6B', marginBottom: '36px' }}>
          AWSP Content Management System — manage all public-facing content from here.
        </p>

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginBottom: '36px' }}>
          {stats.map(s => (
            <Link key={s.href} href={s.href} style={{
              display: 'block', background: '#fff', border: '1px solid #E5DFD0',
              borderRadius: '12px', padding: '20px', textDecoration: 'none',
              transition: 'box-shadow 200ms ease',
            }}>
              <div style={{ fontSize: '22px', marginBottom: '10px' }}>{s.icon}</div>
              <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '32px', fontWeight: '400', color: '#0E2A47', lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: '12px', color: '#6B6B6B', marginTop: '6px', fontWeight: '500' }}>
                {s.label}
              </div>
            </Link>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Programme health */}
          <div style={{ background: '#fff', border: '1px solid #E5DFD0', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontFamily: 'Source Serif 4, serif', fontSize: '16px', fontWeight: '500', color: '#0E2A47', margin: '0 0 20px' }}>
              Programme Status
            </h3>
            {[
              { label: 'Completed phases',    val: `${completedPhases} of ${phasesData.length}`,                color: '#8B5C20' },
              { label: 'Active phases',       val: `${activePhases} running`,                                   color: '#1F7A78' },
              { label: 'Total projects',      val: `${projectsData.length} records`,                            color: '#0E2A47' },
              { label: 'Featured news post',  val: `${(newsData as { featured?: boolean }[]).filter(n => n.featured).length} pinned`, color: '#0E2A47' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F2F2F2', fontSize: '13px' }}>
                <span style={{ color: '#6B6B6B' }}>{row.label}</span>
                <span style={{ color: row.color, fontWeight: '600' }}>{row.val}</span>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div style={{ background: '#fff', border: '1px solid #E5DFD0', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontFamily: 'Source Serif 4, serif', fontSize: '16px', fontWeight: '500', color: '#0E2A47', margin: '0 0 20px' }}>
              Quick Actions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { href: '/admin/news/new',      label: '+ Add news post',      bg: '#0E2A47', color: '#fff' },
                { href: '/admin/knowledge/new', label: '+ Add document',        bg: '#1F7A78', color: '#fff' },
                { href: '/admin/phases',        label: '◎ Update phase status',    bg: '#F2F2F2', color: '#0E2A47' },
                { href: '/admin/taskforce/new', label: '+ Add taskforce member',   bg: '#F2F2F2', color: '#0E2A47' },
                { href: '/ar',                  label: '↗ View live site (AR)', bg: '#F2F2F2', color: '#0E2A47', blank: true },
                { href: '/en',                  label: '↗ View live site (EN)', bg: '#F2F2F2', color: '#0E2A47', blank: true },
              ].map(action => (
                <Link key={action.href} href={action.href}
                  target={action.blank ? '_blank' : '_self'}
                  style={{
                    display: 'block', padding: '10px 16px',
                    background: action.bg, color: action.color,
                    borderRadius: '8px', fontSize: '13px', fontWeight: '600',
                    textDecoration: 'none',
                  }}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
