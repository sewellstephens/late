import { toPlatePlugin } from '@sewellstephens/plate-common/react';

import {
  SlashInputPlugin as BaseSlashInputPlugin,
  SlashPlugin as BaseSlashPlugin,
} from '../lib';

export const SlashInputPlugin = toPlatePlugin(BaseSlashInputPlugin);

export const SlashPlugin = toPlatePlugin(BaseSlashPlugin);
