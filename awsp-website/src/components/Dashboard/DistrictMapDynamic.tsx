'use client';

import dynamic from 'next/dynamic';

const DistrictMap = dynamic(
  () => import('./DistrictMap'),
  {
    ssr: false,
    loading: () => (
      <div style={{
        height: '380px', width: '100%', borderRadius: '12px',
        background: 'linear-gradient(180deg, #F4F0E3, #E8DDC2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--gray-500)', fontSize: '14px',
        fontFamily: 'Source Sans 3, sans-serif',
      }}>
        Loading map...
      </div>
    ),
  }
);

export default DistrictMap;
