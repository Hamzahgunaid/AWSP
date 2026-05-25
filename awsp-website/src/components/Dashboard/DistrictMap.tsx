'use client';

import { useEffect, useRef } from 'react';

interface DistrictMapProps {
  hoveredDistrict: string | null;
  onHover: (name: string | null) => void;
  metric: 'count' | 'investment' | 'sector';
  locale: string;
}

const DISTRICT_DATA: Record<string, {
  count: number;
  inv: string;
  invNum: number;
  lat: number;
  lng: number;
  ar: string;
}> = {
  'Al-Mansoura':   { count: 34, inv: '$9.4M',  invNum: 9.4,  lat: 12.804, lng: 45.042, ar: 'المنصورة' },
  'Al-Buraiqeh':   { count: 33, inv: '$8.1M',  invNum: 8.1,  lat: 12.793, lng: 45.092, ar: 'البريقة' },
  'Sheikh Othman': { count: 31, inv: '$7.8M',  invNum: 7.8,  lat: 12.840, lng: 45.035, ar: 'الشيخ عثمان' },
  'Khormaksar':    { count: 28, inv: '$7.2M',  invNum: 7.2,  lat: 12.822, lng: 44.978, ar: 'خورمكسر' },
  'Crater':        { count: 21, inv: '$5.1M',  invNum: 5.1,  lat: 12.775, lng: 45.005, ar: 'كريتر' },
  'Al-Mualla':     { count: 19, inv: '$4.8M',  invNum: 4.8,  lat: 12.788, lng: 44.975, ar: 'المعلا' },
  'Dar Saad':      { count: 15, inv: '$4.6M',  invNum: 4.6,  lat: 12.878, lng: 45.080, ar: 'دار سعد' },
  'Tawahi':        { count: 12, inv: '$3.6M',  invNum: 3.6,  lat: 12.772, lng: 44.948, ar: 'التواهي' },
};

// Scale bubble radius: min 18px, max 48px
function getBubbleRadius(
  value: number,
  allValues: number[],
  minR = 18,
  maxR = 48
): number {
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  if (max === min) return (minR + maxR) / 2;
  return minR + ((value - min) / (max - min)) * (maxR - minR);
}

