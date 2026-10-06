import '../globals.css';

import dynamicImport from 'next/dynamic';
import { draftMode } from 'next/headers';
import type { ReactNode } from 'react';
import { ConsentProvider } from '@/components/consent/ConsentProvider';
import GoogleTagManagerScripts from '@/components/consent/GoogleTagManagerScripts';
import SmoothScrollProvider from '@/components/effects/SmoothScrollProvider';
import DraftModeToast from '@/components/modules/DraftModeToast';
import { SanityLive } from '@/lib/sanity/client/live';
import { serverClient } from '@/lib/sanity/client/serverClient';
import { resolveOpenGraphImage } from '@/lib/sanity/client/utils';
import { settingsQuery } from '@/lib/sanity/queries/queries';
import { handleError } from './client-utils';

const Toaster = dynamicImport(() =>
  import('sonner').then((mod) => mod.Toaster)
);
const VisualEditing = dynamicImport(() =>
  import('next-sanity/visual-editing').then((mod) => mod.VisualEditing)
);

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata() {
  const settings = await serverClient.fetch(settingsQuery);
  const ogImage = settings?.ogImage
    ? resolveOpenGraphImage(settings.ogImage)
    : undefined;
  const metadataBase = settings?.ogImage?.metadataBase
    ? new URL(settings.ogImage.metadataBase)
    : undefined;

  return {
    metadataBase,
    openGraph: {
      images: ogImage,
    },
    twitter: {
      images: ogImage,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <body className="font-sans bg-background text-foreground">
      <GoogleTagManagerScripts />
      <ConsentProvider>
        <SmoothScrollProvider>
          <section className="min-h-screen">
            <Toaster />
            {isDraftMode && (
              <>
                <DraftModeToast />
                <VisualEditing />
                <SanityLive onError={handleError} />
              </>
            )}
            {children}
          </section>
        </SmoothScrollProvider>
      </ConsentProvider>
    </body>
  );
}
