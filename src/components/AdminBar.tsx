'use client';

import React from 'react';

interface AdminBarProps {
  user: { email: string; name?: string };
  onOpenPanel: () => void;
  onLogout: () => void;
}

export default function AdminBar({ user, onOpenPanel, onLogout }: AdminBarProps) {
  return (
    <aside style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 60,
      background: 'var(--color-white)',
      border: '1.5px solid var(--border-medium)',
      borderRadius: 'var(--radius-sm)',
      padding: '8px 18px',
      boxShadow: 'var(--shadow-elevated)',
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: 'var(--status-win)',
          boxShadow: '0 0 6px var(--status-win)'
        }} />
        <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--color-charcoal)' }}>
          STAF PKM: <span style={{ color: 'var(--color-crimson)', fontWeight: 800 }}>{user.email}</span>
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={onOpenPanel}
          className="btn-unhas btn-crimson btn-sm"
          style={{ padding: '4px 12px', fontSize: '0.74rem' }}
        >
          Kelola Turnamen
        </button>
        <button
          onClick={onLogout}
          className="btn-unhas btn-outline-dark btn-sm"
          style={{ padding: '4px 10px', fontSize: '0.74rem', color: 'var(--color-crimson)' }}
        >
          Keluar
        </button>
      </div>
    </aside>
  );
}
