'use client';

import { useEffect, useRef } from 'react';

interface District {
  en: string;
  ar: string;
  count: number;
  inv: string;
}

interface DistrictMapProps {
  districts: District[];
  hoveredDistrict: string | null;
  onHover: (name: string | null) => void;
  metric: 'count' | 'investment' | 'sector';
  locale: string;
}

const DISTRICT_DATA: Record<string, { count: number; inv: string; color: string }> = {
  'Al-Mansoura':   { count: 34, inv: '$9.4M', color: '#2A8A8A' },
  'Al-Buraiqeh':   { count: 33, inv: '$8.1M', color: '#2A8A8A' },
  'Sheikh Othman': { count: 31, inv: '$7.8M', color: '#E8B14A' },
  'Khormaksar':    { count: 28, inv: '$7.2M', color: '#E8B14A' },
  'Crater':        { count: 21, inv: '$5.1M', color: '#2A8A8A' },
  'Al-Mualla':     { count: 19, inv: '$4.8M', color: '#3B8FD4' },
  'Dar Saad':      { count: 15, inv: '$4.6M', color: '#2A8A8A' },
  'Tawahi':        { count: 12, inv: '$3.6M', color: '#3B8FD4' },
};

function getColor(count: number): string {
  if (count >= 30) return '#0D7A6E';
  if (count >= 25) return '#2A8A8A';
  if (count >= 20) return '#3FA89A';
  if (count >= 15) return '#6BC3B6';
  return '#A8DDD7';
}

export default function DistrictMap({
  districts,
  hoveredDistrict,
  onHover,
  metric,
  locale,
}: DistrictMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const layersRef = useRef<Record<string, any>>({});
  const isAr = locale === 'ar';

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import('leaflet').then(L => {
      // Fix default marker icons
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(mapRef.current!, {
        center: [12.82, 45.02],
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
      });

      mapInstanceRef.current = map;

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
          attribution: '© OpenStreetMap contributors © CARTO',
          subdomains: 'abcd',
          maxZoom: 16,
        }
      ).addTo(map);

      fetch('/data/aden-districts.geojson')
        .then(r => r.json())
        .then(geojson => {
          L.geoJSON(geojson, {
            style: feature => {
              const name = feature?.properties?.name || '';
              const data = DISTRICT_DATA[name];
              const count = data?.count || 0;
              return {
                fillColor: getColor(count),
                fillOpacity: 0.55,
                color: '#0E2A47',
                weight: 1.5,
                opacity: 0.8,
              };
            },
            onEachFeature: (feature, layer) => {
              const name: string = feature.properties?.name || '';
              const nameAr: string = feature.properties?.name_ar || name;
              const data = DISTRICT_DATA[name];

              layersRef.current[name] = layer;

              layer.bindTooltip(
                `<div style="font-family: Source Sans 3, sans-serif; min-width: 140px;">
                  <strong style="font-size: 14px; color: #0E2A47; font-family: Source Serif 4, serif;">
                    ${isAr ? nameAr : name}
                  </strong>
                  <div style="font-size: 12px; color: #6B6B6B; margin-top: 4px;">
                    ${data?.count || 0} projects · ${data?.inv || 'N/A'}
                  </div>
                </div>`,
                { permanent: false, sticky: true, className: 'awsp-tooltip' }
              );

              // Count label marker
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const bounds = (layer as any).getBounds();
              const center = bounds.getCenter();
              L.marker(center, {
                icon: L.divIcon({
                  className: 'district-label',
                  html: `<div style="
                    background: rgba(14,42,71,0.85);
                    color: white;
                    padding: 4px 8px;
                    border-radius: 12px;
                    font-size: 12px;
                    font-weight: 700;
                    font-family: Source Sans 3, sans-serif;
                    white-space: nowrap;
                    text-align: center;
                  ">${data?.count || ''}</div>`,
                  iconAnchor: [20, 12],
                }),
              }).addTo(map);

              layer.on('mouseover', () => {
                onHover(name);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (layer as any).setStyle({ fillOpacity: 0.85, weight: 2.5 });
              });
              layer.on('mouseout', () => {
                onHover(null);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (layer as any).setStyle({ fillOpacity: 0.55, weight: 1.5 });
              });
            },
          }).addTo(map);
        });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  // onHover and isAr are stable refs / derived values — intentionally omitted
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync hover highlight from table
  useEffect(() => {
    Object.entries(layersRef.current).forEach(([name, layer]) => {
      const isHovered = hoveredDistrict === name;
      layer.setStyle({
        fillOpacity: isHovered ? 0.85 : 0.55,
        weight: isHovered ? 2.5 : 1.5,
      });
    });
  }, [hoveredDistrict]);

  // Suppress unused-variable warnings for props only used in render/effects
  void districts;
  void metric;

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div ref={mapRef} style={{ height: '380px', width: '100%', borderRadius: '12px' }} />
      <style>{`
        .awsp-tooltip {
          background: white !important;
          border: 1px solid #E5DFD0 !important;
          border-radius: 8px !important;
          padding: 10px 14px !important;
          box-shadow: 0 4px 16px rgba(14,42,71,0.12) !important;
        }
        .awsp-tooltip::before { display: none !important; }
        .district-label { background: transparent !important; border: none !important; }
        .leaflet-control-attribution { font-size: 9px !important; }
      `}</style>
    </>
  );
}
