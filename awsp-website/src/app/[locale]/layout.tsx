import type { Metadata } from 'next';
import '../globals.css';
import SiteHeader from '@/components/Layout/SiteHeader';
import SiteFooter from '@/components/Layout/SiteFooter';

export const metadata: Metadata = {
  title: 'Aden Water Sector Plan — AWSP',
  description: 'The official website of the Aden Water Sector Plan.',
};

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return (
    <html
      lang={locale}
      dir={isAr ? 'rtl' : 'ltr'}
      suppressHydrationWarning
    >
      <body>
        <SiteHeader locale={locale} />
        <main style={{
          paddingTop: '64px',
          minHeight: '100vh',
        }}>
          {children}
        </main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
