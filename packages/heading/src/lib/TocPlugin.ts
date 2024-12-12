import {
  type PluginConfig,
  type SlateEditor,
  createTSlatePlugin,
} from '@sewellstephens/plate-common';

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
