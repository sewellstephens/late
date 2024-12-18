import { toLatePlugin } from '@sewell_stephens/late-common/react';

import { YjsPlugin as BaseYjsPlugin } from '../lib/YjsPlugin';
import { YjsAboveEditable } from './YjsAboveEditable';

/** Enables support for real-time collaboration using Yjs. */
export const YjsPlugin = toLatePlugin(BaseYjsPlugin, {
  render: { aboveEditable: YjsAboveEditable },
});
