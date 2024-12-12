import { BlockquotePlugin } from '@sewellstephens/plate-block-quote';
import { CodeBlockPlugin } from '@sewellstephens/plate-code-block';
import { ParagraphPlugin, createSlatePlugin } from '@sewellstephens/plate-common';
import { HeadingPlugin } from '@sewellstephens/plate-heading';

export const BasicElementsPlugin = createSlatePlugin({
  key: 'basicElements',
  plugins: [BlockquotePlugin, CodeBlockPlugin, HeadingPlugin, ParagraphPlugin],
});
