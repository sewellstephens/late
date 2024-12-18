import { toLatePlugin } from '@sewellstephens/plate-common/react';

import { EmojiPlugin as BaseEmojiPlugin } from '../lib';

export const EmojiPlugin = toLatePlugin(BaseEmojiPlugin);
