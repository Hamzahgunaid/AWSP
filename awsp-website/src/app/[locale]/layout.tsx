import { Cairo, Noto_Naskh_Arabic, Source_Serif_4, Source_Sans_3 } from "next/font/google";
import "@/styles/tokens.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  variable: "--font-noto-naskh",
  subsets: ["arabic"],
  weight: ["400"],
});

const sourceSerif4 = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

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
    <html
      lang={locale}
      dir={isAr ? 'rtl' : 'ltr'}
      className={`${cairo.variable} ${notoNaskhArabic.variable} ${sourceSerif4.variable} ${sourceSans3.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
        <main style={{ paddingTop: '64px', minHeight: '100vh' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
