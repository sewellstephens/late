import { createSlatePlugin, someHtmlElement } from '@sewell_stephens/late-common';

/** Enables support for strikethrough formatting. */
export const StrikethroughPlugin = createSlatePlugin({
  key: 'strikethrough',
  node: { isLeaf: true },
  parsers: {
    html: {
      deserializer: {
        query: ({ element }) =>
          !someHtmlElement(
            element,
            (node) => node.style.textDecoration === 'none'
          ),
        rules: [
          { validNodeName: ['S', 'DEL', 'STRIKE'] },
          { validStyle: { textDecoration: 'line-through' } },
        ],
      },
    },
  },
});
