export default async function ContactPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  return (
    <main style={{ padding: '100px 40px', textAlign: 'center' }}>
      <p style={{ color: '#1A3557', fontFamily: 'Cairo, sans-serif' }}>
        {locale === 'ar' ? 'التواصل والمشاركة' : 'Contact & Engage'} — Under Construction
      </p>
    </main>
  );
}
