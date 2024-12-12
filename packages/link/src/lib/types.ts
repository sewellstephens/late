import type { TElement } from '@sewellstephens/plate-common';

export interface TLinkElement extends TElement {
  url: string;
  target?: string;
}
