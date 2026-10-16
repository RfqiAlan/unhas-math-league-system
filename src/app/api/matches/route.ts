import { NextRequest, NextResponse } from 'next/server';
import { saveMatch, deleteMatch } from '@/lib/server-store';
import { LigaType, Pertandingan } from '@/types/league';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { liga, match } = body as { liga: LigaType; match: Pertandingan };

    if (!liga || !match || !match.pekan) {
      return NextResponse.json({ success: false, error: 'Data pertandingan tidak lengkap' }, { status: 400 });
    }

    const result = await saveMatch(liga, match);
    return NextResponse.json({ success: true, id: result.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const liga = (searchParams.get('liga') || 'mcl') as LigaType;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID pertandingan wajib diberikan' }, { status: 400 });
    }

    await deleteMatch(liga, id);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
