import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/data/documents.json');

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
  const raw = await fs.readFile(DATA_PATH, 'utf-8');
  const data = JSON.parse(raw);

  const newDoc = {
    id: `doc-${String(data.length + 1).padStart(3, '0')}`,
    ...body,
  };
  data.push(newDoc);
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
  return NextResponse.json(newDoc, { status: 201 });
}
