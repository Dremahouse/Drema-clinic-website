'use client';

import isPropValid from '@emotion/is-prop-valid';
import dynamic from 'next/dynamic';
import { StyleSheetManager } from 'styled-components';
import config from '../../../sanity.config';

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((module) => module.NextStudio),
  { ssr: false },
);

export function StudioClient() {
  return (
    <StyleSheetManager
      shouldForwardProp={(prop, target) =>
        prop !== 'disableTransition' &&
        (typeof target === 'string' ? isPropValid(prop) : true)
      }
    >
      <NextStudio config={config} />
    </StyleSheetManager>
  );
}
