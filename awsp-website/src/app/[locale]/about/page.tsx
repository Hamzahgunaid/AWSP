import AboutHero           from '@/components/About/AboutHero';
import AboutSubNav         from '@/components/About/AboutSubNav';
import FrameworkSection    from '@/components/About/FrameworkSection';
import PhasesSection       from '@/components/About/PhasesSection';
import GovernanceSection   from '@/components/About/GovernanceSection';
import StakeholdersSection from '@/components/About/StakeholdersSection';

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
