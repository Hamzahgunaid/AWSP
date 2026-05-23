import projectsData from '@/data/projects.json';
import phasesData from '@/data/phases.json';
import type { Phase } from '@/types';

interface ProjectRecord {
  id: number;
  name_ar: string;
  name_en: string;
  district_ar: string;
  district_en: string;
  sector_ar: string;
  sector_en: string;
  donor_ar: string;
  donor_en: string;
  cost_usd: number | null;
  status: string;
  year: number;
}

function buildDistrictStats(projects: ProjectRecord[]) {
  const map: Record<string, { ar: string; en: string; count: number; cost: number }> = {};
  for (const p of projects) {
    const key = p.district_ar || 'غير محدد';
    const en  = p.district_en  || p.district_ar || 'Unspecified';
    if (!map[key]) map[key] = { ar: key, en, count: 0, cost: 0 };
    map[key].count++;
    map[key].cost += p.cost_usd ?? 0;
  }
  return Object.values(map).sort((a, b) => b.count - a.count);
}

function buildSectorStats(projects: ProjectRecord[]) {
  const map: Record<string, { ar: string; en: string; count: number }> = {};
  for (const p of projects) {
    const key = p.sector_ar || 'غير محدد';
    const en  = p.sector_en  || p.sector_ar || 'Unspecified';
    if (!map[key]) map[key] = { ar: key, en, count: 0 };
    map[key].count++;
  }
  return Object.values(map).sort((a, b) => b.count - a.count);
}

