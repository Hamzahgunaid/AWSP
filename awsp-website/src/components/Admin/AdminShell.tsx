'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/admin',           icon: '⊞', label: 'Dashboard' },
  { href: '/admin/news',      icon: '≡', label: 'News & Events' },
  { href: '/admin/knowledge', icon: '⊟', label: 'Knowledge Products' },
  { href: '/admin/phases',    icon: '◎', label: 'Phase Status' },
  { href: '/admin/partners',  icon: '⊕', label: 'Partners' },
  { href: '/admin/projects',  icon: '▦', label: 'Project Database' },
  { href: '/admin/taskforce', icon: '👥', label: 'Taskforce Members' },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px', flexShrink: 0,
        background: '#0E2A47', color: '#fff',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, bottom: 0, left: 0,
        zIndex: 50,
      }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', flexShrink: 0,
            }}>⊞</div>
            <div>
              <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: '15px', fontWeight: '600', color: '#fff' }}>AWSP</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Admin CMS</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {NAV.map(item => {
            const isActive = item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', borderRadius: '8px',
                fontSize: '14px', fontWeight: '500',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.65)',
                background: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                textDecoration: 'none', transition: 'all 150ms ease',
              }}>
                <span style={{ fontSize: '16px', flexShrink: 0 }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
            {session?.user?.name || 'Admin'}
          </div>
          <button onClick={() => signOut({ callbackUrl: '/admin/login' })}
            style={{
              width: '100%', padding: '8px', fontSize: '13px', fontWeight: '600',
              background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Sign out
          </button>
        </div>
      </aside>

      <main style={{ marginLeft: '240px', flex: 1, padding: '32px', minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  );
}
