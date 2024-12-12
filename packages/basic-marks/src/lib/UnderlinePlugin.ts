import { createSlatePlugin, someHtmlElement } from '@sewellstephens/plate-common';

/** Enables support for underline formatting. */
export const UnderlinePlugin = createSlatePlugin({
  key: 'underline',
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
          { validNodeName: ['U'] },
          { validStyle: { textDecoration: ['underline'] } },
        ],
      },
    },
  },
});
