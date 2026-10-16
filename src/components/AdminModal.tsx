'use client';

import React, { useState, useEffect } from 'react';
import { LigaType, MatchType, MvpPekan } from '@/types/league';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onLoginSuccess: (user: { email: string; name?: string }) => void;
  onLogout: () => void;
  pesertaList: { mcl: string[]; mrl: string[] };
  onRefreshData: () => void;
  quickMatchData?: { pekan: number; teamA: string; teamB: string } | null;
}

export default function AdminModal({
  isOpen,
  onClose,
  isAdmin,
  onLoginSuccess,
  onLogout,
  pesertaList,
  onRefreshData,
  quickMatchData
}: AdminModalProps) {
  const [activeTab, setActiveTab] = useState<'match' | 'mvp' | 'champions' | 'peserta' | 'rls'>('match');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('admin@pkm.unhas.ac.id');
  const [loginPassword, setLoginPassword] = useState('pkm2026');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Match Input state
  const [matchLiga, setMatchLiga] = useState<LigaType>('mcl');
  const [matchPekan, setMatchPekan] = useState<number>(1);
  const [matchTipe, setMatchTipe] = useState<MatchType>('reguler');
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [skorA, setSkorA] = useState(0);
  const [skorB, setSkorB] = useState(0);
  const [benarA, setBenarA] = useState(0);
  const [benarB, setBenarB] = useState(0);
  const [woHadir, setWoHadir] = useState('');
  const [woAbsen, setWoAbsen] = useState('');
  const [woSkor, setWoSkor] = useState(100);
  const [woBenar, setWoBenar] = useState(5);
  const [matchStatusMsg, setMatchStatusMsg] = useState('');

  // MVP state
  const [mvpLiga, setMvpLiga] = useState<LigaType>('mcl');
  const [mvpPekan, setMvpPekan] = useState<number>(1);
  const [mvpNama, setMvpNama] = useState('');
  const [mvpFoto, setMvpFoto] = useState('');
  const [mvpPosX, setMvpPosX] = useState(88);
  const [mvpPosY, setMvpPosY] = useState(60);
  const [mvpSkala, setMvpSkala] = useState(115);
  const [mvpCatatan, setMvpCatatan] = useState('');
  const [mvpStatusMsg, setMvpStatusMsg] = useState('');

  // Podium Juara state
  const [juaraLiga, setJuaraLiga] = useState<LigaType>('mcl');
  const [juara1, setJuara1] = useState('');
  const [juara2, setJuara2] = useState('');
  const [juara3, setJuara3] = useState('');
  const [juaraStatusMsg, setJuaraStatusMsg] = useState('');

  // Peserta state
  const [newPesertaNama, setNewPesertaNama] = useState('');
  const [newPesertaLiga, setNewPesertaLiga] = useState<LigaType>('mcl');
  const [pesertaStatusMsg, setPesertaStatusMsg] = useState('');

  useEffect(() => {
    if (quickMatchData) {
      setMatchPekan(quickMatchData.pekan);
      setTeamA(quickMatchData.teamA);
      setTeamB(quickMatchData.teamB);
      setActiveTab('match');
    }
  }, [quickMatchData]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();

      if (data.success) {
        onLoginSuccess(data.user);
      } else {
        setLoginError(data.error || 'Autentikasi gagal.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Koneksi auth bermasalah';
      setLoginError(msg);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSaveMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setMatchStatusMsg('Menyimpan hasil duel...');

    try {
      const payload: {
        liga: LigaType;
        match: {
          tipe: MatchType;
          pekan: number;
          liga: 'MCL' | 'MRL';
          tahun: number;
          a?: string;
          b?: string;
          skorA?: number;
          skorB?: number;
          benarA?: number;
          benarB?: number;
          hadir?: string;
          absen?: string;
          skor?: number;
          benar?: number;
        };
      } = {
        liga: matchLiga,
        match: {
          tipe: matchTipe,
          pekan: Number(matchPekan),
          liga: matchLiga === 'mcl' ? 'MCL' : 'MRL',
          tahun: 2026
        }
      };

      if (matchTipe === 'reguler') {
        payload.match.a = teamA;
        payload.match.b = teamB;
        payload.match.skorA = Number(skorA);
        payload.match.skorB = Number(skorB);
        payload.match.benarA = Number(benarA);
        payload.match.benarB = Number(benarB);
      } else if (matchTipe === 'wo1') {
        payload.match.hadir = woHadir;
        payload.match.absen = woAbsen;
        payload.match.skor = Number(woSkor);
        payload.match.benar = Number(woBenar);
      } else if (matchTipe === 'wo2') {
        payload.match.a = teamA;
        payload.match.b = teamB;
      }

      const res = await fetch('/api/matches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        setMatchStatusMsg('Hasil pertandingan berhasil diperbarui.');
        onRefreshData();
        setTimeout(() => setMatchStatusMsg(''), 3000);
      } else {
        setMatchStatusMsg('Gagal: ' + data.error);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal simpan';
      setMatchStatusMsg('Error: ' + msg);
    }
  };

  const handleSaveMvp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMvpStatusMsg('Menyimpan performa MVP...');

    try {
      const mvpData: MvpPekan = {
        liga: mvpLiga === 'mcl' ? 'MCL' : 'MRL',
        pekan: Number(mvpPekan),
        nama: mvpNama,
        foto: mvpFoto,
        posX: Number(mvpPosX),
        posY: Number(mvpPosY),
        skala: Number(mvpSkala),
        catatan: mvpCatatan,
        tahun: 2026
      };

      const res = await fetch('/api/mvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ liga: mvpLiga, mvp: mvpData })
      });
      const data = await res.json();

      if (data.success) {
        setMvpStatusMsg('Data MVP pekan berhasil diperbarui.');
        onRefreshData();
        setTimeout(() => setMvpStatusMsg(''), 3000);
      } else {
        setMvpStatusMsg('Gagal: ' + data.error);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error';
      setMvpStatusMsg('Error: ' + msg);
    }
  };

  const handleSaveJuara = async (e: React.FormEvent) => {
    e.preventDefault();
    setJuaraStatusMsg('Menyimpan podium kejuaraan...');

    try {
      const promises = [];
      if (juara1) promises.push(fetch('/api/champions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ liga: juaraLiga, peringkat: 1, nama: juara1 }) }));
      if (juara2) promises.push(fetch('/api/champions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ liga: juaraLiga, peringkat: 2, nama: juara2 }) }));
      if (juara3) promises.push(fetch('/api/champions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ liga: juaraLiga, peringkat: 3, nama: juara3 }) }));

      await Promise.all(promises);
      setJuaraStatusMsg('Podium kejuaraan berhasil diperbarui.');
      onRefreshData();
      setTimeout(() => setJuaraStatusMsg(''), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error';
      setJuaraStatusMsg('Error: ' + msg);
    }
  };

  const handleAddPeserta = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPesertaNama.trim()) return;

    setPesertaStatusMsg('Mendaftarkan peserta...');
    try {
      const res = await fetch('/api/participants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ liga: newPesertaLiga, nama: newPesertaNama.trim(), action: 'add' })
      });
      const data = await res.json();

      if (data.success) {
        setPesertaStatusMsg(`Peserta ${newPesertaNama} berhasil didaftarkan.`);
        setNewPesertaNama('');
        onRefreshData();
        setTimeout(() => setPesertaStatusMsg(''), 3000);
      } else {
        setPesertaStatusMsg('Gagal: ' + data.error);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error';
      setPesertaStatusMsg('Error: ' + msg);
    }
  };

  const currentPesertaOptions = pesertaList[matchLiga] || [];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(0, 0, 0, 0.45)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div className="league-card" style={{
        width: '100%',
        maxWidth: '720px',
        maxHeight: '90vh',
        overflowY: 'auto',
        background: 'var(--color-white)',
        border: '1.5px solid var(--border-medium)',
        padding: '30px',
        boxShadow: 'var(--shadow-elevated)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '16px',
          marginBottom: '20px'
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem',
              fontWeight: 900,
              color: 'var(--color-black)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span className="badge-clean badge-crimson">PORTAL RESMI</span>
              {isAdmin ? 'PANEL KONTROL STAF' : 'LOGIN STAF PKM'}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--color-charcoal)', fontWeight: 600, marginTop: '2px' }}>
              PKM FMIPA UNIVERSITAS HASANUDDIN
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isAdmin && (
              <button
                onClick={onLogout}
                className="btn-unhas btn-outline-dark btn-sm"
                style={{ color: 'var(--color-crimson)', borderColor: 'rgba(174, 2, 1, 0.3)' }}
              >
                Logout
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-charcoal)',
                fontSize: '1.5rem',
                cursor: 'pointer',
                lineHeight: 1
              }}
            >
              &times;
            </button>
          </div>
        </div>

        {/* Not Logged In */}
        {!isAdmin ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {loginError && (
              <div style={{
                background: 'var(--status-loss-bg)',
                border: '1px solid rgba(174, 2, 1, 0.3)',
                borderRadius: 'var(--radius-xs)',
                padding: '10px 14px',
                color: 'var(--color-crimson)',
                fontSize: '0.84rem',
                fontWeight: 600
              }}>
                {loginError}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--color-charcoal)', fontWeight: 700, marginBottom: '6px' }}>
                EMAIL STAF PKM
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--color-white)',
                  border: '1.5px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '9px 14px',
                  color: 'var(--color-black)',
                  fontSize: '0.88rem',
                  fontWeight: 600
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--color-charcoal)', fontWeight: 700, marginBottom: '6px' }}>
                KATA SANDI
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--color-white)',
                  border: '1.5px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '9px 14px',
                  color: 'var(--color-black)',
                  fontSize: '0.88rem'
                }}
              />
            </div>

            <div style={{
              background: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xs)',
              padding: '10px 14px',
              fontSize: '0.78rem',
              color: 'var(--color-charcoal)'
            }}>
              <b>Kredensial Staf Master:</b><br />
              Email: <code>admin@pkm.unhas.ac.id</code> &bull; Password: <code>pkm2026</code>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="btn-unhas btn-crimson"
              style={{ marginTop: '6px' }}
            >
              {loginLoading ? 'Memverifikasi...' : 'Masuk ke Panel Turnamen'}
            </button>
          </form>
        ) : (
          /* Logged In */
          <div>
            {/* Tabs */}
            <div style={{
              display: 'flex',
              gap: '4px',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '12px',
              marginBottom: '20px',
              overflowX: 'auto'
            }}>
              <button
                onClick={() => setActiveTab('match')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-xs)',
                  border: activeTab === 'match' ? '1.5px solid var(--color-crimson)' : '1px solid transparent',
                  background: activeTab === 'match' ? 'var(--color-crimson)' : 'transparent',
                  color: activeTab === 'match' ? '#fff' : 'var(--color-charcoal)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Hasil Pertandingan
              </button>
              <button
                onClick={() => setActiveTab('mvp')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-xs)',
                  border: activeTab === 'mvp' ? '1.5px solid var(--color-crimson)' : '1px solid transparent',
                  background: activeTab === 'mvp' ? 'var(--color-crimson)' : 'transparent',
                  color: activeTab === 'mvp' ? '#fff' : 'var(--color-charcoal)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Performa MVP
              </button>
              <button
                onClick={() => setActiveTab('champions')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-xs)',
                  border: activeTab === 'champions' ? '1.5px solid var(--color-crimson)' : '1px solid transparent',
                  background: activeTab === 'champions' ? 'var(--color-crimson)' : 'transparent',
                  color: activeTab === 'champions' ? '#fff' : 'var(--color-charcoal)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Podium Juara
              </button>
              <button
                onClick={() => setActiveTab('peserta')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-xs)',
                  border: activeTab === 'peserta' ? '1.5px solid var(--color-crimson)' : '1px solid transparent',
                  background: activeTab === 'peserta' ? 'var(--color-crimson)' : 'transparent',
                  color: activeTab === 'peserta' ? '#fff' : 'var(--color-charcoal)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Daftar Peserta
              </button>
              <button
                onClick={() => setActiveTab('rls')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-xs)',
                  border: activeTab === 'rls' ? '1.5px solid var(--color-crimson)' : '1px solid transparent',
                  background: activeTab === 'rls' ? 'var(--color-crimson)' : 'transparent',
                  color: activeTab === 'rls' ? '#fff' : 'var(--color-charcoal)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Status Server
              </button>
            </div>

            {/* TAB 1: HASIL */}
            {activeTab === 'match' && (
              <form onSubmit={handleSaveMatch} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {matchStatusMsg && (
                  <div style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-xs)',
                    background: matchStatusMsg.startsWith('Gagal') || matchStatusMsg.startsWith('Error')
                      ? 'var(--status-loss-bg)'
                      : 'var(--status-win-bg)',
                    fontSize: '0.82rem',
                    color: matchStatusMsg.startsWith('Gagal') || matchStatusMsg.startsWith('Error')
                      ? 'var(--color-crimson)'
                      : 'var(--status-win)',
                    fontWeight: 700
                  }}>
                    {matchStatusMsg}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--color-charcoal)', fontWeight: 700, marginBottom: '4px' }}>
                      DIVISI LIGA
                    </label>
                    <select
                      value={matchLiga}
                      onChange={(e) => setMatchLiga(e.target.value as LigaType)}
                      style={{ width: '100%', background: 'var(--color-white)', border: '1.5px solid var(--border-subtle)', borderRadius: 'var(--radius-xs)', padding: '8px', color: 'var(--color-black)', fontWeight: 600 }}
                    >
                      <option value="mcl">MCL (Champions)</option>
                      <option value="mrl">MRL (Rookies)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--color-charcoal)', fontWeight: 700, marginBottom: '4px' }}>
                      PEKAN PERTANDINGAN
                    </label>
                    <select
                      value={matchPekan}
                      onChange={(e) => setMatchPekan(Number(e.target.value))}
                      style={{ width: '100%', background: 'var(--color-white)', border: '1.5px solid var(--border-subtle)', borderRadius: 'var(--radius-xs)', padding: '8px', color: 'var(--color-black)', fontWeight: 600 }}
                    >
                      {Array.from({ length: 9 }, (_, i) => i + 1).map(p => (
                        <option key={p} value={p}>Pekan #{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--color-charcoal)', fontWeight: 700, marginBottom: '4px' }}>
                      STATUS DUEL
                    </label>
                    <select
                      value={matchTipe}
                      onChange={(e) => setMatchTipe(e.target.value as MatchType)}
                      style={{ width: '100%', background: 'var(--color-white)', border: '1.5px solid var(--border-subtle)', borderRadius: 'var(--radius-xs)', padding: '8px', color: 'var(--color-black)', fontWeight: 600 }}
                    >
                      <option value="reguler">Duel Normal</option>
                      <option value="wo1">WO Sepihak (Denda -50)</option>
                      <option value="wo2">WO Ganda (Denda Keduanya -50)</option>
                    </select>
                  </div>
                </div>

                {matchTipe === 'reguler' && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--color-charcoal)', fontWeight: 700, marginBottom: '4px' }}>
                          Peserta A
                        </label>
                        <select
                          value={teamA}
                          onChange={(e) => setTeamA(e.target.value)}
                          style={{ width: '100%', background: 'var(--color-white)', border: '1.5px solid var(--border-subtle)', borderRadius: 'var(--radius-xs)', padding: '8px', color: 'var(--color-black)', fontWeight: 600 }}
                        >
                          <option value="">Pilih Peserta A</option>
                          {currentPesertaOptions.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--color-charcoal)', fontWeight: 700, marginBottom: '4px' }}>
                          Peserta B
                        </label>
                        <select
                          value={teamB}
                          onChange={(e) => setTeamB(e.target.value)}
                          style={{ width: '100%', background: 'var(--color-white)', border: '1.5px solid var(--border-subtle)', borderRadius: 'var(--radius-xs)', padding: '8px', color: 'var(--color-black)', fontWeight: 600 }}
                        >
                          <option value="">Pilih Peserta B</option>
                          {currentPesertaOptions.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-charcoal)', fontWeight: 700 }}>SKOR A</label>
                        <input
                          type="number"
                          value={skorA}
                          onChange={(e) => setSkorA(Number(e.target.value))}
                          style={{ width: '100%', background: 'var(--color-white)', border: '1.5px solid var(--border-subtle)', padding: '6px', color: 'var(--color-black)', borderRadius: 'var(--radius-xs)', fontWeight: 700 }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-charcoal)', fontWeight: 700 }}>BENAR A</label>
                        <input
                          type="number"
                          value={benarA}
                          onChange={(e) => setBenarA(Number(e.target.value))}
                          style={{ width: '100%', background: 'var(--color-white)', border: '1.5px solid var(--border-subtle)', padding: '6px', color: 'var(--color-black)', borderRadius: 'var(--radius-xs)', fontWeight: 700 }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-charcoal)', fontWeight: 700 }}>SKOR B</label>
                        <input
                          type="number"
                          value={skorB}
                          onChange={(e) => setSkorB(Number(e.target.value))}
                          style={{ width: '100%', background: 'var(--color-white)', border: '1.5px solid var(--border-subtle)', padding: '6px', color: 'var(--color-black)', borderRadius: 'var(--radius-xs)', fontWeight: 700 }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-charcoal)', fontWeight: 700 }}>BENAR B</label>
                        <input
                          type="number"
                          value={benarB}
                          onChange={(e) => setBenarB(Number(e.target.value))}
                          style={{ width: '100%', background: 'var(--color-white)', border: '1.5px solid var(--border-subtle)', padding: '6px', color: 'var(--color-black)', borderRadius: 'var(--radius-xs)', fontWeight: 700 }}
                        />
                      </div>
                    </div>
                  </>
                )}

                {matchTipe === 'wo1' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--status-win)', fontWeight: 700, marginBottom: '4px' }}>
                        Peserta Hadir (Menang)
                      </label>
                      <select
                        value={woHadir}
                        onChange={(e) => setWoHadir(e.target.value)}
                        style={{ width: '100%', background: 'var(--color-white)', border: '1.5px solid var(--border-subtle)', padding: '8px', color: 'var(--color-black)', borderRadius: 'var(--radius-xs)', fontWeight: 600 }}
                      >
                        <option value="">Pilih yang hadir</option>
                        {currentPesertaOptions.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--color-crimson)', fontWeight: 700, marginBottom: '4px' }}>
                        Peserta Absen (Kalah &amp; Denda -50 Skor)
                      </label>
                      <select
                        value={woAbsen}
                        onChange={(e) => setWoAbsen(e.target.value)}
                        style={{ width: '100%', background: 'var(--color-white)', border: '1.5px solid var(--border-subtle)', padding: '8px', color: 'var(--color-black)', borderRadius: 'var(--radius-xs)', fontWeight: 600 }}
                      >
                        <option value="">Pilih yang absen</option>
                        {currentPesertaOptions.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                )}

                <button type="submit" className="btn-unhas btn-crimson" style={{ marginTop: '8px' }}>
                  Simpan Hasil Duel
                </button>
              </form>
            )}

            {/* TAB 2: MVP */}
            {activeTab === 'mvp' && (
              <form onSubmit={handleSaveMvp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {mvpStatusMsg && (
                  <div style={{ padding: '8px 12px', borderRadius: 'var(--radius-xs)', background: 'var(--status-win-bg)', color: 'var(--status-win)', fontSize: '0.82rem', fontWeight: 700 }}>
                    {mvpStatusMsg}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--color-charcoal)', fontWeight: 700, marginBottom: '4px' }}>DIVISI</label>
                    <select
                      value={mvpLiga}
                      onChange={(e) => setMvpLiga(e.target.value as LigaType)}
                      style={{ width: '100%', background: 'var(--color-white)', border: '1.5px solid var(--border-subtle)', padding: '8px', color: 'var(--color-black)', borderRadius: 'var(--radius-xs)', fontWeight: 600 }}
                    >
                      <option value="mcl">MCL</option>
                      <option value="mrl">MRL</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--color-charcoal)', fontWeight: 700, marginBottom: '4px' }}>PEKAN</label>
                    <select
                      value={mvpPekan}
                      onChange={(e) => setMvpPekan(Number(e.target.value))}
                      style={{ width: '100%', background: 'var(--color-white)', border: '1.5px solid var(--border-subtle)', padding: '8px', color: 'var(--color-black)', borderRadius: 'var(--radius-xs)', fontWeight: 600 }}
                    >
                      {Array.from({ length: 9 }, (_, i) => i + 1).map(p => <option key={p} value={p}>Pekan #{p}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--color-charcoal)', fontWeight: 700, marginBottom: '4px' }}>Nama Peserta Terpilih</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kumiko"
                    value={mvpNama}
                    onChange={(e) => setMvpNama(e.target.value)}
                    style={{ width: '100%', background: 'var(--color-white)', border: '1.5px solid var(--border-subtle)', padding: '8px', color: 'var(--color-black)', borderRadius: 'var(--radius-xs)', fontWeight: 600 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--color-charcoal)', fontWeight: 700, marginBottom: '4px' }}>URL Foto Potret (Opsional)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={mvpFoto}
                    onChange={(e) => setMvpFoto(e.target.value)}
                    style={{ width: '100%', background: 'var(--color-white)', border: '1.5px solid var(--border-subtle)', padding: '8px', color: 'var(--color-black)', borderRadius: 'var(--radius-xs)' }}
                  />
                </div>

                {/* Adjustment Sliders */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-charcoal)', fontWeight: 700 }}>POSISI X ({mvpPosX}%)</label>
                    <input type="range" min="0" max="100" value={mvpPosX} onChange={(e) => setMvpPosX(Number(e.target.value))} style={{ width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-charcoal)', fontWeight: 700 }}>POSISI Y ({mvpPosY}%)</label>
                    <input type="range" min="0" max="100" value={mvpPosY} onChange={(e) => setMvpPosY(Number(e.target.value))} style={{ width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-charcoal)', fontWeight: 700 }}>SKALA ({mvpSkala}%)</label>
                    <input type="range" min="50" max="200" value={mvpSkala} onChange={(e) => setMvpSkala(Number(e.target.value))} style={{ width: '100%' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--color-charcoal)', fontWeight: 700, marginBottom: '4px' }}>Kutipan Evaluasi Dewan Juri</label>
                  <input
                    type="text"
                    placeholder="Solusi kilat dengan akurasi prima di babak aljabar linier..."
                    value={mvpCatatan}
                    onChange={(e) => setMvpCatatan(e.target.value)}
                    style={{ width: '100%', background: 'var(--color-white)', border: '1.5px solid var(--border-subtle)', padding: '8px', color: 'var(--color-black)', borderRadius: 'var(--radius-xs)' }}
                  />
                </div>

                <button type="submit" className="btn-unhas btn-crimson">
                  Perbarui MVP Pekan
                </button>
              </form>
            )}

            {/* TAB 3: PODIUM */}
            {activeTab === 'champions' && (
              <form onSubmit={handleSaveJuara} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {juaraStatusMsg && (
                  <div style={{ padding: '8px 12px', borderRadius: 'var(--radius-xs)', background: 'var(--status-win-bg)', color: 'var(--status-win)', fontSize: '0.82rem', fontWeight: 700 }}>
                    {juaraStatusMsg}
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--color-charcoal)', fontWeight: 700, marginBottom: '4px' }}>DIVISI LIGA</label>
                  <select
                    value={juaraLiga}
                    onChange={(e) => setJuaraLiga(e.target.value as LigaType)}
                    style={{ width: '100%', background: 'var(--color-white)', border: '1.5px solid var(--border-subtle)', padding: '8px', color: 'var(--color-black)', borderRadius: 'var(--radius-xs)', fontWeight: 600 }}
                  >
                    <option value="mcl">MCL</option>
                    <option value="mrl">MRL</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--color-black)', fontWeight: 800, marginBottom: '4px' }}>
                    Juara 1 (Champion)
                  </label>
                  <input
                    type="text"
                    placeholder="Nama Juara 1"
                    value={juara1}
                    onChange={(e) => setJuara1(e.target.value)}
                    style={{ width: '100%', background: 'var(--color-white)', border: '1.5px solid var(--border-subtle)', padding: '8px', color: 'var(--color-black)', borderRadius: 'var(--radius-xs)', fontWeight: 600 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--color-charcoal)', fontWeight: 800, marginBottom: '4px' }}>
                    Juara 2 (Runner Up)
                  </label>
                  <input
                    type="text"
                    placeholder="Nama Juara 2"
                    value={juara2}
                    onChange={(e) => setJuara2(e.target.value)}
                    style={{ width: '100%', background: 'var(--color-white)', border: '1.5px solid var(--border-subtle)', padding: '8px', color: 'var(--color-black)', borderRadius: 'var(--radius-xs)', fontWeight: 600 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--color-charcoal)', fontWeight: 800, marginBottom: '4px' }}>
                    Juara 3 (3rd Place)
                  </label>
                  <input
                    type="text"
                    placeholder="Nama Juara 3"
                    value={juara3}
                    onChange={(e) => setJuara3(e.target.value)}
                    style={{ width: '100%', background: 'var(--color-white)', border: '1.5px solid var(--border-subtle)', padding: '8px', color: 'var(--color-black)', borderRadius: 'var(--radius-xs)', fontWeight: 600 }}
                  />
                </div>

                <button type="submit" className="btn-unhas btn-crimson">
                  Perbarui Podium Juara
                </button>
              </form>
            )}

            {/* TAB 4: PESERTA */}
            {activeTab === 'peserta' && (
              <form onSubmit={handleAddPeserta} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {pesertaStatusMsg && (
                  <div style={{ padding: '8px 12px', borderRadius: 'var(--radius-xs)', background: 'var(--status-win-bg)', color: 'var(--status-win)', fontSize: '0.82rem', fontWeight: 700 }}>
                    {pesertaStatusMsg}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--color-charcoal)', fontWeight: 700, marginBottom: '4px' }}>DIVISI</label>
                    <select
                      value={newPesertaLiga}
                      onChange={(e) => setNewPesertaLiga(e.target.value as LigaType)}
                      style={{ width: '100%', background: 'var(--color-white)', border: '1.5px solid var(--border-subtle)', padding: '8px', color: 'var(--color-black)', borderRadius: 'var(--radius-xs)', fontWeight: 600 }}
                    >
                      <option value="mcl">MCL</option>
                      <option value="mrl">MRL</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--color-charcoal)', fontWeight: 700, marginBottom: '4px' }}>Nama Peserta Baru</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama peserta..."
                      value={newPesertaNama}
                      onChange={(e) => setNewPesertaNama(e.target.value)}
                      style={{ width: '100%', background: 'var(--color-white)', border: '1.5px solid var(--border-subtle)', padding: '8px', color: 'var(--color-black)', borderRadius: 'var(--radius-xs)', fontWeight: 600 }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-unhas btn-crimson">
                  + Daftarkan Peserta
                </button>
              </form>
            )}

            {/* TAB 5: SERVER */}
            {activeTab === 'rls' && (
              <div style={{ fontSize: '0.84rem', color: 'var(--color-charcoal)', lineHeight: 1.6 }}>
                <div style={{
                  background: 'var(--status-win-bg)',
                  border: '1px solid rgba(15, 138, 95, 0.3)',
                  padding: '14px',
                  borderRadius: 'var(--radius-xs)',
                  marginBottom: '16px'
                }}>
                  <b style={{ color: 'var(--status-win)' }}>Backend Next.js Aktif &amp; Terproteksi:</b> Seluruh data hasil pertandingan, peserta, podium, dan MVP tersinkronisasi otomatis pada server Next.js dan tidak akan terhambat oleh batasan RLS Supabase.
                </div>

                <p style={{ marginBottom: '10px' }}>
                  Jika staf pengelola ingin mengaktifkan kebijakan tulis publik di Supabase SQL Editor:
                </p>

                <pre style={{
                  background: 'var(--bg-surface-subtle)',
                  padding: '12px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-subtle)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  overflowX: 'auto',
                  color: 'var(--color-black)'
                }}>
{`-- Eksekusi di SQL Editor Supabase:
CREATE POLICY "Public insert pertandingan" ON pertandingan FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update pertandingan" ON pertandingan FOR UPDATE USING (true);
CREATE POLICY "Public insert mvp_pekan" ON mvp_pekan FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update mvp_pekan" ON mvp_pekan FOR UPDATE USING (true);`}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
