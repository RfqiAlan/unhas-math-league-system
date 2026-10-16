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
      background: 'var(--color-white)',
      padding: '4px',
      borderRadius: 'var(--radius-md)',
      border: '1.5px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-card)',
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
          border: currentLiga === 'mcl' ? '1px solid var(--color-crimson)' : '1px solid transparent',
          background: currentLiga === 'mcl'
            ? 'var(--color-crimson)'
            : 'transparent',
          color: currentLiga === 'mcl' ? '#ffffff' : 'var(--color-charcoal)',
          cursor: 'pointer',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: currentLiga === 'mcl' ? 'var(--shadow-crimson)' : 'none'
        }}
      >
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: 'var(--radius-xs)',
          background: currentLiga === 'mcl' ? 'rgba(255, 255, 255, 0.2)' : 'var(--color-gray-light)',
          border: currentLiga === 'mcl' ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontWeight: 800,
          fontSize: '0.85rem',
          color: currentLiga === 'mcl' ? 'var(--color-gold)' : 'var(--color-black)'
        }}>
          ∑
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '0.94rem',
            letterSpacing: '0.02em',
            color: currentLiga === 'mcl' ? '#ffffff' : 'var(--color-black)'
          }}>
            MCL DIVISION
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.64rem',
            fontWeight: 700,
            color: currentLiga === 'mcl' ? 'var(--color-gold)' : 'var(--text-muted)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase'
          }}>
            Champions League
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
          border: currentLiga === 'mrl' ? '1px solid var(--color-crimson)' : '1px solid transparent',
          background: currentLiga === 'mrl'
            ? 'var(--color-crimson)'
            : 'transparent',
          color: currentLiga === 'mrl' ? '#ffffff' : 'var(--color-charcoal)',
          cursor: 'pointer',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: currentLiga === 'mrl' ? 'var(--shadow-crimson)' : 'none'
        }}
      >
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: 'var(--radius-xs)',
          background: currentLiga === 'mrl' ? 'rgba(255, 255, 255, 0.2)' : 'var(--color-gray-light)',
          border: currentLiga === 'mrl' ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontWeight: 800,
          fontSize: '0.85rem',
          color: currentLiga === 'mrl' ? 'var(--color-gold)' : 'var(--color-black)'
        }}>
          ∫
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '0.94rem',
            letterSpacing: '0.02em',
            color: currentLiga === 'mrl' ? '#ffffff' : 'var(--color-black)'
          }}>
            MRL DIVISION
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.64rem',
            fontWeight: 700,
            color: currentLiga === 'mrl' ? 'var(--color-gold)' : 'var(--text-muted)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase'
          }}>
            Rookie League
          </div>
        </div>
      </button>
    </div>
  );
}
