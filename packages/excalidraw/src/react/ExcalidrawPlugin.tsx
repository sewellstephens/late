import { toLatePlugin } from '@sewellstephens/plate-common/react';

import { ExcalidrawPlugin as BaseExcalidrawPlugin } from '../lib';

export const ExcalidrawPlugin = toLatePlugin(BaseExcalidrawPlugin);
