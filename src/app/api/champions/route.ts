import { NextRequest, NextResponse } from 'next/server';
import { saveJuara } from '@/lib/server-store';
import { LigaType } from '@/types/league';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { liga, peringkat, nama, foto } = body as {
      liga: LigaType;
      peringkat: 1 | 2 | 3;
      nama: string;
      foto?: string;
    };

    if (!liga || !peringkat || !nama) {
      return NextResponse.json({ success: false, error: 'Data juara tidak lengkap' }, { status: 400 });
    }

    await saveJuara(liga, peringkat, nama, foto);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
