import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/data/taskforce.json');

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const raw = await fs.readFile(DATA_PATH, 'utf-8');
  return NextResponse.json(JSON.parse(raw));
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  if (!body.name_en?.trim() || !body.name_ar?.trim()) {
    return NextResponse.json({ error: 'name_en and name_ar are required' }, { status: 400 });
  }

  const raw = await fs.readFile(DATA_PATH, 'utf-8');
  const data = JSON.parse(raw);

  const existing = data.find((m: { id: string }) => m.id === body.id);
  if (existing) {
    return NextResponse.json({ error: 'ID already exists' }, { status: 409 });
  }

  const newMember = {
    id: body.id || `tf-${String(data.length + 1).padStart(3, '0')}`,
    name_en: body.name_en,
    name_ar: body.name_ar,
    title_en: body.title_en ?? '',
    title_ar: body.title_ar ?? '',
    department: body.department ?? 'MWE',
    email: body.email ?? '',
    phone: body.phone ?? '',
    active: body.active ?? true,
  };
  data.push(newMember);
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
  return NextResponse.json(newMember, { status: 201 });
}
