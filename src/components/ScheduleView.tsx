'use client';

import React, { useState } from 'react';
import { LigaType, Pertandingan } from '@/types/league';
import { JADWAL, TANGGAL_PEKAN, JAM_PEKAN } from '@/data/constants';

interface ScheduleViewProps {
  currentLiga: LigaType;
  matches: Pertandingan[];
  isAdmin: boolean;
  onQuickInputMatch?: (pekan: number, teamA: string, teamB: string) => void;
  onDeleteMatch?: (id: string) => void;
}

export default function ScheduleView({
  currentLiga,
  matches,
  isAdmin,
  onQuickInputMatch,
  onDeleteMatch
}: ScheduleViewProps) {
  const [selectedPekan, setSelectedPekan] = useState<number>(1);

  const fixturePairs = JADWAL[currentLiga][selectedPekan] || [];
  const dateStr = TANGGAL_PEKAN[currentLiga][selectedPekan] || 'TBA';

  const findMatchResult = (teamA: string, teamB: string) => {
    return matches.find(m => {
      if (m.pekan !== selectedPekan) return false;
      if (m.tipe === 'reguler') {
        return (m.a === teamA && m.b === teamB) || (m.a === teamB && m.b === teamA);
      }
      if (m.tipe === 'wo1') {
        return (m.hadir === teamA && m.absen === teamB) || (m.hadir === teamB && m.absen === teamA);
      }
      if (m.tipe === 'wo2') {
        return (m.a === teamA && m.b === teamB) || (m.a === teamB && m.b === teamA);
      }
      return false;
    });
  };

  return (
    <div id="jadwal" style={{ marginBottom: '48px' }}>
      {/* Title & Matchweek Tabs */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="league-badge league-badge-crimson">JADWAL PERTANDINGAN</span>
            <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              ROUND-ROBIN 9 PEKAN
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.65rem',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.02em'
          }}>
            Jadwal &amp; Hasil Duel &middot; {currentLiga.toUpperCase()}
          </h2>
        </div>

        {/* Matchweek Pills */}
        <div style={{
          display: 'flex',
          gap: '4px',
          overflowX: 'auto',
          maxWidth: '100%',
          paddingBottom: '4px'
        }}>
          {Array.from({ length: 9 }, (_, i) => i + 1).map((p) => {
            const isSelected = selectedPekan === p;
            return (
              <button
                key={p}
                onClick={() => setSelectedPekan(p)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-xs)',
                  border: isSelected ? '1px solid var(--border-gold)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'var(--unhas-crimson)' : 'rgba(255, 255, 255, 0.03)',
                  color: isSelected ? '#fff' : 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                Pekan {p}
              </button>
            );
          })}
        </div>
      </div>

      {/* Matchweek Info Bar */}
      <div style={{
        background: 'rgba(133, 10, 20, 0.15)',
        border: '1px solid var(--border-primary)',
        borderRadius: 'var(--radius-sm)',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.74rem',
            fontWeight: 800,
            color: 'var(--championship-gold-light)',
            letterSpacing: '0.06em'
          }}>
            MATCHWEEK {selectedPekan}
          </span>
          <span style={{ color: 'var(--text-dim)' }}>&bull;</span>
          <span style={{ fontSize: '0.84rem', fontWeight: 600, color: '#fff' }}>
            {dateStr}
          </span>
        </div>
        <div style={{
          fontSize: '0.78rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-secondary)'
        }}>
          WAKTU: <span style={{ color: 'var(--championship-gold-light)', fontWeight: 700 }}>{JAM_PEKAN}</span> &bull; RUANG PKM FMIPA UNHAS
        </div>
      </div>

      {/* Fixtures List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {fixturePairs.map(([teamA, teamB], idx) => {
          const result = findMatchResult(teamA, teamB);

          let statusBadge = (
            <span style={{
              fontSize: '0.68rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-dim)',
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '3px 8px',
              borderRadius: 'var(--radius-xs)',
              letterSpacing: '0.05em'
            }}>
              TERJADWAL
            </span>
          );

          if (result) {
            if (result.tipe === 'reguler') {
              statusBadge = (
                <span style={{
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--status-win)',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-xs)',
                  fontWeight: 700,
                  letterSpacing: '0.05em'
                }}>
                  FINAL
                </span>
              );
            } else if (result.tipe === 'wo1') {
              statusBadge = (
                <span style={{
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--championship-gold-light)',
                  background: 'rgba(212, 175, 55, 0.12)',
                  border: '1px solid var(--border-gold)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-xs)',
                  fontWeight: 700
                }}>
                  WO SEPIHAK ({result.hadir})
                </span>
              );
            } else if (result.tipe === 'wo2') {
              statusBadge = (
                <span style={{
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--status-loss)',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-xs)',
                  fontWeight: 700
                }}>
                  WO GANDA (PENALTI -50)
                </span>
              );
            }
          }

          return (
            <div
              key={idx}
              className="league-card"
              style={{
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                borderLeft: result ? '3px solid var(--unhas-crimson-light)' : '3px solid var(--border-subtle)'
              }}
            >
              {/* Left Match Number */}
              <div style={{
                width: '40px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-dim)',
                fontWeight: 700
              }}>
                M-{idx + 1}
              </div>

              {/* Team A */}
              <div style={{ flex: '1 1 200px', textAlign: 'right' }}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#ffffff'
                }}>
                  {teamA}
                </div>
                {result && result.tipe === 'reguler' && (
                  <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    Benar: {result.a === teamA ? result.benarA : result.benarB} soal
                  </div>
                )}
              </div>

              {/* Score / VS Center Box */}
              <div style={{
                minWidth: '100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}>
                <div style={{
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '6px 16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: result && result.tipe === 'reguler' ? '1.15rem' : '0.85rem',
                  fontWeight: 800,
                  color: result ? 'var(--championship-gold-light)' : 'var(--text-dim)',
                  letterSpacing: '0.04em'
                }}>
                  {result && result.tipe === 'reguler'
                    ? `${result.a === teamA ? result.skorA : result.skorB} - ${result.a === teamA ? result.skorB : result.skorA}`
                    : 'VS'}
                </div>
                {statusBadge}
              </div>

              {/* Team B */}
              <div style={{ flex: '1 1 200px', textAlign: 'left' }}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#ffffff'
                }}>
                  {teamB}
                </div>
                {result && result.tipe === 'reguler' && (
                  <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    Benar: {result.a === teamA ? result.benarB : result.benarA} soal
                  </div>
                )}
              </div>

              {/* Staff Actions */}
              {isAdmin && (
                <div style={{ minWidth: '110px', textAlign: 'right' }}>
                  {result ? (
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => onQuickInputMatch?.(selectedPekan, teamA, teamB)}
                        className="btn-league btn-league-outline btn-league-sm"
                        style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteMatch?.(result.id)}
                        className="btn-league btn-league-outline btn-league-sm"
                        style={{ padding: '3px 8px', fontSize: '0.72rem', color: 'var(--status-loss)' }}
                      >
                        Reset
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => onQuickInputMatch?.(selectedPekan, teamA, teamB)}
                      className="btn-league btn-league-primary btn-league-sm"
                      style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                    >
                      + Input Skor
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
