import type { FC } from 'react';

import { BlockquotePlugin } from '@sewell_stephens/late-block-quote/react';
import { CodeBlockPlugin } from '@sewell_stephens/late-code-block/react';
import {
  ParagraphPlugin,
  createNodesWithHOC,
} from '@sewell_stephens/late-common/react';
import {
  type WithDraggableOptions,
  withDraggable as withDraggablePrimitive,
} from '@sewell_stephens/late-dnd';
import { ExcalidrawPlugin } from '@sewell_stephens/late-excalidraw';
import { HEADING_KEYS } from '@sewell_stephens/late-heading';
import { ColumnPlugin } from '@sewell_stephens/late-layout';
import {
  BulletedListPlugin,
  NumberedListPlugin,
} from '@sewell_stephens/late-list/react';
import {
  ImagePlugin,
  MediaEmbedPlugin,
  PlaceholderPlugin,
} from '@sewell_stephens/late-media';
import { TablePlugin } from '@sewell_stephens/late-table';
import { TogglePlugin } from '@sewell_stephens/late-toggle';

import { Draggable, type DraggableProps } from './draggable';

export const withDraggable = (
  Component: FC,
  options?: WithDraggableOptions<
    Partial<Omit<DraggableProps, 'children' | 'editor' | 'element'>>
  >
) =>
  withDraggablePrimitive<DraggableProps>(Draggable, Component, options as any);

export const withDraggablesPrimitive = createNodesWithHOC(withDraggable);

export const withDraggables = (components: any) => {
  return withDraggablesPrimitive(components, [
    {
      keys: [
        ParagraphPlugin.key,
        BulletedListPlugin.key,
        NumberedListPlugin.key,
      ],
      level: 0,
    },
    {
      draggableProps: {
        classNames: {
          blockToolbarWrapper: 'h-[1.3em]',
          gutterLeft: 'px-0 pb-1 text-[1.875em]',
        },
      },
      key: HEADING_KEYS.h1,
    },
    {
      draggableProps: {
        classNames: {
          blockToolbarWrapper: 'h-[1.3em]',
          gutterLeft: 'px-0 pb-1 text-[1.5em]',
        },
      },
      key: HEADING_KEYS.h2,
    },
    {
      draggableProps: {
        classNames: {
          blockToolbarWrapper: 'h-[1.3em]',
          gutterLeft: 'pt-[2px] px-0 pb-1 text-[1.25em]',
        },
      },
      key: HEADING_KEYS.h3,
    },
    {
      draggableProps: {
        classNames: {
          blockToolbarWrapper: 'h-[1.3em]',
          gutterLeft: 'pt-[3px] px-0 pb-0 text-[1.1em]',
        },
      },
      keys: [HEADING_KEYS.h4, HEADING_KEYS.h5],
    },
    {
      draggableProps: {
        classNames: {
          gutterLeft: 'pt-[3px] px-0 pb-0',
        },
      },
      keys: [ParagraphPlugin.key],
    },
    {
      draggableProps: {
        classNames: {
          gutterLeft: 'px-0 pb-0',
        },
      },
      keys: [HEADING_KEYS.h6, BulletedListPlugin.key, NumberedListPlugin.key],
    },
    {
      draggableProps: {
        classNames: {
          gutterLeft: 'px-0 pb-0',
        },
      },
      key: BlockquotePlugin.key,
    },
    {
      draggableProps: {
        classNames: {
          gutterLeft: 'pt-6 px-0 pb-0',
        },
      },
      key: CodeBlockPlugin.key,
    },
    {
      draggableProps: {
        classNames: {
          gutterLeft: 'pt-0 px-0 pb-0',
        },
      },
      key: ImagePlugin.key,
    },
    {
      draggableProps: {
        classNames: {
          gutterLeft: 'pt-0 px-0 pb-0',
        },
      },
      key: MediaEmbedPlugin.key,
    },
    {
      draggableProps: {
        classNames: {
          gutterLeft: 'pt-0 px-0 pb-0',
        },
      },
      key: ExcalidrawPlugin.key,
    },
    {
      draggableProps: {
        classNames: {
          gutterLeft: 'pt-0 px-0 pb-0',
        },
      },
      key: TogglePlugin.key,
    },
    {
      draggableProps: {
        classNames: {
          gutterLeft: 'pt-0 px-0 pb-0',
        },
      },
      key: ColumnPlugin.key,
    },
    {
      draggableProps: {
        classNames: {
          gutterLeft: 'pt-3 px-0 pb-0',
        },
      },
      key: PlaceholderPlugin.key,
    },
    {
      draggableProps: {
        classNames: {
          gutterLeft: 'pt-3 px-0 pb-0',
        },
      },
      key: TablePlugin.key,
    },
  ]);
};
