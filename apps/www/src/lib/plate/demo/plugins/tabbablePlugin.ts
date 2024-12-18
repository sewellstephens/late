import { CodeBlockPlugin } from '@sewell_stephens/late-code-block/react';
import { isSelectionAtBlockStart, someNode } from '@sewell_stephens/late-common';
import { createLatePlugin } from '@sewell_stephens/late-common/react';
import { IndentListPlugin } from '@sewell_stephens/late-indent-list/react';
import { ListItemPlugin } from '@sewell_stephens/late-list/react';
import { TabbablePlugin } from '@sewell_stephens/late-tabbable';
import { TablePlugin } from '@sewell_stephens/late-table/react';

import { TabbableElement } from './TabbableElement';

export const tabbablePlugin = TabbablePlugin.extend({
  plugins: [
    createLatePlugin({
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
