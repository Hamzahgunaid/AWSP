const OBJECTIVES = [
  {
    num: '01',
    en: 'Provide a Coordinated Framework for Recovery and Investment',
    ar: 'توفير إطار منسق للتعافي والاستثمار',
    descEn: 'Establish a shared platform for national and local sector stakeholders to align government priorities, donor-supported programmes, and public investment in infrastructure rehabilitation and expansion.',
    descAr: 'إنشاء منصة مشتركة لأصحاب المصلحة في القطاع الوطني والمحلي لمواءمة أولويات الحكومة والبرامج المدعومة من المانحين والاستثمار العام في إعادة تأهيل البنية التحتية وتوسيعها.',
  },
  {
    num: '02',
    en: 'Integrate Technical, Financial, Institutional, and Environmental Planning',
    ar: 'دمج التخطيط التقني والمالي والمؤسسي والبيئي',
    descEn: 'Ensure that sector planning comprehensively addresses engineering and infrastructure needs alongside policy reforms, institutional capacity building, tariff structures, and long-term water resource sustainability.',
    descAr: 'ضمان أن يتناول تخطيط القطاع بشكل شامل الاحتياجات الهندسية والبنية التحتية إلى جانب إصلاحات السياسات وبناء القدرات المؤسسية وهياكل التعريفات واستدامة الموارد المائية على المدى البعيد.',
  },
  {
    num: '03',
    en: 'Generate Reliable Data for Evidence-Based Decisions',
    ar: 'توليد بيانات موثوقة للقرارات المبنية على الأدلة',
    descEn: 'Guide the design and execution of data-gathering efforts and technical studies to fill critical information gaps — enhancing the realism, credibility, and responsiveness of all planning outcomes.',
    descAr: 'توجيه تصميم وتنفيذ جهود جمع البيانات والدراسات التقنية لسد الفجوات المعلوماتية الحرجة — وتعزيز واقعية ومصداقية واستجابة جميع مخرجات التخطيط.',
  },
  {
    num: '04',
    en: 'Promote Stakeholder Engagement and Social Accountability',
    ar: 'تعزيز مشاركة أصحاب المصلحة والمساءلة الاجتماعية',
    descEn: 'Create inclusive mechanisms that enable active participation by civil society, local authorities, and citizens throughout the planning process, fostering legitimacy, transparency, and trust.',
    descAr: 'إنشاء آليات شاملة تتيح المشاركة الفعالة للمجتمع المدني والسلطات المحلية والمواطنين طوال عملية التخطيط، وتعزيز الشرعية والشفافية والثقة.',
  },
  {
    num: '05',
    en: 'Advance Climate and Conflict Resilience',
    ar: 'تعزيز الصمود أمام تغير المناخ والنزاعات',
    descEn: 'Embed resilience thinking into planning and decision-making by identifying risks, diversifying water sources, and ensuring service continuity in the face of environmental shocks or institutional instability.',
    descAr: 'دمج التفكير في الصمود في التخطيط وصنع القرار من خلال تحديد المخاطر وتنويع مصادر المياه وضمان استمرارية الخدمات في مواجهة الصدمات البيئية أو عدم الاستقرار المؤسسي.',
  },
];

const PRINCIPLES = [
  { num: '1', en: 'Inclusiveness and Participation',          ar: 'الشمولية والمشاركة' },
  { num: '2', en: 'Local Ownership & Institutional Strength', ar: 'الملكية المحلية والتعزيز المؤسسي' },
  { num: '3', en: 'Evidence-Based Planning',                  ar: 'التخطيط المبني على الأدلة' },
  { num: '4', en: 'Climate and Conflict Resilience',          ar: 'الصمود أمام المناخ والنزاعات' },
  { num: '5', en: 'Financial Sustainability with Equity',     ar: 'الاستدامة المالية مع العدالة' },
  { num: '6', en: 'Transparency and Accountability',         ar: 'الشفافية والمساءلة' },
  { num: '7', en: 'Adaptability and Iterative Planning',     ar: 'التكيف والتخطيط التكراري' },
];

