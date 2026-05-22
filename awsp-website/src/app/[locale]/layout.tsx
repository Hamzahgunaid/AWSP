import type { Metadata } from 'next';
import { Cairo, Noto_Naskh_Arabic, Source_Serif_4, Source_Sans_3 } from 'next/font/google';
import '../globals.css';
import SiteHeader from '@/components/Layout/SiteHeader';
import SiteFooter from '@/components/Layout/SiteFooter';

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  variable: '--font-noto-naskh',
  subsets: ['arabic'],
  weight: ['400'],
});

const sourceSerif4 = Source_Serif_4({
  variable: '--font-source-serif',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const sourceSans3 = Source_Sans_3({
  variable: '--font-source-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

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
      className={`${cairo.variable} ${notoNaskhArabic.variable} ${sourceSerif4.variable} ${sourceSans3.variable}`}
    >
      <body>
        <SiteHeader locale={locale} />
        <main style={{ paddingTop: '64px', minHeight: '100vh' }}>
          {children}
        </main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
