export default async function NewsPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  return (
    <main style={{ padding: '100px 40px', textAlign: 'center' }}>
      <p style={{ color: '#1A3557', fontFamily: 'Cairo, sans-serif' }}>
        {locale === 'ar' ? 'الأخبار والفعاليات' : 'News & Events'} — Under Construction
      </p>
    </main>
  );
}
