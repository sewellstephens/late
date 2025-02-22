import { type PluginConfig, createTSlatePlugin } from '@sewell_stephens/late-common';

import type { AutoformatPluginOptions } from './types';

import { withAutoformat } from './withAutoformat';

export type AutoformatConfig = PluginConfig<
  'autoformat',
  AutoformatPluginOptions
>;

/** @see {@link withAutoformat} */
export const AutoformatPlugin = createTSlatePlugin<AutoformatConfig>({
  extendEditor: withAutoformat,
  key: 'autoformat',
  options: {
    rules: [],
  },
});
