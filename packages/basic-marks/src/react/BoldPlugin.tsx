import { Key, toLatePlugin } from '@sewellstephens/plate-common/react';

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
