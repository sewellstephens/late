import { toLatePlugin } from '@sewellstephens/plate-common/react';

import { SoftBreakPlugin as BaseSoftBreakPlugin } from '../../lib/soft-break/SoftBreakPlugin';
import { onKeyDownSoftBreak } from './onKeyDownSoftBreak';

export const SoftBreakPlugin = toLatePlugin(BaseSoftBreakPlugin, {
  handlers: {
    onKeyDown: onKeyDownSoftBreak,
  },
});
