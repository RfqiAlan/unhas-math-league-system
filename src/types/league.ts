export type LigaType = 'mcl' | 'mrl';
export type LigaCode = 'MCL' | 'MRL';

export interface Peserta {
  id: string;
  nama: string;
  liga: LigaCode;
  tahun: number;
}

export type MatchType = 'reguler' | 'wo1' | 'wo2';

export interface Pertandingan {
  id: string;
  tipe: MatchType;
  pekan: number;
  liga: LigaCode;
  tahun: number;
  // Reguler
  a?: string;
  b?: string;
  skorA?: number;
  skorB?: number;
  benarA?: number;
  benarB?: number;
  // WO Sepihak
  hadir?: string;
  absen?: string;
  skor?: number;
  benar?: number;
  createdAt?: string;
}

export interface Juara {
  id?: string;
  liga: LigaCode;
  peringkat: 1 | 2 | 3;
  nama: string;
  foto?: string;
  tahun: number;
}

export interface MvpPekan {
  id?: string;
  liga: LigaCode;
  nama: string;
  foto?: string;
  posX: number;
  posY: number;
  skala: number;
  pekan: number;
  tahun: number;
  catatan?: string;
}

export interface StandingsRow {
  nama: string;
  main: number;
  menang: number;
  seri: number;
  kalah: number;
  poin: number;
  benar: number;
  skorTotal: number;
  penaltiTertunda: number;
  terakhir: 'W' | 'S' | 'K' | null;
}

export interface LeagueDataSet {
  peserta: string[];
  pertandingan: Pertandingan[];
  juara: Record<number, { nama: string; foto?: string }>;
  mvp: MvpPekan | null;
  klasemen: StandingsRow[];
}