const SECTOR_COLORS: Record<string, string> = {
  'قطاع المياه':         'var(--teal-500)',
  'قطاع الصرف الصحي':   'var(--ink-600)',
  'دعم مؤسسي':          'var(--sand-500)',
};

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === 'ar';
  const font = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';

  const projects = projectsData as ProjectRecord[];
  const phases   = phasesData  as Phase[];

  const totalProjects = projects.length;
  const totalCost     = projects.reduce((s, p) => s + (p.cost_usd ?? 0), 0);
  const completedPhases = phases.filter(p => p.status === 'completed').length;
  const activePhase     = phases.find(p => p.status === 'active');

  const districtStats = buildDistrictStats(projects);
  const sectorStats   = buildSectorStats(projects);
  const maxSector     = Math.max(...sectorStats.map(s => s.count));

  const KPI_TILES = [
    {
      labelAr: 'إجمالي المشاريع',
      labelEn: 'Total Projects',
      value: totalProjects.toString(),
      accent: 'var(--teal-600)',
    },
    {
      labelAr: 'إجمالي الاستثمار',
      labelEn: 'Total Investment',
      value: `$${(totalCost / 1_000_000).toFixed(1)}M`,
      accent: 'var(--sand-500)',
    },
    {
      labelAr: 'المراحل المكتملة',
      labelEn: 'Phases Complete',
      value: `${completedPhases} / ${phases.length}`,
      accent: 'var(--ink-700)',
    },
    {
      labelAr: 'المديريات المشمولة',
      labelEn: 'Districts Covered',
      value: '8',
      accent: 'var(--teal-500)',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--paper)', padding: '40px 24px' }}>
      <div style={{ maxWidth: 'var(--wrap-max)', margin: '0 auto' }}>

        {/* Page header */}
        <div style={{ marginBottom: '40px' }}>
          <span style={{
            display: 'inline-block',
            fontSize: '11px', fontWeight: '700',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--teal-500)',
            fontFamily: font,
            marginBottom: '8px',
          }}>
            {isAr ? 'نظرة عامة' : 'Overview'}
          </span>
          <h1 style={{
            fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)',
            fontWeight: '700',
            fontSize: 'clamp(26px, 3vw, 40px)',
            color: 'var(--ink-900)',
            marginBottom: '8px',
          }}>
            {isAr ? 'لوحة معلومات AWSP' : 'AWSP Dashboard'}
          </h1>
          <p style={{ fontFamily: font, fontSize: '15px', color: '#6B7280' }}>
            {isAr
              ? 'ملخص تشغيلي لمشاريع وأنشطة برنامج خطة قطاع المياه في عدن'
              : 'Operational summary of AWSP projects and programme activity'}
          </p>
        </div>

        {/* KPI Tiles */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px',
        }}>
          {KPI_TILES.map((tile, i) => (
            <div key={i} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px 20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
              borderTop: `3px solid ${tile.accent}`,
            }}>
              <div style={{
                fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)',
                fontSize: 'clamp(28px, 3vw, 40px)',
                fontWeight: '700',
                color: tile.accent,
                lineHeight: '1.1',
                marginBottom: '8px',
              }}>
                {tile.value}
              </div>
              <div style={{
                fontFamily: font,
                fontSize: '13px',
                color: '#6B7280',
                fontWeight: '500',
              }}>
                {isAr ? tile.labelAr : tile.labelEn}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '24px' }}>

          {/* Phase Progress */}
          <div style={{
            backgroundColor: 'white', borderRadius: '12px', padding: '28px 24px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
          }}>
            <h2 style={{
              fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)',
              fontWeight: '700', fontSize: '18px', color: 'var(--ink-900)',
              marginBottom: '20px',
            }}>
              {isAr ? 'تقدم المراحل' : 'Phase Progress'}
            </h2>

            {/* Progress bar */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                height: '8px', backgroundColor: 'var(--bone)', borderRadius: '4px', overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${(completedPhases / phases.length) * 100}%`,
                  background: 'linear-gradient(90deg, var(--teal-700), var(--teal-500))',
                  borderRadius: '4px',
                  transition: 'width 600ms ease',
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                <span style={{ fontFamily: font, fontSize: '12px', color: 'var(--teal-600)', fontWeight: '600' }}>
                  {completedPhases} {isAr ? 'مكتملة' : 'complete'}
                </span>
                <span style={{ fontFamily: font, fontSize: '12px', color: '#8A9BB0' }}>
                  {phases.length} {isAr ? 'الإجمالي' : 'total'}
                </span>
              </div>
            </div>

            {/* Phase list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {phases.map(phase => (
                <div key={phase.id} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: phase.status === 'active' ? 'rgba(31,122,120,0.06)' : 'transparent',
                }}>
                  <div style={{
                    width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: '700',
                    backgroundColor: phase.status === 'completed' ? 'var(--sand-500)'
                      : phase.status === 'active' ? 'var(--teal-600)'
                      : 'var(--bone)',
                    color: phase.status === 'planned' ? '#8A9BB0' : 'white',
                  }}>
                    {phase.id}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: font, fontSize: '13px', fontWeight: '500',
                      color: 'var(--ink-900)',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {isAr ? phase.name_ar : phase.name_en}
                    </div>
                    <div style={{ fontFamily: font, fontSize: '11px', color: '#8A9BB0' }}>
                      {phase.start_date} — {phase.end_date}
                    </div>
                  </div>
                  <span style={{
                    fontSize: '10px', fontWeight: '600', fontFamily: font,
                    padding: '2px 8px', borderRadius: '100px', flexShrink: 0,
                    backgroundColor: phase.status === 'completed' ? 'rgba(200,137,58,0.10)'
                      : phase.status === 'active' ? 'rgba(31,122,120,0.10)'
                      : 'var(--bone)',
                    color: phase.status === 'completed' ? 'var(--sand-500)'
                      : phase.status === 'active' ? 'var(--teal-600)'
                      : '#8A9BB0',
                  }}>
                    {isAr
                      ? phase.status === 'completed' ? 'مكتملة' : phase.status === 'active' ? 'جارية' : 'مخططة'
                      : phase.status === 'completed' ? 'Done' : phase.status === 'active' ? 'Active' : 'Planned'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sector Breakdown */}
          <div style={{
            backgroundColor: 'white', borderRadius: '12px', padding: '28px 24px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
          }}>
            <h2 style={{
              fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)',
              fontWeight: '700', fontSize: '18px', color: 'var(--ink-900)',
              marginBottom: '20px',
            }}>
              {isAr ? 'توزيع المشاريع حسب القطاع' : 'Projects by Sector'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {sectorStats.map(sector => (
                <div key={sector.ar}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontFamily: font, fontSize: '13px', color: 'var(--ink-900)', fontWeight: '500' }}>
                      {isAr ? sector.ar : sector.en}
                    </span>
                    <span style={{ fontFamily: font, fontSize: '13px', color: '#6B7280', fontWeight: '600' }}>
                      {sector.count}
                    </span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: 'var(--bone)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${(sector.count / maxSector) * 100}%`,
                      backgroundColor: SECTOR_COLORS[sector.ar] ?? 'var(--teal-500)',
                      borderRadius: '3px',
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Health indicators */}
            <div style={{ marginTop: '32px', borderTop: `1px solid var(--line)`, paddingTop: '20px' }}>
              <h3 style={{
                fontFamily: font, fontWeight: '700', fontSize: '14px',
                color: 'var(--ink-900)', marginBottom: '14px',
              }}>
                {isAr ? 'مؤشرات الحالة' : 'Health Indicators'}
              </h3>
              {[
                { labelAr: 'معدل الإنجاز', labelEn: 'Completion Rate', value: '100%', ok: true },
                { labelAr: 'المرحلة النشطة', labelEn: 'Active Phase', value: activePhase ? `P${activePhase.id}` : '—', ok: !!activePhase },
                { labelAr: 'المناطق المشمولة', labelEn: 'Area Coverage', value: '8 / 8', ok: true },
              ].map((ind, idx) => (
                <div key={idx} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: idx < 2 ? `1px solid var(--bone)` : 'none',
                }}>
                  <span style={{ fontFamily: font, fontSize: '13px', color: '#6B7280' }}>
                    {isAr ? ind.labelAr : ind.labelEn}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      backgroundColor: ind.ok ? 'var(--teal-500)' : 'var(--sand-500)',
                    }} />
                    <span style={{ fontFamily: font, fontSize: '13px', fontWeight: '600', color: 'var(--ink-900)' }}>
                      {ind.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* District Table */}
        <div style={{
          backgroundColor: 'white', borderRadius: '12px', padding: '28px 24px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
        }}>
          <h2 style={{
            fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)',
            fontWeight: '700', fontSize: '18px', color: 'var(--ink-900)',
            marginBottom: '20px',
          }}>
            {isAr ? 'المشاريع حسب المديرية' : 'Projects by District'}
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: font }}>
              <thead>
                <tr style={{ borderBottom: `2px solid var(--line)` }}>
                  <th style={{ textAlign: 'start', padding: '10px 12px', fontSize: '12px', fontWeight: '700', color: '#8A9BB0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {isAr ? 'المديرية' : 'District'}
                  </th>
                  <th style={{ textAlign: 'end', padding: '10px 12px', fontSize: '12px', fontWeight: '700', color: '#8A9BB0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {isAr ? 'المشاريع' : 'Projects'}
                  </th>
                  <th style={{ textAlign: 'end', padding: '10px 12px', fontSize: '12px', fontWeight: '700', color: '#8A9BB0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {isAr ? 'الاستثمار (USD)' : 'Investment (USD)'}
                  </th>
                  <th style={{ textAlign: 'start', padding: '10px 12px', fontSize: '12px', fontWeight: '700', color: '#8A9BB0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {isAr ? 'الحصة' : 'Share'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {districtStats.map((dist, idx) => (
                  <tr key={dist.ar} style={{ borderBottom: `1px solid var(--bone)`, backgroundColor: idx % 2 === 0 ? 'white' : 'var(--paper)' }}>
                    <td style={{ padding: '11px 12px', fontSize: '14px', color: 'var(--ink-900)', fontWeight: '500' }}>
                      {isAr ? dist.ar : dist.en}
                    </td>
                    <td style={{ padding: '11px 12px', fontSize: '14px', color: 'var(--ink-900)', fontWeight: '600', textAlign: 'end' }}>
                      {dist.count}
                    </td>
                    <td style={{ padding: '11px 12px', fontSize: '14px', color: '#6B7280', textAlign: 'end' }}>
                      ${(dist.cost / 1_000_000).toFixed(1)}M
                    </td>
                    <td style={{ padding: '11px 12px', minWidth: '120px' }}>
                      <div style={{ height: '5px', backgroundColor: 'var(--bone)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${(dist.count / districtStats[0].count) * 100}%`,
                          backgroundColor: 'var(--teal-500)',
                          borderRadius: '3px',
                        }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
