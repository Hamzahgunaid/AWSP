export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  return (
    <main style={{ padding: '100px 40px', textAlign: 'center' }}>
      <p style={{ color: '#1A3557', fontFamily: 'Cairo, sans-serif' }}>
        {locale === 'ar' ? 'عن البرنامج' : 'About the Programme'} — Under Construction
      </p>
    </main>
  );
}
