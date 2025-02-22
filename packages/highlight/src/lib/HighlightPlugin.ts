import { createTSlatePlugin } from '@sewell_stephens/late-common';

/**
 * Enables support for highlights, useful when reviewing content or highlighting
 * it for future reference.
 */
export const HighlightPlugin = createTSlatePlugin({
  key: 'highlight',
  node: { isLeaf: true },
  parsers: {
    html: {
      deserializer: {
        rules: [
          {
            validNodeName: ['MARK'],
          },
        ],
      },
    },
  },
});
