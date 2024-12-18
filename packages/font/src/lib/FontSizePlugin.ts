import { createSlatePlugin } from '@sewell_stephens/late-common';

export const FontSizePlugin = createSlatePlugin({
  inject: {
    nodeProps: {
      nodeKey: 'fontSize',
    },
  },
  key: 'fontSize',
}).extend(({ type }) => ({
  parsers: {
    html: {
      deserializer: {
        isLeaf: true,
        parse: ({ element }) => ({ [type]: element.style.fontSize }),
        rules: [
          {
            validStyle: {
              fontSize: '*',
            },
          },
        ],
      },
    },
  },
}));
