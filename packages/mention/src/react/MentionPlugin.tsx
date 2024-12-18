import { toLatePlugin } from '@sewell_stephens/late-common/react';

import {
  MentionInputPlugin as BaseMentionInputPlugin,
  MentionPlugin as BaseMentionPlugin,
} from '../lib';

export const MentionPlugin = toLatePlugin(BaseMentionPlugin);

export const MentionInputPlugin = toLatePlugin(BaseMentionInputPlugin);
