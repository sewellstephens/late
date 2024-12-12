import React from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';

import type { DropTargetMonitor } from 'react-dnd';

import { type PlateEditor, useEditorRef } from '@sewellstephens/plate-common/react';

import type { DragItemNode, DropLineDirection } from '../types';

import { type UseDragNodeOptions, useDragNode } from './useDragNode';
import { type UseDropNodeOptions, useDropNode } from './useDropNode';

export interface UseDndNodeOptions
  extends Pick<UseDropNodeOptions, 'id' | 'nodeRef'>,
    Pick<UseDragNodeOptions, 'type'> {
  drag?: UseDragNodeOptions;
  drop?: UseDropNodeOptions;
  onDropHandler?: (
    editor: PlateEditor,
    props: {
      dragItem: DragItemNode;
      id: string;
      monitor: DropTargetMonitor<DragItemNode, unknown>;
      nodeRef: any;
    }
  ) => boolean;
  preview?: {
    /** Whether to disable the preview. */
    disable?: boolean;

    /** The reference to the preview element. */
    ref?: any;
  };
}

/**
 * {@link useDragNode} and {@link useDropNode} hooks to drag and drop a node from
 * the editor. A default preview is used to show the node being dragged, which
 * can be customized or removed. Returns the drag ref and drop line direction.
 */
export const useDndNode = ({
  drag: dragOptions,
  drop: dropOptions,
  id,
  nodeRef,
  onDropHandler,
  preview: previewOptions = {},
  type,
}: UseDndNodeOptions) => {
  const editor = useEditorRef();

  const [dropLine, setDropLine] = React.useState<DropLineDirection>('');

  const [{ isDragging }, dragRef, preview] = useDragNode(editor, {
    id,
    type,
    ...dragOptions,
  });
  const [{ isOver }, drop] = useDropNode(editor, {
    accept: type,
    dropLine,
    id,
    nodeRef,
    onChangeDropLine: setDropLine,
    onDropHandler,
    ...dropOptions,
  });

  if (previewOptions.disable) {
    drop(nodeRef);
    preview(getEmptyImage(), { captureDraggingState: true });
  } else if (previewOptions.ref) {
    drop(nodeRef);
    preview(previewOptions.ref);
  } else {
    preview(drop(nodeRef));
  }
  if (!isOver && dropLine) {
    setDropLine('');
  }

  return {
    dragRef,
    dropLine,
    isDragging,
    isOver,
  };
};
