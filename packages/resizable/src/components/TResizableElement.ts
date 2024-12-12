import type { TElement } from '@sewellstephens/plate-common';

export interface TResizableElement extends TElement {
  align?: 'center' | 'left' | 'right';
  width?: number;
}
