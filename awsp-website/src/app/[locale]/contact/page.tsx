import ContactHero  from '@/components/Contact/ContactHero';
import ContactCards from '@/components/Contact/ContactCards';
import ContactForm  from '@/components/Contact/ContactForm';

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
