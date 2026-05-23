import HeroSection   from '@/components/Home/HeroSection';
import KPIBand       from '@/components/Home/KPIBand';
import PhaseTracker  from '@/components/Home/PhaseTracker';
import PartnerCards  from '@/components/Home/PartnerCards';
import SnapshotCards from '@/components/Home/SnapshotCards';
import NewsStrip     from '@/components/Home/NewsStrip';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <HeroSection   locale={locale} />
      <KPIBand       locale={locale} />
      <PhaseTracker  locale={locale} />
      <PartnerCards  locale={locale} />
      <SnapshotCards locale={locale} />
      <NewsStrip     locale={locale} />
    </>
  );
}
