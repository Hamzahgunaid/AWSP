import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import AdminShell from '@/components/Admin/AdminShell';
import TaskforceEditor from '@/components/Admin/TaskforceEditor';
import taskforceData from '@/data/taskforce.json';

export default async function AdminTaskforceMemberPage({
  params,
}: { params: Promise<{ id: string }> }) {
  const session = await getServerSession();
  if (!session) redirect('/admin/login');

  const { id } = await params;
  const member = id === 'new'
    ? null
    : (taskforceData as any[]).find(m => m.id === id) ?? null;

  return (
    <AdminShell>
      <TaskforceEditor member={member} isNew={id === 'new'} />
    </AdminShell>
  );
}
