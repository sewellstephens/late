import { BlockquotePlugin } from '@sewell_stephens/late-block-quote';
import { CodeBlockPlugin } from '@sewell_stephens/late-code-block';
import { ParagraphPlugin, createSlatePlugin } from '@sewell_stephens/late-common';
import { HeadingPlugin } from '@sewell_stephens/late-heading';

export const BasicElementsPlugin = createSlatePlugin({
  key: 'basicElements',
  plugins: [BlockquotePlugin, CodeBlockPlugin, HeadingPlugin, ParagraphPlugin],
});
