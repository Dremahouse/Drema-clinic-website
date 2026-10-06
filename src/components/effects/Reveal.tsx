'use client';

import { motion, useInView } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
};

export default function Reveal({
  children,
  delay = 0,
  y = 20,
  once = true,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once, margin: '-10% 0px -10% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, scale: 0.985, filter: 'blur(5px)' }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
          : { opacity: 0, y, scale: 0.985, filter: 'blur(5px)' }
      }
      transition={{ duration: 0.62, ease: [0.22, 0.85, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
