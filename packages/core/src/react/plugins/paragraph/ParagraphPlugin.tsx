import { Key } from '@sewellstephens/react-hotkeys';

import { ParagraphPlugin as BaseParagraphPlugin } from '../../../lib';
import { toLatePlugin } from '../../plugin/toLatePlugin';

export const ParagraphPlugin = toLatePlugin(
  BaseParagraphPlugin,
  ({ editor, type }) => ({
    shortcuts: {
      toggleParagraph: {
        handler: () => {
          editor.tf.toggle.block({ type });
        },
        keys: [
          [Key.Mod, Key.Alt, '0'],
          [Key.Mod, Key.Shift, '0'],
        ],
        preventDefault: true,
      },
    },
  })
);
