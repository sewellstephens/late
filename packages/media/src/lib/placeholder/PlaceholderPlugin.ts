import { type PluginConfig, createTSlatePlugin } from '@sewellstephens/plate-common';

import type { MediaPlaceholder } from './types';

export type PlaceholderConfig = PluginConfig<'placeholder', MediaPlaceholder>;

export const PlaceholderPlugin = createTSlatePlugin<PlaceholderConfig>({
  key: 'placeholder',
  node: { isElement: true, isVoid: true },
});
