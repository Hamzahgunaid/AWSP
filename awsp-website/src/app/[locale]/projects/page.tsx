import type { Metadata } from 'next';
import projectsData from '@/data/projects.json';
import ProjectsHero   from '@/components/Projects/ProjectsHero';
import ProjectsClient from '@/components/Projects/ProjectsClient';

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'مشاريعنا' : 'Our Projects',
    description: isAr
      ? '١٩٤ مشروعاً للبنية التحتية عبر مديريات عدن الثماني — تصفح حسب الموقع أو القطاع أو المانح.'
      : "194 infrastructure projects across Aden's eight districts — browse by location, sector, or donor.",
  };
}

export default async function ProjectsPage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <>
      <ProjectsHero locale={locale} />
      <ProjectsClient
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        projects={projectsData as any[]}
        locale={locale}
      />
    </>
  );
}
