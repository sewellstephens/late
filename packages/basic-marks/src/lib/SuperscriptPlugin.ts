import { createSlatePlugin } from '@sewell_stephens/late-common';

/** Enables support for superscript formatting. */
export const SuperscriptPlugin = createSlatePlugin({
  key: 'superscript',
  node: { isLeaf: true },
  parsers: {
    html: {
      deserializer: {
        rules: [
          { validNodeName: ['SUP'] },
          { validStyle: { verticalAlign: 'super' } },
        ],
      },
    },
  },
});
