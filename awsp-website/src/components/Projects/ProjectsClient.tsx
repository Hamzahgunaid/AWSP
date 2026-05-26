'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';

const ProjectsMap = dynamic(
  () => import('./ProjectsMap'),
  {
    ssr: false,
    loading: () => (
      <div style={{
        height: '520px', background: 'linear-gradient(180deg,#F4F0E3,#E8DDC2)',
        borderRadius: 'var(--radius-lg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--gray-500)', fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px',
      }}>
        Loading map...
      </div>
    ),
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Project = Record<string, any>;

type ViewMode = 'map' | 'list' | 'analytics';

const DISTRICTS_EN = [
  'Al-Mansoura', 'Al-Buraiqeh', 'Sheikh Othman', 'Khormaksar',
  'Crater', 'Al-Mualla', 'Dar Saad', 'Tawahi',
  'Sirah', 'Water Sources', 'Multi-district',
];

function displayName(p: Project, isAr: boolean): string {
  if (isAr) return p.name_ar || '';
  return p.name_en || `${p.intervention_en} — ${p.district_en} (${p.year})`;
}
function displayDistrict(p: Project, isAr: boolean): string {
  return isAr ? (p.district_ar || '') : (p.district_en || p.district_ar || '');
}
function displaySector(p: Project, isAr: boolean): string {
  if (isAr) return p.intervention_ar || p.sector_ar || '';
  return p.intervention_en || p.sector_en || '';
}
function displayDonor(p: Project, isAr: boolean): string {
  return isAr ? (p.donor_ar || '') : (p.donor_en || p.donor_ar || '');
}

export default function ProjectsClient({
  projects,
  locale,
}: {
  projects: Project[];
  locale: string;
}) {
  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';
  const serif = isAr ? 'var(--font-arabic)' : 'var(--font-serif)';

  const [view, setView]         = useState<ViewMode>('list');
  const [search, setSearch]     = useState('');
  const [district, setDistrict] = useState('');
  const [sector, setSector]     = useState('');
  const [donor, setDonor]       = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo]     = useState('');
  const [sortBy, setSortBy]     = useState<'name'|'cost'|'year'>('name');
  const [page, setPage]         = useState(1);
  const PER_PAGE = 24;

  // Unique filter values from actual data fields
  const interventionTypes = useMemo(() =>
    [...new Set(projects.map(p => p.intervention_en).filter(Boolean))].sort()
  , [projects]);

  const donors = useMemo(() =>
    [...new Set(projects.map(p => p.donor_en).filter(Boolean))].sort()
  , [projects]);

  const years = useMemo(() =>
    [...new Set(projects.map(p => p.year).filter(Boolean))].sort() as number[]
  , [projects]);

  // Filtered + sorted projects
  const filtered = useMemo(() => {
    let out = projects.filter(p => {
      if (search) {
        const q = search.toLowerCase();
        const match =
          (p.name_ar || '').includes(search) ||
          (p.name_en || p.intervention_en || '').toLowerCase().includes(q) ||
          (p.district_ar || '').includes(search) ||
          (p.district_en || '').toLowerCase().includes(q) ||
          (p.donor_ar || '').includes(search) ||
          (p.donor_en || '').toLowerCase().includes(q) ||
          (p.implementer_ar || '').includes(search);
        if (!match) return false;
      }
      if (district && p.district_en !== district) return false;
      if (sector   && p.intervention_en !== sector) return false;
      if (donor    && p.donor_en !== donor) return false;
      if (yearFrom && p.year < parseInt(yearFrom)) return false;
      if (yearTo   && p.year > parseInt(yearTo)) return false;
      return true;
    });

    out = [...out].sort((a, b) => {
      if (sortBy === 'cost') return (b.cost_usd || 0) - (a.cost_usd || 0);
      if (sortBy === 'year') return (b.year || 0) - (a.year || 0);
      return (a.name_ar || '').localeCompare(b.name_ar || '', 'ar');
    });

    return out;
  }, [projects, search, district, sector, donor, yearFrom, yearTo, sortBy]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const resetFilters = () => {
    setSearch(''); setDistrict(''); setSector('');
    setDonor(''); setYearFrom(''); setYearTo('');
    setPage(1);
  };

  const hasFilters = search || district || sector || donor || yearFrom || yearTo;

  const selectStyle: React.CSSProperties = {
    padding: '10px 14px', fontSize: '13px', fontFamily: ff,
    background: '#fff', border: '1px solid var(--line-2)',
    borderRadius: 'var(--radius)', color: 'var(--gray-900)',
    cursor: 'pointer', minWidth: '160px',
  };

  // Analytics computed values
  const byDistrict = useMemo(() => DISTRICTS_EN.map(d => ({
    name: d,
    count: filtered.filter(p => p.district_en === d).length,
    inv: filtered.filter(p => p.district_en === d).reduce((s: number, p) => s + (p.cost_usd || 0), 0),
  })).filter(d => d.count > 0).sort((a, b) => b.count - a.count), [filtered]);

  const byInterventionType = useMemo(() => interventionTypes.map(t => ({
    name: t,
    count: filtered.filter(p => p.intervention_en === t).length,
  })).sort((a, b) => b.count - a.count), [filtered, interventionTypes]);

  const totalInv = filtered.reduce((s: number, p) => s + (p.cost_usd || 0), 0);

  return (
    <section style={{ background: 'var(--paper)', padding: '32px 0 96px' }}>
      <div className="wrap">

        {/* ── Toolbar ── */}
        <div style={{
          background: '#fff', border: '1px solid var(--line)',
          borderRadius: 'var(--radius-lg)', padding: '20px 24px',
          marginBottom: '24px',
          display: 'flex', flexDirection: 'column', gap: '16px',
        }}>
          {/* Top row: search + view toggle */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Search */}
            <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth={2}
                style={{ width: 16, height: 16, position: 'absolute', insetInlineStart: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/>
              </svg>
              <input
                type="text" value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder={isAr ? 'ابحث بالاسم أو المديرية أو المانح...' : 'Search by name, district, or donor...'}
                dir={isAr ? 'rtl' : 'ltr'}
                style={{
                  width: '100%', padding: '10px 14px 10px 36px',
                  fontSize: '14px', fontFamily: ff,
                  background: 'var(--paper)', border: '1px solid var(--line-2)',
                  borderRadius: 'var(--radius)', color: 'var(--gray-900)',
                  outline: 'none',
                }}
              />
            </div>

            {/* Results count */}
            <span style={{ fontSize: '13px', color: 'var(--gray-500)', fontFamily: ff, whiteSpace: 'nowrap' }}>
              {isAr
                ? `${filtered.length} من أصل ${projects.length} مشروع`
                : `${filtered.length} of ${projects.length} projects`}
            </span>

            {/* View toggle */}
            <div style={{ display: 'flex', gap: '4px', background: 'var(--bone)', padding: '4px', borderRadius: 'var(--radius-pill)', flexShrink: 0 }}>
              {([
                { id: 'list',      enLabel: '≡ List',      arLabel: 'قائمة' },
                { id: 'map',       enLabel: '⊕ Map',       arLabel: 'خريطة' },
                { id: 'analytics', enLabel: '▦ Analytics', arLabel: 'تحليلات' },
              ] as const).map(v => (
                <button key={v.id} onClick={() => setView(v.id)}
                  style={{
                    padding: '7px 16px', fontSize: '12px', fontWeight: '600',
                    fontFamily: ff, border: 'none', cursor: 'pointer',
                    borderRadius: 'var(--radius-pill)',
                    background: view === v.id ? '#fff' : 'transparent',
                    color: view === v.id ? 'var(--ink-800)' : 'var(--gray-500)',
                    boxShadow: view === v.id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 150ms ease',
                  }}
                >
                  {isAr ? v.arLabel : v.enLabel}
                </button>
              ))}
            </div>
          </div>

          {/* Filter row */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <select value={district} onChange={e => { setDistrict(e.target.value); setPage(1); }} style={selectStyle} dir="ltr">
              <option value="">{isAr ? 'جميع المديريات' : 'All Districts'}</option>
              {DISTRICTS_EN.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            <select value={sector} onChange={e => { setSector(e.target.value); setPage(1); }} style={selectStyle} dir="ltr">
              <option value="">{isAr ? 'جميع أنواع التدخل' : 'All Intervention Types'}</option>
              {interventionTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <select value={donor} onChange={e => { setDonor(e.target.value); setPage(1); }} style={{ ...selectStyle, minWidth: '200px' }} dir="ltr">
              <option value="">{isAr ? 'جميع المانحين' : 'All Donors'}</option>
              {donors.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            <select value={yearFrom} onChange={e => { setYearFrom(e.target.value); setPage(1); }} style={{ ...selectStyle, minWidth: '110px' }} dir="ltr">
              <option value="">{isAr ? 'من سنة' : 'From Year'}</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>

            <select value={yearTo} onChange={e => { setYearTo(e.target.value); setPage(1); }} style={{ ...selectStyle, minWidth: '110px' }} dir="ltr">
              <option value="">{isAr ? 'إلى سنة' : 'To Year'}</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>

            <select value={sortBy} onChange={e => setSortBy(e.target.value as 'name'|'cost'|'year')} style={{ ...selectStyle, minWidth: '130px' }} dir={isAr?'rtl':'ltr'}>
              <option value="name">{isAr ? 'ترتيب: الاسم' : 'Sort: Name'}</option>
              <option value="cost">{isAr ? 'ترتيب: التكلفة' : 'Sort: Cost'}</option>
              <option value="year">{isAr ? 'ترتيب: السنة' : 'Sort: Year'}</option>
            </select>

            {hasFilters && (
              <button onClick={resetFilters} style={{
                padding: '10px 16px', fontSize: '13px', fontFamily: ff,
                background: 'transparent', border: '1px solid var(--line-2)',
                borderRadius: 'var(--radius)', color: 'var(--gray-500)',
                cursor: 'pointer',
              }}>
                {isAr ? '× مسح الفلاتر' : '× Clear filters'}
              </button>
            )}
          </div>
        </div>

        {/* ── MAP VIEW ── */}
        {view === 'map' && (
          <ProjectsMap
            projects={filtered.filter(p => p.lat && p.lng)}
            locale={locale}
          />
        )}

        {/* ── LIST VIEW ── */}
        {view === 'list' && (
          <>
            {filtered.length === 0 ? (
              <div style={{
                textAlign: 'center', padding: '64px 24px',
                background: '#fff', border: '1px solid var(--line)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <p style={{ fontFamily: ff, color: 'var(--gray-500)', fontSize: '15px' }}>
                  {isAr ? 'لا توجد مشاريع تطابق معايير البحث الحالية.' : 'No projects match the current filters.'}
                </p>
                <button onClick={resetFilters} style={{
                  marginTop: '16px', padding: '10px 24px', fontFamily: ff,
                  background: 'var(--ink-800)', color: '#fff', border: 'none',
                  borderRadius: 'var(--radius)', cursor: 'pointer', fontSize: '14px',
                }}>
                  {isAr ? 'مسح الفلاتر' : 'Clear filters'}
                </button>
              </div>
            ) : (
              <>
                {/* Table header */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr 100px',
                  gap: '12px',
                  padding: '10px 20px',
                  fontSize: '11px', fontWeight: '600',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'var(--gray-400)', fontFamily: ff,
                  borderBottom: '1px solid var(--line-2)',
                  marginBottom: '4px',
                }}>
                  <span>{isAr ? 'المشروع' : 'Project'}</span>
                  <span>{isAr ? 'المديرية' : 'District'}</span>
                  <span>{isAr ? 'نوع التدخل' : 'Intervention'}</span>
                  <span>{isAr ? 'المانح' : 'Donor'}</span>
                  <span style={{ textAlign: 'right' }}>{isAr ? 'التكلفة' : 'Cost'}</span>
                </div>

                {/* Rows */}
                {paginated.map((p, i) => (
                  <div key={p.id} style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr 100px',
                    gap: '12px',
                    padding: '14px 20px',
                    background: i % 2 === 0 ? '#fff' : 'var(--paper)',
                    borderBottom: '1px solid var(--line)',
                    alignItems: 'start',
                    transition: 'background 150ms ease',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--bone)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? '#fff' : 'var(--paper)'}
                  >
                    <div>
                      <div style={{ fontFamily: ff, fontWeight: '600', fontSize: '13px', color: 'var(--ink-800)', marginBottom: '2px', lineHeight: 1.4 }}>
                        {displayName(p, isAr)}
                      </div>
                      <div style={{ fontFamily: ff, fontSize: '11px', color: 'var(--gray-400)' }}>
                        {p.implementer_ar || p.implementer_en || '—'} · {p.year}
                      </div>
                    </div>
                    <span style={{ fontFamily: ff, fontSize: '13px', color: 'var(--gray-700)' }}>
                      {displayDistrict(p, isAr)}
                    </span>
                    <div>
                      <span style={{
                        display: 'inline-block', padding: '2px 8px',
                        borderRadius: 'var(--radius-pill)', fontSize: '11px',
                        fontWeight: '600', fontFamily: ff,
                        background: 'rgba(42,138,138,0.1)', color: 'var(--teal-700)',
                      }}>
                        {displaySector(p, isAr)}
                      </span>
                    </div>
                    <span style={{ fontFamily: ff, fontSize: '12px', color: 'var(--gray-600)', lineHeight: 1.4 }}>
                      {displayDonor(p, isAr)}
                    </span>
                    <span style={{
                      fontFamily: serif, fontSize: '13px',
                      color: 'var(--ink-800)', textAlign: 'right',
                      fontVariantNumeric: 'tabular-nums',
                    }}>
                      {p.cost_usd > 0 ? `$${(p.cost_usd / 1000).toFixed(0)}K` : '—'}
                    </span>
                  </div>
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div style={{
                    display: 'flex', justifyContent: 'center',
                    alignItems: 'center', gap: '8px',
                    marginTop: '32px', flexWrap: 'wrap',
                  }}>
                    <button
                      onClick={() => setPage(prev => Math.max(1, prev - 1))}
                      disabled={page === 1}
                      style={{
                        padding: '8px 16px', fontFamily: ff, fontSize: '13px',
                        background: '#fff', border: '1px solid var(--line-2)',
                        borderRadius: 'var(--radius)', cursor: page === 1 ? 'not-allowed' : 'pointer',
                        color: page === 1 ? 'var(--gray-300)' : 'var(--ink-800)',
                      }}
                    >
                      {isAr ? '→ السابق' : '← Prev'}
                    </button>
                    {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                      const pg = i + 1;
                      return (
                        <button key={pg} onClick={() => setPage(pg)}
                          style={{
                            width: '36px', height: '36px',
                            fontFamily: serif, fontSize: '13px',
                            background: page === pg ? 'var(--ink-800)' : '#fff',
                            color: page === pg ? '#fff' : 'var(--gray-700)',
                            border: '1px solid var(--line-2)',
                            borderRadius: 'var(--radius)',
                            cursor: 'pointer',
                          }}
                        >
                          {pg}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={page === totalPages}
                      style={{
                        padding: '8px 16px', fontFamily: ff, fontSize: '13px',
                        background: '#fff', border: '1px solid var(--line-2)',
                        borderRadius: 'var(--radius)', cursor: page === totalPages ? 'not-allowed' : 'pointer',
                        color: page === totalPages ? 'var(--gray-300)' : 'var(--ink-800)',
                      }}
                    >
                      {isAr ? '← التالي' : 'Next →'}
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* ── ANALYTICS VIEW ── */}
        {view === 'analytics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Summary row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                { labelEn: 'Filtered Projects',  labelAr: 'المشاريع المفلترة', val: filtered.length },
                { labelEn: 'Total Investment',   labelAr: 'إجمالي الاستثمار',  val: `$${(totalInv/1000000).toFixed(1)}M` },
                { labelEn: 'With Coordinates',   labelAr: 'بإحداثيات',          val: `${filtered.filter(p=>p.lat&&p.lng).length}` },
              ].map((t, i) => (
                <div key={i} style={{
                  background: '#fff', border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-lg)', padding: '24px',
                }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: '10px', fontFamily: ff }}>
                    {isAr ? t.labelAr : t.labelEn}
                  </div>
                  <div style={{ fontFamily: serif, fontSize: '2.4rem', fontWeight: '400', color: 'var(--ink-800)', lineHeight: 1 }}>
                    {t.val}
                  </div>
                </div>
              ))}
            </div>

            {/* By district + by intervention type */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
                <h3 style={{ fontFamily: ff, fontSize: '13px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-500)', margin: '0 0 20px' }}>
                  {isAr ? 'حسب المديرية' : 'By District'}
                </h3>
                {byDistrict.map(d => (
                  <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <span style={{ fontFamily: ff, fontSize: '13px', color: 'var(--ink-800)', width: '130px', flexShrink: 0 }}>{d.name}</span>
                    <div style={{ flex: 1, height: '8px', background: 'var(--bone)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: '999px', background: 'var(--teal-500)',
                        width: `${Math.round((d.count / (byDistrict[0]?.count || 1)) * 100)}%`,
                        transition: 'width 600ms ease',
                      }} />
                    </div>
                    <span style={{ fontFamily: serif, fontSize: '13px', color: 'var(--ink-800)', width: '28px', textAlign: 'right', flexShrink: 0 }}>{d.count}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
                <h3 style={{ fontFamily: ff, fontSize: '13px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-500)', margin: '0 0 20px' }}>
                  {isAr ? 'حسب نوع التدخل' : 'By Intervention Type'}
                </h3>
                {byInterventionType.map(t => (
                  <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <span style={{ fontFamily: ff, fontSize: '12px', color: 'var(--ink-800)', flex: 1 }}>{t.name}</span>
                    <div style={{ width: '100px', height: '8px', background: 'var(--bone)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: '999px', background: 'var(--sand-400)',
                        width: `${Math.round((t.count / (byInterventionType[0]?.count || 1)) * 100)}%`,
                        transition: 'width 600ms ease',
                      }} />
                    </div>
                    <span style={{ fontFamily: serif, fontSize: '13px', color: 'var(--ink-800)', width: '28px', textAlign: 'right', flexShrink: 0 }}>{t.count}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
