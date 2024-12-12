import { toPlatePlugin } from '@sewellstephens/plate-common/react';

import {
  ColumnItemPlugin as BaseColumnItemPlugin,
  ColumnPlugin as BaseColumnPlugin,
} from '../lib';
import { onKeyDownColumn } from './onKeyDownColumn';

export const ColumnItemPlugin = toPlatePlugin(BaseColumnItemPlugin);

/** Enables support for columns with React-specific features. */
export const ColumnPlugin = toPlatePlugin(BaseColumnPlugin, {
  handlers: {
    onKeyDown: onKeyDownColumn,
  },
  plugins: [ColumnItemPlugin],
});
