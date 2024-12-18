import { toLatePlugin } from '@sewell_stephens/late-common/react';

import { AutoformatPlugin as BaseAutoformatPlugin } from '../lib/AutoformatPlugin';
import { onKeyDownAutoformat } from './onKeyDownAutoformat';

export const AutoformatPlugin = toLatePlugin(BaseAutoformatPlugin, {
  handlers: {
    onKeyDown: onKeyDownAutoformat,
  },
});
