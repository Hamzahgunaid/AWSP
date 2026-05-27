import type { Metadata } from 'next';
import '../globals.css';
import SiteHeader from '@/components/Layout/SiteHeader';
import SiteFooter from '@/components/Layout/SiteFooter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return {
    metadataBase: new URL('https://awsp-six.vercel.app'),
    title: {
      default: isAr
        ? 'خطة قطاع المياه في عدن — AWSP'
        : 'Aden Water Sector Plan — AWSP',
      template: '%s — AWSP',
    },
    description: isAr
      ? 'الموقع الرسمي لخطة قطاع المياه في عدن — ١٩٤ مشروعاً عبر ٨ مديريات، ١٢ مرحلة تخطيطية، يوليو ٢٠٢٥ إلى يناير ٢٠٢٩.'
      : 'Official website of the Aden Water Sector Plan — 194 projects across 8 districts, 12 planning phases, July 2025 to January 2029.',
    keywords: [
      'Aden Water Sector Plan', 'AWSP', 'Yemen water', 'WASH Yemen',
      'Ministry of Water Environment Yemen', 'LWSCA', 'water sanitation Aden',
      'خطة قطاع المياه', 'عدن', 'وزارة المياه والبيئة',
    ],
    authors: [{ name: 'AWSP Taskforce' }],
    creator: 'Ministry of Water and Environment, Republic of Yemen',
    publisher: 'AWSP Taskforce',
    openGraph: {
      type: 'website',
      locale: isAr ? 'ar_YE' : 'en_US',
      alternateLocale: isAr ? 'en_US' : 'ar_YE',
      siteName: 'AWSP — Aden Water Sector Plan',
      title: isAr ? 'خطة قطاع المياه في عدن' : 'Aden Water Sector Plan',
      description: isAr
        ? 'الموقع الرسمي لخطة قطاع المياه في عدن'
        : 'Official website of the Aden Water Sector Plan',
      images: [{
        url: '/images/awsp-logo-mark.png',
        width: 96, height: 96,
        alt: 'AWSP Logo',
      }],
    },
    twitter: {
      card: 'summary',
      title: 'Aden Water Sector Plan — AWSP',
      description: 'Official website of the Aden Water Sector Plan',
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true },
    },
    alternates: {
      canonical: `https://awsp-six.vercel.app/${locale}`,
      languages: {
        'ar': 'https://awsp-six.vercel.app/ar',
        'en': 'https://awsp-six.vercel.app/en',
      },
    },
  };
}

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
    <html lang={locale} dir={isAr ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body>
        <SiteHeader locale={locale} />
        <main style={{ paddingTop: 'var(--header-h)', minHeight: '100vh' }}>
          {children}
        </main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
