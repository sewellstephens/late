import { toLatePlugin } from '@sewell_stephens/late-common/react';

import {
  SlashInputPlugin as BaseSlashInputPlugin,
  SlashPlugin as BaseSlashPlugin,
} from '../lib';

export const SlashInputPlugin = toLatePlugin(BaseSlashInputPlugin);

export const SlashPlugin = toLatePlugin(BaseSlashPlugin);
