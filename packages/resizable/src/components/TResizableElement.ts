import type { TElement } from '@sewell_stephens/late-common';

export interface TResizableElement extends TElement {
  align?: 'center' | 'left' | 'right';
  width?: number;
}
