import { toLatePlugin } from '@sewellstephens/plate-common/react';

import {
  SlashInputPlugin as BaseSlashInputPlugin,
  SlashPlugin as BaseSlashPlugin,
} from '../lib';

export const SlashInputPlugin = toLatePlugin(BaseSlashInputPlugin);

export const SlashPlugin = toLatePlugin(BaseSlashPlugin);
