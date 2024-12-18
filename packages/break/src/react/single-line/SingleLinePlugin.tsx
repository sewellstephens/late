import { toLatePlugin } from '@sewell_stephens/late-common/react';

import { SingleLinePlugin as BaseSingleLinePlugin } from '../../lib/single-line/SingleLinePlugin';
import { onKeyDownSingleLine } from './onKeyDownSingleLine';

export const SingleLinePlugin = toLatePlugin(BaseSingleLinePlugin, {
  handlers: {
    onKeyDown: onKeyDownSingleLine,
  },
});
