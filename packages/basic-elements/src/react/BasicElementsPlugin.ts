import { BlockquotePlugin } from '@sewell_stephens/late-block-quote/react';
import { CodeBlockPlugin } from '@sewell_stephens/late-code-block/react';
import {
  ParagraphPlugin,
  createLatePlugin,
} from '@sewell_stephens/late-common/react';
import { HeadingPlugin } from '@sewell_stephens/late-heading/react';

/**
 * Enables support for basic elements:
 *
 * - Block quote
 * - Code block
 * - Heading
 * - Paragraph
 */
export const BasicElementsPlugin = createLatePlugin({
  key: 'basicElements',
  plugins: [BlockquotePlugin, CodeBlockPlugin, HeadingPlugin, ParagraphPlugin],
});
