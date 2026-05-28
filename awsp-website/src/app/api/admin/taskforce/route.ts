import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/data/taskforce.json');

function readData() {
  return JSON.parse(readFileSync(DATA_PATH, 'utf-8'));
}
function writeData(data: unknown[]) {
  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(readData());
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const data = readData();
  body.id = `tf-${Date.now()}`;
  data.push(body);
  writeData(data);
  return NextResponse.json({ ok: true, id: body.id });
}
