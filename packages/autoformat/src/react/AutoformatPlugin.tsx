import { toPlatePlugin } from '@sewellstephens/plate-common/react';

import { AutoformatPlugin as BaseAutoformatPlugin } from '../lib/AutoformatPlugin';
import { onKeyDownAutoformat } from './onKeyDownAutoformat';

export const AutoformatPlugin = toPlatePlugin(BaseAutoformatPlugin, {
  handlers: {
    onKeyDown: onKeyDownAutoformat,
  },
});
