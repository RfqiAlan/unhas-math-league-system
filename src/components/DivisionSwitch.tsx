'use client';

import React from 'react';
import { LigaType } from '@/types/league';

interface DivisionSwitchProps {
  currentLiga: LigaType;
  onChange: (liga: LigaType) => void;
}

export default function DivisionSwitch({ currentLiga, onChange }: DivisionSwitchProps) {
  return (
    <div style={{
      display: 'inline-flex',
      background: 'rgba(18, 6, 9, 0.95)',
      padding: '4px',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-subtle)',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
      gap: '4px'
    }}>
      {/* MCL Tab */}
      <button
        onClick={() => onChange('mcl')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 20px',
          borderRadius: 'var(--radius-sm)',
          border: currentLiga === 'mcl' ? '1px solid var(--border-gold)' : '1px solid transparent',
          background: currentLiga === 'mcl'
            ? 'linear-gradient(135deg, rgba(133, 10, 20, 0.95), rgba(77, 4, 10, 0.95))'
            : 'transparent',
          color: currentLiga === 'mcl' ? '#ffffff' : 'var(--text-muted)',
          cursor: 'pointer',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: currentLiga === 'mcl' ? '0 4px 18px rgba(133, 10, 20, 0.5)' : 'none'
        }}
      >
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: 'var(--radius-xs)',
          background: currentLiga === 'mcl' ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.04)',
          border: currentLiga === 'mcl' ? '1px solid var(--border-gold)' : '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontWeight: 800,
          fontSize: '0.82rem',
          color: currentLiga === 'mcl' ? 'var(--championship-gold-light)' : 'var(--text-muted)'
        }}>
          ∑
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '0.92rem',
            letterSpacing: '0.04em',
            color: currentLiga === 'mcl' ? '#ffffff' : 'var(--text-secondary)'
          }}>
            MCL DIVISION
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.64rem',
            fontWeight: 600,
            color: currentLiga === 'mcl' ? 'var(--championship-gold-light)' : 'var(--text-dim)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}>
            Mathematics Champions League
          </div>
        </div>
      </button>

      {/* MRL Tab */}
      <button
        onClick={() => onChange('mrl')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 20px',
          borderRadius: 'var(--radius-sm)',
          border: currentLiga === 'mrl' ? '1px solid var(--border-gold)' : '1px solid transparent',
          background: currentLiga === 'mrl'
            ? 'linear-gradient(135deg, rgba(133, 10, 20, 0.95), rgba(77, 4, 10, 0.95))'
            : 'transparent',
          color: currentLiga === 'mrl' ? '#ffffff' : 'var(--text-muted)',
          cursor: 'pointer',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: currentLiga === 'mrl' ? '0 4px 18px rgba(133, 10, 20, 0.5)' : 'none'
        }}
      >
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: 'var(--radius-xs)',
          background: currentLiga === 'mrl' ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.04)',
          border: currentLiga === 'mrl' ? '1px solid var(--border-gold)' : '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontWeight: 800,
          fontSize: '0.82rem',
          color: currentLiga === 'mrl' ? 'var(--championship-gold-light)' : 'var(--text-muted)'
        }}>
          ∫
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '0.92rem',
            letterSpacing: '0.04em',
            color: currentLiga === 'mrl' ? '#ffffff' : 'var(--text-secondary)'
          }}>
            MRL DIVISION
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.64rem',
            fontWeight: 600,
            color: currentLiga === 'mrl' ? 'var(--championship-gold-light)' : 'var(--text-dim)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}>
            Mathematics Rookie League
          </div>
        </div>
      </button>
    </div>
  );
}
