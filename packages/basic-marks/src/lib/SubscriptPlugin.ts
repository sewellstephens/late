import { createSlatePlugin } from '@sewell_stephens/late-common';

/** Enables support for subscript formatting. */
export const SubscriptPlugin = createSlatePlugin({
  key: 'subscript',
  node: { isLeaf: true },
  parsers: {
    html: {
      deserializer: {
        rules: [
          { validNodeName: ['SUB'] },
          { validStyle: { verticalAlign: 'sub' } },
        ],
      },
    },
  },
});
