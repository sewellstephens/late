import type { ExtendEditor } from '@sewell_stephens/late-common';

import type { ImageConfig } from './ImagePlugin';

import { withImageEmbed } from './withImageEmbed';
import { withImageUpload } from './withImageUpload';

/**
 * @see withImageUpload
 * @see withImageEmbed
 */
export const withImage: ExtendEditor<ImageConfig> = ({ editor, ...ctx }) => {
  editor = withImageUpload({ editor, ...ctx });
  editor = withImageEmbed({ editor, ...ctx });

  return editor;
};
