import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'الأخبار والفعاليات' : 'News & Events',
    description: isAr
      ? 'آخر تحديثات برنامج AWSP ومعالم المراحل وفعاليات أصحاب المصلحة.'
      : 'Latest AWSP programme updates, phase milestones, and stakeholder events.',
  };
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
