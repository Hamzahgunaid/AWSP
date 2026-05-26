'use client';

import { useEffect, useRef, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Project = Record<string, any>;

const INTERVENTION_COLORS: Record<string, string> = {
  'Water Networks':              '#2A8A8A',
  'Well Rehabilitation':         '#0D7A6E',
  'Pumping Stations':            '#3B8FD4',
  'Wastewater Networks & Treatment': '#E8B14A',
  'Civil & Structural Works':    '#9B59B6',
  'Vehicles & Equipment':        '#6BC3B6',
  'Energy Sources':              '#F39C12',
  'Consultancies & Studies':     '#95A5A6',
  'Operations Management':       '#BFBFBF',
};
const DEFAULT_COLOR = '#6BC3B6';

export default function ProjectsMap({
  projects,
  locale,
}: {
  projects: Project[];
  locale: string;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([]);
  const [selected, setSelected] = useState<Project | null>(null);
  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import('leaflet').then(L => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      const map = L.map(mapRef.current!, {
        center: [12.815, 45.015],
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: true,
        attributionControl: true,
      });

      mapInstanceRef.current = map;

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        { attribution: '© OpenStreetMap contributors © CARTO', subdomains: 'abcd', maxZoom: 18 }
      ).addTo(map);

      // Plot project pins
      projects.forEach(p => {
        if (!p.lat || !p.lng) return;
        const color = INTERVENTION_COLORS[p.intervention_type_en] || DEFAULT_COLOR;
        const name = p.name_ar || p.name_en || '—';
        const districtLabel = p.district_ar || '—';
        const typeLabel = isAr
          ? (p.intervention_type_ar || p.intervention_type_en || '—')
          : (p.intervention_type_en || '—');

        const icon = L.divIcon({
          className: '',
          html: `<div style="
            width: 12px; height: 12px; border-radius: 50%;
            background: ${color}; border: 2px solid white;
            box-shadow: 0 1px 4px rgba(0,0,0,0.3);
            cursor: pointer;
          "></div>`,
          iconSize: [12, 12],
          iconAnchor: [6, 6],
        });

        const marker = L.marker([p.lat, p.lng], { icon });
        marker.on('click', () => setSelected(p));
        marker.bindTooltip(`
          <div style="font-family: Source Sans 3, sans-serif; font-size: 12px; max-width: 220px;">
            <strong style="color: #0E2A47; font-family: Source Serif 4, serif; font-size: 13px; display: block; margin-bottom: 4px;">
              ${name}
            </strong>
            <span style="color: #6B6B6B;">${districtLabel} · ${typeLabel}</span>
          </div>
        `, {
          className: 'awsp-tooltip',
          sticky: true,
        });

        marker.addTo(map);
        markersRef.current.push(marker);
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      markersRef.current = [];
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
      <div style={{ position: 'relative' }}>
        <div ref={mapRef} style={{
          height: '520px', width: '100%',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--line)',
          overflow: 'hidden',
        }} />

        {/* Intervention type legend */}
        <div style={{
          position: 'absolute', bottom: '16px', insetInlineStart: '16px',
          background: 'rgba(255,255,255,0.95)', padding: '12px 16px',
          borderRadius: '10px', border: '1px solid var(--line)',
          display: 'flex', flexDirection: 'column', gap: '7px',
          fontSize: '11px', fontFamily: ff,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          maxHeight: '260px', overflowY: 'auto',
        }}>
          {Object.entries(INTERVENTION_COLORS).map(([name, color]) => (
            <span key={name} style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
              {name}
            </span>
          ))}
        </div>

        {/* Project count badge */}
        <div style={{
          position: 'absolute', top: '16px', insetInlineEnd: '16px',
          background: 'rgba(255,255,255,0.95)', padding: '8px 14px',
          borderRadius: '999px', border: '1px solid var(--line)',
          fontSize: '12px', fontWeight: '600', fontFamily: ff,
          color: 'var(--ink-800)',
        }}>
          {projects.length} {isAr ? 'مشروع على الخريطة' : 'projects on map'}
        </div>

        {/* Selected project panel */}
        {selected && (
          <div style={{
            position: 'absolute', top: '16px', insetInlineStart: '16px',
            background: '#fff', border: '1px solid var(--line)',
            borderRadius: 'var(--radius-lg)', padding: '20px',
            maxWidth: '300px', zIndex: 1000,
            boxShadow: '0 4px 20px rgba(14,42,71,0.14)',
          }}>
            <button onClick={() => setSelected(null)}
              style={{
                position: 'absolute', top: '12px', insetInlineEnd: '12px',
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: 'var(--gray-400)', fontSize: '18px', lineHeight: 1,
                padding: '4px',
              }}>×</button>
            <div style={{
              display: 'inline-block', padding: '2px 8px',
              borderRadius: 'var(--radius-pill)', fontSize: '10px',
              fontWeight: '600', fontFamily: ff, marginBottom: '10px',
              background: 'rgba(42,138,138,0.1)', color: 'var(--teal-700)',
              textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>
              {isAr
                ? (selected.intervention_type_ar || selected.intervention_type_en || '—')
                : (selected.intervention_type_en || '—')}
            </div>
            <h4 style={{
              fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-serif)',
              fontSize: '14px', color: 'var(--ink-800)',
              lineHeight: 1.4, marginBottom: '12px', paddingInlineEnd: '24px',
            }}>
              {selected.name_ar || selected.name_en || '—'}
            </h4>
            {[
              { labelEn: 'District',     labelAr: 'المديرية',  val: selected.district_ar || '—' },
              { labelEn: 'Donor',        labelAr: 'المانح',    val: selected.donor_ar || '—' },
              { labelEn: 'Implementer',  labelAr: 'المنفذ',    val: selected.implementer_ar || '—' },
              { labelEn: 'Year',         labelAr: 'السنة',     val: String(selected.year || '—') },
              { labelEn: 'Cost',         labelAr: 'التكلفة',   val: selected.cost_usd > 0 ? `$${(selected.cost_usd/1000).toFixed(0)}K` : '—' },
            ].map(row => (
              <div key={row.labelEn} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--line)', fontSize: '12px', gap: '8px' }}>
                <span style={{ color: 'var(--gray-500)', fontFamily: ff, flexShrink: 0 }}>{isAr ? row.labelAr : row.labelEn}</span>
                <span style={{ color: 'var(--ink-800)', fontWeight: '500', fontFamily: ff, textAlign: 'end' }}>{row.val}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .awsp-tooltip {
          background: white !important; border: 1px solid #E5DFD0 !important;
          border-radius: 8px !important; padding: 10px 14px !important;
          box-shadow: 0 4px 16px rgba(14,42,71,0.12) !important;
        }
        .awsp-tooltip::before { display: none !important; }
      `}</style>
    </>
  );
}
