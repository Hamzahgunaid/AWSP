import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminShell from '@/components/Admin/AdminShell';
import projectsData from '@/data/projects.json';

export const dynamic = 'force-dynamic';

const INTERVENTION_COLORS: Record<string, string> = {
  'Water Networks':              '#2A8A8A',
  'Well Rehabilitation':         '#0D7A6E',
  'Pumping Stations':            '#3B8FD4',
  'Wastewater Networks & Treatment': '#E8B14A',
  'Civil & Structural Works':    '#9B59B6',
  'Vehicles & Equipment':        '#6BC3B6',
  'Energy Sources':              '#F39C12',
  'Consultancies & Studies':     '#95A5A6',
  'Operations Management':       '#BFBFBF',
};

export default async function AdminProjectsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projects = projectsData as any[];

  const byDistrict: Record<string, number> = {};
  const byIntervention: Record<string, number> = {};
  projects.forEach(p => {
    if (p.district_en) byDistrict[p.district_en] = (byDistrict[p.district_en] || 0) + 1;
    if (p.intervention_en) byIntervention[p.intervention_en] = (byIntervention[p.intervention_en] || 0) + 1;
  });

  const withCoords = projects.filter(p => p.lat && p.lng).length;
  const totalInv = projects.reduce((s: number, p) => s + (p.cost_usd || 0), 0);

  return (
    <AdminShell>
      <div style={{ maxWidth: '1100px' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontFamily: 'Source Serif 4, serif', fontSize: '26px', fontWeight: '400', color: '#0E2A47', margin: '0 0 4px' }}>
            Project Database
          </h1>
          <p style={{ fontSize: '13px', color: '#6B6B6B', margin: 0 }}>
            {projects.length} records — managed in src/data/projects.json (read-only view)
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
          {[
            { label: 'Total projects', val: projects.length },
            { label: 'With coordinates', val: withCoords },
            { label: 'Total investment', val: `$${(totalInv / 1_000_000).toFixed(1)}M` },
            { label: 'Districts covered', val: Object.keys(byDistrict).length },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', border: '1px solid #E5DFD0', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '28px', fontWeight: '400', color: '#0E2A47', lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: '12px', color: '#6B6B6B', marginTop: '6px', fontWeight: '500' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* By district */}
          <div style={{ background: '#fff', border: '1px solid #E5DFD0', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ fontFamily: 'Source Serif 4, serif', fontSize: '15px', fontWeight: '500', color: '#0E2A47', margin: '0 0 16px' }}>By District</h3>
            {Object.entries(byDistrict).sort(([, a], [, b]) => b - a).map(([name, count]) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <span style={{ fontSize: '13px', color: '#0E2A47', width: '130px', flexShrink: 0 }}>{name}</span>
                <div style={{ flex: 1, height: '6px', background: '#F4F6F8', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', background: '#2A8A8A', borderRadius: '999px',
                    width: `${Math.round((count / (Math.max(...Object.values(byDistrict)))) * 100)}%`,
                  }} />
                </div>
                <span style={{ fontFamily: 'Source Serif 4, serif', fontSize: '13px', color: '#0E2A47', width: '28px', textAlign: 'right', flexShrink: 0 }}>{count}</span>
              </div>
            ))}
          </div>

          {/* By intervention type */}
          <div style={{ background: '#fff', border: '1px solid #E5DFD0', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ fontFamily: 'Source Serif 4, serif', fontSize: '15px', fontWeight: '500', color: '#0E2A47', margin: '0 0 16px' }}>By Intervention Type</h3>
            {Object.entries(byIntervention).sort(([, a], [, b]) => b - a).map(([name, count]) => {
              const color = INTERVENTION_COLORS[name] || '#6BC3B6';
              return (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', color: '#0E2A47', flex: 1 }}>{name}</span>
                  <span style={{ fontFamily: 'Source Serif 4, serif', fontSize: '13px', color: '#0E2A47', width: '28px', textAlign: 'right', flexShrink: 0 }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ background: '#FFF8F0', border: '1px solid #F5DFB0', borderRadius: '10px', padding: '14px 18px', marginTop: '24px', fontSize: '13px', color: '#8B5C20' }}>
          To update project data, rebuild <code style={{ background: '#FFF0D0', padding: '2px 6px', borderRadius: '4px' }}>src/data/projects.json</code> using the Python transformation script, then redeploy.
        </div>
      </div>
    </AdminShell>
  );
}
