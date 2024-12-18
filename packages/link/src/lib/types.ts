import type { TElement } from '@sewell_stephens/late-common';

export interface TLinkElement extends TElement {
  url: string;
  target?: string;
}
