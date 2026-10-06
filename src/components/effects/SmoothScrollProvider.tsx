'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';

type LenisCtor = new (
  options?: Record<string, unknown>
) => {
  raf: (time: number) => void;
  destroy: () => void;
};

type SmoothScrollProviderProps = {
  children: ReactNode;
};

function importLenis() {
  const dynamicImport = new Function(
    'modulePath',
    'return import(modulePath);'
  ) as (
    modulePath: string
  ) => Promise<{ default?: LenisCtor; Lenis?: LenisCtor }>;

  return dynamicImport('@studio-freight/lenis');
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  useEffect(() => {
    let frame = 0;
    let stopped = false;
    let cleanup = () => undefined;

    const start = async () => {
      try {
        const lenisMod = await importLenis();
        const Lenis = (lenisMod.default || lenisMod.Lenis) as
          | LenisCtor
          | undefined;
        if (!Lenis) return;

        const lenis = new Lenis({
          duration: 1.1,
          smoothWheel: true,
          smoothTouch: false,
          wheelMultiplier: 1,
        });

        const loop = (time: number) => {
          if (stopped) return;
          lenis.raf(time);
          frame = window.requestAnimationFrame(loop);
        };

        frame = window.requestAnimationFrame(loop);
        cleanup = () => {
          window.cancelAnimationFrame(frame);
          lenis.destroy();
        };
      } catch {
        cleanup = () => undefined;
      }
    };

    start();

    return () => {
      stopped = true;
      cleanup();
    };
  }, []);

  return <>{children}</>;
}
