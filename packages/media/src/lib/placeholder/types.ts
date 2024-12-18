import type { TElement } from '@sewell_stephens/late-common';

export interface TPlaceholderElement extends TElement {
  mediaType: string;
}

export interface PlaceholderRule {
  mediaType: string;
}

export interface MediaPlaceholder {
  rules?: PlaceholderRule[];
}
