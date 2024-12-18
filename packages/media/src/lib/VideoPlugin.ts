import { createSlatePlugin } from '@sewell_stephens/late-common';

import type { TMediaElement } from '..';

export interface TVideoElement extends TMediaElement {}

export const VideoPlugin = createSlatePlugin({
  key: 'video',
  node: { isElement: true, isVoid: true },
});
