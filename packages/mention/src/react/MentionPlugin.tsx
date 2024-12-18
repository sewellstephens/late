import { toLatePlugin } from '@sewellstephens/plate-common/react';

import {
  MentionInputPlugin as BaseMentionInputPlugin,
  MentionPlugin as BaseMentionPlugin,
} from '../lib';

export const MentionPlugin = toLatePlugin(BaseMentionPlugin);

export const MentionInputPlugin = toLatePlugin(BaseMentionInputPlugin);
