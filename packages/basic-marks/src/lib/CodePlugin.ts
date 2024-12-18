import {
  createSlatePlugin,
  findHtmlParentElement,
} from '@sewell_stephens/late-common';

/** Enables support for code formatting */
export const CodePlugin = createSlatePlugin({
  key: 'code',
  node: { isLeaf: true },
  parsers: {
    html: {
      deserializer: {
        query({ element }) {
          const blockAbove = findHtmlParentElement(element, 'P');

          if (blockAbove?.style.fontFamily === 'Consolas') return false;

          return !findHtmlParentElement(element, 'PRE');
        },
        rules: [
          { validNodeName: ['CODE'] },
          { validStyle: { fontFamily: 'Consolas' } },
        ],
      },
    },
  },
});
