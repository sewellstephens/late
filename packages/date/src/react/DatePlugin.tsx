import { toLatePlugin } from '@sewellstephens/plate-common/react';

import { DatePlugin as BaseDatePlugin } from '../lib';

export const DatePlugin = toLatePlugin(BaseDatePlugin);
