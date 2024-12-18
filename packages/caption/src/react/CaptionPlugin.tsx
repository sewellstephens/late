import { toLatePlugin } from '@sewellstephens/plate-common/react';

import { CaptionPlugin as BaseCaptionPlugin } from '../lib/CaptionPlugin';
import { onKeyDownCaption } from './onKeyDownCaption';

export const CaptionPlugin = toLatePlugin(BaseCaptionPlugin, {
  handlers: {
    onKeyDown: onKeyDownCaption,
  },
});
