const TASKFORCE = [
  { nameEn: 'Abdullah Al-Hasani',  nameAr: 'عبدالله الحسني',   titleEn: 'Procurement Manager',                          titleAr: 'مدير المشتريات',                     dept: 'MWE' },
  { nameEn: 'Amal Al-Saqqaf',      nameAr: 'أمل الصقاف',       titleEn: 'Head of Administrative Department and HR',      titleAr: 'رئيسة القسم الإداري والموارد البشرية', dept: 'LWSCA' },
  { nameEn: 'Anjila Issa',          nameAr: 'أنجيلا عيسى',      titleEn: 'WASH Coordinator Aden HUB',                    titleAr: 'منسقة WASH مركز عدن',                dept: 'MWE' },
  { nameEn: 'Arzaq Al-Aqrabi',     nameAr: 'أرزاق العقربي',    titleEn: 'General Manager UW-PMU',                       titleAr: 'المدير العام UW-PMU',                dept: 'MWE' },
  { nameEn: 'Hikmat Faris',         nameAr: 'حكمت فارس',        titleEn: 'Planning Department',                          titleAr: 'قسم التخطيط',                        dept: 'LWSCA' },
  { nameEn: 'Hussam Ghaithan',      nameAr: 'حسام غيثان',       titleEn: 'Head of Emergency Unit',                       titleAr: 'رئيس وحدة الطوارئ',                  dept: 'MWE' },
  { nameEn: 'Nagween Atta',         nameAr: 'نجوى عطا',         titleEn: 'Head of Coordination Department',              titleAr: 'رئيسة قسم التنسيق',                  dept: 'LWSCA' },
  { nameEn: 'Naif bin Shaiban',     nameAr: 'نايف بن شيبان',    titleEn: 'Financial Manager',                            titleAr: 'المدير المالي',                      dept: 'MWE' },
  { nameEn: 'Marwa Ali',            nameAr: 'مروى علي',          titleEn: 'Technical Officer',                            titleAr: 'ضابطة تقنية',                        dept: 'MWE' },
  { nameEn: 'Muhammad Ismail',      nameAr: 'محمد إسماعيل',     titleEn: 'IT and Data Management',                       titleAr: 'تقنية المعلومات وإدارة البيانات',    dept: 'MWE' },
  { nameEn: 'Reem Al-Dabai',        nameAr: 'ريم الدبعي',        titleEn: 'Manager of Water Studies Department',          titleAr: 'مديرة قسم الدراسات المائية',         dept: 'LWSCA' },
  { nameEn: 'Yusra Ali',            nameAr: 'يسرى علي',          titleEn: 'Assistant to National WASH Cluster Coordinator', titleAr: 'مساعدة منسق كتلة WASH الوطنية',  dept: 'MWE' },
  { nameEn: 'Wahib bin Saeed',      nameAr: 'وهيب بن سعيد',     titleEn: 'Head of Statistics Department',                titleAr: 'رئيس قسم الإحصاء',                   dept: 'LWSCA' },
  { nameEn: 'Azah Al-Mass',         nameAr: 'عزة الماس',         titleEn: 'Engineer / Purchasing Management',             titleAr: 'مهندسة / إدارة المشتريات',           dept: 'LWSCA' },
  { nameEn: 'Sanaa Naji',           nameAr: 'سناء ناجي',         titleEn: "Secretary of the Director General's Office",   titleAr: 'سكرتيرة مكتب المدير العام',          dept: 'LWSCA' },
];

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
          {TASKFORCE.map((m, i) => {
            const ds = DEPT_STYLE[m.dept] || { bg: 'var(--bone)', color: 'var(--gray-500)' };
            return (
              <div key={i} style={{
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
                  {initials(m.nameEn)}
                </div>
                <h4 style={{
                  fontFamily: ff, fontSize: '13px', fontWeight: '700',
                  color: 'var(--ink-800)', marginBottom: '4px',
                }}>
                  {isAr ? m.nameAr : m.nameEn}
                </h4>
                <p style={{
                  fontFamily: ff, fontSize: '11px', color: 'var(--gray-500)',
                  lineHeight: 1.4, marginBottom: '10px',
                }}>
                  {isAr ? m.titleAr : m.titleEn}
                </p>
                <span style={{
                  display: 'inline-block', padding: '2px 10px',
                  borderRadius: 'var(--radius-pill)', fontSize: '11px',
                  fontWeight: '600', fontFamily: ff,
                  background: ds.bg, color: ds.color,
                }}>
                  {m.dept}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
