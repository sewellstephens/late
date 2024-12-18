import { Key, toLatePlugin } from '@sewell_stephens/late-common/react';

import { BoldPlugin as BaseBoldPlugin } from '../lib/BoldPlugin';

export const BoldPlugin = toLatePlugin(BaseBoldPlugin, ({ editor, type }) => ({
  shortcuts: {
    toggleBold: {
      handler: () => {
        editor.tf.toggle.mark({ key: type });
      },
      keys: [[Key.Mod, 'b']],
      preventDefault: true,
    },
  },
}));
