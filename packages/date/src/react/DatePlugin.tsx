import { toLatePlugin } from '@sewell_stephens/late-common/react';

import { DatePlugin as BaseDatePlugin } from '../lib';

export const DatePlugin = toLatePlugin(BaseDatePlugin);
