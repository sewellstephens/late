import {
  type PluginConfig,
  type SlateEditor,
  createTSlatePlugin,
} from '@sewell_stephens/late-common';

import type { Heading } from './types';

export type TocConfig = PluginConfig<
  'toc',
  {
    queryHeading?: (editor: SlateEditor) => Heading[];
  }
>;

export const TocPlugin = createTSlatePlugin<TocConfig>({
  key: 'toc',
  node: { isElement: true, isVoid: true },
});
