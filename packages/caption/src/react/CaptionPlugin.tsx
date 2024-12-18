import { toLatePlugin } from '@sewell_stephens/late-common/react';

import { CaptionPlugin as BaseCaptionPlugin } from '../lib/CaptionPlugin';
import { onKeyDownCaption } from './onKeyDownCaption';

export const CaptionPlugin = toLatePlugin(BaseCaptionPlugin, {
  handlers: {
    onKeyDown: onKeyDownCaption,
  },
});
