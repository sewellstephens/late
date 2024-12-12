import { BlockquotePlugin } from '@sewellstephens/plate-block-quote/react';
import { SoftBreakPlugin } from '@sewellstephens/plate-break/react';
import { CodeBlockPlugin } from '@sewellstephens/plate-code-block/react';
import { TableCellPlugin } from '@sewellstephens/plate-table/react';

export const softBreakPlugin = SoftBreakPlugin.configure({
  options: {
    rules: [
      { hotkey: 'shift+enter' },
      {
        hotkey: 'enter',
        query: {
          allow: [
            CodeBlockPlugin.key,
            BlockquotePlugin.key,
            TableCellPlugin.key,
          ],
        },
      },
    ],
  },
});
