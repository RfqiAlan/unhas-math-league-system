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
    pedestalBg: string,
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
              background: 'var(--color-gold)',
              color: 'var(--color-black)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.62rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              boxShadow: 'var(--shadow-subtle)',
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
            boxShadow: 'var(--shadow-subtle)',
            background: 'var(--color-gray-light)',
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
                fontWeight: 900,
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
            background: 'var(--color-white)',
            color: 'var(--color-black)',
            border: `1.5px solid ${accentColor}`,
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            fontSize: '0.72rem',
            width: '22px',
            height: '22px',
            borderRadius: 'var(--radius-xs)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            {pos}
          </div>
        </div>

        {/* Name */}
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: isFirst ? '1.15rem' : '0.96rem',
          fontWeight: 800,
          color: 'var(--color-black)',
          textAlign: 'center',
          marginBottom: '6px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '100%',
          letterSpacing: '-0.02em'
        }}>
          {item.nama}
        </div>

        {/* Architectural Pedestal */}
        <div style={{
          width: '100%',
          height: pedestalHeight,
          background: pedestalBg,
          border: `1px solid ${accentColor}60`,
          borderBottom: 'none',
          borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px',
          boxShadow: isFirst ? '0 -4px 16px rgba(247, 187, 14, 0.15)' : 'none'
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
            color: 'var(--color-charcoal)',
            fontWeight: 600,
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
      borderTop: '3px solid var(--color-crimson)',
      background: 'var(--color-white)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div className="badge-clean badge-gold" style={{ marginBottom: '8px' }}>
          HONOR ROLL &bull; MUSIM 2026
        </div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.6rem',
          fontWeight: 900,
          color: 'var(--color-black)',
          letterSpacing: '-0.03em',
          textTransform: 'uppercase'
        }}>
          Podium Kejuaraan Divisi {ligaName}
        </h3>
        <p style={{ fontSize: '0.84rem', color: 'var(--color-charcoal)', marginTop: '4px' }}>
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
        {renderTier(2, second, 'Runner Up', 'var(--color-charcoal)', 'var(--bg-surface-subtle)', '95px')}
        {renderTier(1, first, 'Champion', 'var(--color-crimson)', 'rgba(247, 187, 14, 0.12)', '130px', true)}
        {renderTier(3, third, '3rd Place', '#9a5316', '#faf4ee', '75px')}
      </div>
    </section>
  );
}
