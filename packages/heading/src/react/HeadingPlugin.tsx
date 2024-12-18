import {
  Key,
  type LatePlugin,
  toLatePlugin,
} from '@sewell_stephens/late-common/react';

import { HeadingPlugin as BaseHeadingPlugin } from '../lib/HeadingPlugin';

export const HeadingPlugin = toLatePlugin(BaseHeadingPlugin, ({ plugin }) => ({
  plugins: (plugin as unknown as LatePlugin).plugins.map((p) =>
    (p as LatePlugin).extend(({ editor, type }) => {
      const level = p.key.at(-1);

      if (level > 3) return {};

      return {
        shortcuts: {
          ['toggleHeading' + level]: {
            handler: () => {
              editor.tf.toggle.block({ type });
            },
            keys: [
              [Key.Mod, Key.Alt, level],
              [Key.Mod, Key.Shift, level],
            ],
            preventDefault: true,
          },
        },
      };
    })
  ),
}));
