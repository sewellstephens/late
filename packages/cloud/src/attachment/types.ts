import type { TElement } from '@sewellstephens/plate-common';

/** Specifies just the `options` part of the CloudPlugin */
export type CloudAttachmentPluginOptions = {};

export interface TCloudAttachmentElement extends TElement {
  bytes: number;
  filename: string;
  url: string;
}
