import { Key, toLatePlugin } from '@sewell_stephens/late-common/react';

import { UnderlinePlugin as BaseUnderlinePlugin } from '../lib/UnderlinePlugin';

export const UnderlinePlugin = toLatePlugin(
  BaseUnderlinePlugin,
  ({ editor, type }) => ({
    shortcuts: {
      toggleUnderline: {
        handler: () => {
          editor.tf.toggle.mark({ key: type });
        },
        keys: [[Key.Mod, 'u']],
        preventDefault: true,
      },
    },
  })
);
