import { createSlatePlugin } from '@sewell_stephens/late-common';

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
