import { Key, toLatePlugin } from '@sewellstephens/plate-common/react';

import { SuperscriptPlugin as BaseSuperscriptPlugin } from '../lib/SuperscriptPlugin';
import { SubscriptPlugin } from './SubscriptPlugin';

export const SuperscriptPlugin = toLatePlugin(
  BaseSuperscriptPlugin,
  ({ editor, type }) => ({
    shortcuts: {
      toggleSuperscript: {
        handler: () => {
          editor.tf.toggle.mark({
            clear: editor.getType(SubscriptPlugin),
            key: type,
          });
        },
        keys: [[Key.Mod, '.']],
        preventDefault: true,
      },
    },
  })
);
