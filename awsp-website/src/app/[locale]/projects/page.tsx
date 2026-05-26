import projectsData from '@/data/projects.json';
import ProjectsHero   from '@/components/Projects/ProjectsHero';
import ProjectsClient from '@/components/Projects/ProjectsClient';

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
