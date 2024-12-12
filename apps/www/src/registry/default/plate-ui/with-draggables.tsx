import type { FC } from 'react';

import { BlockquotePlugin } from '@sewellstephens/plate-block-quote/react';
import { CodeBlockPlugin } from '@sewellstephens/plate-code-block/react';
import {
  ParagraphPlugin,
  createNodesWithHOC,
} from '@sewellstephens/plate-common/react';
import {
  type WithDraggableOptions,
  withDraggable as withDraggablePrimitive,
} from '@sewellstephens/plate-dnd';
import { ExcalidrawPlugin } from '@sewellstephens/plate-excalidraw';
import { HEADING_KEYS } from '@sewellstephens/plate-heading';
import { ColumnPlugin } from '@sewellstephens/plate-layout';
import {
  BulletedListPlugin,
  NumberedListPlugin,
} from '@sewellstephens/plate-list/react';
import {
  ImagePlugin,
  MediaEmbedPlugin,
  PlaceholderPlugin,
} from '@sewellstephens/plate-media';
import { TablePlugin } from '@sewellstephens/plate-table';
import { TogglePlugin } from '@sewellstephens/plate-toggle';

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
