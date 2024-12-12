import { isHotkey } from '@sewellstephens/plate-common';
import { blurEditor, toPlatePlugin } from '@sewellstephens/plate-common/react';

import { PlaceholderPlugin as BasePlaceholderPlugin } from '../../lib/placeholder/PlaceholderPlugin';

export const PlaceholderPlugin = toPlatePlugin(BasePlaceholderPlugin, {
  handlers: {
    onKeyDown: ({ editor, event }) => {
      if (isHotkey('escape')(event)) {
        blurEditor(editor);
      }
    },
  },
});
