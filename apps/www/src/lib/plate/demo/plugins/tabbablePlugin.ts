import { CodeBlockPlugin } from '@sewellstephens/plate-code-block/react';
import { isSelectionAtBlockStart, someNode } from '@sewellstephens/plate-common';
import { createPlatePlugin } from '@sewellstephens/plate-common/react';
import { IndentListPlugin } from '@sewellstephens/plate-indent-list/react';
import { ListItemPlugin } from '@sewellstephens/plate-list/react';
import { TabbablePlugin } from '@sewellstephens/plate-tabbable';
import { TablePlugin } from '@sewellstephens/plate-table/react';

import { TabbableElement } from './TabbableElement';

export const tabbablePlugin = TabbablePlugin.extend({
  plugins: [
    createPlatePlugin({
      key: 'tabbable_element',
      node: { component: TabbableElement, isElement: true, isVoid: true },
    }),
  ],
}).configure(({ editor }) => ({
  options: {
    query: () => {
      if (isSelectionAtBlockStart(editor)) return false;

      return !someNode(editor, {
        match: (n) => {
          return !!(
            n.type &&
            ([
              CodeBlockPlugin.key,
              ListItemPlugin.key,
              TablePlugin.key,
            ].includes(n.type as any) ||
              n[IndentListPlugin.key])
          );
        },
      });
    },
  },
}));
