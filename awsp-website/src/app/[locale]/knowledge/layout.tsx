import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'المنتجات المعرفية' : 'Knowledge Products',
    description: isAr
      ? 'الدراسات التشخيصية وأطر التخطيط والمبادئ التوجيهية التقنية من برنامج AWSP.'
      : 'Diagnostic studies, planning frameworks, and technical guidelines from the AWSP programme.',
  };
}

export default function KnowledgeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
