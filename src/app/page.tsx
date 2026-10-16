'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import DivisionSwitch from '@/components/DivisionSwitch';
import PodiumJuara from '@/components/PodiumJuara';
import MvpShowcase from '@/components/MvpShowcase';
import StandingsTable from '@/components/StandingsTable';
import ScheduleView from '@/components/ScheduleView';
import AdminModal from '@/components/AdminModal';
import AdminBar from '@/components/AdminBar';
import { LigaType, LeagueDataSet } from '@/types/league';
import { DEFAULT_PESERTA } from '@/data/constants';

export default function Home() {
  const [currentLiga, setCurrentLiga] = useState<LigaType>('mcl');
  const [data, setData] = useState<LeagueDataSet>({
    peserta: DEFAULT_PESERTA.mcl,
    pertandingan: [],
    juara: {},
    mvp: null,
    klasemen: []
  });
  const [loading, setLoading] = useState(true);

  // Admin state
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState<{ email: string; name?: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quickMatchData, setQuickMatchData] = useState<{ pekan: number; teamA: string; teamB: string } | null>(null);

  // Load session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('pkm_admin_session');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.email) {
          setIsAdmin(true);
          setAdminUser(parsed);
        }
      }
    } catch (e) {
      console.warn('Session parse error:', e);
    }
  }, []);

  const fetchData = useCallback(async (liga: LigaType) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/league?liga=${liga}`);
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      }
    } catch (err) {
      console.error('Fetch league error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(currentLiga);
  }, [currentLiga, fetchData]);

  const handleLoginSuccess = (user: { email: string; name?: string }) => {
    setIsAdmin(true);
    setAdminUser(user);
    try {
      localStorage.setItem('pkm_admin_session', JSON.stringify(user));
    } catch {}
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setAdminUser(null);
    try {
      localStorage.removeItem('pkm_admin_session');
    } catch {}
  };

  const handleQuickInputMatch = (pekan: number, teamA: string, teamB: string) => {
    setQuickMatchData({ pekan, teamA, teamB });
    setIsModalOpen(true);
  };

  const handleDeleteMatch = async (id: string) => {
    if (!confirm('Hapus hasil pertandingan ini dan kembalikan ke jadwal semula?')) return;
    try {
      const res = await fetch(`/api/matches?liga=${currentLiga}&id=${id}`, {
        method: 'DELETE'
      });
      const json = await res.json();
      if (json.success) {
        fetchData(currentLiga);
      } else {
        alert('Gagal menghapus: ' + json.error);
      }
    } catch {
      alert('Error saat menghapus match');
    }
  };

  const currentLigaName = currentLiga === 'mcl' ? 'Math Champions League (MCL)' : 'Math Rookie League (MRL)';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <Navbar
        isAdmin={isAdmin}
        onOpenLogin={() => setIsModalOpen(true)}
        onOpenAdminPanel={() => setIsModalOpen(true)}
      />

      {/* Main Container */}
      <main className="container" style={{ flex: 1, paddingBottom: '90px' }}>
        {/* Editorial Tournament Hero */}
        <section style={{
          textAlign: 'center',
          padding: '48px 20px 36px 20px',
          position: 'relative'
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span className="league-badge league-badge-crimson">
              TURNAMEN RESMI &bull; MUSIM 2026
            </span>
            <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              9 PEKAN ROUND-ROBIN
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.08,
            letterSpacing: '-0.04em',
            marginBottom: '16px'
          }}>
            MATHEMATICS <span style={{ color: 'var(--championship-gold)' }}>LEAGUE</span>
          </h1>

          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            maxWidth: '680px',
            margin: '0 auto 28px auto',
            lineHeight: 1.6
          }}>
            Pusat Konsultasi Matematika &bull; Fakultas Matematika dan Ilmu Pengetahuan Alam, Universitas Hasanuddin.
            Sistem klasemen resmi kompetisi duel matematika berbasis round-robin 9 pekan.
          </p>

          {/* Division Switcher */}
          <DivisionSwitch
            currentLiga={currentLiga}
            onChange={(liga) => setCurrentLiga(liga)}
          />
        </section>

        {/* Loading Indicator */}
        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '20px',
            color: 'var(--championship-gold-light)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.84rem'
          }}>
            MEMUAT DATA DIVISI {currentLiga.toUpperCase()}...
          </div>
        )}

        {/* Podium Juara */}
        <PodiumJuara
          juara={data.juara}
          ligaName={currentLiga.toUpperCase()}
        />

        {/* MVP Showcase */}
        <MvpShowcase
          mvp={data.mvp}
          ligaName={currentLiga.toUpperCase()}
          onEditMvp={isAdmin ? () => setIsModalOpen(true) : undefined}
        />

        {/* Standings Table */}
        <StandingsTable
          standings={data.klasemen}
          ligaName={currentLigaName}
        />

        {/* Match Schedule & Fixtures */}
        <ScheduleView
          currentLiga={currentLiga}
          matches={data.pertandingan}
          isAdmin={isAdmin}
          onQuickInputMatch={handleQuickInputMatch}
          onDeleteMatch={handleDeleteMatch}
        />
      </main>

      {/* Admin Floating Bar if logged in */}
      {isAdmin && adminUser && (
        <AdminBar
          user={adminUser}
          onOpenPanel={() => setIsModalOpen(true)}
          onLogout={handleLogout}
        />
      )}

      {/* Admin Control Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setQuickMatchData(null);
        }}
        isAdmin={isAdmin}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        pesertaList={{
          mcl: currentLiga === 'mcl' ? data.peserta : DEFAULT_PESERTA.mcl,
          mrl: currentLiga === 'mrl' ? data.peserta : DEFAULT_PESERTA.mrl
        }}
        onRefreshData={() => fetchData(currentLiga)}
        quickMatchData={quickMatchData}
      />

      {/* Official Collegiate Footer */}
      <footer style={{
        background: 'rgba(8, 2, 4, 0.98)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '36px 20px',
        fontSize: '0.82rem'
      }}>
        <div className="container" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              color: '#fff',
              fontSize: '1rem',
              letterSpacing: '-0.02em'
            }}>
              PKM MATH LEAGUE &bull; FMIPA UNIVERSITAS HASANUDDIN
            </div>
            <div style={{ color: 'var(--text-muted)', marginTop: '4px', fontSize: '0.78rem' }}>
              Kampus Tamalanrea, Jl. Perintis Kemerdekaan KM.10, Makassar, Sulawesi Selatan 90245
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.76rem'
          }}>
            <a href="#klasemen" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>KLASEMEN</a>
            <a href="#jadwal" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>JADWAL DUEL</a>
            <a href="#mvp" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>MVP PEKAN</a>
            <a href="/guidebook" style={{ color: 'var(--championship-gold-light)', textDecoration: 'none' }}>BUKU PANDUAN</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
