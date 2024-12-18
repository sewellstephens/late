import { toLatePlugin } from '@sewell_stephens/late-common/react';

import { TabbablePlugin as BaseTabbablePlugin } from '../lib/TabbablePlugin';
import { TabbableEffects } from './TabbableEffects';

export const TabbablePlugin = toLatePlugin(BaseTabbablePlugin, {
  render: { afterEditable: TabbableEffects },
});
