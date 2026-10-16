import { NextRequest, NextResponse } from 'next/server';
import { addPeserta, deletePeserta } from '@/lib/server-store';
import { LigaType } from '@/types/league';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { liga, nama, action } = body as { liga: LigaType; nama: string; action?: 'add' | 'delete' };

    if (!liga || !nama) {
      return NextResponse.json({ success: false, error: 'Data peserta tidak lengkap' }, { status: 400 });
    }

    if (action === 'delete') {
      await deletePeserta(liga, nama.trim());
    } else {
      await addPeserta(liga, nama.trim());
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
