export default function LocalePage({
  params
}: {
  params: { locale: 'ar' | 'en' }
}) {
  return (
    <main>
      <h1 style={{
        fontFamily: 'Cairo, sans-serif',
        color: '#1A3557',
        padding: '100px 40px',
        textAlign: 'center'
      }}>
        {params.locale === 'ar'
          ? 'خطة قطاع المياه في عدن — قيد الإنشاء'
          : 'Aden Water Sector Plan — Under Construction'}
      </h1>
      <p style={{
        textAlign: 'center',
        color: '#0D7A6E',
        fontFamily: 'Cairo, sans-serif'
      }}>
        {params.locale === 'ar'
          ? 'سيتم إطلاق الموقع قريباً'
          : 'Site launching soon — Step 2 in progress'}
      </p>
    </main>
  );
}
