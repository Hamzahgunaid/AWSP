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
    </main>
  );
}
