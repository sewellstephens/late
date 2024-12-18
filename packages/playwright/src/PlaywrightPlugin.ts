import { createLatePlugin } from '@sewell_stephens/late-common/react';

import { usePlaywrightAdapter } from './usePlaywrightAdapter';

export const PlaywrightPlugin = createLatePlugin({
  key: 'PlaywrightPlugin',
  useHooks: usePlaywrightAdapter,
});
