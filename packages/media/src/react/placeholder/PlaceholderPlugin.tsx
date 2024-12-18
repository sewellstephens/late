import { isHotkey } from '@sewellstephens/plate-common';
import { blurEditor, toLatePlugin } from '@sewellstephens/plate-common/react';

import { PlaceholderPlugin as BasePlaceholderPlugin } from '../../lib/placeholder/PlaceholderPlugin';

export const PlaceholderPlugin = toLatePlugin(BasePlaceholderPlugin, {
  handlers: {
    onKeyDown: ({ editor, event }) => {
      if (isHotkey('escape')(event)) {
        blurEditor(editor);
      }
    },
  },
});
