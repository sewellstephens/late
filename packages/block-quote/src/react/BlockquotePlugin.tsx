import { Key, toLatePlugin } from '@sewell_stephens/late-common/react';

import { BlockquotePlugin as BaseBlockquotePlugin } from '../lib/BlockquotePlugin';

export const BlockquotePlugin = toLatePlugin(
  BaseBlockquotePlugin,
  ({ editor, type }) => ({
    shortcuts: {
      toggleBlockquote: {
        handler: () => {
          editor.tf.toggle.block({ type });
        },
        keys: [[Key.Mod, Key.Shift, '.']],
        preventDefault: true,
        useKey: true,
      },
    },
  })
);
