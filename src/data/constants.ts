import { LigaType, Pertandingan, StandingsRow } from '@/types/league';

export const TAHUN_DEFAULT = 2026;

export const DEFAULT_PESERTA = {
  mcl: [
    'eiphi',
    '(a+bi)GÆL',
    'π Radian',
    'Arsya',
    'qwerty',
    'Kumiko',
    'rquartz',
    'Shiro',
    'mr. sawa ito',
    'Ken'
  ],
  mrl: [
    'Elrick',
    'AwanGg',
    'zky.ga',
    'ε<0',
    'kyou',
    'Senku 297',
    'Jual cherry',
    'Myth',
    'LUTHFI^x',
    'Meanrey'
  ]
};

export const TANGGAL_PEKAN: Record<LigaType, Record<number, string>> = {
  mcl: {
    1: '5 September 2026',
    2: '11 September 2026',
    3: '18 September 2026',
    4: '25 September 2026',
    5: '16 Oktober 2026',
    6: '23 Oktober 2026',
    7: '30 Oktober 2026',
    8: '6 November 2026',
    9: '13 November 2026'
  },
  mrl: {
    1: '5 September 2026',
    2: '9 September 2026',
    3: '16 September 2026',
    4: '23 September 2026',
    5: '14 Oktober 2026',
    6: '21 Oktober 2026',
    7: '28 Oktober 2026',
    8: '4 November 2026',
    9: '11 November 2026'
  }
};

export const JAM_PEKAN = '16.00 WITA';

export const JADWAL: Record<LigaType, Record<number, [string, string][]>> = {
  mcl: {
    1: [['eiphi', '(a+bi)GÆL'], ['π Radian', 'Arsya'], ['qwerty', 'Kumiko'], ['rquartz', 'Shiro'], ['mr. sawa ito', 'Ken']],
    2: [['Ken', 'π Radian'], ['Shiro', 'eiphi'], ['Kumiko', 'rquartz'], ['Arsya', 'qwerty'], ['(a+bi)GÆL', 'mr. sawa ito']],
    3: [['eiphi', 'Kumiko'], ['qwerty', 'Ken'], ['rquartz', 'Arsya'], ['mr. sawa ito', 'π Radian'], ['(a+bi)GÆL', 'Shiro']],
    4: [['Arsya', 'eiphi'], ['Kumiko', '(a+bi)GÆL'], ['Shiro', 'mr. sawa ito'], ['Ken', 'rquartz'], ['π Radian', 'qwerty']],
    5: [['rquartz', 'π Radian'], ['mr. sawa ito', 'qwerty'], ['eiphi', 'Ken'], ['(a+bi)GÆL', 'Arsya'], ['Shiro', 'Kumiko']],
    6: [['Kumiko', 'mr. sawa ito'], ['Arsya', 'Shiro'], ['Ken', '(a+bi)GÆL'], ['π Radian', 'eiphi'], ['qwerty', 'rquartz']],
    7: [['mr. sawa ito', 'rquartz'], ['eiphi', 'qwerty'], ['(a+bi)GÆL', 'π Radian'], ['Shiro', 'Ken'], ['Kumiko', 'Arsya']],
    8: [['Ken', 'Kumiko'], ['Arsya', 'mr. sawa ito'], ['π Radian', 'Shiro'], ['qwerty', '(a+bi)GÆL'], ['rquartz', 'eiphi']],
    9: [['Shiro', 'qwerty'], ['(a+bi)GÆL', 'rquartz'], ['mr. sawa ito', 'eiphi'], ['Kumiko', 'π Radian'], ['Arsya', 'Ken']]
  },
  mrl: {
    1: [['Elrick', 'AwanGg'], ['zky.ga', 'ε<0'], ['kyou', 'Senku 297'], ['Jual cherry', 'Myth'], ['LUTHFI^x', 'Meanrey']],
    2: [['Meanrey', 'zky.ga'], ['Myth', 'Elrick'], ['Senku 297', 'Jual cherry'], ['ε<0', 'kyou'], ['AwanGg', 'LUTHFI^x']],
    3: [['Elrick', 'Senku 297'], ['kyou', 'Meanrey'], ['Jual cherry', 'ε<0'], ['LUTHFI^x', 'zky.ga'], ['AwanGg', 'Myth']],
    4: [['ε<0', 'Elrick'], ['Senku 297', 'AwanGg'], ['Myth', 'LUTHFI^x'], ['Meanrey', 'Jual cherry'], ['zky.ga', 'kyou']],
    5: [['Jual cherry', 'zky.ga'], ['LUTHFI^x', 'kyou'], ['Elrick', 'Meanrey'], ['AwanGg', 'ε<0'], ['Myth', 'Senku 297']],
    6: [['Senku 297', 'LUTHFI^x'], ['ε<0', 'Myth'], ['Meanrey', 'AwanGg'], ['zky.ga', 'Elrick'], ['kyou', 'Jual cherry']],
    7: [['LUTHFI^x', 'Jual cherry'], ['Elrick', 'kyou'], ['AwanGg', 'zky.ga'], ['Myth', 'Meanrey'], ['Senku 297', 'ε<0']],
    8: [['Meanrey', 'Senku 297'], ['ε<0', 'LUTHFI^x'], ['zky.ga', 'Myth'], ['kyou', 'AwanGg'], ['Jual cherry', 'Elrick']],
    9: [['Myth', 'kyou'], ['AwanGg', 'Jual cherry'], ['LUTHFI^x', 'Elrick'], ['Senku 297', 'zky.ga'], ['ε<0', 'Meanrey']]
  }
};

