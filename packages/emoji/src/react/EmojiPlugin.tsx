import { toLatePlugin } from '@sewell_stephens/late-common/react';

import { EmojiPlugin as BaseEmojiPlugin } from '../lib';

export const EmojiPlugin = toLatePlugin(BaseEmojiPlugin);
