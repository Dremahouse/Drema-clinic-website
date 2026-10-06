'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type HoverScaleProps = {
  children: ReactNode;
  className?: string;
  scale?: number;
};

export default function HoverScale({
  children,
  className,
  scale = 1.02,
}: HoverScaleProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
