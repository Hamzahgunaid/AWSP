'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await signIn('credentials', { username, password, redirect: false });
    setLoading(false);
    if (res?.ok) {
      router.push('/admin');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: '#0E2A47',
    }}>
      <div style={{
        background: '#fff', borderRadius: '16px',
        padding: '48px', width: '100%', maxWidth: '420px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '12px',
            background: '#0E2A47', display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 16px', fontSize: '24px', color: '#fff',
          }}>⊞</div>
          <h1 style={{
            fontFamily: 'Source Serif 4, serif', fontSize: '24px',
            fontWeight: '500', color: '#0E2A47', margin: '0 0 6px',
          }}>
            AWSP Admin
          </h1>
          <p style={{ fontSize: '14px', color: '#6B6B6B', margin: 0 }}>
            Content Management System
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="username" style={{ fontSize: '13px', fontWeight: '600', color: '#0E2A47' }}>
              Username
            </label>
            <input id="username" type="text" value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="admin" autoComplete="username" required
              style={{
                padding: '12px 14px', fontSize: '14px', border: '1px solid #E5DFD0',
                borderRadius: '8px', outline: 'none', background: '#F9F7F4',
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="password" style={{ fontSize: '13px', fontWeight: '600', color: '#0E2A47' }}>
              Password
            </label>
            <input id="password" type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" autoComplete="current-password" required
              style={{
                padding: '12px 14px', fontSize: '14px', border: '1px solid #E5DFD0',
                borderRadius: '8px', outline: 'none', background: '#F9F7F4',
              }}
            />
          </div>

          {error && (
            <div style={{
              padding: '12px 16px', background: 'rgba(194,90,78,0.08)',
              border: '1px solid rgba(194,90,78,0.3)',
              borderRadius: '8px', fontSize: '13px', color: '#B23E33',
            }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            padding: '14px', fontSize: '15px', fontWeight: '600',
            background: loading ? '#BFBFBF' : '#0E2A47', color: '#fff',
            border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '8px', transition: 'background 160ms ease',
          }}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
