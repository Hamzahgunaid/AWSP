export default async function LocalePage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  return (
    <main>
      <h1 style={{
        fontFamily: 'Cairo, sans-serif',
        color: '#1A3557',
        padding: '100px 40px',
        textAlign: 'center'
      }}>
        {locale === 'ar'
          ? 'خطة قطاع المياه في عدن'
          : 'Aden Water Sector Plan'}
      </h1>
      <p style={{
        textAlign: 'center',
        color: '#0D7A6E',
        fontFamily: 'Cairo, sans-serif',
        fontSize: '20px'
      }}>
        {locale === 'ar'
          ? 'سيتم إطلاق الموقع قريباً'
          : 'Site launching soon'}
      </p>
      <p style={{ textAlign: 'center', color: '#8A9BB0', fontSize: '12px', marginTop: '40px' }}>
        v1.0 · build 2026-05-22
      </p>
    </main>
  );
}
