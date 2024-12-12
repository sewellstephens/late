import { BlockquotePlugin } from '@sewellstephens/plate-block-quote/react';
import { CodeBlockPlugin } from '@sewellstephens/plate-code-block/react';
import {
  ParagraphPlugin,
  createPlatePlugin,
} from '@sewellstephens/plate-common/react';
import { HeadingPlugin } from '@sewellstephens/plate-heading/react';

/**
 * Enables support for basic elements:
 *
 * - Block quote
 * - Code block
 * - Heading
 * - Paragraph
 */
export const BasicElementsPlugin = createPlatePlugin({
  key: 'basicElements',
  plugins: [BlockquotePlugin, CodeBlockPlugin, HeadingPlugin, ParagraphPlugin],
});
