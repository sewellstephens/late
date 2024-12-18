import { toLatePlugin } from '@sewellstephens/plate-common/react';

import { IndentPlugin as BaseIndentPlugin } from '../lib/IndentPlugin';
import { onKeyDownIndent } from './onKeyDownIndent';

export const IndentPlugin = toLatePlugin(BaseIndentPlugin, {
  handlers: {
    onKeyDown: onKeyDownIndent,
  },
});
