'use client';

import { Box, Button } from '@sanity/ui';
import type { ComponentType } from 'react';
import type { DocumentLayoutProps } from 'sanity';
import { resolveLiveUrl } from '../lib/resolveLiveUrl';

const LABEL = 'ดูหน้าเว็บไซต์จริง ↗';

// Resolved from the configured site URL / preview origin (NEXT_PUBLIC_SITE_URL).
// Never hardcodes a production domain.
const TARGET_URL = resolveLiveUrl('promotionsPage', null);

const PromotionsViewLiveLayout: ComponentType<DocumentLayoutProps> = (
  props
) => {
  const { renderDefault, documentType } = props;

  if (documentType !== 'promotionsPage') {
    return renderDefault(props);
  }

  return (
    <>
      <Box padding={3}>
        <Button
          as="a"
          href={TARGET_URL ?? undefined}
          target="_blank"
          rel="noopener noreferrer"
          text={LABEL}
          tone="default"
          width="fill"
        />
      </Box>
      {renderDefault(props)}
    </>
  );
};

export default PromotionsViewLiveLayout;