export function hitungKlasemen(pesertaList: string[], matches: Pertandingan[], maxPekan?: number): StandingsRow[] {
  const map: Record<string, StandingsRow> = {};

  (pesertaList || []).forEach(nama => {
    map[nama] = {
      nama,
      main: 0,
      menang: 0,
      seri: 0,
      kalah: 0,
      poin: 0,
      benar: 0,
      skorTotal: 0,
      penaltiTertunda: 0,
      terakhir: null
    };
  });

  const sorted = [...(matches || [])]
    .filter(m => maxPekan === undefined || m.pekan <= maxPekan)
    .sort((a, b) => a.pekan - b.pekan);

  sorted.forEach(m => {
    if (m.tipe === 'reguler' && m.a && m.b) {
      const A = map[m.a];
      const B = map[m.b];
      if (!A || !B) return;

      const skorAeff = (m.skorA ?? 0) - A.penaltiTertunda;
      const skorBeff = (m.skorB ?? 0) - B.penaltiTertunda;
      A.penaltiTertunda = 0;
      B.penaltiTertunda = 0;

      A.main++;
      B.main++;
      A.benar += m.benarA ?? 0;
      B.benar += m.benarB ?? 0;
      A.skorTotal += m.skorA ?? 0;
      B.skorTotal += m.skorB ?? 0;

      if (skorAeff > skorBeff) {
        A.menang++;
        A.poin += 3;
        B.kalah++;
        A.terakhir = 'W';
        B.terakhir = 'K';
      } else if (skorBeff > skorAeff) {
        B.menang++;
        B.poin += 3;
        A.kalah++;
        B.terakhir = 'W';
        A.terakhir = 'K';
      } else {
        A.seri++;
        B.seri++;
        A.poin += 1;
        B.poin += 1;
        A.terakhir = 'S';
        B.terakhir = 'S';
      }
    } else if (m.tipe === 'wo1') {
      const H = m.hadir ? map[m.hadir] : undefined;
      const Ab = m.absen ? map[m.absen] : undefined;

      if (H) {
        H.penaltiTertunda = 0;
        H.main++;
        H.menang++;
        H.poin += 3;
        H.benar += m.benar ?? 0;
        H.skorTotal += m.skor ?? 0;
        H.terakhir = 'W';
      }
      if (Ab) {
        Ab.main++;
        Ab.kalah++;
        Ab.penaltiTertunda = 50; // Denda -50 poin untuk duel berikutnya
        Ab.terakhir = 'K';
      }
    } else if (m.tipe === 'wo2' && m.a && m.b) {
      const A = map[m.a];
      const B = map[m.b];

      if (A) {
        A.main++;
        A.seri++;
        A.poin += 1;
        A.penaltiTertunda = 50;
        A.terakhir = 'S';
      }
      if (B) {
        B.main++;
        B.seri++;
        B.poin += 1;
        B.penaltiTertunda = 50;
        B.terakhir = 'S';
      }
    }
  });

  return Object.values(map).sort((a, b) => {
    if (b.poin !== a.poin) return b.poin - a.poin;
    if (b.benar !== a.benar) return b.benar - a.benar; // Soal Benar adalah Tie-Breaker Utama
    if (b.skorTotal !== a.skorTotal) return b.skorTotal - a.skorTotal;
    return a.nama.localeCompare(b.nama);
  });
}
