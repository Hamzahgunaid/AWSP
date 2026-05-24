'use client';

import { useState } from 'react';

const CATEGORIES = [
  { id: 'public-sector',        en: 'Public Sector',        ar: 'القطاع العام' },
  { id: 'donor',                en: 'Donors & Funders',     ar: 'الجهات المانحة' },
  { id: 'development-partner',  en: 'Development Partners', ar: 'شركاء التنمية' },
  { id: 'civil-society',        en: 'Civil Society & NGOs', ar: 'المجتمع المدني' },
  { id: 'private-sector',       en: 'Private Sector',       ar: 'القطاع الخاص' },
  { id: 'academic',             en: 'Academic & Research',  ar: 'الأكاديمي والبحثي' },
];

const STAKEHOLDERS = [
  { en: 'Ministry of Water and Environment', ar: 'وزارة المياه والبيئة', abbr: 'MWE', cat: 'public-sector', level: 'national' },
  { en: 'Local Water & Sanitation Corporation – Aden', ar: 'المؤسسة المحلية للمياه والصرف الصحي – عدن', abbr: 'LWSCA', cat: 'public-sector', level: 'local' },
  { en: 'National Water Resources Authority', ar: 'الهيئة العامة للموارد المائية', abbr: 'NWRA', cat: 'public-sector', level: 'national' },
  { en: 'Aden Local Council', ar: 'المجلس المحلي لعدن', abbr: '', cat: 'public-sector', level: 'local' },
  { en: 'World Bank', ar: 'البنك الدولي', abbr: 'WB', cat: 'donor', level: 'international' },
  { en: 'USAID', ar: 'الوكالة الأمريكية للتنمية الدولية', abbr: 'USAID', cat: 'donor', level: 'international' },
  { en: 'Kuwait Fund for Arab Economic Development', ar: 'الصندوق الكويتي للتنمية الاقتصادية العربية', abbr: 'KFAED', cat: 'donor', level: 'international' },
  { en: 'German Development Bank', ar: 'البنك الألماني للتنمية', abbr: 'KFW', cat: 'donor', level: 'international' },
  { en: 'UAE Direct Support', ar: 'الدعم الإماراتي المباشر', abbr: 'UAE', cat: 'donor', level: 'international' },
  { en: 'Saudi Development and Reconstruction Program for Yemen', ar: 'برنامج إعادة إعمار اليمن', abbr: 'SDRPY', cat: 'donor', level: 'international' },
  { en: 'International Committee of the Red Cross', ar: 'اللجنة الدولية للصليب الأحمر', abbr: 'ICRC', cat: 'development-partner', level: 'international' },
  { en: 'UNICEF', ar: 'منظمة الأمم المتحدة للطفولة', abbr: 'UNICEF', cat: 'development-partner', level: 'international' },
  { en: 'UNDP', ar: 'برنامج الأمم المتحدة الإنمائي', abbr: 'UNDP', cat: 'development-partner', level: 'international' },
  { en: 'UN-Habitat', ar: 'برنامج الأمم المتحدة للمستوطنات البشرية', abbr: 'UN-Habitat', cat: 'development-partner', level: 'international' },
  { en: 'UNOPS', ar: 'مكتب الأمم المتحدة لخدمات المشاريع', abbr: 'UNOPS', cat: 'development-partner', level: 'international' },
  { en: 'CARE International', ar: 'منظمة كير الدولية', abbr: 'CARE', cat: 'civil-society', level: 'international' },
  { en: 'OXFAM', ar: 'منظمة أوكسفام', abbr: 'OXFAM', cat: 'civil-society', level: 'international' },
  { en: 'ZOA International', ar: 'منظمة ZOA الدولية', abbr: 'ZOA', cat: 'civil-society', level: 'international' },
  { en: 'Triangle Generation Humanitaire', ar: 'منظمة تراينغل الإنسانية', abbr: 'TGH', cat: 'civil-society', level: 'international' },
  { en: 'GFA Consulting Group', ar: 'مجموعة GFA الاستشارية', abbr: 'GFA', cat: 'private-sector', level: 'international' },
  { en: 'Engicon Engineering', ar: 'إنجيكون للهندسة', abbr: 'Engicon', cat: 'private-sector', level: 'national' },
];

