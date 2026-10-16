import fs from 'fs';
import path from 'path';
import { LigaType, Pertandingan, MvpPekan, LeagueDataSet } from '@/types/league';
import { hitungKlasemen, DEFAULT_PESERTA } from '@/data/constants';
import { supabaseAdmin } from './supabase';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

interface StoredLeague {
  peserta: string[];
  pertandingan: Pertandingan[];
  juara: Record<number, { nama: string; foto?: string }>;
  mvp: MvpPekan | null;
}

interface StoredDb {
  mcl: StoredLeague;
  mrl: StoredLeague;
}

function readLocalDb(): StoredDb {
  try {
    if (fs.existsSync(DB_PATH)) {
      const content = fs.readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading local db:', err);
  }

  return {
    mcl: {
      peserta: [...DEFAULT_PESERTA.mcl],
      pertandingan: [],
      juara: {},
      mvp: null
    },
    mrl: {
      peserta: [...DEFAULT_PESERTA.mrl],
      pertandingan: [],
      juara: {},
      mvp: null
    }
  };
}

function writeLocalDb(data: StoredDb) {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing local db:', err);
  }
}

export async function getLeagueData(liga: LigaType): Promise<LeagueDataSet> {
  const localDb = readLocalDb();
  const ligaData = localDb[liga] || {
    peserta: [...DEFAULT_PESERTA[liga]],
    pertandingan: [],
    juara: {},
    mvp: null
  };

  // Attempt reading fresh data from Supabase if reachable
  try {
    const kode = liga === 'mcl' ? 'MCL' : 'MRL';
    const [{ data: pData }, { data: mData }, { data: jData }, { data: mvpData }] = await Promise.all([
      supabaseAdmin.from('peserta').select('*').eq('liga', kode),
      supabaseAdmin.from('pertandingan').select('*').eq('liga', kode),
      supabaseAdmin.from('juara').select('*').eq('liga', kode),
      supabaseAdmin.from('mvp_pekan').select('*').eq('liga', kode).order('created_at', { ascending: false }).limit(1)
    ]);

    if (pData && pData.length > 0) {
      const mergedPeserta = Array.from(new Set([...ligaData.peserta, ...pData.map(p => p.nama)]));
      ligaData.peserta = mergedPeserta;
    }

    if (mData && mData.length > 0) {
      // Map Supabase rows if any
      mData.forEach(m => {
        const id = String(m.id);
        if (!ligaData.pertandingan.some(ex => ex.id === id)) {
          if (m.status === 'reguler') {
            ligaData.pertandingan.push({
              id,
              tipe: 'reguler',
              pekan: m.pekan,
              liga: kode,
              tahun: m.tahun || 2026,
              a: m.peserta_a,
              b: m.peserta_b,
              skorA: m.skor_a,
              skorB: m.skor_b,
              benarA: m.soal_benar_a,
              benarB: m.soal_benar_b
            });
          }
        }
      });
    }

    if (jData && jData.length > 0) {
      jData.forEach(j => {
        ligaData.juara[j.peringkat] = { nama: j.nama, foto: j.foto || '' };
      });
    }

    if (mvpData && mvpData.length > 0) {
      const row = mvpData[0];
      ligaData.mvp = {
        liga: kode,
        nama: row.nama,
        foto: row.foto || '',
        posX: row.pos_x ?? 88,
        posY: row.pos_y ?? 60,
        skala: row.skala ?? 115,
        pekan: row.pekan || 1,
        tahun: row.tahun || 2026,
        catatan: row.catatan || ''
      };
    }
  } catch (supabaseErr) {
    // Graceful fallback to local db
    console.warn('Supabase read skipped, using server local store:', supabaseErr);
  }

  const klasemen = hitungKlasemen(ligaData.peserta, ligaData.pertandingan);

  return {
    peserta: ligaData.peserta,
    pertandingan: ligaData.pertandingan,
    juara: ligaData.juara,
    mvp: ligaData.mvp,
    klasemen
  };
}

export async function saveMatch(liga: LigaType, match: Pertandingan): Promise<{ success: boolean; id: string; error?: string }> {
  const localDb = readLocalDb();
  if (!match.id) {
    match.id = 'match_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  }

  // Update or insert in local db
  const existingIdx = localDb[liga].pertandingan.findIndex(m => m.id === match.id);
  if (existingIdx >= 0) {
    localDb[liga].pertandingan[existingIdx] = match;
  } else {
    localDb[liga].pertandingan.push(match);
  }
  writeLocalDb(localDb);

  // Try sync with Supabase
  try {
    const kode = liga === 'mcl' ? 'MCL' : 'MRL';
    await supabaseAdmin.from('pertandingan').upsert({
      liga: kode,
      pekan: match.pekan,
      tahun: match.tahun || 2026,
      status: match.tipe,
      skor_a: match.skorA,
      skor_b: match.skorB,
      soal_benar_a: match.benarA,
      soal_benar_b: match.benarB
    });
  } catch (err) {
    console.warn('Supabase sync notice (saved to server store):', err);
  }

  return { success: true, id: match.id };
}

export async function deleteMatch(liga: LigaType, matchId: string): Promise<boolean> {
  const localDb = readLocalDb();
  localDb[liga].pertandingan = localDb[liga].pertandingan.filter(m => m.id !== matchId);
  writeLocalDb(localDb);

  try {
    await supabaseAdmin.from('pertandingan').delete().eq('id', matchId);
  } catch (err) {
    console.warn('Supabase delete skipped:', err);
  }

  return true;
}

export async function saveMvp(liga: LigaType, mvp: MvpPekan): Promise<{ success: boolean }> {
  const localDb = readLocalDb();
  localDb[liga].mvp = mvp;
  writeLocalDb(localDb);

  try {
    const kode = liga === 'mcl' ? 'MCL' : 'MRL';
    await supabaseAdmin.from('mvp_pekan').upsert({
      liga: kode,
      nama: mvp.nama,
      foto: mvp.foto,
      pos_x: mvp.posX,
      pos_y: mvp.posY,
      skala: mvp.skala,
      pekan: mvp.pekan,
      tahun: mvp.tahun || 2026,
      catatan: mvp.catatan
    });
  } catch (err) {
    console.warn('Supabase MVP sync notice (saved to server store):', err);
  }

  return { success: true };
}

export async function saveJuara(
  liga: LigaType,
  peringkat: 1 | 2 | 3,
  nama: string,
  foto?: string
): Promise<{ success: boolean }> {
  const localDb = readLocalDb();
  if (!localDb[liga].juara) {
    localDb[liga].juara = {};
  }
  localDb[liga].juara[peringkat] = { nama, foto: foto || '' };
  writeLocalDb(localDb);

  try {
    const kode = liga === 'mcl' ? 'MCL' : 'MRL';
    await supabaseAdmin.from('juara').upsert({
      liga: kode,
      peringkat,
      nama,
      foto: foto || '',
      tahun: 2026
    });
  } catch (err) {
    console.warn('Supabase Juara sync notice (saved to server store):', err);
  }

  return { success: true };
}

export async function addPeserta(liga: LigaType, nama: string): Promise<boolean> {
  const localDb = readLocalDb();
  if (!localDb[liga].peserta.includes(nama)) {
    localDb[liga].peserta.push(nama);
    writeLocalDb(localDb);
  }
  return true;
}

export async function deletePeserta(liga: LigaType, nama: string): Promise<boolean> {
  const localDb = readLocalDb();
  localDb[liga].peserta = localDb[liga].peserta.filter(n => n !== nama);
  writeLocalDb(localDb);
  return true;
}
