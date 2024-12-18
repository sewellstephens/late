import { FC } from 'react';
import { ELEMENT_BLOCKQUOTE } from '@sewell_stephens/late-block-quote';
import { ELEMENT_CODE_BLOCK } from '@sewell_stephens/late-code-block';
import { createNodesWithHOC } from '@sewell_stephens/late-common';
import {
  WithDraggableOptions,
  withDraggable as withDraggablePrimitive,
} from '@sewell_stephens/late-dnd';
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from '@sewell_stephens/late-heading';
import { ELEMENT_OL, ELEMENT_UL } from '@sewell_stephens/late-list';
import { ELEMENT_PARAGRAPH } from '@sewell_stephens/late-paragraph';

import { Draggable, DraggableProps } from './draggable';

export const withDraggable = (
  Component: FC,
  options?: WithDraggableOptions<
    Partial<Omit<DraggableProps, 'editor' | 'element' | 'children'>>
  >
) =>
  withDraggablePrimitive<DraggableProps>(Draggable, Component, options as any);

export const withDraggablesPrimitive = createNodesWithHOC(withDraggable);

export const withDraggables = (components: any) => {
  return withDraggablesPrimitive(components, [
    {
      keys: [ELEMENT_PARAGRAPH, ELEMENT_UL, ELEMENT_OL],
      level: 0,
    },
    {
      key: ELEMENT_H1,
      draggableProps: {
        classNames: {
          gutterLeft: 'px-0 pb-1 text-[1.875em]',
          blockToolbarWrapper: 'h-[1.3em]',
        },
      },
    },
    {
      key: ELEMENT_H2,
      draggableProps: {
        classNames: {
          gutterLeft: 'px-0 pb-1 text-[1.5em]',
          blockToolbarWrapper: 'h-[1.3em]',
        },
      },
    },
    {
      key: ELEMENT_H3,
      draggableProps: {
        classNames: {
          gutterLeft: 'pt-[2px] px-0 pb-1 text-[1.25em]',
          blockToolbarWrapper: 'h-[1.3em]',
        },
      },
    },
    {
      keys: [ELEMENT_H4, ELEMENT_H5],
      draggableProps: {
        classNames: {
          gutterLeft: 'pt-[3px] px-0 pb-0 text-[1.1em]',
          blockToolbarWrapper: 'h-[1.3em]',
        },
      },
    },
    {
      keys: [ELEMENT_PARAGRAPH],
      draggableProps: {
        classNames: {
          gutterLeft: 'pt-[3px] px-0 pb-0',
        },
      },
    },
    {
      keys: [ELEMENT_H6, ELEMENT_UL, ELEMENT_OL],
      draggableProps: {
        classNames: {
          gutterLeft: 'px-0 pb-0',
        },
      },
    },
    {
      key: ELEMENT_BLOCKQUOTE,
      draggableProps: {
        classNames: {
          gutterLeft: 'px-0 pb-0',
        },
      },
    },
    {
      key: ELEMENT_CODE_BLOCK,
      draggableProps: {
        classNames: {
          gutterLeft: 'pt-8 px-0 pb-0',
        },
      },
    },
  ]);
};
