'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <html lang="en" dir="ltr">
      <body style={{ margin: 0, background: 'var(--ink-900)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Source Sans 3, system-ui, sans-serif' }}>
        <div style={{ textAlign: 'center', color: '#fff', padding: '48px 24px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>⚠</div>
          <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '28px', fontWeight: '400', color: '#fff', marginBottom: '16px' }}>
            Something went wrong
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', maxWidth: '44ch', margin: '0 auto 36px', lineHeight: 1.6 }}>
            An unexpected error occurred. Please try again or return to the home page.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
            <button onClick={reset} style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.95)', color: '#0E2A47', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
              Try again
            </button>
            <a href="/en" style={{ padding: '12px 24px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: '8px', fontSize: '15px', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
