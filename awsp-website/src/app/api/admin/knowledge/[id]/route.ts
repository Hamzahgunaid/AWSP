import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/data/documents.json');

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const raw = await fs.readFile(DATA_PATH, 'utf-8');
  const data = JSON.parse(raw);
  const doc = data.find((d: { id: string }) => d.id === id);
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(doc);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const raw = await fs.readFile(DATA_PATH, 'utf-8');
  const data = JSON.parse(raw);
  const idx = data.findIndex((d: { id: string }) => d.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  data[idx] = { ...data[idx], ...body };
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
  return NextResponse.json(data[idx]);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const raw = await fs.readFile(DATA_PATH, 'utf-8');
  const data = JSON.parse(raw);
  const filtered = data.filter((d: { id: string }) => d.id !== id);
  if (filtered.length === data.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  await fs.writeFile(DATA_PATH, JSON.stringify(filtered, null, 2), 'utf-8');
  return NextResponse.json({ ok: true });
}
