import { toPlatePlugin } from '@sewellstephens/plate-common/react';

import {
  MentionInputPlugin as BaseMentionInputPlugin,
  MentionPlugin as BaseMentionPlugin,
} from '../lib';

export const MentionPlugin = toPlatePlugin(BaseMentionPlugin);

export const MentionInputPlugin = toPlatePlugin(BaseMentionInputPlugin);
