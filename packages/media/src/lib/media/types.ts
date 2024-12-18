import type { TElement } from '@sewell_stephens/late-common';

export interface TMediaElement extends TElement {
  url: string;
  align?: 'center' | 'left' | 'right';
  id?: string;
  isUpload?: boolean;
  name?: string;
}

export interface MediaPluginOptions {
  isUrl?: (text: string) => boolean;

  /** Transforms the url. */
  transformUrl?: (url: string) => string;
}
