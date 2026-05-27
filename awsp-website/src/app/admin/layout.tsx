import type { Metadata } from 'next';
import '../globals.css';
import AdminProviders from '@/components/Admin/AdminProviders';

export const metadata: Metadata = {
  title: 'AWSP Admin — Content Management',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body style={{ margin: 0, background: '#F4F6F8', fontFamily: 'Source Sans 3, system-ui, sans-serif' }}>
        <AdminProviders>{children}</AdminProviders>
      </body>
    </html>
  );
}
