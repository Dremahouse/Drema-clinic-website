'use client';

import { useState } from 'react';
import Image from 'next/image';

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
};

export default function FeaturedImageGallery({
  items,
}: {
  items: GalleryItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  if (!active) return null;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4">
      <div className="relative mx-auto w-full max-w-[44.8rem] overflow-hidden rounded-2xl border border-[#d8cab1] bg-[#f8f1e5] p-2 shadow-[0_20px_45px_-28px_rgba(77,71,56,0.45)]">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            src={active.src}
            alt={active.alt}
            fill
            sizes="(max-width: 768px) 100vw, 716px"
            className="object-cover"
            unoptimized
          />
        </div>
      </div>

      <div className="overflow-x-auto pb-2 [scrollbar-width:thin] [scrollbar-color:#c2ab88_transparent]">
        <div className="inline-flex min-w-full justify-center gap-3 px-1">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`group relative w-[5.5rem] shrink-0 overflow-hidden rounded-xl border p-0 transition-all duration-500 ease-out sm:w-24 md:w-28 ${
                index === activeIndex
                  ? 'border-[#9a805f] shadow-[0_12px_24px_-18px_rgba(77,71,56,0.65)]'
                  : 'border-[#d8cab1] opacity-85 hover:opacity-100'
              }`}
              aria-label={`Preview image ${index + 1}`}
              aria-pressed={index === activeIndex}
            >
              <div className="relative aspect-square w-full">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 88px, (max-width: 768px) 96px, 112px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                unoptimized
              />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
