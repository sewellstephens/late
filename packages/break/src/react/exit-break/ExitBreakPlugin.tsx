import { toLatePlugin } from '@sewellstephens/plate-common/react';

import { ExitBreakPlugin as BaseExitBreakPlugin } from '../../lib/exit-break/ExitBreakPlugin';
import { onKeyDownExitBreak } from './onKeyDownExitBreak';

export const ExitBreakPlugin = toLatePlugin(BaseExitBreakPlugin, {
  handlers: {
    onKeyDown: onKeyDownExitBreak,
  },
});