export default function StakeholdersSection({ locale }: { locale: string }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';
  const serif = isAr ? 'var(--font-arabic)' : 'var(--font-serif)';

  const filtered = STAKEHOLDERS.filter(s => {
    const matchCat = !activeCategory || s.cat === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !search
      || s.en.toLowerCase().includes(q)
      || s.ar.includes(search)
      || s.abbr.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <section id="stakeholders" style={{ background: 'var(--bone)', padding: '96px 0' }}>
      <div className="wrap">

        <div style={{ maxWidth: '720px', marginBottom: '48px' }}>
          <span className="eyebrow" style={{ fontFamily: ff }}>
            {isAr ? 'المشاركون في البرنامج' : 'Programme Participants'}
          </span>
          <h2 style={{ fontFamily: serif, marginTop: '16px', marginBottom: '16px' }}>
            {isAr ? 'أصحاب المصلحة' : 'Stakeholders'}
          </h2>
          <p className="lead" style={{ fontFamily: ff }}>
            {isAr
              ? 'يشمل AWSP طيفاً واسعاً من الجهات الفاعلة الأساسية لتحويل قطاع المياه والصرف الصحي في عدن.'
              : "The AWSP engages a broad spectrum of actors essential to the transformation of Aden's water and sanitation sector."}
          </p>
        </div>

        {/* Search */}
        <div style={{ marginBottom: '24px', maxWidth: '480px' }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={isAr ? 'ابحث بالاسم أو الاختصار...' : 'Search by name or abbreviation...'}
            dir={isAr ? 'rtl' : 'ltr'}
            style={{
              width: '100%', padding: '12px 16px',
              fontFamily: ff, fontSize: '14px',
              background: '#fff', border: '1px solid var(--line-2)',
              borderRadius: 'var(--radius)', color: 'var(--gray-900)',
              outline: 'none', transition: 'border-color 160ms ease',
            }}
          />
        </div>

        {/* Category filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
          <button
            onClick={() => setActiveCategory(null)}
            style={{
              padding: '6px 16px', borderRadius: 'var(--radius-pill)',
              border: `2px solid ${!activeCategory ? 'var(--ink-800)' : 'var(--line-2)'}`,
              background: !activeCategory ? 'var(--ink-800)' : '#fff',
              color: !activeCategory ? '#fff' : 'var(--gray-500)',
              fontFamily: ff, fontSize: '13px', fontWeight: '600', cursor: 'pointer',
            }}
          >
            {isAr ? `الكل (${STAKEHOLDERS.length})` : `All (${STAKEHOLDERS.length})`}
          </button>
          {CATEGORIES.map(cat => {
            const count = STAKEHOLDERS.filter(s => s.cat === cat.id).length;
            const isActive = activeCategory === cat.id;
            return (
              <button key={cat.id}
                onClick={() => setActiveCategory(isActive ? null : cat.id)}
                style={{
                  padding: '6px 16px', borderRadius: 'var(--radius-pill)',
                  border: `2px solid ${isActive ? 'var(--teal-500)' : 'var(--line-2)'}`,
                  background: isActive ? 'var(--teal-500)' : '#fff',
                  color: isActive ? '#fff' : 'var(--gray-500)',
                  fontFamily: ff, fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                }}
              >
                {isAr ? cat.ar : cat.en} ({count})
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <p style={{ fontFamily: ff, fontSize: '13px', color: 'var(--gray-500)', marginBottom: '24px' }}>
          {isAr
            ? `عرض ${filtered.length} من أصل ${STAKEHOLDERS.length} جهة`
            : `Showing ${filtered.length} of ${STAKEHOLDERS.length} stakeholders`}
        </p>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '16px',
        }}>
          {filtered.map((s, i) => (
            <div key={i} style={{
              background: '#fff', border: '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)', padding: '20px',
              transition: 'all 220ms ease',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                {s.abbr && (
                  <span style={{
                    fontFamily: ff, fontWeight: '700', fontSize: '12px',
                    color: 'var(--teal-600)', background: 'rgba(42,138,138,0.1)',
                    padding: '2px 8px', borderRadius: 'var(--radius-sm)',
                  }}>
                    {s.abbr}
                  </span>
                )}
                <span style={{
                  fontFamily: ff, fontSize: '11px', color: 'var(--gray-400)',
                  marginInlineStart: 'auto',
                }}>
                  {s.level === 'international' ? (isAr ? 'دولي' : 'International')
                    : s.level === 'national' ? (isAr ? 'وطني' : 'National')
                    : (isAr ? 'محلي' : 'Local')}
                </span>
              </div>
              <h4 style={{
                fontFamily: ff, fontWeight: '600', fontSize: '13px',
                color: 'var(--ink-800)', lineHeight: 1.5,
              }}>
                {isAr ? s.ar : s.en}
              </h4>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
