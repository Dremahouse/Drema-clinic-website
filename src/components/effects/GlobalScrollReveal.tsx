'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const TARGET_SELECTOR = 'main section, main article';

export default function GlobalScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    void pathname;

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(TARGET_SELECTOR)
    );
    if (!nodes.length) return;

    nodes.forEach((node, index) => {
      if (node.dataset.revealIgnore === 'true') return;
      node.classList.add('reveal-on-scroll');
      node.style.transitionDelay = `${Math.min(index * 28, 220)}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    );

    nodes.forEach((node) => {
      if (node.dataset.revealIgnore === 'true') return;
      observer.observe(node);
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
