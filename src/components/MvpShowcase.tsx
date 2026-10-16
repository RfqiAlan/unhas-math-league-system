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
        border: '1.5px dashed var(--border-medium)',
        background: 'var(--color-white)'
      }}>
        <div className="badge-clean badge-crimson" style={{ marginBottom: '8px' }}>
          PEKAN MVP
        </div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--color-black)' }}>
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
      padding: '32px 36px',
      marginBottom: '36px',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--color-white)',
      borderLeft: '4px solid var(--color-crimson)'
    }}>
      {/* Subtle math watermark in background */}
      <div style={{
        position: 'absolute',
        right: '24px',
        bottom: '-35px',
        fontFamily: 'var(--font-display)',
        fontSize: '13rem',
        fontWeight: 900,
        color: 'rgba(232, 231, 234, 0.4)',
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
            <span className="badge-clean badge-gold">
              MVP OF THE MATCHWEEK
            </span>
            <span style={{
              fontSize: '0.74rem',
              color: 'var(--color-charcoal)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700
            }}>
              PEKAN #{mvp.pekan} &bull; DIVISI {ligaName}
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            fontWeight: 900,
            color: 'var(--color-black)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1
          }}>
            {mvp.nama}
          </h2>

          <div style={{
            color: 'var(--color-charcoal)',
            fontSize: '0.94rem',
            marginTop: '12px',
            maxWidth: '520px',
            borderLeft: '3px solid var(--color-gold)',
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
            marginTop: '22px'
          }}>
            <div style={{
              background: 'var(--bg-surface-subtle)',
              padding: '8px 16px',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ fontSize: '0.64rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Kategori
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--color-black)', marginTop: '2px' }}>
                Akurasi Tertinggi
              </div>
            </div>

            <div style={{
              background: 'var(--bg-surface-subtle)',
              padding: '8px 16px',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ fontSize: '0.64rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Status Duel
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--status-win)', marginTop: '2px' }}>
                Tak Terkalahkan
              </div>
            </div>

            {onEditMvp && (
              <button
                onClick={onEditMvp}
                className="btn-unhas btn-outline-dark btn-sm"
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
          background: 'var(--bg-surface-subtle)',
          border: '1.5px solid var(--border-medium)',
          boxShadow: 'var(--shadow-card)'
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
              color: 'var(--color-crimson)'
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '3.6rem', fontWeight: 900 }}>
                {mvp.nama.charAt(0).toUpperCase()}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                fontSize: '0.72rem',
                color: 'var(--color-charcoal)',
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
            background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.4) 100%)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              fontWeight: 800,
              color: 'var(--color-crimson)',
              letterSpacing: '0.04em'
            }}>
              PEKAN #{mvp.pekan}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              color: 'var(--color-charcoal)',
              fontWeight: 700
            }}>
              OFFICIAL
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
