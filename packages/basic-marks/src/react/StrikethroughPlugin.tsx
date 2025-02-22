import { Key, toLatePlugin } from '@sewell_stephens/late-common/react';

import { StrikethroughPlugin as BaseStrikethroughPlugin } from '../lib/StrikethroughPlugin';

export const StrikethroughPlugin = toLatePlugin(
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
