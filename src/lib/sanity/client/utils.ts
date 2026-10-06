import createImageUrlBuilder from '@sanity/image-url';
import type { CreateDataAttributeProps } from 'next-sanity';
import { createDataAttribute } from 'next-sanity';
import { clientEnv } from '@/env/clientEnv';
import type { SeoFragmentType } from '../queries/fragments/fragment.types';

const imageBuilder = createImageUrlBuilder({
  projectId: clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: clientEnv.NEXT_PUBLIC_SANITY_DATASET,
});

type SanityImageSource =
  | {
      asset?: {
        _ref?: string | null;
        _id?: string | null;
      } | null;
    }
  | null
  | undefined;

export const urlForImage = (
  source: SanityImageSource,
  options?: { ignoreCrop?: boolean }
) => {
  const ref = source?.asset?._ref ?? source?.asset?._id;
  if (!ref) {
    return undefined;
  }

  const normalizedSource = options?.ignoreCrop
    ? { asset: { _ref: ref } }
    : {
        ...(source ?? {}),
        asset: { _ref: ref },
      };

  // biome-ignore lint/suspicious/noFocusedTests: Sanity image-url builder uses `.fit()` method.
  return imageBuilder?.image(normalizedSource).auto('format').fit('max');
};

export function resolveOpenGraphImage(
  image?: SeoFragmentType['metaImage'],
  width = 1200,
  height = 627
) {
  if (!image) return;
  const url = imageBuilder.image(image)?.width(width).height(height).url();
  if (!url) return;
  return { url, width, height };
}

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, 'id' | 'type' | 'path'>>;

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId: clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: clientEnv.NEXT_PUBLIC_SANITY_DATASET,
    baseUrl: clientEnv.NEXT_PUBLIC_SANITY_STUDIO_URL,
  })
    .combine(config)
    .toString();
}
