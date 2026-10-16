'use client';

import React from 'react';

interface PodiumJuaraProps {
  juara: Record<number, { nama: string; foto?: string }>;
  ligaName: string;
}

export default function PodiumJuara({ juara, ligaName }: PodiumJuaraProps) {
  const first = juara[1] || { nama: 'TBA', foto: '' };
  const second = juara[2] || { nama: 'TBA', foto: '' };
  const third = juara[3] || { nama: 'TBA', foto: '' };

  const renderTier = (
    pos: number,
    item: { nama: string; foto?: string },
    title: string,
    accentColor: string,
    pedestalHeight: string,
    isFirst: boolean = false
  ) => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        maxWidth: isFirst ? '250px' : '210px',
        zIndex: isFirst ? 3 : 2
      }}>
        {/* Avatar Ring */}
        <div style={{ position: 'relative', marginBottom: '14px' }}>
          {isFirst && (
            <div style={{
              position: 'absolute',
              top: '-14px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, var(--championship-gold-light), var(--championship-gold-dark))',
              color: '#0e0406',
              padding: '2px 8px',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.62rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
              whiteSpace: 'nowrap'
            }}>
              CHAMPION
            </div>
          )}

          <div style={{
            width: isFirst ? '84px' : '70px',
            height: isFirst ? '84px' : '70px',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: `2px solid ${accentColor}`,
            boxShadow: `0 0 24px ${accentColor}30`,
            background: 'var(--surface-input)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {item.foto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.foto}
                alt={item.nama}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: isFirst ? '1.8rem' : '1.4rem',
                fontWeight: 800,
                color: accentColor
              }}>
                {item.nama !== 'TBA' ? item.nama.charAt(0).toUpperCase() : '—'}
              </div>
            )}
          </div>

          {/* Numerical Rank Badge */}
          <div style={{
            position: 'absolute',
            bottom: '-6px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#0e0406',
            color: accentColor,
            border: `1px solid ${accentColor}`,
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            fontSize: '0.72rem',
            width: '22px',
            height: '22px',
            borderRadius: 'var(--radius-xs)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.8)'
          }}>
            {pos}
          </div>
        </div>

        {/* Name */}
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: isFirst ? '1.12rem' : '0.96rem',
          fontWeight: 800,
          color: '#ffffff',
          textAlign: 'center',
          marginBottom: '6px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '100%',
          letterSpacing: '-0.01em'
        }}>
          {item.nama}
        </div>

        {/* Architectural Pedestal */}
        <div style={{
          width: '100%',
          height: pedestalHeight,
          background: isFirst
            ? 'linear-gradient(180deg, rgba(212, 175, 55, 0.15) 0%, rgba(26, 9, 13, 0.95) 100%)'
            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(18, 6, 9, 0.95) 100%)',
          border: `1px solid ${accentColor}50`,
          borderBottom: 'none',
          borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px',
          boxShadow: isFirst ? '0 -4px 24px rgba(212, 175, 55, 0.12)' : 'none'
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: accentColor
          }}>
            {title}
          </div>
          <div style={{
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            marginTop: '2px'
          }}>
            DIVISI {ligaName}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="league-card" style={{
      padding: '30px 24px 0 24px',
      overflow: 'hidden',
      marginBottom: '36px',
      borderTop: '2px solid var(--border-gold)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div className="league-badge league-badge-gold" style={{ marginBottom: '8px' }}>
          HONOR ROLL &bull; MUSIM 2026
        </div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          textTransform: 'uppercase'
        }}>
          Podium Kejuaraan Divisi {ligaName}
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          Tiga posisi puncak perebutan gelar juara liga cerdas cermat matematika PKM FMIPA UNHAS
        </p>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: '12px',
        maxWidth: '720px',
        margin: '0 auto'
      }}>
        {renderTier(2, second, 'Runner Up', 'var(--silver)', '95px')}
        {renderTier(1, first, 'Champion', 'var(--championship-gold-light)', '130px', true)}
        {renderTier(3, third, '3rd Place', 'var(--bronze)', '75px')}
      </div>
    </section>
  );
}
