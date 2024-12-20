import type { CursorData, CursorState } from '@sewell_stephens/late-cursor';

import { createLatePlugin, findEventRange } from '@sewell_stephens/late-common/react';
import { DndPlugin } from '@sewell_stephens/late-dnd';

export const DragOverCursorPlugin = createLatePlugin({
  handlers: {
    onDragEnd: ({ editor, plugin }) => {
      editor.setOption(plugin, 'cursors', {});
    },
    onDragLeave: ({ editor, plugin }) => {
      editor.setOption(plugin, 'cursors', {});
    },
    onDragOver: ({ editor, event, plugin }) => {
      if (editor.getOptions(DndPlugin).isDragging) return;

      const range = findEventRange(editor, event);

      if (!range) return;

      editor.setOption(plugin, 'cursors', {
        drag: {
          data: {
            style: {
              backgroundColor: 'hsl(222.2 47.4% 11.2%)',
              width: 3,
            },
          },
          key: 'drag',
          selection: range,
        },
      });
    },
    onDrop: ({ editor, plugin }) => {
      editor.setOption(plugin, 'cursors', {});
    },
  },
  key: 'dragOverCursor',
  options: { cursors: {} as Record<string, CursorState<CursorData>> },
});
