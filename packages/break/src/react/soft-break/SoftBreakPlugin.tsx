import { toLatePlugin } from '@sewell_stephens/late-common/react';

import { SoftBreakPlugin as BaseSoftBreakPlugin } from '../../lib/soft-break/SoftBreakPlugin';
import { onKeyDownSoftBreak } from './onKeyDownSoftBreak';

export const SoftBreakPlugin = toLatePlugin(BaseSoftBreakPlugin, {
  handlers: {
    onKeyDown: onKeyDownSoftBreak,
  },
});
