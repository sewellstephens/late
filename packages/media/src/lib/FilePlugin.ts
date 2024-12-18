import { createSlatePlugin } from '@sewell_stephens/late-common';

import type { TMediaElement } from './media';

export interface TFileElement extends TMediaElement {}

export const FilePlugin = createSlatePlugin({
  key: 'file',
  node: { isElement: true, isVoid: true },
});
