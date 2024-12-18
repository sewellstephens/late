import { Key, toLatePlugin } from '@sewell_stephens/late-common/react';

import { CodePlugin as BaseCodePlugin } from '../lib/CodePlugin';

export const CodePlugin = toLatePlugin(BaseCodePlugin, ({ editor, type }) => ({
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
