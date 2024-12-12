import { ExitBreakPlugin } from '@sewellstephens/plate-break/react';
import { HEADING_LEVELS } from '@sewellstephens/plate-heading';

export const exitBreakPlugin = ExitBreakPlugin.configure({
  options: {
    rules: [
      {
        hotkey: 'mod+enter',
      },
      {
        before: true,
        hotkey: 'mod+shift+enter',
      },
      {
        hotkey: 'enter',
        level: 1,
        query: {
          allow: HEADING_LEVELS,
          end: true,
          start: true,
        },
        relative: true,
      },
    ],
  },
});
