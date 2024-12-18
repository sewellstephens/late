import {
  ParagraphPlugin,
  type PluginConfig,
  type QueryNodeOptions,
  createTSlatePlugin,
} from '@sewell_stephens/late-common';

import { withDelete } from './withDelete';

export type DeleteConfig = PluginConfig<
  'delete',
  {
    query?: QueryNodeOptions;
  }
>;

/** @see {@link withDelete} */
export const DeletePlugin = createTSlatePlugin<DeleteConfig>({
  extendEditor: withDelete,
  key: 'delete',
  options: {
    query: {
      allow: [ParagraphPlugin.key],
    },
  },
});
