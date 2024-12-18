import { createSlatePlugin, someHtmlElement } from '@sewell_stephens/late-common';

/** Enables support for bold formatting */
export const BoldPlugin = createSlatePlugin({
  key: 'bold',
  node: { isLeaf: true },
  parsers: {
    html: {
      deserializer: {
        query: ({ element }) =>
          !someHtmlElement(
            element,
            (node) => node.style.fontWeight === 'normal'
          ),
        rules: [
          { validNodeName: ['STRONG', 'B'] },
          {
            validStyle: {
              fontWeight: ['600', '700', 'bold'],
            },
          },
        ],
      },
    },
  },
});
