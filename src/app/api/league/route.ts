import { NextRequest, NextResponse } from 'next/server';
import { getLeagueData } from '@/lib/server-store';
import { LigaType } from '@/types/league';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ligaParam = (searchParams.get('liga') || 'mcl').toLowerCase() as LigaType;
    const liga: LigaType = ligaParam === 'mrl' ? 'mrl' : 'mcl';

    const data = await getLeagueData(liga);
    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
