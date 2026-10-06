import 'server-only';

import * as v from 'valibot';
import { createEnv } from '@/utils/createEnv';

const envSchema = {
  SANITY_API_READ_TOKEN: v.pipe(v.string(), v.minLength(1)),
};

const sanityPreviewEnv = createEnv(envSchema);

export { sanityPreviewEnv };
