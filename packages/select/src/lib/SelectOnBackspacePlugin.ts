import {
  type PluginConfig,
  type QueryNodeOptions,
  createTSlatePlugin,
} from '@sewell_stephens/late-common';

import { withSelectOnBackspace } from './withSelectOnBackspace';

export type SelectOnBackspaceConfig = PluginConfig<
  'selectOnBackspace',
  {
    query?: QueryNodeOptions;
    removeNodeIfEmpty?: boolean;
  }
>;

/** @see {@link withSelectOnBackspace} */
export const SelectOnBackspacePlugin =
  createTSlatePlugin<SelectOnBackspaceConfig>({
    extendEditor: withSelectOnBackspace,
    key: 'selectOnBackspace',
    options: {
      removeNodeIfEmpty: false,
    },
  });
