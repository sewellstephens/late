import { Key, toLatePlugin } from '@sewell_stephens/late-common/react';

import { ItalicPlugin as BaseItalicPlugin } from '../lib/ItalicPlugin';

export const ItalicPlugin = toLatePlugin(
  BaseItalicPlugin,
  ({ editor, type }) => ({
    shortcuts: {
      toggleItalic: {
        handler: () => {
          editor.tf.toggle.mark({ key: type });
        },
        keys: [[Key.Mod, 'i']],
        preventDefault: true,
      },
    },
  })
);
