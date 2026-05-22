export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return (
    <div
      lang={locale}
      dir={isAr ? 'rtl' : 'ltr'}
      style={{ minHeight: '100vh', paddingTop: '64px' }}
    >
      {children}
    </div>
  );
}
