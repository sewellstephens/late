import { createLatePlugin } from '@sewellstephens/plate-common/react';

import { usePlaywrightAdapter } from './usePlaywrightAdapter';

export const PlaywrightPlugin = createLatePlugin({
  key: 'PlaywrightPlugin',
  useHooks: usePlaywrightAdapter,
});
