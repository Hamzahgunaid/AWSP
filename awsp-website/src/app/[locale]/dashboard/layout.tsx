import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Programme Dashboard',
  description: 'Live snapshot of the Aden Water Sector Plan — KPIs, phase progress, district map, investment trends.',
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
