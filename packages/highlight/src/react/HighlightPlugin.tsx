import { Key, toLatePlugin } from '@sewellstephens/plate-common/react';

import { HighlightPlugin as BaseHighlightPlugin } from '../lib/HighlightPlugin';

export const HighlightPlugin = toLatePlugin(
  BaseHighlightPlugin,
  ({ editor, type }) => ({
    shortcuts: {
      toggleHighlight: {
        handler: () => {
          editor.tf.toggle.mark({ key: type });
        },
        keys: [[Key.Mod, Key.Shift, 'h']],
        preventDefault: true,
      },
    },
  })
);
