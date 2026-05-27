'use client';

import { useState, useEffect, useCallback } from 'react';

interface PDFViewerProps {
  url: string;
  title?: string;
  onClose?: () => void;
  locale?: string;
}

interface PDFDocumentProxy {
  numPages: number;
}

interface PDFPageProxy {
  getViewport: (opts: { scale: number }) => { width: number; height: number };
  render: (ctx: { canvasContext: CanvasRenderingContext2D; viewport: { width: number; height: number } }) => { promise: Promise<void> };
}

export default function PDFViewer({ url, title, onClose, locale = 'en' }: PDFViewerProps) {
  const [numPages, setNumPages]   = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pdfDoc, setPdfDoc]       = useState<any>(null);
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);

  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && onClose) onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Load PDF via pdfjs-dist (bundled with react-pdf)
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    import('react-pdf').then(({ pdfjs }) => {
      pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      return pdfjs.getDocument(url).promise;
    }).then((doc: PDFDocumentProxy) => {
      if (cancelled) return;
      setPdfDoc(doc);
      setNumPages(doc.numPages);
      setLoading(false);
    }).catch(() => {
      if (!cancelled) { setError(true); setLoading(false); }
    });

    return () => { cancelled = true; };
  }, [url]);

  // Render page onto canvas
  const renderPage = useCallback(async (canvas: HTMLCanvasElement, doc: PDFDocumentProxy, pgNum: number) => {
    const page: PDFPageProxy = await (doc as unknown as { getPage: (n: number) => Promise<PDFPageProxy> }).getPage(pgNum);
    const maxWidth = Math.min(window.innerWidth - 80, 960);
    const unscaled = page.getViewport({ scale: 1 });
    const scale = maxWidth / unscaled.width;
    const viewport = page.getViewport({ scale });

    canvas.width  = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    await page.render({ canvasContext: ctx, viewport }).promise;
  }, []);

  useEffect(() => {
    if (!pdfDoc || !canvasRef) return;
    renderPage(canvasRef, pdfDoc, pageNumber);
  }, [pdfDoc, canvasRef, pageNumber, renderPage]);

  const prev = () => setPageNumber(p => Math.max(1, p - 1));
  const next = () => setPageNumber(p => Math.min(numPages, p + 1));

  const btnStyle = (disabled: boolean): React.CSSProperties => ({
    width: '32px', height: '32px', borderRadius: '6px',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'transparent',
    color: disabled ? 'rgba(255,255,255,0.3)' : '#fff',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  });

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(10,31,56,0.94)',
      backdropFilter: 'blur(8px)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>

      {/* Toolbar */}
      <div style={{
        width: '100%', background: 'var(--ink-800)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '12px 20px',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', gap: '16px', flexShrink: 0,
      }}>

        {/* Title + page count */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: ff, fontSize: '14px', fontWeight: '600', color: '#fff',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {title || 'Document'}
          </div>
          {numPages > 0 && (
            <div style={{ fontFamily: ff, fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
              {isAr ? `صفحة ${pageNumber} من ${numPages}` : `Page ${pageNumber} of ${numPages}`}
            </div>
          )}
        </div>

        {/* Pagination */}
        {numPages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <button onClick={prev} disabled={pageNumber <= 1} style={btnStyle(pageNumber <= 1)}>←</button>
            <span style={{
              fontFamily: ff, fontSize: '13px', color: 'rgba(255,255,255,0.7)',
              minWidth: '64px', textAlign: 'center',
            }}>
              {pageNumber} / {numPages}
            </span>
            <button onClick={next} disabled={pageNumber >= numPages} style={btnStyle(pageNumber >= numPages)}>→</button>
          </div>
        )}

        {/* Download + Close */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <a
            href={url} download
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '7px 14px', borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'transparent', color: '#fff',
              fontSize: '13px', fontWeight: '600', fontFamily: ff,
              textDecoration: 'none',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 14, height: 14 }}>
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {isAr ? 'تحميل' : 'Download'}
          </a>
          {onClose && (
            <button
              onClick={onClose}
              aria-label={isAr ? 'إغلاق' : 'Close'}
              style={{
                width: '36px', height: '36px', borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'transparent', color: '#fff',
                cursor: 'pointer', fontSize: '20px', lineHeight: '1',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}
            >×</button>
          )}
        </div>
      </div>

      {/* Scrollable document area */}
      <div style={{
        flex: 1, overflow: 'auto', width: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '24px 16px',
      }}>
        {loading && !error && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            color: 'rgba(255,255,255,0.6)', fontFamily: ff, fontSize: '14px',
            marginTop: '80px',
          }}>
            <span style={{
              width: '20px', height: '20px',
              border: '2px solid rgba(255,255,255,0.2)',
              borderTopColor: 'rgba(255,255,255,0.8)',
              borderRadius: '50%', display: 'inline-block',
              animation: 'pdfSpin 0.8s linear infinite',
            }} />
            {isAr ? 'جارٍ التحميل...' : 'Loading document...'}
          </div>
        )}

        {error && (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '16px', color: 'rgba(255,255,255,0.7)',
            fontFamily: ff, marginTop: '80px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px' }}>⚠</div>
            <p style={{ fontSize: '15px', maxWidth: '36ch', margin: 0 }}>
              {isAr ? 'تعذّر تحميل المستند. يمكنك تحميله مباشرة.' : 'Unable to load the document. Download it directly instead.'}
            </p>
            <a href={url} download style={{
              padding: '10px 24px', background: 'rgba(255,255,255,0.15)',
              color: '#fff', borderRadius: '8px',
              textDecoration: 'none', fontWeight: '600', fontFamily: ff,
            }}>
              {isAr ? 'تحميل PDF' : 'Download PDF'}
            </a>
          </div>
        )}

        {!loading && !error && (
          <canvas
            ref={setCanvasRef}
            style={{
              display: 'block',
              borderRadius: '4px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
              maxWidth: '100%',
            }}
          />
        )}
      </div>

      <style>{`
        @keyframes pdfSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
