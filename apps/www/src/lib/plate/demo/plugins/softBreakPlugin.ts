import { BlockquotePlugin } from '@sewell_stephens/late-block-quote/react';
import { SoftBreakPlugin } from '@sewell_stephens/late-break/react';
import { CodeBlockPlugin } from '@sewell_stephens/late-code-block/react';
import { TableCellPlugin } from '@sewell_stephens/late-table/react';

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
