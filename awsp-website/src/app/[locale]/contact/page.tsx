import type { Metadata } from 'next';
import ContactHero  from '@/components/Contact/ContactHero';
import ContactCards from '@/components/Contact/ContactCards';
import ContactForm  from '@/components/Contact/ContactForm';

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'التواصل' : 'Contact',
    description: isAr
      ? 'تواصل مع فريق عمل AWSP — استفسارات المانحين والشركاء والباحثين.'
      : 'Contact the AWSP Taskforce — enquiries from donors, partners, and researchers.',
  };
}

export default async function ContactPage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <ContactHero  locale={locale} />
      <ContactCards locale={locale} />
      <ContactForm  locale={locale} />
    </>
  );
}
