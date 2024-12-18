import { ExitBreakPlugin } from '@sewell_stephens/late-break/react';
import { HEADING_LEVELS } from '@sewell_stephens/late-heading';

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
