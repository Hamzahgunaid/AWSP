import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/data/phases.json');

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { status } = await req.json();

  if (!['planned', 'active', 'completed'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const raw = await fs.readFile(DATA_PATH, 'utf-8');
  const data = JSON.parse(raw);
  const idx = data.findIndex((p: { id: number }) => String(p.id) === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  data[idx].status = status;
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
  return NextResponse.json(data[idx]);
}
