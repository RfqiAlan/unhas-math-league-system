'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavbarProps {
  isAdmin: boolean;
  onOpenLogin: () => void;
  onOpenAdminPanel: () => void;
}

export default function Navbar({ isAdmin, onOpenLogin, onOpenAdminPanel }: NavbarProps) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(9, 3, 5, 0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '66px'
      }}>
        {/* Brand */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          textDecoration: 'none'
        }}>
          <div style={{
            position: 'relative',
            width: '38px',
            height: '38px',
            borderRadius: '6px',
            overflow: 'hidden',
            border: '1px solid var(--border-primary)',
            boxShadow: '0 0 16px rgba(133, 10, 20, 0.35)',
            background: '#000',
            flexShrink: 0
          }}>
            <Image
              src="/assets/pkm-logo.jpg"
              alt="Logo PKM FMIPA UNHAS"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.08rem',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1.15
            }}>
              PKM <span style={{ color: 'var(--championship-gold)' }}>MATH LEAGUE</span>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.66rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>
              FMIPA Universitas Hasanuddin
            </div>
          </div>
        </Link>

        {/* Center Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }}>
          <a href="#klasemen" style={{
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.01em',
            transition: 'color 0.2s'
          }}>
            Klasemen
          </a>
          <a href="#jadwal" style={{
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.01em',
            transition: 'color 0.2s'
          }}>
            Jadwal Duel
          </a>
          <a href="#mvp" style={{
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.01em',
            transition: 'color 0.2s'
          }}>
            Performa MVP
          </a>
          <Link href="/guidebook" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            color: 'var(--championship-gold-light)',
            textDecoration: 'none',
            fontSize: '0.82rem',
            fontWeight: 700,
            background: 'rgba(212, 175, 55, 0.08)',
            padding: '5px 12px',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid var(--border-gold)',
            transition: 'all 0.2s'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            Buku Panduan
          </Link>
        </nav>

        {/* Live Status & Admin Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: 'var(--status-win)'
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--status-win)',
              boxShadow: '0 0 8px var(--status-win)'
            }} />
            MUSIM 2026
          </div>

          {isAdmin ? (
            <button
              onClick={onOpenAdminPanel}
              className="btn-league btn-league-gold btn-league-sm"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              Panel Staff
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="btn-league btn-league-outline btn-league-sm"
              style={{
                borderColor: 'var(--border-primary)',
                background: 'rgba(133, 10, 20, 0.12)'
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Login Staff
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
