import { toLatePlugin } from '@sewell_stephens/late-common/react';

import {
  ColumnItemPlugin as BaseColumnItemPlugin,
  ColumnPlugin as BaseColumnPlugin,
} from '../lib';
import { onKeyDownColumn } from './onKeyDownColumn';

export const ColumnItemPlugin = toLatePlugin(BaseColumnItemPlugin);

/** Enables support for columns with React-specific features. */
export const ColumnPlugin = toLatePlugin(BaseColumnPlugin, {
  handlers: {
    onKeyDown: onKeyDownColumn,
  },
  plugins: [ColumnItemPlugin],
});
