import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en" dir="ltr">
      <body style={{ margin: 0, background: 'var(--ink-900)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Source Sans 3, system-ui, sans-serif' }}>
        <div style={{ textAlign: 'center', color: '#fff', padding: '48px 24px' }}>
          <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '120px', fontWeight: '300', lineHeight: 1, color: 'rgba(255,255,255,0.12)', letterSpacing: '-0.04em', marginBottom: '0' }}>
            404
          </div>
          <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '28px', fontWeight: '400', color: '#fff', marginBottom: '16px', marginTop: '-16px' }}>
            Page not found
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', maxWidth: '40ch', margin: '0 auto 40px', lineHeight: 1.6 }}>
            The page you are looking for does not exist or has been moved.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/en" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 24px', background: 'rgba(255,255,255,0.95)', color: '#0E2A47', borderRadius: '8px', fontSize: '15px', fontWeight: '600', textDecoration: 'none' }}>
              ← Back to Home (EN)
            </Link>
            <Link href="/ar" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 24px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: '8px', fontSize: '15px', fontWeight: '600', textDecoration: 'none', fontFamily: 'Cairo, sans-serif' }}>
              العودة للرئيسية
            </Link>
          </div>
          <div style={{ marginTop: '48px' }}>
            <img src="/images/awsp-logo-mark.png" alt="AWSP" style={{ width: '48px', height: '48px', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.3, margin: '0 auto' }} />
          </div>
        </div>
      </body>
    </html>
  );
}
