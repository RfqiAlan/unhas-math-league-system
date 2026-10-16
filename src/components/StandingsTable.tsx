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
        backgroundColor: '#ffffff',
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
          background: 'var(--color-gold)',
          color: 'var(--color-black)',
          fontFamily: 'var(--font-mono)',
          fontWeight: 900,
          fontSize: '0.84rem',
          boxShadow: '0 2px 8px rgba(247, 187, 14, 0.4)'
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
          background: 'var(--color-gray-light)',
          color: 'var(--color-black)',
          fontFamily: 'var(--font-mono)',
          fontWeight: 900,
          fontSize: '0.84rem',
          border: '1px solid var(--border-medium)'
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
          background: '#d48039',
          color: '#ffffff',
          fontFamily: 'var(--font-mono)',
          fontWeight: 900,
          fontSize: '0.84rem'
        }}>
          3
        </span>
      );
    }
    return (
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: '0.88rem',
        color: rank >= 9 ? 'var(--color-crimson)' : 'var(--color-charcoal)'
      }}>
        {rank}
      </span>
    );
  };

  const getFormPill = (form: 'W' | 'S' | 'K' | null) => {
    if (form === 'W') {
      return (
        <span style={{
          background: 'var(--status-win-bg)',
          color: 'var(--status-win)',
          border: '1px solid rgba(15, 138, 95, 0.3)',
          borderRadius: '3px',
          padding: '2px 6px',
          fontSize: '0.7rem',
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
          background: 'var(--status-draw-bg)',
          color: 'var(--status-draw)',
          border: '1px solid var(--border-medium)',
          borderRadius: '3px',
          padding: '2px 6px',
          fontSize: '0.7rem',
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
          background: 'var(--status-loss-bg)',
          color: 'var(--color-crimson)',
          border: '1px solid rgba(174, 2, 1, 0.3)',
          borderRadius: '3px',
          padding: '2px 6px',
          fontSize: '0.7rem',
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
            <span className="badge-clean badge-crimson">TABEL KLASEMEN RESMI</span>
            <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--color-charcoal)', fontWeight: 700 }}>
              PKM FMIPA UNHAS
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            fontWeight: 900,
            color: 'var(--color-black)',
            letterSpacing: '-0.03em'
          }}>
            Peringkat Klasemen &middot; {ligaName}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-charcoal)', marginTop: '2px' }}>
            Kriteria Tie-Breaker: Total Poin &gt; Soal Benar (SB) &gt; Total Skor Matematika &gt; Alfabetis
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
                background: 'var(--color-white)',
                border: '1.5px solid var(--border-subtle)',
                borderRadius: 'var(--radius-xs)',
                padding: '7px 14px 7px 32px',
                color: 'var(--color-black)',
                fontSize: '0.82rem',
                outline: 'none',
                width: '180px',
                fontWeight: 600
              }}
            />
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-charcoal)"
              strokeWidth="2.5"
              style={{
                position: 'absolute',
                left: '11px',
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
            className="btn-unhas btn-outline-dark btn-sm"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
          background: 'var(--color-white)',
          border: '1.5px solid var(--border-subtle)'
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
              background: 'var(--bg-surface-subtle)',
              color: 'var(--color-charcoal)',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 800
            }}>
              <th style={{ padding: '10px', width: '52px', textAlign: 'center' }}>POS</th>
              <th style={{ padding: '10px 14px' }}>PESERTA</th>
              <th style={{ padding: '10px', textAlign: 'center', width: '50px' }}>P</th>
              <th style={{ padding: '10px', textAlign: 'center', width: '50px' }}>M</th>
              <th style={{ padding: '10px', textAlign: 'center', width: '50px' }}>S</th>
              <th style={{ padding: '10px', textAlign: 'center', width: '50px' }}>K</th>
              <th style={{ padding: '10px 14px', textAlign: 'center' }}>SOAL BENAR</th>
              <th style={{ padding: '10px 14px', textAlign: 'center' }}>TOTAL SKOR</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', width: '60px' }}>BENTUK</th>
              <th style={{ padding: '10px 16px', textAlign: 'right', width: '80px' }}>PTS</th>
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

                let borderLeftColor = 'var(--border-subtle)';
                if (isChampion) borderLeftColor = 'var(--color-gold)';
                else if (isPodium) borderLeftColor = 'var(--color-crimson)';
                else if (isDanger) borderLeftColor = 'var(--color-crimson)';

                return (
                  <tr
                    key={row.nama}
                    style={{
                      background: isChampion
                        ? 'rgba(247, 187, 14, 0.08)'
                        : isDanger
                        ? 'rgba(174, 2, 1, 0.03)'
                        : 'var(--color-white)',
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
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        color: 'var(--color-black)',
                        fontSize: '0.96rem',
                        letterSpacing: '-0.01em'
                      }}>
                        {row.nama}
                      </div>
                      {row.penaltiTertunda > 0 && (
                        <div style={{
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--color-crimson)',
                          fontWeight: 800,
                          marginTop: '2px'
                        }}>
                          [PENALTI TERTUNDA: -{row.penaltiTertunda} SKOR]
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '12px 10px', textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--color-charcoal)', fontWeight: 600 }}>
                      {row.main}
                    </td>
                    <td style={{ padding: '12px 10px', textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--status-win)', fontWeight: 800 }}>
                      {row.menang}
                    </td>
                    <td style={{ padding: '12px 10px', textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--status-draw)', fontWeight: 600 }}>
                      {row.seri}
                    </td>
                    <td style={{ padding: '12px 10px', textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--color-crimson)', fontWeight: 700 }}>
                      {row.kalah}
                    </td>
                    <td style={{
                      padding: '12px 14px',
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      color: isPodium ? 'var(--color-crimson)' : 'var(--color-black)'
                    }}>
                      {row.benar}
                    </td>
                    <td style={{
                      padding: '12px 14px',
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-charcoal)',
                      fontWeight: 700
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
                      fontSize: '1.25rem',
                      fontWeight: 900,
                      color: isChampion ? 'var(--color-crimson)' : 'var(--color-black)',
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
          fontSize: '0.74rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-charcoal)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', background: 'var(--color-gold)', borderRadius: '2px' }} />
            Podium 1-3: Zona Medali &amp; Trofi Kejuaraan
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', background: 'var(--color-crimson)', borderRadius: '2px' }} />
            Peringkat 9-10: Zona Gugur / Degradasi
          </div>
          <div style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontWeight: 600 }}>
            W: Menang (+3 Poin) &bull; D: Seri (+1 Poin) &bull; L: Kalah (0 Poin)
          </div>
        </div>
      </div>
    </div>
  );
}
