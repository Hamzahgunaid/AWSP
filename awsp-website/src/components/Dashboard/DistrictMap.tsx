'use client';

import { useEffect, useRef } from 'react';

interface DistrictMapProps {
  hoveredDistrict: string | null;
  onHover: (name: string | null) => void;
  metric: 'count' | 'investment' | 'sector';
  locale: string;
}

const DISTRICTS: Record<string, {
  count: number;
  inv: string;
  invNum: number;
  lat: number;
  lng: number;
  ar: string;
}> = {
  'Al-Mansoura':   { count: 34, inv: '$9.4M', invNum: 9.4, lat: 12.8020, lng: 45.0420, ar: 'المنصورة' },
  'Al-Buraiqeh':   { count: 33, inv: '$8.1M', invNum: 8.1, lat: 12.7880, lng: 45.0820, ar: 'البريقة' },
  'Sheikh Othman': { count: 31, inv: '$7.8M', invNum: 7.8, lat: 12.8480, lng: 45.0350, ar: 'الشيخ عثمان' },
  'Khormaksar':    { count: 28, inv: '$7.2M', invNum: 7.2, lat: 12.8220, lng: 44.9800, ar: 'خورمكسر' },
  'Crater':        { count: 21, inv: '$5.1M', invNum: 5.1, lat: 12.7760, lng: 45.0140, ar: 'كريتر' },
  'Al-Mualla':     { count: 19, inv: '$4.8M', invNum: 4.8, lat: 12.7890, lng: 44.9820, ar: 'المعلا' },
  'Dar Saad':      { count: 15, inv: '$4.6M', invNum: 4.6, lat: 12.8800, lng: 45.0720, ar: 'دار سعد' },
  'Tawahi':        { count: 12, inv: '$3.6M', invNum: 3.6, lat: 12.7700, lng: 44.9500, ar: 'التواهي' },
};

// Count ranges: <15 = small, 16-30 = medium, >30 = large
function getCountRadius(count: number): number {
  if (count > 30) return 38;
  if (count >= 16) return 26;
  return 18;
}

// Investment: scale min 16px to max 40px proportionally
function getInvRadius(invNum: number): number {
  const min = 3.6;
  const max = 9.4;
  return 16 + ((invNum - min) / (max - min)) * 24;
}

// Count colour scale — 3 tiers
function getCountColor(count: number): string {
  if (count > 30) return '#0D7A6E'; // dark teal — largest
  if (count >= 16) return '#2A8A8A'; // mid teal
  return '#6BC3B6';                  // light teal — smallest
}

