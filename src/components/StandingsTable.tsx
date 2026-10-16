'use client';

import React, { useState, useRef } from 'react';
import { StandingsRow } from '@/types/league';
import html2canvas from 'html2canvas';

interface StandingsTableProps {
  standings: StandingsRow[];
  ligaName: string;
}

export default function StandingsTable({ standings, ligaName }: StandingsTableProps) {
  const [search, setSearch] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const filtered = standings.filter(row =>
    row.nama.toLowerCase().includes(search.toLowerCase())
  );

  const handleExportPng = async () => {
    if (!tableRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(tableRef.current, {
        backgroundColor: '#090305',
        scale: 2
      });
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `Klasemen_${ligaName.replace(/\s+/g, '_')}_PKM_UNHAS.png`;
      a.click();
    } catch (err) {
      console.error('Export error:', err);
      alert('Gagal mengekspor grafik klasemen.');
    } finally {
      setIsExporting(false);
    }
  };

  const getRankIndicator = (rank: number) => {
    if (rank === 1) {
      return (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '26px',
          height: '26px',
          borderRadius: 'var(--radius-xs)',
          background: 'linear-gradient(135deg, var(--championship-gold-light), var(--championship-gold))',
          color: '#0e0406',
          fontFamily: 'var(--font-mono)',
          fontWeight: 900,
          fontSize: '0.82rem',
          boxShadow: '0 0 10px rgba(212, 175, 55, 0.4)'
        }}>
          1
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '26px',
          height: '26px',
          borderRadius: 'var(--radius-xs)',
          background: 'linear-gradient(135deg, #f1f5f9, #94a3b8)',
          color: '#0e0406',
          fontFamily: 'var(--font-mono)',
          fontWeight: 900,
          fontSize: '0.82rem'
        }}>
          2
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '26px',
          height: '26px',
          borderRadius: 'var(--radius-xs)',
          background: 'linear-gradient(135deg, #fed7aa, #c2410c)',
          color: '#0e0406',
          fontFamily: 'var(--font-mono)',
          fontWeight: 900,
          fontSize: '0.82rem'
        }}>
          3
        </span>
      );
    }
    return (
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: '0.85rem',
        color: rank >= 9 ? 'var(--status-loss)' : 'var(--text-muted)'
      }}>
        {rank}
      </span>
    );
  };

  const getFormPill = (form: 'W' | 'S' | 'K' | null) => {
    if (form === 'W') {
      return (
        <span style={{
          background: 'rgba(16, 185, 129, 0.15)',
          color: 'var(--status-win)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          borderRadius: '2px',
          padding: '2px 6px',
          fontSize: '0.68rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 800
        }}>
          W
        </span>
      );
    }
    if (form === 'S') {
      return (
        <span style={{
          background: 'rgba(148, 163, 184, 0.15)',
          color: 'var(--status-draw)',
          border: '1px solid rgba(148, 163, 184, 0.35)',
          borderRadius: '2px',
          padding: '2px 6px',
          fontSize: '0.68rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 800
        }}>
          D
        </span>
      );
    }
    if (form === 'K') {
      return (
        <span style={{
          background: 'rgba(239, 68, 68, 0.15)',
          color: 'var(--status-loss)',
          border: '1px solid rgba(239, 68, 68, 0.35)',
          borderRadius: '2px',
          padding: '2px 6px',
          fontSize: '0.68rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 800
        }}>
          L
        </span>
      );
    }
    return <span style={{ color: 'var(--text-dim)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>—</span>;
  };

  return (
    <div id="klasemen" style={{ marginBottom: '48px' }}>
      {/* Editorial Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="league-badge league-badge-gold">TABEL KLASEMEN RESMI</span>
            <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              PKM FMIPA UNHAS
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.65rem',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.02em'
          }}>
            Peringkat Klasemen &middot; {ligaName}
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Kriteria Tie-Breaker: Total Poin &gt; Soal Benar (SB) &gt; Total Skor &gt; Alfabetis
          </p>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Cari peserta..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: 'var(--surface-input)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-xs)',
                padding: '7px 14px 7px 30px',
                color: '#fff',
                fontSize: '0.82rem',
                outline: 'none',
                width: '180px'
              }}
            />
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-muted)"
              strokeWidth="2"
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            >
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>

          {/* Export PNG */}
          <button
            onClick={handleExportPng}
            disabled={isExporting}
            className="btn-league btn-league-outline btn-league-sm"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            {isExporting ? 'Mengekspor...' : 'Ekspor Grafik'}
          </button>
        </div>
      </div>

      {/* Standings Table Canvas */}
      <div
        ref={tableRef}
        className="league-card"
        style={{
          overflowX: 'auto',
          padding: '20px 24px',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <table style={{
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: '0 4px',
          minWidth: '680px',
          textAlign: 'left'
        }}>
          <thead>
            <tr style={{
              color: 'var(--text-muted)',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              borderBottom: '1px solid var(--border-subtle)'
            }}>
              <th style={{ padding: '8px 10px', width: '52px', textAlign: 'center' }}>POS</th>
              <th style={{ padding: '8px 12px' }}>PESERTA</th>
              <th style={{ padding: '8px 10px', textAlign: 'center', width: '50px' }}>P</th>
              <th style={{ padding: '8px 10px', textAlign: 'center', width: '50px' }}>M</th>
              <th style={{ padding: '8px 10px', textAlign: 'center', width: '50px' }}>S</th>
              <th style={{ padding: '8px 10px', textAlign: 'center', width: '50px' }}>K</th>
              <th style={{ padding: '8px 12px', textAlign: 'center' }}>SOAL BENAR</th>
              <th style={{ padding: '8px 12px', textAlign: 'center' }}>TOTAL SKOR</th>
              <th style={{ padding: '8px 12px', textAlign: 'center', width: '60px' }}>BENTUK</th>
              <th style={{ padding: '8px 16px', textAlign: 'right', width: '80px' }}>PTS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                  Tidak ada peserta yang cocok dengan filter pencarian &ldquo;{search}&rdquo;.
                </td>
              </tr>
            ) : (
              filtered.map((row, idx) => {
                const rank = idx + 1;
                const isChampion = rank === 1;
                const isPodium = rank <= 3;
                const isDanger = rank >= 9;

                let borderLeftColor = 'rgba(255, 255, 255, 0.08)';
                if (isChampion) borderLeftColor = 'var(--championship-gold)';
                else if (isPodium) borderLeftColor = 'rgba(212, 175, 55, 0.4)';
                else if (isDanger) borderLeftColor = 'var(--status-loss)';

                return (
                  <tr
                    key={row.nama}
                    style={{
                      background: isChampion
                        ? 'rgba(212, 175, 55, 0.05)'
                        : isPodium
                        ? 'rgba(255, 255, 255, 0.02)'
                        : isDanger
                        ? 'rgba(239, 68, 68, 0.04)'
                        : 'rgba(255, 255, 255, 0.01)',
                      transition: 'background 0.15s ease'
                    }}
                  >
                    <td style={{
                      padding: '12px 10px',
                      textAlign: 'center',
                      borderLeft: `3px solid ${borderLeftColor}`,
                      borderTopLeftRadius: 'var(--radius-xs)',
                      borderBottomLeftRadius: 'var(--radius-xs)'
                    }}>
                      {getRankIndicator(rank)}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        color: isPodium ? '#ffffff' : 'var(--text-secondary)',
                        fontSize: '0.94rem',
                        letterSpacing: '0.01em'
                      }}>
                        {row.nama}
                      </div>
                      {row.penaltiTertunda > 0 && (
                        <div style={{
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--status-loss)',
                          fontWeight: 700,
                          marginTop: '2px'
                        }}>
                          [PENALTI TERTUNDA: -{row.penaltiTertunda} SKOR]
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '12px 10px', textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      {row.main}
                    </td>
                    <td style={{ padding: '12px 10px', textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--status-win)', fontWeight: 700 }}>
                      {row.menang}
                    </td>
                    <td style={{ padding: '12px 10px', textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--status-draw)' }}>
                      {row.seri}
                    </td>
                    <td style={{ padding: '12px 10px', textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--status-loss)' }}>
                      {row.kalah}
                    </td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: isPodium ? 'var(--championship-gold-light)' : 'var(--text-secondary)'
                    }}>
                      {row.benar}
                    </td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)'
                    }}>
                      {row.skorTotal}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      {getFormPill(row.terakhir)}
                    </td>
                    <td style={{
                      padding: '12px 16px',
                      textAlign: 'right',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      color: isPodium ? 'var(--championship-gold)' : '#ffffff',
                      borderTopRightRadius: 'var(--radius-xs)',
                      borderBottomRightRadius: 'var(--radius-xs)'
                    }}>
                      {row.poin}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Legend strip */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '18px',
          marginTop: '16px',
          paddingTop: '12px',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: '0.72rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', background: 'var(--championship-gold)', borderRadius: '1px' }} />
            Podium 1-3: Zona Medali &amp; Trofi
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', background: 'var(--status-loss)', borderRadius: '1px' }} />
            Peringkat 9-10: Zona Gugur / Degradasi
          </div>
          <div style={{ marginLeft: 'auto', color: 'var(--text-dim)' }}>
            W: Menang (+3 Poin) &bull; D: Seri (+1 Poin) &bull; L: Kalah (0 Poin)
          </div>
        </div>
      </div>
    </div>
  );
}
