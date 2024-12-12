import { Key, toPlatePlugin } from '@sewellstephens/plate-common/react';

import { CodePlugin as BaseCodePlugin } from '../lib/CodePlugin';

export const CodePlugin = toPlatePlugin(BaseCodePlugin, ({ editor, type }) => ({
  shortcuts: {
    toggleCode: {
      handler: () => {
        editor.tf.toggle.mark({ key: type });
      },
      keys: [[Key.Mod, 'e']],
      preventDefault: true,
    },
  },
}));
