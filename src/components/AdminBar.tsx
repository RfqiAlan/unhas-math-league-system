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
      background: 'rgba(18, 6, 9, 0.96)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid var(--border-gold)',
      borderRadius: 'var(--radius-sm)',
      padding: '8px 18px',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.75), 0 0 20px rgba(212, 175, 55, 0.15)',
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
          boxShadow: '0 0 8px var(--status-win)'
        }} />
        <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
          STAFF PKM: <span style={{ color: 'var(--championship-gold-light)', fontWeight: 700 }}>{user.email}</span>
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={onOpenPanel}
          className="btn-league btn-league-gold btn-league-sm"
          style={{ padding: '4px 12px', fontSize: '0.74rem' }}
        >
          Kelola Turnamen
        </button>
        <button
          onClick={onLogout}
          className="btn-league btn-league-outline btn-league-sm"
          style={{ padding: '4px 10px', fontSize: '0.74rem', color: 'var(--status-loss)' }}
        >
          Keluar
        </button>
      </div>
    </aside>
  );
}
