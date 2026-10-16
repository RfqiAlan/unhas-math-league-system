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
            <span className="badge-clean badge-crimson">JADWAL PERTANDINGAN</span>
            <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--color-charcoal)', fontWeight: 700 }}>
              ROUND-ROBIN 9 PEKAN
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            fontWeight: 900,
            color: 'var(--color-black)',
            letterSpacing: '-0.03em'
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
                  border: isSelected ? '1.5px solid var(--color-crimson)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'var(--color-crimson)' : 'var(--color-white)',
                  color: isSelected ? '#ffffff' : 'var(--color-charcoal)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                  boxShadow: isSelected ? 'var(--shadow-crimson)' : 'var(--shadow-subtle)'
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
        background: 'var(--bg-surface-subtle)',
        border: '1.5px solid var(--border-subtle)',
        borderRadius: 'var(--radius-sm)',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.76rem',
            fontWeight: 900,
            color: 'var(--color-crimson)',
            letterSpacing: '0.06em'
          }}>
            MATCHWEEK {selectedPekan}
          </span>
          <span style={{ color: 'var(--text-dim)' }}>&bull;</span>
          <span style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--color-black)' }}>
            {dateStr}
          </span>
        </div>
        <div style={{
          fontSize: '0.78rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-charcoal)',
          fontWeight: 700
        }}>
          WAKTU: <span style={{ color: 'var(--color-crimson)' }}>{JAM_PEKAN}</span> &bull; RUANG PKM FMIPA UNHAS
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
              color: 'var(--text-muted)',
              background: 'var(--color-gray-light)',
              padding: '3px 8px',
              borderRadius: 'var(--radius-xs)',
              letterSpacing: '0.05em',
              fontWeight: 700
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
                  background: 'var(--status-win-bg)',
                  border: '1px solid rgba(15, 138, 95, 0.3)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-xs)',
                  fontWeight: 800,
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
                  color: 'var(--color-crimson)',
                  background: 'var(--status-loss-bg)',
                  border: '1px solid rgba(174, 2, 1, 0.3)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-xs)',
                  fontWeight: 800
                }}>
                  WO SEPIHAK ({result.hadir})
                </span>
              );
            } else if (result.tipe === 'wo2') {
              statusBadge = (
                <span style={{
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-crimson)',
                  background: 'var(--status-loss-bg)',
                  border: '1px solid rgba(174, 2, 1, 0.3)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-xs)',
                  fontWeight: 800
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
                padding: '16px 22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                background: 'var(--color-white)',
                borderLeft: result ? '3.5px solid var(--color-crimson)' : '3.5px solid var(--border-subtle)'
              }}
            >
              {/* Match Number */}
              <div style={{
                width: '40px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                color: 'var(--text-dim)',
                fontWeight: 800
              }}>
                M-{idx + 1}
              </div>

              {/* Team A */}
              <div style={{ flex: '1 1 200px', textAlign: 'right' }}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '1.02rem',
                  color: 'var(--color-black)'
                }}>
                  {teamA}
                </div>
                {result && result.tipe === 'reguler' && (
                  <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-charcoal)', fontWeight: 600 }}>
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
                  background: 'var(--bg-surface-subtle)',
                  border: '1.5px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '6px 16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: result && result.tipe === 'reguler' ? '1.18rem' : '0.86rem',
                  fontWeight: 900,
                  color: result ? 'var(--color-crimson)' : 'var(--text-dim)',
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
                  fontWeight: 800,
                  fontSize: '1.02rem',
                  color: 'var(--color-black)'
                }}>
                  {teamB}
                </div>
                {result && result.tipe === 'reguler' && (
                  <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-charcoal)', fontWeight: 600 }}>
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
                        className="btn-unhas btn-outline-dark btn-sm"
                        style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteMatch?.(result.id)}
                        className="btn-unhas btn-outline-dark btn-sm"
                        style={{ padding: '3px 8px', fontSize: '0.72rem', color: 'var(--color-crimson)' }}
                      >
                        Reset
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => onQuickInputMatch?.(selectedPekan, teamA, teamB)}
                      className="btn-unhas btn-crimson btn-sm"
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
