'use client';

import { Box, Button } from '@sanity/ui';
import type { ComponentType } from 'react';
import type { DocumentLayoutProps } from 'sanity';
import { resolveLiveUrl } from '../lib/resolveLiveUrl';

const LABEL = 'ดูหน้าเว็บไซต์จริง ↗';

interface ViewLiveLayoutProps extends DocumentLayoutProps {
  document?: {
    _type?: string;
    slug?: { current?: string | null } | string | null;
  };
}

const ViewLiveLayout: ComponentType<ViewLiveLayoutProps> = (props) => {
  const { renderDefault, documentType, document } = props;

  const url = resolveLiveUrl(documentType, document);

  if (!url) {
    return renderDefault(props as DocumentLayoutProps);
  }

  return (
    <>
      <Box padding={3}>
        <Button
          as="a"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          text={LABEL}
          tone="default"
          width="fill"
        />
      </Box>
      {renderDefault(props as DocumentLayoutProps)}
    </>
  );
};

export default ViewLiveLayout;
