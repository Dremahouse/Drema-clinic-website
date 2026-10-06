'use client';

import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { useConsentManager } from './ConsentProvider';
import type { ConsentPreferences } from './types';

type GateCategory = Exclude<keyof ConsentPreferences, 'necessary'>;

export default function ConsentGate({
  category,
  title,
  description,
  children,
}: {
  category: GateCategory;
  title: string;
  description: string;
  children: ReactNode;
}) {
  const { preferences, openPreferences } = useConsentManager();

  if (preferences[category]) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8ccb8] bg-[#faf6ef] px-6 text-center md:h-[520px]">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8d7253]">
        External Content
      </p>
      <h4 className="mt-3 text-2xl font-semibold text-[#3f3124]">{title}</h4>
      <p className="mt-3 max-w-lg text-sm leading-6 text-[#6b5f51]">
        {description}
      </p>
      <Button
        type="button"
        variant="outline"
        className="mt-5 rounded-full border-[#b8986d] bg-white/70 text-[#5d4a35]"
        onClick={openPreferences}
      >
        Update cookie settings
      </Button>
    </div>
  );
}
