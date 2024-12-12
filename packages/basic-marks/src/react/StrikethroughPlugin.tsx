import { Key, toPlatePlugin } from '@sewellstephens/plate-common/react';

import { StrikethroughPlugin as BaseStrikethroughPlugin } from '../lib/StrikethroughPlugin';

export const StrikethroughPlugin = toPlatePlugin(
  BaseStrikethroughPlugin,
  ({ editor, type }) => ({
    shortcuts: {
      toggleStrikethrough: {
        handler: () => {
          editor.tf.toggle.mark({ key: type });
        },
        keys: [[Key.Mod, Key.Shift, 'x']],
        preventDefault: true,
      },
    },
  })
);
