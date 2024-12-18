import { createSlatePlugin } from '@sewell_stephens/late-common';

import { withBlockquote } from './withBlockquote';

/** Enables support for block quotes, useful for quotations and passages. */
export const BlockquotePlugin = createSlatePlugin({
  extendEditor: withBlockquote,
  key: 'blockquote',
  node: { isElement: true },
  parsers: {
    html: {
      deserializer: {
        rules: [
          {
            validNodeName: 'BLOCKQUOTE',
          },
        ],
      },
    },
  },
});