export default function DistrictMap({
  hoveredDistrict, onHover, metric, locale
}: DistrictMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const circleLayersRef = useRef<Record<string, any>>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const geoLayerRef = useRef<any>(null);
  const isAr = locale === 'ar';

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import('leaflet').then(L => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      const map = L.map(mapRef.current!, {
        center: [12.815, 45.020],
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
        minZoom: 11,
        maxZoom: 16,
      });

      mapInstanceRef.current = map;

      // CartoDB light tiles — clean base
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
          attribution: '© OpenStreetMap contributors © CARTO',
          subdomains: 'abcd',
          maxZoom: 16,
        }
      ).addTo(map);

      // Load GeoJSON — thin outline only, NO fill
      fetch('/data/aden-districts.geojson')
        .then(r => r.json())
        .then(geojson => {
          geoLayerRef.current = L.geoJSON(geojson, {
            style: () => ({
              fillColor: 'transparent',
              fillOpacity: 0,
              color: '#2A8A8A',
              weight: 1.5,
              opacity: 0.5,
              dashArray: '4 3',
            }),
            onEachFeature: (feature, layer) => {
              const name = feature.properties?.name || '';
              layer.on('mouseover', () => onHover(name));
              layer.on('mouseout', () => onHover(null));
            },
          }).addTo(map);

          // After GeoJSON loads, draw bubbles
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
      // Remove old circles
      Object.values(circleLayersRef.current).forEach(c => c.remove());
      circleLayersRef.current = {};
      drawBubbles(L, mapInstanceRef.current, metric);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metric]);

  // Highlight hovered circle
  useEffect(() => {
    Object.entries(circleLayersRef.current).forEach(([name, circle]) => {
      const isHovered = hoveredDistrict === name;
      circle.setStyle({
        fillOpacity: isHovered ? 0.9 : 0.75,
        weight: isHovered ? 3 : 1.5,
        color: isHovered ? '#0E2A47' : '#fff',
      });
      if (isHovered) circle.bringToFront();
    });
  }, [hoveredDistrict]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function drawBubbles(L: any, map: any, currentMetric: string) {
    const entries = Object.entries(DISTRICT_DATA);

    // Get values for scaling
    const values = entries.map(([, d]) =>
      currentMetric === 'investment' ? d.invNum : d.count
    );

    entries.forEach(([name, d]) => {
      const value = currentMetric === 'investment' ? d.invNum : d.count;
      const radius = getBubbleRadius(value, values);
      const label = currentMetric === 'investment' ? d.inv : String(d.count);
      const distName = isAr ? d.ar : name;

      // Bubble colour — teal for water/high, sand for sanitation/medium, blue for infra/low
      const bubbleColor =
        d.count >= 30 ? '#0D7A6E' :
        d.count >= 25 ? '#2A8A8A' :
        d.count >= 20 ? '#E8B14A' :
        '#3B8FD4';

      const textColor = d.count >= 20 && d.count < 25 ? '#0E2A47' : '#fff';

      // Create circle marker
      const circle = L.circleMarker([d.lat, d.lng], {
        radius,
        fillColor: bubbleColor,
        fillOpacity: 0.78,
        color: '#fff',
        weight: 1.5,
      });

      // Tooltip
      circle.bindTooltip(`
        <div style="font-family: Source Sans 3, sans-serif; min-width: 150px; padding: 2px;">
          <strong style="
            font-size: 14px; color: #0E2A47;
            font-family: Source Serif 4, serif;
            display: block; margin-bottom: 4px;
          ">${distName}</strong>
          <div style="font-size: 12px; color: #6B6B6B; display: flex; gap: 10px;">
            <span>${d.count} projects</span>
            <span>·</span>
            <span>${d.inv}</span>
          </div>
        </div>
      `, {
        permanent: false,
        sticky: false,
        direction: 'top',
        offset: [0, -radius],
        className: 'awsp-tooltip',
      });

      // Label on bubble
      const labelMarker = L.marker([d.lat, d.lng], {
        icon: L.divIcon({
          className: '',
          html: `
            <div style="
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              width: ${radius * 2}px;
              height: ${radius * 2}px;
              transform: translate(-50%, -50%);
              pointer-events: none;
            ">
              <span style="
                font-family: Source Serif 4, serif;
                font-size: ${radius > 30 ? 14 : 11}px;
                font-weight: 600;
                color: ${textColor};
                line-height: 1;
              ">${label}</span>
            </div>
          `,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        }),
        interactive: false,
        zIndexOffset: 1000,
      }).addTo(map);

      circle.on('mouseover', () => onHover(name));
      circle.on('mouseout', () => onHover(null));

      circle.addTo(map);
      circleLayersRef.current[name] = circle;
      // Store label too for cleanup
      circleLayersRef.current[`${name}_label`] = labelMarker;
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
          height: '380px', width: '100%', borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--line)',
        }}
      />
      <style>{`
        .awsp-tooltip {
          background: white !important;
          border: 1px solid #E5DFD0 !important;
          border-radius: 8px !important;
          padding: 10px 14px !important;
          box-shadow: 0 4px 16px rgba(14,42,71,0.12) !important;
          font-size: 13px !important;
        }
        .awsp-tooltip::before { display: none !important; }
        .leaflet-tooltip-top::before { display: none !important; }
        .leaflet-control-attribution {
          font-size: 9px !important;
          background: rgba(255,255,255,0.8) !important;
        }
        .leaflet-control-zoom a {
          color: var(--ink-800) !important;
          border-color: var(--line) !important;
        }
      `}</style>
    </>
  );
}