export default function FrameworkSection({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';
  const serif = isAr ? 'var(--font-arabic)' : 'var(--font-serif)';

  return (
    <section id="framework" style={{ background: 'var(--paper)', padding: '96px 0' }}>
      <div className="wrap">

        {/* Section heading */}
        <div style={{ maxWidth: '720px', marginBottom: '64px' }}>
          <span className="eyebrow" style={{ fontFamily: ff }}>
            {isAr ? 'الإطار الاستراتيجي' : 'Strategic Framework'}
          </span>
          <h2 style={{ fontFamily: serif, marginTop: '16px', marginBottom: '24px' }}>
            {isAr ? 'إطار AWSP' : 'The AWSP Framework'}
          </h2>
          <p className="lead" style={{ fontFamily: ff }}>
            {isAr
              ? 'خطة قطاع المياه في عدن هي عملية تخطيط طويلة الأمد ومبنية على الأدلة، تقودها وزارة المياه والبيئة والمؤسسة المحلية للمياه والصرف الصحي في عدن، بدعم تقني من اللجنة الدولية للصليب الأحمر.'
              : 'The Aden Water Sector Plan (AWSP) is a long-term, evidence-based planning process led by the Ministry of Water and Environment and the Local Water and Sanitation Corporation – Aden, with technical support from the International Committee of the Red Cross.'}
          </p>
        </div>

        {/* Vision box */}
        <div style={{
          background: '#fff', border: '1px solid var(--line)',
          borderInlineStart: '4px solid var(--teal-500)',
          borderRadius: 'var(--radius-lg)', padding: '36px',
          marginBottom: '80px', maxWidth: '860px',
        }}>
          <div style={{
            fontSize: '11px', fontWeight: '600', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--teal-600)',
            marginBottom: '16px', fontFamily: ff,
          }}>
            {isAr ? 'رؤية البرنامج' : 'Programme Vision'}
          </div>
          <p style={{
            fontFamily: serif, fontSize: '1.2rem', lineHeight: 1.65,
            color: 'var(--ink-800)', fontStyle: 'italic', marginBottom: '16px',
          }}>
            {isAr
              ? '"تطوير نظام مياه وصرف صحي مستقر ومستدام ومرن مناخياً في عدن، مبني على أسس مؤسسية قوية والشمول الاجتماعي والكفاءة التقنية العالية — يضمن المساواة في الوصول إلى الخدمات والكفاءة في التسليم والإدارة المسؤولة للموارد."'
              : '"To develop a stable, sustainable, and climate-resilient water and sanitation system in Aden, grounded in strong institutional foundations, social inclusion, and high technical competence — ensuring equitable access to services, efficiency in delivery, and responsible resource management, while fostering public trust, protecting public health, and supporting sustainable economic development."'}
          </p>
          <div style={{ fontSize: '13px', color: 'var(--gray-500)', fontFamily: ff }}>
            — {isAr ? 'إطار AWSP، الإصدار ١.٠، يونيو ٢٠٢٥' : 'AWSP Framework, Version 1.0, June 2025'}
          </div>
        </div>

        {/* Strategic Objectives */}
        <h3 style={{ fontFamily: serif, marginBottom: '32px' }}>
          {isAr ? 'الأهداف الاستراتيجية' : 'Strategic Objectives'}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '80px' }}>
          {OBJECTIVES.map(obj => (
            <div key={obj.num} style={{
              display: 'flex', gap: '24px', alignItems: 'flex-start',
              background: '#fff', border: '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)', padding: '28px',
            }}>
              <span style={{
                fontFamily: 'var(--font-serif)', fontSize: '2.5rem',
                fontWeight: '400', color: 'var(--line-2)',
                lineHeight: 1, flexShrink: 0, letterSpacing: '-0.02em',
              }}>
                {obj.num}
              </span>
              <div>
                <h4 style={{ fontFamily: serif, marginBottom: '10px', color: 'var(--ink-800)' }}>
                  {isAr ? obj.ar : obj.en}
                </h4>
                <p style={{ color: 'var(--gray-700)', lineHeight: 1.7, fontSize: '15px', fontFamily: ff }}>
                  {isAr ? obj.descAr : obj.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Guiding Principles */}
        <h3 style={{ fontFamily: serif, marginBottom: '32px' }}>
          {isAr ? 'المبادئ التوجيهية' : 'Guiding Principles'}
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '16px', marginBottom: '64px',
        }}>
          {PRINCIPLES.map(p => (
            <div key={p.num} style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              background: '#fff', border: '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)', padding: '20px 24px',
            }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'var(--ink-800)', color: '#fff',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', fontWeight: '700', fontFamily: ff, flexShrink: 0,
              }}>
                {p.num}
              </div>
              <span style={{
                fontFamily: ff, fontSize: '14px', fontWeight: '600',
                color: 'var(--ink-800)', lineHeight: 1.4,
              }}>
                {isAr ? p.ar : p.en}
              </span>
            </div>
          ))}
        </div>

        {/* Download CTA */}
        <div style={{
          background: 'var(--bone)', border: '1px solid var(--line)',
          borderRadius: 'var(--radius-lg)', padding: '36px 40px',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', gap: '24px', flexWrap: 'wrap',
        }}>
          <div>
            <h4 style={{ fontFamily: serif, marginBottom: '6px' }}>
              {isAr ? 'وثيقة الإطار الكاملة' : 'Full Framework Document'}
            </h4>
            <p style={{ color: 'var(--gray-500)', fontSize: '14px', fontFamily: ff, margin: 0 }}>
              {isAr
                ? 'الإصدار ١.٠ — يونيو ٢٠٢٥ — ٢٨ صفحة — PDF'
                : 'Version 1.0 — June 2025 — 28 pages — PDF'}
            </p>
          </div>
          <a href="/docs/AWSP_Development_Framework.pdf" download
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '14px 24px', fontSize: '15px', fontWeight: '600',
              background: 'var(--ink-800)', color: '#fff',
              borderRadius: 'var(--radius)', border: 'none',
              textDecoration: 'none', fontFamily: ff, flexShrink: 0,
            }}
          >
            {isAr ? 'تحميل الإطار (PDF)' : 'Download Framework (PDF)'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16 }}>
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
