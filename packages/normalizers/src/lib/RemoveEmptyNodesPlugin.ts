import { type PluginConfig, createTSlatePlugin } from '@sewellstephens/plate-common';

import { withRemoveEmptyNodes } from './withRemoveEmptyNodes';

export type RemoveEmptyNodesConfig = PluginConfig<
  'removeEmptyNodes',
  {
    types?: string | string[];
  }
>;

/** @see {@link withRemoveEmptyNodes} */
export const RemoveEmptyNodesPlugin =
  createTSlatePlugin<RemoveEmptyNodesConfig>({
    extendEditor: withRemoveEmptyNodes,
    key: 'removeEmptyNodes',
  });
