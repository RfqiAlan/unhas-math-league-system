'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function GuideBookPage() {
  const [activeTab, setActiveTab] = useState<'format' | 'skor' | 'wo' | 'tiebreaker' | 'simulator'>('format');

  // Simulator state
  const [simBenarA, setSimBenarA] = useState(6);
  const [simSkorA, setSimSkorA] = useState(120);
  const [simDendaA, setSimDendaA] = useState(0);

  const [simBenarB, setSimBenarB] = useState(4);
  const [simSkorB, setSimSkorB] = useState(80);
  const [simDendaB, setSimDendaB] = useState(0);

  const effA = simSkorA - simDendaA;
  const effB = simSkorB - simDendaB;

  let simHasil = 'DUEL SERI (+1 Poin Klasemen untuk kedua peserta)';
  let colorHasil = 'var(--status-draw)';
  if (effA > effB) {
    simHasil = 'PESERTA A MENANG (+3 Poin Klasemen)';
    colorHasil = 'var(--status-win)';
  } else if (effB > effA) {
    simHasil = 'PESERTA B MENANG (+3 Poin Klasemen)';
    colorHasil = 'var(--status-win)';
  }

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '90px' }}>
      {/* Top Bar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(9, 3, 5, 0.94)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-subtle)',
        height: '66px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none'
          }}>
            <div style={{
              position: 'relative',
              width: '36px',
              height: '36px',
              borderRadius: '6px',
              overflow: 'hidden',
              border: '1px solid var(--border-primary)',
              background: '#000',
              flexShrink: 0
            }}>
              <Image src="/assets/pkm-logo.jpg" alt="Logo PKM" fill style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: '#fff', fontSize: '0.98rem' }}>
                BUKU PEDOMAN RESMI <span style={{ color: 'var(--championship-gold)' }}>MATH LEAGUE</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.64rem', color: 'var(--text-muted)' }}>
                PKM FMIPA UNIVERSITAS HASANUDDIN
              </div>
            </div>
          </Link>

          <Link href="/" className="btn-league btn-league-primary btn-league-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Kembali ke Portal Klasemen
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container" style={{ marginTop: '36px' }}>
        {/* Document Header Box */}
        <div className="league-card" style={{
          padding: '36px',
          marginBottom: '32px',
          borderLeft: '4px solid var(--unhas-crimson-light)',
          background: 'linear-gradient(135deg, rgba(26, 9, 13, 0.95) 0%, rgba(12, 4, 6, 0.98) 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="league-badge league-badge-gold">DOKUMEN REGULASI RESMI</span>
            <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              EDISI MUSIM 2026
            </span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.15,
            letterSpacing: '-0.03em'
          }}>
            Regulasi Kompetisi Cerdas Cermat Matematika
          </h1>
          <p style={{
            color: 'var(--text-secondary)',
            marginTop: '10px',
            fontSize: '0.95rem',
            maxWidth: '780px',
            lineHeight: 1.6
          }}>
            Pedoman teknis resmi penyelenggaraan liga cerdas cermat matematika Pusat Konsultasi Matematika (PKM)
            FMIPA Universitas Hasanuddin. Memuat regulasi pertandingan, sistem poin, penalti walkover, dan hierarki tie-breaker.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '4px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '12px',
          marginBottom: '28px',
          overflowX: 'auto'
        }}>
          <button
            onClick={() => setActiveTab('format')}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-xs)',
              border: activeTab === 'format' ? '1px solid var(--border-gold)' : '1px solid transparent',
              background: activeTab === 'format' ? 'var(--unhas-crimson)' : 'transparent',
              color: activeTab === 'format' ? '#fff' : 'var(--text-muted)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Bab I: Format &amp; Divisi
          </button>
          <button
            onClick={() => setActiveTab('skor')}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-xs)',
              border: activeTab === 'skor' ? '1px solid var(--border-gold)' : '1px solid transparent',
              background: activeTab === 'skor' ? 'var(--unhas-crimson)' : 'transparent',
              color: activeTab === 'skor' ? '#fff' : 'var(--text-muted)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Bab II: Sistem Skor Duel
          </button>
          <button
            onClick={() => setActiveTab('wo')}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-xs)',
              border: activeTab === 'wo' ? '1px solid var(--border-gold)' : '1px solid transparent',
              background: activeTab === 'wo' ? 'var(--unhas-crimson)' : 'transparent',
              color: activeTab === 'wo' ? '#fff' : 'var(--text-muted)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Bab III: Regulasi Walkover (WO)
          </button>
          <button
            onClick={() => setActiveTab('tiebreaker')}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-xs)',
              border: activeTab === 'tiebreaker' ? '1px solid var(--border-gold)' : '1px solid transparent',
              background: activeTab === 'tiebreaker' ? 'var(--unhas-crimson)' : 'transparent',
              color: activeTab === 'tiebreaker' ? '#fff' : 'var(--text-muted)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Bab IV: Hierarki Tie-Breaker
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-xs)',
              border: activeTab === 'simulator' ? '1px solid var(--border-gold)' : '1px solid transparent',
              background: activeTab === 'simulator' ? 'var(--unhas-crimson)' : 'transparent',
              color: activeTab === 'simulator' ? '#fff' : 'var(--text-muted)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Lampiran: Simulator Skor Interaktif
          </button>
        </div>

        {/* TAB 1: FORMAT */}
        {activeTab === 'format' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
            <div className="league-card" style={{ padding: '28px' }}>
              <div className="league-badge league-badge-gold" style={{ marginBottom: '10px' }}>
                DIVISI UTAMA &bull; PREMIERE TIER
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#fff' }}>
                Mathematics Champions League (MCL)
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '8px', lineHeight: 1.6 }}>
                Kompetisi kasta utama yang mempertemukan 10 peserta terbaik dari angkatan senior dan pemenang jalur seleksi ketat.
              </p>
              <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Ketentuan Bertanding:
                </div>
                <ul style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', marginTop: '8px', paddingLeft: '18px', lineHeight: 1.8 }}>
                  <li>Format: Round-Robin penuh (9 pekan pertandingan).</li>
                  <li>Jadwal Resmi: Setiap Jumat, Pukul 16.00 WITA.</li>
                  <li>Tempat: Ruang Diskusi PKM FMIPA UNHAS.</li>
                  <li>Juara 1-3 berhak atas Trofi &amp; Medali Kehormatan FMIPA.</li>
                </ul>
              </div>
            </div>

            <div className="league-card" style={{ padding: '28px' }}>
              <div className="league-badge league-badge-crimson" style={{ marginBottom: '10px' }}>
                DIVISI ROOKIE &bull; DEVELOPMENT TIER
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#fff' }}>
                Mathematics Rookie League (MRL)
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '8px', lineHeight: 1.6 }}>
                Kompetisi kasta pengembangan yang dirancang untuk mengasah ketajaman analisa, kalkulus dasar, dan kecepatan duel bagi mahasiswa tingkat muda.
              </p>
              <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Ketentuan Bertanding:
                </div>
                <ul style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', marginTop: '8px', paddingLeft: '18px', lineHeight: 1.8 }}>
                  <li>Format: Round-Robin penuh (9 pekan pertandingan).</li>
                  <li>Jadwal Resmi: Setiap Rabu, Pukul 16.00 WITA.</li>
                  <li>Tempat: Ruang Diskusi PKM FMIPA UNHAS.</li>
                  <li>Pemenang berhak atas tiket kualifikasi promosi ke MCL musim depan.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SKOR */}
        {activeTab === 'skor' && (
          <div className="league-card" style={{ padding: '32px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>
              Bab II: Sistem Penilaian Pertandingan &amp; Poin Klasemen
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginBottom: '24px' }}>
              Setiap pertandingan duel mempertemukan 2 peserta secara langsung dalam menjawab paket soal matematika dengan sistem waktu.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
              <div style={{ background: 'var(--surface-input)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '18px', borderRadius: 'var(--radius-xs)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--status-win)', fontWeight: 800, fontSize: '1.15rem' }}>
                  MENANG: +3 POIN
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  Diberikan kepada peserta yang memiliki skor akhir efektif lebih tinggi dari lawan tanding.
                </div>
              </div>

              <div style={{ background: 'var(--surface-input)', border: '1px solid rgba(148, 163, 184, 0.3)', padding: '18px', borderRadius: 'var(--radius-xs)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--status-draw)', fontWeight: 800, fontSize: '1.15rem' }}>
                  SERI: +1 POIN
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  Diberikan kepada kedua peserta apabila perolehan skor akhir efektif sama imbang.
                </div>
              </div>

              <div style={{ background: 'var(--surface-input)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '18px', borderRadius: 'var(--radius-xs)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--status-loss)', fontWeight: 800, fontSize: '1.15rem' }}>
                  KALAH: 0 POIN
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  Peserta tidak mendapatkan poin klasemen jika skor akhir efektif lebih rendah dari lawan.
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--championship-gold-light)', fontSize: '1rem', marginBottom: '8px' }}>
                Penghitungan Soal Benar (SB):
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.6 }}>
                Setiap solusi matematika yang dinyatakan valid oleh dewan juri PKM bernilai 1 poin Soal Benar.
                Akumulasi Soal Benar (SB) memegang peranan krusial sebagai <b>kriteria tie-breaker utama</b> apabila terdapat poin klasemen yang sama antar peserta.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: WO */}
        {activeTab === 'wo' && (
          <div className="league-card" style={{ padding: '32px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>
              Bab III: Regulasi Walkover (WO) &amp; Penalti Tertunda
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginBottom: '24px' }}>
              Kepatuhan terhadap jadwal duel sangat ditegakkan untuk menjaga sportivitas dan integritas kompetisi.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              <div style={{ background: 'var(--surface-input)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '22px' }}>
                <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--championship-gold-light)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '8px' }}>
                  Pasal 1: WO Sepihak (Satu Peserta Absen)
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Apabila salah satu peserta tidak hadir setelah toleransi 15 menit, maka peserta yang hadir dinyatakan sebagai pemenang duel (Menang, +3 Poin Klasemen).
                </p>
                <div style={{
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  padding: '12px',
                  borderRadius: 'var(--radius-xs)',
                  marginTop: '14px',
                  fontSize: '0.8rem',
                  color: '#fca5a5'
                }}>
                  <b>Sanksi Disiplin:</b> Peserta yang mangkir dinyatakan Kalah (0 Poin) dan dijatuhi <b>Penalti Tertunda -50 Poin Skor</b> yang langsung memotong skor kotor pada laga duel pekan berikutnya.
                </div>
              </div>

              <div style={{ background: 'var(--surface-input)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '22px' }}>
                <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--status-loss)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '8px' }}>
                  Pasal 2: WO Ganda (Kedua Peserta Absen)
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Apabila kedua peserta tidak hadir tanpa konfirmasi sah, pertandingan dinyatakan selesai dengan status Seri (+1 Poin Klasemen untuk masing-masing).
                </p>
                <div style={{
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  padding: '12px',
                  borderRadius: 'var(--radius-xs)',
                  marginTop: '14px',
                  fontSize: '0.8rem',
                  color: '#fca5a5'
                }}>
                  <b>Sanksi Disiplin:</b> Kedua peserta masing-masing dijatuhi <b>Penalti Tertunda -50 Poin Skor</b> yang langsung memotong perolehan skor pada duel pekan selanjutnya.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TIE-BREAKER */}
        {activeTab === 'tiebreaker' && (
          <div className="league-card" style={{ padding: '32px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>
              Bab IV: Hierarki Tie-Breaker Penentu Peringkat Klasemen
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginBottom: '24px' }}>
              Apabila terdapat dua atau lebih peserta yang memiliki total poin klasemen identik pada akhir pekan pertandingan,
              urutan klasemen ditentukan secara otomatis berdasarkan urutan kriteria berikut:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: 'var(--surface-input)', border: '1px solid var(--border-gold)', padding: '16px 20px', borderRadius: 'var(--radius-xs)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 900, color: 'var(--championship-gold-light)', minWidth: '40px' }}>
                  01
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#fff', fontSize: '0.98rem' }}>
                    Total Poin Klasemen (PTS)
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Akumulasi poin menang (+3) dan poin seri (+1).
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--surface-input)', border: '1px solid var(--border-subtle)', padding: '16px 20px', borderRadius: 'var(--radius-xs)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-secondary)', minWidth: '40px' }}>
                  02
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#fff', fontSize: '0.98rem' }}>
                    Total Soal Benar (SB) &mdash; Kriteria Utama
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Peserta dengan akumulasi jumlah soal dijawab dengan benar terbanyak mendapatkan prioritas peringkat lebih tinggi.
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--surface-input)', border: '1px solid var(--border-subtle)', padding: '16px 20px', borderRadius: 'var(--radius-xs)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-secondary)', minWidth: '40px' }}>
                  03
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#fff', fontSize: '0.98rem' }}>
                    Total Skor Matematika
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Akumulasi seluruh nilai poin matematika yang dikumpulkan dari seluruh laga duel.
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--surface-input)', border: '1px solid var(--border-subtle)', padding: '16px 20px', borderRadius: 'var(--radius-xs)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-secondary)', minWidth: '40px' }}>
                  04
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#fff', fontSize: '0.98rem' }}>
                    Urutan Alfabetis Nama Peserta
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Urutan leksikografis nama peserta secara ascending (A ke Z).
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="league-card" style={{ padding: '32px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>
              Lampiran: Simulator Perhitungan Skor Duel &amp; Poin Klasemen
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginBottom: '24px' }}>
              Gunakan kalkulator interaktif di bawah ini untuk mensimulasikan hasil duel cerdas cermat, termasuk penerapan denda penalti tertunda akibat WO pada pekan sebelumnya.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {/* Peserta A */}
              <div style={{ background: 'var(--surface-input)', border: '1px solid var(--border-subtle)', padding: '20px', borderRadius: 'var(--radius-xs)' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--championship-gold-light)', fontSize: '1rem', marginBottom: '14px' }}>
                  Peserta Duel A
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    <span>Soal Benar:</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#fff' }}>{simBenarA} Soal</span>
                  </div>
                  <input type="range" min="0" max="10" value={simBenarA} onChange={(e) => setSimBenarA(Number(e.target.value))} style={{ width: '100%', marginTop: '4px' }} />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    <span>Skor Kotor:</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#fff' }}>{simSkorA} Poin</span>
                  </div>
                  <input type="range" min="0" max="200" step="10" value={simSkorA} onChange={(e) => setSimSkorA(Number(e.target.value))} style={{ width: '100%', marginTop: '4px' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--status-loss)', marginBottom: '4px' }}>
                    Denda Penalti WO Tertunda:
                  </label>
                  <select
                    value={simDendaA}
                    onChange={(e) => setSimDendaA(Number(e.target.value))}
                    style={{ width: '100%', background: '#0e0406', border: '1px solid var(--border-subtle)', padding: '7px', color: '#fff', borderRadius: 'var(--radius-xs)' }}
                  >
                    <option value="0">Tidak Ada Penalti (0)</option>
                    <option value="50">Penalti WO Pekan Lalu (-50 Skor)</option>
                  </select>
                </div>

                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Skor Akhir Efektif:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--championship-gold-light)' }}>
                    {effA}
                  </span>
                </div>
              </div>

              {/* Peserta B */}
              <div style={{ background: 'var(--surface-input)', border: '1px solid var(--border-subtle)', padding: '20px', borderRadius: 'var(--radius-xs)' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--championship-gold-light)', fontSize: '1rem', marginBottom: '14px' }}>
                  Peserta Duel B
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    <span>Soal Benar:</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#fff' }}>{simBenarB} Soal</span>
                  </div>
                  <input type="range" min="0" max="10" value={simBenarB} onChange={(e) => setSimBenarB(Number(e.target.value))} style={{ width: '100%', marginTop: '4px' }} />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    <span>Skor Kotor:</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#fff' }}>{simSkorB} Poin</span>
                  </div>
                  <input type="range" min="0" max="200" step="10" value={simSkorB} onChange={(e) => setSimSkorB(Number(e.target.value))} style={{ width: '100%', marginTop: '4px' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--status-loss)', marginBottom: '4px' }}>
                    Denda Penalti WO Tertunda:
                  </label>
                  <select
                    value={simDendaB}
                    onChange={(e) => setSimDendaB(Number(e.target.value))}
                    style={{ width: '100%', background: '#0e0406', border: '1px solid var(--border-subtle)', padding: '7px', color: '#fff', borderRadius: 'var(--radius-xs)' }}
                  >
                    <option value="0">Tidak Ada Penalti (0)</option>
                    <option value="50">Penalti WO Pekan Lalu (-50 Skor)</option>
                  </select>
                </div>

                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Skor Akhir Efektif:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--championship-gold-light)' }}>
                    {effB}
                  </span>
                </div>
              </div>
            </div>

            {/* Calculated Outcome */}
            <div style={{
              marginTop: '24px',
              padding: '18px 24px',
              borderRadius: 'var(--radius-xs)',
              background: 'var(--surface-input)',
              border: `1px solid ${colorHasil}`,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                HASIL PERHITUNGAN RESMI PERTANDINGAN
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 800,
                color: colorHasil,
                marginTop: '4px',
                letterSpacing: '-0.01em'
              }}>
                {simHasil}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
