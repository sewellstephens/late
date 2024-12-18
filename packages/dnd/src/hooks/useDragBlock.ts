import type { LateEditor } from '@sewell_stephens/late-common/react';

import { useDragNode } from './useDragNode';

export const DRAG_ITEM_BLOCK = 'block';

/** {@link useDragNode} */
export const useDragBlock = (editor: LateEditor, id: string) =>
  useDragNode(editor, {
    id,
    type: DRAG_ITEM_BLOCK,
  });
