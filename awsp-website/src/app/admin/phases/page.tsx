import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminShell from '@/components/Admin/AdminShell';
import phasesData from '@/data/phases.json';
import PhaseStatusEditor from '@/components/Admin/PhaseStatusEditor';

export const dynamic = 'force-dynamic';

export default async function AdminPhasesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  return (
    <AdminShell>
      <div style={{ maxWidth: '900px' }}>
        <h1 style={{ fontFamily: 'Source Serif 4, serif', fontSize: '26px', fontWeight: '400', color: '#0E2A47', marginBottom: '6px' }}>
          Phase Status
        </h1>
        <p style={{ fontSize: '13px', color: '#6B6B6B', marginBottom: '28px' }}>
          Update the planning phase statuses. Changes are written to phases.json and reflected immediately on the Dashboard and About pages.
        </p>
        <PhaseStatusEditor initialPhases={phasesData} />
      </div>
    </AdminShell>
  );
}
