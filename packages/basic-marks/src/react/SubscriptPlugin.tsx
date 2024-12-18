import { Key, toLatePlugin } from '@sewell_stephens/late-common/react';

import { SubscriptPlugin as BaseSubscriptPlugin } from '../lib/SubscriptPlugin';
import { SuperscriptPlugin } from './SuperscriptPlugin';

export const SubscriptPlugin = toLatePlugin(
  BaseSubscriptPlugin,
  ({ editor, type }) => ({
    shortcuts: {
      toggleSubscript: {
        handler: () => {
          editor.tf.toggle.mark({
            clear: editor.getType(SuperscriptPlugin),
            key: type,
          });
        },
        keys: [[Key.Mod, ',']],
        preventDefault: true,
      },
    },
  })
);
