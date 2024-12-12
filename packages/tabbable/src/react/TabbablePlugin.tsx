import { toPlatePlugin } from '@sewellstephens/plate-common/react';

import { TabbablePlugin as BaseTabbablePlugin } from '../lib/TabbablePlugin';
import { TabbableEffects } from './TabbableEffects';

export const TabbablePlugin = toPlatePlugin(BaseTabbablePlugin, {
  render: { afterEditable: TabbableEffects },
});
