import taskforceJson from '@/data/taskforce.json';

const DEPT_STYLE: Record<string, { bg: string; color: string }> = {
  MWE:   { bg: 'rgba(42,120,184,0.1)',   color: 'var(--blue-600)' },
  LWSCA: { bg: 'rgba(42,138,138,0.1)',   color: 'var(--teal-700)' },
};

function initials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
}

const ROLES = [
  {
    abbr: 'MWE', titleEn: 'Ministry of Water and Environment', titleAr: 'وزارة المياه والبيئة',
    bg: 'rgba(42,120,184,0.08)', color: 'var(--blue-600)',
    descEn: 'Lead sector institution providing strategic direction, sectoral oversight, and coordination with national frameworks and international agreements.',
    descAr: 'الجهة القائدة للقطاع — توفير التوجيه الاستراتيجي والإشراف على القطاع والتنسيق مع الأطر الوطنية والاتفاقيات الدولية.',
  },
  {
    abbr: 'LWSCA', titleEn: 'Local Water & Sanitation Corporation – Aden', titleAr: 'المؤسسة المحلية للمياه والصرف الصحي – عدن',
    bg: 'rgba(42,138,138,0.08)', color: 'var(--teal-600)',
    descEn: 'Principal service provider contributing operational data, field expertise, and technical input throughout the planning process.',
    descAr: 'مزود الخدمة الرئيسي — تقديم البيانات التشغيلية والخبرة الميدانية والمدخلات التقنية طوال عملية التخطيط.',
  },
  {
    abbr: 'TF', titleEn: 'AWSP Taskforce', titleAr: 'فريق عمل AWSP',
    bg: 'rgba(200,137,58,0.08)', color: 'var(--sand-500)',
    descEn: 'Joint body from MWE and LWSCA fulfilling three roles: Administration, Oversight, and Interface — the operational engine of the planning process.',
    descAr: 'هيئة مشتركة من وزارة المياه والمؤسسة المحلية تضطلع بثلاثة أدوار: الإدارة والإشراف والتواصل — المحرك التشغيلي للعملية.',
  },
];

export default function GovernanceSection({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';
  const serif = isAr ? 'var(--font-arabic)' : 'var(--font-serif)';

  return (
    <section id="governance" style={{ background: 'var(--paper)', padding: '96px 0' }}>
      <div className="wrap">

        {/* Heading */}
        <div style={{ maxWidth: '720px', marginBottom: '64px' }}>
          <span className="eyebrow" style={{ fontFamily: ff }}>
            {isAr ? 'القيادة والإشراف' : 'Leadership & Oversight'}
          </span>
          <h2 style={{ fontFamily: serif, marginTop: '16px', marginBottom: '16px' }}>
            {isAr ? 'الحوكمة وفريق العمل' : 'Governance & Taskforce'}
          </h2>
          <p className="lead" style={{ fontFamily: ff }}>
            {isAr
              ? 'يعتمد التطوير الفعال لخطة AWSP على تعاون قوي بين جميع الجهات المعنية. تقود العملية وزارة المياه والبيئة والمؤسسة المحلية، بدعم من فريق عمل مشترك.'
              : 'Effective development of the AWSP depends on strong collaboration among all actors involved. Leadership rests with MWE and LWSCA, supported by a joint Taskforce drawn from both institutions.'}
          </p>
        </div>

        {/* Role cards */}
        <div className="governance-roles-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px', marginBottom: '80px',
        }}>
          {ROLES.map(role => (
            <div key={role.abbr} style={{
              background: role.bg, border: `1px solid ${role.color}22`,
              borderRadius: 'var(--radius-lg)', padding: '28px',
            }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '48px', height: '48px', borderRadius: '12px',
                background: role.color, color: '#fff',
                fontFamily: ff, fontWeight: '700', fontSize: '13px',
                marginBottom: '16px',
              }}>
                {role.abbr}
              </div>
              <h3 style={{ fontFamily: serif, fontSize: '1.1rem', marginBottom: '10px', color: 'var(--ink-800)' }}>
                {isAr ? role.titleAr : role.titleEn}
              </h3>
              <p style={{ color: 'var(--gray-700)', fontSize: '14px', lineHeight: 1.65, fontFamily: ff }}>
                {isAr ? role.descAr : role.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* Taskforce Members */}
        <h3 style={{ fontFamily: serif, marginBottom: '32px' }}>
          {isAr ? 'أعضاء فريق العمل' : 'Taskforce Members'}
        </h3>
        <div className="taskforce-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
        }}>
          {(taskforceJson as any[]).filter(m => m.active).map((m, i) => {
            const ds = DEPT_STYLE[m.department] || { bg: 'var(--bone)', color: 'var(--gray-500)' };
            return (
              <div key={m.id ?? i} style={{
                background: '#fff', border: '1px solid var(--line)',
                borderRadius: 'var(--radius-lg)', padding: '24px 16px',
                textAlign: 'center',
                transition: 'all 220ms ease',
              }}>
                {/* Avatar */}
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'var(--ink-800)', color: '#fff',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', fontWeight: '700', fontFamily: ff,
                  marginBottom: '14px', border: '3px solid var(--line)',
                }}>
                  {initials(m.name_en)}
                </div>
                <h4 style={{
                  fontFamily: ff, fontSize: '13px', fontWeight: '700',
                  color: 'var(--ink-800)', marginBottom: '4px',
                }}>
                  {isAr ? m.name_ar : m.name_en}
                </h4>
                <p style={{
                  fontFamily: ff, fontSize: '11px', color: 'var(--gray-500)',
                  lineHeight: 1.4, marginBottom: '10px',
                }}>
                  {isAr ? m.title_ar : m.title_en}
                </p>
                <span style={{
                  display: 'inline-block', padding: '2px 10px',
                  borderRadius: 'var(--radius-pill)', fontSize: '11px',
                  fontWeight: '600', fontFamily: ff,
                  background: ds.bg, color: ds.color,
                }}>
                  {m.department}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
