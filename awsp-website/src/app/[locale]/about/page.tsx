import type { Metadata } from 'next';
import AboutHero           from '@/components/About/AboutHero';
import AboutSubNav         from '@/components/About/AboutSubNav';
import FrameworkSection    from '@/components/About/FrameworkSection';
import PhasesSection       from '@/components/About/PhasesSection';
import GovernanceSection   from '@/components/About/GovernanceSection';
import StakeholdersSection from '@/components/About/StakeholdersSection';

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'عن البرنامج' : 'About the Programme',
    description: isAr
      ? 'إطار AWSP وأهدافه الاستراتيجية ومراحله الإثنتي عشرة وهيكل الحوكمة وأصحاب المصلحة.'
      : 'The AWSP framework, strategic objectives, twelve planning phases, governance structure, and stakeholders.',
  };
}

export default async function AboutPage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <>
      <AboutHero           locale={locale} />
      <AboutSubNav         locale={locale} />
      <FrameworkSection    locale={locale} />
      <PhasesSection       locale={locale} />
      <GovernanceSection   locale={locale} />
      <StakeholdersSection locale={locale} />
    </>
  );
}
