export default async function Page({
  params
}: {
  params: Promise<{ locale: 'ar' | 'en' }>
}) {
  const { locale } = await params;
  return <main><h1>{locale}</h1></main>;
}
