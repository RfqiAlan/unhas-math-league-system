'use client';

import React from 'react';
import { MvpPekan } from '@/types/league';

interface MvpShowcaseProps {
  mvp: MvpPekan | null;
  ligaName: string;
  onEditMvp?: () => void;
}

export default function MvpShowcase({ mvp, ligaName, onEditMvp }: MvpShowcaseProps) {
  if (!mvp || !mvp.nama) {
    return (
      <div id="mvp" className="league-card" style={{
        padding: '30px',
        textAlign: 'center',
        marginBottom: '36px',
        border: '1px dashed var(--border-primary)'
      }}>
        <div className="league-badge league-badge-crimson" style={{ marginBottom: '8px' }}>
          PEKAN MVP
        </div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: '#fff' }}>
          Belum Ada MVP Pekan Terpilih &middot; {ligaName}
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '4px' }}>
          Data performa terbaik pekan ini akan ditetapkan oleh dewan juri PKM FMIPA UNHAS.
        </p>
      </div>
    );
  }

  const posX = mvp.posX ?? 88;
  const posY = mvp.posY ?? 60;
  const skala = mvp.skala ?? 115;

  return (
    <section id="mvp" className="league-card" style={{
      padding: '28px 32px',
      marginBottom: '36px',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(30, 9, 14, 0.95) 0%, rgba(12, 4, 6, 0.98) 100%)',
      borderLeft: '4px solid var(--championship-gold)'
    }}>
      {/* Subtle math watermark in background */}
      <div style={{
        position: 'absolute',
        right: '20px',
        bottom: '-35px',
        fontFamily: 'var(--font-display)',
        fontSize: '13rem',
        fontWeight: 900,
        color: 'rgba(212, 175, 55, 0.03)',
        pointerEvents: 'none',
        lineHeight: 1,
        userSelect: 'none'
      }}>
        ∫
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '28px',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Info Column */}
        <div style={{ flex: '1 1 360px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span className="league-badge league-badge-gold">
              MVP OF THE MATCHWEEK
            </span>
            <span style={{
              fontSize: '0.74rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)'
            }}>
              PEKAN #{mvp.pekan} &bull; DIVISI {ligaName}
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.4rem',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.03em',
            lineHeight: 1.1
          }}>
            {mvp.nama}
          </h2>

          <div style={{
            color: 'var(--text-secondary)',
            fontSize: '0.92rem',
            marginTop: '12px',
            maxWidth: '520px',
            borderLeft: '2px solid var(--border-gold)',
            paddingLeft: '14px',
            fontStyle: 'italic',
            lineHeight: 1.5
          }}>
            &ldquo;{mvp.catatan || 'Solusi kilat dengan akurasi tinggi pada babak kalkulus & aljabar linier.'}&rdquo;
          </div>

          {/* Metric Badges */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '20px'
          }}>
            <div style={{
              background: 'var(--surface-input)',
              padding: '8px 16px',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ fontSize: '0.64rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                Kategori
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--championship-gold-light)', marginTop: '2px' }}>
                Akurasi Tertinggi
              </div>
            </div>

            <div style={{
              background: 'var(--surface-input)',
              padding: '8px 16px',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ fontSize: '0.64rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                Status Duel
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--status-win)', marginTop: '2px' }}>
                Tak Terkalahkan
              </div>
            </div>

            {onEditMvp && (
              <button
                onClick={onEditMvp}
                className="btn-league btn-league-outline btn-league-sm"
                style={{ marginLeft: 'auto' }}
              >
                Ubah Data MVP
              </button>
            )}
          </div>
        </div>

        {/* Framed Portrait Box */}
        <div style={{
          width: '210px',
          height: '250px',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          position: 'relative',
          background: 'radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.18) 0%, rgba(18, 6, 9, 0.95) 75%)',
          border: '1px solid var(--border-gold)',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.7)'
        }}>
          {mvp.foto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mvp.foto}
              alt={mvp.nama}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: `${posX}% ${posY}%`,
                transform: `scale(${skala / 100})`,
                transition: 'transform 0.2s ease, object-position 0.2s ease'
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--championship-gold)'
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '3.6rem', fontWeight: 800 }}>
                {mvp.nama.charAt(0).toUpperCase()}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginTop: '4px'
              }}>
                PKM FMIPA UNHAS
              </span>
            </div>
          )}

          {/* Lower caption strip */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '8px 12px',
            background: 'linear-gradient(0deg, rgba(8, 2, 4, 0.95) 0%, transparent 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.66rem',
              fontWeight: 800,
              color: 'var(--championship-gold-light)',
              letterSpacing: '0.06em'
            }}>
              PEKAN {mvp.pekan}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              color: 'var(--text-muted)'
            }}>
              RESMI
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