export default function DistrictMap({
  hoveredDistrict, onHover, metric, locale,
}: DistrictMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const circleLayersRef = useRef<Record<string, any>>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const labelLayersRef = useRef<Record<string, any>>({});
  const isAr = locale === 'ar';

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import('leaflet').then(L => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      const map = L.map(mapRef.current!, {
        center: [12.815, 45.015],
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
        minZoom: 11,
        maxZoom: 16,
      });

      mapInstanceRef.current = map;

      // CartoDB light tiles
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
          attribution: '© OpenStreetMap contributors © CARTO',
          subdomains: 'abcd',
          maxZoom: 16,
        }
      ).addTo(map);

      // GeoJSON — OUTLINE ONLY, zero fill, no dashArray
      fetch('/data/aden-districts.geojson')
        .then(r => r.json())
        .then(geojson => {
          L.geoJSON(geojson, {
            style: () => ({
              fillColor: 'transparent',
              fillOpacity: 0,           // NO fill at all
              color: '#2A8A8A',
              weight: 1.2,
              opacity: 0.35,
              dashArray: '',            // solid thin line, no dashes
            }),
          }).addTo(map);

          // Draw bubbles after boundaries load
          drawBubbles(L, map, metric);
        });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redraw bubbles when metric changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    import('leaflet').then(L => {
      Object.values(circleLayersRef.current).forEach(c => c.remove());
      Object.values(labelLayersRef.current).forEach(l => l.remove());
      circleLayersRef.current = {};
      labelLayersRef.current = {};
      drawBubbles(L, mapInstanceRef.current, metric);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metric, isAr]);

  // Hover highlight
  useEffect(() => {
    Object.entries(circleLayersRef.current).forEach(([name, circle]) => {
      const isHov = hoveredDistrict === name;
      circle.setStyle({
        fillOpacity: isHov ? 0.95 : 0.78,
        weight: isHov ? 3 : 1.5,
        color: isHov ? '#0E2A47' : 'rgba(255,255,255,0.8)',
      });
      if (isHov) circle.bringToFront();
    });
  }, [hoveredDistrict]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function drawBubbles(L: any, map: any, currentMetric: string) {
    Object.entries(DISTRICTS).forEach(([name, d]) => {
      const isCount = currentMetric !== 'investment';

      // Radius — count tiers OR investment proportional
      const radius = isCount
        ? getCountRadius(d.count)
        : getInvRadius(d.invNum);

      // Color — count = 3-tier teal, investment = single unified sand
      const fillColor = isCount
        ? getCountColor(d.count)
        : '#2A8A8A'; // unified teal for investment tab

      // Label: count number OR investment amount
      const label = isCount ? String(d.count) : d.inv;
      const distName = isAr ? d.ar : name;

      // Text colour — white on dark teal, dark on light
      const textColor =
        fillColor === '#6BC3B6' ? '#0E2A47' : '#fff';

      // Circle marker at exact district centre
      const circle = L.circleMarker([d.lat, d.lng], {
        radius,
        fillColor,
        fillOpacity: 0.78,
        color: 'rgba(255,255,255,0.8)',
        weight: 1.5,
      });

      // Tooltip — appears above bubble
      circle.bindTooltip(`
        <div style="
          font-family: Source Sans 3, sans-serif;
          min-width: 160px; padding: 2px;
        ">
          <strong style="
            font-size: 14px; color: #0E2A47;
            font-family: Source Serif 4, serif;
            display: block; margin-bottom: 6px;
          ">${distName}</strong>
          <div style="
            display: flex; gap: 10px;
            font-size: 12px; color: #6B6B6B;
          ">
            <span>📍 ${d.count} projects</span>
            <span>💰 ${d.inv}</span>
          </div>
        </div>
      `, {
        permanent: false,
        sticky: false,
        direction: 'top',
        offset: [0, -(radius + 4)],
        className: 'awsp-tooltip',
      });

      // Label marker — centred on bubble
      const labelMarker = L.marker([d.lat, d.lng], {
        icon: L.divIcon({
          className: '',
          html: `<div style="
            position: absolute;
            transform: translate(-50%, -50%);
            font-family: Source Serif 4, serif;
            font-size: ${radius > 30 ? 15 : radius > 20 ? 12 : 10}px;
            font-weight: 700;
            color: ${textColor};
            pointer-events: none;
            white-space: nowrap;
            text-align: center;
            line-height: 1;
          ">${label}</div>`,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        }),
        interactive: false,
        zIndexOffset: 1000,
      });

      circle.on('mouseover', () => onHover(name));
      circle.on('mouseout', () => onHover(null));

      circle.addTo(map);
      labelMarker.addTo(map);

      circleLayersRef.current[name] = circle;
      labelLayersRef.current[name] = labelMarker;
    });
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div
        ref={mapRef}
        style={{
          height: '380px',
          width: '100%',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--line)',
        }}
      />
      <style>{`
        .awsp-tooltip {
          background: white !important;
          border: 1px solid #E5DFD0 !important;
          border-radius: 10px !important;
          padding: 12px 16px !important;
          box-shadow: 0 4px 20px rgba(14,42,71,0.14) !important;
          font-size: 13px !important;
        }
        .awsp-tooltip::before,
        .leaflet-tooltip-top::before { display: none !important; }
        .leaflet-control-attribution {
          font-size: 9px !important;
          background: rgba(255,255,255,0.75) !important;
        }
        .leaflet-control-zoom a {
          color: #0E2A47 !important;
          border-color: #E5DFD0 !important;
        }
      `}</style>
    </>
  );
}
