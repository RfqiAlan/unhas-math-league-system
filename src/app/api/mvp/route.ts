import { NextRequest, NextResponse } from 'next/server';
import { saveMvp } from '@/lib/server-store';
import { LigaType, MvpPekan } from '@/types/league';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { liga, mvp } = body as { liga: LigaType; mvp: MvpPekan };

    if (!liga || !mvp || !mvp.nama) {
      return NextResponse.json({ success: false, error: 'Data MVP tidak lengkap' }, { status: 400 });
    }

    await saveMvp(liga, mvp);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
