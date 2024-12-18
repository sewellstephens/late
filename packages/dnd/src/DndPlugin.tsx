import React from 'react';

import type { PluginConfig } from '@sewell_stephens/late-common';

import { createTLatePlugin } from '@sewell_stephens/late-common/react';

import { DndScroller, type ScrollerProps } from './components/Scroller';

export type DndConfig = PluginConfig<
  'dnd',
  {
    draggingId?: null | string;
    enableScroller?: boolean;
    isDragging?: boolean;
    scrollerProps?: Partial<ScrollerProps>;
  }
>;

export const DndPlugin = createTLatePlugin<DndConfig>({
  handlers: {
    onDragEnd: ({ editor, plugin }) => {
      editor.setOption(plugin, 'isDragging', false);
    },
    onDragStart: ({ editor, event, plugin }) => {
      const id = (event.target as HTMLDivElement).dataset.key ?? null;

      editor.setOption(plugin, 'draggingId', id);
      editor.setOption(plugin, 'isDragging', true);
    },
    onDrop: ({ editor, getOptions }) => {
      const id = getOptions().draggingId;

      setTimeout(() => {
        id &&
          editor
            .getApi({ key: 'blockSelection' })
            .blockSelection?.addSelectedRow?.(id);
      }, 0);

      return getOptions().isDragging;
    },
  },
  key: 'dnd',
  options: {
    draggingId: null,
    isDragging: false,
  },
}).extend(({ getOptions }) => ({
  render: {
    afterEditable: getOptions().enableScroller
      ? () => <DndScroller {...getOptions()?.scrollerProps} />
      : undefined,
  },
}));
