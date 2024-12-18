import { createSlatePlugin } from '@sewell_stephens/late-common';

export const FontBackgroundColorPlugin = createSlatePlugin({
  inject: {
    nodeProps: {
      nodeKey: 'backgroundColor',
    },
  },
  key: 'backgroundColor',
}).extend(({ type }) => ({
  parsers: {
    html: {
      deserializer: {
        isLeaf: true,
        parse: ({ element }) => ({ [type]: element.style.backgroundColor }),
        rules: [
          {
            validStyle: {
              backgroundColor: '*',
            },
          },
        ],
      },
    },
  },
}));
