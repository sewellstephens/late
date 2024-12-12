import { createSlatePlugin } from '@sewellstephens/plate-common';

/** Enables support for code formatting */
export const KbdPlugin = createSlatePlugin({
  key: 'kbd',
  node: { isLeaf: true },
  parsers: {
    html: {
      deserializer: {
        rules: [{ validNodeName: ['KBD'] }],
      },
    },
  },
});
