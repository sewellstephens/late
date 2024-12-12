import { createPlatePlugin } from '@sewellstephens/plate-common/react';

import { usePlaywrightAdapter } from './usePlaywrightAdapter';

export const PlaywrightPlugin = createPlatePlugin({
  key: 'PlaywrightPlugin',
  useHooks: usePlaywrightAdapter,
});
