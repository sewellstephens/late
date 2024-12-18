import { toLatePlugin } from '@sewell_stephens/late-common/react';

import { ExcalidrawPlugin as BaseExcalidrawPlugin } from '../lib';

export const ExcalidrawPlugin = toLatePlugin(BaseExcalidrawPlugin);
