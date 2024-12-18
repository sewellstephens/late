import { type TElement, createSlatePlugin } from '@sewell_stephens/late-common';

import type { ExcalidrawDataState } from './types';

export interface TExcalidrawElement extends TElement {
  data?: {
    elements: ExcalidrawDataState['elements'];
    state: ExcalidrawDataState['appState'];
  } | null;
}

/** Enables support for Excalidraw drawing tool within a Slate document */
export const ExcalidrawPlugin = createSlatePlugin({
  key: 'excalidraw',
  node: { isElement: true, isVoid: true },
});
