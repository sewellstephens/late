import { toLatePlugin } from '@sewell_stephens/late-common/react';

import { IndentPlugin as BaseIndentPlugin } from '../lib/IndentPlugin';
import { onKeyDownIndent } from './onKeyDownIndent';

export const IndentPlugin = toLatePlugin(BaseIndentPlugin, {
  handlers: {
    onKeyDown: onKeyDownIndent,
  },
});
