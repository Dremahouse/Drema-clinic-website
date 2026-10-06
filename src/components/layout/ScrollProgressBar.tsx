'use client';

import { useEffect, useRef } from 'react';

function getScrollProgress() {
  const doc = document.documentElement;
  const scrollTop = window.scrollY || doc.scrollTop || 0;
  const scrollRange = doc.scrollHeight - window.innerHeight;
  if (scrollRange <= 0) return 0;
  return Math.min(1, Math.max(0, scrollTop / scrollRange));
}

export default function ScrollProgressBar() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      fillRef.current?.style.setProperty(
        'transform',
        `scaleX(${getScrollProgress()})`,
      );
      rafId = 0;
    };

    const requestUpdate = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="site-scroll-progress-track" aria-hidden="true">
      <div
        ref={fillRef}
        className="site-scroll-progress-fill"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}

