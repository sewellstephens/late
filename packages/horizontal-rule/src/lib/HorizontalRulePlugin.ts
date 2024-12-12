import { createSlatePlugin } from '@sewellstephens/plate-common';

export const HorizontalRulePlugin = createSlatePlugin({
  key: 'hr',
  node: { isElement: true, isVoid: true },
  parsers: {
    html: {
      deserializer: {
        rules: [
          {
            validNodeName: 'HR',
          },
        ],
      },
    },
  },
});
